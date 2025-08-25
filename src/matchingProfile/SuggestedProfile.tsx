// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { useEffect, useState } from 'react';
// import { Button, TablePagination, TextField, Typography } from '@mui/material';
// import axios from 'axios';
// import No_Image_Available from '../images/No_Image_Available .jpg';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { matchingProfileApi, suggestedProfileApi } from '../services/api';
// import { MdVerified } from 'react-icons/md';
// import { GoUnverified } from 'react-icons/go';
// import { annualIncomeApi, educationalPrefApi, fetchGetHighestEducation, fetchMaritalStatuses, fetchStateStatus, getProfession } from '../action';
// import { useQuery } from '@tanstack/react-query';
// import { GetHighestEducation } from '../components/new_profile/EditFormComponents/EducationalDetails';
// import { ProfessionPref } from '../components/new_profile/profile_form_components/EducationalDetails';
// import { EduPref } from '../components/new_profile/profile_form_components/Partner_preference';
// interface ProfileImage {
//   [key: string]: string;
// }
// interface AnnualIncome {
//   income_id: number;
//   income_description: string;
// }
// export interface State {
//   state_id: string;
//   state_name: string;
// }
// export interface ProfileType {
//   profile_id: string;
//   profile_name: string;
//   profile_img: ProfileImage;
//   profile_age: number;
//   profile_gender: 'male' | 'female';
//   height: string;
//   weight: number | null;
//   degree: string;
//   star: string;
//   profession: string;
//   location: string;
//   photo_protection: number;
//   matching_score: number;
//   wish_list: number;
//   verified: number;
// }

// const columns = [
//   { id: 'profile_img', label: 'Image' },
//   { id: 'profile_id', label: 'Profile ID' },
//   { id: 'profile_name', label: 'Name' },
//   { id: 'profile_age', label: 'Age' },
//   { id: 'profile_gender', label: 'Gender' },
//   { id: 'height', label: 'Height' },
//   { id: 'weight', label: 'Weight' },
//   { id: 'degree', label: 'Degree' },
//   { id: 'profession', label: 'Profession' },
//   { id: 'location', label: 'Location' },
//   { id: 'star', label: 'Star' },
//   { id: 'matching_score', label: 'Matching Score' },
//   { id: 'verified', label: 'Verified' },
// ];
// interface MaritalStatusOption {
//   marital_sts_id: string;
//   marital_sts_name: string;
// }

// export default function SuggestedProfile() {

//   const [profileData, setProfileData] = useState<ProfileType[]>([]);
//   console.log("1lp", profileData);

//   const [page, setPage] = useState<number>(0); // Zero-based page index for MUI
//   const [rowsPerPage, setRowsPerPage] = useState<number>(10); // Rows per page
//   const [totalRecords, setTotalRecords] = useState<number>(0); // Total record count
//   const [maritialStatus, setMaritialStatus] = useState<MaritalStatusOption[]>(
//     [],
//   );
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const profileId = queryParams.get('profileId');
//   const [selectedAnnualIncomes, setSelectedAnnualIncomes] = useState<string[]>(
//     [],
//   );
//   const navigate = useNavigate();
//   const { data: profession } = useQuery({
//     queryKey: ['profession'],
//     queryFn: getProfession,
//   });
//   const { data: State } = useQuery({
//     queryKey: ['State'],
//     queryFn: () => fetchStateStatus("1"),

//   });

//   const [annualIncome, setAnnualIncome] = useState<AnnualIncome[]>([]);
//   // Fetch profiles from the server
//   const getProfileListMatch = async (
//     id: string | null,
//     pageNumber: number,
//     perPage: number,
//   ) => {
//     try {
//       const response = await axios.post(`${suggestedProfileApi}`, {
//         profile_id: id,
//         page_number: pageNumber + 1, // Backend expects 1-based page index
//         per_page: perPage,
//       });

//       const data = response.data.profiles as ProfileType[];
//       setProfileData(data);
//       setTotalRecords(response.data.total_count); // Update total records for pagination
//     } catch (error) {
//       console.error('Error fetching profile details:', error);
//     }
//   };

//   // Fetch profile list when profileId or page/filter changes
//   useEffect(() => {
//     getProfileListMatch(profileId, page, rowsPerPage);
//   }, [profileId, page, rowsPerPage]);

//   // Handle page change
//   const handleChangePage = (_event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   // Handle rows per page change
//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement>,
//   ) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0); // Reset page to the first page when rows per page changes
//   };
//   const { data: MaritalStatuses } = useQuery({
//     queryKey: ['MaritalStatuses'],
//     queryFn: fetchMaritalStatuses,
//   });

//   const { data: GetHighestEducation } = useQuery<GetHighestEducation[]>({
//     queryKey: ['GetHighestEducation'],
//     queryFn: fetchGetHighestEducation,
//   });
//   const handleAnnualIncomeChange = (id: string, isChecked: boolean) => {
//     setSelectedAnnualIncomes((prev) =>
//       isChecked ? [...prev, id] : prev.filter((incId) => incId !== id),
//     );
//   };
//   const [selectedMaritalStatuses, setSelectedMaritalStatuses] = useState<
//     string[]
//   >([]);
//   const handleMaritalStatusChange = (id: string, isChecked: boolean) => {
//     setSelectedMaritalStatuses((prev) =>
//       isChecked ? [...prev, id] : prev.filter((statusId) => statusId !== id),
//     );
//   };
//   useEffect(() => {
//     const fetchAnnualIncome = async () => {
//       try {
//         const response = await axios.post(
//           `${annualIncomeApi}`,
//         );
//         const options = Object.values(response.data) as AnnualIncome[];
//         setAnnualIncome(options);
//       } catch (error) {
//         console.error('Error fetching Annual Income options:', error);
//       }
//     };
//     fetchAnnualIncome();
//   }, []);
//   const [selectedProfessions, setSelectedProfessions] = useState<number[]>([]);

//   // Function to handle the change of checkboxes
//   const handleProfessionChange = (professionId: number) => {
//     setSelectedProfessions((prevSelected) => {
//       // Check if the profession is already selected
//       if (prevSelected.includes(professionId)) {
//         // If already selected, remove it from the array
//         return prevSelected.filter((id) => id !== professionId);
//       } else {
//         // If not selected, add it to the array
//         return [...prevSelected, professionId];
//       }
//     });
//   };
//   const [eduPref, setEduPref] = useState<EduPref[]>([]);
//   const [selectedEducations, setSelectedEducations] = useState<string[]>([]);
//   const handleEducationChange = (id: string, isChecked: boolean) => {
//     setSelectedEducations((prev) =>
//       isChecked ? [...prev, id] : prev.filter((eduId) => eduId !== id),
//     );
//   };

//   useEffect(() => {
//     const fetchEduPref = async () => {
//       try {
//         const response = await axios.post(
//           `${educationalPrefApi}`,
//         );
//         const options = Object.values(response.data) as EduPref[];
//         console.log(options);
//         setEduPref(options);
//       } catch (error) {
//         console.error('Error fetching Edu Pref options:', error);
//       }
//     };
//     fetchEduPref();
//   }, []);


//   const [goToPageInput, setGoToPageInput] = useState<string>('');

//   const handleGoToPage = () => {
//     const pageNumber = parseInt(goToPageInput, 10);
//     if (!isNaN(pageNumber)) {
//       const lastPage = Math.ceil(totalRecords / rowsPerPage) - 1;
//       const newPage = Math.max(0, Math.min(pageNumber - 1, lastPage));
//       setPage(newPage);
//       setGoToPageInput('');
//     }
//   };


//   return (
//     <div>

//       {profileData ? (
//         <>

//           <Typography
//             sx={{
//               marginBottom: '20px',
//               color: 'black',
//               fontSize: '1.5rem',
//               fontWeight: 'bold',
//             }}
//           >
//             Suggested Profile Lists For Profile Id {profileId}
//           </Typography>
//           <div>
//             <div className="container mx-auto p-4 ">
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                 {/* Age Difference */}
//                 <div className="flex flex-col">
//                   <label className="text-[18px] text-black font-semibold mb-2">
//                     Age Difference
//                   </label>
//                   <input
//                     onKeyDown={(e) => {
//                       const allowedKeys = [
//                         '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+',
//                         'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete',
//                       ];
//                       const inputValue = (e.target as HTMLInputElement).value;
//                       if (!allowedKeys.includes(e.key) || (inputValue.length >= 2 && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(e.key))) {
//                         e.preventDefault();
//                       }
//                     }}
//                     className="w-full px-4 py-2 border border-black rounded"
//                   />
//                 </div>

//                 {/* Height from */}
//                 <div className="flex flex-col">
//                   <label className="text-[18px] text-black font-semibold mb-2">
//                     Height from
//                   </label>
//                   <input className="w-full px-4 py-2 border border-black rounded" />
//                 </div>

//                 {/* Sarpa Dhosham */}
//                 <div className="flex flex-col">
//                   <label className="text-[18px] text-black font-semibold mb-2">
//                     Sarpa Dhosham
//                   </label>
//                   <select className="w-full outline-none px-4 py-2.5 border border-black rounded">
//                     <option value="" disabled>-- Select Sarpa Dhosham --</option>
//                     <option value="Unknown">Unknown</option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                   </select>
//                 </div>

//                 {/* Chevvai Dhosam */}
//                 <div className="flex flex-col">
//                   <label className="text-[18px] text-black font-semibold mb-2">
//                     Chevvai Dhosam
//                   </label>
//                   <select className="w-full outline-none px-4 py-2.5 border border-black rounded">
//                     <option value="" disabled>-- Select Chevvai Dhosam --</option>
//                     <option value="Unknown">Unknown</option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                   </select>
//                 </div>

//                 {/* State Selection */}
//                 <div className="flex flex-col">
//                   <label className="text-[18px] text-black font-semibold mb-2">
//                     State
//                   </label>
//                   <select className="w-full outline-none px-4 py-2.5 border border-black rounded">
//                     <option value="" disabled>-- Select State --</option>
//                     {State?.map((option: State) => (
//                       <option key={option.state_id} value={option.state_id}>
//                         {option.state_name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <div className='mt-2'>
//                 <label className="text-[18px] text-black font-semibold mb-2">
//                   Education
//                 </label>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
//                   {eduPref.map((option) => (
//                     <div key={option.Edu_Pref_id} className="flex items-center">
//                       <input
//                         type="checkbox"
//                         id={`education-${option.Edu_Pref_id}`}
//                         value={option.Edu_Pref_id.toString()}
//                         checked={selectedEducations.includes(
//                           option.Edu_Pref_id.toString(),
//                         )}
//                         onChange={(e) =>
//                           handleEducationChange(
//                             option.Edu_Pref_id.toString(),
//                             e.target.checked,
//                           )
//                         }
//                       />
//                       <label
//                         htmlFor={`education-${option.Edu_Pref_id}`}
//                         className="pl-1"
//                       >
//                         {option.Edu_name}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className='mt-5 '>
//                 <h5 className="text-[18px] text-black font-semibold mb-2">
//                   Marital Status
//                 </h5>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                   {MaritalStatuses?.map((status: any) => (
//                     <div key={status.marital_sts_id}>
//                       <input
//                         type="checkbox"
//                         id={`maritalStatus-${status.marital_sts_id}`}
//                         value={status.marital_sts_id.toString()}
//                         checked={selectedMaritalStatuses.includes(
//                           status.marital_sts_id.toString(),
//                         )}
//                         onChange={(e) =>
//                           handleMaritalStatusChange(
//                             status.marital_sts_id.toString(),
//                             e.target.checked,
//                           )
//                         }
//                       />
//                       <label htmlFor={`maritalStatus-${status.marital_sts_id}`}>
//                         {status.marital_sts_name}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className=' mt-5 flex gap-2'>
//               <div className="w-full">
//                 <h5 className="text-[18px] text-black font-semibold mb-2">
//                   Profession
//                 </h5>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
//                   {profession?.map((profession: ProfessionPref) => (
//                     <div key={profession.Profes_Pref_id}>
//                       <input
//                         type="checkbox"
//                         id={`profession-${profession.Profes_Pref_id}`}
//                         // {...register('professionPreference')} // Assuming you're using react-hook-form
//                         value={profession.Profes_name}
//                         checked={selectedProfessions.includes(
//                           profession.Profes_Pref_id,
//                         )}
//                         onChange={() =>
//                           handleProfessionChange(profession.Profes_Pref_id)
//                         }

//                       />
//                       <label
//                         htmlFor={`profession-${profession.Profes_Pref_id}`}
//                         className="pl-1"
//                       >
//                         {profession.Profes_name}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//                 {/* {errors.professionPreference && (
//                   <span className="text-red-500">
//                     {errors.professionPreference.message}
//                   </span>
//                 )} */}
//               </div>


//             </div>
//             <div className='mt-5 mb-10'>
//               <label className="text-[18px] text-black font-semibold mb-2">
//                 Annual Income
//               </label>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//                 {annualIncome.map((option) => (
//                   <div
//                     key={option.income_id}
//                     className="mb-2 flex items-center"
//                   >
//                     <input
//                       type="checkbox"
//                       id={`annualIncome-${option.income_id}`}
//                       value={option.income_id.toString()}
//                       checked={selectedAnnualIncomes.includes(
//                         option.income_id.toString(),
//                       )}
//                       onChange={(e) =>
//                         handleAnnualIncomeChange(
//                           option.income_id.toString(),
//                           e.target.checked,
//                         )
//                       }
//                     />
//                     <label
//                       htmlFor={`annualIncome-${option.income_id}`}
//                       className="pl-1"
//                     >
//                       {option.income_description}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>

//           </div>
//           <Paper className="w-full">
//             <TableContainer
//               sx={{ border: '1px solid #E0E0E0' }}
//               component={Paper}
//             >
//               <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                 <TableHead style={{ background: '#FFF9C9', padding: '17px' }}>
//                   <TableRow>
//                     {columns.map((column) => (
//                       <TableCell
//                         sx={{
//                           borderBottom: '1px solid #E0E0E0',

//                           color: '#ee3448',
//                           fontWeight: 'bold',
//                           fontSize: '1rem',
//                           whiteSpace: 'nowrap',
//                         }}
//                         key={column.id}
//                       >
//                         {column.label}
//                       </TableCell>
//                     ))}
//                     {/* <TableCell>Action</TableCell> */}
//                   </TableRow>
//                 </TableHead>

//                 <TableBody>
//                   {profileData?.map((row) => (
//                     <TableRow
//                       key={row.profile_id}
//                       sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                     >
//                       <TableCell>
//                         {row.profile_img ? (
//                           <img
//                             className="rounded-full"
//                             // src={row.profile_img}
//                             src={typeof row.profile_img === 'string' ? row.profile_img : No_Image_Available}
//                             alt="Profile"
//                             width={80}
//                             onError={(e) => {
//                               (e.target as HTMLImageElement).src = No_Image_Available;
//                             }}
//                           />
//                         ) : (
//                           <img
//                             className="rounded-full"
//                             src={No_Image_Available}
//                             alt="No Profile"
//                             width={80}
//                           />
//                         )}
//                       </TableCell>

//                       <TableCell
//                         onClick={() =>
//                           navigate(
//                             `/viewProfile?profileId=${row.profile_id}`,
//                           )
//                         }
//                         sx={{
//                           color: 'blue',
//                           cursor: 'pointer',
//                           textDecoration: 'none', '&:hover': { textDecoration: 'underline' }
//                         }}
//                       >{row.profile_id}</TableCell>
//                       <TableCell>{row.profile_name}</TableCell>
//                       <TableCell>{row.profile_age}</TableCell>
//                       <TableCell>{row.profile_gender}</TableCell>
//                       <TableCell>{row.height}</TableCell>
//                       <TableCell>{row.weight || 'N/A'}</TableCell>
//                       <TableCell>{row.degree}</TableCell>
//                       <TableCell>{row.profession}</TableCell>
//                       <TableCell>{row.location}</TableCell>
//                       <TableCell>{row.star}</TableCell>
//                       <TableCell>{row.matching_score}</TableCell>
//                       <TableCell>
//                         {row.verified === 0 ? (
//                           <MdVerified className="text-green-600" />
//                         ) : (
//                           <GoUnverified className="text-red-600" />
//                         )}
//                       </TableCell>
//                       {/* <TableCell>
//                   <Button
//                     onClick={() =>
//                       navigate(`/editProfile?profileId=${row.profile_id}`)
//                     }
//                   >
//                     Edit
//                   </Button>
//                   <Button>Delete</Button>
//                 </TableCell> */}
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//           {/* <TablePagination
//           showFirstButton showLastButton
//             rowsPerPageOptions={[5, 10, 25, 100]}
//             component="div"
//             count={totalRecords}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//          */}
//           {/* {
//            Math.ceil(totalRecords / rowsPerPage) > 0 &&  (
            
// <div className="flex items-center justify-between gap-2 mt-4">
//   <div>
// <span className="ml-4">
//     Page {page + 1} of {Math.ceil(totalRecords / rowsPerPage)}
//   </span>
//   </div>
//   <div>
//     <button
//     onClick={() => handleChangePage(null, 0)}
//     disabled={page === 0}
//     className={`px-3 py-1 border rounded ${page === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
//   >
//     {"<<"}
//   </button>
  
//   <button
//     onClick={() => handleChangePage(null, page - 1)}
//     disabled={page === 0}
//     className={`px-3 py-1 border rounded ${page === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
//   >
//     PREV
//   </button>
  
//   {Array.from({ length: Math.min(5, Math.ceil(totalRecords / rowsPerPage)) }, (_, i) => {
//     // Show pages around current page
//     let pageToShow;
//     if (Math.ceil(totalRecords / rowsPerPage) <= 5) {
//       pageToShow = i;
//     } else if (page <= 2) {
//       pageToShow = i;
//     } else if (page >= Math.ceil(totalRecords / rowsPerPage) - 3) {
//       pageToShow = Math.ceil(totalRecords / rowsPerPage) - 5 + i;
//     } else {
//       pageToShow = page - 2 + i;
//     }
    
//     return (
//       <button
//         key={pageToShow}
//         onClick={() => handleChangePage(null, pageToShow)}
//         className={`px-3 py-1 border rounded ${page === pageToShow ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
//       >
//         {pageToShow + 1}
//       </button>
//     );
//   })}
  
//   <button
//     onClick={() => handleChangePage(null, page + 1)}
//     disabled={page >= Math.ceil(totalRecords / rowsPerPage) - 1}
//     className={`px-3 py-1 border rounded ${page >= Math.ceil(totalRecords / rowsPerPage) - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
//   >
//     Next
//   </button>
  
//   <button
//     onClick={() => handleChangePage(null, Math.ceil(totalRecords / rowsPerPage) - 1)}
//     disabled={page >= Math.ceil(totalRecords / rowsPerPage) - 1}
//     className={`px-3 py-1 border rounded ${page >= Math.ceil(totalRecords / rowsPerPage) - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
//   >
//     {">>"}
//   </button>
  
//   </div>
// </div>

//           )
//          } */}

//           {
//             Math.ceil(totalRecords / rowsPerPage) > 0 && (
//               <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
//                 <div className="text-sm text-gray-600">
//                   Showing page {page + 1} of {Math.ceil(totalRecords / rowsPerPage)} • Total {totalRecords} records
//                 </div>

//                 <div className="flex items-center gap-1">

//                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px' }}>
//                     <Typography variant="body2">Go to page:</Typography>
//                     <TextField
//                       size="small"
//                       type="number"
//                       value={goToPageInput}
//                       onChange={(e) => setGoToPageInput(e.target.value)}
//                       inputProps={{
//                         min: 1,
//                         max: Math.ceil(totalRecords / rowsPerPage),
//                       }}
//                       style={{ width: '80px' }}
//                     />
//                     <Button
//                       variant="contained"
//                       size="small"
//                       onClick={handleGoToPage}
//                       disabled={!goToPageInput}
//                     >
//                       Go
//                     </Button>
//                   </div>
//                   {/* First Page */}
//                   <button
//                     onClick={() => handleChangePage(null, 0)}
//                     disabled={page === 0}
//                     className={`p-2 rounded-md ${page === 0
//                       ? 'text-gray-400 cursor-not-allowed'
//                       : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'}`}
//                     aria-label="First page"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//                     </svg>
//                   </button>

//                   {/* Previous Page */}
//                   <button
//                     onClick={() => handleChangePage(null, page - 1)}
//                     disabled={page === 0}
//                     className={`px-3 py-1 rounded-md flex items-center gap-1 ${page === 0
//                       ? 'text-gray-400 cursor-not-allowed'
//                       : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'}`}
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
//                     </svg>
//                     <span>Prev</span>
//                   </button>

//                   {/* Page Numbers */}
//                   <div className="flex items-center gap-1">
//                     {Array.from({ length: Math.min(5, Math.ceil(totalRecords / rowsPerPage)) }, (_, i) => {
//                       let pageToShow;
//                       if (Math.ceil(totalRecords / rowsPerPage) <= 5) {
//                         pageToShow = i;
//                       } else if (page <= 2) {
//                         pageToShow = i;
//                       } else if (page >= Math.ceil(totalRecords / rowsPerPage) - 3) {
//                         pageToShow = Math.ceil(totalRecords / rowsPerPage) - 5 + i;
//                       } else {
//                         pageToShow = page - 2 + i;
//                       }

//                       return (
//                         <button
//                           key={pageToShow}
//                           onClick={() => handleChangePage(null, pageToShow)}
//                           className={`w-10 h-10 rounded-md flex items-center justify-center ${page === pageToShow
//                               ? 'bg-blue-600 text-white font-medium'
//                               : 'text-gray-700 hover:bg-gray-100'
//                             }`}
//                         >
//                           {pageToShow + 1}
//                         </button>
//                       );
//                     })}
//                   </div>

//                   {/* Next Page */}
//                   <button
//                     onClick={() => handleChangePage(null, page + 1)}
//                     disabled={page >= Math.ceil(totalRecords / rowsPerPage) - 1}
//                     className={`px-3 py-1 rounded-md flex items-center gap-1 ${page >= Math.ceil(totalRecords / rowsPerPage) - 1
//                         ? 'text-gray-400 cursor-not-allowed'
//                         : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
//                       }`}
//                   >
//                     <span>Next</span>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                     </svg>
//                   </button>

//                   {/* Last Page */}
//                   <button
//                     onClick={() => handleChangePage(null, Math.ceil(totalRecords / rowsPerPage) - 1)}
//                     disabled={page >= Math.ceil(totalRecords / rowsPerPage) - 1}
//                     className={`p-2 rounded-md ${page >= Math.ceil(totalRecords / rowsPerPage) - 1
//                         ? 'text-gray-400 cursor-not-allowed'
//                         : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
//                       }`}
//                     aria-label="Last page"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                       <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                     </svg>
//                   </button>



//                 </div>
//               </div>
//             )
//           }

//         </>
//       ) : (
//         <Typography
//           sx={{
//             marginBottom: '20px',
//             color: 'black',
//             fontSize: '1.5rem',
//             fontWeight: 'bold',
//           }}
//         >
//           No Matching Data
//         </Typography>
//       )}
//     </div>
//   );
// }

import { ProfilesPage } from "./MatchingFilterAndTable/ProfilesPage";
import No_Image_Available from '../images/No_Image_Available .jpg';
 const SuggestedProfiles = () => {
    return <ProfilesPage profileType="suggested" No_Image_Available={No_Image_Available} Name={"Suggested"}/>;
};
 
 
export default SuggestedProfiles;
