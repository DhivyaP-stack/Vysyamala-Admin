import React, { useCallback, useEffect, useState } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Grid,
    Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import { apiAxios } from '../../../../api/apiUrl';

// --- Types & Interfaces ---
interface RegistrationProfile {
    ProfileId: string;
    Profile_name: string;
    age: number;
    plan_name: string;
    membership_startdate: string;
    membership_enddate: string;
    has_photo: number;
    has_horo: number;
    Profile_idproof: string;
    owner_name: string;
    Last_login_date: string;
    call_status: string | null;
    last_call_date: string | null;
    // Activity counts for Modal
    yesterday_vys_assist: number;
    yesterday_express_sent: number;
    yesterday_express_received: number;
    yesterday_bookmark: number;
}

const KPI_CONFIG = [
    { label: "TOTAL PREMIUM", key: "total_profiles", color: "bg-white" },

    // Plan specific cards with Call/Action counts
    { label: "Gold | Call >60 days | Action >60days", key: "plan_counts.gold", color: "bg-white", subKeys: true },
    { label: "PLATINUM | CALL >45 DAYS | ACTION > 45 DAYS", key: "plan_counts.platinum", color: "bg-white", subKeys: true },
    { label: "PLATINUM PRIVATE | CALL >45 DAYS | ACTION > 45 DAYS", key: "plan_counts.platinum_private", color: "bg-white", subKeys: true },
    { label: "VYSYAMALA DELIGHT | CALL >45 DAYS | ACTION > 45 DAYS", key: "plan_counts.vysyamala_delight", color: "bg-white", subKeys: true },

    { label: "FEMALE", key: "female", color: "bg-white" },
    { label: "MALE", key: "male_count", color: "bg-white" },
    { label: "AGE > 30", key: "age_above_30", color: "bg-white" },
    { label: "AGE < 30", key: "age_under_30", color: "bg-white" },

    // Location Card
    { label: "TN | OTH", key: "state_count", color: "bg-white", type: "location" },

    { label: "FIRST 3M PROFILE", key: "fisrt_three_month", color: "bg-white" },
    { label: "LAST 4M PROFILE", key: "last_four_month", color: "bg-white" },

    { label: "TODAY'S LOGIN", key: "today_login", color: "bg-white" },
    { label: "YESTERDAY'S LOGIN", key: "yesterday_login", color: "bg-white" },
    { label: "TODAY'S BIRTHDAY", key: "today_birthday", color: "bg-white" },

    { label: "NO HORO", key: "no_horo", color: "bg-white" },
    { label: "NO PHOTO", key: "no_photo", color: "bg-white" },
    { label: "NO ID", key: "no_id", color: "bg-white" },

    { label: "CURRENT MONTH PREMIUM", key: "cur_month_registrations", color: "bg-white" },

    // Work Counts
    { label: "TODAY'S CALL", key: "work_counts.today_work", color: "bg-white" },
    { label: "PENDING CALL", key: "work_counts.pending_work", color: "bg-white" },
    { label: "TODAY'S ACTION", key: "task_counts.today_task", color: "bg-white" },
    { label: "PENDING ACTION", key: "task_counts.pending_task", color: "bg-white" },

    // Yesterday's Activity
    { label: "YESTERDAY'S VYSASSIST", key: "yesterday_activity.vys_assist", color: "bg-white" },
    { label: "YESTERDAY'S EXPRESS INT SENT", key: "yesterday_activity.express_interest_sent", color: "bg-white" },
    { label: "YESTERDAY'S EXPRESS INT RECEIVED", key: "yesterday_activity.express_interest_received", color: "bg-white" },
    { label: "YESTERDAY'S BOOKMARK", key: "yesterday_activity.bookmark", color: "bg-white" },
];


const PremiumDashboard: React.FC = () => {
    // --- State ---
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState<'call' | 'customer' | null>(null);
    const [selectedProfile, setSelectedProfile] = useState<RegistrationProfile | null>(null);
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState<any>({});
    const [tableData, setTableData] = useState<RegistrationProfile[]>([]);
    const [tableLoading, setTableLoading] = useState(false);
    // --- Styles ---
    const btnDark = "bg-[#0A1735] text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#1f2d50] transition shadow-sm border-none cursor-pointer";
    const btnOutline = "bg-white border border-gray-300 text-[#0A1735] px-6 py-2 rounded-full font-semibold text-sm hover:bg-gray-50 transition shadow-sm cursor-pointer";

    // Updated type to handle Plan stats (Total/Call/Action) and Location (TN/Non-TN)
    type KpiResult = number | string | { total: number; call: number; action: number } | { tn: number; nonTn: number };

    const getKpiData = (stats: any, label: string): KpiResult => {
        if (!stats) return 0;

        switch (label) {
            case "TOTAL PREMIUM":
                return stats.total_profiles || 0;

            // Plan Mappings (Returning objects for split display)
            case "Gold | Call >60  days | Action >60days":
                return stats.plan_counts?.gold || { total: 0, call: 0, action: 0 };
            case "PLATINUM | CALL >45 DAYS | ACTION > 45 DAYS":
                return stats.plan_counts?.platinum || { total: 0, call: 0, action: 0 };
            case "PLATINUM PRIVATE | CALL >45 DAYS | ACTION > 45 DAYSFFER":
                return stats.plan_counts?.platinum_private || { total: 0, call: 0, action: 0 };
            case "VYSYAMALA DELIGHT | CALL >45 DAYS | ACTION > 45 DAYS":
                return stats.plan_counts?.vysyamala_delight || { total: 0, call: 0, action: 0 };

            case "FEMALE": return stats.female || 0;
            case "MALE": return stats.male_count || 0;
            case "AGE > 30": return stats.age_above_30 || 0;
            case "AGE < 30": return stats.age_under_30 || 0;

            case "TN | OTH":
                return {
                    tn: stats.state_count?.tn || 0,
                    nonTn: stats.state_count?.['non-tn'] || 0
                };

            case "FIRST 3M PROFILE": return stats.fisrt_three_month || 0;
            case "LAST 4M PROFILE": return stats.last_four_month || 0;
            case "TODAY'S LOGIN": return stats.today_login || 0;
            case "YESTERDAY'S LOGIN": return stats.yesterday_login || 0;
            case "TODAY'S BIRTHDAY": return stats.today_birthday || 0;

            case "NO HORO": return stats.no_horo || 0;
            case "NO PHOTO": return stats.no_photo || 0;
            case "NO ID": return stats.no_id || 0;

            case "CURRENT MONTH PREMIUM": return stats.cur_month_registrations || 0;

            case "TODAY'S CALL": return stats.work_counts?.today_work || 0;
            case "PENDING CALL": return stats.work_counts?.pending_work || 0;
            case "TODAY'S ACTION": return stats.task_counts?.today_task || 0;
            case "PENDING ACTION": return stats.task_counts?.pending_task || 0;

            // Activity Mappings
            case "YESTERDAY'S VYSASSIST": return stats.yesterday_activity?.vys_assist || 0;
            case "YESTERDAY'S EXPRESS INT SENT": return stats.yesterday_activity?.express_interest_sent || 0;
            case "YESTERDAY'S EXPRESS INT RECEIVED": return stats.yesterday_activity?.express_interest_received || 0;
            case "YESTERDAY'S BOOKMARK": return stats.yesterday_activity?.bookmark || 0;

            default: return 0;
        }
    };

    const getStatusPillClass = (status: string | null) => {
        switch (status?.toLowerCase().split(' ')[0]) {
            case 'hot':
                return "bg-[#ffe4e4] text-[#d70000]";
            case 'warm':
                return "bg-[#FFF6E4] text-[#ff8c00]";
            case 'cold':
                return "bg-[#F7F7F7] text-[#6b7280]";
            case 'not': // "Not interested"
                return "bg-[#FFECEC] text-[#ef4444]";
            case 'completed':
                return "bg-[#d1f7e3] text-[#129f46]";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const fetchPremiumData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await apiAxios.get('api/premium-report/');
            if (response.data.status) {
                setStats(response.data);
                setTableData(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching premium data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPremiumData();
    }, [fetchPremiumData]);

    // --- Handlers ---
    const handleOpenModal = (profile: RegistrationProfile, type: 'call' | 'customer') => {
        setSelectedProfile(profile);
        setModalType(type);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedProfile(null);
    };

    // --- Sub-Components ---
    const CallLogPopup = ({ profile }: { profile: RegistrationProfile }) => (
        <Box sx={{ p: 1 }}>
            <Typography variant="subtitle2" sx={{ color: "#64748b", mb: 3, fontWeight: 600 }}>
                Call Logs & Service Details
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                        <div className="flex justify-between"><span className="text-sm text-gray-600 font-medium">LCD</span><b className="text-sm text-[#0A1735]">{profile.lcd}</b></div>
                        <div className="flex justify-between"><span className="text-sm text-gray-600 font-medium">LCD Comments</span><b className="text-sm text-[#0A1735]">{profile.lcdComments}</b></div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600 font-medium">Call Status</span>
                            <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold ${getStatusPillClass(profile.callStatus)}`}>{profile.callStatus}</span>
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                        <div className="flex justify-between"><span className="text-sm text-gray-600 font-medium">LAD</span><b className="text-sm text-[#0A1735]">{profile.lad}</b></div>
                        <div className="flex justify-between"><span className="text-sm text-gray-600 font-medium">LAP</span><b className="text-sm text-[#0A1735]">{profile.lap}</b></div>
                        <div className="flex justify-between"><span className="text-sm text-gray-600 font-medium">NAD</span><b className="text-sm text-[#0A1735]">{profile.nad}</b></div>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );

    const CustomerLogPopup = ({ profile }: { profile: RegistrationProfile }) => (
        <Box sx={{ py: 1 }}>
            <Grid container spacing={2}>
                {[
                    { label: 'Profiles Viewed', val: profile.viewed },
                    { label: 'Profile Visitors', val: profile.visitors },
                    { label: 'Bookmarks', val: profile.bookmark },
                    { label: 'Exp. Int Sent', val: profile.expSent },
                    { label: 'Interest Received', val: profile.expRec },
                ].map((stat, i) => (
                    <Grid item xs={6} md={2.4} key={i}>
                        <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#F1F7FF', borderRadius: '12px', border: '1px solid #E3E6EE' }}>
                            <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#475569', mb: 1 }}>{stat.label}</Typography>
                            <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, color: '#0A1735' }}>{stat.val}</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

    return (
        <div className="min-h-screen bg-[#F5F7FB] font-inter text-black p-4 md:p-8">

            {/* --- Header Section --- */}
            <header className="flex flex-wrap justify-between items-start mb-6 gap-4">
                <div className="text-left">
                    <h2 className="text-2xl font-bold mb-1">Premium Dashboard</h2>
                    {/* <p className="text-gray-500 m-0 text-base">Overview of registration profiles, engagement and staff performance.</p> */}
                </div>
                <div className="flex gap-3">
                    <button className={btnDark}>Download Report</button>
                </div>
            </header>

            {/* --- Filters Section --- */}
            <section className="mb-8">
                <div className="bg-white rounded-xl border border-[#E3E6EE] p-7 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-start">
                            <label className="block text-sm font-semibold text-[#3A3E47] mb-1">From Date</label>
                            <input type="date" className="w-full h-12 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                        </div>
                        <div className="text-start">
                            <label className="block text-sm font-semibold text-[#3A3E47] mb-1">To Date</label>
                            <input type="date" className="w-full h-12 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                        </div>
                        <div className="text-start">
                            <label className="block text-sm font-semibold text-[#3A3E47] mb-1">Staff</label>
                            <select className="w-full h-12 px-3 border border-gray-300 rounded-lg text-sm cursor-pointer appearance-none bg-white focus:outline-none">
                                <option>Select Staff</option>
                            </select>
                        </div>
                        <div className="text-start">
                            <label className="block text-sm font-semibold text-[#3A3E47] mb-1">Plan</label>
                            <select className="w-full h-12 px-3 border border-gray-300 rounded-lg text-sm cursor-pointer appearance-none bg-white focus:outline-none">
                                <option>Select Plan</option>
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-semibold text-[#3A3E47] mb-1">Age Range</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    className="w-1/2 h-12 px-3 cursor-pointer border border-gray-300 rounded-lg text-sm"
                                />
                                <input
                                    type="number"
                                    placeholder="Max"
                                    className="w-1/2 h-12 px-3 border border-gray-300 rounded-lg text-sm"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <button className={btnOutline}>Reset</button>
                        <button className={btnDark}>Apply Filters</button>
                    </div>
                </div>
            </section>

            {/* --- KPI Grid --- */}
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                {KPI_CONFIG.map((kpi, i) => {
                    const data = getKpiData(stats, kpi.label);

                    // Helper to render the main number
                    const renderValue = () => {
                        if (typeof data === 'number') return data;

                        // Handle Plan Object {total, call, action}
                        if (typeof data === 'object' && data && 'total' in data) {
                            return (
                                <div className="flex items-baseline gap-2">
                                    <span>{data.total}</span>
                                    <span className="text-sm font-medium text-gray-400">
                                        | {data.call} | {data.action}
                                    </span>
                                </div>
                            );
                        }

                        // Handle Location Object {tn, nonTn}
                        if (typeof data === 'object' && data && 'tn' in data) {
                            return (
                                <div className="flex items-baseline gap-2">
                                    <span className="text-blue-600">{(data as { tn: number; nonTn: number }).tn}</span>
                                    <span className="text-gray-300 text-xl">|</span>
                                    <span className="text-orange-600">{(data as { tn: number; nonTn: number }).nonTn}</span>
                                </div>
                            );
                        }
                        return "0";
                    };

                    return (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className={`${kpi.color} p-5 rounded-2xl min-h-[140px] border border-[#E3E6EE] flex flex-col justify-center cursor-pointer transition shadow-sm`}
                        >
                            <h6 className="text-[10px] font-bold mb-1 tracking-wider uppercase opacity-80 text-start">{kpi.label}</h6>
                            <h2 className="text-3xl text-start font-bold mb-1">
                                {loading ? <CircularProgress size={20} /> : renderValue()}
                            </h2>
                            <p className="text-[10px] opacity-70 text-start">Click to view profiles</p>
                        </motion.div>
                    );
                })}
            </section>

            {/* --- Work Stats Section --- */}
            {/* <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {WORK_CARDS.map((card, i) => (
                    <div key={i} className="bg-white rounded-xl p-6 border border-[#e6ecf2] shadow-sm flex flex-col justify-between h-full transition hover:-translate-y-1 cursor-pointer">
                        <div className="text-start">
                            <h5 className="text-base font-semibold text-gray-900 mb-1">{card.label}</h5>
                            <p className="text-xs text-gray-500 mb-4">{card.sub}</p>
                        </div>
                        <div className="text-3xl font-bold text-[#000c28] text-start">0</div>
                    </div>
                ))}
            </section> */}

            {/* --- Profile Detail Table --- */}
            <section className="bg-white rounded-xl border border-[#e6ecf2] shadow-md p-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h5 className="text-lg font-semibold m-0">Premium Profile Detail (0)</h5>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Search Profile ID / Name"
                            className="w-[250px] h-10 px-4 rounded-full border border-gray-300 text-sm focus:outline-none focus:border-gray-500 transition"
                        />
                        <button className="h-10 px-4 rounded-full bg-white border border-gray-300 text-sm font-semibold hover:bg-gray-50 transition">Clear</button>
                    </div>
                </div>

                <div className="overflow-x-auto max-h-[500px]">
                    <table className="min-w-full border-separate border-spacing-0 table-auto">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0 rounded-tl-xl">Profile ID</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Name</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Age</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Plan</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Plan Start Date</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Plan End Date</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Photo</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Horo</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">ID</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Owner</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Last Login</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableLoading ? (
                                <tr>
                                    <td colSpan={16} className="py-20">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1d4ed8] mb-4"></div>
                                            <p className="text-sm text-gray-600 font-medium">Loading Premium Profiles...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : tableData.length > 0 ? (
                                tableData.map((row) => (
                                    <tr key={row.ProfileId} className="hover:bg-gray-50">
                                        <td className="px-3 py-3 text-sm font-bold text-blue-600 border border-[#e5ebf1] whitespace-nowrap">
                                            <a href={`/viewProfile?profileId=${row.ProfileId}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                {row.ProfileId}
                                            </a>
                                        </td>
                                        <td className="px-3 py-3 text-sm border border-[#e5ebf1] whitespace-nowrap">{row.Profile_name}</td>
                                        <td className="px-3 py-3 text-sm border border-[#e5ebf1] whitespace-nowrap">{row.age}</td>
                                        <td className="px-3 py-3 text-sm border border-[#e5ebf1] whitespace-nowrap">{row.plan_name || 'N/A'}</td>
                                        <td className="px-3 py-3 text-sm border border-[#e5ebf1] whitespace-nowrap">{row.membership_startdate || 'N/A'}</td>
                                        <td className="px-3 py-3 text-sm border border-[#e5ebf1] whitespace-nowrap">{row.membership_enddate || 'N/A'}</td>
                                        <td className="px-3 py-3 text-sm border border-[#e5ebf1] whitespace-nowrap">{row.has_photo || 'N/A'}</td>
                                        <td className="px-3 py-3 text-sm border border-[#e5ebf1] whitespace-nowrap">{row.has_horo || 'N/A'}</td>
                                        <td className="px-3 py-3 text-sm border border-[#e5ebf1] whitespace-nowrap">{row.Profile_idproof || 'N/A'}</td>
                                        <td className="px-3 py-3 text-sm border border-[#e5ebf1] whitespace-nowrap">{row.owner_name || 'N/A'}</td>
                                        <td className="px-3 py-3 text-sm border border-[#e5ebf1] whitespace-nowrap">
                                            {/* {row.Last_login_date
                                                            ? new Date(row.Last_login_date).toISOString().split('T')[0]
                                                            : 'N/A'} */}
                                            {row.Last_login_date
                                                ? new Date(row.Last_login_date.replace("T", " ")).toLocaleDateString('en-CA')
                                                : "N/A"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={16} className="text-center py-8 text-black font-semibold text-sm border border-[#e5ebf1]">
                                        No Profiles found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* --- Modal Popups --- */}
            <Dialog
                open={openModal}
                onClose={handleCloseModal}
                maxWidth="md"
                fullWidth
                PaperProps={{ sx: { borderRadius: '20px', p: 1 } }}
            >
                <DialogTitle sx={{ m: 0, p: 3, textAlign: 'center', fontWeight: 800, color: '#0A1735' }}>
                    {modalType === 'call' ? 'Call & Service Logs' : 'Customer Activity Log'}
                    <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mt: 1 }}>
                        Profile ID: {selectedProfile?.id || 'N/A'}
                    </Typography>
                    <IconButton onClick={handleCloseModal} sx={{ position: 'absolute', right: 12, top: 12, bgcolor: '#F1F5F9' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Divider />
                <DialogContent sx={{ p: 3 }}>
                    {selectedProfile && (
                        modalType === 'call' ? <CallLogPopup profile={selectedProfile} /> : <CustomerLogPopup profile={selectedProfile} />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PremiumDashboard;