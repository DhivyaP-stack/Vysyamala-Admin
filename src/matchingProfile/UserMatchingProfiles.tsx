// // import { useEffect, useState } from 'react';
// // import { Box, Button, Checkbox, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
// // import { userAnnualIncome, userCity, userComplexion, userEducation, userFamilyStatus, userMaritalStatus, userMatchingProfiles, userMatchingProfilesFilter, userMatchingProfilesFilterListMatch, userMatchingProfilesPrintProfile, userMatchingProfilesSendEmail, userMatchingProfilesWhatsapp, userMembership, userProfession, userState } from '../api/apiConfig';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import { NotifyError, NotifySuccess } from '../common/Toast/ToastMessage';
// // import { MdVerified } from 'react-icons/md';
// // import { GoUnverified } from 'react-icons/go';
// // import No_Image_Available from '../images/No_Image_Available .jpg';
// // import MatchingStars from '../components/PartnerPreference/MatchingStars';
// // import { useQuery } from '@tanstack/react-query';
// // import { fetchEditProfileDetails, fetchMatchPreferences } from '../action';
// // import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

// // // Type for Annual Income
// // interface AnnualIncome {
// //     income_id: number;
// //     income_description: string;
// // }
// // // Type for Profression
// // interface Profession {
// //     Profes_Pref_id: number;
// //     Profes_name: string;
// // }
// // // Type for MaritalStatus
// // interface MaritalStatus {
// //     marital_sts_id: number;
// //     marital_sts_name: string;
// // }
// // // Type for HighestEducation
// // interface HighestEducation {
// //     education_id: number;
// //     education_description: string;
// // }
// // // Type for State
// // interface State {
// //     State_Pref_id: number;
// //     State_name: string;
// // }
// // // Type for City
// // interface City {
// //     id: number;
// //     district: string;
// // }
// // // Type for Complexion
// // interface Complexion {
// //     complexion_id: number;
// //     complexion_description: string;
// // }

// // // Type for Membership
// // interface Membership {
// //     id: number;
// //     plan_name: string;
// //     plan_price: string;
// // }

// // // Type for FamilyStatus
// // interface FamilyStatus {
// //     family_status_id: number;
// //     family_status_name: string;
// //     family_status_description: string;
// // }

// // interface UserMatchingProfilesProps {
// //     action_score: any;
// //     profile_id: string;
// //     profile_name: string;
// //     profile_img: string;
// //     profile_age: number;
// //     profile_gender: string;
// //     height: string;
// //     weight: string;
// //     degree: string;
// //     profession: string;
// //     star: string;
// //     location: number;
// //     photo_protection: number;
// //     matching_score: number;
// //     wish_list: number;
// //     verified: number;
// // }
// // export interface SelectedStarIdItem {
// //     id: string;
// //     rasi: string;
// //     star: string;
// //     label: string;
// // }

// // interface HoroscopeDetails {
// //     birth_rasi_name: string;
// //     birthstar_name: string
// // }
// // interface gender {
// //     "Gender": string,
// // }


// // const columns = [
// //     { id: "select", label: "Select" }, // Added for the checkbox column
// //     { id: 'profile_img', label: 'Image' },
// //     { id: 'profile_id', label: 'Profile ID' },
// //     { id: 'profile_name', label: 'Name' },
// //     { id: 'profile_age', label: 'Age' },
// //     { id: 'profile_gender', label: 'Gender' },
// //     { id: 'height', label: 'Height' },
// //     { id: 'weight', label: 'Weight' },
// //     { id: 'degree', label: 'Degree' },
// //     { id: 'profession', label: 'Profession' },
// //     { id: 'location', label: 'Location' },
// //     { id: 'star', label: 'Star' },
// //     { id: 'matching_score', label: 'Matching Score' },
// //     { id: 'action_score', label: 'Action Score' },
// //     { id: 'verified', label: 'Verified' },
// // ];

// // export const UserMatchingProfiles = () => {

// //     const location = useLocation();
// //     const query = new URLSearchParams(location.search);
// //     const profileID = query.get('profileId');
// //     const navigate = useNavigate();
// //     const [matchingData, setMatchingData] = useState<UserMatchingProfilesProps[]>([]);
// //     console.log("01m", matchingData)
// //     const [annualIncome, setAnnualIncome] = useState<AnnualIncome[]>([]);
// //     const [profession, setProfession] = useState<Profession[]>([]);
// //     const [maritalStatus, setMaritalStatus] = useState<MaritalStatus[]>([]);
// //     const [highestEducation, setHighestEducation] = useState<HighestEducation[]>([]);
// //     const [state, setState] = useState<State[]>([]);
// //     const [cities, setCities] = useState<City[]>([]);
// //     const [selectedState, setSelectedState] = useState<string>(''); // Track selected state
// //     const [complexion, setComplexion] = useState<Complexion[]>([]);
// //     console.log("complexion", complexion)
// //     const [membership, setMembership] = useState<Membership[]>([]);
// //     const [familyStatus, setFamilyStatus] = useState<FamilyStatus[]>([]);
// //     const [loading, setLoading] = useState<boolean>(false);
// //     const [totalItems, setTotalItems] = useState(0);
// //     // Pagination state
// //     const [currentPage, setCurrentPage] = useState<number>(0); // Material UI pagination starts from 0
// //     const [itemsPerPage, setItemsPerPage] = useState(10);
// //     //selected stars
// //     const [selectedStarIds, setSelectedStarIds] = useState<SelectedStarIdItem[]>([]);
// //     console.log("selectedStarIds", selectedStarIds)
// //     const [selectedComplexions, setSelectedComplexions] = useState<String[]>([]);
// //     console.log("selectedComplexions", selectedComplexions)
// //     const [selectedEducation, setSelectedEducation] = useState<String[]>([]);
// //     console.log("selectedEducation", selectedEducation)
// //     const [heightFrom, setHeightFrom] = useState<string>(''); // Store the height from value
// //     const [heightTo, setHeightTo] = useState<string>('');
// //     const [minAnnualIncome, setMinAnnualIncome] = useState<string>(''); // To hold the selected min income
// //     const [maxAnnualIncome, setMaxAnnualIncome] = useState<string>(''); // To hold the selected max income
// //     const [foreignInterest, setForeignInterest] = useState<string>('');
// //     console.log("foreignInterest", foreignInterest)
// //     const [selectedCity, setSelectedCity] = useState<string>('')
// //     const [selectedMembership, setSelectedMenbership] = useState<String[]>([]);
// //     const [hasphotos, setHasPhotos] = useState<string>('');
// //     const [edit3, setEdit3] = useState<HoroscopeDetails>()
// //     const [edit0, setEdit0] = useState<gender>()
// //     // Add this near your other state declarations
// //     const [selectedFormat, setSelectedFormat] = useState<string>("");; // Default value
// //     const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
// //     //Print Profile
// //     const [printFormat, setPrintFormat] = useState<string>(""); // Default format
// //     const [isPrintProfile, setIsPrintProfile] = useState<boolean>(false);
// //     //Whatsapp
// //     const [whatsappFormat, setWhatsappFormat] = useState<string>(""); // Default format
// //     const [iswhatsappProfile, setIsWhatsappProfile] = useState<boolean>(false);
// //     const roleId = sessionStorage.getItem('role_id');

// //     useEffect(() => {
// //         const fetchMatchingData = async () => {
// //             if (!profileID) return;
// //             setLoading(true); // Set loading to true before fetching
// //             try {

// //                 const annualIncomeData = await userAnnualIncome();

// //                 const profession = await userProfession();

// //                 const maritalStatus = await userMaritalStatus();

// //                 const education = await userEducation();

// //                 const state = await userState();

// //                 const city = await userCity();

// //                 const complexion = await userComplexion();

// //                 const membership = await userMembership();

// //                 const familyStatus = await userFamilyStatus();

// //                 const data = await userMatchingProfiles(String(profileID), currentPage + 1, itemsPerPage); // API page starts from 1

// //                 // Convert the object response to an array
// //                 const incomeArray: AnnualIncome[] = Object.values(annualIncomeData);
// //                 const professionArray: Profession[] = Object.values(profession);
// //                 const maritalStatusArray: MaritalStatus[] = Object.values(maritalStatus);
// //                 const educationArray: HighestEducation[] = Object.values(education);
// //                 const stateArray: State[] = Object.values(state);
// //                 const cityArray: City[] = Object.values(city);
// //                 const complexionArray: Complexion[] = Object.values(complexion);
// //                 const familyStatusArray: FamilyStatus[] = Object.values(familyStatus);
// //                 // setMatchingStarsData(matchingStars);
// //                 setAnnualIncome(incomeArray);
// //                 setProfession(professionArray);
// //                 setMaritalStatus(maritalStatusArray);
// //                 setHighestEducation(educationArray);
// //                 setState(stateArray);
// //                 setCities(cityArray);
// //                 setComplexion(complexionArray);
// //                 setMembership(membership.data);
// //                 setFamilyStatus(familyStatusArray);
// //                 //console.log("MatchingStars ", matchingStars);
// //                 console.log("Annual Income Data:", incomeArray);
// //                 console.log("Profession Data:", professionArray);
// //                 console.log("Marital Status Data:", maritalStatusArray);
// //                 console.log("Highest Education Data:", educationArray);
// //                 console.log("State Data:", stateArray);
// //                 console.log("Complexion Data:", complexionArray);
// //                 console.log("FamilyStatus Data:", familyStatusArray);
// //                 setMatchingData(data.profiles || []); // Fallback to an empty array if data is null
// //                 setTotalItems(data.total_count || 0);
// //                 console.log("Fetched Matching Profiles data log:", data);
// //                 console.log("Fetched Matching Profiles List pagination count data log :", data.total_count);
// //             } catch (error: any) {
// //                 // setError(error.message || 'Failed to fetch matching profiles');
// //                 NotifyError(error.message);
// //             } finally {
// //                 setLoading(false); // Ensure loading is false after fetching
// //             }
// //         };

// //         fetchMatchingData();
// //     }, [profileID, currentPage, itemsPerPage]); // Include profileID as a dependency

// //     const { data: EditData } = useQuery({
// //         queryKey: [profileID, 'editData'],
// //         queryFn: () => fetchEditProfileDetails(profileID),
// //         enabled: !!profileID,
// //     });
// //     console.log("EditData", EditData)

// //     console.log(EditData)
// //     useEffect(() => {
// //         if (EditData && EditData.length > 0) {
// //             setEdit3(EditData[3] as HoroscopeDetails);
// //             setEdit0(EditData[0] as gender);
// //         }
// //     }, [EditData]);

// //     const rasiId: string = edit3?.birth_rasi_name as string;
// //     console.log(rasiId, "rasiId")
// //     const starId: string = edit3?.birthstar_name as string;
// //     console.log("starId", starId)
// //     const gender: string = edit0?.Gender as string;
// //     console.log("gender", gender)

// //     const { data: matchStars } = useQuery({
// //         queryKey: ['matchStars'],
// //         queryFn: () => fetchMatchPreferences(rasiId, starId, gender),
// //         enabled: !!rasiId && !!gender && !!starId,
// //     });
// //     // Handle page change
// //     const handleChangePage = (_event: unknown, newPage: number) => {
// //         setCurrentPage(newPage);
// //     };
// //     // Handle rows per page change
// //     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
// //         setItemsPerPage(parseInt(event.target.value, 10));
// //         setCurrentPage(0); // Reset to first page when changing items per page
// //     };
// //     const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
// //     // Function to handle selecting/deselecting a single checkbox
// //     const handleCheckboxChange = (profileId: string) => {
// //         setSelectedProfiles((prevSelected) => {
// //             const isSelected = prevSelected.includes(profileId);
// //             console.log(`Clicked profile ID: ${profileId}, Selected: ${!isSelected}`);
// //             return isSelected
// //                 ? prevSelected.filter((id) => id !== profileId) // Remove if already selected
// //                 : [...prevSelected, profileId]; // Add if not selected
// //         });
// //     };
// //     // Function to handle "Select All" checkbox
// //     const handleSelectAll = () => {
// //         setSelectedProfiles((prevSelected) => {
// //             if (prevSelected.length === matchingData.length) {
// //                 console.log("Deselecting all profiles");
// //                 return [];
// //             } else {
// //                 console.log("Selecting all profiles");
// //                 return matchingData.map((profile) => profile.profile_id);
// //             }
// //         });
// //     };
// //     const handleCheckboxMatchingStars = (updatedIds: SelectedStarIdItem[]) => {
// //         setSelectedStarIds(updatedIds);
// //     };
// //     // Function to handle checkbox change
// //     const handleComplexionChange = (complexionId: String) => {
// //         setSelectedComplexions(prev =>
// //             prev.includes(complexionId)
// //                 // If the complexion is already selected, remove it from the array
// //                 ? prev.filter(id => id !== complexionId)
// //                 // Otherwise, add it to the array
// //                 : [...prev, complexionId]
// //         );
// //     };
// //     // Function to handle checkbox change
// //     const handleEducationChange = (EducationID: String) => {
// //         setSelectedEducation(prev =>
// //             prev.includes(EducationID)
// //                 // If the education is already selected, remove it from the array
// //                 ? prev.filter(id => id !== EducationID)
// //                 // Otherwise, add it to the array
// //                 : [...prev, EducationID]
// //         );
// //     };
// //     // Function to handle checkbox change
// //     const handleMembershipChange = (MembershipID: String) => {
// //         setSelectedMenbership(prev =>
// //             prev.includes(MembershipID)
// //                 // If the membership is already selected, remove it from the array
// //                 ? prev.filter(id => id !== MembershipID)
// //                 // Otherwise, add it to the array
// //                 : [...prev, MembershipID]
// //         );
// //     };
// //     // Function to handle form submission
// //     const handleFilterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
// //         event.preventDefault(); // Prevent the default form submission behavior
// //         try {
// //             setLoading(true);
// //             // Extract dest_rasi_id from selectedStarIds
// //             const destRasiIds = selectedStarIds.map((item) => item.star);
// //             const MatchingprofileFilter = await userMatchingProfilesFilterListMatch(String(profileID), currentPage + 1, itemsPerPage, String(selectedComplexions), String(selectedEducation), heightFrom, heightTo, minAnnualIncome, maxAnnualIncome, foreignInterest, selectedState, selectedCity, String(selectedMembership), hasphotos, destRasiIds.join(",") // Pass dest_rasi_id as a comma-separated string
// //             );
// //             setMatchingData(MatchingprofileFilter.profiles || []);
// //             setTotalItems(MatchingprofileFilter.total_count || 0);
// //             console.log("MatchingprofileFilter", MatchingprofileFilter)
// //         } catch (error: any) {
// //             NotifyError(error.message);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };
// //     //Sending Email functionalities
// //     const handleSendEmail = async () => {
// //         if (selectedProfiles.length === 0) {
// //             NotifyError("Please select at least one profile to send email");
// //             return;
// //         }
// //         if (!selectedFormat) {
// //             NotifyError("Please select an email format");
// //             return;
// //         }
// //         try {
// //             setIsSendingEmail(true);
// //             const response = await userMatchingProfilesSendEmail(
// //                 selectedFormat, // Dynamic format from state
// //                 String(selectedProfiles),        // Static sender profile ID
// //                 String(profileID),         // Static recipient profile ID
// //                 String(roleId),
// //             );
// //             console.log("Email sent successfully:", response);
// //             NotifySuccess("Email sent successfully!");

// //         } catch (error: any) {
// //             console.error("Failed to send email:", error);
// //             NotifyError(error.message || "Failed to send email");
// //         } finally {
// //             setIsSendingEmail(false);
// //         }
// //     };
// //     //Print Profile
// //     const handlePrintProfile = async () => {
// //         if (selectedProfiles.length === 0) {
// //             NotifyError("Please select at least one profile to print profile");
// //             return;
// //         }
// //         if (!printFormat) {
// //             NotifyError("Please select an Print format");
// //             return;
// //         }
// //         try {
// //             setIsPrintProfile(true);
// //             const response = await userMatchingProfilesPrintProfile(
// //                 printFormat,
// //                 String(selectedProfiles),
// //                 String(profileID),
// //                 String(roleId),
// //             );
// //             console.log("Profile Printed successfully:", response);
// //             // Check if the response contains PDF data (Blob)
// //             if (response instanceof Blob) {
// //                 // Create a URL for the blob
// //                 const url = window.URL.createObjectURL(response);
// //                 // Create a temporary anchor element to trigger download
// //                 const a = document.createElement('a');
// //                 a.href = url;
// //                 a.download = `profile_${profileID}_print.pdf`; // Set the filename
// //                 document.body.appendChild(a);
// //                 a.click();
// //                 // Clean up
// //                 window.URL.revokeObjectURL(url);
// //                 document.body.removeChild(a);
// //                 NotifySuccess("Profile download started successfully!");
// //             } else {
// //                 // Handle case where response isn't a Blob (shouldn't happen if API is correct)
// //                 console.warn("Unexpected response format:", response);
// //                 NotifySuccess("Profile Printed successfully!");
// //             }
// //         } catch (error: any) {
// //             console.error("Failed to Print Profile:", error);
// //             NotifyError(error.message || "Failed to Print Profile");
// //         } finally {
// //             setIsPrintProfile(false);
// //         }
// //     };
// //     //View functionalities
// //     const handleProfileWhatsapp = async () => {
// //         if (selectedProfiles.length === 0) {
// //             NotifyError("Please select at least one profile to print profile");
// //             return;
// //         }
// //         if (!whatsappFormat) {
// //             NotifyError("Please select an Whatsapp format");
// //             return;
// //         }
// //         try {
// //             setIsWhatsappProfile(true);
// //             const response = await userMatchingProfilesWhatsapp(
// //                 whatsappFormat,// Dynamic format from state
// //                 String(selectedProfiles),// Static sender profile ID
// //                 String(profileID),// Static recipient profile ID
// //                 "whatsapp",
// //                 String(roleId),
// //             );
// //             // Check if the response contains PDF data (Blob)
// //             if (response instanceof Blob) {
// //                 // Create a URL for the blob
// //                 const url = window.URL.createObjectURL(response);
// //                 // Create a temporary anchor element to trigger download
// //                 const a = document.createElement('a');
// //                 a.href = url;
// //                 a.download = `profile_${profileID}_print.pdf`; // Set the filename
// //                 document.body.appendChild(a);
// //                 a.click();
// //                 // Clean up
// //                 window.URL.revokeObjectURL(url);
// //                 document.body.removeChild(a);
// //                 console.log("Profile Viewed successfully:", response);
// //                 NotifySuccess("Profile Viewed successfully!");
// //             }
// //         }
// //         catch (error: any) {
// //             console.error("Failed to Viewed Profile:", error);
// //             NotifyError(error.message || "Failed to View Profile");
// //         } finally {
// //             setIsWhatsappProfile(false);
// //         }
// //     };


// //     const [goToPageInput, setGoToPageInput] = useState<string>('');

// //     const handleGoToPage = () => {
// //         const pageNumber = parseInt(goToPageInput, 10);
// //         if (!isNaN(pageNumber)) {
// //             const lastPage = Math.ceil(totalItems / itemsPerPage) - 1;
// //             const newPage = Math.max(0, Math.min(pageNumber - 1, lastPage));
// //             setCurrentPage(newPage);
// //             setGoToPageInput('');
// //         }
// //     };
// //     return (
// //         <div>
// //             <div>
// //                 {loading ? (
// //                     // <div className="text-center">Loading...</div>
// //                     // **Enhanced Loading UI**
// //                     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
// //                         <CircularProgress size={50} thickness={4.5} />
// //                     </Box>
// //                 ) : (
// //                     <div className="container mx-auto p-4">

// //                         <div>
// //                             <Typography
// //                                 sx={{
// //                                     marginBottom: '20px',
// //                                     color: 'black',
// //                                     fontSize: '1.5rem',
// //                                     fontWeight: 'bold',
// //                                 }}
// //                             >
// //                                 Matching Profile Lists For Profile ID : {profileID}
// //                             </Typography>
// //                         </div>

// //                         {/* Parent Div for Filter */}
// //                         <div>
// //                             <form onSubmit={handleFilterSubmit}>

// //                                 <div>
// //                                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
// //                                         {/* Age Difference */}
// //                                         <div className="flex flex-col">
// //                                             <label className="text-[18px] text-black font-semibold mb-2">
// //                                                 Age Difference
// //                                             </label>
// //                                             <select
// //                                                 className="w-full outline-none px-4 py-2.5 border border-black rounded"
// //                                                 defaultValue="5" // Set default value here
// //                                             >
// //                                                 <option value="" disabled>-- Select Age difference--</option>
// //                                                 <option value="1">1</option>
// //                                                 <option value="2">2</option>
// //                                                 <option value="3">3</option>
// //                                                 <option value="4">4</option>
// //                                                 <option value="5">5</option>
// //                                                 <option value="6">6</option>
// //                                                 <option value="7">7</option>
// //                                                 <option value="8">8</option>
// //                                                 <option value="9">9</option>
// //                                                 <option value="10">10</option>
// //                                             </select>
// //                                         </div>
// //                                         {/* Height from */}
// //                                         <div className="flex items-center space-x-5">
// //                                             <div className="flex flex-col">
// //                                                 <label className="text-[18px] text-black font-semibold mb-2">
// //                                                     Height from
// //                                                 </label>
// //                                                 <input
// //                                                     value={heightFrom}
// //                                                     onChange={(e) => setHeightFrom(e.target.value)}
// //                                                     className="w-full px-4 py-2 border border-black rounded"
// //                                                 />
// //                                             </div>

// //                                             <div className="flex flex-col">
// //                                                 <label
// //                                                     className="text-[18px] text-black font-semibold mb-2">
// //                                                     Height To
// //                                                 </label>
// //                                                 <input
// //                                                     value={heightTo}
// //                                                     onChange={(e) => setHeightTo(e.target.value)}
// //                                                     className="w-full px-4 py-2 border border-black rounded" />
// //                                             </div>
// //                                         </div>
// //                                         {/* Sarpa Dhosham */}
// //                                         <div className="flex flex-col">
// //                                             <label className="text-[18px] text-black font-semibold mb-2">
// //                                                 Sarpa Dhosham
// //                                             </label>
// //                                             <select className="w-full outline-none px-4 py-2.5 border border-black rounded">
// //                                                 <option value="" disabled>-- Select Sarpa Dhosham --</option>
// //                                                 <option value="Unknown">Unknown</option>
// //                                                 <option value="Yes">Yes</option>
// //                                                 <option value="No">No</option>
// //                                             </select>
// //                                         </div>
// //                                         {/* Chevvai Dhosam */}
// //                                         <div className="flex flex-col">
// //                                             <label className="text-[18px] text-black font-semibold mb-2">
// //                                                 Chevvai Dhosam
// //                                             </label>
// //                                             <select className="w-full outline-none px-4 py-2.5 border border-black rounded">
// //                                                 <option value="" disabled>-- Select Chevvai Dhosam --</option>
// //                                                 <option value="Unknown">Unknown</option>
// //                                                 <option value="Yes">Yes</option>
// //                                                 <option value="No">No</option>
// //                                             </select>
// //                                         </div>
// //                                     </div>
// //                                     {/* CheckBox */}
// //                                     <div>
// //                                         <div>
// //                                             {/* Matching stars */}
// //                                             <div className="py-4">
// //                                                 <div className="w-fit text-start">
// //                                                     <h2 className="text-lg text-black font-semibold mb-2">Matching Stars</h2>
// //                                                 </div>
// //                                                 {/* Matching Stars Section */}
// //                                                 <div>
// //                                                     <div className="justify-start items-center gap-x-5 text-black">
// //                                                         {matchStars && matchStars?.length > 0 ? (
// //                                                             matchStars
// //                                                                 .sort((a, b) => b[0].match_count - a[0].match_count) // Sort by match_count
// //                                                                 .map((matchCountArray, index) => {
// //                                                                     const starAndRasi = matchCountArray.map((star) => ({
// //                                                                         id: star.id.toString(),
// //                                                                         matching_starId: star.dest_star_id.toString(),
// //                                                                         matching_starname: star.matching_starname,
// //                                                                         matching_rasiId: star.dest_rasi_id.toString(),
// //                                                                         matching_rasiname: star.matching_rasiname,
// //                                                                     }));

// //                                                                     const matchCountValue = matchCountArray[0].match_count;

// //                                                                     return (
// //                                                                         <MatchingStars
// //                                                                             key={index}
// //                                                                             initialPoruthas={`No of porutham ${matchCountValue}`}
// //                                                                             starAndRasi={starAndRasi}
// //                                                                             selectedStarIds={selectedStarIds}
// //                                                                             onCheckboxChange={handleCheckboxMatchingStars} unique={''}                                                                        // unique={"suggested"}
// //                                                                         />
// //                                                                     );
// //                                                                 })
// //                                                         ) : (
// //                                                             <p>No match stars available</p>
// //                                                         )}
// //                                                     </div>
// //                                                 </div>
// //                                             </div>
// //                                             {/* Highest Education */}
// //                                             <div className="py-4">
// //                                                 <div className="w-fit text-start">
// //                                                     <h2 className="text-lg text-black font-semibold mb-2">Education</h2>
// //                                                 </div>
// //                                                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
// //                                                     {highestEducation.map((education) => (
// //                                                         <div key={education.education_id} className="flex items-center">
// //                                                             <input
// //                                                                 type="checkbox"
// //                                                                 id={`highestEducation-${education.education_id}`}
// //                                                                 value={education.education_id.toString()}
// //                                                                 className="mr-2"
// //                                                                 checked={selectedEducation.includes(education.education_id.toString())}
// //                                                                 onChange={() => handleEducationChange(education.education_id.toString())}  // Call the handleComplexionChange function
// //                                                             />
// //                                                             <label htmlFor={`highestEducation-${education.education_id}`} className="text-sm">
// //                                                                 {education.education_description}
// //                                                             </label>
// //                                                         </div>
// //                                                     ))}
// //                                                 </div>
// //                                             </div>
// //                                             {/* Profession */}
// //                                             <div className="py-4">
// //                                                 <div className="w-fit text-start">
// //                                                     <h2 className="text-lg text-black font-semibold mb-2">Profession</h2>
// //                                                 </div>
// //                                                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
// //                                                     {profession.map((prof) => (
// //                                                         <div key={prof.Profes_Pref_id} className="flex items-center">
// //                                                             <input
// //                                                                 type="checkbox"
// //                                                                 id={`profession-${prof.Profes_Pref_id}`}
// //                                                                 value={prof.Profes_Pref_id.toString()}
// //                                                                 className="mr-2"
// //                                                             />
// //                                                             <label htmlFor={`profession-${prof.Profes_Pref_id}`} className="text-sm">
// //                                                                 {prof.Profes_name}
// //                                                             </label>
// //                                                         </div>
// //                                                     ))}
// //                                                 </div>
// //                                             </div>
// //                                             {/* Father Live */}
// //                                             <div className="py-4">
// //                                                 <div className="w-fit text-start">
// //                                                     <h2 className="text-lg text-black font-semibold mb-2">Father Live</h2>
// //                                                 </div>

// //                                                 <select name="" id="" className="w-full outline-none px-4 py-2.5 border border-black rounded">
// //                                                     <option value="">Select Option</option>
// //                                                     <option value="">Yes</option>
// //                                                     <option value="">No</option>
// //                                                 </select>
// //                                             </div>
// //                                             {/* Mother Live */}
// //                                             <div className="py-4">
// //                                                 <div className="w-fit text-start">
// //                                                     <h2 className="text-lg text-black font-semibold mb-2">Mother Live</h2>
// //                                                 </div>

// //                                                 <select name="" id="" className="w-full outline-none px-4 py-2.5 border border-black rounded">
// //                                                     <option value="">Select Option</option>
// //                                                     <option value="">Yes</option>
// //                                                     <option value="">No</option>
// //                                                 </select>
// //                                             </div>
// //                                             {/* Marital Status */}
// //                                             <div className="py-4">
// //                                                 <div className="w-fit text-start">
// //                                                     <h2 className="text-lg text-black font-semibold mb-2">Marital Status</h2>
// //                                                 </div>
// //                                                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
// //                                                     {maritalStatus.map((marital) => (
// //                                                         <div key={marital.marital_sts_id} className="flex items-center">
// //                                                             <input
// //                                                                 type="checkbox"
// //                                                                 id={`maritalStatus-${marital.marital_sts_id}`}
// //                                                                 value={marital.marital_sts_id.toString()}
// //                                                                 className="mr-2"
// //                                                             />
// //                                                             <label htmlFor={`maritalStatus-${marital.marital_sts_id}`} className="text-sm">
// //                                                                 {marital.marital_sts_name}
// //                                                             </label>
// //                                                         </div>
// //                                                     ))}
// //                                                 </div>
// //                                             </div>
// //                                             {/* Complexion */}
// //                                             <div className="py-4">
// //                                                 <div className="w-fit text-start">
// //                                                     <h2 className="text-lg text-black font-semibold mb-2">Complexion</h2>
// //                                                 </div>
// //                                                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
// //                                                     {complexion.map((complex) => (
// //                                                         <div key={complex.complexion_id} className="flex items-center">
// //                                                             <input
// //                                                                 type="checkbox"
// //                                                                 id={`complexion-${complex.complexion_id}`}
// //                                                                 value={complex.complexion_id.toString()}
// //                                                                 className="mr-2"
// //                                                                 checked={selectedComplexions.includes(complex.complexion_id.toString())}
// //                                                                 onChange={() => handleComplexionChange(complex.complexion_id.toString())}  // Call the handleComplexionChange function

// //                                                             />
// //                                                             <label htmlFor={`complexion-${complex.complexion_id}`} className="text-sm">
// //                                                                 {complex.complexion_description}
// //                                                             </label>
// //                                                         </div>
// //                                                     ))}
// //                                                 </div>
// //                                             </div>
// //                                             {/* Family Status */}
// //                                             <div className="py-4">
// //                                                 <div className="w-fit text-start">
// //                                                     <h2 className="text-lg text-black font-semibold mb-2">Family Status</h2>
// //                                                 </div>
// //                                                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
// //                                                     {familyStatus.map((fStatus) => (
// //                                                         <div key={fStatus.family_status_id} className="flex items-center">
// //                                                             <input
// //                                                                 type="checkbox"
// //                                                                 id={`familyStatus-${fStatus.family_status_id}`}
// //                                                                 value={fStatus.family_status_id.toString()}
// //                                                                 className="mr-2"
// //                                                             />
// //                                                             <label htmlFor={`familyStatus-${fStatus.family_status_id}`} className="text-sm">
// //                                                                 {fStatus.family_status_name}
// //                                                             </label>
// //                                                         </div>
// //                                                     ))}
// //                                                 </div>

// //                                             </div>
// //                                             {/* Annual Income */}
// //                                             <div>
// //                                                 <div className="py-4">
// //                                                     <div className="w-fit text-start">
// //                                                         <h2 className="text-lg text-black font-semibold mb-2">Annual Income</h2>
// //                                                     </div>

// //                                                     <div className="flex items-center space-x-5">
// //                                                         <div>
// //                                                             <select name="minAnnualIncome"
// //                                                                 id="minAnnualIncome"
// //                                                                 value={minAnnualIncome}
// //                                                                 onChange={(e) => setMinAnnualIncome(e.target.value)}
// //                                                                 className="w-72 outline-none px-4 py-2.5 border border-black rounded">
// //                                                                 <option value="">Select Min Annual Income</option>
// //                                                                 {annualIncome.map((option) => (
// //                                                                     <option key={option.income_id} value={option.income_id}>
// //                                                                         {option.income_description}
// //                                                                     </option>
// //                                                                 ))}
// //                                                             </select>
// //                                                         </div>
// //                                                         <div>
// //                                                             <select name="maxAnnualIncome" id="maxAnnualIncome"
// //                                                                 value={maxAnnualIncome}
// //                                                                 onChange={(e) => setMaxAnnualIncome(e.target.value)}
// //                                                                 className="w-72 outline-none px-4 py-2.5 border border-black rounded">
// //                                                                 <option value="">Select Max Annual Income</option>
// //                                                                 {annualIncome.map((option) => (
// //                                                                     <option key={option.income_id} value={option.income_id}>
// //                                                                         {option.income_description}
// //                                                                     </option>
// //                                                                 ))}
// //                                                             </select>
// //                                                         </div>
// //                                                     </div>
// //                                                 </div>
// //                                             </div>
// //                                             {/* State & City */}
// //                                             <div>
// //                                                 <div className="py-4">
// //                                                     <div className="w-fit text-start">
// //                                                         <h2 className="text-lg text-black font-semibold mb-2">State and City</h2>
// //                                                     </div>

// //                                                     <div className="flex items-center space-x-5">
// //                                                         <div>
// //                                                             <select
// //                                                                 name="selectedState"
// //                                                                 id="selectedState"
// //                                                                 className="w-72 outline-none px-4 py-2.5 border border-black rounded"
// //                                                                 value={selectedState || ""}
// //                                                                 onChange={(e) => setSelectedState(e.target.value)}
// //                                                             >
// //                                                                 <option value="">Select State</option>
// //                                                                 {state.map((option) => (
// //                                                                     <option key={option.State_Pref_id} value={option.State_Pref_id}>
// //                                                                         {option.State_name}
// //                                                                     </option>
// //                                                                 ))}
// //                                                             </select>
// //                                                         </div>
// //                                                         {/* City Dropdown - Disabled until state is selected */}
// //                                                         <div>
// //                                                             <select
// //                                                                 name="selectedCity"
// //                                                                 id="selectedCity"
// //                                                                 value={selectedCity || ""}
// //                                                                 onChange={(e) => setSelectedCity(e.target.value)}
// //                                                                 className="w-72 outline-none px-4 py-2.5 border border-black rounded"
// //                                                             >
// //                                                                 <option value="">Select City
// //                                                                     {/* {selectedState ? "Select City" : "Please select a State first"} */}
// //                                                                 </option>
// //                                                                 {cities.map((option) => (
// //                                                                     <option key={option.id} value={option.id}>
// //                                                                         {option.district}
// //                                                                     </option>
// //                                                                 ))}
// //                                                             </select>
// //                                                         </div>
// //                                                     </div>
// //                                                 </div>
// //                                             </div>
// //                                             {/* Membership */}
// //                                             <div className="py-4">
// //                                                 <div className="w-fit text-start">
// //                                                     <h2 className="text-lg text-black font-semibold mb-2">Membership</h2>
// //                                                 </div>
// //                                                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
// //                                                     {membership.map((plan) => (
// //                                                         <div key={plan.id} className="flex items-center">
// //                                                             <input
// //                                                                 type="checkbox"
// //                                                                 id={`plan-${plan.id}`}
// //                                                                 value={plan.id.toString()}
// //                                                                 className="mr-2"
// //                                                                 checked={selectedMembership.includes(plan.id.toString())}
// //                                                                 onChange={() => handleMembershipChange(plan.id.toString())}  // Call the handleComplexionChange function
// //                                                             />
// //                                                             <label htmlFor={`plan-${plan.id}`} className="text-sm">
// //                                                                 {plan.plan_name}
// //                                                             </label>
// //                                                         </div>
// //                                                     ))}
// //                                                 </div>
// //                                             </div>
// //                                             {/* Foreign Interest */}
// //                                             <div className="py-4">
// //                                                 <div className="w-fit text-start">
// //                                                     <h2 className="text-lg text-black font-semibold mb-2">Foreign Interest</h2>
// //                                                 </div>
// //                                                 <select
// //                                                     name="foreignInterest"
// //                                                     id="foreignInterest"
// //                                                     className="w-full outline-none px-4 py-2.5 border border-black rounded"
// //                                                     value={foreignInterest}  // Bind the state to the value of the select element
// //                                                     onChange={(e) => setForeignInterest(e.target.value)}>
// //                                                     <option value="">Select Option</option>
// //                                                     <option value="Both">Both</option>
// //                                                     <option value="Yes">Yes</option>
// //                                                     <option value="No">No</option>
// //                                                 </select>
// //                                             </div>

// //                                             {/* Sent in Whatsapp */}
// //                                             <div className="py-4">
// //                                                 <div className="w-fit text-start">
// //                                                     <h2 className="text-lg text-black font-semibold mb-2">Sent in Whatsapp</h2>
// //                                                 </div>

// //                                                 <select name="" id="" className="w-full outline-none px-4 py-2.5 border border-black rounded">
// //                                                     <option value="">Select Option</option>
// //                                                     <option value="Yes">Yes</option>
// //                                                     <option value="NO">No</option>
// //                                                 </select>
// //                                             </div>

// //                                             {/* Has Photo */}
// //                                             <div className="py-4">
// //                                                 <div className="w-fit text-start">
// //                                                     <h2 className="text-lg text-black font-semibold mb-2">Has Photo</h2>
// //                                                 </div>

// //                                                 <select
// //                                                     name="hasphotos"
// //                                                     id="hasphotos"
// //                                                     value={hasphotos}
// //                                                     onChange={(e) => setHasPhotos(e.target.value)}
// //                                                     className="w-full outline-none px-4 py-2.5 border border-black rounded">
// //                                                     <option value="">Select Option</option>
// //                                                     <option value="Yes">Yes</option>
// //                                                     <option value="No">No</option>
// //                                                 </select>
// //                                             </div>


// //                                             {/* State */}
// //                                             {/* <div className="p-4">
// //                                 <div className="w-fit text-start">
// //                                     <h2 className="text-lg font-semibold mb-2">Select State</h2>
// //                                 </div>
// //                                 Show Loader if Data is Loading
// //                                 {loading ? (
// //                                     <div className="flex justify-center items-center p-4">
// //                                         <span className="text-gray-500">Loading...</span>
// //                                     </div>
// //                                 ) : (
// //                                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
// //                                         {state.map((state) => (
// //                                             <div key={state.state_id} className="flex items-center">
// //                                                 <input
// //                                                     type="checkbox"
// //                                                     id={`state-${state.state_id}`}
// //                                                     value={state.state_id.toString()}
// //                                                     className="mr-2"
// //                                                 />
// //                                                 <label htmlFor={`state-${state.state_id}`} className="text-sm">
// //                                                     {state.state_name}
// //                                                 </label>
// //                                             </div>
// //                                         ))}
// //                                     </div>
// //                                 )}
// //                             </div> */}
// //                                         </div>
// //                                     </div>

// //                                     <div>
// //                                         <button className="bg-red-500 text-white rounded-sm px-3 py-2 focus-within:outline-none">Filter Matching Records</button>
// //                                     </div>
// //                                 </div>
// //                             </form>
// //                         </div>

// //                         {/* Matching Profile Table */}
// //                         <div>
// //                             {/* <div>
// //                             <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>Matching Profiles</Typography>
// //                         </div> */}

// //                             <div className="flex items-center justify-end space-x-10">

// //                                 {/* Print Profile */}
// //                                 <div>
// //                                     <div>
// //                                         <p className="text-sm text-black font-semibold">Print Profile</p>
// //                                     </div>
// //                                     <div>
// //                                         {/* <form action="" method="post"> */}
// //                                         <div className="flex items-center space-x-2">
// //                                             <div>
// //                                                 <select name="printFormat" id="printFormat"
// //                                                     value={printFormat}
// //                                                     onChange={(e) => setPrintFormat(e.target.value)}
// //                                                     disabled={isPrintProfile}
// //                                                     className="text-sm border-[1px] border-black rounded-md px-2 py-0.5 focus-within:outline-none">
// //                                                     <option value="p1">Choose Format</option>
// //                                                     <option value="fullprofile">Full Profile</option>
// //                                                     <option value="withoutaddress">Without Address</option>
// //                                                     <option value="shortprofile">Short Profile</option>
// //                                                     <option value="p4">Intimation</option>
// //                                                 </select>
// //                                             </div>
// //                                             <div>
// //                                                 <button
// //                                                     onClick={handlePrintProfile}
// //                                                     disabled={isPrintProfile}
// //                                                     className={`bg-amber-500 text-white rounded-md px-3 py-0.5 ${isPrintProfile ? 'opacity-50 cursor-not-allowed' : ''}`}
// //                                                 >
// //                                                     {isPrintProfile ? 'Moving to Print...' : 'Move to print'}
// //                                                 </button>
// //                                             </div>
// //                                         </div>
// //                                         {/* </form> */}
// //                                     </div>
// //                                 </div>
// //                                 {/* Whatsapp */}
// //                                 <div>
// //                                     <div>
// //                                         <p className="text-sm text-black font-semibold">Whatsapp</p>
// //                                     </div>
// //                                     <div>
// //                                         {/* <form action="" method="post"> */}
// //                                         <div className="flex items-center space-x-2">
// //                                             <div>
// //                                                 <select
// //                                                     name="whatsappFormat"
// //                                                     id="whatsappFormat"
// //                                                     value={whatsappFormat}
// //                                                     onChange={(e) => setWhatsappFormat(e.target.value)}
// //                                                     disabled={iswhatsappProfile}
// //                                                     className="text-sm border-[1px] border-black rounded-md px-2 py-1 focus-within:outline-none">
// //                                                     <option value="w1">Choose Format</option>
// //                                                     <option value="fullprofile">Full Profile</option>
// //                                                     <option value="withoutaddress">Without Address</option>
// //                                                     <option value="shortprofile">Short Profile</option>
// //                                                     <option value="w5">Intimation</option>
// //                                                 </select>
// //                                             </div>
// //                                             <div>
// //                                                 <button
// //                                                     onClick={handleProfileWhatsapp}
// //                                                     disabled={iswhatsappProfile}
// //                                                     className={`bg-green-500 text-white rounded-md px-3 py-0.5 ${iswhatsappProfile ? 'opacity-50 cursor-not-allowed' : ''}`}
// //                                                 >
// //                                                     {iswhatsappProfile ? 'Viewing...' : 'View'}
// //                                                 </button>
// //                                             </div>
// //                                         </div>
// //                                         {/* </form> */}
// //                                     </div>
// //                                 </div>
// //                                 {/* Email */}
// //                                 <div>
// //                                     <div>
// //                                         <p className="text-sm text-black font-semibold">Send Email</p>
// //                                     </div>
// //                                     <div>
// //                                         {/* <form action="" method="post"> */}
// //                                         <div className="flex items-center space-x-2">
// //                                             <div>
// //                                                 <select name="selectedFormat" id="selectedFormat"
// //                                                     value={selectedFormat}
// //                                                     onChange={(e) => setSelectedFormat(e.target.value)}
// //                                                     disabled={isSendingEmail}
// //                                                     className="text-sm border-[1px] border-black rounded-md px-2 py-1 focus-within:outline-none">
// //                                                     <option value="w1">Choose Format</option>
// //                                                     <option value="fullprofile">Full Profile</option>
// //                                                     <option value="withoutaddress">Without Address</option>
// //                                                     <option value="shortprofile">Short Profile</option>
// //                                                     <option value="w5">Intimation</option>
// //                                                 </select>
// //                                             </div>
// //                                             <div>
// //                                                 {/* <button className="bg-blue-500 text-white rounded-md px-3 py-0.5">Send</button> */}
// //                                                 <button
// //                                                     onClick={handleSendEmail}
// //                                                     disabled={isSendingEmail}
// //                                                     className={`bg-blue-500 text-white rounded-md px-3 py-0.5 ${isSendingEmail ? 'opacity-50 cursor-not-allowed' : ''
// //                                                         }`}
// //                                                 >
// //                                                     {isSendingEmail ? 'Sending...' : 'Send'}
// //                                                 </button>
// //                                             </div>
// //                                         </div>
// //                                         {/* </form> */}
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                             {/* Section Toggle Buttons */}
// //                             {/* <div className="flex space-x-4 mb-4">
// //                             <button
// //                                 className={`px-4 py-2 rounded-md ${activeSection === "matching" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
// //                                 onClick={() => setActiveSection("matching")}
// //                             >
// //                                 Matching List
// //                             </button>
// //                             <button
// //                                 className={`px-4 py-2 rounded-md ${activeSection === "sent" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
// //                                 onClick={() => setActiveSection("sent")}
// //                             >
// //                                 Sent Profiles
// //                             </button>
// //                         </div> */}


// //                             {/* Render the corresponding section */}
// //                             {/* <div>
// //                             {renderSection()}
// //                         </div> */}

// //                             <div>

// //                                 <div className="py-4">
// //                                     <Paper className="w-full">
// //                                         <TableContainer sx={{ border: '1px solid #E0E0E0' }} component={Paper}>
// //                                             <Table sx={{ minWidth: 650 }} aria-label="simple table">
// //                                                 <TableHead style={{ background: '#FFF9C9', padding: '17px' }}>
// //                                                     {/* <TableRow>
// //                                                 {columns.map((column) => (
// //                                                     <TableCell
// //                                                         sx={{
// //                                                             borderBottom: '1px solid #E0E0E0',
// //                                                             color: '#ee3448',
// //                                                             fontWeight: 'bold',
// //                                                             fontSize: '1rem',
// //                                                             whiteSpace: 'nowrap',
// //                                                         }}
// //                                                         key={column.id}
// //                                                     >
// //                                                         {column.label}
// //                                                     </TableCell>
// //                                                 ))}
// //                                             </TableRow> */}

// //                                                     <TableRow>
// //                                                         {/* Render column headers */}
// //                                                         {columns.map((column) => (
// //                                                             <TableCell
// //                                                                 key={column.id}
// //                                                                 sx={{
// //                                                                     borderBottom: "1px solid #E0E0E0",
// //                                                                     color: "#ee3448",
// //                                                                     fontWeight: "bold",
// //                                                                     fontSize: "1rem",
// //                                                                     whiteSpace: "nowrap",
// //                                                                 }}
// //                                                             >
// //                                                                 {/* Add "Select All" Checkbox in the header */}
// //                                                                 {column.id === "select" ? (
// //                                                                     <Checkbox
// //                                                                         color="primary"
// //                                                                         checked={selectedProfiles.length === matchingData.length}
// //                                                                         indeterminate={
// //                                                                             selectedProfiles.length > 0 &&
// //                                                                             selectedProfiles.length < matchingData.length
// //                                                                         }
// //                                                                         onChange={handleSelectAll}
// //                                                                     />
// //                                                                 ) : (
// //                                                                     column.label
// //                                                                 )}
// //                                                             </TableCell>
// //                                                         ))}
// //                                                     </TableRow>
// //                                                 </TableHead>

// //                                                 <TableBody>
// //                                                     {matchingData && matchingData.length > 0 ? (
// //                                                         matchingData.map((row) => (
// //                                                             <TableRow
// //                                                                 key={row.profile_id}
// //                                                                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
// //                                                             >
// //                                                                 {/* Checkbox for each row */}
// //                                                                 <TableCell>
// //                                                                     <Checkbox
// //                                                                         color="primary"
// //                                                                         checked={selectedProfiles.includes(row.profile_id)}
// //                                                                         onChange={() => handleCheckboxChange(row.profile_id)}
// //                                                                     />
// //                                                                 </TableCell>

// //                                                                 <TableCell>
// //                                                                     <img
// //                                                                         className="rounded-full"
// //                                                                         src={row.profile_img || No_Image_Available}
// //                                                                         alt="Profile"
// //                                                                         width={50}
// //                                                                         height={50}
// //                                                                         onError={(e) => (e.currentTarget.src = No_Image_Available)} // Fallback image
// //                                                                     />
// //                                                                 </TableCell>
// //                                                                 <TableCell
// //                                                                     onClick={() =>
// //                                                                         navigate(
// //                                                                             `/viewProfile?profileId=${row.profile_id}`,
// //                                                                         )
// //                                                                     }
// //                                                                     sx={{
// //                                                                         color: 'blue',
// //                                                                         cursor: 'pointer',
// //                                                                         textDecoration: 'none', '&:hover': { textDecoration: 'underline' }
// //                                                                     }}
// //                                                                 >{row.profile_id}</TableCell>
// //                                                                 <TableCell>{row.profile_name}</TableCell>
// //                                                                 <TableCell>{row.profile_age}</TableCell>
// //                                                                 <TableCell>{row.profile_gender}</TableCell>
// //                                                                 <TableCell>{row.height}</TableCell>
// //                                                                 <TableCell>{row.weight || 'N/A'}</TableCell>
// //                                                                 <TableCell>{row.degree}</TableCell>
// //                                                                 <TableCell>{row.profession}</TableCell>
// //                                                                 <TableCell>{row.location}</TableCell>
// //                                                                 <TableCell>{row.star}</TableCell>
// //                                                                 <TableCell>{row.matching_score}</TableCell>
// //                                                                 <TableCell>{row.action_score?.score ?? "-"}</TableCell>
// //                                                                 <TableCell>
// //                                                                     {row.verified === 0 ? (
// //                                                                         <MdVerified className="text-green-600" />
// //                                                                     ) : (
// //                                                                         <GoUnverified className="text-red-600" />
// //                                                                     )}
// //                                                                 </TableCell>
// //                                                             </TableRow>
// //                                                         ))
// //                                                     ) : (
// //                                                         // Show "No data found" message in a single row
// //                                                         <TableRow>
// //                                                             <TableCell colSpan={columns.length} sx={{ textAlign: 'center' }}>
// //                                                                 No Matching Records found.
// //                                                             </TableCell>
// //                                                         </TableRow>
// //                                                     )}
// //                                                 </TableBody>
// //                                             </Table>
// //                                         </TableContainer>
// //                                     </Paper>
// //                                 </div>

// //                                 {/* <TablePagination
// //                                     rowsPerPageOptions={[5, 10, 25, 100]}
// //                                     component="div"
// //                                     count={totalItems}
// //                                     rowsPerPage={itemsPerPage}
// //                                     page={currentPage}
// //                                     onPageChange={handleChangePage}
// //                                     onRowsPerPageChange={handleChangeRowsPerPage}
// //                                 /> */}


// //                                 {/* {
// //   Math.ceil(totalItems / itemsPerPage) > 0 && (
// //     <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
// //       <div className="text-sm text-gray-600">
// //         Showing page {currentPage + 1} of {Math.ceil(totalItems / itemsPerPage)} • Total {totalItems} records
// //       </div>

// //       <div className="flex items-center gap-1">

// //           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px' }}>
// //            <Typography variant="body2">Go to page:</Typography>
// //           <TextField
// //             size="small"
// //             type="number"
// //             value={goToPageInput}
// //             onChange={(e) => setGoToPageInput(e.target.value)}
// //             inputProps={{
// //               min: 1,
// //               max: Math.ceil(totalItems / itemsPerPage),
// //             }}
// //             style={{ width: '80px' }}
// //           />
// //           <Button
// //             variant="contained"
// //             size="small"
// //             onClick={handleGoToPage}
// //             disabled={!goToPageInput}
// //           >
// //             Go
// //           </Button>
// //           </div>

// //         <button
// //           onClick={() => handleChangePage(null, 0)}
// //           disabled={currentPage === 0}
// //           className={`p-2 rounded-md ${currentPage === 0 
// //             ? 'text-gray-400 cursor-not-allowed' 
// //             : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'}`}
// //           aria-label="First page"
// //         >
// //           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
// //             <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
// //           </svg>
// //         </button>


// //         <button
// //           onClick={() => handleChangePage(null, currentPage - 1)}
// //           disabled={currentPage === 0}
// //           className={`px-3 py-1 rounded-md flex items-center gap-1 ${currentPage === 0 
// //             ? 'text-gray-400 cursor-not-allowed' 
// //             : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'}`}
// //         >
// //           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
// //             <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
// //           </svg>
// //           <span>Prev</span>
// //         </button>


// //         <div className="flex items-center gap-1">
// //           {Array.from({ length: Math.min(5, Math.ceil(itemsPerPage / itemsPerPage)) }, (_, i) => {
// //             let pageToShow;
// //             if (Math.ceil(itemsPerPage / itemsPerPage) <= 5) {
// //               pageToShow = i;
// //             } else if (currentPage <= 2) {
// //               pageToShow = i;
// //             } else if (currentPage >= Math.ceil(itemsPerPage /itemsPerPage) - 3) {
// //               pageToShow = Math.ceil(itemsPerPage / itemsPerPage) - 5 + i;
// //             } else {
// //               pageToShow = currentPage - 2 + i;
// //             }

// //             return (
// //               <button
// //                 key={pageToShow}
// //                 onClick={() => handleChangePage(null, pageToShow)}
// //                 className={`w-10 h-10 rounded-md flex items-center justify-center ${
// //                   currentPage === pageToShow 
// //                     ? 'bg-blue-600 text-white font-medium' 
// //                     : 'text-gray-700 hover:bg-gray-100'
// //                 }`}
// //               >
// //                 {pageToShow + 1}
// //               </button>
// //             );
// //           })}
// //         </div>


// //         <button
// //           onClick={() => handleChangePage(null, currentPage + 1)}
// //           disabled={currentPage >= Math.ceil(totalItems / itemsPerPage) - 1}
// //           className={`px-3 py-1 rounded-md flex items-center gap-1 ${
// //             currentPage >= Math.ceil(totalItems / itemsPerPage) - 1 
// //               ? 'text-gray-400 cursor-not-allowed' 
// //               : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
// //           }`}
// //         >
// //           <span>Next</span>
// //           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
// //             <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
// //           </svg>
// //         </button>


// //         <button
// //           onClick={() => handleChangePage(null, Math.ceil(totalItems / itemsPerPage) - 1)}
// //           disabled={currentPage >= Math.ceil(totalItems / itemsPerPage) - 1}
// //           className={`p-2 rounded-md ${
// //             currentPage >= Math.ceil(totalItems / itemsPerPage) - 1 
// //               ? 'text-gray-400 cursor-not-allowed' 
// //               : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
// //           }`}
// //           aria-label="Last page"
// //         >
// //           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
// //             <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
// //             <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
// //           </svg>
// //         </button>



// //       </div>
// //     </div>
// //   )
// // } */}

// //                                 {
// //                                     Math.ceil(totalItems / itemsPerPage) > 0 && (
// //                                         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
// //                                             <div className="text-sm text-gray-600">
// //                                                 Showing {currentPage * itemsPerPage + 1} to {Math.min((currentPage + 1) * itemsPerPage, totalItems)} of {totalItems} records
// //                                             </div>

// //                                             <div className="flex items-center gap-2">
// //                                                 {/* Go to page input */}
// //                                                 <div className="flex items-center gap-2">
// //                                                     <Typography variant="body2">Go to page:</Typography>
// //                                                     <TextField
// //                                                         size="small"
// //                                                         type="number"
// //                                                         value={goToPageInput}
// //                                                         onChange={(e) => setGoToPageInput(e.target.value)}
// //                                                         inputProps={{
// //                                                             min: 1,
// //                                                             max: Math.ceil(totalItems / itemsPerPage),
// //                                                         }}
// //                                                         style={{ width: '80px' }}
// //                                                         onKeyPress={(e) => e.key === 'Enter' && handleGoToPage()}
// //                                                     />
// //                                                     <Button
// //                                                         variant="contained"
// //                                                         size="small"
// //                                                         onClick={handleGoToPage}
// //                                                         disabled={!goToPageInput}
// //                                                     >
// //                                                         Go
// //                                                     </Button>
// //                                                 </div>

// //                                                 {/* First Page */}
// //                                                 <IconButton
// //                                                     onClick={() => setCurrentPage(0)}
// //                                                     disabled={currentPage === 0}
// //                                                     aria-label="first page"
// //                                                 >
// //                                                     {/* <FirstPageIcon /> */}{"<<"}
// //                                                 </IconButton>

// //                                                 {/* Previous Page */}
// //                                                 <IconButton
// //                                                     onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
// //                                                     disabled={currentPage === 0}
// //                                                     aria-label="previous page"
// //                                                 >
// //                                                     {/* <KeyboardArrowLeft /> */}{"<"}
// //                                                 </IconButton>

// //                                                 {/* Page Numbers */}
// //                                                 {(() => {
// //                                                     const totalPages = Math.ceil(totalItems / itemsPerPage);
// //                                                     const maxVisiblePages = 5;
// //                                                     let startPage, endPage;

// //                                                     if (totalPages <= maxVisiblePages) {
// //                                                         startPage = 0;
// //                                                         endPage = totalPages - 1;
// //                                                     } else {
// //                                                         const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
// //                                                         const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;

// //                                                         if (currentPage < maxPagesBeforeCurrent) {
// //                                                             startPage = 0;
// //                                                             endPage = maxVisiblePages - 1;
// //                                                         } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
// //                                                             startPage = totalPages - maxVisiblePages;
// //                                                             endPage = totalPages - 1;
// //                                                         } else {
// //                                                             startPage = currentPage - maxPagesBeforeCurrent;
// //                                                             endPage = currentPage + maxPagesAfterCurrent;
// //                                                         }
// //                                                     }

// //                                                     const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

// //                                                     return (
// //                                                         <div className="flex">
// //                                                             {pages.map((page) => (
// //                                                                 <Button
// //                                                                     key={page}
// //                                                                     variant={currentPage === page ? "contained" : "text"}
// //                                                                     onClick={() => setCurrentPage(page)}
// //                                                                     style={{
// //                                                                         minWidth: '32px',
// //                                                                         height: '32px',
// //                                                                         margin: '0 2px',
// //                                                                         backgroundColor: currentPage === page ? '#1976d2' : 'transparent',
// //                                                                         color: currentPage === page ? '#fff' : '#000',
// //                                                                     }}
// //                                                                 >
// //                                                                     {page + 1}
// //                                                                 </Button>
// //                                                             ))}
// //                                                         </div>
// //                                                     );
// //                                                 })()}

// //                                                 {/* Next Page */}
// //                                                 <IconButton
// //                                                     onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalItems / itemsPerPage) - 1))}
// //                                                     disabled={currentPage >= Math.ceil(totalItems / itemsPerPage) - 1}
// //                                                     aria-label="next page"
// //                                                 >
// //                                                     {/* <KeyboardArrowRight /> */}{">"}
// //                                                 </IconButton>

// //                                                 {/* Last Page */}
// //                                                 <IconButton
// //                                                     onClick={() => setCurrentPage(Math.ceil(totalItems / itemsPerPage) - 1)}
// //                                                     disabled={currentPage >= Math.ceil(totalItems / itemsPerPage) - 1}
// //                                                     aria-label="last page"
// //                                                 >
// //                                                     {/* <LastPageIcon /> */}{">>"}
// //                                                 </IconButton>
// //                                             </div>
// //                                         </div>
// //                                     )
// //                                 }
// //                             </div>



// //                         </div>
// //                     </div>
// //                 )}
// //             </div >
// //         </div >
// //     )
// // }


// import { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { UserMatchingProfilesFilter } from './MatchingFilterAndTable/UserMatchingProfilesFilter';
// //import { UserMatchingProfilesTable } from './MatchingFilterAndTable/UserMatchingProfilesTable';
// import No_Image_Available from '../images/No_Image_Available .jpg';
// import { UserMatchingProfilesTable } from './MatchingFilterAndTable/UserMatchingProfilesTable';

// export const UserMatchingProfiles = () => {
//     const location = useLocation();
//     const query = new URLSearchParams(location.search);
//     const profileID = query.get('profileId');

//     const [showTable, setShowTable] = useState(false);
//     const [filters, setFilters] = useState<any>(null);
//     const [loading, setLoading] = useState(false);

//     const handleFilterSubmit = (filterData: any) => {
//         setFilters(filterData);
//         setShowTable(true);
//     };

//     const handleBack = () => {
//         setShowTable(false);
//         setFilters(null);
//     };

//     return (
//         <div>
//             {!showTable ? (
//                 <UserMatchingProfilesFilter
//                     profileID={profileID}
//                     onFilterSubmit={handleFilterSubmit}
//                     loading={loading}
//                 />
//             ) : (
//                 <UserMatchingProfilesTable
//                     profileID={profileID}
//                     filters={filters}
//                     onBack={handleBack}
//                     No_Image_Available={No_Image_Available}
//                 />
//             )}
//         </div>
//     );
// };

import { ProfilesPage } from "./MatchingFilterAndTable/ProfilesPage";
import No_Image_Available from '../images/No_Image_Available .jpg';
 const UserMatchingProfiles = () => {
    return <ProfilesPage profileType="matching" No_Image_Available={No_Image_Available} Name={"Matching"} />;
};
 
export default UserMatchingProfiles;

