// import { useState, useEffect } from 'react';
// import {
//     Box, Button, Checkbox, CircularProgress, IconButton, Paper, Table, TableBody,
//     TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField,
//     Typography, Tooltip
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { MdVerified } from 'react-icons/md';
// import { GoUnverified } from 'react-icons/go';
// import { NotifyError, NotifySuccess } from '../../common/Toast/ToastMessage';
// import { MatchingEmailProfile, MatchingPrintProfile, MatchingWhatsappProfile, userMatchingProfiles, userMatchingProfilesFilterListMatch, userMatchingProfilesPrintProfile, userMatchingProfilesSendEmail, userMatchingProfilesWhatsapp } from '../../api/apiConfig';

// interface ActionScore {
//     score: number;
//     actions: any[];
// }


// interface UserMatchingProfilesProps {
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
//     verified: number;
//     action_score: ActionScore;
//     dateofjoin: string;
// }

// const columns = [
//     { id: "select", label: "Select" },
//     { id: 'profile_img', label: 'Image' },
//     { id: 'profile_id', label: 'Profile ID' },
//     { id: 'work_place', label: 'Work Place' },
//     { id: 'profile_name', label: 'Name' },
//     { id: 'profile_age', label: 'Age' },
//     { id: 'star', label: 'Star' },
//     { id: 'degree', label: 'Degree' },
//     { id: 'profession', label: 'Profession' },
//     { id: 'company_name', label: 'Company Name /Buisness Name' },
//     { id: 'designation', label: 'Designation /Nature of Buisness' },
//     { id: 'anual_income', label: 'Annual Income' },
//     { id: 'state', label: 'State' },
//     { id: 'city', label: 'City' },
//     { id: 'family_status', label: 'Family Status' },
//     { id: 'father_occupation', label: 'Father Business' },
//     { id: 'suya_gothram', label: 'Suya Gothram' },
//     { id: 'chevvai', label: 'Admin Chevvai' },
//     { id: 'raguketu', label: 'Admin Raghu/Kethu' },
//     { id: 'dateofjoin', label: 'Registration Date' },
//     { id: 'action_score', label: 'Action Score' },
// ];


// interface UserMatchingProfilesTableProps {
//     profileID: string | null;
//     filters: any;
//     onBack: () => void;
//     No_Image_Available: any;
//     profileType: 'matching' | 'suggested';
// }

// export const UserMatchingProfilesTable = ({ profileID, filters, onBack, No_Image_Available, profileType }: UserMatchingProfilesTableProps) => {
//     const navigate = useNavigate();
//     const [matchingData, setMatchingData] = useState<UserMatchingProfilesProps[]>([]);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [totalItems, setTotalItems] = useState(0);
//     const [currentPage, setCurrentPage] = useState<number>(0);
//     const [itemsPerPage, setItemsPerPage] = useState(10);
//     const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
//     const [selectedFormat, setSelectedFormat] = useState<string>("");
//     const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
//     const [printFormat, setPrintFormat] = useState<string>("");
//     const [isPrintProfile, setIsPrintProfile] = useState<boolean>(false);
//     const [whatsappFormat, setWhatsappFormat] = useState<string>("");
//     const [iswhatsappProfile, setIsWhatsappProfile] = useState<boolean>(false);
//     const [goToPageInput, setGoToPageInput] = useState<string>('');
//     const roleId = sessionStorage.getItem('role_id');

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
//         const fetchMatchingData = async () => {
//             if (!profileID) return;
//             setLoading(true);
//             try {
//                 let data;
//                 if (filters) {
//                     // Use filtered data with profileType
//                     data = await userMatchingProfilesFilterListMatch(
//                         String(profileID),
//                         currentPage + 1,
//                         itemsPerPage,
//                         filters.selectedComplexions,
//                         filters.selectedEducation,
//                         filters.selectedFieldsOfStudy, // Add this
//                         filters.selectedDegrees, // Add this
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
//                         profileType // Pass the profileType here
//                     );
//                 } else {
//                     // You might need to create separate functions for default data
//                     // For now, using the same function with empty filters
//                     data = await userMatchingProfilesFilterListMatch(
//                         String(profileID),
//                         currentPage + 1,
//                         itemsPerPage,
//                         "", "", "", "", 0, 0, 0, 0, "", 0, 0, 0, "", 0, 0, "", "", "", "", "", "", "", "", "", "", "", profileType
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
//     }, [profileID, currentPage, itemsPerPage, filters, profileType]);

//     const handleChangePage = (_event: unknown, newPage: number) => {
//         setCurrentPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setItemsPerPage(parseInt(event.target.value, 10));
//         setCurrentPage(0);
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

//             // Construct the API URL with parameters
//             const apiUrl = `https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/admin-match-pdf-with-format/`; // Your API endpoint
//             const params = new URLSearchParams({
//                 pdf_format: printFormat,
//                 profile_ids: selectedProfiles.join(","),
//                 profile_to: String(profileID)
//             });

//             // Open the API URL in a new tab
//             const newWindow = window.open(`${apiUrl}?${params.toString()}`, '_blank');

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
//             NotifyError("Please select at least one profile to print profile");
//             return;
//         }
//         if (!printFormat) {
//             NotifyError("Please select a Print format");
//             return;
//         }
//         try {
//             setIsPrintProfile(true);

//             // Construct the API URL with parameters
//             const apiUrl = `https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/admin-match-pdf-with-format/`; // Your API endpoint
//             const params = new URLSearchParams({
//                 pdf_format: printFormat,
//                 profile_ids: selectedProfiles.join(","),
//                 profile_to: String(profileID)
//             });

//             // Open the API URL in a new tab
//             const newWindow = window.open(`${apiUrl}?${params.toString()}`, '_blank');

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


//     const handleSendEmail = async () => {
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

//             // Construct the API URL with parameters
//             const apiUrl = `https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/admin-match-pdf-with-format/`; // Your API endpoint
//             const params = new URLSearchParams({
//                 pdf_format: printFormat,
//                 profile_ids: selectedProfiles.join(","),
//                 profile_to: String(profileID)
//             });

//             // Open the API URL in a new tab
//             const newWindow = window.open(`${apiUrl}?${params.toString()}`, '_blank');

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


//     const handleGoToPage = () => {
//         const pageNumber = parseInt(goToPageInput, 10);
//         if (!isNaN(pageNumber)) {
//             const lastPage = Math.ceil(totalItems / itemsPerPage) - 1;
//             const newPage = Math.max(0, Math.min(pageNumber - 1, lastPage));
//             setCurrentPage(newPage);
//             setGoToPageInput('');
//         }
//     };

//     // if (loading) {
//     //     return <div className="flex items-center justify-center h-screen w-full"> <CircularProgress /></div>;
//     // }


//     return (
//         <div className="container mx-auto p-4">
//             {/* <Button
//                 variant="contained"
//                 onClick={onBack}
//                 sx={{ mb: 2 }}
//             >
//                 Back to Filters
//             </Button> */}

//             <div className="flex items-center justify-end space-x-10">
//                 {/* Print Profile */}
//                 <div>
//                     <div>
//                         <p className="text-sm text-black font-semibold">Print Profile</p>
//                     </div>
//                     <div>
//                         <div className="flex items-center space-x-2">
//                             <div>
//                                 <select
//                                     name="printFormat"
//                                     id="printFormat"
//                                     value={printFormat}
//                                     onChange={(e) => setPrintFormat(e.target.value)}
//                                     disabled={isPrintProfile}
//                                     className="text-sm border-[1px] border-black rounded-md px-2 py-0.5 focus-within:outline-none"
//                                 >
//                                     <option value="">Choose Format</option>
//                                     {/* <option value="fullprofile">Full Profile</option>
//                                     <option value="withoutaddress">Without Address</option>
//                                     <option value="shortprofile">Short Profile</option>
//                                     <option value="p4">Intimation</option> */}
//                                     <option value="match_full_profile">Full Profile</option>
//                                     <option value="match_full_profile_black">Full profile black</option>
//                                     <option value="match_compatability_color">Color</option>
//                                     <option value="match_compatability_black">Black</option>
//                                     <option value="match_compatability_without_horo">Without Horoscope</option>
//                                     <option value="match_compatability_without_horo_black">Without Horoscope Black</option>
//                                     {/* <option value="match_profile_action">Action</option> */}
//                                 </select>
//                             </div>
//                             <div>
//                                 <button
//                                     onClick={handlePrintProfile}
//                                     disabled={isPrintProfile}
//                                     className={`bg-amber-500 text-white rounded-md px-3 py-0.5 ${isPrintProfile ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                 >
//                                     {isPrintProfile ? 'Moving to Print...' : 'Move to print'}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Whatsapp */}
//                 <div>
//                     <div>
//                         <p className="text-sm text-black font-semibold">Whatsapp</p>
//                     </div>
//                     <div>
//                         <div className="flex items-center space-x-2">
//                             <div>
//                                 <select
//                                     name="whatsappFormat"
//                                     id="whatsappFormat"
//                                     value={whatsappFormat}
//                                     onChange={(e) => setWhatsappFormat(e.target.value)}
//                                     disabled={iswhatsappProfile}
//                                     className="text-sm border-[1px] border-black rounded-md px-2 py-1 focus-within:outline-none"
//                                 >
//                                     <option value="">Choose Format</option>
//                                     {/* <option value="fullprofile">Full Profile</option>
//                                     <option value="withoutaddress">Without Address</option>
//                                     <option value="shortprofile">Short Profile</option>
//                                     <option value="w5">Intimation</option> */}
//                                     <option value="match_full_profile">Full Profile</option>
//                                     <option value="match_full_profile_black">Full profile black</option>
//                                     <option value="match_compatability_color">Color</option>
//                                     <option value="match_compatability_black">Black</option>
//                                     <option value="match_compatability_without_horo">Without Horoscope</option>
//                                     <option value="match_compatability_without_horo_black">Without Horoscope Black</option>
//                                     {/* <option value="match_profile_action">Action</option> */}
//                                 </select>
//                             </div>
//                             <div>
//                                 <button
//                                     onClick={handleProfileWhatsapp}
//                                     disabled={iswhatsappProfile}
//                                     className={`bg-green-500 text-white rounded-md px-3 py-0.5 ${iswhatsappProfile ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                 >
//                                     {iswhatsappProfile ? 'Viewing...' : 'View'}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Email */}
//                 <div>
//                     <div>
//                         <p className="text-sm text-black font-semibold">Send Email</p>
//                     </div>
//                     <div>
//                         <div className="flex items-center space-x-2">
//                             <div>
//                                 <select
//                                     name="selectedFormat"
//                                     id="selectedFormat"
//                                     value={selectedFormat}
//                                     onChange={(e) => setSelectedFormat(e.target.value)}
//                                     disabled={isSendingEmail}
//                                     className="text-sm border-[1px] border-black rounded-md px-2 py-1 focus-within:outline-none"
//                                 >
//                                     <option value="">Choose Format</option>
//                                     {/* <option value="fullprofile">Full Profile</option>
//                                     <option value="withoutaddress">Without Address</option>
//                                     <option value="shortprofile">Short Profile</option>
//                                     <option value="w5">Intimation</option> */}
//                                     <option value="match_full_profile">Full Profile</option>
//                                     <option value="match_full_profile_black">Full profile black</option>
//                                     <option value="match_compatability_color">Color</option>
//                                     <option value="match_compatability_black">Black</option>
//                                     <option value="match_compatability_without_horo">Without Horoscope</option>
//                                     <option value="match_compatability_without_horo_black">Without Horoscope Black</option>
//                                     {/* <option value="match_profile_action">Action</option> */}
//                                 </select>
//                             </div>
//                             <div>
//                                 <button
//                                     onClick={handleSendEmail}
//                                     disabled={isSendingEmail}
//                                     className={`bg-blue-500 text-white rounded-md px-3 py-0.5 ${isSendingEmail ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                 >
//                                     {isSendingEmail ? 'Sending...' : 'Send'}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="py-4">
//                 <Paper className="w-full">
//                     <TableContainer sx={{ border: '1px solid #E0E0E0' }} component={Paper}>
//                         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                             <TableHead style={{ background: '#FFF9C9', padding: '17px' }}>
//                                 <TableRow>
//                                     {columns.map((column) => (
//                                         <TableCell
//                                             key={column.id}
//                                             sx={{
//                                                 borderBottom: "1px solid #E0E0E0",
//                                                 color: "#ee3448",
//                                                 fontWeight: "bold",
//                                                 fontSize: "1rem",
//                                                 whiteSpace: "nowrap",
//                                             }}
//                                         >
//                                             {column.id === "select" ? (
//                                                 <Checkbox
//                                                     color="primary"
//                                                     checked={selectedProfiles.length === matchingData.length}
//                                                     indeterminate={
//                                                         selectedProfiles.length > 0 &&
//                                                         selectedProfiles.length < matchingData.length
//                                                     }
//                                                     onChange={handleSelectAll}
//                                                 />
//                                             ) : (
//                                                 column.label
//                                             )}
//                                         </TableCell>
//                                     ))}
//                                 </TableRow>
//                             </TableHead>

//                             <TableBody>
//                                 {loading ? (
//                                     <TableRow>
//                                         <TableCell colSpan={columns.length} sx={{ textAlign: "center", py: 3 }}>
//                                             <CircularProgress />
//                                         </TableCell>
//                                     </TableRow>
//                                 ) : matchingData && matchingData.length > 0 ? (
//                                     matchingData.map((row) => (
//                                         <TableRow
//                                             key={row.profile_id}
//                                             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                                         >
//                                             <TableCell>
//                                                 <Checkbox
//                                                     color="primary"
//                                                     checked={selectedProfiles.includes(row.profile_id)}
//                                                     onChange={() => handleCheckboxChange(row.profile_id)}
//                                                 />
//                                             </TableCell>

//                                             <TableCell>
//                                                 <img
//                                                     className="rounded-full"
//                                                     src={row.profile_img || No_Image_Available}
//                                                     alt="Profile"
//                                                     width={50}
//                                                     height={50}
//                                                     onError={(e) => (e.currentTarget.src = No_Image_Available)}
//                                                 />
//                                             </TableCell>
//                                             <TableCell
//                                                 onClick={() =>
//                                                     navigate(
//                                                         `/viewProfile?profileId=${row.profile_id}`,
//                                                     )
//                                                 }
//                                                 sx={{
//                                                     color: 'blue',
//                                                     cursor: 'pointer',
//                                                     textDecoration: 'none',
//                                                     '&:hover': { textDecoration: 'underline' }
//                                                 }}
//                                             >
//                                                 {row.profile_id}
//                                             </TableCell>
//                                             <TableCell>{row.work_place}</TableCell>
//                                             <TableCell>{row.profile_name}</TableCell>
//                                             <TableCell>{row.profile_age}</TableCell>
//                                             <TableCell>{row.star}</TableCell>
//                                             <TableCell>{row.degree}</TableCell>
//                                             <TableCell>{row.profession}</TableCell>
//                                             <TableCell>{row.company_name}</TableCell>
//                                             <TableCell>{row.designation}</TableCell>
//                                             <TableCell>{row.anual_income}</TableCell>
//                                             <TableCell>{row.state}</TableCell>
//                                             <TableCell>{row.city}</TableCell>
//                                             <TableCell>{row.family_status}</TableCell>
//                                             <TableCell>{row.father_occupation}</TableCell>
//                                             <TableCell>{row.suya_gothram}</TableCell>
//                                             <TableCell>{row.chevvai}</TableCell>
//                                             <TableCell>{row.raguketu}</TableCell>
//                                             {/* <TableCell>{row.dateofjoin ? new Date(row.dateofjoin).toLocaleDateString() : "-"}</TableCell> */}
//                                             <TableCell>  {row.dateofjoin
//                                                 ? new Date(row.dateofjoin).toLocaleDateString("en-GB")
//                                                 : "-"}</TableCell>
//                                             {/* <TableCell>{row.action_score?.score ?? "-"}</TableCell> */}
//                                             <TableCell>
//                                                 <Tooltip
//                                                     title={
//                                                         <div style={{ whiteSpace: 'pre-line' }}>
//                                                             {formatActionsForTooltip(row.action_score?.actions || [])}
//                                                         </div>
//                                                     }
//                                                     arrow
//                                                     placement="top"
//                                                 >
//                                                     <span>{row.action_score?.score ?? "-"}</span>
//                                                 </Tooltip>
//                                             </TableCell>
//                                             {/* <TableCell>
//                                                 {row.verified === 0 ? (
//                                                     <MdVerified className="text-green-600" />
//                                                 ) : (
//                                                     <GoUnverified className="text-red-600" />
//                                                 )}
//                                             </TableCell> */}
//                                         </TableRow>
//                                     ))
//                                 ) : (
//                                     <TableRow>
//                                         <TableCell colSpan={columns.length} sx={{ textAlign: 'center' }}>
//                                             No Matching Records found.
//                                         </TableCell>
//                                     </TableRow>
//                                 )}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </Paper>
//             </div>

//             {Math.ceil(totalItems / itemsPerPage) > 0 && (
//                 <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
//                     <div className="text-sm text-gray-600">
//                         Showing {currentPage * itemsPerPage + 1} to {Math.min((currentPage + 1) * itemsPerPage, totalItems)} of {totalItems} records
//                     </div>

//                     <div className="flex items-center gap-2">
//                         <div className="flex items-center gap-2">
//                             <Typography variant="body2">Go to page:</Typography>
//                             <TextField
//                                 size="small"
//                                 type="number"
//                                 value={goToPageInput}
//                                 onChange={(e) => setGoToPageInput(e.target.value)}
//                                 inputProps={{
//                                     min: 1,
//                                     max: Math.ceil(totalItems / itemsPerPage),
//                                 }}
//                                 style={{ width: '80px' }}
//                                 onKeyPress={(e) => e.key === 'Enter' && handleGoToPage()}
//                             />
//                             <Button
//                                 variant="contained"
//                                 size="small"
//                                 onClick={handleGoToPage}
//                                 disabled={!goToPageInput}
//                             >
//                                 Go
//                             </Button>
//                         </div>

//                         <IconButton
//                             onClick={() => setCurrentPage(0)}
//                             disabled={currentPage === 0}
//                             aria-label="first page"
//                         >
//                             {"<<"}
//                         </IconButton>

//                         <IconButton
//                             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
//                             disabled={currentPage === 0}
//                             aria-label="previous page"
//                         >
//                             {"<"}
//                         </IconButton>

//                         {(() => {
//                             const totalPages = Math.ceil(totalItems / itemsPerPage);
//                             const maxVisiblePages = 5;
//                             let startPage, endPage;

//                             if (totalPages <= maxVisiblePages) {
//                                 startPage = 0;
//                                 endPage = totalPages - 1;
//                             } else {
//                                 const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
//                                 const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;

//                                 if (currentPage < maxPagesBeforeCurrent) {
//                                     startPage = 0;
//                                     endPage = maxVisiblePages - 1;
//                                 } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
//                                     startPage = totalPages - maxVisiblePages;
//                                     endPage = totalPages - 1;
//                                 } else {
//                                     startPage = currentPage - maxPagesBeforeCurrent;
//                                     endPage = currentPage + maxPagesAfterCurrent;
//                                 }
//                             }

//                             const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

//                             return (
//                                 <div className="flex">
//                                     {pages.map((page) => (
//                                         <Button
//                                             key={page}
//                                             variant={currentPage === page ? "contained" : "text"}
//                                             onClick={() => setCurrentPage(page)}
//                                             style={{
//                                                 minWidth: '32px',
//                                                 height: '32px',
//                                                 margin: '0 2px',
//                                                 backgroundColor: currentPage === page ? '#1976d2' : 'transparent',
//                                                 color: currentPage === page ? '#fff' : '#000',
//                                             }}
//                                         >
//                                             {page + 1}
//                                         </Button>
//                                     ))}
//                                 </div>
//                             );
//                         })()}

//                         <IconButton
//                             onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalItems / itemsPerPage) - 1))}
//                             disabled={currentPage >= Math.ceil(totalItems / itemsPerPage) - 1}
//                             aria-label="next page"
//                         >
//                             {">"}
//                         </IconButton>

//                         <IconButton
//                             onClick={() => setCurrentPage(Math.ceil(totalItems / itemsPerPage) - 1)}
//                             disabled={currentPage >= Math.ceil(totalItems / itemsPerPage) - 1}
//                             aria-label="last page"
//                         >
//                             {">>"}
//                         </IconButton>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

import { useState, useEffect } from 'react';
import {
    Box, Button, Checkbox, CircularProgress, IconButton, Paper, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, TextField,
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

interface UserMatchingProfilesTableProps {
    profileID: string | null;
    filters: any;
    onBack: () => void;
    profileType: 'matching' | 'suggested';
}

export const UserMatchingProfilesTable = ({ profileID, filters, onBack, profileType }: UserMatchingProfilesTableProps) => {
    const navigate = useNavigate();
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

    useEffect(() => {
        const fetchMatchingData = async () => {
            if (!profileID) return;
            setLoading(true);
            try {
                let data;
                // Set a large number for items per page to get all data
                const largePageSize = 10000;

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
                        filters.prefPoruthamStarRasi,
                        filters.fromDateOfJoin,
                        filters.toDateOfJoin,
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
                        "", "", "", "", 0, 0, 0, 0, "", 0, 0, 0, "", 0, 0, "", "", "", "", "", "", "", "", "", "", "", profileType,
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
            const apiUrl = `https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/admin-match-pdf-with-format/?action_type=print`;

            const params = new URLSearchParams({
                pdf_format: printFormat,
                profile_ids: selectedProfiles.join(","),
                profile_to: String(profileID)
            });

            const newWindow = window.open(`${apiUrl}&${params.toString()}`, '_blank');

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
            NotifyError("Please select at least one profile to send via WhatsApp");
            return;
        }
        if (!whatsappFormat) {
            NotifyError("Please select a WhatsApp format");
            return;
        }
        try {
            setIsWhatsappProfile(true);
            const apiUrl = `https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/admin-match-pdf-with-format/?action_type=whatsapp`;

            const params = new URLSearchParams({
                pdf_format: whatsappFormat,
                profile_ids: selectedProfiles.join(","),
                profile_to: String(profileID)
            });

            const newWindow = window.open(`${apiUrl}&${params.toString()}`, '_blank');

            if (newWindow) {
                newWindow.focus();
                NotifySuccess("Profiles sent via WhatsApp successfully");
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

            const apiUrl = `https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/admin-match-pdf-with-format/`;

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
                <div className="mb-4 bg-gray-50 rounded-lg">
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
                                <CircularProgress size={16} />
                            ) : (
                                "Send Selected"
                            )}
                        </button>
                    </div>
                </div>

                {/* Search */}
                <div className="flex items-end gap-2 ml-auto w-100 ">
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
                    {/* <button
                        onClick={handleSearch}
                        className="px-3 py-0.5 text-white border bg-[#1976D2] whitespace-nowrap rounded"
                    >
                        Search
                    </button> */}
                </div>
            </div>
            <div className="flex justify-between items-center mt-4 px-4 py-2 bg-gray-50 ">
                <div className="text-sm text-gray-600">
                    Showing {totalItems} records
                </div>
            </div>
            <div className="py-4">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                        <TableHead style={{ background: '#FFF8B3', padding: '17px' }}>
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
                                            backgroundColor: "#FFF8B3", // Keep sticky header background
                                        }}
                                    >
                                        {column.id === "select" ? (
                                            <Checkbox
                                                color="primary"
                                                checked={matchingData.length > 0 && selectedProfiles.length === matchingData.length}
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
                                                src={row.profile_img || BASE64_PLACEHOLDER}
                                                alt="Profile"
                                                width={50}
                                                height={50}
                                                onError={(e) => {
                                                    e.currentTarget.src = BASE64_PLACEHOLDER;
                                                }}
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

                                        <TableCell>  {row.dateofjoin
                                            ? new Date(row.dateofjoin).toLocaleDateString("en-GB")
                                            : "-"}</TableCell>
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
                                        <TableCell>
                                            <Tooltip
                                                title={
                                                    <div style={{ whiteSpace: 'pre-line' }}>
                                                        {formatActionsForTooltip(row.action_log?.actions || [])}
                                                    </div>
                                                }
                                                arrow
                                                placement="top"
                                            >
                                                <span>{row.action_log?.score ?? "-"}</span>
                                            </Tooltip>
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