import axios from "axios";
import React, { useEffect } from "react";
import { apiAxios } from "../../api/apiUrl";
import { ProfileOwner, fetchProfileOwners } from "../new_profile/EditFormComponents/EditProfile";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface RenewalStats {
    overall_count: number;
    filtered_count: number;
    under_30: number;
    above_30: number;
    male_count: number;
    female_count: number;
    family_status_counts: Record<string, number>;
    today_login_count: number;
    yesterday_login_count: number;
    expired_this_month_count: number;
    call_status_counts: Record<string, number>;
    last_action_counts: Record<string, number>;
    action_counts: Record<string, number>;
    data: RenewalProfile[];
}

interface RenewalProfile {
    ProfileId: string;
    Profile_name: string;
    Profile_dob: string;
    Gender: string;
    Profile_city: string;
    Plan_id: string;
    owner_id: string;
    Last_login_date: string;
    membership_startdate: string;
    membership_enddate: string;
    owner_name: string | null;
    income: string | null;
    MaritalStatus: string;
    family_status_name: string;
    complexion_desc: string;
    state_name: string;
    country_name: string;
    district_name: string | null;
    plan_name: string;
    family_status: string;
    highest_education: string;
    degree: string;
    degree_name: string;
    other_degree: string | null;
    anual_income: string;
    birthstar_name: string;
    profession: string;
    call_management_id: number | null;
    last_call_id: number | null;
    last_call_date: string | null;
    last_call_type: number | null;
    last_call_status: number | null;
    last_action_id: number | null;
    last_action_date: string | null;
    next_action_date: string | null;
    call_status: string | null;
    age: number;
    idle_days: number | null;
}

type StatKeyPath = keyof RenewalStats |
[`family_status_counts`, string] |
[`call_status_counts`, string] |
[`last_action_counts`, string] |
[`action_counts`, string];

type StatCardMapEntry = [StatKeyPath, string, string];

const RenewalDashboard = () => {
    const [filters, setFilters] = React.useState({
        fromDate: "",
        toDate: "",
        staff: "",
        plan: "",
        gender: "",
        minAge: "",
        maxAge: "",
        engagement: "",
        status: "",
        ageFilter: "",           // 'under_30' | 'above_30'
        loginFilter: "",         // 'today' | 'yesterday'
        expiringFilter: "",      // 'expiring_this_month'
        callStatusFilter: "",    // 'hot' | 'warm' | 'cold' | 'not_interested'
        familyFilter: "",        // 'Upper middle class' | 'Rich' | 'Affluent'
        idleDaysFilter: "",
        genderFilter: "",
        searchQuery: "",
    });

    const [stats, setStats] = React.useState<RenewalStats | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [profileOwners, setProfileOwners] = React.useState<ProfileOwner[]>([]);
    const [isOwnersLoading, setIsOwnersLoading] = React.useState(false);
    const [ownersError, setOwnersError] = React.useState<string | null>(null);
    const [applyFilters, setApplyFilters] = React.useState(false);
    const [plans, setPlans] = React.useState<{ id: string; plan_name: string }[]>([]);
    const [isPlansLoading, setIsPlansLoading] = React.useState(false);
    const [plansError, setPlansError] = React.useState<string | null>(null);
    const profileTableRef = React.useRef<HTMLDivElement | null>(null);
    const [tableLoading, setTableLoading] = React.useState(false);
    const [searchTimer, setSearchTimer] = React.useState<NodeJS.Timeout | null>(null);
    const SuperAdminID = localStorage.getItem('id') || sessionStorage.getItem('id');
    const RoleID = localStorage.getItem('role_id') || sessionStorage.getItem('role_id');
    const navigate = useNavigate();

    // Utility class translations based on your CSS
    const customButtons = {
        // .btn-dark-custom (Navy Filled Button)
        dark: "bg-[#0A1735] text-white px-6 py-2 rounded-full font-semibold text-sm border-none shadow-sm hover:bg-[#1f2d50] transition duration-150",
        // .btn-outline-dark-custom (Light Outline Button)
        outline: "bg-white border border-gray-300 text-[#0A1735] px-6 py-2 rounded-full font-semibold text-sm shadow-sm hover:bg-gray-50 transition duration-150",
    };

    React.useEffect(() => {
        if (applyFilters && profileTableRef.current) {
            profileTableRef.current.scrollIntoView({ behavior: "smooth" });
            setTimeout(() => {
                fetchData();
                setApplyFilters(false);
            }, 500); // 500ms delay for smooth scroll
        }
    }, [applyFilters]);

    const statCardsMap: StatCardMapEntry[] = [
        ["overall_count", "TOTAL RENEWALS", "light-blue"],
        ["above_30", "AGE > 30", "cream"],
        ["under_30", "AGE < 30", "mint"],
        ["female_count", "FEMALE", "pink"],
        ["male_count", "MALE", "sky"],
        [["family_status_counts", "Upper Middle Class"], "UPPER MIDDLE CLASS", "light-pink"],
        [["family_status_counts", "Rich"], "RICH", "pale-yellow"],
        [["family_status_counts", "Affluent"], "AFFLUENT", "dark-navy"],
        ["yesterday_login_count", "YESTERDAY LOGIN", "blue-soft"],
        ["today_login_count", "TODAY LOGIN", "blue-soft"],
        [["last_action_counts", "over_90_days"], "3 MONTH NON-TOUCH (Idle > 90)", "very-light-pink"],
        [["last_action_counts", "over_45_days"], "IDLE DAYS > 45 (Idle > 45)", "very-light-pink"],
        ["expired_this_month_count", "THIS MONTH RENEWAL", "mint"],
        [["call_status_counts", "hot"], "HOT", "warm-pink"],
        [["call_status_counts", "warm"], "WARM", "pale-yellow"],
        [["call_status_counts", "cold"], "COLD", "grey"],
        [["call_status_counts", "not_interested"], "NOT INTERESTED", "grey"],
    ];

    const getStatCount = (stats: RenewalStats, keyPath: StatKeyPath): number => {
        if (typeof keyPath === 'string') {
            // Direct key access
            const value = stats[keyPath];
            // Explicitly handle nested objects which should not be interpreted as numbers
            if (typeof value === 'number') {
                return value;
            }
            return 0;
        } else if (Array.isArray(keyPath)) {
            const [objectKey, nestedKey] = keyPath;
            const nestedObj = stats[objectKey as keyof RenewalStats] as Record<string, number> | undefined;
            if (nestedObj && typeof nestedObj[nestedKey] === 'number') {
                return nestedObj[nestedKey];
            }
            return 0;
        }
        return 0;
    };

    useEffect(() => {
        if (SuperAdminID && profileOwners.length > 0) {
            const superAdminOwner = profileOwners.find(owner => String(owner.id) === SuperAdminID);
            if (superAdminOwner) {
                setFilters((prev) => ({ ...prev, staff: SuperAdminID }));
            }
        }
    }, [SuperAdminID, profileOwners]);

    const fetchOwners = React.useCallback(async () => {
        setIsOwnersLoading(true);
        setOwnersError(null);
        try {
            const ownersData = await fetchProfileOwners(); // Re-use the function from EditViewProfile's file
            setProfileOwners(ownersData);
        } catch (e) {
            console.error("Error fetching profile owners:", e);
            setOwnersError("Failed to load staff list.");
        } finally {
            setIsOwnersLoading(false);
        }
    }, []);

    React.useEffect(() => {
        fetchOwners();
    }, [fetchOwners]);

    const fetchPlans = React.useCallback(async () => {
        setIsPlansLoading(true);
        setPlansError(null);
        try {
            const res = await apiAxios.get("api/get-plans/");
            if (res.data.status) {
                setPlans(res.data.plans);
            } else {
                setPlansError("Failed to load plans");
            }
        } catch (e) {
            console.error("Error fetching plans:", e);
            setPlansError("Failed to load plans");
        } finally {
            setIsPlansLoading(false);
        }
    }, []);

    React.useEffect(() => {
        fetchPlans();
    }, [fetchPlans]);


    const fetchData = React.useCallback(async () => {
        setLoading(!stats); // Keep original dashboard loading logic
        setTableLoading(true); // 👇 NEW: Set table loading state
        setError(null);

        // Map filters object to URL search parameters as required by API
        const params = new URLSearchParams();
        if (filters.fromDate) params.append('from_date', filters.fromDate);
        if (filters.toDate) params.append('to_date', filters.toDate);
        if (RoleID !== "7") {
            // Default owner = logged in user when filters.staff is empty
            params.append("owner", filters.staff || SuperAdminID || "");
        } else {
            // Role 7 → send owner only when selected manually
            if (filters.staff) params.append("owner", filters.staff);
        }

        if (filters.plan) params.append('plan_id', filters.plan);
        if (filters.minAge) params.append('age_from', filters.minAge);
        if (filters.maxAge) params.append('age_to', filters.maxAge);
        // if (filters.staff) params.append('staff', filters.staff);
        //    if (filters.staff) params.append('staff', filters.staff);
        //       if (filters.staff) params.append('staff', filters.staff);
        // ... add other filters as needed
        if (filters.ageFilter) params.append('ageFilter', filters.ageFilter);
        if (filters.loginFilter) params.append('loginFilter', filters.loginFilter);
        if (filters.expiringFilter) params.append('expiringFilter', filters.expiringFilter);
        if (filters.callStatusFilter) params.append('callStatusFilter', filters.callStatusFilter);
        if (filters.familyFilter) params.append('familyFilter', filters.familyFilter);
        if (filters.idleDaysFilter) params.append('idleDaysFilter', filters.idleDaysFilter);

        // Check if the original 'gender' form filter is set, if not, use the card filter.
        // NOTE: If you use the 'genderFilter' card, you should clear the 'gender' form filter to avoid conflict.
        if (filters.genderFilter) {
            params.append('genderFilter', filters.genderFilter);
        }
        if (filters.searchQuery) {
            params.append('search', filters.searchQuery);
        }

        try {
            // Using axios.get instead of fetch
            const response = await apiAxios.get(`api/renewal-report/`, {
                params: Object.fromEntries(params.entries()) // Pass URLSearchParams as an object to Axios params
            });

            // Axios automatically parses JSON and checks for success (status >= 200 and < 300)
            const result = response.data;

            if (result.status) {
                // Axios result.data directly contains the response body
                setStats(result as RenewalStats);
            } else {
                setError("API call failed: Status is false.");
            }
        } catch (e) {
            // Axios handles non-2xx status codes (like 404, 500) as errors, caught here.
            // If it's an AxiosError, you can access the response details:
            if (axios.isAxiosError(e) && e.response) {
                console.error("Fetching renewal data failed (HTTP Error):", e.response.status, e.response.data);
                setError(`Failed to fetch dashboard data. HTTP status: ${e.response.status}`);
            } else {
                console.error("Fetching renewal data failed:", e);
                setError("Failed to fetch dashboard data. Please check network connection.");
            }
        } finally {
            setLoading(false);
            setTableLoading(false); // 👇 NEW: Clear table loading state
        }
    }, [filters]);

    // React.useEffect(() => {
    //     // if (applyFilters) {
    //     fetchData();
    //     //     setApplyFilters(false); // reset
    //     // }
    // }, [fetchData]);
    // useEffect(() => {
    //     fetchData();
    // }, [fetchData]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (applyFilters) {
            fetchData();
            setApplyFilters(false);
        }
    }, [applyFilters]);


    const statCardColors: Record<string, string> = {
        "light-blue": "bg-[#F1F7FF]",
        "cream": "bg-[#FFF6E4]",
        "mint": "bg-[#F0FFF7]",
        "pink": "bg-[#FFEFF5]",
        "sky": "bg-[#EFFFFF]",
        "light-pink": "bg-[#FFF3FA]",
        "pale-yellow": "bg-[#FFF8D7]",
        "blue-soft": "bg-[#EEF3FF]",
        "very-light-pink": "bg-[#FFECEC]",
        "warm-pink": "bg-[#FFE4E4]",
        "grey": "bg-[#F7F7F7]",
        "dark-navy": "bg-[#0A1735] text-white", // Special dark card
    };

    const statCardsData: Array<[string, string]> = [
        ["TOTAL RENEWALS", "light-blue"],
        ["AGE > 30", "cream"],
        ["AGE < 30", "mint"],
        ["FEMALE", "pink"],
        ["MALE", "sky"],
        ["UPPER MIDDLE CLASS", "light-pink"],
        ["RICH", "pale-yellow"],
        ["AFFLUENT", "dark-navy"],
        ["YESTERDAY LOGIN", "blue-soft"],
        ["TODAY LOGIN", "blue-soft"],
        ["3 MONTH NON-TOUCH", "very-light-pink"],
        ["IDLE DAYS > 45", "very-light-pink"],
        ["THIS MONTH RENEWAL", "mint"],
        ["HOT", "warm-pink"],
        ["WARM", "pale-yellow"],
        ["COLD", "grey"],
        ["NOT INTERESTED", "grey"],
    ];

    const cardFilterMap: Record<string, [keyof typeof filters, string]> = {
        // [API Filter Key, API Filter Value]

        // AGE Filters (ageFilter)
        "under_30": ["ageFilter", "under_30"],
        "above_30": ["ageFilter", "above_30"],

        // GENDER Filters (genderFilter)
        "male_count": ["genderFilter", "male"],
        "female_count": ["genderFilter", "female"],

        // LOGIN Filters (loginFilter)
        "today_login_count": ["loginFilter", "today"],
        "yesterday_login_count": ["loginFilter", "yesterday"],

        // EXPIRING Filter (expiringFilter)
        "expired_this_month_count": ["expiringFilter", "expiring_this_month"],

        // CALL STATUS Filters (callStatusFilter)
        "call_status_counts:hot": ["callStatusFilter", "hot"],
        "call_status_counts:warm": ["callStatusFilter", "warm"],
        "call_status_counts:cold": ["callStatusFilter", "cold"],
        "call_status_counts:not_interested": ["callStatusFilter", "not_interested"],

        // IDLE DAYS / LAST ACTION Filters (idleDaysFilter)
        // Assuming API accepts the number '45' or '90'
        "last_action_counts:over_45_days": ["idleDaysFilter", "45"],
        "last_action_counts:over_90_days": ["idleDaysFilter", "90"],

        // FAMILY STATUS Filters (familyFilter)
        // Note: If API expects 3, 4, or 6, change the value from the string name to the number ID. 
        // Based on the request, using the string names as values:
        "family_status_counts:Upper Middle Class": ["familyFilter", "3"],
        "family_status_counts:Rich": ["familyFilter", "4"],
        "family_status_counts:Affluent": ["familyFilter", "6"],
    };

    const getMapKey = (keyPath: StatKeyPath): string => {
        if (typeof keyPath === 'string') {
            return keyPath;
        }
        // Convert array path to a unique string key
        return `${keyPath[0]}:${keyPath[1]}`;
    };


    // Corrected handleCardClick function
    const handleCardClick = (keyPath: StatKeyPath) => {
        const mapKey = getMapKey(keyPath);
        // if (mapKey === "overall_count") {
        //     setFilters({
        //         fromDate: "",
        //         toDate: "",
        //         staff: "",
        //         plan: "",
        //         gender: "",
        //         minAge: "",
        //         maxAge: "",
        //         engagement: "",
        //         status: "",
        //         ageFilter: "",
        //         loginFilter: "",
        //         expiringFilter: "",
        //         callStatusFilter: "",
        //         familyFilter: "",
        //         idleDaysFilter: "",
        //         genderFilter: "",
        //         searchQuery: "",
        //     });
        //     setApplyFilters(true);
        //     return;
        // }
        if (mapKey === "overall_count") {
            // Remove only card-based filters, keep normal filters
            setFilters(prev => ({
                ...prev,
                ageFilter: "",
                loginFilter: "",
                expiringFilter: "",
                callStatusFilter: "",
                familyFilter: "",
                idleDaysFilter: "",
                genderFilter: "",
            }));
            setApplyFilters(true);
            return;
        }


        const filterChange = cardFilterMap[mapKey];

        if (!filterChange) {
            console.warn(`No filter mapping found for keyPath: ${mapKey}`);
            return;
        }

        const [filterKey, filterValue] = filterChange;

        // Use the correct Type assertion for accessing the filter
        const currentFilterValue = filters[filterKey];

        let newFilters = { ...filters };

        if (currentFilterValue === filterValue) {
            newFilters = { ...newFilters, [filterKey]: "" };
        } else {
            newFilters.ageFilter = "";
            newFilters.loginFilter = "";
            newFilters.expiringFilter = "";
            newFilters.callStatusFilter = "";
            newFilters.familyFilter = "";
            newFilters.idleDaysFilter = "";
            newFilters.genderFilter = "";
            newFilters = { ...newFilters, [filterKey]: filterValue };
        }

        setFilters(newFilters);
        setApplyFilters(true); // Trigger a new API fetch
    };

    const handleReset = () => {
        setFilters({
            fromDate: "",
            toDate: "",
            staff: "",
            plan: "",
            gender: "",
            minAge: "",
            maxAge: "",
            engagement: "",
            status: "",
            ageFilter: "",
            loginFilter: "",
            expiringFilter: "",
            callStatusFilter: "",
            familyFilter: "",
            idleDaysFilter: "",
            genderFilter: "",
            searchQuery: "",
        });
        setApplyFilters(true);
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

    const LoadingSpinner = () => (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                py: 8,
                minHeight: '200px',
                width: '100%',
            }}
        >
            <CircularProgress color="primary" size={30} />
            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                Loading Dashboard Data...
            </Typography>
        </Box>
    );


    if (loading && !stats) {
        return <LoadingSpinner />;
    }


    if (error) {
        return <div className="min-h-screen bg-[#F5F7FB] font-inter text-red-600 p-8 text-center text-lg"> Error: {error}</div>;
    }

    // Prepare data for rendering (default to empty values if stats is null)
    const displayStats = stats || ({} as RenewalStats);
    const profiles = stats?.data || [];
    const profileCount = stats?.filtered_count ?? 0;
    const todayWorkCount = displayStats.action_counts?.today_work ?? 0;
    const pendingWorkCount = displayStats.action_counts?.pending_work ?? 0;

    return (
        // Equivalent to body { background: #F5F7FB; }
        <div className="min-h-screen bg-[#F5F7FB] font-inter text-black">

            {/* HEADER + FILTERS */}
            {/* Equivalent to .renewal-dashboard */}
            <section className="py-4">
                <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8">

                    {/* HEADER */}
                    <div className="flex flex-wrap justify-between items-start mb-3 gap-2">
                        <div>
                            {/* Equivalent to h2.fw-bold */}
                            <h2 className="text-2xl text-start font-bold mb-1">Renewal Dashboard</h2>
                            {/* Equivalent to p.text-muted m-0 */}
                            <p className="text-gray-500 m-0 text-base">
                                Overview of renewal profiles, engagement and staff performance.
                            </p>
                        </div>
                        {/* Equivalent to .action-buttons */}
                        <div className="flex gap-2">
                            <button className={customButtons.outline}>Export</button>
                            <button className={customButtons.dark}>Download Report</button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-[#E3E6EE] p-7 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Form Input Group */}
                            <div className="col-span-1">
                                {/* Equivalent to .form-label */}
                                <label className="block text-sm font-semibold text-[#3A3E47] mb-1">From Date</label>
                                <input
                                    type="date"
                                    value={filters.fromDate}
                                    onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
                                    className="w-full h-12 px-3 border border-gray-300 rounded-lg text-sm"
                                />                            </div>

                            {/* ... Other filter inputs (To Date, Staff, Plan, Gender, Engagement, Status) would follow the same structure */}
                            <div className="col-span-1">
                                <label className="block text-sm font-semibold text-[#3A3E47] mb-1">To Date</label>
                                <input
                                    type="date"
                                    value={filters.toDate}
                                    onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
                                    className="w-full h-12 px-3 border border-gray-300 rounded-lg text-sm"
                                />
                            </div>
                            {RoleID === "7" && (
                                <div className="col-span-1">
                                    <label className="block text-sm font-semibold text-[#3A3E47] mb-1">Staff</label>
                                    <select
                                        value={filters.staff}
                                        onChange={(e) => setFilters({ ...filters, staff: e.target.value })}
                                        className="w-full h-12 px-3 cursor-pointer border border-gray-300 rounded-lg text-sm
               disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                                        disabled={isOwnersLoading}  // disable for super admin
                                    >
                                        <option value="">
                                            {isOwnersLoading ? 'Loading Staff...' : 'Select Staff'}
                                        </option>
                                        {profileOwners.map((owner) => (
                                            <option key={owner.id} value={owner.id}>
                                                {owner.username}
                                            </option>
                                        ))}
                                    </select>

                                    {ownersError && <p className="text-red-500 text-xs mt-1">{ownersError}</p>}
                                </div>
                            )}

                            <div className="col-span-1">
                                <label className="block text-sm font-semibold text-[#3A3E47] mb-1">Plan</label>
                                <select
                                    value={filters.plan}
                                    onChange={(e) => setFilters({ ...filters, plan: e.target.value })}
                                    className="w-full h-12 cursor-pointer  px-3 border border-gray-300 rounded-lg text-sm"
                                    disabled={isPlansLoading}
                                >
                                    <option value="">
                                        {isPlansLoading ? "Loading Plans..." : "Select Plan"}
                                    </option>

                                    {plans.map((item) => (
                                        <option key={item.id} value={item.id}>  {/* ID goes to params */}
                                            {item.plan_name} {/* Show plan_name */}
                                        </option>
                                    ))}
                                </select>

                                {plansError && <p className="text-red-500 text-xs mt-1">{plansError}</p>}
                            </div>


                            {/* <div className="col-span-1">
                                <label className="block text-sm font-semibold text-[#3A3E47] mb-1">Gender</label>
                                <select
                                    value={filters.gender}
                                    onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                                    className="w-full h-12  px-3  cursor-pointer  border border-gray-300 rounded-lg text-sm"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="all">All</option>
                                </select>
                            </div> */}

                            {/* Age Range - Equivalent to .age-range-wrap */}
                            <div className="col-span-1">
                                <label className="block text-sm font-semibold text-[#3A3E47] mb-1">Age Range</label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={filters.minAge}
                                        onChange={(e) => setFilters({ ...filters, minAge: e.target.value })}
                                        className="w-1/2 h-12 px-3 cursor-pointer border border-gray-300 rounded-lg text-sm"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={filters.maxAge}
                                        onChange={(e) => setFilters({ ...filters, maxAge: e.target.value })}
                                        className="w-1/2 h-12 px-3 border border-gray-300 rounded-lg text-sm"
                                    />
                                </div>
                            </div>

                            {/* <div className="col-span-1">
                                <label className="block text-sm font-semibold text-[#3A3E47] mb-1">Engagement</label>
                                <select
                                    value={filters.engagement}
                                    onChange={(e) => setFilters({ ...filters, engagement: e.target.value })}
                                    className="w-full h-12 px-3 cursor-pointer border border-gray-300 rounded-lg text-sm"
                                >
                                    <option value="">Select Engagement</option>
                                    <option value="all">All</option>
                                </select>
                            </div> */}

                            {/* <div className="col-span-1">
                                <label className="block text-sm font-semibold text-[#3A3E47] mb-1">Status</label>
                                <select
                                    value={filters.status}
                                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                    className="w-full h-12 px-3 cursor-pointer border border-gray-300 rounded-lg text-sm"
                                >
                                    <option value="">Select Status</option>
                                    <option value="all">All</option>
                                </select>
                            </div> */}

                            {/* Buttons - Equivalent to .btn-row */}
                            <div className="col-span-full flex justify-end gap-3 mt-2">
                                <button className={customButtons.outline} onClick={handleReset}>Reset</button>
                                <button className={customButtons.dark} onClick={() => setApplyFilters(true)} >Apply Filters</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS CARDS */}
            <section className="renewal-stats mt-4">
                <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">

                        {statCardsMap.map(([keyPath, title, color], idx) => {
                            // Use getMapKey to determine if this card's filter is currently active for styling
                            const mapKey = getMapKey(keyPath);
                            const filterChange = cardFilterMap[mapKey];

                            // Determine if this card is the currently active filter
                            let isActive = false;
                            if (filterChange) {
                                const [filterKey, filterValue] = filterChange;
                                isActive = filters[filterKey as keyof typeof filters] === filterValue;
                            }

                            return (
                                <div key={idx} className="col-span-1">
                                    <div
                                        onClick={() => handleCardClick(keyPath)} // 👈 ADD CLICK HANDLER HERE
                                        className={`p-5 rounded-2xl min-h-[140px] border flex flex-col justify-center cursor-pointer transition duration-200 hover:translate-y-[-3px] 
                        ${statCardColors[color]}
                        ${isActive ? 'border-4 border-black/50 shadow-lg' : 'border-[#E3E6EE]'} // 👈 Add an active style
                    `}
                                    >
                                        <h6 className="text-xs font-bold mb-1 tracking-wider">{title}</h6>
                                        <h2 className={`text-3xl text-start font-bold mb-1 ${color === 'dark-navy' ? 'text-white' : 'text-gray-900'}`}>
                                            {getStatCount(displayStats, keyPath)}
                                        </h2>
                                        <p className={`text-xs m-0 ${color === 'dark-navy' ? 'text-gray-300' : 'text-gray-600'}`}>{isActive ? 'Click to clear filter' : 'Click to view profiles'}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* WORK STATS */}
            {/* Equivalent to .work-stats-section */}
            <section className="bg-gray-50 py-4 mt-4">
                <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                        {/* Work Card structure - Equivalent to .work-card */}
                        <div className="col-span-1">
                            <div className="bg-white rounded-xl p-6 border border-[#e6ecf2] shadow-sm h-full flex flex-col justify-between">
                                <div>
                                    <h5 className="text-base font-semibold text-gray-900 mb-1">Today's Work</h5>
                                    <p className="text-xs text-gray-600 mb-4">Total tasks to be completed today.</p>
                                </div>
                                <div className="text-3xl font-bold text-[#000c28]">{todayWorkCount}</div>
                            </div>
                        </div>

                        <div className="col-span-1">
                            <div className="bg-white rounded-xl p-6 border border-[#e6ecf2] shadow-sm h-full flex flex-col justify-between">
                                <div>
                                    <h5 className="text-base font-semibold text-gray-900 mb-1">Pending Work</h5>
                                    <p className="text-xs text-gray-600 mb-4">Carry-forward items not completed.</p>
                                </div>
                                <div className="text-3xl font-bold text-[#000c28]">{pendingWorkCount}</div>
                            </div>
                        </div>

                        {/* <div className="col-span-1">
                            <div className="bg-white rounded-xl p-6 border border-[#e6ecf2] shadow-sm h-full flex flex-col justify-between">
                                <div>
                                    <h5 className="text-base font-semibold text-gray-900 mb-1">No Photo / Horo</h5>
                                    <p className="text-xs text-gray-600 mb-4">Profiles missing photo or horoscope.</p>
                                </div>
                                <div className="text-3xl font-bold text-[#000c28]">0</div>
                            </div>
                        </div> */}

                        {/* Performance Report Card - Equivalent to .performance-card */}
                        {/* <div className="col-span-1">
                            <div className="bg-white rounded-xl p-6 border border-[#e6ecf2] shadow-sm h-full">
                                <div className="flex justify-between items-start">
                                    <h5 className="text-base font-semibold text-gray-900">Performance Report</h5>
                                   
                                    <span className="bg-[#d1f7e3] px-2 py-0.5 rounded-full text-xs text-[#129f46] font-semibold">This Month</span>
                                </div>
                                
                                <ul className="list-none p-0 mt-5 space-y-2">
                                    <li className="flex justify-between text-sm text-gray-700"><span>Calls Attended</span><b className="font-semibold">50</b></li>
                                    <li className="flex justify-between text-sm text-gray-700"><span>Ringing / Switch Off</span><b className="font-semibold">60</b></li>
                                    <li className="flex justify-between text-sm text-gray-700"><span>Action Taken</span><b className="font-semibold">30</b></li>
                                    <li className="flex justify-between text-sm text-gray-700"><span>Joined as Premium</span><b className="font-semibold">20</b></li>
                                </ul>
                            </div>
                        </div> */}

                    </div>
                </div>
            </section>

            {/* STAFF SUMMARY TABLE */}
            {/* Equivalent to .staff-summary-section */}
            {/* <section className="bg-gray-100 py-4">
                <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8">
                   
                    <div className="bg-white rounded-xl p-6 border border-[#e6ecf2] shadow-md">

                        
                        <div className="flex justify-between items-center mb-4">
                            <h5 className="text-lg font-semibold text-gray-900 m-0">Staff Renewal Summary</h5>
                            <span className="text-sm text-gray-500">Grouped by staff owner</span>
                        </div>

                        <div className="overflow-x-auto">
                            
                            <table className="min-w-full summary-table border-separate border-spacing-0">
                                <thead>
                                   
                                    <tr className="bg-gray-50">
                                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0 rounded-tl-xl">Staff</th>
                                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Total Renewals</th>
                                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Hot</th>
                                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Warm</th>
                                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Cold</th>
                                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Idle &gt; 30 Days</th>
                                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Non-touch 3M</th>
                                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Today Login</th>
                                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0 rounded-tr-xl">Yesterday Login</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-800 border border-[#e5ebf1]">—</td>
                                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-800 border border-[#e5ebf1]">0</td>
                                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-800 border border-[#e5ebf1]">0</td>
                                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-800 border border-[#e5ebf1]">0</td>
                                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-800 border border-[#e5ebf1]">0</td>
                                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-800 border border-[#e5ebf1]">0</td>
                                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-800 border border-[#e5ebf1]">0</td>
                                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-800 border border-[#e5ebf1]">0</td>
                                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-800 border border-[#e5ebf1]">0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </section> */}

            {/* Equivalent to .renewal-profile-section */}
            <section ref={profileTableRef} className="bg-gray-100 py-4">
                <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Equivalent to .profile-box */}
                    <div className="bg-white rounded-xl p-6 border border-[#e6ecf2] shadow-md">

                        <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
                            <h5 className="text-lg font-semibold m-0">Renewal Profile Detail ({profileCount})</h5>
                            <div className="flex gap-2 items-center">
                                {/* Equivalent to .search-input */}
                                <input
                                    type="text"
                                    className="w-[250px] sm:w-[200px] h-10 px-4 rounded-full border border-gray-300 text-sm focus:outline-none focus:border-gray-500"
                                    placeholder="Search Profile ID / Name"
                                    value={filters.searchQuery}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFilters({ ...filters, searchQuery: value });

                                        if (searchTimer) clearTimeout(searchTimer);

                                        const newTimer = setTimeout(() => {
                                            setApplyFilters(true);   // 👈 Call API after typing stops
                                        }, 3000); // ⏱ debounce delay
                                        setSearchTimer(newTimer);
                                    }}
                                />

                                {/* Equivalent to .clear-btn */}
                                <button className="h-10 px-4 rounded-full bg-white border border-gray-300 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition duration-150"
                                    onClick={() => {
                                        setFilters({ ...filters, searchQuery: "" });
                                        setApplyFilters(true);  // 👈 reload table after clearing
                                    }}
                                >Clear</button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            {/* Equivalent to .profile-table */}
                            <table className="min-w-full profile-table border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0 rounded-tl-xl">Profile ID</th>
                                        {/* ... other ths ... */}
                                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Name</th>
                                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Age</th>
                                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Family Status</th>
                                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Education Details</th>
                                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Annual Income</th>
                                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">City</th>
                                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Mode</th>
                                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Owner</th>
                                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">From Date</th>
                                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">To Date</th>
                                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Last Login</th>
                                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Idle Days</th>
                                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Status</th>
                                        {/* <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0">Call Logs (+)</th>
                                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-[#e5ebf1] border-b-0 rounded-tr-xl">Customer Log (+)</th> */}
                                    </tr>
                                </thead>
                                {!tableLoading ? (
                                    <tbody>
                                        {profiles.map((profile, index) => (
                                            <tr key={profile.ProfileId || index}>
                                                <td className="px-3 py-3 whitespace-nowrap text-sm border border-[#e5ebf1] text-[#1d4ed8] font-semibold hover:underline"
                                                    onClick={() => navigate(`/viewProfile?profileId=${profile.ProfileId}`)}
                                                >{profile.ProfileId || 'N/A'}</td>
                                                <td className="px-3 py-3 whitespace-nowrap text-sm border border-[#e5ebf1] text-gray-800">{profile.Profile_name || 'N/A'}</td>
                                                <td className="px-3 py-3 whitespace-nowrap text-sm border border-[#e5ebf1] text-gray-800">{profile.age || 'N/A'}</td>
                                                <td className="px-3 py-3 whitespace-nowrap text-sm border border-[#e5ebf1] text-gray-800">{profile.family_status_name || 'N/A'}</td>
                                                <td className="px-3 py-3 whitespace-nowrap text-sm border border-[#e5ebf1] text-gray-800">{profile.degree_name || profile.other_degree || 'N/A'}</td>
                                                <td className="px-3 py-3 whitespace-nowrap text-sm border border-[#e5ebf1] text-gray-800">{profile.income || 'N/A'}</td>
                                                <td className="px-3 py-3 whitespace-nowrap text-sm border border-[#e5ebf1] text-gray-800">{profile.Profile_city || 'N/A'}</td>
                                                <td className="px-3 py-3 whitespace-nowrap text-sm border border-[#e5ebf1] text-gray-800">{profile.plan_name}</td>
                                                <td className="px-3 py-3 whitespace-nowrap text-sm border border-[#e5ebf1] text-gray-800">{profile.owner_name || 'N/A'}</td>
                                                <td className="px-3 py-3 whitespace-nowrap text-sm border border-[#e5ebf1] text-gray-800">{new Date(profile.membership_startdate).toLocaleDateString()}</td>
                                                <td className="px-3 py-3 whitespace-nowrap text-sm border border-[#e5ebf1] text-gray-800">{new Date(profile.membership_enddate).toLocaleDateString()}</td>
                                                <td className="px-3 py-3 whitespace-nowrap text-sm border border-[#e5ebf1] text-gray-800">{new Date(profile.Last_login_date).toLocaleDateString()}</td>
                                                <td className="px-3 py-3 whitespace-nowrap text-sm border border-[#e5ebf1] text-gray-800">{profile.idle_days ?? 'N/A'}</td>
                                                <td className="px-3 py-3 whitespace-nowrap text-sm border border-[#e5ebf1] text-gray-800">
                                                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusPillClass(profile.call_status)}`}>
                                                        {profile.call_status || 'N/A'}
                                                    </span>
                                                </td>
                                                {/* <td className="px-3 py-3 whitespace-nowrap text-sm border border-[#e5ebf1] text-[#1d4ed8] font-semibold hover:underline cursor-pointer">View</td>
                                                <td className="px-3 py-3 whitespace-nowrap text-sm border border-[#e5ebf1] text-[#1d4ed8] font-semibold hover:underline cursor-pointer">View</td> */}
                                            </tr>
                                        ))}
                                        {profiles.length === 0 && (
                                            <tr>
                                                <td colSpan={16} className="text-center py-8 text-black font-semibold text-sm">
                                                    No Renewal Profiles found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                ) : (
                                    <tbody>
                                        {/* Single row that spans all columns for the loading state */}
                                        <tr>
                                            <td colSpan={16} className="py-20">
                                                <div className="flex flex-col items-center justify-center">
                                                    {/* Spinner */}
                                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1d4ed8] mb-4"></div>

                                                    {/* Loading text */}
                                                    <p className="text-sm text-gray-600 font-medium">
                                                        Loading Renewal Profiles...
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </table>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
};

export default RenewalDashboard;