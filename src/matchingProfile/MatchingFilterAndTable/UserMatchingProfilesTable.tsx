// // import { useState, useEffect } from 'react';
// // import {
// //     Box, Button, Checkbox, CircularProgress, IconButton, Paper, Table, TableBody,
// //     TableCell, TableContainer, TableHead, TableRow, TextField,
// //     Typography, Tooltip
// // } from '@mui/material';
// // import { useNavigate } from 'react-router-dom';
// // import { MdVerified } from 'react-icons/md';
// // import { GoUnverified } from 'react-icons/go';
// // import { NotifyError, NotifySuccess } from '../../common/Toast/ToastMessage';
// // import {
// //     MatchingEmailProfile,
// //     MatchingPrintProfile,
// //     MatchingWhatsappProfile,
// //     userMatchingProfiles,
// //     userMatchingProfilesFilterListMatch,
// //     userMatchingProfilesPrintProfile,
// //     userMatchingProfilesSendEmail,
// //     userMatchingProfilesWhatsapp
// // } from '../../api/apiConfig';
// // import React from 'react';

// // // Base64 encoded placeholder image to avoid 404 errors
// // const BASE64_PLACEHOLDER = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNSA0QzI4LjMxNDggNCAzMSA2LjY4NTI0IDMxIDkuOTk5OTlDMzEgMTMuMzE0NyAyOC4zMTQ4IDE1Ljk5OTkgMjUgMTUuOTk5OUMyMS42ODUyIDE1Ljk5OTkgMTkgMTMuMzE0NyAxOSA5Ljk5OTk5QzE5IDYuNjg1MjQgMjEuNjg1MiA0IDI1IDRaIiBmaWxsPSIjOTk5OTk5Ii8+CjxwYXRoIGQ9Ik0yNSAxOEMzMC41MjIgMTggMzUgMTkuNzggMzUgMjJWMzZIMTVWMjJDMTUgMTkuNzggMTkuNDc4IDE4IDI1IDE4WiIgZmlsbD0iIzk5OTk5OSIvPgo8L3N2Zz4K";

// // interface ActionScore {
// //     score: number;
// //     actions: any[];
// // }

// // interface UserMatchingProfilesProps {
// //     action_log: any;
// //     profile_id: string;
// //     profile_name: string;
// //     profile_img: string;
// //     profile_age: number;
// //     plan: string;
// //     family_status: string;
// //     degree: string;
// //     anual_income: string;
// //     star: string;
// //     profession: string;
// //     city: string;
// //     state: string;
// //     work_place: string;
// //     designation: string;
// //     company_name: string;
// //     father_occupation: string;
// //     suya_gothram: string;
// //     chevvai: string;
// //     raguketu: string;
// //     photo_protection: number;
// //     matching_score: number;
// //     wish_list: number;
// //     search: string;
// //     verified: number;
// //     action_score: ActionScore;
// //     dateofjoin: string;
// // }

// // const getColumns = (profileType: 'matching' | 'suggested') => {
// //     const baseColumns = [
// //         { id: "select", label: "Select" },
// //         { id: 'profile_img', label: 'Image' },
// //         { id: 'profile_id', label: 'Profile ID' },
// //         { id: 'work_place', label: 'Work Place' },
// //         { id: 'plan', label: 'Mode' },
// //         { id: 'profile_name', label: 'Name' },
// //         { id: 'profile_age', label: 'Age' },
// //         { id: 'star', label: 'Star' },
// //         { id: 'degree', label: 'Degree' },
// //         { id: 'profession', label: 'Profession' },
// //         { id: 'company_name', label: 'Company / Buisness' },
// //         { id: 'designation', label: 'Designation / Nature' },
// //         { id: 'anual_income', label: 'Annual Income' },
// //         { id: 'state', label: 'State' },
// //         { id: 'city', label: 'City' },
// //         { id: 'family_status', label: 'Family Status' },
// //         { id: 'father_occupation', label: 'Father Business' },
// //         { id: 'suya_gothram', label: 'Suya Gothram' },
// //         { id: 'chevvai', label: 'Admin Chevvai' },
// //         { id: 'raguketu', label: 'Admin Raghu/Kethu' },
// //         { id: 'dateofjoin', label: 'Reg Date' },
// //         { id: "status", label: "Status" },
// //         { id: "matching_score", label: "Matching Score" },
// //         { id: 'action_score', label: 'Action Score' },
// //         { id: 'action_log', label: 'Action Log' },
// //     ];
// //     if (profileType === 'matching') {
// //         return [
// //             ...baseColumns,
// //         ];
// //     } else {
// //         return [
// //             ...baseColumns,
// //             { id: "matching_score", label: "Suggested Score" },
// //             { id: 'action_score', label: 'Action' }
// //         ];
// //     }
// // };

// // interface UserMatchingProfilesTableProps {
// //     profileID: string | null;
// //     filters: any;
// //     onBack: () => void;
// //     profileType: 'matching' | 'suggested';
// // }

// // export const UserMatchingProfilesTable = ({ profileID, filters, onBack, profileType }: UserMatchingProfilesTableProps) => {
// //     const navigate = useNavigate();
// //     const [matchingData, setMatchingData] = useState<UserMatchingProfilesProps[]>([]);
// //     const [loading, setLoading] = useState<boolean>(false);
// //     const [totalItems, setTotalItems] = useState(0);
// //     const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
// //     const [selectedFormat, setSelectedFormat] = useState<string>("");
// //     const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
// //     const [printFormat, setPrintFormat] = useState<string>("");
// //     const [isPrintProfile, setIsPrintProfile] = useState<boolean>(false);
// //     const [whatsappFormat, setWhatsappFormat] = useState<string>("");
// //     const [emailFormat, setEmailFormat] = useState<string>("");
// //     const [iswhatsappProfile, setIsWhatsappProfile] = useState<boolean>(false);
// //     const roleId = sessionStorage.getItem('role_id');
// //     const [search, setSearch] = useState("");
// //     const [selectedActionType, setSelectedActionType] = useState<string>('all');
// //     const [activeStatus, setActiveStatus] = useState<string>("All");
// //     const [selectedSendAction, setSelectedSendAction] = useState<string>('print');

// //     const statusButtons = ["All", "Sent", "Unsent"];
// //     const clearSearch = () => setSearch("");

// //     // Get dynamic columns based on profileType
// //     const columns = getColumns(profileType);

// //     // Update the header title based on profileType
// //     const headerTitle = profileType === 'matching'
// //         ? "Vysyamala Matching Profiles"
// //         : "Vysyamala Suggested Profiles";

// //     // Tooltip function
// //     const formatActionsForTooltip = (actions: any[]) => {
// //         if (!actions || actions.length === 0) {
// //             return "No actions recorded";
// //         }

// //         return (
// //             <div>
// //                 {actions.map((action, index) => {
// //                     const date = new Date(action.datetime);
// //                     const formattedDate = date.toLocaleDateString();

// //                     return (
// //                         <div key={index}>
// //                             <strong>{action.action}</strong> – {formattedDate}
// //                         </div>
// //                     );
// //                 })}
// //             </div>
// //         );
// //     };

// //     useEffect(() => {
// //         setSelectedProfiles([]);
// //     }, [activeStatus, selectedActionType, search]);

// //     useEffect(() => {
// //         const fetchMatchingData = async () => {
// //             if (!profileID) return;
// //             setLoading(true);
// //             try {
// //                 let data;
// //                 // Set a large number for items per page to get all data
// //                 const largePageSize = 10000;

// //                 if (filters) {
// //                     // Use filtered data with profileType
// //                     data = await userMatchingProfilesFilterListMatch(
// //                         String(profileID),
// //                         1, // Always get first page
// //                         largePageSize, // Large page size to get all data
// //                         filters.selectedComplexions,
// //                         filters.selectedEducation,
// //                         filters.selectedFieldsOfStudy,
// //                         filters.selectedDegrees,
// //                         filters.heightFrom,
// //                         filters.heightTo,
// //                         filters.minAnnualIncome,
// //                         filters.maxAnnualIncome,
// //                         filters.foreignInterest,
// //                         filters.selectedState,
// //                         filters.selectedCity,
// //                         filters.selectedMembership,
// //                         filters.hasphotos,
// //                         filters.destRasiIds,
// //                         filters.ageDifference,
// //                         filters.sarpaDhosham,
// //                         filters.chevvaiDhosam,
// //                         filters.selectedProfessions,
// //                         filters.motherLive,
// //                         filters.fatherLive,
// //                         filters.selectedMaritalStatus,
// //                         filters.selectedFamilyStatus,
// //                         filters.sentInWhatsapp,
// //                         filters.prefPoruthamStarRasi,
// //                         filters.fromDateOfJoin,
// //                         filters.toDateOfJoin,
// //                         profileType,
// //                         selectedActionType,
// //                         activeStatus.toLowerCase() === 'all' ? 'all' : activeStatus.toLowerCase(),
// //                         search.trim()
// //                     );
// //                 } else {
// //                     // API call without filters
// //                     data = await userMatchingProfilesFilterListMatch(
// //                         String(profileID),
// //                         1, // Always get first page
// //                         largePageSize, // Large page size to get all data
// //                         "", "", "", "", 0, 0, 0, 0, "", 0, 0, 0, "", 0, 0, "", "", "", "", "", "", "", "", "", "", "", profileType,
// //                         selectedActionType,
// //                         activeStatus.toLowerCase() === 'all' ? 'all' : activeStatus.toLowerCase(),
// //                         search.trim()
// //                     );
// //                 }

// //                 setMatchingData(data.profiles || []);
// //                 setTotalItems(data.total_count || 0);
// //             } catch (error: any) {
// //                 NotifyError(error.message);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchMatchingData();
// //     }, [profileID, filters, profileType, selectedActionType, activeStatus, search]);

// //     // Handle status button change
// //     const handleStatusChange = (status: string) => {
// //         setActiveStatus(status);
// //     };

// //     // Handle filter action type change
// //     const handleActionTypeChange = (actionType: string) => {
// //         setSelectedActionType(actionType);
// //     };

// //     // Handle send action type change
// //     const handleSendActionChange = (actionType: string) => {
// //         setSelectedSendAction(actionType);
// //     };

// //     const handleCheckboxChange = (profileId: string) => {
// //         setSelectedProfiles((prevSelected) => {
// //             const isSelected = prevSelected.includes(profileId);
// //             return isSelected
// //                 ? prevSelected.filter((id) => id !== profileId)
// //                 : [...prevSelected, profileId];
// //         });
// //     };

// //     const handleSelectAll = () => {
// //         setSelectedProfiles((prevSelected) => {
// //             if (prevSelected.length === matchingData.length) {
// //                 return [];
// //             } else {
// //                 return matchingData.map((profile) => profile.profile_id);
// //             }
// //         });
// //     };

// //     const handlePrintProfile = async () => {
// //         if (selectedProfiles.length === 0) {
// //             NotifyError("Please select at least one profile to print profile");
// //             return;
// //         }
// //         if (!printFormat) {
// //             NotifyError("Please select a Print format");
// //             return;
// //         }
// //         try {
// //             setIsPrintProfile(true);
// //             const apiUrl = `https://app.vysyamala.com/api/admin-match-pdf-with-format/?action_type=print`;

// //             const params = new URLSearchParams({
// //                 pdf_format: printFormat,
// //                 profile_ids: selectedProfiles.join(","),
// //                 profile_to: String(profileID)
// //             });

// //             const newWindow = window.open(`${apiUrl}&${params.toString()}`, '_blank');

// //             if (newWindow) {
// //                 newWindow.focus();
// //                 console.log("Opening profile in new tab...");
// //             } else {
// //                 NotifyError("Popup blocked! Please allow popups for this site.");
// //             }
// //         } catch (error: any) {
// //             console.error("Failed to open print profile:", error);
// //             NotifyError(error.message || "Failed to open print profile");
// //         } finally {
// //             setIsPrintProfile(false);
// //         }
// //     };

// //     const handleProfileWhatsapp = async () => {
// //         if (selectedProfiles.length === 0) {
// //             NotifyError("Please select at least one profile to send via WhatsApp");
// //             return;
// //         }
// //         if (!whatsappFormat) {
// //             NotifyError("Please select a WhatsApp format");
// //             return;
// //         }
// //         try {
// //             setIsWhatsappProfile(true);
// //             const apiUrl = `https://app.vysyamala.com/api/admin-match-pdf-with-format/?action_type=whatsapp`;

// //             const params = new URLSearchParams({
// //                 pdf_format: whatsappFormat,
// //                 profile_ids: selectedProfiles.join(","),
// //                 profile_to: String(profileID)
// //             });

// //             const newWindow = window.open(`${apiUrl}&${params.toString()}`, '_blank');

// //             if (newWindow) {
// //                 newWindow.focus();
// //                 NotifySuccess("Profiles sent via WhatsApp successfully");
// //             } else {
// //                 NotifyError("Popup blocked! Please allow popups for this site.");
// //             }
// //         } catch (error: any) {
// //             console.error("Failed to send via WhatsApp:", error);
// //             NotifyError(error.message || "Failed to send via WhatsApp");
// //         } finally {
// //             setIsWhatsappProfile(false);
// //         }
// //     };

// //     const handleSendEmail = async () => {
// //         if (selectedProfiles.length === 0) {
// //             NotifyError("Please select at least one profile to send via email");
// //             return;
// //         }
// //         if (!emailFormat) {
// //             NotifyError("Please select an email format");
// //             return;
// //         }

// //         try {
// //             setIsSendingEmail(true);

// //             const apiUrl = `https://app.vysyamala.com/api/admin-match-pdf-with-format/`;

// //             const query = new URLSearchParams({
// //                 action_type: "email",
// //                 pdf_format: emailFormat,
// //                 profile_ids: selectedProfiles.join(","),
// //                 profile_to: String(profileID),
// //             });

// //             const response = await fetch(`${apiUrl}?${query.toString()}`, {
// //                 method: "GET",
// //             });

// //             if (!response.ok) {
// //                 throw new Error("Failed to send emails");
// //             }

// //             NotifySuccess("Emails sent successfully");
// //         } catch (error: any) {
// //             console.error("Failed to send emails:", error);
// //             NotifyError(error.message || "Failed to send emails");
// //         } finally {
// //             setIsSendingEmail(false);
// //         }
// //     };

// //     const handleSendSelected = () => {
// //         switch (selectedSendAction) {
// //             case 'print':
// //                 handlePrintProfile();
// //                 break;
// //             case 'whatsapp':
// //                 handleProfileWhatsapp();
// //                 break;
// //             case 'email':
// //                 handleSendEmail();
// //                 break;
// //             default:
// //                 NotifyError("Please select an action");
// //         }
// //     };

// //     const handleSearch = () => {
// //         // The useEffect will automatically trigger due to the search state change
// //     };

// //     const handleKeyPress = (e: React.KeyboardEvent) => {
// //         if (e.key === 'Enter') {
// //             handleSearch();
// //         }
// //     };

// //     return (
// //         <div className="container mx-auto p-4">
// //             <div className="mb-4 flex justify-between items-center">
// //                 <div>
// //                     <h2 className="text-xl text-left font-bold text-red-600">{headerTitle}</h2>
// //                     <p className="text-sm text-gray-600">
// //                         Select profiles → choose format → choose actions → Send
// //                     </p>

// //                     <div className="flex gap-2 mt-3">
// //                         {statusButtons.map((btn) => (
// //                             <button
// //                                 key={btn}
// //                                 onClick={() => handleStatusChange(btn)}
// //                                 className={`px-4 py-1 rounded-full text-black font-semibold ${activeStatus === btn
// //                                     ? "bg-red-600 text-white"
// //                                     : "border border-yellow-400 text-yellow-600 bg-yellow-50"
// //                                     }`}
// //                             >
// //                                 {btn}
// //                             </button>
// //                         ))}
// //                     </div>
// //                 </div>

// //                 <div className="flex items-center gap-2">
// //                     <span className="text-sm">Profiles: {selectedProfiles.length} selected</span>
// //                 </div>
// //             </div>

// //             {activeStatus !== 'All' && (
// //                 <div className="mb-4 bg-gray-50 rounded-lg">
// //                     <div className="flex items-center gap-4">
// //                         <span className="font-bold text-title-sm text-black">
// //                             {activeStatus === 'Unsent' ? 'Unsent filter:' : 'Sent filter:'}
// //                         </span>
// //                         <div className="flex gap-4">
// //                             <label className="flex items-center">
// //                                 <input
// //                                     type="radio"
// //                                     name="filterAction"
// //                                     value="all"
// //                                     className="mr-1"
// //                                     checked={selectedActionType === 'all'}
// //                                     onChange={() => handleActionTypeChange('all')}
// //                                 />
// //                                 All
// //                             </label>
// //                             <label className="flex items-center">
// //                                 <input
// //                                     type="radio"
// //                                     name="filterAction"
// //                                     value="print"
// //                                     className="mr-1"
// //                                     checked={selectedActionType === 'print'}
// //                                     onChange={() => handleActionTypeChange('print')}
// //                                 />
// //                                 Print
// //                             </label>
// //                             <label className="flex items-center">
// //                                 <input
// //                                     type="radio"
// //                                     name="filterAction"
// //                                     value="whatsapp"
// //                                     className="mr-1"
// //                                     checked={selectedActionType === 'whatsapp'}
// //                                     onChange={() => handleActionTypeChange('whatsapp')}
// //                                 />
// //                                 WhatsApp
// //                             </label>
// //                             <label className="flex items-center">
// //                                 <input
// //                                     type="radio"
// //                                     name="filterAction"
// //                                     value="email"
// //                                     className="mr-1"
// //                                     checked={selectedActionType === 'email'}
// //                                     onChange={() => handleActionTypeChange('email')}
// //                                 />
// //                                 Email
// //                             </label>
// //                         </div>
// //                     </div>
// //                 </div>
// //             )}

// //             <div className="flex flex-wrap items-center gap-4 mb-4">
// //                 {/* Format */}
// //                 {selectedSendAction === 'print' && (
// //                     <div>
// //                         <label className="block font-bold text-black">Print Format</label>
// //                         <select
// //                             value={printFormat}
// //                             onChange={(e) => setPrintFormat(e.target.value)}
// //                             className="border border-gray-300 rounded px-3 py-1 w-70 text-black text-sm focus:outline-none">
// //                             <option value="">Select a Print Format</option>
// //                             <option value="match_full_profile">Full Profile</option>
// //                             <option value="match_full_profile_black">Full profile black</option>
// //                             <option value="match_compatability_color">Color</option>
// //                             <option value="match_compatability_black">Black</option>
// //                             <option value="match_compatability_without_horo">Without Horoscope</option>
// //                             <option value="match_compatability_without_horo_black">Without Horoscope Black</option>
// //                         </select>
// //                     </div>
// //                 )}

// //                 {/* WhatsApp Format (only shown when WhatsApp is selected) */}
// //                 {selectedSendAction === 'whatsapp' && (
// //                     <div>
// //                         <label className="block font-bold text-black">WhatsApp Format</label>
// //                         <select
// //                             value={whatsappFormat}
// //                             onChange={(e) => setWhatsappFormat(e.target.value)}
// //                             className="border border-gray-300 rounded px-3 py-1 w-70 text-black text-sm focus:outline-none">
// //                             <option value="">Select a WhatsApp Format</option>
// //                             <option value="match_full_profile">Full Profile</option>
// //                             <option value="match_full_profile_black">Full profile black</option>
// //                             <option value="match_compatability_color">Color</option>
// //                             <option value="match_compatability_black">Black</option>
// //                             <option value="match_compatability_without_horo">Without Horoscope</option>
// //                             <option value="match_compatability_without_horo_black">Without Horoscope Black</option>
// //                         </select>
// //                     </div>
// //                 )}

// //                 {/* Email Format (only shown when Email is selected) */}
// //                 {selectedSendAction === 'email' && (
// //                     <div>
// //                         <label className="block font-bold text-black">Email Format</label>
// //                         <select
// //                             value={emailFormat}
// //                             onChange={(e) => setEmailFormat(e.target.value)}
// //                             className="border border-gray-300 rounded px-3 py-1 w-40 text-black text-sm focus:outline-none">
// //                             <option value="">Select an Email Format</option>
// //                             <option value="match_full_profile">Full Profile</option>
// //                             <option value="match_full_profile_black">Full profile black</option>
// //                             <option value="match_compatability_color">Color</option>
// //                             <option value="match_compatability_black">Black</option>
// //                             <option value="match_compatability_without_horo">Without Horoscope</option>
// //                             <option value="match_compatability_without_horo_black">Without Horoscope Black</option>
// //                         </select>
// //                     </div>
// //                 )}

// //                 {/* Actions */}
// //                 <div className="flex flex-col items-start flex-1">
// //                     <label className="block font-semibold text-black mb-1">Actions</label>
// //                     <div className="flex gap-4">
// //                         <label className="flex items-center">
// //                             <input
// //                                 type="radio"
// //                                 name="sendAction"
// //                                 value="print"
// //                                 className="mr-1"
// //                                 checked={selectedSendAction === 'print'}
// //                                 onChange={() => handleSendActionChange('print')}
// //                             />
// //                             Print
// //                         </label>
// //                         <label className="flex items-center">
// //                             <input
// //                                 type="radio"
// //                                 name="sendAction"
// //                                 value="whatsapp"
// //                                 className="mr-1"
// //                                 checked={selectedSendAction === 'whatsapp'}
// //                                 onChange={() => handleSendActionChange('whatsapp')}
// //                             />
// //                             WhatsApp
// //                         </label>
// //                         <label className="flex items-center">
// //                             <input
// //                                 type="radio"
// //                                 name="sendAction"
// //                                 value="email"
// //                                 className="mr-1"
// //                                 checked={selectedSendAction === 'email'}
// //                                 onChange={() => handleSendActionChange('email')}
// //                             />
// //                             Email
// //                         </label>

// //                         <button
// //                             onClick={handleSendSelected}
// //                             className="px-3 py-0.5 text-white border bg-[#1976D2] whitespace-nowrap rounded"
// //                             disabled={isPrintProfile || iswhatsappProfile || isSendingEmail}
// //                         >
// //                             {isPrintProfile || iswhatsappProfile || isSendingEmail ? (
// //                                 <CircularProgress size={16} />
// //                             ) : (
// //                                 "Send Selected"
// //                             )}
// //                         </button>
// //                     </div>
// //                 </div>

// //                 {/* Search */}
// //                 <div className="flex items-end gap-2 ml-auto w-100 ">
// //                     <div className="relative w-100 mt-5">
// //                         <input
// //                             type="text"
// //                             placeholder="Search name / id / profession"
// //                             value={search}
// //                             onChange={(e) => setSearch(e.target.value)}
// //                             onKeyPress={handleKeyPress}
// //                             className="border border-gray-300 w-100 rounded px-3 py-1 pr-8 focus:outline-none"
// //                         />
// //                         {search && (
// //                             <button
// //                                 onClick={clearSearch}
// //                                 className="absolute right-2 top-1/2 -translate-y-1/2 text-black hover:text-gray-700"
// //                             >
// //                                 ×
// //                             </button>
// //                         )}
// //                     </div>
// //                     {/* <button
// //                         onClick={handleSearch}
// //                         className="px-3 py-0.5 text-white border bg-[#1976D2] whitespace-nowrap rounded"
// //                     >
// //                         Search
// //                     </button> */}
// //                 </div>
// //             </div>
// //             <div className="flex justify-between items-center mt-4 px-4 py-2 bg-gray-50 ">
// //                 <div className="text-sm text-gray-600">
// //                     Showing {totalItems} records
// //                 </div>
// //             </div>
// //             <div className="py-4" >
// //                 <TableContainer component={Paper}>
// //                     <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
// //                         <TableHead style={{ background: '#FFF8B3', padding: '17px' }}>
// //                             <TableRow>
// //                                 {columns.map((column) => (
// //                                     <TableCell
// //                                         key={column.id}
// //                                         sx={{
// //                                             borderBottom: "1px solid #E0E0E0",
// //                                             color: "#ee3448",
// //                                             fontWeight: "bold",
// //                                             fontSize: "1rem",
// //                                             whiteSpace: "nowrap",
// //                                             backgroundColor: "#FFF8B3", // Keep sticky header background
// //                                             position:
// //                                                 column.id === "select" || column.id === "profile_id"
// //                                                     ? "sticky"
// //                                                     : "static",
// //                                             left:
// //                                                 column.id === "select"
// //                                                     ? 0
// //                                                     : column.id === "profile_id"
// //                                                         ? 70 // adjust based on checkbox column width
// //                                                         : "auto",
// //                                             zIndex: column.id === "select" || column.id === "profile_id" ? 2 : 1,
// //                                         }}
// //                                     >
// //                                         {column.id === "select" ? (
// //                                             <Checkbox
// //                                                 color="primary"
// //                                                 checked={matchingData.length > 0 && selectedProfiles.length === matchingData.length}
// //                                                 indeterminate={
// //                                                     selectedProfiles.length > 0 &&
// //                                                     selectedProfiles.length < matchingData.length
// //                                                 }
// //                                                 onChange={handleSelectAll}
// //                                             />
// //                                         ) : (
// //                                             column.label
// //                                         )}
// //                                     </TableCell>
// //                                 ))}
// //                             </TableRow>
// //                         </TableHead>

// //                         <TableBody>
// //                             {loading ? (
// //                                 <TableRow>
// //                                     <TableCell colSpan={columns.length} sx={{ textAlign: "center", py: 3 }}>
// //                                         <CircularProgress />
// //                                     </TableCell>
// //                                 </TableRow>
// //                             ) : matchingData && matchingData.length > 0 ? (
// //                                 matchingData.map((row) => (
// //                                     <TableRow
// //                                         key={row.profile_id}
// //                                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
// //                                     >
// //                                         <TableCell
// //                                             sx={{
// //                                                 position: "sticky",
// //                                                 left: 0,
// //                                                 background: "#fff",
// //                                                 zIndex: 1,
// //                                             }}>
// //                                             <Checkbox
// //                                                 color="primary"
// //                                                 checked={selectedProfiles.includes(row.profile_id)}
// //                                                 onChange={() => handleCheckboxChange(row.profile_id)}
// //                                             />
// //                                         </TableCell>

// //                                         <TableCell>
// //                                             <img
// //                                                 className="rounded-full"
// //                                                 src={row.profile_img || BASE64_PLACEHOLDER}
// //                                                 alt="Profile"
// //                                                 width={50}
// //                                                 height={50}
// //                                                 onError={(e) => {
// //                                                     e.currentTarget.src = BASE64_PLACEHOLDER;
// //                                                 }}
// //                                             />
// //                                         </TableCell>
// //                                         <TableCell
// //                                             onClick={() =>
// //                                                 navigate(
// //                                                     `/viewProfile?profileId=${row.profile_id}`,
// //                                                 )
// //                                             }
// //                                             sx={{
// //                                                 position: "sticky",
// //                                                 left: 70, // same as header
// //                                                 background: "#fff",
// //                                                 color: 'blue',
// //                                                 cursor: 'pointer',
// //                                                 textDecoration: 'none',
// //                                                 '&:hover': { textDecoration: 'underline' }
// //                                             }}
// //                                         >
// //                                             {row.profile_id}
// //                                         </TableCell>
// //                                         <TableCell>{row.work_place}</TableCell>
// //                                         <TableCell>{row.plan}</TableCell>
// //                                         <TableCell>{row.profile_name}</TableCell>
// //                                         <TableCell>{row.profile_age}</TableCell>
// //                                         <TableCell>{row.star}</TableCell>
// //                                         <TableCell>{row.degree}</TableCell>
// //                                         <TableCell>{row.profession}</TableCell>
// //                                         <TableCell>{row.company_name}</TableCell>
// //                                         <TableCell>{row.designation}</TableCell>
// //                                         <TableCell>{row.anual_income}</TableCell>
// //                                         <TableCell>{row.state}</TableCell>
// //                                         <TableCell>{row.city}</TableCell>
// //                                         <TableCell>{row.family_status}</TableCell>
// //                                         <TableCell>{row.father_occupation}</TableCell>
// //                                         <TableCell>{row.suya_gothram}</TableCell>
// //                                         <TableCell>{row.chevvai}</TableCell>
// //                                         <TableCell>{row.raguketu}</TableCell>

// //                                         <TableCell>  {row.dateofjoin
// //                                             ? new Date(row.dateofjoin).toLocaleDateString("en-GB")
// //                                             : "-"}</TableCell>
// //                                         <TableCell>N/A</TableCell>
// //                                         <TableCell>{row.matching_score}</TableCell>
// //                                         <TableCell>
// //                                             <Tooltip
// //                                                 title={
// //                                                     <div style={{ whiteSpace: 'pre-line' }}>
// //                                                         {formatActionsForTooltip(row.action_score?.actions || [])}
// //                                                     </div>
// //                                                 }
// //                                                 arrow
// //                                                 placement="top"
// //                                             >
// //                                                 <span>{row.action_score?.score ?? "-"}</span>
// //                                             </Tooltip>
// //                                         </TableCell>
// //                                         {/* <TableCell>
// //                                             {row.action_log}
// //                                         </TableCell> */}
// //                                         <TableCell sx={{ minWidth: 200, maxWidth: 300, whiteSpace: "normal" }}>
// //                                             {row.action_log
// //                                                 ?.split(",")
// //                                                 .map((item: string, index: number, arr: string[]) => (
// //                                                     <React.Fragment key={index}>
// //                                                         {item.trim()}
// //                                                         {index < arr.length - 1 && ","} {/* keep comma except last */}
// //                                                         <br />
// //                                                     </React.Fragment>
// //                                                 ))}
// //                                         </TableCell>

// //                                     </TableRow>
// //                                 ))
// //                             ) : (
// //                                 <TableRow>
// //                                     <TableCell colSpan={columns.length} sx={{ textAlign: 'center' }}>
// //                                         No Matching Records found.
// //                                     </TableCell>
// //                                 </TableRow>
// //                             )}
// //                         </TableBody>
// //                     </Table>
// //                 </TableContainer>
// //             </div>
// //         </div>
// //     );
// // };


// import { useState, useEffect } from 'react';
// import {
//     Box, Button, Checkbox, CircularProgress, IconButton, Paper, Table, TableBody,
//     TableCell, TableContainer, TableHead, TableRow, TextField,
//     Typography, Tooltip
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { MdVerified } from 'react-icons/md';
// import { GoUnverified } from 'react-icons/go';
// import { NotifyError, NotifySuccess } from '../../common/Toast/ToastMessage';
// import {
//     MatchingEmailProfile,
//     MatchingPrintProfile,
//     MatchingWhatsappProfile,
//     userMatchingProfiles,
//     userMatchingProfilesFilterListMatch,
//     userMatchingProfilesPrintProfile,
//     userMatchingProfilesSendEmail,
//     userMatchingProfilesWhatsapp
// } from '../../api/apiConfig';
// import React from 'react';

// // Base64 encoded placeholder image to avoid 404 errors
// const BASE64_PLACEHOLDER = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNSA0QzI4LjMxNDggNCAzMSA2LjY4NTI0IDMxIDkuOTk5OTlDMzEgMTMuMzE0NyAyOC4zMTQ4IDE1Ljk5OTkgMjUgMTUuOTk5OUMyMS42ODUyIDE1Ljk5OTkgMTkgMTMuMzE0NyAxOSA5Ljk5OTk5QzE5IDYuNjg1MjQgMjEuNjg1MiA0IDI1IDRaIiBmaWxsPSIjOTk5OTk5Ii8+CjxwYXRoIGQ9Ik0yNSAxOEMzMC41MjIgMTggMzUgMTkuNzggMzUgMjJWMzZIMTVWMjJDMTUgMTkuNzggMTkuNDc4IDE4IDI1IDE4WiIgZmlsbD0iIzk5OTk5OSIvPgo8L3N2Zz4K";

// interface ActionScore {
//     score: number;
//     actions: any[];
// }

// interface UserMatchingProfilesProps {
//     action_log: any;
//     profile_id: string;
//     profile_name: string;
//     profile_img: string;
//     profile_age: number;
//     plan: string;
//     family_status: string;
//     degree: string;
//     anual_income: string;
//     star: string;
//     profession: string;
//     city: string;
//     state: string;
//     work_place: string;
//     designation: string;
//     company_name: string;
//     father_occupation: string;
//     suya_gothram: string;
//     chevvai: string;
//     raguketu: string;
//     photo_protection: number;
//     matching_score: number;
//     wish_list: number;
//     search: string;
//     verified: number;
//     action_score: ActionScore;
//     dateofjoin: string;
// }

// const getColumns = (profileType: 'matching' | 'suggested') => {
//     const baseColumns = [
//         { id: "select", label: "Select" },
//         { id: 'profile_img', label: 'Image' },
//         { id: 'profile_id', label: 'Profile ID' },
//         { id: 'work_place', label: 'Work Place' },
//         { id: 'plan', label: 'Mode' },
//         { id: 'profile_name', label: 'Name' },
//         { id: 'profile_age', label: 'Age' },
//         { id: 'star', label: 'Star' },
//         { id: 'degree', label: 'Degree' },
//         { id: 'profession', label: 'Profession' },
//         { id: 'company_name', label: 'Company / Business' },
//         { id: 'designation', label: 'Designation / Nature' },
//         { id: 'anual_income', label: 'Annual Income' },
//         { id: 'state', label: 'State' },
//         { id: 'city', label: 'City' },
//         { id: 'family_status', label: 'Family Status' },
//         { id: 'father_occupation', label: 'Father Business' },
//         { id: 'suya_gothram', label: 'Suya Gothram' },
//         { id: 'chevvai', label: 'Admin Chevvai' },
//         { id: 'raguketu', label: 'Admin Raghu/Kethu' },
//         { id: 'dateofjoin', label: 'Reg Date' },
//         { id: "status", label: "Status" },
//         { id: "matching_score", label: "Matching Score" },
//         { id: 'action_score', label: 'Action Score' },
//         { id: 'action_log', label: 'Action Log' },
//     ];
//     if (profileType === 'matching') {
//         return [
//             ...baseColumns,
//         ];
//     } else {
//         return [
//             ...baseColumns,
//             { id: "matching_score", label: "Suggested Score" },
//             { id: 'action_score', label: 'Action' }
//         ];
//     }
// };

// // Custom hook to track window width and calculate zoom level
// const useZoomLevel = () => {
//     const [zoomInfo, setZoomInfo] = useState({
//         windowWidth: window.innerWidth,
//         zoomLevel: 1,
//         tableWidth: '100%',
//         cellWidth: 'auto'
//     });

//     useEffect(() => {
//         const handleResize = () => {
//             const windowWidth = window.innerWidth;

//             // Calculate approximate zoom level based on screen width
//             let zoomLevel = 1;
//             let tableWidth = '100%';
//             let cellWidth = 'auto';

//             if (windowWidth >= 3000) {
//                 // Very zoomed out - make table very wide with narrow columns
//                 zoomLevel = 0.5;
//                 tableWidth = '200%';
//                 cellWidth = '80px';
//             } else if (windowWidth >= 2400) {
//                 // Zoomed out - make table wider
//                 zoomLevel = 0.6;
//                 tableWidth = '180%';
//                 cellWidth = '90px';
//             } else if (windowWidth >= 2000) {
//                 // Medium zoom out
//                 zoomLevel = 0.7;
//                 tableWidth = '160%';
//                 cellWidth = '100px';
//             } else if (windowWidth >= 1600) {
//                 // Slightly zoomed out
//                 zoomLevel = 0.8;
//                 tableWidth = '140%';
//                 cellWidth = '110px';
//             } else if (windowWidth >= 1200) {
//                 // Normal view
//                 zoomLevel = 1;
//                 tableWidth = '100%';
//                 cellWidth = '120px';
//             } else if (windowWidth >= 1000) {
//                 // Slightly zoomed in
//                 zoomLevel = 1.2;
//                 tableWidth = '100%';
//                 cellWidth = '130px';
//             } else {
//                 // Very zoomed in
//                 zoomLevel = 1.5;
//                 tableWidth = '100%';
//                 cellWidth = '150px';
//             }

//             setZoomInfo({
//                 windowWidth,
//                 zoomLevel,
//                 tableWidth,
//                 cellWidth
//             });
//         };

//         window.addEventListener('resize', handleResize);
//         handleResize(); // Initial call

//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     return zoomInfo;
// };

// interface UserMatchingProfilesTableProps {
//     profileID: string | null;
//     filters: any;
//     onBack: () => void;
//     profileType: 'matching' | 'suggested';
// }

// export const UserMatchingProfilesTable = ({ profileID, filters, onBack, profileType }: UserMatchingProfilesTableProps) => {
//     const navigate = useNavigate();
//     const { windowWidth, zoomLevel, tableWidth, cellWidth } = useZoomLevel();
//     const [matchingData, setMatchingData] = useState<UserMatchingProfilesProps[]>([]);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [totalItems, setTotalItems] = useState(0);
//     const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
//     const [selectedFormat, setSelectedFormat] = useState<string>("");
//     const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
//     const [printFormat, setPrintFormat] = useState<string>("");
//     const [isPrintProfile, setIsPrintProfile] = useState<boolean>(false);
//     const [whatsappFormat, setWhatsappFormat] = useState<string>("");
//     const [emailFormat, setEmailFormat] = useState<string>("");
//     const [iswhatsappProfile, setIsWhatsappProfile] = useState<boolean>(false);
//     const roleId = sessionStorage.getItem('role_id');
//     const [search, setSearch] = useState("");
//     const [selectedActionType, setSelectedActionType] = useState<string>('all');
//     const [activeStatus, setActiveStatus] = useState<string>("All");
//     const [selectedSendAction, setSelectedSendAction] = useState<string>('print');
//     const SELECT_COLUMN_WIDTH = 70;
//     const PROFILE_ID_COLUMN_WIDTH = 150;

//     const statusButtons = ["All", "Sent", "Unsent"];
//     const clearSearch = () => setSearch("");

//     // Get dynamic columns based on profileType
//     const columns = getColumns(profileType);

//     // Update the header title based on profileType
//     const headerTitle = profileType === 'matching'
//         ? "Vysyamala Matching Profiles"
//         : "Vysyamala Suggested Profiles";

//     // Tooltip function
//     const formatActionsForTooltip = (actions: any[]) => {
//         if (!actions || actions.length === 0) {
//             return "No actions recorded";
//         }

//         return (
//             <div>
//                 {actions.map((action, index) => {
//                     const date = new Date(action.datetime);
//                     const formattedDate = date.toLocaleDateString();

//                     return (
//                         <div key={index}>
//                             <strong>{action.action}</strong> – {formattedDate}
//                         </div>
//                     );
//                 })}
//             </div>
//         );
//     };

//     useEffect(() => {
//         setSelectedProfiles([]);
//     }, [activeStatus, selectedActionType, search]);

//     useEffect(() => {
//         const fetchMatchingData = async () => {
//             if (!profileID) return;
//             setLoading(true);
//             try {
//                 let data;
//                 // Set a large number for items per page to get all data
//                 const largePageSize = 10000;

//                 if (filters) {
//                     // Use filtered data with profileType
//                     data = await userMatchingProfilesFilterListMatch(
//                         String(profileID),
//                         1, // Always get first page
//                         largePageSize, // Large page size to get all data
//                         filters.selectedComplexions,
//                         filters.selectedEducation,
//                         filters.selectedFieldsOfStudy,
//                         filters.selectedDegrees,
//                         filters.heightFrom,
//                         filters.heightTo,
//                         filters.minAnnualIncome,
//                         filters.maxAnnualIncome,
//                         filters.foreignInterest,
//                         filters.selectedState,
//                         filters.selectedCity,
//                         filters.selectedMembership,
//                         filters.hasphotos,
//                         filters.destRasiIds,
//                         filters.ageDifference,
//                         filters.sarpaDhosham,
//                         filters.chevvaiDhosam,
//                         filters.selectedProfessions,
//                         filters.motherLive,
//                         filters.fatherLive,
//                         filters.selectedMaritalStatus,
//                         filters.selectedFamilyStatus,
//                         filters.sentInWhatsapp,
//                         filters.prefPoruthamStarRasi,
//                         filters.fromDateOfJoin,
//                         filters.toDateOfJoin,
//                         profileType,
//                         selectedActionType,
//                         activeStatus.toLowerCase() === 'all' ? 'all' : activeStatus.toLowerCase(),
//                         search.trim()
//                     );
//                 } else {
//                     // API call without filters
//                     data = await userMatchingProfilesFilterListMatch(
//                         String(profileID),
//                         1, // Always get first page
//                         largePageSize, // Large page size to get all data
//                         "", "", "", "", 0, 0, 0, 0, "", 0, 0, 0, "", 0, 0, "", "", "", "", "", "", "", "", "", "", "", profileType,
//                         selectedActionType,
//                         activeStatus.toLowerCase() === 'all' ? 'all' : activeStatus.toLowerCase(),
//                         search.trim()
//                     );
//                 }

//                 setMatchingData(data.profiles || []);
//                 setTotalItems(data.total_count || 0);
//             } catch (error: any) {
//                 NotifyError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMatchingData();
//     }, [profileID, filters, profileType, selectedActionType, activeStatus, search]);

//     // Handle status button change
//     const handleStatusChange = (status: string) => {
//         setActiveStatus(status);
//     };

//     // Handle filter action type change
//     const handleActionTypeChange = (actionType: string) => {
//         setSelectedActionType(actionType);
//     };

//     // Handle send action type change
//     const handleSendActionChange = (actionType: string) => {
//         setSelectedSendAction(actionType);
//     };

//     const handleCheckboxChange = (profileId: string) => {
//         setSelectedProfiles((prevSelected) => {
//             const isSelected = prevSelected.includes(profileId);
//             return isSelected
//                 ? prevSelected.filter((id) => id !== profileId)
//                 : [...prevSelected, profileId];
//         });
//     };

//     const handleSelectAll = () => {
//         setSelectedProfiles((prevSelected) => {
//             if (prevSelected.length === matchingData.length) {
//                 return [];
//             } else {
//                 return matchingData.map((profile) => profile.profile_id);
//             }
//         });
//     };

//     const handlePrintProfile = async () => {
//         if (selectedProfiles.length === 0) {
//             NotifyError("Please select at least one profile to print profile");
//             return;
//         }
//         if (!printFormat) {
//             NotifyError("Please select a Print format");
//             return;
//         }
//         try {
//             setIsPrintProfile(true);
//             const apiUrl = `https://app.vysyamala.com/api/admin-match-pdf-with-format/?action_type=print`;

//             const params = new URLSearchParams({
//                 pdf_format: printFormat,
//                 profile_ids: selectedProfiles.join(","),
//                 profile_to: String(profileID)
//             });

//             const newWindow = window.open(`${apiUrl}&${params.toString()}`, '_blank');

//             if (newWindow) {
//                 newWindow.focus();
//                 console.log("Opening profile in new tab...");
//             } else {
//                 NotifyError("Popup blocked! Please allow popups for this site.");
//             }
//         } catch (error: any) {
//             console.error("Failed to open print profile:", error);
//             NotifyError(error.message || "Failed to open print profile");
//         } finally {
//             setIsPrintProfile(false);
//         }
//     };

//     const handleProfileWhatsapp = async () => {
//         if (selectedProfiles.length === 0) {
//             NotifyError("Please select at least one profile to send via WhatsApp");
//             return;
//         }
//         if (!whatsappFormat) {
//             NotifyError("Please select a WhatsApp format");
//             return;
//         }
//         try {
//             setIsWhatsappProfile(true);
//             const apiUrl = `https://app.vysyamala.com/api/admin-match-pdf-with-format/?action_type=whatsapp`;

//             const params = new URLSearchParams({
//                 pdf_format: whatsappFormat,
//                 profile_ids: selectedProfiles.join(","),
//                 profile_to: String(profileID)
//             });

//             const newWindow = window.open(`${apiUrl}&${params.toString()}`, '_blank');

//             if (newWindow) {
//                 newWindow.focus();
//                 NotifySuccess("Profiles sent via WhatsApp successfully");
//             } else {
//                 NotifyError("Popup blocked! Please allow popups for this site.");
//             }
//         } catch (error: any) {
//             console.error("Failed to send via WhatsApp:", error);
//             NotifyError(error.message || "Failed to send via WhatsApp");
//         } finally {
//             setIsWhatsappProfile(false);
//         }
//     };

//     const handleSendEmail = async () => {
//         if (selectedProfiles.length === 0) {
//             NotifyError("Please select at least one profile to send via email");
//             return;
//         }
//         if (!emailFormat) {
//             NotifyError("Please select an email format");
//             return;
//         }

//         try {
//             setIsSendingEmail(true);

//             const apiUrl = `https://app.vysyamala.com/api/admin-match-pdf-with-format/`;

//             const query = new URLSearchParams({
//                 action_type: "email",
//                 pdf_format: emailFormat,
//                 profile_ids: selectedProfiles.join(","),
//                 profile_to: String(profileID),
//             });

//             const response = await fetch(`${apiUrl}?${query.toString()}`, {
//                 method: "GET",
//             });

//             if (!response.ok) {
//                 throw new Error("Failed to send emails");
//             }

//             NotifySuccess("Emails sent successfully");
//         } catch (error: any) {
//             console.error("Failed to send emails:", error);
//             NotifyError(error.message || "Failed to send emails");
//         } finally {
//             setIsSendingEmail(false);
//         }
//     };

//     const handleSendSelected = () => {
//         switch (selectedSendAction) {
//             case 'print':
//                 handlePrintProfile();
//                 break;
//             case 'whatsapp':
//                 handleProfileWhatsapp();
//                 break;
//             case 'email':
//                 handleSendEmail();
//                 break;
//             default:
//                 NotifyError("Please select an action");
//         }
//     };

//     const handleSearch = () => {
//         // The useEffect will automatically trigger due to the search state change
//     };

//     const handleKeyPress = (e: React.KeyboardEvent) => {
//         if (e.key === 'Enter') {
//             handleSearch();
//         }
//     };

//     return (
//         <div className="container mx-auto p-4">
//             {/* Zoom level indicator */}
//             {/* <div className="mb-2 text-xs text-gray-500 bg-blue-50 p-2 rounded">
//                 Screen: {windowWidth}px | Zoom Level: {zoomLevel}x | Table Width: {tableWidth} | Cell Width: {cellWidth}
//                 {windowWidth >= 3000 && " (Ultra wide - All columns visible)"}
//                 {windowWidth >= 2400 && windowWidth < 3000 && " (Very wide - All columns)"}
//                 {windowWidth >= 2000 && windowWidth < 2400 && " (Wide - All columns)"}
//                 {windowWidth >= 1600 && windowWidth < 2000 && " (Large desktop)"}
//                 {windowWidth >= 1200 && windowWidth < 1600 && " (Normal desktop)"}
//                 {windowWidth >= 1000 && windowWidth < 1200 && " (Small desktop)"}
//                 {windowWidth < 1000 && " (Compact view)"}
//             </div> */}

//             <div className="mb-4 flex justify-between items-center">
//                 <div>
//                     <h2 className="text-xl text-left font-bold text-red-600">{headerTitle}</h2>
//                     <p className="text-sm text-gray-600">
//                         Select profiles → choose format → choose actions → Send
//                     </p>

//                     <div className="flex gap-2 mt-3">
//                         {statusButtons.map((btn) => (
//                             <button
//                                 key={btn}
//                                 onClick={() => handleStatusChange(btn)}
//                                 className={`px-4 py-1 rounded-full text-black font-semibold ${activeStatus === btn
//                                     ? "bg-red-600 text-white"
//                                     : "border border-yellow-400 text-yellow-600 bg-yellow-50"
//                                     }`}
//                             >
//                                 {btn}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                     <span className="text-sm">Profiles: {selectedProfiles.length} selected</span>
//                 </div>
//             </div>

//             {activeStatus !== 'All' && (
//                 <div className="mb-4 bg-gray-50 rounded-lg p-3">
//                     <div className="flex items-center gap-4">
//                         <span className="font-bold text-title-sm text-black">
//                             {activeStatus === 'Unsent' ? 'Unsent filter:' : 'Sent filter:'}
//                         </span>
//                         <div className="flex gap-4">
//                             <label className="flex items-center">
//                                 <input
//                                     type="radio"
//                                     name="filterAction"
//                                     value="all"
//                                     className="mr-1"
//                                     checked={selectedActionType === 'all'}
//                                     onChange={() => handleActionTypeChange('all')}
//                                 />
//                                 All
//                             </label>
//                             <label className="flex items-center">
//                                 <input
//                                     type="radio"
//                                     name="filterAction"
//                                     value="print"
//                                     className="mr-1"
//                                     checked={selectedActionType === 'print'}
//                                     onChange={() => handleActionTypeChange('print')}
//                                 />
//                                 Print
//                             </label>
//                             <label className="flex items-center">
//                                 <input
//                                     type="radio"
//                                     name="filterAction"
//                                     value="whatsapp"
//                                     className="mr-1"
//                                     checked={selectedActionType === 'whatsapp'}
//                                     onChange={() => handleActionTypeChange('whatsapp')}
//                                 />
//                                 WhatsApp
//                             </label>
//                             <label className="flex items-center">
//                                 <input
//                                     type="radio"
//                                     name="filterAction"
//                                     value="email"
//                                     className="mr-1"
//                                     checked={selectedActionType === 'email'}
//                                     onChange={() => handleActionTypeChange('email')}
//                                 />
//                                 Email
//                             </label>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <div className="flex flex-wrap items-center gap-4 mb-4">
//                 {/* Format */}
//                 {selectedSendAction === 'print' && (
//                     <div>
//                         <label className="block font-bold text-black">Print Format</label>
//                         <select
//                             value={printFormat}
//                             onChange={(e) => setPrintFormat(e.target.value)}
//                             className="border border-gray-300 rounded px-3 py-1 w-70 text-black text-sm focus:outline-none">
//                             <option value="">Select a Print Format</option>
//                             <option value="match_full_profile">Full Profile</option>
//                             <option value="match_full_profile_black">Full profile black</option>
//                             <option value="match_compatability_color">Color</option>
//                             <option value="match_compatability_black">Black</option>
//                             <option value="match_compatability_without_horo">Without Horoscope</option>
//                             <option value="match_compatability_without_horo_black">Without Horoscope Black</option>
//                         </select>
//                     </div>
//                 )}

//                 {/* WhatsApp Format (only shown when WhatsApp is selected) */}
//                 {selectedSendAction === 'whatsapp' && (
//                     <div>
//                         <label className="block font-bold text-black">WhatsApp Format</label>
//                         <select
//                             value={whatsappFormat}
//                             onChange={(e) => setWhatsappFormat(e.target.value)}
//                             className="border border-gray-300 rounded px-3 py-1 w-70 text-black text-sm focus:outline-none">
//                             <option value="">Select a WhatsApp Format</option>
//                             <option value="match_full_profile">Full Profile</option>
//                             <option value="match_full_profile_black">Full profile black</option>
//                             <option value="match_compatability_color">Color</option>
//                             <option value="match_compatability_black">Black</option>
//                             <option value="match_compatability_without_horo">Without Horoscope</option>
//                             <option value="match_compatability_without_horo_black">Without Horoscope Black</option>
//                         </select>
//                     </div>
//                 )}

//                 {/* Email Format (only shown when Email is selected) */}
//                 {selectedSendAction === 'email' && (
//                     <div>
//                         <label className="block font-bold text-black">Email Format</label>
//                         <select
//                             value={emailFormat}
//                             onChange={(e) => setEmailFormat(e.target.value)}
//                             className="border border-gray-300 rounded px-3 py-1 w-40 text-black text-sm focus:outline-none">
//                             <option value="">Select an Email Format</option>
//                             <option value="match_full_profile">Full Profile</option>
//                             <option value="match_full_profile_black">Full profile black</option>
//                             <option value="match_compatability_color">Color</option>
//                             <option value="match_compatability_black">Black</option>
//                             <option value="match_compatability_without_horo">Without Horoscope</option>
//                             <option value="match_compatability_without_horo_black">Without Horoscope Black</option>
//                         </select>
//                     </div>
//                 )}

//                 {/* Actions */}
//                 <div className="flex flex-col items-start flex-1">
//                     <label className="block font-semibold text-black mb-1">Actions</label>
//                     <div className="flex gap-4">
//                         <label className="flex items-center">
//                             <input
//                                 type="radio"
//                                 name="sendAction"
//                                 value="print"
//                                 className="mr-1"
//                                 checked={selectedSendAction === 'print'}
//                                 onChange={() => handleSendActionChange('print')}
//                             />
//                             Print
//                         </label>
//                         <label className="flex items-center">
//                             <input
//                                 type="radio"
//                                 name="sendAction"
//                                 value="whatsapp"
//                                 className="mr-1"
//                                 checked={selectedSendAction === 'whatsapp'}
//                                 onChange={() => handleSendActionChange('whatsapp')}
//                             />
//                             WhatsApp
//                         </label>
//                         <label className="flex items-center">
//                             <input
//                                 type="radio"
//                                 name="sendAction"
//                                 value="email"
//                                 className="mr-1"
//                                 checked={selectedSendAction === 'email'}
//                                 onChange={() => handleSendActionChange('email')}
//                             />
//                             Email
//                         </label>

//                         <button
//                             onClick={handleSendSelected}
//                             className="px-3 py-0.5 text-white border bg-[#1976D2] whitespace-nowrap rounded"
//                             disabled={isPrintProfile || iswhatsappProfile || isSendingEmail}
//                         >
//                             {isPrintProfile || iswhatsappProfile || isSendingEmail ? (
//                                 <CircularProgress size={16} />
//                             ) : (
//                                 "Send Selected"
//                             )}
//                         </button>
//                     </div>
//                 </div>

//                 {/* Search */}
//                 <div className="flex items-end gap-2 ml-auto w-100">
//                     <div className="relative w-100 mt-5">
//                         <input
//                             type="text"
//                             placeholder="Search name / id / profession"
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             onKeyPress={handleKeyPress}
//                             className="border border-gray-300 w-100 rounded px-3 py-1 pr-8 focus:outline-none"
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
//                 </div>
//             </div>

//             <div className="flex justify-between items-center mt-4 px-4 py-2 bg-gray-50">
//                 <div className="text-sm text-gray-600">
//                     Showing {totalItems} records
//                 </div>
//             </div>

//             <div className="py-4" style={{ width: tableWidth, overflowX: 'auto' }}>
//                 <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
//                     <Table sx={{ minWidth: windowWidth >= 2000 ? '2000px' : '100%' }} aria-label="responsive table" stickyHeader>
//                         {/* <TableHead style={{ background: '#FFF8B3', padding: '17px', }}> */}
//                         <TableHead
//                             style={{
//                                 background: "#FFF8B3",
//                                 padding: "17px",
//                                 transform: "translateX(-8px)", // shift left smoothly
//                             }}
//                         >
//                             <TableRow>
//                                 {columns.map((column) => (
//                                     <TableCell
//                                         key={column.id}
//                                         sx={{
//                                             borderBottom: "1px solid #E0E0E0",
//                                             color: "#ee3448",
//                                             fontWeight: "bold",
//                                             fontSize: windowWidth >= 2000 ? "0.875rem" : "1rem",
//                                             whiteSpace: "nowrap",
//                                             backgroundColor: "#FFF8B3",
//                                             // highlight-start
//                                             // Make the first two columns sticky
//                                             position:
//                                                 column.id === "select" || column.id === "profile_id"
//                                                     ? "sticky"
//                                                     : "static",
//                                             // Calculate the 'left' offset based on column widths
//                                             left:
//                                                 column.id === "select"
//                                                     ? 0
//                                                     : column.id === "profile_id"
//                                                         ? SELECT_COLUMN_WIDTH // Use the width of the first column
//                                                         : "auto",
//                                             zIndex: column.id === "select" || column.id === "profile_id" ? 2 : 1,
//                                             // Apply the defined widths to the sticky columns
//                                             width:
//                                                 column.id === "select"
//                                                     ? SELECT_COLUMN_WIDTH
//                                                     : column.id === "profile_id"
//                                                         ? PROFILE_ID_COLUMN_WIDTH
//                                                         : "auto",
//                                             minWidth:
//                                                 column.id === "select"
//                                                     ? SELECT_COLUMN_WIDTH
//                                                     : column.id === "profile_id"
//                                                         ? PROFILE_ID_COLUMN_WIDTH
//                                                         : cellWidth,
//                                             // highlight-end
//                                             maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
//                                             padding: windowWidth >= 2000 ? '8px 4px' : '16px',
//                                         }}
//                                     >
//                                         {column.id === "select" ? (
//                                             <Checkbox
//                                                 color="primary"
//                                                 checked={matchingData.length > 0 && selectedProfiles.length === matchingData.length}
//                                                 indeterminate={
//                                                     selectedProfiles.length > 0 &&
//                                                     selectedProfiles.length < matchingData.length
//                                                 }
//                                                 onChange={handleSelectAll}
//                                                 size={windowWidth >= 2000 ? "small" : "medium"}
//                                             />
//                                         ) : (
//                                             <div style={{
//                                                 overflow: 'hidden',
//                                                 textOverflow: 'ellipsis',
//                                                 fontSize: windowWidth >= 2000 ? '12px' : '14px'
//                                             }}>
//                                                 {column.label}
//                                             </div>
//                                         )}
//                                     </TableCell>
//                                 ))}
//                             </TableRow>
//                         </TableHead>

//                         <TableBody>
//                             {loading ? (
//                                 <TableRow>
//                                     <TableCell colSpan={columns.length} sx={{ textAlign: "center", py: 3 }}>
//                                         <CircularProgress />
//                                     </TableCell>
//                                 </TableRow>
//                             ) : matchingData && matchingData.length > 0 ? (
//                                 matchingData.map((row) => (
//                                     <TableRow
//                                         key={row.profile_id}
//                                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                                     >
//                                         <TableCell // Sticky 'Select' Cell
//                                             sx={{
//                                                 position: "sticky",
//                                                 left: 0,
//                                                 background: "#fff",
//                                                 zIndex: 1,
//                                                 // highlight-start
//                                                 // Apply the same fixed width as the header
//                                                 width: SELECT_COLUMN_WIDTH,
//                                                 minWidth: SELECT_COLUMN_WIDTH,
//                                                 // highlight-end
//                                                 maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
//                                                 padding: windowWidth >= 2000 ? '4px' : '8px',
//                                             }}>
//                                             <Checkbox
//                                                 color="primary"
//                                                 checked={selectedProfiles.includes(row.profile_id)}
//                                                 onChange={() => handleCheckboxChange(row.profile_id)}
//                                                 size={windowWidth >= 2000 ? "small" : "medium"}
//                                             />
//                                         </TableCell>


//                                         <TableCell sx={{
//                                             minWidth: cellWidth,
//                                             maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
//                                             padding: windowWidth >= 2000 ? '4px' : '8px',
//                                         }}>
//                                             <img
//                                                 className="rounded-full"
//                                                 src={row.profile_img || BASE64_PLACEHOLDER}
//                                                 alt="Profile"
//                                                 width={windowWidth >= 2000 ? 40 : 50}
//                                                 height={windowWidth >= 2000 ? 40 : 50}
//                                                 onError={(e) => {
//                                                     e.currentTarget.src = BASE64_PLACEHOLDER;
//                                                 }}
//                                             />
//                                         </TableCell>


//                                         <TableCell // Sticky 'Profile ID' Cell
//                                             onClick={() => navigate(`/viewProfile?profileId=${row.profile_id}`)}
//                                             sx={{
//                                                 position: "sticky",
//                                                 // highlight-start
//                                                 // The 'left' offset is now the width of the first column
//                                                 left: SELECT_COLUMN_WIDTH,
//                                                 // Apply the same fixed width as the header for full visibility
//                                                 width: PROFILE_ID_COLUMN_WIDTH,
//                                                 minWidth: PROFILE_ID_COLUMN_WIDTH,
//                                                 // highlight-end
//                                                 background: "#fff",
//                                                 color: 'blue',
//                                                 cursor: 'pointer',
//                                                 textDecoration: 'none',
//                                                 '&:hover': { textDecoration: 'underline' },
//                                                 maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
//                                                 padding: windowWidth >= 2000 ? '4px' : '8px',
//                                                 fontSize: windowWidth >= 2000 ? '12px' : '14px',
//                                                 overflow: 'hidden',
//                                                 textOverflow: 'ellipsis'
//                                             }}
//                                         >
//                                             {row.profile_id}
//                                         </TableCell>

//                                         <TableCell sx={{
//                                             minWidth: cellWidth,
//                                             maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
//                                             padding: windowWidth >= 2000 ? '4px' : '8px',
//                                             fontSize: windowWidth >= 2000 ? '12px' : '14px',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis'
//                                         }}>
//                                             <div title={row.work_place}>{row.work_place}</div>
//                                         </TableCell>

//                                         <TableCell sx={{
//                                             minWidth: cellWidth,
//                                             maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
//                                             padding: windowWidth >= 2000 ? '4px' : '8px',
//                                             fontSize: windowWidth >= 2000 ? '12px' : '14px',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis'
//                                         }}>
//                                             <div title={row.plan}>{row.plan}</div>
//                                         </TableCell>

//                                         <TableCell sx={{
//                                             minWidth: cellWidth,
//                                             maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
//                                             padding: windowWidth >= 2000 ? '4px' : '8px',
//                                             fontSize: windowWidth >= 2000 ? '12px' : '14px',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis'
//                                         }}>
//                                             <div title={row.profile_name}>{row.profile_name}</div>
//                                         </TableCell>

//                                         <TableCell sx={{
//                                             minWidth: cellWidth,
//                                             maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
//                                             padding: windowWidth >= 2000 ? '4px' : '8px',
//                                             fontSize: windowWidth >= 2000 ? '12px' : '14px'
//                                         }}>
//                                             {row.profile_age}
//                                         </TableCell>

//                                         <TableCell sx={{
//                                             minWidth: cellWidth,
//                                             maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
//                                             padding: windowWidth >= 2000 ? '4px' : '8px',
//                                             fontSize: windowWidth >= 2000 ? '12px' : '14px',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis'
//                                         }}>
//                                             <div title={row.star}>{row.star}</div>
//                                         </TableCell>

//                                         <TableCell sx={{
//                                             minWidth: cellWidth,
//                                             maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
//                                             padding: windowWidth >= 2000 ? '4px' : '8px',
//                                             fontSize: windowWidth >= 2000 ? '12px' : '14px',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis'
//                                         }}>
//                                             <div title={row.degree}>{row.degree}</div>
//                                         </TableCell>

//                                         <TableCell sx={{
//                                             minWidth: cellWidth,
//                                             maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
//                                             padding: windowWidth >= 2000 ? '4px' : '8px',
//                                             fontSize: windowWidth >= 2000 ? '12px' : '14px',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis'
//                                         }}>
//                                             <div title={row.profession}>{row.profession}</div>
//                                         </TableCell>

//                                         <TableCell sx={{
//                                             minWidth: cellWidth,
//                                             maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
//                                             padding: windowWidth >= 2000 ? '4px' : '8px',
//                                             fontSize: windowWidth >= 2000 ? '12px' : '14px',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis'
//                                         }}>
//                                             <div title={row.company_name}>{row.company_name}</div>
//                                         </TableCell>

//                                         <TableCell sx={{
//                                             minWidth: cellWidth,
//                                             maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
//                                             padding: windowWidth >= 2000 ? '4px' : '8px',
//                                             fontSize: windowWidth >= 2000 ? '12px' : '14px',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis'
//                                         }}>
//                                             <div title={row.designation}>{row.designation}</div>
//                                         </TableCell>

//                                         <TableCell sx={{
//                                             minWidth: cellWidth,
//                                             maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
//                                             padding: windowWidth >= 2000 ? '4px' : '8px',
//                                             fontSize: windowWidth >= 2000 ? '12px' : '14px',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis'
//                                         }}>
//                                             <div title={row.anual_income}>{row.anual_income}</div>
//                                         </TableCell>

//                                         <TableCell sx={{
//                                             minWidth: cellWidth,
//                                             maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
//                                             padding: windowWidth >= 2000 ? '4px' : '8px',
//                                             fontSize: windowWidth >= 2000 ? '12px' : '14px',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis'
//                                         }}>
//                                             <div title={row.state}>{row.state}</div>
//                                         </TableCell>

//                                         <TableCell sx={{
//                                             minWidth: cellWidth,
//                                             maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
//                                             padding: windowWidth >= 2000 ? '4px' : '8px',
//                                             fontSize: windowWidth >= 2000 ? '12px' : '14px',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis'
//                                         }}>
//                                             <div title={row.city}>{row.city}</div>
//                                         </TableCell>

//                                         <TableCell sx={{
//                                             minWidth: cellWidth,
//                                             maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
//                                             padding: windowWidth >= 2000 ? '4px' : '8px',
//                                             fontSize: windowWidth >= 2000 ? '12px' : '14px',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis'
//                                         }}>
//                                             <div title={row.family_status}>{row.family_status}</div>
//                                         </TableCell>

//                                         <TableCell sx={{
//                                             minWidth: cellWidth,
//                                             maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
//                                             padding: windowWidth >= 2000 ? '4px' : '8px',
//                                             fontSize: windowWidth >= 2000 ? '12px' : '14px',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis'
//                                         }}>
//                                             <div title={row.father_occupation}>{row.father_occupation}</div>
//                                         </TableCell>

//                                         <TableCell sx={{
//                                             minWidth: cellWidth,
//                                             maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
//                                             padding: windowWidth >= 2000 ? '4px' : '8px',
//                                             fontSize: windowWidth >= 2000 ? '12px' : '14px',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis'
//                                         }}>
//                                             <div title={row.suya_gothram}>{row.suya_gothram}</div>
//                                         </TableCell>

//                                         <TableCell sx={{
//                                             minWidth: cellWidth,
//                                             maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
//                                             padding: windowWidth >= 2000 ? '4px' : '8px',
//                                             fontSize: windowWidth >= 2000 ? '12px' : '14px',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis'
//                                         }}>
//                                             <div title={row.chevvai}>{row.chevvai}</div>
//                                         </TableCell>

//                                         <TableCell sx={{
//                                             minWidth: cellWidth,
//                                             maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
//                                             padding: windowWidth >= 2000 ? '4px' : '8px',
//                                             fontSize: windowWidth >= 2000 ? '12px' : '14px',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis'
//                                         }}>
//                                             <div title={row.raguketu}>{row.raguketu}</div>
//                                         </TableCell>

//                                         <TableCell sx={{
//                                             minWidth: cellWidth,
//                                             maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
//                                             padding: windowWidth >= 2000 ? '4px' : '8px',
//                                             fontSize: windowWidth >= 2000 ? '12px' : '14px'
//                                         }}>
//                                             {row.dateofjoin
//                                                 ? new Date(row.dateofjoin).toLocaleDateString("en-GB")
//                                                 : "-"}
//                                         </TableCell>

//                                         <TableCell sx={{
//                                             minWidth: cellWidth,
//                                             maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
//                                             padding: windowWidth >= 2000 ? '4px' : '8px',
//                                             fontSize: windowWidth >= 2000 ? '12px' : '14px'
//                                         }}>
//                                             N/A
//                                         </TableCell>

//                                         <TableCell sx={{
//                                             minWidth: cellWidth,
//                                             maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
//                                             padding: windowWidth >= 2000 ? '4px' : '8px',
//                                             fontSize: windowWidth >= 2000 ? '12px' : '14px'
//                                         }}>
//                                             {row.matching_score}
//                                         </TableCell>

//                                         <TableCell sx={{
//                                             minWidth: cellWidth,
//                                             maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
//                                             padding: windowWidth >= 2000 ? '4px' : '8px',
//                                             fontSize: windowWidth >= 2000 ? '12px' : '14px'
//                                         }}>
//                                             <Tooltip
//                                                 title={
//                                                     <div style={{ whiteSpace: 'pre-line' }}>
//                                                         {formatActionsForTooltip(row.action_score?.actions || [])}
//                                                     </div>
//                                                 }
//                                                 arrow
//                                                 placement="top"
//                                             >
//                                                 <span>{row.action_score?.score ?? "-"}</span>
//                                             </Tooltip>
//                                         </TableCell>

//                                         <TableCell sx={{
//                                             minWidth: windowWidth >= 2000 ? '120px' : '200px',
//                                             maxWidth: windowWidth >= 2000 ? '120px' : '300px',
//                                             padding: windowWidth >= 2000 ? '4px' : '8px',
//                                             fontSize: windowWidth >= 2000 ? '12px' : '14px',
//                                             whiteSpace: "normal",
//                                             overflow: 'hidden'
//                                         }}>
//                                             {row.action_log
//                                                 ?.split(",")
//                                                 .map((item: string, index: number, arr: string[]) => (
//                                                     <React.Fragment key={index}>
//                                                         <span style={{ fontSize: windowWidth >= 2000 ? '11px' : '13px' }}>
//                                                             {item.trim()}
//                                                         </span>
//                                                         {index < arr.length - 1 && ","} {/* keep comma except last */}
//                                                         <br />
//                                                     </React.Fragment>
//                                                 ))}
//                                         </TableCell>
//                                     </TableRow>
//                                 ))
//                             ) : (
//                                 <TableRow>
//                                     <TableCell colSpan={columns.length} sx={{ textAlign: 'center' }}>
//                                         No Matching Records found.
//                                     </TableCell>
//                                 </TableRow>
//                             )}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </div>
//         </div>
//     );
// };

import { useState, useEffect } from 'react';
import {
    Box, Button, Checkbox, CircularProgress, IconButton, Paper, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow,
    Typography, Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MdVerified } from 'react-icons/md';
import { GoUnverified } from 'react-icons/go';
import { NotifyError, NotifySuccess } from '../../common/Toast/ToastMessage';
import {
    MatchingEmailProfile,
    MatchingPrintProfile,
    MatchingWhatsappProfile,
    userMatchingProfiles,
    userMatchingProfilesFilterListMatch,
    userMatchingProfilesPrintProfile,
    userMatchingProfilesSendEmail,
    userMatchingProfilesWhatsapp
} from '../../api/apiConfig';
import React from 'react';

// Base64 encoded placeholder image to avoid 404 errors
const BASE64_PLACEHOLDER = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNSA0QzI4LjMxNDggNCAzMSA2LjY4NTI0IDMxIDkuOTk5OTlDMzEgMTMuMzE0NyAyOC4zMTQ4IDE1Ljk5OTkgMjUgMTUuOTk5OUMyMS42ODUyIDE1Ljk5OTkgMTkgMTMuMzE0NyAxOSA5Ljk5OTk5QzE5IDYuNjg1MjQgMjEuNjg1MiA0IDI1IDRaIiBmaWxsPSIjOTk5OTk5Ii8+CjxwYXRoIGQ9Ik0yNSAxOEMzMC41MjIgMTggMzUgMTkuNzggMzUgMjJWMzZIMTVWMjJDMTUgMTkuNzggMTkuNDc4IDE4IDI1IDE4WiIgZmlsbD0iIzk5OTk5OSIvPgo8L3N2Zz4K";

interface ActionScore {
    score: number;
    actions: any[];
}

interface UserMatchingProfilesProps {
    action_log: any;
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
    search: string;
    verified: number;
    action_score: ActionScore;
    dateofjoin: string;
    // except_viewed:boolean;
    // except_visitor:boolean;
    profile_status: string;
}

const getColumns = (profileType: 'matching' | 'suggested') => {
    const baseColumns = [
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
        { id: 'company_name', label: 'Company / Business' },
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
        { id: "profile_status", label: "Status" },
        { id: "matching_score", label: "Matching Score" },
        { id: 'action_score', label: 'Action Score' },
        { id: 'action_log', label: 'Action Log' },
    ];
    if (profileType === 'matching') {
        return [
            ...baseColumns,
        ];
    } else {
        return [
            ...baseColumns,
            { id: "matching_score", label: "Suggested Score" },
            { id: 'action_score', label: 'Action' }
        ];
    }
};

// Custom hook to track window width and calculate zoom level
const useZoomLevel = () => {
    const [zoomInfo, setZoomInfo] = useState({
        windowWidth: window.innerWidth,
        zoomLevel: 1,
        tableWidth: '100%',
        cellWidth: 'auto'
    });

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;

            // Calculate approximate zoom level based on screen width
            let zoomLevel = 1;
            let tableWidth = '100%';
            let cellWidth = 'auto';

            if (windowWidth >= 3000) {
                // Very zoomed out - make table very wide with narrow columns
                zoomLevel = 0.5;
                tableWidth = '200%';
                cellWidth = '30px';
            } else if (windowWidth >= 2400) {
                // Zoomed out - make table wider
                zoomLevel = 0.6;
                tableWidth = '180%';
                cellWidth = '30px';
            } else if (windowWidth >= 2000) {
                // Medium zoom out
                zoomLevel = 0.7;
                tableWidth = '100%';
                cellWidth = '30px';
            } else if (windowWidth >= 1600) {
                // Slightly zoomed out
                zoomLevel = 0.8;
                tableWidth = '100%';
                cellWidth = '110px';
            } else if (windowWidth >= 1200) {
                // Normal view
                zoomLevel = 1;
                tableWidth = '100%';
                cellWidth = '120px';
            } else if (windowWidth >= 1000) {
                // Slightly zoomed in
                zoomLevel = 1.2;
                tableWidth = '100%';
                cellWidth = '130px';
            } else {
                // Very zoomed in
                zoomLevel = 1.5;
                tableWidth = '100%';
                cellWidth = '150px';
            }

            setZoomInfo({
                windowWidth,
                zoomLevel,
                tableWidth,
                cellWidth
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return zoomInfo;
};

interface UserMatchingProfilesTableProps {
    profileID: string | null;
    filters: any;
    onBack: () => void;
    profileType: 'matching' | 'suggested';
}

export const UserMatchingProfilesTable = ({ profileID, filters, onBack, profileType }: UserMatchingProfilesTableProps) => {
    const navigate = useNavigate();
    const { windowWidth, zoomLevel, tableWidth, cellWidth } = useZoomLevel();
    const [matchingData, setMatchingData] = useState<UserMatchingProfilesProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalItems, setTotalItems] = useState(0);
    const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
    const [selectedFormat, setSelectedFormat] = useState<string>("");
    const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
    const [printFormat, setPrintFormat] = useState<string>("");
    const [isPrintProfile, setIsPrintProfile] = useState<boolean>(false);
    const [whatsappFormat, setWhatsappFormat] = useState<string>("");
    const [emailFormat, setEmailFormat] = useState<string>("");
    const [iswhatsappProfile, setIsWhatsappProfile] = useState<boolean>(false);
    const roleId = sessionStorage.getItem('role_id');
    const [search, setSearch] = useState("");
    const [selectedActionType, setSelectedActionType] = useState<string>('all');
    const [activeStatus, setActiveStatus] = useState<string>("All");
    const [selectedSendAction, setSelectedSendAction] = useState<string>('print');
    const SELECT_COLUMN_WIDTH = 70;
    const PROFILE_ID_COLUMN_WIDTH = 150;

    const statusButtons = ["All", "Sent", "Unsent"];
    const clearSearch = () => setSearch("");

    // Get dynamic columns based on profileType
    const columns = getColumns(profileType);

    // Update the header title based on profileType
    const headerTitle = profileType === 'matching'
        ? "Vysyamala Matching Profiles"
        : "Vysyamala Suggested Profiles";

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
        setSelectedProfiles([]);
    }, [activeStatus, selectedActionType, search]);

    const fetchMatchingData = async () => {
        if (!profileID) return;
        setLoading(true);
        try {
            let data;
            // Set a large number for items per page to get all data
            const largePageSize = 10000;
            const exceptViewedBool = filters.except_viewed === true || filters.except_viewed === 'true';
            const exceptVisitorBool = filters.except_visitor === true || filters.except_visitor === 'true';

            if (filters) {
                // Use filtered data with profileType
                data = await userMatchingProfilesFilterListMatch(
                    String(profileID),
                    1, // Always get first page
                    largePageSize, // Large page size to get all data
                    filters.selectedComplexions,
                    filters.selectedEducation,
                    filters.selectedFieldsOfStudy,
                    filters.selectedDegrees,
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
                    //  filters.prefPoruthamStarRasi,
                    filters.fromDateOfJoin,
                    filters.toDateOfJoin,
                    exceptViewedBool,  // Pass as boolean
                    exceptVisitorBool, // Pass as boolean
                    profileType,
                    selectedActionType,
                    activeStatus.toLowerCase() === 'all' ? 'all' : activeStatus.toLowerCase(),
                    search.trim()
                );
            } else {
                // API call without filters
                data = await userMatchingProfilesFilterListMatch(
                    String(profileID),
                    1, // Always get first page
                    largePageSize, // Large page size to get all data
                    "", "", "", "", 0, 0, 0, 0, "", 0, 0, 0, "", 0, 0, "", "", "", "", "", "", "", "", "", "",
                    filters.except_viewed || false,
                    filters.except_visitor || false,
                    profileType,
                    selectedActionType,
                    activeStatus.toLowerCase() === 'all' ? 'all' : activeStatus.toLowerCase(),
                    search.trim()
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
    useEffect(() => {
        fetchMatchingData();
    }, [profileID, filters, profileType, selectedActionType, activeStatus, search]);

    // Handle status button change
    const handleStatusChange = (status: string) => {
        setActiveStatus(status);
    };

    // Handle filter action type change
    const handleActionTypeChange = (actionType: string) => {
        setSelectedActionType(actionType);
    };

    // Handle send action type change
    const handleSendActionChange = (actionType: string) => {
        setSelectedSendAction(actionType);
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
        // Get the IDs of all profiles that are eligible to be selected
        const selectableProfileIds = matchingData
            .filter(profile => String(profile.profile_status) === '1')
            .map(profile => profile.profile_id);

        // Get the IDs of the currently selected profiles that are also selectable
        const currentlySelectedSelectable = selectedProfiles.filter(id => selectableProfileIds.includes(id));

        if (currentlySelectedSelectable.length === selectableProfileIds.length) {
            // If all selectable profiles are already selected, deselect them
            setSelectedProfiles(prevSelected =>
                prevSelected.filter(id => !selectableProfileIds.includes(id))
            );
        } else {
            // Otherwise, add all selectable profiles to the current selection
            setSelectedProfiles(prevSelected => [
                ...new Set([...prevSelected, ...selectableProfileIds]),
            ]);
        }
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
            const apiUrl = `https://app.vysyamala.com/api/admin-match-pdf-with-format/?action_type=print`;

            const params = new URLSearchParams({
                pdf_format: printFormat,
                profile_ids: selectedProfiles.join(","),
                profile_to: String(profileID)
            });

            const newWindow = window.open(`${apiUrl}&${params.toString()}`, '_blank');

            if (newWindow) {
                newWindow.focus();
                console.log("Opening profile in new tab...");
                await fetchMatchingData();
                setSelectedProfiles([]);
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
            NotifyError("Please select at least one profile to send via WhatsApp");
            return;
        }
        if (!whatsappFormat) {
            NotifyError("Please select a WhatsApp format");
            return;
        }
        try {
            setIsWhatsappProfile(true);
            const apiUrl = `https://app.vysyamala.com/api/admin-match-pdf-with-format/?action_type=whatsapp`;

            const params = new URLSearchParams({
                pdf_format: whatsappFormat,
                profile_ids: selectedProfiles.join(","),
                profile_to: String(profileID)
            });

            const newWindow = window.open(`${apiUrl}&${params.toString()}`, '_blank');

            if (newWindow) {
                newWindow.focus();
                NotifySuccess("Profiles sent via WhatsApp successfully");
                await fetchMatchingData();
                setSelectedProfiles([]);
            } else {
                NotifyError("Popup blocked! Please allow popups for this site.");
            }
        } catch (error: any) {
            console.error("Failed to send via WhatsApp:", error);
            NotifyError(error.message || "Failed to send via WhatsApp");
        } finally {
            setIsWhatsappProfile(false);
        }
    };

    const handleSendEmail = async () => {
        if (selectedProfiles.length === 0) {
            NotifyError("Please select at least one profile to send via email");
            return;
        }
        if (!emailFormat) {
            NotifyError("Please select an email format");
            return;
        }

        try {
            setIsSendingEmail(true);

            const apiUrl = `https://app.vysyamala.com/api/admin-match-pdf-with-format/`;

            const query = new URLSearchParams({
                action_type: "email",
                pdf_format: emailFormat,
                profile_ids: selectedProfiles.join(","),
                profile_to: String(profileID),
            });

            const response = await fetch(`${apiUrl}?${query.toString()}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Failed to send emails");
            }

            NotifySuccess("Emails sent successfully");
            await fetchMatchingData();
            setSelectedProfiles([]);
        } catch (error: any) {
            console.error("Failed to send emails:", error);
            NotifyError(error.message || "Failed to send emails");
        } finally {
            setIsSendingEmail(false);
        }
    };

    const handleSendSelected = () => {
        switch (selectedSendAction) {
            case 'print':
                handlePrintProfile();
                break;
            case 'whatsapp':
                handleProfileWhatsapp();
                break;
            case 'email':
                handleSendEmail();
                break;
            default:
                NotifyError("Please select an action");
        }
    };

    const handleSearch = () => {
        // The useEffect will automatically trigger due to the search state change
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const getProfileStatusText = (statusCode: string | number): string => {
        const statusMap: { [key: string]: string } = {
            "0": "Newly Registered",
            "1": "Approved",
            "2": "Pending",
            "3": "Hidden Profiles",
            "4": "Deleted Profile"
        };

        // Convert to string to handle both number and string inputs
        return statusMap[String(statusCode)] || "Unknown Status";
    };

    const selectableProfiles = matchingData.filter(p => String(p.profile_status) === '1');
    const numSelectable = selectableProfiles.length;
    const numSelected = selectedProfiles.filter(id =>
        selectableProfiles.some(p => p.profile_id === id)
    ).length;

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4 flex justify-between items-center">
                <div>
                    <h2 className="text-xl text-left font-bold text-red-600">{headerTitle}</h2>
                    <p className="text-sm text-gray-600">
                        Select profiles → choose format → choose actions → Send
                    </p>

                    <div className="flex gap-2 mt-3">
                        {statusButtons.map((btn) => (
                            <button
                                key={btn}
                                onClick={() => handleStatusChange(btn)}
                                className={`px-4 py-1 rounded-full text-black font-semibold ${activeStatus === btn
                                    ? "bg-red-600 text-white"
                                    : "border border-yellow-400 text-yellow-600 bg-yellow-50"
                                    }`}
                            >
                                {btn}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm">Profiles: {selectedProfiles.length} selected</span>
                </div>
            </div>

            {activeStatus !== 'All' && (
                <div className="mb-4 bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-4">
                        <span className="font-bold text-title-sm text-black">
                            {activeStatus === 'Unsent' ? 'Unsent filter:' : 'Sent filter:'}
                        </span>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="filterAction"
                                    value="all"
                                    className="mr-1"
                                    checked={selectedActionType === 'all'}
                                    onChange={() => handleActionTypeChange('all')}
                                />
                                All
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="filterAction"
                                    value="print"
                                    className="mr-1"
                                    checked={selectedActionType === 'print'}
                                    onChange={() => handleActionTypeChange('print')}
                                />
                                Print
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="filterAction"
                                    value="whatsapp"
                                    className="mr-1"
                                    checked={selectedActionType === 'whatsapp'}
                                    onChange={() => handleActionTypeChange('whatsapp')}
                                />
                                WhatsApp
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="filterAction"
                                    value="email"
                                    className="mr-1"
                                    checked={selectedActionType === 'email'}
                                    onChange={() => handleActionTypeChange('email')}
                                />
                                Email
                            </label>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-wrap items-center gap-4 mb-4">
                {/* Format */}
                {selectedSendAction === 'print' && (
                    <div>
                        <label className="block font-bold text-black">Print Format</label>
                        <select
                            value={printFormat}
                            onChange={(e) => setPrintFormat(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-1 w-70 text-black text-sm focus:outline-none">
                            <option value="">Select a Print Format</option>
                            <option value="match_full_profile">Full Profile</option>
                            <option value="match_full_profile_black">Full profile black</option>
                            <option value="match_compatability_color">Color</option>
                            <option value="match_compatability_black">Black</option>
                            <option value="match_compatability_without_horo">Without Horoscope</option>
                            <option value="match_compatability_without_horo_black">Without Horoscope Black</option>
                            <option value="whatsapp_link_profile_img">Whatsapp Link Profile (with image)</option>
                            <option value="whatsapp_link_profile">Whatsapp Link Profile (without image)</option>
                        </select>
                    </div>
                )}

                {/* WhatsApp Format (only shown when WhatsApp is selected) */}
                {selectedSendAction === 'whatsapp' && (
                    <div>
                        <label className="block font-bold text-black">WhatsApp Format</label>
                        <select
                            value={whatsappFormat}
                            onChange={(e) => setWhatsappFormat(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-1 w-70 text-black text-sm focus:outline-none">
                            <option value="">Select a WhatsApp Format</option>
                            <option value="match_full_profile">Full Profile</option>
                            <option value="match_full_profile_black">Full profile black</option>
                            <option value="match_compatability_color">Color</option>
                            <option value="match_compatability_black">Black</option>
                            <option value="match_compatability_without_horo">Without Horoscope</option>
                            <option value="match_compatability_without_horo_black">Without Horoscope Black</option>
                            <option value="whatsapp_link_profile_img">Whatsapp Link Profile (with image)</option>
                            <option value="whatsapp_link_profile">Whatsapp Link Profile (without image)</option>
                        </select>
                    </div>
                )}

                {/* Email Format (only shown when Email is selected) */}
                {selectedSendAction === 'email' && (
                    <div>
                        <label className="block font-bold text-black">Email Format</label>
                        <select
                            value={emailFormat}
                            onChange={(e) => setEmailFormat(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-1 w-40 text-black text-sm focus:outline-none">
                            <option value="">Select an Email Format</option>
                            <option value="match_full_profile">Full Profile</option>
                            <option value="match_full_profile_black">Full profile black</option>
                            <option value="match_compatability_color">Color</option>
                            <option value="match_compatability_black">Black</option>
                            <option value="match_compatability_without_horo">Without Horoscope</option>
                            <option value="match_compatability_without_horo_black">Without Horoscope Black</option>
                            <option value="whatsapp_link_profile_img">Whatsapp Link Profile (with image)</option>
                            <option value="whatsapp_link_profile">Whatsapp Link Profile (without image)</option>
                        </select>
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col items-start flex-1">
                    <label className="block font-semibold text-black mb-1">Actions</label>
                    <div className="flex gap-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="sendAction"
                                value="print"
                                className="mr-1"
                                checked={selectedSendAction === 'print'}
                                onChange={() => handleSendActionChange('print')}
                            />
                            Print
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="sendAction"
                                value="whatsapp"
                                className="mr-1"
                                checked={selectedSendAction === 'whatsapp'}
                                onChange={() => handleSendActionChange('whatsapp')}
                            />
                            WhatsApp
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="sendAction"
                                value="email"
                                className="mr-1"
                                checked={selectedSendAction === 'email'}
                                onChange={() => handleSendActionChange('email')}
                            />
                            Email
                        </label>

                        <button
                            onClick={handleSendSelected}
                            className="px-3 py-0.5 text-white border bg-[#1976D2] whitespace-nowrap rounded"
                            disabled={isPrintProfile || iswhatsappProfile || isSendingEmail}
                        >
                            {isPrintProfile || iswhatsappProfile || isSendingEmail ? (
                                <CircularProgress size={16} sx={{ color: "white" }} />
                            ) : (
                                "Send Selected"
                            )}
                        </button>
                    </div>
                </div>

                {/* Search */}
                <div className="flex items-end gap-2 ml-auto w-100">
                    <div className="relative w-100 mt-5">
                        <input
                            type="text"
                            placeholder="Search name / id / profession"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="border border-gray-300 w-100 rounded px-3 py-1 pr-8 focus:outline-none"
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
                </div>
            </div>

            <div className="flex justify-between items-center mt-4 px-4 py-2 bg-gray-50">
                <div className="text-sm text-gray-600">
                    Showing {totalItems} records
                </div>
            </div>

            {/* highlight-start */}
            <div className="py-4" style={{ width: tableWidth, overflowX: 'auto', margin: '0 auto' }}>
                {/* highlight-end */}
                <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
                    <Table sx={{ minWidth: windowWidth >= 2000 ? '2000px' : '100%' }} aria-label="responsive table" stickyHeader>
                        <TableHead
                            style={{
                                background: "#FFF8B3",
                                padding: "17px",
                                transform: "translateX(-8px)", // shift left smoothly
                            }}
                        >
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        sx={{
                                            borderBottom: "1px solid #E0E0E0",
                                            color: "#ee3448",
                                            fontWeight: "bold",
                                            fontSize: windowWidth >= 2000 ? "0.875rem" : "1rem",
                                            whiteSpace: "nowrap",
                                            backgroundColor: "#FFF8B3",
                                            position:
                                                column.id === "select" || column.id === "profile_id"
                                                    ? "sticky"
                                                    : "static",
                                            left:
                                                column.id === "select"
                                                    ? 0
                                                    : column.id === "profile_id"
                                                        ? SELECT_COLUMN_WIDTH
                                                        : "auto",
                                            zIndex: column.id === "select" || column.id === "profile_id" ? 2 : 1,
                                            width:
                                                column.id === "select"
                                                    ? SELECT_COLUMN_WIDTH
                                                    : column.id === "profile_id"
                                                        ? PROFILE_ID_COLUMN_WIDTH
                                                        : "auto",
                                            minWidth:
                                                column.id === "select"
                                                    ? SELECT_COLUMN_WIDTH
                                                    : column.id === "profile_id"
                                                        ? PROFILE_ID_COLUMN_WIDTH
                                                        : cellWidth,
                                            maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
                                            padding: windowWidth >= 2000 ? '8px 4px' : '16px',
                                        }}
                                    >
                                        {column.id === "select" ? (
                                            <Box
                                                sx={{
                                                    display: "inline-flex",
                                                    cursor: numSelectable === 0 ? "not-allowed" : "pointer",
                                                }}
                                            >
                                                <Checkbox
                                                    color="primary"
                                                    // highlight-start
                                                    checked={numSelectable > 0 && numSelected === numSelectable}
                                                    indeterminate={numSelected > 0 && numSelected < numSelectable}
                                                    disabled={numSelectable === 0}
                                                    onChange={handleSelectAll}
                                                    // highlight-end
                                                    size={windowWidth >= 2000 ? "small" : "medium"}
                                                />
                                            </Box>
                                        ) : (
                                            <div style={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                fontSize: windowWidth >= 2000 ? '12px' : '14px'
                                            }}>
                                                {column.label}
                                            </div>
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
                                        <TableCell // Sticky 'Select' Cell
                                            sx={{
                                                position: "sticky",
                                                left: 0,
                                                background: "#fff",
                                                zIndex: 1,
                                                width: SELECT_COLUMN_WIDTH,
                                                minWidth: SELECT_COLUMN_WIDTH,
                                                maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
                                                padding: windowWidth >= 2000 ? '4px' : '8px',
                                            }}>
                                            <Box
                                                sx={{
                                                    display: "inline-flex",
                                                    cursor: String(row.profile_status) !== "1" ? "not-allowed" : "pointer",
                                                }}
                                            >
                                                <Checkbox
                                                    color="primary"
                                                    checked={selectedProfiles.includes(row.profile_id)}
                                                    onChange={() => handleCheckboxChange(row.profile_id)}
                                                    disabled={String(row.profile_status) !== "1"}
                                                    size={windowWidth >= 2000 ? "small" : "medium"}
                                                    sx={{
                                                        pointerEvents: String(row.profile_status) !== "1" ? "none" : "auto",
                                                    }}
                                                />
                                            </Box>
                                        </TableCell>


                                        <TableCell sx={{
                                            minWidth: cellWidth,
                                            maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
                                            padding: windowWidth >= 2000 ? '4px' : '8px',
                                        }}>
                                            <img
                                                className="rounded-full"
                                                src={row.profile_img || BASE64_PLACEHOLDER}
                                                alt="Profile"
                                                width={windowWidth >= 2000 ? 40 : 50}
                                                height={windowWidth >= 2000 ? 40 : 50}
                                                onError={(e) => {
                                                    e.currentTarget.src = BASE64_PLACEHOLDER;
                                                }}
                                            />
                                        </TableCell>


                                        <TableCell // Sticky 'Profile ID' Cell
                                            onClick={() => window.open(`/viewProfile?profileId=${row.profile_id}`, "_blank")}
                                            sx={{
                                                position: "sticky",
                                                left: SELECT_COLUMN_WIDTH,
                                                width: PROFILE_ID_COLUMN_WIDTH,
                                                minWidth: PROFILE_ID_COLUMN_WIDTH,
                                                background: "#fff",
                                                color: 'blue',
                                                cursor: 'pointer',
                                                textDecoration: 'none',
                                                '&:hover': { textDecoration: 'underline' },
                                                maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
                                                padding: windowWidth >= 2000 ? '4px' : '8px',
                                                fontSize: windowWidth >= 2000 ? '12px' : '14px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}
                                        >
                                            {row.profile_id}
                                        </TableCell>

                                        <TableCell sx={{
                                            minWidth: cellWidth,
                                            maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
                                            padding: windowWidth >= 2000 ? '4px' : '8px',
                                            fontSize: windowWidth >= 2000 ? '12px' : '14px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <div title={row.work_place}>{row.work_place}</div>
                                        </TableCell>

                                        <TableCell sx={{
                                            minWidth: cellWidth,
                                            maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
                                            padding: windowWidth >= 2000 ? '4px' : '8px',
                                            fontSize: windowWidth >= 2000 ? '12px' : '14px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <div title={row.plan}>{row.plan}</div>
                                        </TableCell>

                                        <TableCell sx={{
                                            minWidth: cellWidth,
                                            maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
                                            padding: windowWidth >= 2000 ? '4px' : '8px',
                                            fontSize: windowWidth >= 2000 ? '12px' : '14px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <div title={row.profile_name}>{row.profile_name}</div>
                                        </TableCell>

                                        <TableCell sx={{
                                            minWidth: cellWidth,
                                            maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
                                            padding: windowWidth >= 2000 ? '4px' : '8px',
                                            fontSize: windowWidth >= 2000 ? '12px' : '14px'
                                        }}>
                                            {row.profile_age}
                                        </TableCell>

                                        <TableCell sx={{
                                            minWidth: cellWidth,
                                            maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
                                            padding: windowWidth >= 2000 ? '4px' : '8px',
                                            fontSize: windowWidth >= 2000 ? '12px' : '14px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <div title={row.star}>{row.star}</div>
                                        </TableCell>

                                        <TableCell sx={{
                                            minWidth: cellWidth,
                                            maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
                                            padding: windowWidth >= 2000 ? '4px' : '8px',
                                            fontSize: windowWidth >= 2000 ? '12px' : '14px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <div title={row.degree}>{row.degree}</div>
                                        </TableCell>

                                        <TableCell sx={{
                                            minWidth: cellWidth,
                                            maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
                                            padding: windowWidth >= 2000 ? '4px' : '8px',
                                            fontSize: windowWidth >= 2000 ? '12px' : '14px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <div title={row.profession}>{row.profession}</div>
                                        </TableCell>

                                        <TableCell sx={{
                                            minWidth: cellWidth,
                                            maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
                                            padding: windowWidth >= 2000 ? '4px' : '8px',
                                            fontSize: windowWidth >= 2000 ? '12px' : '14px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <div title={row.company_name}>{row.company_name}</div>
                                        </TableCell>

                                        <TableCell sx={{
                                            minWidth: cellWidth,
                                            maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
                                            padding: windowWidth >= 2000 ? '4px' : '8px',
                                            fontSize: windowWidth >= 2000 ? '12px' : '14px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <div title={row.designation}>{row.designation}</div>
                                        </TableCell>

                                        <TableCell sx={{
                                            minWidth: cellWidth,
                                            maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
                                            padding: windowWidth >= 2000 ? '4px' : '8px',
                                            fontSize: windowWidth >= 2000 ? '12px' : '14px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <div title={row.anual_income}>{row.anual_income}</div>
                                        </TableCell>

                                        <TableCell sx={{
                                            minWidth: cellWidth,
                                            maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
                                            padding: windowWidth >= 2000 ? '4px' : '8px',
                                            fontSize: windowWidth >= 2000 ? '12px' : '14px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <div title={row.state}>{row.state}</div>
                                        </TableCell>

                                        <TableCell sx={{
                                            minWidth: cellWidth,
                                            maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
                                            padding: windowWidth >= 2000 ? '4px' : '8px',
                                            fontSize: windowWidth >= 2000 ? '12px' : '14px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <div title={row.city}>{row.city}</div>
                                        </TableCell>

                                        <TableCell sx={{
                                            minWidth: cellWidth,
                                            maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
                                            padding: windowWidth >= 2000 ? '4px' : '8px',
                                            fontSize: windowWidth >= 2000 ? '12px' : '14px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <div title={row.family_status}>{row.family_status}</div>
                                        </TableCell>

                                        <TableCell sx={{
                                            minWidth: cellWidth,
                                            maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
                                            padding: windowWidth >= 2000 ? '4px' : '8px',
                                            fontSize: windowWidth >= 2000 ? '12px' : '14px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <div title={row.father_occupation}>{row.father_occupation}</div>
                                        </TableCell>

                                        <TableCell sx={{
                                            minWidth: cellWidth,
                                            maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
                                            padding: windowWidth >= 2000 ? '4px' : '8px',
                                            fontSize: windowWidth >= 2000 ? '12px' : '14px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <div title={row.suya_gothram}>{row.suya_gothram}</div>
                                        </TableCell>

                                        <TableCell sx={{
                                            minWidth: cellWidth,
                                            maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
                                            padding: windowWidth >= 2000 ? '4px' : '8px',
                                            fontSize: windowWidth >= 2000 ? '12px' : '14px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <div title={row.chevvai}>{row.chevvai}</div>
                                        </TableCell>

                                        <TableCell sx={{
                                            minWidth: cellWidth,
                                            maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
                                            padding: windowWidth >= 2000 ? '4px' : '8px',
                                            fontSize: windowWidth >= 2000 ? '12px' : '14px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <div title={row.raguketu}>{row.raguketu}</div>
                                        </TableCell>

                                        <TableCell sx={{
                                            minWidth: cellWidth,
                                            maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
                                            padding: windowWidth >= 2000 ? '4px' : '8px',
                                            fontSize: windowWidth >= 2000 ? '12px' : '14px'
                                        }}>
                                            {row.dateofjoin
                                                ? new Date(row.dateofjoin).toLocaleDateString("en-GB")
                                                : "-"}
                                        </TableCell>

                                        <TableCell sx={{
                                            minWidth: cellWidth,
                                            maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
                                            padding: windowWidth >= 2000 ? '4px' : '8px',
                                            fontSize: windowWidth >= 2000 ? '12px' : '14px'
                                        }}>
                                            {getProfileStatusText(row.profile_status)}
                                        </TableCell>

                                        <TableCell sx={{
                                            minWidth: cellWidth,
                                            maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
                                            padding: windowWidth >= 2000 ? '4px' : '8px',
                                            fontSize: windowWidth >= 2000 ? '12px' : '14px'
                                        }}>
                                            {row.matching_score}
                                        </TableCell>

                                        <TableCell sx={{
                                            minWidth: cellWidth,
                                            maxWidth: windowWidth >= 2000 ? cellWidth : 'none',
                                            padding: windowWidth >= 2000 ? '4px' : '8px',
                                            fontSize: windowWidth >= 2000 ? '12px' : '14px'
                                        }}>
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

                                        <TableCell sx={{
                                            minWidth: windowWidth >= 2000 ? '120px' : '200px',
                                            maxWidth: windowWidth >= 2000 ? '120px' : '300px',
                                            padding: windowWidth >= 2000 ? '4px' : '8px',
                                            fontSize: windowWidth >= 2000 ? '12px' : '14px',
                                            whiteSpace: "normal",
                                            overflow: 'hidden'
                                        }}>
                                            {row.action_log
                                                ?.split(",")
                                                .map((item: string, index: number, arr: string[]) => (
                                                    <React.Fragment key={index}>
                                                        <span style={{ fontSize: windowWidth >= 2000 ? '11px' : '13px' }}>
                                                            {item.trim()}
                                                        </span>
                                                        {index < arr.length - 1 && ","} {/* keep comma except last */}
                                                        <br />
                                                    </React.Fragment>
                                                ))}
                                        </TableCell>
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
            </div>
        </div>
    );
};