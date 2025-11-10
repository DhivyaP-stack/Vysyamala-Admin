// import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { useFormContext } from "react-hook-form";
// import { annualIncomeApi, educationalPrefApi, fetchFamilyStatus, fetchMaritalStatuses, fetchMatchPreferences, getProfession, StatePref } from "../../../action";
// import { useQuery } from "@tanstack/react-query";
// import axios from 'axios';
// import MatchingStars from "./EditMatchingStar";
// import { suggestedProfile } from "../../../types/EditSchemaSuggestedProfile";
// import { string } from "zod";
// import { apiAxios } from "../../../api/apiUrl";
// import Select from 'react-select';

// interface ProfessionPref {
//   Profes_Pref_id: number;
//   Profes_name: string;
// }

// interface EduPref {
//   Edu_Pref_id: number;
//   Edu_name: string;
// }


// interface AnnualIncome {
//   income_id: number;
//   income_description: string;
// }


// export interface SelectedStarIdItem {
//   id: string;
//   rasi: string;
//   star: string;
//   label: string;
// }

// interface EditSuggestedProfileProps {

//   EditData: any;
//   gender: string;
//   birthStarId: string;
//   setPrefProf: Dispatch<SetStateAction<string>>;
//   setprefEducation: Dispatch<SetStateAction<string>>;
//   selectSetMaridStatus: Dispatch<SetStateAction<string>>;
//   setAnnualIncomesVal: Dispatch<SetStateAction<string>>;
//   setAnnualIncomesValmax: React.Dispatch<React.SetStateAction<string[]>>;
//   setPorutham: Dispatch<SetStateAction<string>>;
//   setPreforuthamStar: Dispatch<SetStateAction<string>>;
//   isSuggestedProfileOpen: boolean;
//   setIsSuggestedProfileOpen: Dispatch<SetStateAction<boolean>>;
//   setFamilyStatusSuggested: Dispatch<SetStateAction<string>>
//   setPrefferedStateSuggested: Dispatch<SetStateAction<string>>

// }


// interface HoroscopeDetails {
//   birth_rasi_name: string;
//   birthstar_name: string
// }
// interface gender {
//   "Gender": string,
// }

// // Add these interfaces near your other type definitions
// interface FieldOfStudy {
//   study_id: number;
//   study_description: string;
// }

// interface Degree {
//   degeree_id: number;
//   degeree_description: string;
// }
// const EditSuggestedProfile: React.FC<EditSuggestedProfileProps> = ({
//   setPrefProf,
//   EditData,
//   setPreforuthamStar,
//   setPorutham,
//   setAnnualIncomesVal,
//   setprefEducation,
//   selectSetMaridStatus,
//   birthStarId,
//   gender,
//   isSuggestedProfileOpen,
//   setIsSuggestedProfileOpen,
//   setFamilyStatusSuggested,
//   setPrefferedStateSuggested
// }) => {
//   const {
//     register,
//     setValue,
//     watch,
//     formState: { errors },
//     trigger,
//   } = useFormContext<suggestedProfile>();

//   //const [annualIncome, setAnnualIncome] = useState<AnnualIncome[]>([]);

//   const [EditProfession, setEditProfession] = useState('');
//   const [EditEducation, setEditEducation] = useState('');
//   const [editMartualStatus, setEditMartualStatus] = useState('');
//   const [EditAnnualIncome, setEditAnnualIncome] = useState('');
//   const [edit3, setEdit3] = useState<HoroscopeDetails>()
//   // const [edit0,setEdit0]=useState<gender>()
//   const [selectedStarIds, setSelectedStarIds] = useState<SelectedStarIdItem[]>([]);
//   console.log(selectedStarIds)
//   // const [selectedFamilyStatus, setSelectedFamilyStatus] = useState('');
//   // const [selectedPrefState, setSelectedPrefState] = useState('');
//   const [editFamilyStatus, setEditFamilyStatus] = useState('');
//   const [editPrefState, setEditPrefState] = useState('');
//   // const [selectedStarIds, setSelectedStarIds] = useState<SelectedStarIdItem[]>(
//   //     [],
//   //   );
//   const [eduPref, setEduPref] = useState<EduPref[]>([]);
//   // Add these to your existing state declarations
//   const [fieldOfStudyOptions, setFieldOfStudyOptions] = useState<FieldOfStudy[]>([]);
//   const [degreeOptions, setDegreeOptions] = useState<Degree[]>([]);
//   const [selectedFieldsOfStudy, setSelectedFieldsOfStudy] = useState<string[]>([]);
//   const [selectedDegrees, setSelectedDegrees] = useState<string[]>([]);

//   const toggleSection = () => {
//     setIsSuggestedProfileOpen(!isSuggestedProfileOpen);
//   };
//   useEffect(() => {
//     if (EditData && EditData.length > 0) {
//       setEdit3(EditData[3]);
//       //setEdit0(EditData[0])
//     }
//   }, [EditData]);


//   const starArray = selectedStarIds.map((item) => item.id);
//   const starRasiArray = selectedStarIds.map(
//     (item) => `${item.star}-${item.rasi}`,
//   );
//   console.log(`starRasiArray`, starRasiArray)
//   const StarString = starArray.join(',');
//   const combinedString = starRasiArray.join(',');
//   console.log(starArray, "starArray")
//   console.log(StarString, 'StarString');
//   console.log(combinedString, ' combinedString ');

//   useEffect(() => {
//     setPreforuthamStar(combinedString);
//     setPorutham(StarString);
//     // Set the values for validation
//     setValue('suggested_pref_details.pref_porutham_star', StarString);
//     setValue('suggested_pref_details.pref_porutham_star_rasi', combinedString);
//     // Trigger validation after setting values
//     trigger(['suggested_pref_details.pref_porutham_star', 'suggested_pref_details.pref_porutham_star_rasi']);
//   }, [StarString, combinedString, setValue, trigger]);
//   const rasiId: string = edit3?.birth_rasi_name as string;

//   const starId: string = edit3?.birthstar_name as string;
//   // const gender:string = edit0?.Gender as string;
//   console.log(gender)
//   const { data: profession } = useQuery({
//     queryKey: ['profession'],
//     queryFn: getProfession,
//   });
//   const { data: MaritalStatuses } = useQuery({
//     queryKey: ['MaritalStatuses'],
//     queryFn: fetchMaritalStatuses,
//   });

//   const handleProfessionChange = (id: number) => {
//     let currentProfessions = EditProfession ? EditProfession.split(',') : [];

//     const professionIndex = currentProfessions.indexOf(`${id}`);

//     if (professionIndex === -1) {
//       // Add the profession to the list
//       currentProfessions.push(`${id}`);
//     } else {
//       // Remove the profession from the list
//       currentProfessions.splice(professionIndex, 1);
//     }

//     // Filter out any empty values and join them without extra commas
//     setEditProfession(currentProfessions.filter(Boolean).join(','));
//   };


//   const handleEducationChange = (id: string) => {
//     let currentEducation = EditEducation ? EditEducation.split(',') : [];

//     const index = currentEducation.indexOf(id);

//     if (index === -1) {
//       // Add the education to the list
//       currentEducation.push(id);
//     } else {
//       // Remove the education from the list
//       currentEducation.splice(index, 1);
//     }

//     // Filter out any empty values and join them into a string
//     setEditEducation(currentEducation.filter(Boolean).join(','));
//   };

//   const [annualIncome, setAnnualIncome] = useState<AnnualIncome[]>([]);
//   console.log(annualIncome)

//   const { data: matchStars } = useQuery({
//     queryKey: ['matchStars'],
//     queryFn: () => fetchMatchPreferences(rasiId, starId, gender),
//     enabled: !!rasiId && !!gender,
//   });
//   console.log(matchStars)
//   useEffect(() => {
//     const fetchEduPref = async () => {
//       try {
//         const response = await axios.post(`${educationalPrefApi}`);
//         const options = Object.values(response.data) as EduPref[];

//         setEduPref(options);
//       } catch (error) {
//         console.error('Error fetching Edu Pref options:', error);
//       }
//     };
//     const fetchFieldOfStudy = async () => {
//       try {
//         const response = await axios.post(`https://app.vysyamala.com/auth/Get_Field_ofstudy/`);
//         const options = Object.values(response.data) as FieldOfStudy[];
//         setFieldOfStudyOptions(options);
//       } catch (error) {
//         console.error('Error fetching Field of Study options:', error);
//       }
//     };

//     const fetchDegrees = async () => {
//       try {
//         const response = await axios.get(`https://app.vysyamala.com/auth/pref_degree_list/`);
//         const options = Object.values(response.data) as Degree[];
//         setDegreeOptions(options);
//       } catch (error) {
//         console.error('Error fetching Degree options:', error);
//       }
//     };

//     fetchFieldOfStudy();
//     fetchDegrees();
//     fetchEduPref();
//   }, []);


//   useEffect(() => {
//     const fetchAnnualIncome = async () => {
//       try {
//         const response = await axios.post(`${annualIncomeApi}`);
//         const options = Object.values(response.data) as AnnualIncome[];
//         setAnnualIncome(options);
//       } catch (error) {
//         console.error('Error fetching Annual Income options:', error);
//       }
//     };
//     fetchAnnualIncome();
//   }, []);

//   const handleMaritalStatusChange = (id: number) => {
//     let currentMarriedStatus = editMartualStatus
//       ? editMartualStatus.split(',')
//       : [];

//     const index = currentMarriedStatus.indexOf(`${id}`);

//     if (index === -1) {
//       // Add the status to the list
//       currentMarriedStatus.push(`${id}`);
//     } else {
//       // Remove the status from the list
//       currentMarriedStatus.splice(index, 1);
//     }

//     // Filter out any empty values and join them without extra commas
//     setEditMartualStatus(currentMarriedStatus.filter(Boolean).join(','));
//   };

//   const handleAnnualIncomeChange = (id: string) => {
//     let currentAnnualIncome = EditAnnualIncome
//       ? EditAnnualIncome.split(',')
//       : [];

//     const index = currentAnnualIncome.indexOf(id);

//     if (index === -1) {
//       // Add the income ID to the list
//       currentAnnualIncome.push(id);
//     } else {
//       // Remove the income ID from the list
//       currentAnnualIncome.splice(index, 1);
//     }

//     // Filter out any empty values and join them into a string
//     setEditAnnualIncome(currentAnnualIncome.filter(Boolean).join(','));
//   };

//   const handleCheckboxChange = (updatedIds: SelectedStarIdItem[]) => {
//     setSelectedStarIds(updatedIds);
//   };
//   const selectedFamilyStatuss = watch("suggested_pref_details.pref_family_status");
//   const selectedPrefStatee = watch("suggested_pref_details.pref_state");

//   useEffect(() => {
//     if (EditData) {
//       setValue('suggested_pref_details.pref_height_from', EditData[8].pref_height_from || '');
//       setValue('suggested_pref_details.pref_height_to', EditData[8].pref_height_to || '');
//       setValue(
//         'suggested_pref_details.pref_age_differences',
//         EditData[8].pref_age_differences || ''
//       );
//       setValue('suggested_pref_details.pref_chevvai', EditData[8].pref_chevvai || '');
//       setValue('suggested_pref_details.pref_ragukethu', EditData[8].pref_ragukethu || '');
//       setValue(
//         'suggested_pref_details.pref_foreign_intrest',
//         EditData[8].pref_foreign_intrest || ''
//       );
//       setValue('suggested_pref_details.pref_anual_income', EditData[8].pref_anual_income || '');
//       setValue('suggested_pref_details.pref_anual_income_max', EditData[8].pref_anual_income_max || '');
//       setValue('suggested_pref_details.pref_family_status', EditData[8].pref_family_status || '');
//       setValue('suggested_pref_details.pref_state', EditData[8].pref_state || '');
//       setEditFamilyStatus(EditData[8].pref_state || '')
//       setEditProfession(EditData[8].pref_profession || '');
//       setEditMartualStatus(EditData[8].pref_marital_status || '');
//       setEditEducation(EditData[8].pref_education || '');
//       setEditAnnualIncome(EditData[8].pref_anual_income || '');
//       setValue('suggested_pref_details.pref_state', EditData[8].pref_state || '');
//       setEditPrefState(EditData[8].pref_state || ''); // Use the new state setter


//       if (EditData[8].pref_fieldof_study) {
//         const fields = EditData[8].pref_fieldof_study.split(',');
//         setSelectedFieldsOfStudy(fields);
//         setValue('suggested_pref_details.pref_fieldof_study', fields.join(','));
//       }

//       if (EditData[8].degree) {
//         const degrees = EditData[8].degree.split(',');
//         setSelectedDegrees(degrees);
//         setValue('suggested_pref_details.degree', degrees.join(','));
//       }
//       // Handle matching stars from API response
//       if (EditData[8].pref_porutham_star && EditData[8].pref_porutham_star_rasi) {
//         const selectedStarIdsFromAp = EditData[8].pref_porutham_star.split(',');
//         const selectedStarIdsFromApi = EditData[8].pref_porutham_star_rasi
//           .split(',')
//           .map((rasiStar: string, index: number) => {
//             const [star, rasi] = rasiStar.split('-');
//             return {
//               id: selectedStarIdsFromAp[index]?.trim() ?? "",
//               star: star ? star.trim() : "",
//               rasi: rasi ? rasi.trim() : "",
//               label: "",
//             };
//           });

//         setSelectedStarIds(selectedStarIdsFromApi);
//         setValue('suggested_pref_details.pref_porutham_star', EditData[8].pref_porutham_star);
//         setValue('suggested_pref_details.pref_porutham_star_rasi', EditData[8].pref_porutham_star_rasi);
//       }
//     }
//   }, [EditData, setValue]);

//   useEffect(() => {
//     setAnnualIncomesVal(EditAnnualIncome);
//     selectSetMaridStatus(editMartualStatus);
//     setprefEducation(EditEducation);
//     setPrefProf(EditProfession);
//     setFamilyStatusSuggested(editFamilyStatus); // CHANGE THIS
//     setPrefferedStateSuggested(editPrefState); // CHANGE THIS
//   }, [EditProfession, editMartualStatus, EditEducation, editFamilyStatus, editPrefState]);


//   // Field of Study handler
//   const handleFieldOfStudyChange = (id: string) => {
//     setSelectedFieldsOfStudy(prev => {
//       const newFields = prev.includes(id)
//         ? prev.filter(fieldId => fieldId !== id)
//         : [...prev, id];
//       setValue('suggested_pref_details.pref_fieldof_study', newFields.join(','));
//       return newFields;
//     });
//   };

//   // Degree handler
//   const handleDegreeChange = (id: string) => {
//     setSelectedDegrees(prev => {
//       const newDegrees = prev.includes(id)
//         ? prev.filter(degreeId => degreeId !== id)
//         : [...prev, id];
//       setValue('suggested_pref_details.degree', newDegrees.join(','));
//       return newDegrees;
//     });
//   };

//   // Select All handlers
//   const handleSelectAllFieldOfStudy = () => {
//     if (!fieldOfStudyOptions || fieldOfStudyOptions.length === 0) return;
//     const allIds = fieldOfStudyOptions.map(f => f.study_id.toString());
//     const isAllSelected = selectedFieldsOfStudy.length === allIds.length;

//     if (isAllSelected) {
//       setSelectedFieldsOfStudy([]);
//       setValue('suggested_pref_details.pref_fieldof_study', '');
//     } else {
//       setSelectedFieldsOfStudy(allIds);
//       setValue('suggested_pref_details.pref_fieldof_study', allIds.join(','));
//     }
//   };

//   const handleSelectAllDegrees = () => {
//     if (!degreeOptions || degreeOptions.length === 0) return;
//     const allIds = degreeOptions.map(d => d.degeree_id.toString());
//     const isAllSelected = selectedDegrees.length === allIds.length;

//     if (isAllSelected) {
//       setSelectedDegrees([]);
//       setValue('suggested_pref_details.degree', '');
//     } else {
//       setSelectedDegrees(allIds);
//       setValue('suggested_pref_details.degree', allIds.join(','));
//     }
//   };
//   // Add this handler for Family Status
//   const handleFamilyStatusChange = (id: number) => {
//     const currentStatusIds = editFamilyStatus ? editFamilyStatus.split(',') : [];
//     const idString = id.toString();
//     const index = currentStatusIds.indexOf(idString);

//     if (index === -1) {
//       currentStatusIds.push(idString);
//     } else {
//       currentStatusIds.splice(index, 1);
//     }

//     const newStatusString = currentStatusIds.filter(Boolean).join(',');
//     setEditFamilyStatus(newStatusString);
//     setValue('suggested_pref_details.pref_family_status', newStatusString, { shouldValidate: true });
//   };

//   // Add this handler for Preferred State
//   const handleStateChange = (id: number) => {
//     const currentStatusIds = editPrefState ? editPrefState.split(',') : [];
//     const idString = id.toString();
//     const index = currentStatusIds.indexOf(idString);

//     if (index === -1) {
//       currentStatusIds.push(idString);
//     } else {
//       currentStatusIds.splice(index, 1);
//     }

//     const newStatusString = currentStatusIds.filter(Boolean).join(',');
//     setEditPrefState(newStatusString);
//     setValue('suggested_pref_details.pref_state', newStatusString, { shouldValidate: true });
//   };

//   const handleSelectAllProfessions = () => {
//     if (!profession) return;

//     // Check if all are already selected
//     const allSelected = profession.every((p: any) =>
//       EditProfession.split(',').includes(p.Profes_Pref_id.toString())
//     );

//     if (allSelected) {
//       // Deselect all
//       setEditProfession('');
//     } else {
//       // Select all
//       const allIds = profession.map((p: any) => p.Profes_Pref_id).join(',');
//       setEditProfession(allIds);
//     }
//   };


//   const handleSelectAllEducation = () => {
//     // Check if all are already selected
//     const allSelected = eduPref.every(e =>
//       EditEducation.split(',').includes(e.Edu_Pref_id.toString())
//     );

//     if (allSelected) {
//       // Deselect all
//       setEditEducation('');
//     } else {
//       // Select all
//       const allIds = eduPref.map(e => e.Edu_Pref_id).join(',');
//       setEditEducation(allIds);
//     }
//   };

//   const handleSelectAllMaritalStatus = () => {
//     if (!MaritalStatuses) return;

//     // Check if all are already selected
//     const allSelected = MaritalStatuses.every((m: any) =>
//       editMartualStatus.split(',').includes(m.marital_sts_id.toString())
//     );

//     if (allSelected) {
//       // Deselect all
//       setEditMartualStatus('');
//     } else {
//       // Select all
//       const allIds = MaritalStatuses.map((m: any) => m.marital_sts_id).join(',');
//       setEditMartualStatus(allIds);
//     }
//   };

//   const { data: FamilyStatus } = useQuery({
//     queryKey: ['FamilyStatus'],
//     queryFn: fetchFamilyStatus,
//   });

//   const [stateOptions, setStateOptions] = useState<StatePref[]>([]); // ✅ Typed useState
//   console.log("bqw", stateOptions)


//   useEffect(() => {
//     const fetchStatePreferences = async () => {
//       try {
//         const response = await axios.post(
//           `https://app.vysyamala.com/auth/Get_State_Pref/`
//         );

//         console.log("fffffffffffffffffffffff", response);

//         const data: StatePref[] = Object.values(response.data);
//         setStateOptions(data);
//         console.log("Fetched state options:", data); // ✅ this is the right place
//       } catch (error) {
//         console.error("Failed to fetch state preferences:", error);
//       }
//     };

//     fetchStatePreferences();
//   }, []);

//   return (
//     <div className="bg-white p-5 mb-10 rounded shadow-md">
//       <h4
//         className="text-red-600 flex row items-center justify-between text-xl cursor-pointer font-semibold dark:text-white"
//         onClick={toggleSection}
//       >
//         Suggested Profile
//         <svg
//           className={`fill-current transform ${isSuggestedProfileOpen ? "rotate-180" : ""}`}
//           width={"20"}
//           viewBox="0 0 20 20"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             fillRule="evenodd"
//             clipRule="evenodd"
//             d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
//             fill=""
//           ></path>
//         </svg>
//       </h4>

//       {isSuggestedProfileOpen && (
//         <div className="flex flex-col gap-5 pt-2">
//           <div className="flex w-full flex-row gap-4">
//             {/* Height */}
//             <div className="w-full">
//               <label className='text-[#5a5959e6] font-semibold'>Height From</label>
//               <input
//                 // {...register("heightFrom")}
//                 {...register('suggested_pref_details.pref_height_from')}
//                 className="w-full px-4 py-2 border text-[#5a5959e6] font-medium border-black rounded"
//               // placeholder="160"
//               />
//               {errors?.suggested_pref_details?.pref_height_from && (
//                 <p className="text-red-600">
//                   {errors.suggested_pref_details.pref_height_from.message}
//                 </p>
//               )}
//             </div>
//             <div className="w-full">
//               <label className='text-[#5a5959e6] font-semibold'>Height To</label>
//               <input
//                 {...register("suggested_pref_details.pref_height_to")}
//                 className="w-full px-4 py-2 border text-[#5a5959e6] font-medium border-black rounded"
//               //   placeholder="160"
//               />
//               {errors?.suggested_pref_details?.pref_height_to && (
//                 <p className="text-red-600">
//                   {errors.suggested_pref_details?.pref_height_to.message}
//                 </p>
//               )}
//             </div>

//             {/* Age Difference */}
//             <div className="w-full">
//               <label className='text-[#5a5959e6] font-semibold'>Age Difference</label>
//               <input
//                 {...register("suggested_pref_details.pref_age_differences")}
//                 className="w-full px-4 py-2 border text-[#5a5959e6] font-medium border-black rounded"
//               // placeholder="2"
//               />
//               {errors?.suggested_pref_details?.pref_age_differences && (
//                 <p className="text-red-600">
//                   {errors.suggested_pref_details.pref_age_differences.message}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="flex w-full flex-row gap-4">
//             {/* Chevvai */}
//             <div className="w-full">
//               <label className='text-black font-semibold'>Chevvai</label>
//               <select
//                 {...register("suggested_pref_details.pref_chevvai")}
//                 className="w-full px-4 py-2 border text-[#5a5959e6] font-medium border-black rounded"
//               >
//                 <option value="" className='pl-1 text-[#5a5959e6] font-medium'>Select</option>

//                 <option value="Yes" className='pl-1 text-[#000000e6] font-medium'>Yes</option>
//                 <option value="No" className='pl-1 text-[#000000e6] font-medium'>No</option>
//                 <option value="Both" className='pl-1 text-[#000000e6] font-medium'>Both</option>
//               </select>
//               {errors?.suggested_pref_details?.pref_chevvai && (
//                 <p className="text-red-600">
//                   {errors.suggested_pref_details.pref_chevvai.message}
//                 </p>
//               )}
//             </div>

//             {/* Rahu / Ketu */}
//             <div className="w-full">
//               <label className='text-black font-semibold'>Rahu / Ketu</label>
//               <select
//                 {...register("suggested_pref_details.pref_ragukethu")}
//                 className="w-full px-4 py-2 border text-[#000000e6] font-medium border-black rounded"
//               >
//                 <option value="" className='pl-1 text-[#000000e6] font-medium'>Select</option>

//                 <option value="Yes" className='pl-1 text-[#000000e6] font-medium'>Yes</option>
//                 <option value="No" className='pl-1 text-[#000000e6] font-medium'>No</option>
//                 <option value="Both" className='pl-1 text-[#000000e6] font-medium'>Both</option>
//               </select>
//               {errors?.suggested_pref_details?.pref_ragukethu && (
//                 <p className="text-red-600">
//                   {errors.suggested_pref_details.pref_ragukethu.message}
//                 </p>
//               )}
//             </div>

//             {/* Foreign Interest */}
//             <div className="w-full">
//               <label className='text-black font-semibold'>Foreign Interest</label>
//               <select

//                 {...register("suggested_pref_details.pref_foreign_intrest")}
//                 className="w-full px-4 py-2 border text-[#000000e6] font-medium border-black rounded"
//               >
//                 <option value="" className='pl-1 text-[#000000e6] font-medium'>Select</option>

//                 <option value="Yes" className='pl-1 text-[#000000e6] font-medium'>Yes</option>
//                 <option value="No" className='pl-1 text-[#000000e6] font-medium'>No</option>
//                 <option value="Both" className='pl-1 text-[#000000e6] font-medium'>Both</option>
//               </select>
//               {errors?.suggested_pref_details?.pref_foreign_intrest && (
//                 <p className="text-red-600">
//                   {errors.suggested_pref_details.pref_foreign_intrest.message}
//                 </p>
//               )}
//             </div>
//           </div>


//           <div className="w-full py-1">
//             <h5 className="text-[18px] text-black font-semibold mb-2 cursor-pointer">
//               Family Status
//             </h5>
//             <div className="flex flex-wrap gap-x-6 gap-y-2">
//               {FamilyStatus?.map((status) => (
//                 <div key={status.family_status_id} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={`suggested-family-status-${status.family_status_id}`}
//                     value={status.family_status_id}
//                     checked={(editFamilyStatus || '').split(',').includes(status.family_status_id.toString())}
//                     onChange={() => handleFamilyStatusChange(status.family_status_id)}
//                     className="mr-2"
//                   />
//                   <label
//                     htmlFor={`suggested-family-status-${status.family_status_id}`}
//                     className='text-[#000000e6] font-medium'
//                   >
//                     {status.family_status_name}
//                   </label>
//                 </div>
//               ))}
//             </div>
//             {errors?.suggested_pref_details?.pref_family_status && (
//               <p className="text-red-600 mt-1">
//                 {errors.suggested_pref_details.pref_family_status.message}
//               </p>
//             )}
//           </div>



//           <div className="w-full py-1">
//             <h5 className="text-[18px] text-black font-semibold mb-2 cursor-pointer">
//               Preferred State
//             </h5>
//             <div className="flex flex-wrap gap-x-6 gap-y-2">
//               {stateOptions?.map((state) => (
//                 <div key={state.State_Pref_id} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={`suggested-state-${state.State_Pref_id}`}
//                     value={state.State_Pref_id}
//                     checked={(editPrefState || '').split(',').includes(state.State_Pref_id.toString())}
//                     onChange={() => handleStateChange(state.State_Pref_id)}
//                     className="mr-2"
//                   />
//                   <label
//                     htmlFor={`suggested-state-${state.State_Pref_id}`}
//                     className='text-[#000000e6] font-medium'
//                   >
//                     {state.State_name}
//                   </label>
//                 </div>
//               ))}
//             </div>
//             {errors?.suggested_pref_details?.pref_state && (
//               <p className="text-red-600 mt-1">
//                 {errors.suggested_pref_details.pref_state.message}
//               </p>
//             )}
//           </div>



//           {/* Profession */}
//           <div className="col-span-2">
//             {/* <label>Profession</label> */}
//             <h5 className="text-[18px] text-black font-semibold mb-2 cursor-pointer" onClick={handleSelectAllProfessions}>
//               Profession
//             </h5>
//             <div className="flex justify-between items-center">
//               {profession?.map((profession: ProfessionPref) => (
//                 <div key={profession.Profes_Pref_id}>
//                   <input
//                     type="checkbox"
//                     id={`profession-${profession.Profes_Pref_id}`}
//                     value={profession.Profes_name}
//                     checked={EditProfession.split(',').includes(
//                       `${profession.Profes_Pref_id}`,
//                     )}
//                     onChange={() =>
//                       handleProfessionChange(profession.Profes_Pref_id)
//                     }
//                   />
//                   <label
//                     htmlFor={`profession-${profession.Profes_Pref_id}`}
//                     className='pl-1 text-[#000000e6] font-medium'
//                   >
//                     {profession.Profes_name}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Education */}
//           <div className="col-span-2">
//             {/* <label>Education</label> */}
//             <h5 className="text-[18px] text-black font-semibold mb-2 cursor-pointer" onClick={handleSelectAllEducation}>
//               Education
//             </h5>
//             <div className="flex flex-wrap gap-4">
//               {eduPref.map((option) => (
//                 <div key={option.Edu_Pref_id} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={`education-${option.Edu_Pref_id}`}
//                     value={option.Edu_Pref_id.toString()}
//                     checked={EditEducation.split(',').includes(
//                       option.Edu_Pref_id.toString(),
//                     )}
//                     onChange={() =>
//                       handleEducationChange(option.Edu_Pref_id.toString())
//                     }
//                   />
//                   <label
//                     htmlFor={`education-${option.Edu_Pref_id}`}
//                     className='pl-1 text-[#000000e6] font-medium'
//                   >
//                     {option.Edu_name}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Field of Study */}
//           <div className="col-span-2">
//             <h5 className="text-[18px] text-black font-semibold mb-2 cursor-pointer" onClick={handleSelectAllFieldOfStudy}>
//               Field of Study
//             </h5>
//             <div className="flex flex-wrap gap-4">
//               {fieldOfStudyOptions.map((option) => (
//                 <div key={option.study_id} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={`fieldOfStudy-${option.study_id}`}
//                     value={option.study_id.toString()}
//                     checked={selectedFieldsOfStudy.includes(option.study_id.toString())}
//                     onChange={() => handleFieldOfStudyChange(option.study_id.toString())}
//                   />
//                   <label
//                     htmlFor={`fieldOfStudy-${option.study_id}`}
//                     className='pl-1 text-[#000000e6] font-medium'
//                   >
//                     {option.study_description}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Degree */}
//           <div className="col-span-2">
//             <h5 className="text-[18px] text-black font-semibold mb-2 cursor-pointer" onClick={handleSelectAllDegrees}>
//               Degree
//             </h5>
//             <div className="flex flex-wrap gap-4">
//               {degreeOptions.map((option) => (
//                 <div key={option.degeree_id} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={`degree-${option.degeree_id}`}
//                     value={option.degeree_id.toString()}
//                     checked={selectedDegrees.includes(option.degeree_id.toString())}
//                     onChange={() => handleDegreeChange(option.degeree_id.toString())}
//                   />
//                   <label
//                     htmlFor={`degree-${option.degeree_id}`}
//                     className='pl-1 text-[#000000e6] font-medium'
//                   >
//                     {option.degeree_description}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
//           {/* Marital Status */}
//           <div className="col-span-2">
//             {/* <label>Marital Status</label> */}
//             <h5 className="text-[18px] text-black font-semibold mb-2 cursor-pointer" onClick={handleSelectAllMaritalStatus}>
//               Marital Status
//             </h5>
//             <div className="flex justify-between items-center">
//               {MaritalStatuses?.map((status: any) => (
//                 <div key={status.marital_sts_id}>
//                   <input
//                     type="checkbox"
//                     id={`maritalStatus-${status.marital_sts_id}`}
//                     value={status.marital_sts_id.toString()}
//                     checked={editMartualStatus
//                       .split(',')
//                       .includes(status.marital_sts_id.toString())}
//                     onChange={() =>
//                       handleMaritalStatusChange(status.marital_sts_id)
//                     }
//                   />
//                   <label htmlFor={`maritalStatus-${status.marital_sts_id}`} className='pl-1 text-[#000000e6] font-medium'>
//                     {status.marital_sts_name}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div>
//             <label
//               htmlFor="AnnualIncome"
//               className="text-[18px] text-black font-bold mb-2"
//             >
//               Annual Income
//             </label>
//             <div className="flex items-center gap-2">
//               <div className="w-full">
//                 <label className="text-black font-semibold " >Minimum Annual Income</label>
//                 <select
//                   id="AnnualIncome"

//                   {...register('suggested_pref_details.pref_anual_income')}
//                   className="outline-none w-full px-4 py-2 border text-[#000000e6] font-medium border-black rounded"
//                 >
//                   <option value="" disabled className='text-[#000000e6] font-medium'>
//                     Select  Minimum Annual Income
//                   </option>
//                   {annualIncome?.map((option: any) => (
//                     <option key={option.income_id} value={option.income_id} className='text-[#000000e6] font-medium'>
//                       {option.income_description}
//                     </option>
//                   ))}
//                 </select>
//                 {errors?.suggested_pref_details?.pref_anual_income && (
//                   <p className="text-red-600">
//                     {errors.suggested_pref_details.pref_anual_income.message}
//                   </p>
//                 )}
//               </div>

//               <div className="w-full">
//                 <label className="text-black font-bold">Maximum Annual Income</label>
//                 <select
//                   id="AnnualIncome"
//                   {...register('suggested_pref_details.pref_anual_income_max')}
//                   className="outline-none w-full px-4 py-2 border text-[#000000e6] font-medium border-black rounded"
//                 >
//                   <option value="" disabled className='text-black font-semibold'>
//                     Select  Maximum Annual Income
//                   </option>
//                   {annualIncome?.map((option: any) => (
//                     <option key={option.income_id} value={option.income_id} className='text-[#000000e6] font-medium'>
//                       {option.income_description}
//                     </option>
//                   ))}
//                 </select>
//                 {errors?.suggested_pref_details?.pref_anual_income_max && (
//                   <p className="text-red-600">
//                     {errors.suggested_pref_details.pref_anual_income_max.message}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//           {/* <div className="col-span-2">

//             <h5 className="text-[18px] text-black font-semibold mb-2">
//                 Annual Income
//               </h5>

//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//                 {annualIncome.map((option) => (
//                   <div
//                     key={option.income_id}
//                     className="mb-2 flex items-center"
//                   >
//                     <input
//                       type="checkbox"
//                       id={`annualIncome-${option.income_id}`}
//                       value={option.income_id.toString()}
//                       checked={EditAnnualIncome.split(',').includes(
//                         option.income_id.toString(),
//                       )}
//                       onChange={() =>
//                         handleAnnualIncomeChange(option.income_id.toString())
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
//           </div> */}

//           <div>
//             <div className="justify-start items-center gap-x-5 text-black">
//               <h5 className="text-[18px] text-black font-semibold mb-2">
//                 Matching Stars
//               </h5>
//               {matchStars && matchStars?.length > 0 ? (
//                 matchStars
//                   .sort((a, b) => b[0].match_count - a[0].match_count)
//                   .map((matchCountArray, index) => {
//                     const starAndRasi = matchCountArray.map((star) => ({
//                       id: star.id.toString(),
//                       matching_starId: star.dest_star_id.toString(),
//                       matching_starname: star.matching_starname,
//                       matching_rasiId: star.dest_rasi_id.toString(),
//                       matching_rasiname: star.matching_rasiname,
//                     }));

//                     const matchCountValue = matchCountArray[0].match_count;

//                     return (
//                       <MatchingStars
//                         key={index}
//                         initialPoruthas={`No of porutham ${matchCountValue}`}
//                         starAndRasi={starAndRasi}
//                         selectedStarIds={selectedStarIds}
//                         onCheckboxChange={handleCheckboxChange}
//                         unique={"suggested"}
//                       />
//                     );
//                   })
//               ) : (
//                 <p className="text-red-500">No match stars available</p>
//               )}
//               {errors?.suggested_pref_details?.pref_porutham_star && (
//                 <p className="text-red-600 mt-1">
//                   {errors.suggested_pref_details.pref_porutham_star.message}
//                 </p>
//               )}
//               {/* {errors?.suggested_pref_details?.pref_porutham_star_rasi && (
//                   <p className="text-red-600 mt-1">
//                     {errors.suggested_pref_details.pref_porutham_star_rasi.message}
//                   </p>
//                 )} */}
//             </div>
//           </div>
//         </div>
//       )}
//       <div className='flex justify-end mt-10 '>
//         <button
//           // onClick={formHandleSubmit}
//           type="submit"
//           className="bg-blue-500 text-white px-15 py-2 rounded"
//         >
//           Save Suggested Profile
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EditSuggestedProfile;


import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { annualIncomeApi, educationalPrefApi, fetchFamilyStatus, fetchFieldDegree, fetchFieldOfStudy, fetchMaritalStatuses, fetchMatchPreferences, getProfession, StatePref } from "../../../action";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import MatchingStars from "./EditMatchingStar";
import { suggestedProfile } from "../../../types/EditSchemaSuggestedProfile";
import { string } from "zod";
import { apiAxios } from "../../../api/apiUrl";
import { getFieldOfStudy } from "./EducationalDetails";

import Select from 'react-select';
interface ProfessionPref {
  Profes_Pref_id: number;
  Profes_name: string;
}


interface EduPref {
  Edu_Pref_id: number;
  Edu_name: string;
}


interface AnnualIncome {
  income_id: number;
  income_description: string;
}


export interface SelectedStarIdItem {
  id: string;
  rasi: string;
  star: string;
  label: string;
}

interface EditSuggestedProfileProps {

  EditData: any;
  gender: string;
  birthStarId: string;
  setPrefProf: Dispatch<SetStateAction<string>>;
  setprefEducation: Dispatch<SetStateAction<string>>;
  selectSetMaridStatus: Dispatch<SetStateAction<string>>;
  setAnnualIncomesVal: Dispatch<SetStateAction<string>>;
  setAnnualIncomesValmax: React.Dispatch<React.SetStateAction<string[]>>;
  setPorutham: Dispatch<SetStateAction<string>>;
  setPreforuthamStar: Dispatch<SetStateAction<string>>;
  isSuggestedProfileOpen: boolean;
  setIsSuggestedProfileOpen: Dispatch<SetStateAction<boolean>>;
  setFamilyStatusSuggested: Dispatch<SetStateAction<string>>
  setPrefferedStateSuggested: Dispatch<SetStateAction<string>>
  setFieldOfStudySuggested: Dispatch<SetStateAction<string>>
  setPreDegreeSuggested: React.Dispatch<React.SetStateAction<string[]>>;
}


interface HoroscopeDetails {
  birth_rasi_name: string;
  birthstar_name: string
}
interface gender {
  "Gender": string,
}

const EditSuggestedProfile: React.FC<EditSuggestedProfileProps> = ({
  setPrefProf,
  EditData,
  setPreforuthamStar,
  setPorutham,
  setAnnualIncomesVal,
  setprefEducation,
  selectSetMaridStatus,
  birthStarId,
  gender,
  isSuggestedProfileOpen,
  setIsSuggestedProfileOpen,
  setFamilyStatusSuggested,
  setPrefferedStateSuggested,
  setFieldOfStudySuggested,
  setPreDegreeSuggested
}) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext<suggestedProfile>();

  //const [annualIncome, setAnnualIncome] = useState<AnnualIncome[]>([]);

  const [EditProfession, setEditProfession] = useState('');
  const [EditEducation, setEditEducation] = useState('');
  const [editMartualStatus, setEditMartualStatus] = useState('');
  const [EditAnnualIncome, setEditAnnualIncome] = useState('');
  const [edit3, setEdit3] = useState<HoroscopeDetails>()
  // const [edit0,setEdit0]=useState<gender>()
  const [selectedStarIds, setSelectedStarIds] = useState<SelectedStarIdItem[]>([]);
  console.log(selectedStarIds)
  // const [selectedFamilyStatus, setSelectedFamilyStatus] = useState('');
  // const [selectedPrefState, setSelectedPrefState] = useState('');
  const [editFamilyStatus, setEditFamilyStatus] = useState('');
  const [editPrefState, setEditPrefState] = useState('');
  // const [selectedStarIds, setSelectedStarIds] = useState<SelectedStarIdItem[]>(
  //     [],
  //   );
  const [eduPref, setEduPref] = useState<EduPref[]>([]);
  const [fields, setFields] = useState<getFieldOfStudy[]>([]);
  const [FieldSelected, setFieldSelected] = useState('');
  const [selectedDegreeIds, setSelectedDegreeIds] = useState<string[]>([]);
  const [selectedDegrees, setSelectedDegrees] = useState('');

  const toggleSection = () => {
    setIsSuggestedProfileOpen(!isSuggestedProfileOpen);
  };
  useEffect(() => {
    handleDegreeChange
    if (EditData && EditData.length > 0) {
      setEdit3(EditData[3]);
      //setEdit0(EditData[0])
    }
  }, [EditData]);

  useEffect(() => {
    if (EditData?.[8]?.degree) {
      const degreeIds = EditData[8].degree.split(',').filter(Boolean);
      setSelectedDegreeIds(degreeIds);
      setValue('suggested_pref_details.degree', EditData[8].degree);
    }
  }, [EditData, setValue]);

  // const handleDegreeChange = (event: SelectChangeEvent<string[]>) => {
  //   const value = event.target.value;
  //   const selectedValues = typeof value === 'string' ? value.split(',') : value;

  //   setSelectedDegreeIds(selectedValues);

  //   // Update form value
  //   const degreeValue = selectedValues.join(',');
  //   setValue('suggested_pref_details.degree', degreeValue, {
  //     shouldValidate: true
  //   });
  // };

  const handleDegreeChange = (selectedOptions: any) => {
    // Convert selected options array to a comma-separated string of IDs
    const selectedIds = selectedOptions
      ? selectedOptions.map((option: any) => option.value).join(',')
      : '';

    // Update local state and react-hook-form value
    setSelectedDegrees(selectedIds);
    setValue('suggested_pref_details.degree', selectedIds, { shouldValidate: true });
  };

  const getSelectedDegreeOptions = () => {
    if (!selectedDegrees || !degreesData) return [];

    const selectedIds = selectedDegrees.split(',');
    return degreesData
      .filter(degree => selectedIds.includes(degree.degeree_id.toString()))
      .map(degree => ({
        value: degree.degeree_id.toString(),
        label: degree.degeree_description
      }));
  };
  const { data: degreesData } = useQuery({
    queryKey: ['degrees'],
    queryFn: () => fetchFieldDegree(),

  });

  useEffect(() => {

    setPreDegreeSuggested(selectedDegreeIds)
    // setFamilyStatus(selectedFamilyStatus)
  }, [selectedDegreeIds]);

  useEffect(() => {
    const loadFields = async () => {
      try {
        const data = await fetchFieldOfStudy();
        setFields(data);
      } catch (error) {

      }
    }
    loadFields()
  }, [])

  const starArray = selectedStarIds.map((item) => item.id);
  const starRasiArray = selectedStarIds.map(
    (item) => `${item.star}-${item.rasi}`,
  );
  console.log(`starRasiArray`, starRasiArray)
  const StarString = starArray.join(',');
  const combinedString = starRasiArray.join(',');

  useEffect(() => {
    setPreforuthamStar(combinedString);
    setPorutham(StarString);
    // Set the values for validation
    setValue('suggested_pref_details.pref_porutham_star', StarString);
    setValue('suggested_pref_details.pref_porutham_star_rasi', combinedString);
    // Trigger validation after setting values
    trigger(['suggested_pref_details.pref_porutham_star', 'suggested_pref_details.pref_porutham_star_rasi']);
  }, [StarString, combinedString, setValue, trigger]);
  const rasiId: string = edit3?.birth_rasi_name as string;

  const starId: string = edit3?.birthstar_name as string;
  // const gender:string = edit0?.Gender as string;
  console.log(gender)
  const { data: profession } = useQuery({
    queryKey: ['profession'],
    queryFn: getProfession,
  });
  const { data: MaritalStatuses } = useQuery({
    queryKey: ['MaritalStatuses'],
    queryFn: fetchMaritalStatuses,
  });

  const handleProfessionChange = (id: number) => {
    let currentProfessions = EditProfession ? EditProfession.split(',') : [];

    const professionIndex = currentProfessions.indexOf(`${id}`);

    if (professionIndex === -1) {
      // Add the profession to the list
      currentProfessions.push(`${id}`);
    } else {
      // Remove the profession from the list
      currentProfessions.splice(professionIndex, 1);
    }

    // Filter out any empty values and join them without extra commas
    setEditProfession(currentProfessions.filter(Boolean).join(','));
  };


  useEffect(() => {

    setFieldOfStudySuggested(FieldSelected)


  }, [FieldSelected]);


  const handleEducationChange = (id: string) => {
    let currentEducation = EditEducation ? EditEducation.split(',') : [];

    const index = currentEducation.indexOf(id);

    if (index === -1) {
      // Add the education to the list
      currentEducation.push(id);
    } else {
      // Remove the education from the list
      currentEducation.splice(index, 1);
    }

    // Filter out any empty values and join them into a string
    setEditEducation(currentEducation.filter(Boolean).join(','));
  };

  const [annualIncome, setAnnualIncome] = useState<AnnualIncome[]>([]);
  console.log(annualIncome)

  const { data: matchStars } = useQuery({
    queryKey: ['matchStars'],
    queryFn: () => fetchMatchPreferences(rasiId, starId, gender),
    enabled: !!rasiId && !!gender,
  });
  console.log(matchStars)
  useEffect(() => {
    const fetchEduPref = async () => {
      try {
        const response = await axios.post(`${educationalPrefApi}`);
        const options = Object.values(response.data) as EduPref[];

        setEduPref(options);
      } catch (error) {
        console.error('Error fetching Edu Pref options:', error);
      }
    };
    fetchEduPref();
  }, []);


  useEffect(() => {
    const fetchAnnualIncome = async () => {
      try {
        const response = await axios.post(`${annualIncomeApi}`);
        const options = Object.values(response.data) as AnnualIncome[];
        setAnnualIncome(options);
      } catch (error) {
        console.error('Error fetching Annual Income options:', error);
      }
    };
    fetchAnnualIncome();
  }, []);

  const handleMaritalStatusChange = (id: number) => {
    let currentMarriedStatus = editMartualStatus
      ? editMartualStatus.split(',')
      : [];

    const index = currentMarriedStatus.indexOf(`${id}`);

    if (index === -1) {
      // Add the status to the list
      currentMarriedStatus.push(`${id}`);
    } else {
      // Remove the status from the list
      currentMarriedStatus.splice(index, 1);
    }

    // Filter out any empty values and join them without extra commas
    setEditMartualStatus(currentMarriedStatus.filter(Boolean).join(','));
  };

  const handleAnnualIncomeChange = (id: string) => {
    let currentAnnualIncome = EditAnnualIncome
      ? EditAnnualIncome.split(',')
      : [];

    const index = currentAnnualIncome.indexOf(id);

    if (index === -1) {
      // Add the income ID to the list
      currentAnnualIncome.push(id);
    } else {
      // Remove the income ID from the list
      currentAnnualIncome.splice(index, 1);
    }

    // Filter out any empty values and join them into a string
    setEditAnnualIncome(currentAnnualIncome.filter(Boolean).join(','));
  };

  const handleCheckboxChange = (updatedIds: SelectedStarIdItem[]) => {
    setSelectedStarIds(updatedIds);
  };
  const selectedFamilyStatuss = watch("suggested_pref_details.pref_family_status");
  const selectedPrefStatee = watch("suggested_pref_details.pref_state");


  const handleFieldChange = (id: string) => {
    let currentEducation = FieldSelected ? FieldSelected.split(',') : [];

    const index = currentEducation.indexOf(id);

    if (index === -1) {
      // Add the education to the list
      currentEducation.push(id);
    } else {
      // Remove the education from the list
      currentEducation.splice(index, 1);
    }

    // Filter out any empty values and join them into a string
    setFieldSelected(currentEducation.filter(Boolean).join(','));
  };
  useEffect(() => {
    if (EditData) {
      if (EditData?.[8]?.degree) {
        const initialDegrees = EditData[8].degree || '';
        setSelectedDegrees(initialDegrees);
        setValue('suggested_pref_details.degree', initialDegrees);
      }
      setValue('suggested_pref_details.pref_height_from', EditData[8].pref_height_from || '');
      setValue('suggested_pref_details.pref_height_to', EditData[8].pref_height_to || '');
      setValue(
        'suggested_pref_details.pref_age_differences',
        EditData[8].pref_age_differences || ''
      );
      setValue('suggested_pref_details.pref_chevvai', EditData[8].pref_chevvai || '');
      setValue('suggested_pref_details.pref_ragukethu', EditData[8].pref_ragukethu || '');
      setValue(
        'suggested_pref_details.pref_foreign_intrest',
        EditData[8].pref_foreign_intrest || ''
      );
      setValue('suggested_pref_details.pref_anual_income', EditData[8].pref_anual_income || '');
      setValue('suggested_pref_details.pref_anual_income_max', EditData[8].pref_anual_income_max || '');
      setValue('suggested_pref_details.pref_family_status', EditData[8].pref_family_status || '');
      setValue('suggested_pref_details.pref_state', EditData[8].pref_state || '');
      setEditFamilyStatus(EditData[8].pref_state || '')
      setEditProfession(EditData[8].pref_profession || '');
      setEditMartualStatus(EditData[8].pref_marital_status || '');
      setEditEducation(EditData[8].pref_education || '');
      setEditAnnualIncome(EditData[8].pref_anual_income || '');
      setFieldSelected(EditData[8].pref_fieldof_study);
      setValue('suggested_pref_details.pref_state', EditData[8].pref_state || '');
      setEditPrefState(EditData[8].pref_state || ''); // Use the new state setter
      if (EditData?.[8]?.degree) {
        const initialDegrees = EditData[8].degree || '';
        setSelectedDegrees(initialDegrees);
        setValue('suggested_pref_details.degree', initialDegrees);
      }
      // Handle matching stars from API response
      if (EditData[8].pref_porutham_star && EditData[8].pref_porutham_star_rasi) {
        const selectedStarIdsFromAp = EditData[8].pref_porutham_star.split(',');
        const selectedStarIdsFromApi = EditData[8].pref_porutham_star_rasi
          .split(',')
          .map((rasiStar: string, index: number) => {
            const [star, rasi] = rasiStar.split('-');
            return {
              id: selectedStarIdsFromAp[index]?.trim() ?? "",
              star: star ? star.trim() : "",
              rasi: rasi ? rasi.trim() : "",
              label: "",
            };
          });

        setSelectedStarIds(selectedStarIdsFromApi);
        setValue('suggested_pref_details.pref_porutham_star', EditData[8].pref_porutham_star);
        setValue('suggested_pref_details.pref_porutham_star_rasi', EditData[8].pref_porutham_star_rasi);
      }
    }
  }, [EditData, setValue]);

  useEffect(() => {
    setAnnualIncomesVal(EditAnnualIncome);
    selectSetMaridStatus(editMartualStatus);
    setprefEducation(EditEducation);
    setPrefProf(EditProfession);
    setFamilyStatusSuggested(editFamilyStatus); // CHANGE THIS
    setPrefferedStateSuggested(editPrefState); // CHANGE THIS
    setPreDegreeSuggested(selectedDegrees ? selectedDegrees.split(',') : []);
  }, [EditProfession, editMartualStatus, EditEducation, editFamilyStatus, editPrefState, selectedDegrees, setPreDegreeSuggested]);

  // Add this handler for Family Status
  const handleFamilyStatusChange = (id: number) => {
    const currentStatusIds = editFamilyStatus ? editFamilyStatus.split(',') : [];
    const idString = id.toString();
    const index = currentStatusIds.indexOf(idString);

    if (index === -1) {
      currentStatusIds.push(idString);
    } else {
      currentStatusIds.splice(index, 1);
    }

    const newStatusString = currentStatusIds.filter(Boolean).join(',');
    setEditFamilyStatus(newStatusString);
    setValue('suggested_pref_details.pref_family_status', newStatusString, { shouldValidate: true });
  };

  // Add this handler for Preferred State
  const handleStateChange = (id: number) => {
    const currentStatusIds = editPrefState ? editPrefState.split(',') : [];
    const idString = id.toString();
    const index = currentStatusIds.indexOf(idString);

    if (index === -1) {
      currentStatusIds.push(idString);
    } else {
      currentStatusIds.splice(index, 1);
    }

    const newStatusString = currentStatusIds.filter(Boolean).join(',');
    setEditPrefState(newStatusString);
    setValue('suggested_pref_details.pref_state', newStatusString, { shouldValidate: true });
  };

  const handleSelectAllProfessions = () => {
    if (!profession) return;

    // Check if all are already selected
    const allSelected = profession.every((p: any) =>
      EditProfession.split(',').includes(p.Profes_Pref_id.toString())
    );

    if (allSelected) {
      // Deselect all
      setEditProfession('');
    } else {
      // Select all
      const allIds = profession.map((p: any) => p.Profes_Pref_id).join(',');
      setEditProfession(allIds);
    }
  };


  const handleSelectAllEducation = () => {
    // Check if all are already selected
    const allSelected = eduPref.every(e =>
      EditEducation.split(',').includes(e.Edu_Pref_id.toString())
    );

    if (allSelected) {
      // Deselect all
      setEditEducation('');
    } else {
      // Select all
      const allIds = eduPref.map(e => e.Edu_Pref_id).join(',');
      setEditEducation(allIds);
    }
  };

  const handleSelectAllMaritalStatus = () => {
    if (!MaritalStatuses) return;

    // Check if all are already selected
    const allSelected = MaritalStatuses.every((m: any) =>
      editMartualStatus.split(',').includes(m.marital_sts_id.toString())
    );

    if (allSelected) {
      // Deselect all
      setEditMartualStatus('');
    } else {
      // Select all
      const allIds = MaritalStatuses.map((m: any) => m.marital_sts_id).join(',');
      setEditMartualStatus(allIds);
    }
  };

  const { data: FamilyStatus } = useQuery({
    queryKey: ['FamilyStatus'],
    queryFn: fetchFamilyStatus,
  });

  const [stateOptions, setStateOptions] = useState<StatePref[]>([]); // ✅ Typed useState
  console.log("bqw", stateOptions)


  useEffect(() => {
    const fetchStatePreferences = async () => {
      try {
        const response = await axios.post(
          `https://app.vysyamala.com/auth/Get_State_Pref/`
        );

        console.log("fffffffffffffffffffffff", response);

        const data: StatePref[] = Object.values(response.data);
        setStateOptions(data);
        console.log("Fetched state options:", data); // ✅ this is the right place
      } catch (error) {
        console.error("Failed to fetch state preferences:", error);
      }
    };

    fetchStatePreferences();
  }, []);

  // Add this handler function
const handleSelectAllFieldOfStudy = () => {
  // Check if all are already selected
  const allSelected = fields.every(field => 
    (FieldSelected || '').split(',').includes(field.study_id.toString())
  );

  if (allSelected) {
    // Deselect all
    setFieldSelected('');
  } else {
    // Select all
    const allIds = fields.map(field => field.study_id).join(',');
    setFieldSelected(allIds);
  }
};

  return (
    <div className="bg-white p-5 mb-10 rounded shadow-md">
      <h4
        className="text-red-600 flex row items-center justify-between text-xl cursor-pointer font-semibold dark:text-white"
        onClick={toggleSection}
      >
        Suggested Profile
        <svg
          className={`fill-current transform ${isSuggestedProfileOpen ? "rotate-180" : ""}`}
          width={"20"}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
            fill=""
          ></path>
        </svg>
      </h4>

      {isSuggestedProfileOpen && (
        <div className="flex flex-col gap-5 pt-2">
          <div className="flex w-full flex-row gap-4">
            {/* Height */}
            <div className="w-full">
              <label className='Height From font-semibold'>Height From</label>
              <input
                // {...register("heightFrom")}
                {...register('suggested_pref_details.pref_height_from')}
                className="w-full px-4 py-2 border  font-medium border-[#b5b2b2e6]  text-[#222020e6] rounded"
              // placeholder="160"
              />
              {errors?.suggested_pref_details?.pref_height_from && (
                <p className="text-red-600">
                  {errors.suggested_pref_details.pref_height_from.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label className='text-[#5a5959e6] font-semibold'>Height To</label>
              <input
                {...register("suggested_pref_details.pref_height_to")}
                className="w-full px-4 py-2 border  font-medium border-[#b5b2b2e6]  text-[#222020e6] rounded"
              //   placeholder="160"
              />
              {errors?.suggested_pref_details?.pref_height_to && (
                <p className="text-red-600">
                  {errors.suggested_pref_details?.pref_height_to.message}
                </p>
              )}
            </div>

            {/* Age Difference */}
            <div className="w-full">
              <label className='text-[#5a5959e6] font-semibold'>Age Difference</label>
              <input
                {...register("suggested_pref_details.pref_age_differences")}
                className="w-full px-4 py-2 border border-[#b5b2b2e6]  text-[#222020e6] font-medium rounded"
              // placeholder="2"
              />
              {errors?.suggested_pref_details?.pref_age_differences && (
                <p className="text-red-600">
                  {errors.suggested_pref_details.pref_age_differences.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex w-full flex-row gap-4">
            {/* Chevvai */}
            <div className="w-full">
              <label className='text-[#5a5959e6] font-semibold'>Chevvai</label>
              <select
                {...register("suggested_pref_details.pref_chevvai")}
                className="w-full px-4 py-2 border  font-medium border-[#b5b2b2e6]  text-[#222020e6] rounded"
              >
                <option value="" className='pl-1 text-[#000000e6] font-medium'>Select</option>

                <option value="Yes" className='pl-1 text-[#000000e6] font-medium'>Yes</option>
                <option value="No" className='pl-1 text-[#000000e6] font-medium'>No</option>
                <option value="Both" className='pl-1 text-[#000000e6] font-medium'>Both</option>
              </select>
              {errors?.suggested_pref_details?.pref_chevvai && (
                <p className="text-red-600">
                  {errors.suggested_pref_details.pref_chevvai.message}
                </p>
              )}
            </div>

            {/* Rahu / Ketu */}
            <div className="w-full">
              <label className='text-[#5a5959e6] font-semibold'>Rahu / Ketu</label>
              <select
                {...register("suggested_pref_details.pref_ragukethu")}
                className="w-full px-4 py-2 border border-[#b5b2b2e6]  text-[#222020e6] font-medium  rounded"
              >
                <option value="" className='pl-1 text-[#000000e6] font-medium'>Select</option>

                <option value="Yes" className='pl-1 text-[#000000e6] font-medium'>Yes</option>
                <option value="No" className='pl-1 text-[#000000e6] font-medium'>No</option>
                <option value="Both" className='pl-1 text-[#000000e6] font-medium'>Both</option>
              </select>
              {errors?.suggested_pref_details?.pref_ragukethu && (
                <p className="text-red-600">
                  {errors.suggested_pref_details.pref_ragukethu.message}
                </p>
              )}
            </div>

            {/* Foreign Interest */}
            <div className="w-full">
              <label className='text-[#5a5959e6] font-semibold'>Foreign Interest</label>
              <select

                {...register("suggested_pref_details.pref_foreign_intrest")}
                className="w-full px-4 py-2 border  font-medium border-[#b5b2b2e6]  text-[#222020e6] rounded"
              >
                <option value="" className='pl-1 text-[#000000e6] font-medium'>Select</option>

                <option value="Yes" className='pl-1 text-[#000000e6] font-medium'>Yes</option>
                <option value="No" className='pl-1 text-[#000000e6] font-medium'>No</option>
                <option value="Both" className='pl-1 text-[#000000e6] font-medium'>Both</option>
              </select>
              {errors?.suggested_pref_details?.pref_foreign_intrest && (
                <p className="text-red-600">
                  {errors.suggested_pref_details.pref_foreign_intrest.message}
                </p>
              )}
            </div>
          </div>


          <div className="w-full py-1">
            <h5 className="text-[18px] text-[#5a5959e6] font-semibold mb-2 cursor-pointer">
              Family Status
            </h5>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {FamilyStatus?.map((status) => (
                <div key={status.family_status_id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`suggested-family-status-${status.family_status_id}`}
                    value={status.family_status_id}
                    checked={(editFamilyStatus || '').split(',').includes(status.family_status_id.toString())}
                    onChange={() => handleFamilyStatusChange(status.family_status_id)}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`suggested-family-status-${status.family_status_id}`}
                    className='text-[#5a5959e6] font-medium'
                  >
                    {status.family_status_name}
                  </label>
                </div>
              ))}
            </div>
            {errors?.suggested_pref_details?.pref_family_status && (
              <p className="text-red-600 mt-1">
                {errors.suggested_pref_details.pref_family_status.message}
              </p>
            )}
          </div>



          <div className="w-full py-1">
            <h5 className="text-[18px] text-[#5a5959e6] font-semibold mb-2 cursor-pointer">
              Preferred State
            </h5>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {stateOptions?.map((state) => (
                <div key={state.State_Pref_id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`suggested-state-${state.State_Pref_id}`}
                    value={state.State_Pref_id}
                    checked={(editPrefState || '').split(',').includes(state.State_Pref_id.toString())}
                    onChange={() => handleStateChange(state.State_Pref_id)}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`suggested-state-${state.State_Pref_id}`}
                    className='text-[#5a5959e6] font-medium'
                  >
                    {state.State_name}
                  </label>
                </div>
              ))}
            </div>
            {errors?.suggested_pref_details?.pref_state && (
              <p className="text-red-600 mt-1">
                {errors.suggested_pref_details.pref_state.message}
              </p>
            )}
          </div>



          {/* Profession */}
          <div className="col-span-2">
            {/* <label>Profession</label> */}
            <h5 className="text-[18px] text-[#5a5959e6] font-semibold mb-2 cursor-pointer" onClick={handleSelectAllProfessions}>
              Profession
            </h5>
            <div className="flex justify-between items-center">
              {profession?.map((profession: ProfessionPref) => (
                <div key={profession.Profes_Pref_id}>
                  <input
                    type="checkbox"
                    id={`profession-${profession.Profes_Pref_id}`}
                    value={profession.Profes_name}
                    checked={EditProfession.split(',').includes(
                      `${profession.Profes_Pref_id}`,
                    )}
                    onChange={() =>
                      handleProfessionChange(profession.Profes_Pref_id)
                    }
                  />
                  <label
                    htmlFor={`profession-${profession.Profes_Pref_id}`}
                    className='pl-1 text-[#5a5959e6] font-medium'
                  >
                    {profession.Profes_name}
                  </label>
                </div>
              ))}
            </div>
          </div>


          {/* Marital Status */}
          <div className="col-span-2">
            {/* <label>Marital Status</label> */}
            <h5 className="text-[18px] text-[#5a5959e6] font-semibold mb-2 cursor-pointer" onClick={handleSelectAllMaritalStatus}>
              Marital Status
            </h5>
            <div className="flex justify-between items-center">
              {MaritalStatuses?.map((status: any) => (
                <div key={status.marital_sts_id}>
                  <input
                    type="checkbox"
                    id={`maritalStatus-${status.marital_sts_id}`}
                    value={status.marital_sts_id.toString()}
                    checked={editMartualStatus
                      .split(',')
                      .includes(status.marital_sts_id.toString())}
                    onChange={() =>
                      handleMaritalStatusChange(status.marital_sts_id)
                    }
                  />
                  <label htmlFor={`maritalStatus-${status.marital_sts_id}`} className='pl-1 text-[#5a5959e6] font-medium'>
                    {status.marital_sts_name}
                  </label>
                </div>
              ))}
            </div>
          </div>



          {/* Education */}
          <div className="col-span-2">
            {/* <label>Education</label> */}
            <h5 className="text-[18px] text-[#5a5959e6] font-semibold mb-2 cursor-pointer" onClick={handleSelectAllEducation}>
              Education
            </h5>
            <div className="flex flex-wrap gap-4">
              {eduPref.map((option) => (
                <div key={option.Edu_Pref_id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`education-${option.Edu_Pref_id}`}
                    value={option.Edu_Pref_id.toString()}
                    checked={EditEducation.split(',').includes(
                      option.Edu_Pref_id.toString(),
                    )}
                    onChange={() =>
                      handleEducationChange(option.Edu_Pref_id.toString())
                    }
                  />
                  <label
                    htmlFor={`education-${option.Edu_Pref_id}`}
                    className='pl-1 text-[#5a5959e6] font-medium'
                  >
                    {option.Edu_name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[18px] text-[#5a5959e6] font-semibold mb-2 cursor-pointer"
            //  onClick={handleSelectAllEducation}
             onClick={handleSelectAllFieldOfStudy}
            >
              Field of study
            </label>
            <div className="flex flex-wrap gap-4">
              {fields?.map((option) => (
                <div key={option.study_id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`FieldOfStudySuggested-${option.study_id}`}
                    value={option.study_id.toString()}
                    // checked={EditEducation.split(',').includes(
                    //   option.Edu_Pref_id.toString(),
                    // )}
                    checked={(FieldSelected || '').split(',').includes(
                      option.study_id.toString(),
                    )}
                    onChange={() =>
                      handleFieldChange(option.study_id.toString())
                    }
                  />
                  <label
                    htmlFor={`FieldOfStudySuggested-${option.study_id}`}

                    className='pl-1 text-[#5a5959e6] font-medium'
                  >
                    {option.study_description}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full py-1">
            <h5 className="text-[18px] text-[#5a5959e6] font-semibold mb-2">
              Degree
            </h5>
            <div className="max-w-2xl">
              <Select
                isMulti
                options={degreesData?.map((degree) => ({
                  value: degree.degeree_id.toString(),
                  label: degree.degeree_description,
                })) || []}
                value={getSelectedDegreeOptions()}
                onChange={handleDegreeChange}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Select Degrees"
              />
            </div>
            {errors?.suggested_pref_details?.degree && (
              <p className="text-red-600 mt-1">
                {errors.suggested_pref_details.degree.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="AnnualIncome"
              className="text-[18px] text-[#5a5959e6] font-bold mb-2"
            >
              Annual Income
            </label>
            <div className="flex items-center gap-2">
              <div className="w-full">
                <label className="text-[#5a5959e6] font-semibold " >Minimum Annual Income</label>
                <select
                  id="AnnualIncome"

                  {...register('suggested_pref_details.pref_anual_income')}
                  className="outline-none w-full px-4 py-2 border text-[#5a5959e6] font-medium border-black rounded"
                >
                  <option value="" disabled className='text-[#5a5959e6] font-medium'>
                    Select  Minimum Annual Income
                  </option>
                  {annualIncome?.map((option: any) => (
                    <option key={option.income_id} value={option.income_id} className='text-[#5a5959e6] font-medium'>
                      {option.income_description}
                    </option>
                  ))}
                </select>
                {errors?.suggested_pref_details?.pref_anual_income && (
                  <p className="text-red-600">
                    {errors.suggested_pref_details.pref_anual_income.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label className="text-[#5a5959e6] font-bold">Maximum Annual Income</label>
                <select
                  id="AnnualIncome"
                  {...register('suggested_pref_details.pref_anual_income_max')}
                  className="outline-none w-full px-4 py-2 border text-[#5a5959e6] font-medium border-black rounded"
                >
                  <option value="" disabled className='text-[#5a5959e6] font-semibold'>
                    Select  Maximum Annual Income
                  </option>
                  {annualIncome?.map((option: any) => (
                    <option key={option.income_id} value={option.income_id} className='text-[#5a5959e6] font-medium'>
                      {option.income_description}
                    </option>
                  ))}
                </select>
                {errors?.suggested_pref_details?.pref_anual_income_max && (
                  <p className="text-red-600">
                    {errors.suggested_pref_details.pref_anual_income_max.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* <div className="col-span-2">
          
            <h5 className="text-[18px] text-[#5a5959e6] font-semibold mb-2">
                Annual Income
              </h5>
           
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {annualIncome.map((option) => (
                  <div
                    key={option.income_id}
                    className="mb-2 flex items-center"
                  >
                    <input
                      type="checkbox"
                      id={`annualIncome-${option.income_id}`}
                      value={option.income_id.toString()}
                      checked={EditAnnualIncome.split(',').includes(
                        option.income_id.toString(),
                      )}
                      onChange={() =>
                        handleAnnualIncomeChange(option.income_id.toString())
                      }
                    />
                    <label
                      htmlFor={`annualIncome-${option.income_id}`}
                      className="pl-1"
                    >
                      {option.income_description}
                    </label>
                  </div>
                ))}
              </div>
          </div> */}

          <div>
            <div className="justify-start items-center gap-x-5 text-[#5a5959e6]">
              <h5 className="text-[18px] text-[#5a5959e6] font-semibold mb-2">
                Matching Stars
              </h5>
              {matchStars && matchStars?.length > 0 ? (
                matchStars
                  .sort((a, b) => b[0].match_count - a[0].match_count)
                  .map((matchCountArray, index) => {
                    const starAndRasi = matchCountArray.map((star) => ({
                      id: star.id.toString(),
                      matching_starId: star.dest_star_id.toString(),
                      matching_starname: star.matching_starname,
                      matching_rasiId: star.dest_rasi_id.toString(),
                      matching_rasiname: star.matching_rasiname,
                    }));

                    const matchCountValue = matchCountArray[0].match_count;

                    return (
                      <MatchingStars
                        key={index}
                        initialPoruthas={`No of porutham ${matchCountValue}`}
                        starAndRasi={starAndRasi}
                        selectedStarIds={selectedStarIds}
                        onCheckboxChange={handleCheckboxChange}
                        unique={"suggested"}
                      />
                    );
                  })
              ) : (
                <p className="text-red-500">No match stars available</p>
              )}
              {errors?.suggested_pref_details?.pref_porutham_star && (
                <p className="text-red-600 mt-1">
                  {errors.suggested_pref_details.pref_porutham_star.message}
                </p>
              )}
              {/* {errors?.suggested_pref_details?.pref_porutham_star_rasi && (
                  <p className="text-red-600 mt-1">
                    {errors.suggested_pref_details.pref_porutham_star_rasi.message}
                  </p>
                )} */}
            </div>
          </div>
        </div>
      )}
      <div className='flex justify-end mt-10 '>
        <button
          // onClick={formHandleSubmit}
          type="submit"
          className="bg-blue-500 text-white px-15 py-2 rounded"
        >
          Save Suggested Profile
        </button>
      </div>
    </div>
  );
};

export default EditSuggestedProfile;

