// import { useEffect, useRef, useState } from 'react';
// import { Box, Checkbox, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
// import { userAnnualIncome, userCity, userComplexion, userEducation, userFamilyStatus, userMaritalStatus, userMatchingProfiles, userMatchingProfilesFilter, userMatchingProfilesPrintProfile, userMatchingProfilesSendEmail, userMatchingProfilesWhatsapp, userMembership, userProfession, userState } from '../api/apiConfig';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { NotifyError, NotifySuccess } from '../common/Toast/ToastMessage';
// import { MdVerified } from 'react-icons/md';
// import { GoUnverified } from 'react-icons/go';
// import No_Image_Available from '../images/No_Image_Available .jpg';
// import MatchingStars from '../components/PartnerPreference/MatchingStars';
// import { useQuery } from '@tanstack/react-query';
// import { fetchEditProfileDetails, fetchMatchPreferences } from '../action';
// import { getBirthStars, matchingProfileApi } from '../services/api';
// import { string } from 'zod';

// // Interfaces for the SearchProfile component
// interface AnnualIncome {
//     income_id: number;
//     income_description: string;
// }

// interface Profession {
//     Profes_Pref_id: number;
//     Profes_name: string;
// }

// interface MaritalStatus {
//     marital_sts_id: number;
//     marital_sts_name: string;
// }

// interface HighestEducation {
//     education_id: number;
//     education_description: string;
// }

// interface State {
//     State_Pref_id: number;
//     State_name: string;
// }

// interface City {
//     id: number;
//     district: string;
// }

// interface Complexion {
//     complexion_id: number;
//     complexion_description: string;
// }

// interface Membership {
//     id: number;
//     plan_name: string;
//     plan_price: string;
// }

// interface FamilyStatus {
//     family_status_id: number;
//     family_status_name: string;
//     family_status_description: string;
// }

// interface SelectedStarIdItem {
//     id: string;
//     rasi: string;
//     star: string;
//     label: string;
// }

// interface SearchProfileProps {
//     profile_id: string;
//     profile_name: string;
//     profile_img: string;
//     profile_age: number;
//     profile_gender: string;
//     height: string;
//     weight: string;
//     degree: string;
//     profession: string;
//     star: string;
//     location: number;
//     photo_protection: number;
//     matching_score: number;
//     wish_list: number;
//     verified: number;
// }

// interface HoroscopeDetails {
//     birth_rasi_name: string;
//     birthstar_name: string;
// }

// interface Gender {
//     Gender: string;
// }

// // Column definitions for the table
// const columns = [
//     { id: "select", label: "Select" },
//     { id: 'profile_img', label: 'Image' },
//     { id: 'profile_id', label: 'Profile ID' },
//     { id: 'profile_name', label: 'Name' },
//     { id: 'profile_age', label: 'Age' },
//     { id: 'profile_gender', label: 'Gender' },
//     { id: 'height', label: 'Height' },
//     { id: 'weight', label: 'Weight' },
//     { id: 'degree', label: 'Degree' },
//     { id: 'profession', label: 'Profession' },
//     { id: 'location', label: 'Location' },
//     { id: 'star', label: 'Star' },
//     { id: 'matching_score', label: 'Matching Score' },
//     { id: 'verified', label: 'Verified' },
// ];

// const SearchProfile = () => {
//     const location = useLocation();
//     //const query = new URLSearchParams(location.search);
//     //const profileID = query.get('profileId');
//     // const profileID = query.get('profileId');

//     // console.log("vv10",profileID);

//     const roleId = sessionStorage.getItem('role_id');

//     // State declarations

//     const [profileID, setProfileID] = useState<string>('')
//     const [profileName, setProfileName] = useState<string>('')

//     const [matchingData, setMatchingData] = useState<SearchProfileProps[]>([]);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [totalItems, setTotalItems] = useState(0);
//     const [currentPage, setCurrentPage] = useState<number>(0);
//     const [itemsPerPage, setItemsPerPage] = useState(10);
//     const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);

//     // Filter states
//     const [annualIncome, setAnnualIncome] = useState<AnnualIncome[]>([]);
//     const [profession, setProfession] = useState<Profession[]>([]);
//     const [maritalStatus, setMaritalStatus] = useState<MaritalStatus[]>([]);
//     const [highestEducation, setHighestEducation] = useState<HighestEducation[]>([]);
//     const [state, setState] = useState<State[]>([]);
//     const [cities, setCities] = useState<City[]>([]);
//     const [selectedState, setSelectedState] = useState<string>('');
//     const [complexion, setComplexion] = useState<Complexion[]>([]);
//     const [membership, setMembership] = useState<Membership[]>([]);
//     const [familyStatus, setFamilyStatus] = useState<FamilyStatus[]>([]);
//     const [selectedStarIds, setSelectedStarIds] = useState<SelectedStarIdItem[]>([]);
//     const [selectedComplexions, setSelectedComplexions] = useState<String[]>([]);
//     const [selectedEducation, setSelectedEducation] = useState<String[]>([]);
//     const [heightFrom, setHeightFrom] = useState<string>('');
//     const [ageFrom, setAgeFrom] = useState<string>('18');

//     const [ageDifference, setAgeDifference] = useState<string>('');
//     const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);

//     const [heightTo, setHeightTo] = useState<string>('');
//     const [ageTo, setAgeTo] = useState<string>('100');
//     const [sarpaDhosam, setSarpaDhosam] = useState<string>('')
//     const [chevvaiDhosam, setChevvaiDhosam] = useState<string>('')

//     const [minAnnualIncome, setMinAnnualIncome] = useState<string>('');
//     const [maxAnnualIncome, setMaxAnnualIncome] = useState<string>('');
//     const [foreignInterest, setForeignInterest] = useState<string>('');
//     const [selectedCity, setSelectedCity] = useState<string>('');
//     const [selectedMembership, setSelectedMenbership] = useState<String[]>([]);
//     const [hasphotos, setHasPhotos] = useState<string>('');
//     const [edit3, setEdit3] = useState<HoroscopeDetails>();
//     const [edit0, setEdit0] = useState<Gender>();
//     const [birthStars, setBirthStars] = useState<any[]>([]);
//     const [selectedBirthStars, setSelectedBirthStars] = useState<String[]>([]);

//     // Action states
//     const [selectedFormat, setSelectedFormat] = useState<string>('');
//     const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
//     const [printFormat, setPrintFormat] = useState<string>('');
//     const [isPrintProfile, setIsPrintProfile] = useState<boolean>(false);
//     const [whatsappFormat, setWhatsappFormat] = useState<string>('');
//     const [iswhatsappProfile, setIsWhatsappProfile] = useState<boolean>(false);
//     const navigate = useNavigate();
    
//     useEffect(() => {
//         const fetchSearchData = async () => {
//             // if (!profileID) return;
//             setLoading(true);
//             try {
//                 const annualIncomeData = await userAnnualIncome();
//                 const professionData = await userProfession();
//                 const maritalStatusData = await userMaritalStatus();
//                 const educationData = await userEducation();
//                 const stateData = await userState();
//                 const cityData = await userCity();
//                 const complexionData = await userComplexion();
//                 const membershipData = await userMembership();
//                 const familyStatusData = await userFamilyStatus();
//                 const birthStarsData = await getBirthStars();
//                 setBirthStars(birthStarsData);
//                 // const data = await userMatchingProfiles(String(profileID), currentPage + 1, itemsPerPage);

//                 setAnnualIncome(Object.values(annualIncomeData));
//                 setProfession(Object.values(professionData));
//                 setMaritalStatus(Object.values(maritalStatusData));
//                 setHighestEducation(Object.values(educationData));
//                 setState(Object.values(stateData));
//                 setCities(Object.values(cityData));
//                 setComplexion(Object.values(complexionData));
//                 setMembership(membershipData.data);
//                 setFamilyStatus(Object.values(familyStatusData));
//                 // setMatchingData(data.profiles || []);
//                 // setTotalItems(data.total_count || 0);
//             } catch (error: any) {
//                 NotifyError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSearchData();
//     }, [currentPage, itemsPerPage]);

//     const { data: EditData } = useQuery({
//         queryKey: [profileID, 'editData'],
//         queryFn: () => fetchEditProfileDetails(profileID),
//         enabled: !!profileID,
//     });

//     useEffect(() => {
//         if (EditData && EditData.length > 0) {
//             setEdit3(EditData[3] as HoroscopeDetails);
//             setEdit0(EditData[0] as Gender);
//         }
//     }, [EditData]);

//     const rasiId: string = edit3?.birth_rasi_name as string;
//     const starId: string = edit3?.birthstar_name as string;
//     const gender: string = edit0?.Gender as string;

//     const { data: matchStars } = useQuery({
//         queryKey: ['matchStars'],
//         queryFn: () => fetchMatchPreferences(rasiId, starId, gender),
//         enabled: !!rasiId && !!gender && !!starId,
//     });

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

//     const ageFromRef = useRef<HTMLInputElement>(null);
//     const ageToRef = useRef<HTMLInputElement>(null)
//     const heightFromRef = useRef<HTMLInputElement>(null);
//     const heightToRef = useRef<HTMLInputElement>(null);

//     const handleFilterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

//         event.preventDefault();

//         // Validate age inputs
//         if (!ageFrom || ageFrom.trim() === '') {
//             NotifyError("Age from cannot be empty");
//             ageFromRef.current?.focus();
//             return;
//         }

//         if (!ageTo || ageTo.trim() === '') {
//             NotifyError("Age to cannot be empty");
//             ageToRef.current?.focus();
//             return;
//         }

//         const ageFromNum = Number(ageFrom);
//         const ageToNum = Number(ageTo);

//         if (isNaN(ageFromNum)) {
//             NotifyError("Age from must be a valid number");
//             ageFromRef.current?.focus();
//             return;
//         }

//         if (isNaN(ageToNum)) {
//             NotifyError("Age to must be a valid number");
//             ageToRef.current?.focus();
//             return;
//         }

//         if (ageFromNum > ageToNum) {
//             NotifyError("Age from cannot be greater than age to");
//             ageFromRef.current?.focus();
//             return;
//         }

//         if (ageFromNum < 18 || ageToNum > 100) {
//             NotifyError("Age must be between 18 and 100");
//             ageFromRef.current?.focus();
//             return;
//         }

//         // Validate height inputs
//         if (heightFrom && isNaN(Number(heightFrom))) {
//             NotifyError("Height from must be a valid number");
//             heightFromRef.current?.focus();
//             return;
//         }

//         if (heightTo && isNaN(Number(heightTo))) {
//             NotifyError("Height to must be a valid number");
//             heightToRef.current?.focus();
//             return;
//         }

//         if (heightFrom && heightTo && Number(heightFrom) > Number(heightTo)) {
//             NotifyError("Height from cannot be greater than height to");
//             heightFromRef.current?.focus();
//             return;
//         }


//         try {
//             setLoading(true);
//             const destRasiIds = selectedStarIds.map((item) => item.star);
//             const selectedBirthStarIds = selectedBirthStars.join(",");
//             const MatchingprofileFilter = await userMatchingProfilesFilter(
//                 String(profileID),
//                 currentPage + 1,
//                 itemsPerPage,
//                 String(selectedComplexions),
//                 String(selectedEducation),
//                 Number(heightFrom),
//                 Number(heightTo),
//                 Number(minAnnualIncome),
//                 Number(maxAnnualIncome),
//                 foreignInterest,
//                 Number(selectedState),
//                 Number(selectedCity),
//                 selectedMembership.length,
//                 hasphotos,
//                 selectedBirthStarIds,
//                 // Number(destRasiIds.join(",")),
//                 Number(ageDifference),
//                 selectedProfessions.join(','),
//                 Number(ageFrom),
//                 Number(ageTo),
//                 String(sarpaDhosam),
//                 String(chevvaiDhosam),
//                 String(profileName),
//                 // selectedBirthStarIds
//             );
//             console.log('lop123', MatchingprofileFilter)
//             setMatchingData(MatchingprofileFilter.profiles || []);
//             setTotalItems(MatchingprofileFilter.total_count || 0);
//         } catch (error: any) {
//             NotifyError(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSendEmail = async () => {
//         if (selectedProfiles.length === 0) {
//             NotifyError("Please select at least one profile to send email");
//             return;
//         }
//         if (!selectedFormat) {
//             NotifyError("Please select an email format");
//             return;
//         }
//         try {
//             setIsSendingEmail(true);
//             await userMatchingProfilesSendEmail(
//                 selectedFormat,
//                 String(selectedProfiles),
//                 String(profileID),
//                 String(roleId),
//             );
//             NotifySuccess("Email sent successfully!");
//         } catch (error: any) {
//             NotifyError(error.message || "Failed to send email");
//         } finally {
//             setIsSendingEmail(false);
//         }
//     };

//     const handlePrintProfile = async () => {
//         if (selectedProfiles.length === 0) {
//             NotifyError("Please select at least one profile to print profile");
//             return;
//         }
//         if (!printFormat) {
//             NotifyError("Please select an Print format");
//             return;
//         }
//         try {
//             setIsPrintProfile(true);
//             const response = await userMatchingProfilesPrintProfile(
//                 printFormat,
//                 String(selectedProfiles),
//                 String(profileID),
//                 String(roleId),
//             );
//             if (response instanceof Blob) {
//                 const url = window.URL.createObjectURL(response);
//                 const a = document.createElement('a');
//                 a.href = url;
//                 a.download = `profile_${profileID}_print.pdf`;
//                 document.body.appendChild(a);
//                 a.click();
//                 window.URL.revokeObjectURL(url);
//                 document.body.removeChild(a);
//                 NotifySuccess("Profile download started successfully!");
//             } else {
//                 NotifySuccess("Profile Printed successfully!");
//             }
//         } catch (error: any) {
//             NotifyError(error.message || "Failed to Print Profile");
//         } finally {
//             setIsPrintProfile(false);
//         }
//     };

//     const handleProfileWhatsapp = async () => {
//         if (selectedProfiles.length === 0) {
//             NotifyError("Please select at least one profile to print profile");
//             return;
//         }
//         if (!whatsappFormat) {
//             NotifyError("Please select an Whatsapp format");
//             return;
//         }
//         try {
//             setIsWhatsappProfile(true);
//             const response = await userMatchingProfilesWhatsapp(
//                 whatsappFormat,
//                 String(selectedProfiles),
//                 String(profileID),
//                 "whatsapp",
//                 String(roleId),
//             );
//             if (response instanceof Blob) {
//                 const url = window.URL.createObjectURL(response);
//                 const a = document.createElement('a');
//                 a.href = url;
//                 a.download = `profile_${profileID}_print.pdf`;
//                 document.body.appendChild(a);
//                 a.click();
//                 window.URL.revokeObjectURL(url);
//                 document.body.removeChild(a);
//                 NotifySuccess("Profile Viewed successfully!");
//             }
//         } catch (error: any) {
//             NotifyError(error.message || "Failed to View Profile");
//         } finally {
//             setIsWhatsappProfile(false);
//         }
//     };

//     // Function to handle checkbox change
//     const handleEducationChange = (EducationID: String) => {
//         setSelectedEducation(prev =>
//             prev.includes(EducationID)
//                 // If the education is already selected, remove it from the array
//                 ? prev.filter(id => id !== EducationID)
//                 // Otherwise, add it to the array
//                 : [...prev, EducationID]
//         );
//     };

//     // Function to handle checkbox change
//     const handleComplexionChange = (complexionId: String) => {
//         setSelectedComplexions(prev =>
//             prev.includes(complexionId)
//                 // If the complexion is already selected, remove it from the array
//                 ? prev.filter(id => id !== complexionId)
//                 // Otherwise, add it to the array
//                 : [...prev, complexionId]
//         );
//     };

//     // Function to handle checkbox change
//     const handleMembershipChange = (MembershipID: String) => {
//         setSelectedMenbership(prev =>
//             prev.includes(MembershipID)
//                 // If the membership is already selected, remove it from the array
//                 ? prev.filter(id => id !== MembershipID)
//                 // Otherwise, add it to the array
//                 : [...prev, MembershipID]
//         );
//     };

//     // Function to handle checkbox change for birth stars
//     const handleBirthStarChange = (starId: String) => {
//         setSelectedBirthStars(prev =>
//             prev.includes(starId)
//                 ? prev.filter(id => id !== starId)
//                 : [...prev, starId]
//         );
//     };


//     //     const handleProfessionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     //   const value = e.target.value;
//     //   const isChecked = e.target.checked;

//     //   setSelectedProfessions((prev) =>
//     //     isChecked ? [...prev, value] : prev.filter((id) => id !== value)
//     //   );
//     // };

//     const handleProfessionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         const isChecked = e.target.checked;

//         setSelectedProfessions((prev) => {
//             if (isChecked) {
//                 return prev.includes(value) ? prev : [...prev, value]; // ✅ Prevent duplicates
//             } else {
//                 return prev.filter((id) => id !== value); // ✅ Remove when unchecked
//             }
//         });
//     };


//     return (
//         <div>
//             <div>
//                 {loading ? (
//                     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
//                         <CircularProgress size={50} thickness={4.5} />
//                     </Box>
//                 ) : (
//                     <div className="container mx-auto p-4">
//                         <div>
//                             <Typography
//                                 sx={{
//                                     marginBottom: '20px',
//                                     color: 'black',
//                                     fontSize: '1.5rem',
//                                     fontWeight: 'bold',
//                                 }}
//                             >
//                                 Search Profile
//                             </Typography>
//                         </div>

//                         {/* Filter Form */}
//                         <div>
//                             <form onSubmit={handleFilterSubmit}>
//                                 <div>
//                                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
//                                         {/* Profile ID */}
//                                         <div className="flex flex-col">
//                                             <label className="text-[18px] text-black font-semibold mb-2">
//                                                 Profile ID
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 placeholder="Enter Profile ID"
//                                                 value={profileID}
//                                                 className="w-full px-4 py-2 border border-black rounded"
//                                                 onChange={(e) => setProfileID(e.target.value)}
//                                             />
//                                         </div>

//                                         {/* Profile Name */}
//                                         <div className="flex flex-col">
//                                             <label className="text-[18px] text-black font-semibold mb-2">
//                                                 Profile Name
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 value={profileName}
//                                                 placeholder="Enter Profile Name"
//                                                 className="w-full px-4 py-2 border border-black rounded"
//                                                 onChange={(e) => setProfileName(e.target.value)}
//                                             />
//                                         </div>

//                                         <div className="flex items-center space-x-5">
//                                             <div className="flex flex-col">
//                                                 <label className="text-[18px] text-black font-semibold mb-2">
//                                                     Age from
//                                                 </label>
//                                                 <input
//                                                     ref={ageFromRef}
//                                                     value={ageFrom}
//                                                     placeholder='Enter AgeFrom'
//                                                     onChange={(e) => {
//                                                         const value = e.target.value;
//                                                         if (value === '' || Number(value) >= 18 || Number(value) <= 100) {
//                                                             setAgeFrom(value)
//                                                         }
//                                                     }
//                                                     }
//                                                     className="w-full px-4 py-2 border border-black rounded"
//                                                 />
//                                                 {ageFrom && ageTo && Number(ageFrom) > Number(ageTo) && (
//                                                     <span className="text-red-500 text-sm">Age from cannot be greater than age to</span>
//                                                 )}
//                                             </div>
//                                             <div className="flex flex-col">
//                                                 <label className="text-[18px] text-black font-semibold mb-2">
//                                                     Age To
//                                                 </label>
//                                                 <input
//                                                     value={ageTo}
//                                                     ref={ageToRef}
//                                                     placeholder='Enter AgeTo'
//                                                     onChange={(e) => {
//                                                         const value = e.target.value;
//                                                         if (value === '' || Number(value) >= 18 || Number(value) <= 100) {
//                                                             setAgeTo(value)
//                                                         }
//                                                     }}
//                                                     className="w-full px-4 py-2 border border-black rounded"
//                                                 />
//                                                 {ageFrom && ageTo && Number(ageFrom) > Number(ageTo) && (
//                                                     <span className="text-red-500 text-sm">Age to cannot be less than age from</span>
//                                                 )}
//                                             </div>
//                                         </div>


//                                         {/* Height Range */}
//                                         <div className="flex items-center space-x-5">
//                                             <div className="flex flex-col">
//                                                 <label className="text-[18px] text-black font-semibold mb-2">
//                                                     Height from
//                                                 </label>
//                                                 <input
//                                                     value={heightFrom}
//                                                     ref={heightFromRef}
//                                                     placeholder='Enter HeightFrom'
//                                                     onChange={(e) => setHeightFrom(e.target.value)}
//                                                     className="w-full px-4 py-2 border border-black rounded"
//                                                 />
//                                             </div>
//                                             <div className="flex flex-col">
//                                                 <label className="text-[18px] text-black font-semibold mb-2">
//                                                     Height To
//                                                 </label>
//                                                 <input
//                                                     ref={heightToRef}
//                                                     placeholder='Enter HeightTo'
//                                                     value={heightTo}
//                                                     onChange={(e) => setHeightTo(e.target.value)}
//                                                     className="w-full px-4 py-2 border border-black rounded"
//                                                 />
//                                             </div>
//                                         </div>

//                                         {/* Sarpa Dhosham */}
//                                         <div className="flex flex-col">
//                                             <label className="text-[18px] text-black font-semibold mb-2">
//                                                 Sarpa Dhosham
//                                             </label>
//                                             <select className="w-full outline-none px-4 py-2.5 border border-black rounded"
//                                                 value={sarpaDhosam}
//                                                 onChange={(e) => setSarpaDhosam(e.target.value)}
//                                             >
//                                                 <option value="" disabled>-- Select Sarpa Dhosham --</option>
//                                                 <option value="">Unknown</option>
//                                                 <option value="1">Yes</option>
//                                                 <option value="0">No</option>
//                                             </select>
//                                         </div>
//                                         {/* Chevvai Dhosam */}
//                                         <div className="flex flex-col">
//                                             <label className="text-[18px] text-black font-semibold mb-2">
//                                                 Chevvai Dhosam
//                                             </label>
//                                             <select className="w-full outline-none px-4 py-2.5 border border-black rounded"
//                                                 value={chevvaiDhosam}
//                                                 onChange={(e) => setChevvaiDhosam(e.target.value)}
//                                             >
//                                                 <option value="" disabled>-- Select Chevvai Dhosam --</option>
//                                                 <option value="">Unknown</option>
//                                                 <option value="1">Yes</option>
//                                                 <option value="0">No</option>
//                                             </select>
//                                         </div>
//                                     </div>

//                                     {/* Matching Stars */}
//                                     <div className="py-4">
//                                         <div className="w-fit text-start">
//                                             <h2 className="text-lg text-black font-semibold mb-2">Birth Stars</h2>
//                                         </div>
//                                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                                             {birthStars.map((star) => (
//                                                 <div key={star.id} className="flex items-center">
//                                                     <input
//                                                         type="checkbox"
//                                                         id={`birthStar-${star.id}`}
//                                                         value={star.id.toString()}
//                                                         className="mr-2"
//                                                         checked={selectedBirthStars.includes(star.id.toString())}
//                                                         onChange={() => handleBirthStarChange(star.id.toString())}
//                                                     />
//                                                     <label htmlFor={`birthStar-${star.id}`} className="text-sm">
//                                                         {star.star}
//                                                     </label>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     {/* Highest Education */}
//                                     <div className="py-4">
//                                         <div className="w-fit text-start">
//                                             <h2 className="text-lg text-black font-semibold mb-2">Education</h2>
//                                         </div>
//                                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                                             {highestEducation.map((education) => (
//                                                 <div key={education.education_id} className="flex items-center">
//                                                     <input
//                                                         type="checkbox"
//                                                         id={`highestEducation-${education.education_id}`}
//                                                         value={education.education_id.toString()}
//                                                         className="mr-2"
//                                                         checked={selectedEducation.includes(education.education_id.toString())}
//                                                         onChange={() => handleEducationChange(education.education_id.toString())}  // Call the handleComplexionChange function
//                                                     />
//                                                     <label htmlFor={`highestEducation-${education.education_id}`} className="text-sm">
//                                                         {education.education_description}
//                                                     </label>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     {/* Profession */}
//                                     <div className="py-4">
//                                         <div className="w-fit text-start">
//                                             <h2 className="text-lg text-black font-semibold mb-2">Profession</h2>
//                                         </div>
//                                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                                             {profession.map((prof) => (
//                                                 <div key={prof.Profes_Pref_id} className="flex items-center">
//                                                     <input
//                                                         type="checkbox"
//                                                         id={`profession-${prof.Profes_Pref_id}`}
//                                                         value={prof.Profes_Pref_id.toString()}
//                                                         checked={(selectedProfessions.includes(prof.Profes_Pref_id.toString()))}
//                                                         onChange={handleProfessionChange}
//                                                         className="mr-2"
//                                                     />
//                                                     <label htmlFor={`profession-${prof.Profes_Pref_id}`} className="text-sm">
//                                                         {prof.Profes_name}
//                                                     </label>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     {/* Father Live */}
//                                     <div className="py-4">
//                                         <div className="w-fit text-start">
//                                             <h2 className="text-lg text-black font-semibold mb-2">Father Live</h2>
//                                         </div>

//                                         <select name="" id="" className="w-full outline-none px-4 py-2.5 border border-black rounded">
//                                             <option value="">Select Option</option>
//                                             <option value="">Yes</option>
//                                             <option value="">No</option>
//                                         </select>
//                                     </div>
//                                     {/* Mother Live */}
//                                     <div className="py-4">
//                                         <div className="w-fit text-start">
//                                             <h2 className="text-lg text-black font-semibold mb-2">Mother Live</h2>
//                                         </div>

//                                         <select name="" id="" className="w-full outline-none px-4 py-2.5 border border-black rounded">
//                                             <option value="">Select Option</option>
//                                             <option value="">Yes</option>
//                                             <option value="">No</option>
//                                         </select>
//                                     </div>

//                                     {/* Marital Status */}
//                                     <div className="py-4">
//                                         <div className="w-fit text-start">
//                                             <h2 className="text-lg text-black font-semibold mb-2">Marital Status</h2>
//                                         </div>
//                                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                                             {maritalStatus.map((marital) => (
//                                                 <div key={marital.marital_sts_id} className="flex items-center">
//                                                     <input
//                                                         type="checkbox"
//                                                         id={`maritalStatus-${marital.marital_sts_id}`}
//                                                         value={marital.marital_sts_id.toString()}
//                                                         className="mr-2"
//                                                     />
//                                                     <label htmlFor={`maritalStatus-${marital.marital_sts_id}`} className="text-sm">
//                                                         {marital.marital_sts_name}
//                                                     </label>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     {/* Complexion */}
//                                     <div className="py-4">
//                                         <div className="w-fit text-start">
//                                             <h2 className="text-lg text-black font-semibold mb-2">Complexion</h2>
//                                         </div>
//                                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                                             {complexion.map((complex) => (
//                                                 <div key={complex.complexion_id} className="flex items-center">
//                                                     <input
//                                                         type="checkbox"
//                                                         id={`complexion-${complex.complexion_id}`}
//                                                         value={complex.complexion_id.toString()}
//                                                         className="mr-2"
//                                                         checked={selectedComplexions.includes(complex.complexion_id.toString())}
//                                                         onChange={() => handleComplexionChange(complex.complexion_id.toString())}  // Call the handleComplexionChange function

//                                                     />
//                                                     <label htmlFor={`complexion-${complex.complexion_id}`} className="text-sm">
//                                                         {complex.complexion_description}
//                                                     </label>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     {/* Family Status */}
//                                     <div className="py-4">
//                                         <div className="w-fit text-start">
//                                             <h2 className="text-lg text-black font-semibold mb-2">Family Status</h2>
//                                         </div>
//                                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                                             {familyStatus.map((fStatus) => (
//                                                 <div key={fStatus.family_status_id} className="flex items-center">
//                                                     <input
//                                                         type="checkbox"
//                                                         id={`familyStatus-${fStatus.family_status_id}`}
//                                                         value={fStatus.family_status_id.toString()}
//                                                         className="mr-2"
//                                                     />
//                                                     <label htmlFor={`familyStatus-${fStatus.family_status_id}`} className="text-sm">
//                                                         {fStatus.family_status_name}
//                                                     </label>
//                                                 </div>
//                                             ))}
//                                         </div>

//                                     </div>

//                                     {/* Annual Income */}
//                                     <div>
//                                         <div className="py-4">
//                                             <div className="w-fit text-start">
//                                                 <h2 className="text-lg text-black font-semibold mb-2">Annual Income</h2>
//                                             </div>

//                                             <div className="flex items-center space-x-5">
//                                                 <div>
//                                                     <select name="minAnnualIncome"
//                                                         id="minAnnualIncome"
//                                                         value={minAnnualIncome}
//                                                         onChange={(e) => setMinAnnualIncome(e.target.value)}
//                                                         className="w-72 outline-none px-4 py-2.5 border border-black rounded">
//                                                         <option value="">Select Min Annual Income</option>
//                                                         {annualIncome.map((option) => (
//                                                             <option key={option.income_id} value={option.income_id}>
//                                                                 {option.income_description}
//                                                             </option>
//                                                         ))}
//                                                     </select>
//                                                 </div>
//                                                 <div>
//                                                     <select name="maxAnnualIncome" id="maxAnnualIncome"
//                                                         value={maxAnnualIncome}
//                                                         onChange={(e) => setMaxAnnualIncome(e.target.value)}
//                                                         className="w-72 outline-none px-4 py-2.5 border border-black rounded">
//                                                         <option value="">Select Max Annual Income</option>
//                                                         {annualIncome.map((option) => (
//                                                             <option key={option.income_id} value={option.income_id}>
//                                                                 {option.income_description}
//                                                             </option>
//                                                         ))}
//                                                     </select>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* State & City */}
//                                     <div>
//                                         <div className="py-4">
//                                             <div className="w-fit text-start">
//                                                 <h2 className="text-lg text-black font-semibold mb-2">State and City</h2>
//                                             </div>

//                                             <div className="flex items-center space-x-5">
//                                                 <div>
//                                                     <select
//                                                         name="selectedState"
//                                                         id="selectedState"
//                                                         className="w-72 outline-none px-4 py-2.5 border border-black rounded"
//                                                         value={selectedState || ""}
//                                                         onChange={(e) => setSelectedState(e.target.value)}
//                                                     >
//                                                         <option value="">Select State</option>
//                                                         {state.map((option) => (
//                                                             <option key={option.State_Pref_id} value={option.State_Pref_id}>
//                                                                 {option.State_name}
//                                                             </option>
//                                                         ))}
//                                                     </select>
//                                                 </div>
//                                                 {/* City Dropdown - Disabled until state is selected */}
//                                                 <div>
//                                                     <select
//                                                         name="selectedCity"
//                                                         id="selectedCity"
//                                                         value={selectedCity || ""}
//                                                         onChange={(e) => setSelectedCity(e.target.value)}
//                                                         className="w-72 outline-none px-4 py-2.5 border border-black rounded"
//                                                     >
//                                                         <option value="">Select City
//                                                             {/* {selectedState ? "Select City" : "Please select a State first"} */}
//                                                         </option>
//                                                         {cities.map((option) => (
//                                                             <option key={option.id} value={option.id}>
//                                                                 {option.district}
//                                                             </option>
//                                                         ))}
//                                                     </select>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Membership */}
//                                     <div className="py-4">
//                                         <div className="w-fit text-start">
//                                             <h2 className="text-lg text-black font-semibold mb-2">Membership</h2>
//                                         </div>
//                                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                                             {membership.map((plan) => (
//                                                 <div key={plan.id} className="flex items-center">
//                                                     <input
//                                                         type="checkbox"
//                                                         id={`plan-${plan.id}`}
//                                                         value={plan.id.toString()}
//                                                         className="mr-2"
//                                                         checked={selectedMembership.includes(plan.id.toString())}
//                                                         onChange={() => handleMembershipChange(plan.id.toString())}  // Call the handleComplexionChange function
//                                                     />
//                                                     <label htmlFor={`plan-${plan.id}`} className="text-sm">
//                                                         {plan.plan_name}
//                                                     </label>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     {/* Foreign Interest */}
//                                     <div className="py-4">
//                                         <div className="w-fit text-start">
//                                             <h2 className="text-lg text-black font-semibold mb-2">Foreign Interest</h2>
//                                         </div>
//                                         <select
//                                             name="foreignInterest"
//                                             id="foreignInterest"
//                                             className="w-full outline-none px-4 py-2.5 border border-black rounded"
//                                             value={foreignInterest}  // Bind the state to the value of the select element
//                                             onChange={(e) => setForeignInterest(e.target.value)}>
//                                             <option value="">Select Option</option>
//                                             <option value="Both">Both</option>
//                                             <option value="Yes">Yes</option>
//                                             <option value="No">No</option>
//                                         </select>
//                                     </div>

//                                     {/* Has Photo */}
//                                     <div className="py-4">
//                                         <div className="w-fit text-start">
//                                             <h2 className="text-lg text-black font-semibold mb-2">Has Photo</h2>
//                                         </div>

//                                         <select
//                                             name="hasphotos"
//                                             id="hasphotos"
//                                             value={hasphotos}
//                                             onChange={(e) => setHasPhotos(e.target.value)}
//                                             className="w-full outline-none px-4 py-2.5 border border-black rounded">
//                                             <option value="">Select Option</option>
//                                             <option value="Yes">Yes</option>
//                                             <option value="No">No</option>
//                                         </select>
//                                     </div>

//                                     <div className="mt-4">
//                                         <button type="submit" className="bg-red-500 text-white rounded-sm px-3 py-2 focus-within:outline-none">
//                                             Filter Search Records
//                                         </button>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>

//                         {/* Table */}
//                         <div className="py-4">
//                             <Paper className="w-full">
//                                 <TableContainer sx={{ border: '1px solid #E0E0E0' }} component={Paper}>
//                                     <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                                         <TableHead style={{ background: '#FFF9C9', padding: '17px' }}>
//                                             <TableRow>
//                                                 {columns.map((column) => (
//                                                     <TableCell
//                                                         key={column.id}
//                                                         sx={{
//                                                             borderBottom: "1px solid #E0E0E0",
//                                                             color: "#ee3448",
//                                                             fontWeight: "bold",
//                                                             fontSize: "1rem",
//                                                             whiteSpace: "nowrap",
//                                                         }}
//                                                     >
//                                                         {column.id === "select" ? (
//                                                             <Checkbox
//                                                                 color="primary"
//                                                                 checked={selectedProfiles.length === matchingData.length}
//                                                                 indeterminate={selectedProfiles.length > 0 && selectedProfiles.length < matchingData.length}
//                                                                 onChange={handleSelectAll}
//                                                             />
//                                                         ) : (
//                                                             column.label
//                                                         )}
//                                                     </TableCell>
//                                                 ))}
//                                             </TableRow>
//                                         </TableHead>

//                                         <TableBody>
//                                             {matchingData && matchingData.length > 0 ? (
//                                                 matchingData.map((row) => (
//                                                     <TableRow
//                                                         key={row.profile_id}
//                                                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                                                     >
//                                                         <TableCell>
//                                                             <Checkbox
//                                                                 color="primary"
//                                                                 checked={selectedProfiles.includes(row.profile_id)}
//                                                                 onChange={() => handleCheckboxChange(row.profile_id)}
//                                                             />
//                                                         </TableCell>
//                                                         <TableCell>
//                                                             <img
//                                                                 className="rounded-full"
//                                                                 src={row.profile_img || No_Image_Available}
//                                                                 alt="Profile"
//                                                                 width={50}
//                                                                 height={50}
//                                                                 onError={(e) => (e.currentTarget.src = No_Image_Available)}
//                                                             />
//                                                         </TableCell>
//                                                         <TableCell
//                                                             onClick={() =>
//                                                                 navigate(
//                                                                     `/viewProfile?profileId=${row.profile_id}`,
//                                                                 )
//                                                             }
//                                                             sx={{
//                                                                 color: 'blue',
//                                                                 cursor: 'pointer',
//                                                                 textDecoration: 'none', '&:hover': { textDecoration: 'underline' }
//                                                             }}
//                                                         >{row.profile_id}</TableCell>
//                                                         <TableCell>{row.profile_name}</TableCell>
//                                                         <TableCell>{row.profile_age}</TableCell>
//                                                         <TableCell>{row.profile_gender}</TableCell>
//                                                         <TableCell>{row.height}</TableCell>
//                                                         <TableCell>{row.weight || 'N/A'}</TableCell>
//                                                         <TableCell>{row.degree}</TableCell>
//                                                         <TableCell>{row.profession}</TableCell>
//                                                         <TableCell>{row.location}</TableCell>
//                                                         <TableCell>{row.star}</TableCell>
//                                                         <TableCell>{row.matching_score}</TableCell>
//                                                         <TableCell>
//                                                             {row.verified === 0 ? (
//                                                                 <MdVerified className="text-green-600" />
//                                                             ) : (
//                                                                 <GoUnverified className="text-red-600" />
//                                                             )}
//                                                         </TableCell>
//                                                     </TableRow>
//                                                 ))
//                                             ) : (
//                                                 <TableRow>
//                                                     <TableCell colSpan={columns.length} sx={{ textAlign: 'center' }}>
//                                                         No Search Records found.
//                                                     </TableCell>
//                                                 </TableRow>
//                                             )}
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                             </Paper>
//                         </div>

//                         <TablePagination
//                             rowsPerPageOptions={[5, 10, 25, 100]}
//                             component="div"
//                             count={totalItems}
//                             rowsPerPage={itemsPerPage}
//                             page={currentPage}
//                             onPageChange={handleChangePage}
//                             onRowsPerPageChange={handleChangeRowsPerPage}
//                         />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default SearchProfile; 


import { useState } from 'react';
 
// import SearchProfileResults from './CommonSearchTableAndFilter/SearchProfileResults';
// import SearchProfileFilters from './CommonSearchTableAndFilter/SearchProfileFilters';
import No_Image_Available from '../images/No_Image_Available .jpg';
import SearchProfileFilters from './CommonSearchTableAndFilter/SearchProfileFilters';
import SearchProfileResults from './CommonSearchTableAndFilter/SearchProfileResults';
const SearchProfile = () => {
  const [showResults, setShowResults] = useState(false);
  const [filters, setFilters] = useState<any>(null);
  const [loading, setLoading] = useState(false);
 
  const handleFilterSubmit = (filterData: any) => {
    setFilters(filterData);
    setShowResults(true);
  };
 
  const handleBackToFilters = () => {
    setShowResults(false);
    setFilters(null);
  };
 
  return (
    <div>
      {!showResults ? (
        <SearchProfileFilters onFilterSubmit={handleFilterSubmit} loading={loading} />
      ) : (
         <SearchProfileResults filters={filters} onBack={handleBackToFilters} No_Image_Available={No_Image_Available}/>
       
      )}
    </div>
  );
};
 
export default SearchProfile;