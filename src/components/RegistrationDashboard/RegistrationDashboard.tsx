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
import { apiAxios } from '../../api/apiUrl';
import { RiArrowDropDownLine } from 'react-icons/ri';

// --- Types & Interfaces ---
interface RegistrationProfile {
    ProfileId: string;
    Profile_name: string;
    Profile_dob: string;
    Gender: string;
    Profile_city: string;
    state: string | null;
    owner_name: string | null;
    plan_name: string;
    status_name: string;
    call_status: string | null;
    DateOfJoin: string;
    Last_login_date: string | null;
    next_call_date: string | null;
    has_photo: number;
    has_horo: number;
    family_status_name: string | null;
    degree_name: string | null;
    other_degree: string | null;
    income: string | null;
    age: number;
}

interface ProfileOwner {
    id: string;
    username: string; // or name, adjust based on your API response
}

interface Plan {
    id: string;
    plan_name: string; // adjust based on your API response
}

// --- Configuration ---
const KPI_CONFIG = [
    { label: "TODAY'S REGISTRATION", color: "bg-white" },
    { label: "APPROVED", color: "bg-white" },
    { label: "UNAPPROVED", color: "bg-white" },
    { label: "NON LOGGED IN", color: "bg-white" },
    { label: "PREMIUM", color: "bg-white" },
    { label: "ONLINE APPROVED - TN/KAT", color: "bg-white" },
    { label: "ADMIN APPROVED - TN/KAT", color: "bg-white" },
    { label: "ONLINE UNAPPROVED - TN/KAT", color: "bg-white" },
    { label: "ADMIN UNAPPROVED - TN/KAT", color: "bg-white" },
    { label: "TODAY'S LOGIN", color: "bg-white" },
    { label: "TODAY'S WORK", color: "bg-white" },
    { label: "PENDING WORK", color: "bg-white" },
    { label: "TODAY'S ACTION", color: "bg-white" },
    { label: "PENDING ACTION", color: "bg-white" },
    { label: "NO PHOTO", color: "bg-white" },
    { label: "NO HORO", color: "bg-white" },
    { label: "NO ID", color: "bg-white" },
    { label: "HOT", color: "bg-white" },
    { label: "WARM", color: "bg-white" },
    { label: "COLD", color: "bg-white" },
    { label: "NOT INTERESTED", color: "bg-white" },
    { label: "TODAY'S BIRTHDAY", color: "bg-white" },
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
    const [profileOwners, setProfileOwners] = useState<ProfileOwner[]>([]);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [ownersLoading, setOwnersLoading] = useState(false);
    const [plansLoading, setPlansLoading] = useState(false);
    const [tableData, setTableData] = useState<RegistrationProfile[]>([]);
    const [stats, setStats] = useState<any>(null);
    const RoleID = localStorage.getItem('role_id') || sessionStorage.getItem('role_id');
    const SuperAdminID = localStorage.getItem('id') || sessionStorage.getItem('id');
    const [filters, setFilters] = useState({
        staffId: SuperAdminID || '',
        planId: '',
        fromDate: '',
        toDate: '',
        minAge: '',
        maxAge: ''
    });
    

    // --- Styles ---
    const btnDark = "bg-[#0A1735] text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#1f2d50] transition shadow-sm border-none cursor-pointer";
    const btnOutline = "bg-white border border-gray-300 text-[#0A1735] px-6 py-2 rounded-full font-semibold text-sm hover:bg-gray-50 transition shadow-sm cursor-pointer";

    const fetchProfileOwners = useCallback(async () => {
        setOwnersLoading(true);
        try {
            const response = await apiAxios.get('api/users/');
            // Adjust "response.data" based on your actual API structure
            setProfileOwners(Array.isArray(response.data) ? response.data : []);
        } catch (e) {
            console.error("Error fetching staff:", e);
        } finally {
            setOwnersLoading(false);
        }
    }, []);

    const fetchPlans = useCallback(async () => {
        setPlansLoading(true);
        try {
            const res = await apiAxios.get("api/get-plans/");
            if (res.data.status) {
                setPlans(res.data.plans);
            }
        } catch (e) {
            console.error("Error fetching plans:", e);
        } finally {
            setPlansLoading(false);
        }
    }, []);

    // --- Load Data on Mount ---
    useEffect(() => {
        if (RoleID === "7") {
            fetchProfileOwners();
        }
        fetchPlans();
    }, [RoleID, fetchProfileOwners, fetchPlans]);

    // --- Form Handlers ---
    const handleFilterChange = (field: string, value: string) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const fetchDashboardData = useCallback(async () => {
        setLoading(true);
        try {
            // Construct params from filters state
            const params = {
                staff_id: filters.staffId,
                plan_id: filters.planId,
                from_date: filters.fromDate,
                to_date: filters.toDate,
                min_age: filters.minAge,
                max_age: filters.maxAge,
            };

            const response = await apiAxios.get('api/registration-report/', { params });

            if (response.data.status) {
                setTableData(response.data.data); // Profiles array
                setStats(response.data); // Full response for KPIs
            }
        } catch (e) {
            console.error("Error fetching dashboard data:", e);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    // Trigger fetch on mount or when filters are applied
    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

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
                        {RoleID === "7" && (
                            <div className="text-start">
                                <label className="block text-sm font-semibold text-[#3A3E47] mb-1">Staff</label>
                                <div className="relative">
                                    <select
                                        className="w-full h-12 px-3 pr-10 border border-gray-300 rounded-lg text-sm cursor-pointer appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-black"
                                        value={filters.staffId}
                                        onChange={(e) => handleFilterChange('staffId', e.target.value)}
                                    >
                                        <option value="">Select Staff</option>
                                        {profileOwners.map(owner => (
                                            <option key={owner.id} value={owner.id}>{owner.username}</option>
                                        ))}
                                    </select>
                                    {/* Icon positioned to the right */}
                                    <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                                        <RiArrowDropDownLine size={30} className="text-gray-500" />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="text-start">
                            <label className="block text-sm font-semibold text-[#3A3E47] mb-1">Plan</label>
                            <div className="relative">
                                <select
                                    className="w-full h-12 px-3 pr-10 border border-gray-300 rounded-lg text-sm cursor-pointer appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    value={filters.planId}
                                    onChange={(e) => handleFilterChange('planId', e.target.value)}
                                >
                                    <option value="">Select Plan</option>
                                    {plans.map(plan => (
                                        <option key={plan.id} value={plan.id}>{plan.plan_name}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                                    <RiArrowDropDownLine size={30} className="text-gray-500" />
                                </div>
                            </div>
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

                <div className="overflow-x-auto">
                    {/* This inner div enables vertical scrolling while keeping headers potentially visible if you add 'sticky' later */}
                    <div className="max-h-[500px] overflow-y-auto">
                        <table className="min-w-full border-separate border-spacing-0 table-auto">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0 rounded-tl-xl">
                                        Profile ID
                                    </th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">
                                        Name
                                    </th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">
                                        Age
                                    </th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">
                                        DOR
                                    </th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">
                                        Family Status
                                    </th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">
                                        Education Details
                                    </th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">
                                        Annual Income
                                    </th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">
                                        City
                                    </th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">
                                        State
                                    </th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">
                                        Mode
                                    </th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">
                                        Owner
                                    </th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">
                                        Mode Last Login
                                    </th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">
                                        Profile Status
                                    </th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">
                                        Call Status
                                    </th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">
                                        Call Comments
                                    </th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0 rounded-tr-xl">
                                        Next Call Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={16} className="py-20">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1d4ed8] mb-4"></div>
                                                <p className="text-sm text-gray-600 font-medium">Loading Profiles...</p>
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
                                            <td className="px-3 py-3 text-sm border border-[#e5ebf1] whitespace-nowrap">
                                                {row.DateOfJoin ? new Date(row.DateOfJoin).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td className="px-3 py-3 text-sm border border-[#e5ebf1] whitespace-nowrap">{row.family_status_name || 'N/A'}</td>
                                            <td className="px-3 py-3 text-sm border border-[#e5ebf1] whitespace-nowrap">{row.degree_name || row.other_degree || 'N/A'}</td>
                                            <td className="px-3 py-3 text-sm border border-[#e5ebf1] whitespace-nowrap">{row.income || 'N/A'}</td>
                                            <td className="px-3 py-3 text-sm border border-[#e5ebf1] whitespace-nowrap">{row.Profile_city || 'N/A'}</td>
                                            <td className="px-3 py-3 text-sm border border-[#e5ebf1] whitespace-nowrap">{row.state || 'N/A'}</td>
                                            <td className="px-3 py-3 text-sm border border-[#e5ebf1] whitespace-nowrap">{row.plan_name || 'N/A'}</td>
                                            <td className="px-3 py-3 text-sm border border-[#e5ebf1] whitespace-nowrap">{row.owner_name || 'N/A'}</td>
                                            <td className="px-3 py-3 text-sm border border-[#e5ebf1] whitespace-nowrap">
                                                {row.Last_login_date ? new Date(row.Last_login_date).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td className="px-3 py-3 text-sm border border-[#e5ebf1] whitespace-nowrap">{row.status_name}</td>
                                            <td className="px-3 py-3 text-sm border border-[#e5ebf1] whitespace-nowrap">
                                                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusPillClass(row.call_status || 'COLD')}`}>
                                                    {row.call_status || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-3 py-3 text-sm border border-[#e5ebf1] whitespace-nowrap">N/A</td>
                                            <td className="px-3 py-3 text-sm border border-[#e5ebf1] whitespace-nowrap">{row.next_call_date || 'N/A'}</td>
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
                </div>
            </section>
        </div>
    );
};

export default RegistrationDashboard;