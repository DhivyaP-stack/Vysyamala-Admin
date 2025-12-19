import React, { useState } from 'react';
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

// --- Types & Interfaces ---
interface RegistrationProfile {
    id: string;
    name: string;
    age: number;
    familyStatus: string;
    education: string;
    income: string;
    city: string;
    mode: string;
    owner: string;
    fromDate: string;
    toDate: string;
    lastLogin: string;
    idleDays: number;
    status: string;
    // Stats for Customer Log
    viewed: number;
    visitors: number;
    bookmark: number;
    expSent: number;
    expRec: number;
    // Logs for Call Log
    lcd: string;
    lcdComments: string;
    callStatus: string;
    ncd: string;
    lad: string;
    lap: string;
    lapComments: string;
    nad: string;
}

// --- Configuration ---
const KPI_CONFIG = [
    { label: "APPROVED", color: "bg-white" },
    { label: "UNAPPROVED", color: "bg-white" },
    { label: "NON LOGGED IN", color: "bg-white" },
    { label: "PREMIUM", color: "bg-white" },
    { label: "ONLINE APPROVED - TN/KAT", color: "bg-white" },
    { label: "ADMIN APPROVED - TN/KAT", color: "bg-white" },
    { label: "ONLINE UNAPPROVED - TN/KAT", color: "bg-white" },
    { label: "ADMIN UNAPPROVED - TN/KAT", color: "bg-white" },
    { label: "TODAY WORK", color: "bg-white" },
    { label: "PENDING WORK", color: "bg-white" },
    { label: "TODAY ACTION", color: "bg-white" },
    { label: "PENDING ACTION", color: "bg-white" },
    { label: "NO PHOTO/HORO/ID", color: "bg-white" },
    { label: "HOT", color: "bg-white" },
    { label: "WARM", color: "bg-white" },
    { label: "COLD", color: "bg-white" },
    { label: "NOT INTERESTED", color: "bg-white" },
];

// const WORK_CARDS = [
//     { label: "Today's Work", sub: "Total tasks to be completed today.", key: "today_work" },
//     { label: "Pending Work", sub: "Carry-forward items not completed.", key: "pending_work" },
//     { label: "Today's Action", sub: "Immediate actions required.", key: "today_action" },
//     { label: "Missing Docs", sub: "No Horo / Photo / ID.", key: "missing_docs" },
// ];

const RegistrationDashboard: React.FC = () => {
    // --- State ---
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState<'call' | 'customer' | null>(null);
    const [selectedProfile, setSelectedProfile] = useState<RegistrationProfile | null>(null);
    const [loading, setLoading] = useState(false);

    // --- Styles ---
    const btnDark = "bg-[#0A1735] text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#1f2d50] transition shadow-sm border-none cursor-pointer";
    const btnOutline = "bg-white border border-gray-300 text-[#0A1735] px-6 py-2 rounded-full font-semibold text-sm hover:bg-gray-50 transition shadow-sm cursor-pointer";

    const getStatusPillClass = (status: string) => {
        switch (status?.toUpperCase()) {
            case 'HOT': return "bg-[#ffe4e4] text-[#d70000]";
            case 'WARM': return "bg-[#FFF6E4] text-[#ff8c00]";
            case 'COLD': return "bg-[#F7F7F7] text-[#6b7280]";
            default: return "bg-gray-100 text-gray-800";
        }
    };

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
                    <h2 className="text-2xl font-bold mb-1">Registration Dashboard</h2>
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
                {KPI_CONFIG.map((kpi, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className={`${kpi.color} p-5 rounded-2xl min-h-[140px] border border-[#E3E6EE] flex flex-col justify-center cursor-pointer transition shadow-sm`}
                    >
                        <h6 className="text-[10px] font-bold mb-1 tracking-wider uppercase opacity-80 text-start">{kpi.label}</h6>
                        <h2 className="text-3xl text-start font-bold mb-1">0</h2>
                        <p className="text-[10px] opacity-70 text-start">Click to view profiles</p>
                    </motion.div>
                ))}
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
                    <h5 className="text-lg font-semibold m-0">Registration Profile Detail (0)</h5>
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
                                {/* ... other ths ... */}
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Name</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Age</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">DOR</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Family Status</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Education Details</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Annual Income</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">City</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">State</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Mode</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Owner</th>
                                {/* <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">From Date</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">To Date</th> */}
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Mode Last Login</th>
                                {/* <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Idle Days</th> */}
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Profile Status</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Call Status</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Call Comments</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Next Call Date</th>
                                {/* <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Call Logs (+)</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0 rounded-tr-xl">Customer Log (+)</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {/* This is where you map your API data. Using a placeholder row below: */}
                            <tr>
                                <td colSpan={16} className="py-20 text-center">
                                    {loading ? (
                                        <CircularProgress size={40} />
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <Typography variant="body2" className="text-gray-500 font-medium">No Registration Profiles found</Typography>
                                        </div>
                                    )}
                                </td>
                            </tr>
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

export default RegistrationDashboard;