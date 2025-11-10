// // 📂 NewMatchingTable.tsx
// import {
//     Avatar,
//     Checkbox,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
// } from "@mui/material";
// import { useState } from "react";

// interface ActionScore {
//     score: number;
//     actions: { action: string; datetime: string }[];
// }

// interface UserMatchingProfilesProps {
//     profile_id: string;
//     profile_name: string;
//     profile_img: string;
//     profile_age: number;
//     degree: string;
//     profession: string;
//     city: string;
//     state: string;
//     anual_income: string;
//     family_status: string;
//     company_name: string;
//     designation: string;
//     father_occupation: string;
//     star: string;
//     suya_gothram: string;
//     chevvai: string;
//     raguketu: string;
//     dateofjoin: string;
//     action_score: ActionScore;
//     status?: string;
//     work_place?: string;
//     mode?: string;
// }

// const columns = [
//     // { id: "select", label: "Select" },
//     { id: "profile_img", label: "Image" },
//     { id: "profile_id", label: "Profile ID" },
//     { id: "work_place", label: "Work Place" },
//     { id: "mode", label: "Mode" },
//     { id: "profile_name", label: "Name" },
//     { id: "profile_age", label: "Age" },
//     { id: "star", label: "Star" },
//     { id: "degree", label: "Degree" },
//     { id: "profession", label: "Profession" },
//     { id: "company_name", label: "Company / Business" },
//     { id: "designation", label: "Designation / Nature" },
//     { id: "anual_income", label: "Annual Income" },
//     { id: "state", label: "State" },
//     { id: "city", label: "City" },
//     { id: "family_status", label: "Family Status" },
//     { id: "father_occupation", label: "Father Business" },
//     { id: "suya_gothram", label: "Suya Gothram" },
//     { id: "chevvai", label: "Admin Chevvai" },
//     { id: "raguketu", label: "Admin Raghu/Kethu" },
//     { id: "dateofjoin", label: "Reg Date" },
//     { id: "status", label: "Status" },
//     { id: "score", label: "Score" },
//     { id: "action_score", label: "Action" },
// ];

// // Example static data
// const staticProfiles: UserMatchingProfilesProps[] = [
//     {
//         profile_id: "P1001",
//         profile_name: "Arun Kumar",
//         profile_img: "https://via.placeholder.com/50",
//         profile_age: 28,
//         degree: "B.Tech",
//         profession: "Software Engineer",
//         company_name: "Infosys",
//         designation: "Developer",
//         anual_income: "8 LPA",
//         state: "Tamil Nadu",
//         city: "Chennai",
//         family_status: "Middle Class",
//         father_occupation: "Business",
//         star: "Ashwini",
//         suya_gothram: "Kashyapa",
//         chevvai: "No",
//         raguketu: "Yes",
//         dateofjoin: "2024-05-12",
//         action_score: {
//             score: 85,
//             actions: [{ action: "Profile Viewed", datetime: "2024-06-01T12:30:00" }],
//         },
//         status: "Active",
//         work_place: "IT Park",
//         mode: "Online",
//     },
//     {
//         profile_id: "P1002",
//         profile_name: "Priya Sharma",
//         profile_img: "https://via.placeholder.com/50",
//         profile_age: 25,
//         degree: "MBA",
//         profession: "HR Manager",
//         company_name: "Wipro",
//         designation: "Manager",
//         anual_income: "12 LPA",
//         state: "Karnataka",
//         city: "Bangalore",
//         family_status: "Upper Middle Class",
//         father_occupation: "Retired",
//         star: "Rohini",
//         suya_gothram: "Bharadvaja",
//         chevvai: "Yes",
//         raguketu: "No",
//         dateofjoin: "2024-07-20",
//         action_score: {
//             score: 92,
//             actions: [{ action: "Sent Email", datetime: "2024-08-05T09:15:00" }],
//         },
//         status: "Inactive",
//         work_place: "Corporate Office",
//         mode: "Offline",
//     },
// ];

// export const NewMatchingTable = () => {
//     const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
//     const [search, setSearch] = useState("");
//     const [active, setActive] = useState("All");

//     const buttons = ["All", "Sent", "Unsent"];
//     const clearSearch = () => setSearch("");

//     const handleCheckboxChange = (profileId: string) => {
//         setSelectedProfiles((prev) =>
//             prev.includes(profileId)
//                 ? prev.filter((id) => id !== profileId)
//                 : [...prev, profileId]
//         );
//     };

//     return (

//         <div className="container mx-auto p-4">
//             <div className="mb-4 flex justify-between items-center">
//                 <div>
//                     <h2 className="text-xl text-left font-bold text-red-600">Vysyamala Matching Profiles</h2>
//                     <p className="text-sm text-gray-600">
//                         Select profiles → choose format → choose actions → Send
//                     </p>

//                     <div className="flex gap-2 mt-3">
//                         {buttons.map((btn) => (
//                             <button
//                                 key={btn}
//                                 onClick={() => setActive(btn)}
//                                 className={`px-4 py-1 rounded-full text-black font-semibold ${active === btn
//                                     ? "bg-red-600 text-white"
//                                     : "border border-yellow-400 text-yellow-600 bg-yellow-50"
//                                     }`}
//                             >
//                                 {btn}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Top-right field */}
//                 <div className="flex items-center gap-2">
//                     {/* <div className="bg-[#FFF9DB] px-2 py-1 text-black rounded-lg text-sm">
//                         Preview UI • Enriched
//                     </div> */}
//                     <span className="text-sm">Profiles: {selectedProfiles.length} selected</span>
//                 </div>
//             </div>
//             <div className="flex flex-wrap items-center gap-4 mb-4">
//                 {/* Format */}
//                 <div>
//                     <label className="block font-bold text-black">Format</label>
//                     <select className="border border-gray-300 rounded px-3 py-1 w-100 text-black text-sm focus:outline-none">
//                         <option>HTML with address</option>
//                         <option>HTML without address</option>
//                         <option>HTML without address + Compatibility</option>
//                         <option>HTML with address + Compatibility</option>
//                         <option>
//                             HTML with address + Compatibility + self attached horoscope (original)
//                         </option>
//                         <option>
//                             HTML with address + Compatibility + self attached horoscope (admin)
//                         </option>
//                     </select>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex flex-col items-start flex-1">
//                     <label className="block font-semibold text-black mb-1 ">Actions</label>
//                     <div className="flex gap-4">
//                         <label className="flex items-center">
//                             <input type="radio" name="action" className="mr-1" /> Print
//                         </label>
//                         <label className="flex items-center">
//                             <input type="radio" name="action" className="mr-1" /> WhatsApp
//                         </label>
//                         <label className="flex items-center">
//                             <input type="radio" name="action" className="mr-1" /> Email
//                         </label>
//                     </div>
//                 </div>

//                 {/* Search */}
//                 <div className="flex items-center gap-2 ml-auto ">
//                     <div className="relative">
//                         <input
//                             type="text"
//                             placeholder="Search name / id / profession"
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             className="border border-gray-300 rounded px-3 py-1 pr-8 focus:outline-none"
//                         />
//                         {search && (
//                             <button
//                                 onClick={clearSearch}
//                                 className="absolute right-2 top-1/2 -translate-y-1/2 text-black hover:text-gray-700"
//                             >
//                                 ×
//                             </button>
//                         )}
//                     </div>
//                     <button className="px-3 py-0.2 text-white border   bg-[#1976D2] whitespace-nowrap rounded">Search</button>
//                     <button className="px-3 py-0.2 text-white  border  bg-[#1976D2] whitespace-nowrap rounded">Send Selected</button>
//                 </div>
//             </div>

//             <Paper className="w-full">
//                 <TableContainer component={Paper}>
//                     <Table sx={{ minWidth: 650 }}>
//                         <TableHead style={{ background: "#FFF9C9" }}>
//                             <TableRow>
//                                 <TableCell>
//                                     <Checkbox
//                                         checked={selectedProfiles.length === staticProfiles.length && staticProfiles.length > 0}
//                                         indeterminate={
//                                             selectedProfiles.length > 0 &&
//                                             selectedProfiles.length < staticProfiles.length
//                                         }
//                                         onChange={(e) => {
//                                             if (e.target.checked) {
//                                                 // Select all
//                                                 setSelectedProfiles(staticProfiles.map((row) => row.profile_id));
//                                             } else {
//                                                 // Deselect all
//                                                 setSelectedProfiles([]);
//                                             }
//                                         }}
//                                     />
//                                 </TableCell>
//                                 {columns.map((column) => (
//                                     <TableCell
//                                         key={column.id}
//                                         sx={{
//                                             fontWeight: "bold",
//                                             color: "#ee3448",
//                                             fontSize: "0.95rem",
//                                             whiteSpace: "nowrap",
//                                         }}
//                                     >
//                                         {column.label}
//                                     </TableCell>
//                                 ))}
//                             </TableRow>
//                         </TableHead>

//                         <TableBody>
//                             {staticProfiles.map((row) => (
//                                 <TableRow key={row.profile_id}>
//                                     {/* Select */}
//                                     <TableCell>
//                                         <Checkbox
//                                             checked={selectedProfiles.includes(row.profile_id)}
//                                             onChange={() => handleCheckboxChange(row.profile_id)}
//                                         />
//                                     </TableCell>

//                                     {/* Image */}
//                                     <TableCell>
//                                         <Avatar src={row.profile_img} alt={row.profile_name} />
//                                     </TableCell>

//                                     <TableCell>{row.profile_id}</TableCell>
//                                     <TableCell>{row.work_place}</TableCell>
//                                     <TableCell>{row.mode}</TableCell>
//                                     <TableCell>{row.profile_name}</TableCell>
//                                     <TableCell>{row.profile_age}</TableCell>
//                                     <TableCell>{row.star}</TableCell>
//                                     <TableCell>{row.degree}</TableCell>
//                                     <TableCell>{row.profession}</TableCell>
//                                     <TableCell>{row.company_name}</TableCell>
//                                     <TableCell>{row.designation}</TableCell>
//                                     <TableCell>{row.anual_income}</TableCell>
//                                     <TableCell>{row.state}</TableCell>
//                                     <TableCell>{row.city}</TableCell>
//                                     <TableCell>{row.family_status}</TableCell>
//                                     <TableCell>{row.father_occupation}</TableCell>
//                                     <TableCell>{row.suya_gothram}</TableCell>
//                                     <TableCell>{row.chevvai}</TableCell>
//                                     <TableCell>{row.raguketu}</TableCell>
//                                     <TableCell>
//                                         {new Date(row.dateofjoin).toLocaleDateString("en-GB")}
//                                     </TableCell>
//                                     <TableCell>{row.status}</TableCell>
//                                     <TableCell>{row.action_score.score}</TableCell>
//                                     <TableCell>
//                                         <span style={{ cursor: "pointer", color: "#007bff" }}>
//                                             Profile Viewed
//                                         </span>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Paper>
//         </div>
//     );
// };

import { useState, useEffect } from 'react';
import {
    Box, Button, Checkbox, CircularProgress, IconButton, Paper, Table, TableBody,
    TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField,
    Typography, Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MdVerified } from 'react-icons/md';
import { GoUnverified } from 'react-icons/go';
import { NotifyError, NotifySuccess } from '../../common/Toast/ToastMessage';
import { MatchingEmailProfile, MatchingPrintProfile, MatchingWhatsappProfile, userMatchingProfiles, userMatchingProfilesFilterListMatch, userMatchingProfilesPrintProfile, userMatchingProfilesSendEmail, userMatchingProfilesWhatsapp } from '../../api/apiConfig';

interface ActionScore {
    score: number;
    actions: any[];
}


interface UserMatchingProfilesProps {
    profile_id: string;
    profile_name: string;
    profile_img: string;
    profile_age: number;
    plan: string;
    family_status: string;
    degree: string;
    anual_income: string;
    star: string;
    profession: string;
    city: string;
    state: string;
    work_place: string;
    designation: string;
    company_name: string;
    father_occupation: string;
    suya_gothram: string;
    chevvai: string;
    raguketu: string;
    photo_protection: number;
    matching_score: number;
    wish_list: number;
    verified: number;
    action_score: ActionScore;
    dateofjoin: string;
}

const columns = [
    { id: "select", label: "Select" },
    { id: 'profile_img', label: 'Image' },
    { id: 'profile_id', label: 'Profile ID' },
    { id: 'work_place', label: 'Work Place' },
    { id: 'plan', label: 'Mode' },
    { id: 'profile_name', label: 'Name' },
    { id: 'profile_age', label: 'Age' },
    { id: 'star', label: 'Star' },
    { id: 'degree', label: 'Degree' },
    { id: 'profession', label: 'Profession' },
    { id: 'company_name', label: 'Company / Buisness' },
    { id: 'designation', label: 'Designation / Nature' },
    { id: 'anual_income', label: 'Annual Income' },
    { id: 'state', label: 'State' },
    { id: 'city', label: 'City' },
    { id: 'family_status', label: 'Family Status' },
    { id: 'father_occupation', label: 'Father Business' },
    { id: 'suya_gothram', label: 'Suya Gothram' },
    { id: 'chevvai', label: 'Admin Chevvai' },
    { id: 'raguketu', label: 'Admin Raghu/Kethu' },
    { id: 'dateofjoin', label: 'Reg Date' },
    { id: "status", label: "Status" },
    { id: "matching_score", label: "Score" },
    { id: 'action_score', label: 'Action' },
];


interface UserMatchingProfilesTableProps {
    profileID: string | null;
    filters: any;
    onBack: () => void;
    No_Image_Available: any;
    profileType: 'matching' | 'suggested';
}

export const NewMatchingTable = ({ profileID, filters, onBack, No_Image_Available, profileType }: UserMatchingProfilesTableProps) => {
    const navigate = useNavigate();
    const [matchingData, setMatchingData] = useState<UserMatchingProfilesProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    // const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
    const [selectedFormat, setSelectedFormat] = useState<string>("");
    const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
    const [printFormat, setPrintFormat] = useState<string>("");
    const [isPrintProfile, setIsPrintProfile] = useState<boolean>(false);
    const [whatsappFormat, setWhatsappFormat] = useState<string>("");
    const [iswhatsappProfile, setIsWhatsappProfile] = useState<boolean>(false);
    const [goToPageInput, setGoToPageInput] = useState<string>('');
    const roleId = sessionStorage.getItem('role_id');
    const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
    const [search, setSearch] = useState("");
    const [active, setActive] = useState("All");

    const buttons = ["All", "Sent", "Unsent"];
    const clearSearch = () => setSearch("");

    // const handleCheckboxChange = (profileId: string) => {
    //     setSelectedProfiles((prev) =>
    //         prev.includes(profileId)
    //             ? prev.filter((id) => id !== profileId)
    //             : [...prev, profileId]
    //     );
    // };

    // Tooltip function
    const formatActionsForTooltip = (actions: any[]) => {
        if (!actions || actions.length === 0) {
            return "No actions recorded";
        }

        return (
            <div>
                {actions.map((action, index) => {
                    const date = new Date(action.datetime);
                    const formattedDate = date.toLocaleDateString();

                    return (
                        <div key={index}>
                            <strong>{action.action}</strong> – {formattedDate}
                        </div>
                    );
                })}
            </div>
        );
    };

    useEffect(() => {
        const fetchMatchingData = async () => {
            if (!profileID) return;
            setLoading(true);
            try {
                let data;
                if (filters) {
                    // Use filtered data with profileType
                    data = await userMatchingProfilesFilterListMatch(
                        String(profileID),
                        currentPage + 1,
                        itemsPerPage,
                        filters.selectedComplexions,
                        filters.selectedEducation,
                        filters.selectedFieldsOfStudy, // Add this
                        filters.selectedDegrees, // Add this
                        filters.heightFrom,
                        filters.heightTo,
                        filters.minAnnualIncome,
                        filters.maxAnnualIncome,
                        filters.foreignInterest,
                        filters.selectedState,
                        filters.selectedCity,
                        filters.selectedMembership,
                        filters.hasphotos,
                        filters.destRasiIds,
                        filters.ageDifference,
                        filters.sarpaDhosham,
                        filters.chevvaiDhosam,
                        filters.selectedProfessions,
                        filters.motherLive,
                        filters.fatherLive,
                        filters.selectedMaritalStatus,
                        filters.selectedFamilyStatus,
                        filters.sentInWhatsapp,
                        filters.prefPoruthamStarRasi,
                        filters.fromDateOfJoin,
                        filters.toDateOfJoin,
                        profileType // Pass the profileType here
                    );
                } else {
                    // You might need to create separate functions for default data
                    // For now, using the same function with empty filters
                    data = await userMatchingProfilesFilterListMatch(
                        String(profileID),
                        currentPage + 1,
                        itemsPerPage,
                        "", "", "", "", 0, 0, 0, 0, "", 0, 0, 0, "", 0, 0, "", "", "", "", "", "", "", "", "", "", "", profileType
                    );
                }

                setMatchingData(data.profiles || []);
                setTotalItems(data.total_count || 0);
            } catch (error: any) {
                NotifyError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMatchingData();
    }, [profileID, currentPage, itemsPerPage, filters, profileType]);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    const handleCheckboxChange = (profileId: string) => {
        setSelectedProfiles((prevSelected) => {
            const isSelected = prevSelected.includes(profileId);
            return isSelected
                ? prevSelected.filter((id) => id !== profileId)
                : [...prevSelected, profileId];
        });
    };

    const handleSelectAll = () => {
        setSelectedProfiles((prevSelected) => {
            if (prevSelected.length === matchingData.length) {
                return [];
            } else {
                return matchingData.map((profile) => profile.profile_id);
            }
        });
    };


    const handlePrintProfile = async () => {
        if (selectedProfiles.length === 0) {
            NotifyError("Please select at least one profile to print profile");
            return;
        }
        if (!printFormat) {
            NotifyError("Please select a Print format");
            return;
        }
        try {
            setIsPrintProfile(true);

            // Construct the API URL with parameters
            const apiUrl = `https://app.vysyamala.com/api/admin-match-pdf-with-format/`; // Your API endpoint
            const params = new URLSearchParams({
                pdf_format: printFormat,
                profile_ids: selectedProfiles.join(","),
                profile_to: String(profileID)
            });

            // Open the API URL in a new tab
            const newWindow = window.open(`${apiUrl}?${params.toString()}`, '_blank');

            if (newWindow) {
                newWindow.focus();
                console.log("Opening profile in new tab...");
            } else {
                NotifyError("Popup blocked! Please allow popups for this site.");
            }
        } catch (error: any) {
            console.error("Failed to open print profile:", error);
            NotifyError(error.message || "Failed to open print profile");
        } finally {
            setIsPrintProfile(false);
        }
    };


    const handleProfileWhatsapp = async () => {
        if (selectedProfiles.length === 0) {
            NotifyError("Please select at least one profile to print profile");
            return;
        }
        if (!printFormat) {
            NotifyError("Please select a Print format");
            return;
        }
        try {
            setIsPrintProfile(true);

            // Construct the API URL with parameters
            const apiUrl = `https://app.vysyamala.com/api/admin-match-pdf-with-format/`; // Your API endpoint
            const params = new URLSearchParams({
                pdf_format: printFormat,
                profile_ids: selectedProfiles.join(","),
                profile_to: String(profileID)
            });

            // Open the API URL in a new tab
            const newWindow = window.open(`${apiUrl}?${params.toString()}`, '_blank');

            if (newWindow) {
                newWindow.focus();
                console.log("Opening profile in new tab...");
            } else {
                NotifyError("Popup blocked! Please allow popups for this site.");
            }
        } catch (error: any) {
            console.error("Failed to open print profile:", error);
            NotifyError(error.message || "Failed to open print profile");
        } finally {
            setIsPrintProfile(false);
        }
    };


    const handleSendEmail = async () => {
        if (selectedProfiles.length === 0) {
            NotifyError("Please select at least one profile to print profile");
            return;
        }
        if (!printFormat) {
            NotifyError("Please select a Print format");
            return;
        }
        try {
            setIsPrintProfile(true);

            // Construct the API URL with parameters
            const apiUrl = `https://app.vysyamala.com/api/admin-match-pdf-with-format/`; // Your API endpoint
            const params = new URLSearchParams({
                pdf_format: printFormat,
                profile_ids: selectedProfiles.join(","),
                profile_to: String(profileID)
            });

            // Open the API URL in a new tab
            const newWindow = window.open(`${apiUrl}?${params.toString()}`, '_blank');

            if (newWindow) {
                newWindow.focus();
                console.log("Opening profile in new tab...");
            } else {
                NotifyError("Popup blocked! Please allow popups for this site.");
            }
        } catch (error: any) {
            console.error("Failed to open print profile:", error);
            NotifyError(error.message || "Failed to open print profile");
        } finally {
            setIsPrintProfile(false);
        }
    };


    const handleGoToPage = () => {
        const pageNumber = parseInt(goToPageInput, 10);
        if (!isNaN(pageNumber)) {
            const lastPage = Math.ceil(totalItems / itemsPerPage) - 1;
            const newPage = Math.max(0, Math.min(pageNumber - 1, lastPage));
            setCurrentPage(newPage);
            setGoToPageInput('');
        }
    };

    // if (loading) {
    //     return <div className="flex items-center justify-center h-screen w-full"> <CircularProgress /></div>;
    // }


    return (
        <div className="container mx-auto p-4">
            {/* <Button
                variant="contained"
                onClick={onBack}
                sx={{ mb: 2 }}
            >
                Back to Filters
            </Button> */}

            <div className="mb-4 flex justify-between items-center">
                <div>
                    <h2 className="text-xl text-left font-bold text-red-600">Vysyamala Matching Profiles</h2>
                    <p className="text-sm text-gray-600">
                        Select profiles → choose format → choose actions → Sendsssss
                    </p>

                    <div className="flex gap-2 mt-3">
                        {buttons.map((btn) => (
                            <button
                                key={btn}
                                onClick={() => setActive(btn)}
                                className={`px-4 py-1 rounded-full text-black font-semibold ${active === btn
                                    ? "bg-red-600 text-white"
                                    : "border border-yellow-400 text-yellow-600 bg-yellow-50"
                                    }`}
                            >
                                {btn}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Top-right field */}
                <div className="flex items-center gap-2">
                    {/* <div className="bg-[#FFF9DB] px-2 py-1 text-black rounded-lg text-sm">
                        Preview UI • Enriched
                    </div> */}
                    <span className="text-sm">Profiles: {selectedProfiles.length} selected</span>
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 mb-4">
                {/* Format */}
                <div>
                    <label className="block font-bold text-black">Format</label>
                    <select
                        value={printFormat}
                        onChange={(e) => setPrintFormat(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-1 w-100 text-black text-sm focus:outline-none">
                        <option value="">Select Format</option>
                        <option value="match_compatability_without_horo_black">HTML with address</option>
                        <option>HTML without address</option>
                        <option>HTML without address + Compatibility</option>
                        <option>HTML with address + Compatibility</option>
                        <option>
                            HTML with address + Compatibility + self attached horoscope (original)
                        </option>
                        <option>
                            HTML with address + Compatibility + self attached horoscope (admin)
                        </option>
                    </select>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-start flex-1">
                    <label className="block font-semibold text-black mb-1 ">Actions</label>
                    <div className="flex gap-4">
                        <label className="flex items-center">
                            <input type="radio" name="action" className="mr-1" /> Print
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="action" className="mr-1" /> WhatsApp
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="action" className="mr-1" /> Email
                        </label>
                    </div>
                </div>

                {/* Search */}
                <div className="flex items-center gap-2 ml-auto ">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search name / id / profession"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-1 pr-8 focus:outline-none"
                        />
                        {search && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-black hover:text-gray-700"
                            >
                                ×
                            </button>
                        )}
                    </div>
                    <button className="px-3 py-0.2 text-white border   bg-[#1976D2] whitespace-nowrap rounded">Search</button>
                    <button
                        onClick={handlePrintProfile}
                        className="px-3 py-0.2 text-white  border  bg-[#1976D2] whitespace-nowrap rounded">Send Selected</button>
                </div>
            </div>

            <div className="py-4">
                <Paper className="w-full">
                    <TableContainer sx={{ border: '1px solid #E0E0E0' }} component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead style={{ background: '#FFF9C9', padding: '17px' }}>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            sx={{
                                                borderBottom: "1px solid #E0E0E0",
                                                color: "#ee3448",
                                                fontWeight: "bold",
                                                fontSize: "1rem",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {column.id === "select" ? (
                                                <Checkbox
                                                    color="primary"
                                                    checked={selectedProfiles.length === matchingData.length}
                                                    indeterminate={
                                                        selectedProfiles.length > 0 &&
                                                        selectedProfiles.length < matchingData.length
                                                    }
                                                    onChange={handleSelectAll}
                                                />
                                            ) : (
                                                column.label
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} sx={{ textAlign: "center", py: 3 }}>
                                            <CircularProgress />
                                        </TableCell>
                                    </TableRow>
                                ) : matchingData && matchingData.length > 0 ? (
                                    matchingData.map((row) => (
                                        <TableRow
                                            key={row.profile_id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>
                                                <Checkbox
                                                    color="primary"
                                                    checked={selectedProfiles.includes(row.profile_id)}
                                                    onChange={() => handleCheckboxChange(row.profile_id)}
                                                />
                                            </TableCell>

                                            <TableCell>
                                                <img
                                                    className="rounded-full"
                                                    src={row.profile_img || No_Image_Available}
                                                    alt="Profile"
                                                    width={50}
                                                    height={50}
                                                    onError={(e) => (e.currentTarget.src = No_Image_Available)}
                                                />
                                            </TableCell>
                                            <TableCell
                                                onClick={() =>
                                                    navigate(
                                                        `/viewProfile?profileId=${row.profile_id}`,
                                                    )
                                                }
                                                sx={{
                                                    color: 'blue',
                                                    cursor: 'pointer',
                                                    textDecoration: 'none',
                                                    '&:hover': { textDecoration: 'underline' }
                                                }}
                                            >
                                                {row.profile_id}
                                            </TableCell>
                                            <TableCell>{row.work_place}</TableCell>
                                            <TableCell>{row.plan}</TableCell>
                                            <TableCell>{row.profile_name}</TableCell>
                                            <TableCell>{row.profile_age}</TableCell>
                                            <TableCell>{row.star}</TableCell>
                                            <TableCell>{row.degree}</TableCell>
                                            <TableCell>{row.profession}</TableCell>
                                            <TableCell>{row.company_name}</TableCell>
                                            <TableCell>{row.designation}</TableCell>
                                            <TableCell>{row.anual_income}</TableCell>
                                            <TableCell>{row.state}</TableCell>
                                            <TableCell>{row.city}</TableCell>
                                            <TableCell>{row.family_status}</TableCell>
                                            <TableCell>{row.father_occupation}</TableCell>
                                            <TableCell>{row.suya_gothram}</TableCell>
                                            <TableCell>{row.chevvai}</TableCell>
                                            <TableCell>{row.raguketu}</TableCell>

                                            {/* <TableCell>{row.dateofjoin ? new Date(row.dateofjoin).toLocaleDateString() : "-"}</TableCell> */}
                                            <TableCell>  {row.dateofjoin
                                                ? new Date(row.dateofjoin).toLocaleDateString("en-GB")
                                                : "-"}</TableCell>
                                            {/* <TableCell>{row.action_score?.score ?? "-"}</TableCell> */}
                                            <TableCell>N/A</TableCell>
                                            <TableCell>{row.matching_score}</TableCell>
                                            <TableCell>
                                                <Tooltip
                                                    title={
                                                        <div style={{ whiteSpace: 'pre-line' }}>
                                                            {formatActionsForTooltip(row.action_score?.actions || [])}
                                                        </div>
                                                    }
                                                    arrow
                                                    placement="top"
                                                >
                                                    <span>{row.action_score?.score ?? "-"}</span>
                                                </Tooltip>
                                            </TableCell>
                                            {/* <TableCell>
                                                {row.verified === 0 ? (
                                                    <MdVerified className="text-green-600" />
                                                ) : (
                                                    <GoUnverified className="text-red-600" />
                                                )}
                                            </TableCell> */}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} sx={{ textAlign: 'center' }}>
                                            No Matching Records found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>

            {Math.ceil(totalItems / itemsPerPage) > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-600">
                        Showing {currentPage * itemsPerPage + 1} to {Math.min((currentPage + 1) * itemsPerPage, totalItems)} of {totalItems} records
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <Typography variant="body2">Go to page:</Typography>
                            <TextField
                                size="small"
                                type="number"
                                value={goToPageInput}
                                onChange={(e) => setGoToPageInput(e.target.value)}
                                inputProps={{
                                    min: 1,
                                    max: Math.ceil(totalItems / itemsPerPage),
                                }}
                                style={{ width: '80px' }}
                                onKeyPress={(e) => e.key === 'Enter' && handleGoToPage()}
                            />
                            <Button
                                variant="contained"
                                size="small"
                                onClick={handleGoToPage}
                                disabled={!goToPageInput}
                            >
                                Go
                            </Button>
                        </div>

                        <IconButton
                            onClick={() => setCurrentPage(0)}
                            disabled={currentPage === 0}
                            aria-label="first page"
                        >
                            {"<<"}
                        </IconButton>

                        <IconButton
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                            disabled={currentPage === 0}
                            aria-label="previous page"
                        >
                            {"<"}
                        </IconButton>

                        {(() => {
                            const totalPages = Math.ceil(totalItems / itemsPerPage);
                            const maxVisiblePages = 5;
                            let startPage, endPage;

                            if (totalPages <= maxVisiblePages) {
                                startPage = 0;
                                endPage = totalPages - 1;
                            } else {
                                const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
                                const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;

                                if (currentPage < maxPagesBeforeCurrent) {
                                    startPage = 0;
                                    endPage = maxVisiblePages - 1;
                                } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
                                    startPage = totalPages - maxVisiblePages;
                                    endPage = totalPages - 1;
                                } else {
                                    startPage = currentPage - maxPagesBeforeCurrent;
                                    endPage = currentPage + maxPagesAfterCurrent;
                                }
                            }

                            const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

                            return (
                                <div className="flex">
                                    {pages.map((page) => (
                                        <Button
                                            key={page}
                                            variant={currentPage === page ? "contained" : "text"}
                                            onClick={() => setCurrentPage(page)}
                                            style={{
                                                minWidth: '32px',
                                                height: '32px',
                                                margin: '0 2px',
                                                backgroundColor: currentPage === page ? '#1976d2' : 'transparent',
                                                color: currentPage === page ? '#fff' : '#000',
                                            }}
                                        >
                                            {page + 1}
                                        </Button>
                                    ))}
                                </div>
                            );
                        })()}

                        <IconButton
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalItems / itemsPerPage) - 1))}
                            disabled={currentPage >= Math.ceil(totalItems / itemsPerPage) - 1}
                            aria-label="next page"
                        >
                            {">"}
                        </IconButton>

                        <IconButton
                            onClick={() => setCurrentPage(Math.ceil(totalItems / itemsPerPage) - 1)}
                            disabled={currentPage >= Math.ceil(totalItems / itemsPerPage) - 1}
                            aria-label="last page"
                        >
                            {">>"}
                        </IconButton>
                    </div>
                </div>
            )}
        </div>
    );
};
