// import { SetDataOptions, useQuery } from '@tanstack/react-query'
// import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
// import InputField from '../../InputField';
// import { AnnualIncome, EduPref, ProfessionPref } from './EditPartnerPreference';
// import { useFormContext } from 'react-hook-form';
// import { ProfileVisibilityResponse } from '../../../types/EditProfileVisibiltySchema';
// import { fetchFamilyStatus } from '../../../action';
// import { string } from 'zod';
// export interface formProps{
// isProfileVisibility:boolean;
// setIsProfileVisibility:Dispatch<SetStateAction<boolean>>;
// professionVisibility: ProfessionPref[];
// educationVisibility:EduPref[];
// annualIncomeVisibility:AnnualIncome[];
// EditData:any;
// setFamilyStatusVisibility:Dispatch<SetStateAction<string>>
// }
// export const EditProfileVisibility:React.FC<formProps> = ({
// isProfileVisibility,
// setIsProfileVisibility,
// professionVisibility,
// educationVisibility,
// annualIncomeVisibility,
// EditData,
// setFamilyStatusVisibility
// }) => {

//   const{setValue,register,watch, formState: { errors },}=useFormContext<ProfileVisibilityResponse>()
//      const toggleSection = () => {
//     setIsProfileVisibility(!isProfileVisibility);
//   };
// //  useEffect(() => {
// //   if(EditData){
// // setValue('profile_visibility.visibility_age_from',EditData[9].visibility_age_from)
// //   }
// //   }, [EditData]);

// // useEffect(() => {
// //   if (EditData && EditData[9]) {
// //     setValue('profile_visibility.0.visibility_age_from', EditData[9].visibility_age_from);
// //   }
// // }, [EditData]);
// const [EditProfession, setEditProfession] = useState('');
//  const [EditEducation, setEditEducation] = useState('');
//  const [selectedFamilyStatus, setSelectedFamilyStatus] = useState('');
//  const AnnualminIncome =watch('profile_visibility.visibility_anual_income')
//  useEffect(() => {
//     if (EditData) {
//       const visibility = EditData[9];
//       setValue('profile_visibility.visibility_age_from', visibility.visibility_age_from);
//       setValue('profile_visibility.visibility_age_to', visibility.visibility_age_to);
//       setValue('profile_visibility.visibility_height_from', visibility.visibility_height_from);
//       setValue('profile_visibility.visibility_height_to', visibility.visibility_height_to);
//       setValue('profile_visibility.visibility_profession', visibility.visibility_profession);
// setEditProfession(visibility.visibility_profession)
//       setValue('profile_visibility.visibility_education', visibility.visibility_education);
// setEditEducation(visibility.visibility_education)
//       setValue('profile_visibility.visibility_anual_income', visibility.visibility_anual_income);
//       setValue('profile_visibility.visibility_ragukethu', visibility.visibility_ragukethu);
//       setValue('profile_visibility.visibility_chevvai', visibility.visibility_chevvai);
//       setValue('profile_visibility.visibility_foreign_interest', visibility.visibility_foreign_interest);
//       setValue('profile_visibility.visibility_family_status', visibility.visibility_family_status);
//   setSelectedFamilyStatus( visibility.visibility_family_status)


//       // Set other fields as needed
//     }
//   }, [EditData, setValue]);

//   useEffect(()=>{
// setFamilyStatusVisibility(selectedFamilyStatus)
//   },[selectedFamilyStatus])

//   //  const handleProfessionChange = (id: number) => {
//   //   let currentProfessions = EditProfession ? EditProfession.split(',') : [];

//   //   const professionIndex = currentProfessions.indexOf(`${id}`);

//   //   if (professionIndex === -1) {
//   //     // Add the profession to the list
//   //     currentProfessions.push(`${id}`);
//   //   } else {
//   //     // Remove the profession from the list
//   //     currentProfessions.splice(professionIndex, 1);
//   //   }
//   // }


//   const handleProfessionChange = (id: number) => {
//   let currentProfessions = EditProfession ? EditProfession.split(',') : [];

//   const professionIndex = currentProfessions.indexOf(`${id}`);

//   if (professionIndex === -1) {
//     // Add the profession to the list
//     currentProfessions.push(`${id}`);
//   } else {
//     // Remove the profession from the list
//     currentProfessions.splice(professionIndex, 1);
//   }

//   // Set updated profession string
//   setEditProfession(currentProfessions.join(','));
// };


//    const handleEducationChange = (id: string) => {
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

//   const { data: FamilyStatus } = useQuery({
//       queryKey: ['FamilyStatus'],
//       queryFn: fetchFamilyStatus,
//     });
   

//   return (
//     <div className='bg-white p-5 rounded shadow-md'>
//         <h4 className='text-xl text-red-600 font-semibold flex items-center justify-between'
//          onClick={toggleSection}
//         >Profile Visibility

//              <svg
//           className={`fill-current transform ${ isProfileVisibility? '' :'rotate-180'
//             }`}
//           width={'20'}
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
//         </h4>
//         {
//             isProfileVisibility&&(
          
//                 <>
//                  <div className='flex gap-6 mt-4 flex-col md:flex-row '>
//                  <div className='w-full'>
//                         <label
//                   htmlFor="ageFrom"
//                   className="text-[20px] text-black font-semibold block mb-2"
//                 >
//                   Age
//                 </label>{" "}
// <div className='flex gap-3 items-center justify-center'>
//     <div className='w-full'>
//     <InputField label={''} placeholder='From'  {...register('profile_visibility.visibility_age_from')}/>
// </div>
// <div className='w-full'>
//     <InputField label={''} placeholder='To' {...register('profile_visibility.visibility_age_to')}/>
// </div>
// </div>
//                  </div>

//                    <div className='w-full'>
//                         <label
//                   htmlFor="ageFrom"
//                   className="text-[20px] text-black font-semibold block mb-2"
//                 >
//                   Height
//                 </label>{" "}
// <div className='flex gap-3 items-center justify-center'>
//     <div className='w-full'>
//     <InputField label={''} placeholder='From' {...register('profile_visibility.visibility_height_from')}/>
// </div>
// <div className='w-full'>
//     <InputField label={''} placeholder='To' {...register('profile_visibility.visibility_height_to')}/>
// </div>
// </div>
//                  </div>
                 
//                  </div>
//                      <div className="w-full mt-6">
//               <h5 className="text-[18px] text-black  font-semibold mb-2">
//                 Profession
//               </h5>
//               <div className="flex flex-wrap justify-between items-center">
//                 {professionVisibility?.map((profession: ProfessionPref) => (
//                   <div key={profession.Profes_Pref_id}>
//                     <input
//                       type="checkbox"
//                       id={`professionnVisibility-${profession.Profes_Pref_id}`}
//                       value={profession.Profes_name}
//                       // checked={EditProfession.split(',').includes(
//                       //   `${profession.Profes_Pref_id}`,
//                       // )}
//                       checked={EditProfession.split(',').includes(String(profession.Profes_Pref_id))}

//                       onChange={() =>
//                         handleProfessionChange(profession.Profes_Pref_id)
//                       }
//                     />
//                     <label
//                       htmlFor={`professionnVisibility-${profession.Profes_Pref_id}`}
                      
//                       className='pl-1 text-[#000000e6] font-medium'
//                     >
//                       {profession.Profes_name}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>


//               <div className='mt-6'>
//               <label className="text-[18px] text-black font-semibold mb-2">
//                 Education
//               </label>
//               <div className="flex flex-wrap gap-4">
//                 {educationVisibility.map((option) => (
//                   <div key={option.Edu_Pref_id} className="flex items-center">
//                     <input
//                       type="checkbox"
//                       id={`educationnVisibility-${option.Edu_Pref_id}`}
//                       value={option.Edu_Pref_id.toString()}
//                       checked={EditEducation.split(',').includes(
//                         option.Edu_Pref_id.toString(),
//                       )}
//                       onChange={() =>
//                         handleEducationChange(option.Edu_Pref_id.toString())
//                       }
//                     />
//                     <label
//                       htmlFor={`educationnVisibility-${option.Edu_Pref_id}`}
                      
//                        className='pl-1 text-[#000000e6] font-medium'
//                     >
//                       {option.Edu_name}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className='mt-6'>
//           <label
//                   htmlFor="AnnualIncome"
//                  className="text-[18px] text-black font-semibold mb-2"
//                 >
//                     Annual Income
//                 </label>
//                 <div className="flex items-center gap-2">
//           <div className="w-full">
//                {/* <label className="text-gray-600 font-bold " >Minimum Annual Income</label> */}
//                 <select
                
//                   value={AnnualminIncome}
//                  {...register('profile_visibility.visibility_anual_income')}
//                   className="outline-none w-full px-4 py-2 border text-[#000000e6] font-medium border-black rounded"
//                 >
//                   {/* <option value="" disabled>
//                   Select  Minimum Annual Income
//                   </option> */}
//                   {annualIncomeVisibility?.map((option:AnnualIncome) => (
//                     <option key={option.income_id} value={option.income_id}  className='pl-1 text-[#000000e6] font-medium'>
//                       {option.income_description}
//                     </option>
//                   ))}
//                 </select>
                
//               </div>
//               </div>
//               </div>

              
//   <div className="w-full py-1">
//                 <label className="block text-black font-medium mb-1">
//                   Family Status 
//                 </label>
//                 <div className="w-full inline-flex rounded max-md:flex-col">
//                   {FamilyStatus?.map((status) => ( 
                  
//                     <label
//                        key={status.family_status_id}
//                      // className='w-full px-5 py-3 text-sm font-medium border cursor-pointer'
//                       className={`w-full px-5 py-3 text-sm font-bold border border-black cursor-pointer ${String(selectedFamilyStatus) ===
//                         String(status.family_status_id)
//                         ? 'bg-blue-500 text-white'
//                         : ''
//                         }`}
//                       onClick={() =>
//                         setSelectedFamilyStatus(status.family_status_id)
//                       }
//                     >
//                       <input
//                          value={status.family_status_id}
//                        {...register('profile_visibility.visibility_family_status')}
//                         type="radio"
//                         className="w-0"
//                       />
//                       {status.family_status_name}
//                     </label>
//                   ))}
//                 </div>
//                  {/* {errors?.PartnerPreference?.FamilyStatus && (
//                   <p className="text-red-600">Family status is required</p>
//                 )}  */}
//                  {/* {errors?.profile_visibility.visibility_family_status && (
//                   <p className="text-red-600">
//                     {errors.profile_visibility.visibility_family_status.message}
//                   </p>
//                 )} */}
//               </div>



//             <div className='mt-6 flex flex-wrap items-center justify-between'>

//                    <div className="mb-5">
//             <h4 className="text-[20px] text-black font-semibold mb-2 max-md:text-[18px]">
//               Rahu/Ketu Dhosam
//             </h4>
//             <div className="flex space-x-4">
//               <label className="inline-flex items-center text-ash">
//                 <input
//                   type="radio"
//                   value="Yes"
//                  {...register("profile_visibility.visibility_ragukethu")}
//                   className="mr-2"
//                 />
//                 Yes
//               </label>
//               <label className="inline-flex items-center text-ash">
//                 <input
//                   type="radio"
//                   value="NO"
//                   {...register("profile_visibility.visibility_ragukethu")}
//                   className="mr-2"
//                 />
//                 No
//               </label>
//             </div>
//             {/* {errors.rahuKetuDhosam && (
//               <span className="text-red-500">
//                 {errors.rahuKetuDhosam.message}
//               </span>
//             )} */}
//           </div>

//              <div className="mb-5">
//             <h4 className="text-[20px] text-black font-semibold mb-2 max-md:text-[18px]">
//             Chevvai Dhosam
//             </h4>
//             <div className="flex space-x-4">
//               <label className="inline-flex items-center text-ash">
//                 <input
//                   type="radio"
//                   value="Yes"
//                  {...register("profile_visibility.visibility_chevvai")}
//                   className="mr-2"
//                 />
//                 Yes
//               </label>
//               <label className="inline-flex items-center text-ash">
//                 <input
//                   type="radio"
//                   value="NO"
//                  {...register("profile_visibility.visibility_chevvai")}
//                   className="mr-2"
//                 />
//                 No
//               </label>
//             </div>
//             {/* {errors.rahuKetuDhosam && (
//               <span className="text-red-500">
//                 {errors.rahuKetuDhosam.message}
//               </span>
//             )} */}
//           </div>

//              <div className="mb-5">
//             <h4 className="text-[20px] text-black font-semibold mb-2 max-md:text-[18px]">
//               Foreign Interest
//             </h4>
//             <div className="flex space-x-4">
//               <label className="inline-flex items-center text-ash">
//                 <input
//                   type="radio"
//                   value="Yes"
//        {...register("profile_visibility.visibility_foreign_interest")}
//                   className="mr-2"
//                 />
//                 Yes
//               </label>
//               <label className="inline-flex items-center text-ash">
//                 <input
//                   type="radio"
//                   value="NO"
//                {...register("profile_visibility.visibility_foreign_interest")}
//                   className="mr-2"
//                 />
//                 No
//               </label>
//                <label className="inline-flex items-center text-ash">
//                 <input
//                   type="radio"
//                   value="BOTH"
//                {...register("profile_visibility.visibility_foreign_interest")}
//                   className="mr-2"
//                 />
//                 Both
//               </label>
//             </div>
//             {/* {errors.rahuKetuDhosam && (
//               <span className="text-red-500">
//                 {errors.rahuKetuDhosam.message}
//               </span>
//             )} */}
//           </div>

//             </div>

//             <div className='flex justify-end mt-6'>
//                 <button className='bg-blue-500 text-white px-15 py-2 rounded'  type="submit">
//                     Save Profile Visibility
//                 </button>
//             </div>

//                 </>
//             )
//         }
//     </div>
//   )
// }




import { useQuery } from '@tanstack/react-query'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import InputField from '../../InputField';
import { AnnualIncome, EduPref, ProfessionPref } from './EditPartnerPreference';
import { useFormContext } from 'react-hook-form';
import { ProfileVisibilityResponse } from '../../../types/EditProfileVisibiltySchema';
import { fetchFamilyStatus, getProfession } from '../../../action';

export interface formProps {
  isProfileVisibility: boolean;
  setIsProfileVisibility: Dispatch<SetStateAction<boolean>>;
  professionVisibility: ProfessionPref[];
  educationVisibility: EduPref[];
  annualIncomeVisibility: AnnualIncome[];
  EditData: any;
  setFamilyStatusVisibility: Dispatch<SetStateAction<string>>;
}

export const EditProfileVisibility: React.FC<formProps> = ({
  isProfileVisibility,
  setIsProfileVisibility,
  professionVisibility,
  educationVisibility,
  annualIncomeVisibility,
  EditData,
  setFamilyStatusVisibility
}) => {
  const { setValue, register, watch, formState: { errors }, handleSubmit } = useFormContext<ProfileVisibilityResponse>();
  console.log("nnnn++++",professionVisibility)
  const toggleSection = () => {
    setIsProfileVisibility(!isProfileVisibility);
  };

    const { data: profession } = useQuery({
      queryKey: ['profession'],
      queryFn: getProfession,
    });
  // State for checkbox values
  const [selectedProfessions, setSelectedProfessions] = useState<number[]>([]);
  const [selectedEducations, setSelectedEducations] = useState<string[]>([]);
  const [selectedAnnualIncomes, setSelectedAnnualIncomes] = useState<string[]>([]);
  const [selectedFamilyStatus, setSelectedFamilyStatus] = useState('');

  // Initialize form values from EditData
  useEffect(() => {
    if (EditData) {
      const visibility = EditData[9];
      
      // Set basic fields
      setValue('profile_visibility.visibility_age_from', visibility.visibility_age_from);
      setValue('profile_visibility.visibility_age_to', visibility.visibility_age_to);
      setValue('profile_visibility.visibility_height_from', visibility.visibility_height_from);
      setValue('profile_visibility.visibility_height_to', visibility.visibility_height_to);
      setValue('profile_visibility.visibility_ragukethu', visibility.visibility_ragukethu);
      setValue('profile_visibility.visibility_chevvai', visibility.visibility_chevvai);
      setValue('profile_visibility.visibility_foreign_interest', visibility.visibility_foreign_interest);
      setValue('profile_visibility.visibility_family_status', visibility.visibility_family_status);
      
      // Set checkbox values
      if (visibility.visibility_profession) {
        const professions = visibility.visibility_profession.split(',').map(Number);
        setSelectedProfessions(professions);
        setValue('profile_visibility.visibility_profession', professions.join(','));
      }
      
      if (visibility.visibility_education) {
        const educations = visibility.visibility_education.split(',');
        setSelectedEducations(educations);
        setValue('profile_visibility.visibility_education', educations.join(','));
      }
      
      if (visibility.visibility_anual_income) {
        const incomes = visibility.visibility_anual_income.split(',');
        setSelectedAnnualIncomes(incomes);
        setValue('profile_visibility.visibility_anual_income', incomes.join(','));
      }
      
      setSelectedFamilyStatus(visibility.visibility_family_status);
    }
  }, [EditData, setValue]);

  // Update family status in parent component
  useEffect(() => {
    setFamilyStatusVisibility(selectedFamilyStatus);
  }, [selectedFamilyStatus, setFamilyStatusVisibility]);

  // Profession checkbox handler
  const handleProfessionChange = (id: number) => {
    setSelectedProfessions(prev => {
      const newProfessions = prev.includes(id) 
        ? prev.filter(profId => profId !== id)
        : [...prev, id];
      
      // Update form value
      setValue('profile_visibility.visibility_profession', newProfessions.join(','));
      return newProfessions;
    });
  };

  // Education checkbox handler
  const handleEducationChange = (id: string) => {
    setSelectedEducations(prev => {
      const newEducations = prev.includes(id)
        ? prev.filter(eduId => eduId !== id)
        : [...prev, id];
      
      // Update form value
      setValue('profile_visibility.visibility_education', newEducations.join(','));
      return newEducations;
    });
  };

  // Annual Income checkbox handler
  const handleAnnualIncomeChange = (id: string) => {
    setSelectedAnnualIncomes(prev => {
      const newIncomes = prev.includes(id)
        ? prev.filter(incomeId => incomeId !== id)
        : [...prev, id];
      
      // Update form value
      setValue('profile_visibility.visibility_anual_income', newIncomes.join(','));
      return newIncomes;
    });
  };

  // Family status radio handler
  const handleFamilyStatusChange = (id: string) => {
    setSelectedFamilyStatus(id);
    setValue('profile_visibility.visibility_family_status', id);
  };

  const { data: FamilyStatus } = useQuery({
    queryKey: ['FamilyStatus'],
    queryFn: fetchFamilyStatus,
  });
// const [EditProfession, setEditProfession] = useState('');
//   const handleSelectAllProfessions = () => {
//   if (!professionVisibility || professionVisibility.length === 0) return;

//   const allIds = professionVisibility.map((p: any) => p.Profes_Pref_id.toString());
//   const currentSelectedIds = EditProfession.split(',').filter(Boolean);

//   // Check if all are currently selected
//   const isAllSelected = 
//     currentSelectedIds.length === allIds.length &&
//     allIds.every((id:any )=> currentSelectedIds.includes(id));

//   if (isAllSelected) {
//     // If all are selected, unselect all
//     setEditProfession('');
//   } else {
//     // Else, select all
//     setEditProfession(allIds.join(','));
//   }
// };
const handleSelectAllEducations = () => {
  if (!educationVisibility || educationVisibility.length === 0) return;

  const allEducationIds = educationVisibility.map(e => e.Edu_Pref_id.toString());
  
  const isAllSelected = selectedEducations.length === allEducationIds.length &&
    allEducationIds.every(id => selectedEducations.includes(id));

  if (isAllSelected) {
    setSelectedEducations([]);
    setValue('profile_visibility.visibility_education', '');
  } else {
    setSelectedEducations(allEducationIds);
    setValue('profile_visibility.visibility_education', allEducationIds.join(','));
  }
};


const handleSelectAllAnnualIncomes = () => {
  if (!annualIncomeVisibility || annualIncomeVisibility.length === 0) return;

  const allIncomeIds = annualIncomeVisibility.map(i => i.income_id.toString());
  
  const isAllSelected = selectedAnnualIncomes.length === allIncomeIds.length &&
    allIncomeIds.every(id => selectedAnnualIncomes.includes(id));

  if (isAllSelected) {
    setSelectedAnnualIncomes([]);
    setValue('profile_visibility.visibility_anual_income', '');
  } else {
    setSelectedAnnualIncomes(allIncomeIds);
    setValue('profile_visibility.visibility_anual_income', allIncomeIds.join(','));
  }
};


// Update your handleSelectAllProfessions function
const handleSelectAllProfessions = () => {
  if (!profession || profession.length === 0) return;

  const allProfessionIds = profession.map((p:any) => p.Profes_Pref_id);
  
  // Check if all are currently selected
  const isAllSelected = selectedProfessions.length === allProfessionIds.length &&
    allProfessionIds.every((id: number) => selectedProfessions.includes(id));

  if (isAllSelected) {
    // If all are selected, unselect all
    setSelectedProfessions([]);
    setValue('profile_visibility.visibility_profession', '');
  } else {
    // Else, select all
    setSelectedProfessions(allProfessionIds);
    setValue('profile_visibility.visibility_profession', allProfessionIds.join(','));
  }
};

// Update your profession checkboxes section
<div className="w-full mt-6">
  <div className="flex items-center mb-2">
    <h5 className="text-[18px] text-black font-semibold mr-3">
      Profession
    </h5>
    <button 
      type="button"
      onClick={handleSelectAllProfessions}
      className="text-sm text-blue-500 hover:underline"
    >
      {selectedProfessions.length === professionVisibility?.length ? 
        'Unselect All' : 'Select All'}
    </button>
  </div>
  <div className="flex flex-wrap justify-between items-center">
    {professionVisibility?.map((profession: ProfessionPref) => (
      <div key={profession.Profes_Pref_id}>
        <input
          type="checkbox"
          id={`professionVisibility-${profession.Profes_Pref_id}`}
          checked={selectedProfessions.includes(profession.Profes_Pref_id)}
          onChange={() => handleProfessionChange(profession.Profes_Pref_id)}
        />
        <label
          htmlFor={`professionVisibility-${profession.Profes_Pref_id}`}
          className='pl-1 text-[#000000e6] font-medium'
        >
          {profession.Profes_name}
        </label>
      </div>
    ))}
  </div>
</div>
  return (
    <div className='bg-white p-5 rounded shadow-md'>
      <h4 
        className='text-xl text-red-600 font-semibold flex items-center justify-between cursor-pointer'
        onClick={toggleSection}
      >
        Profile Visibility
        <svg
          className={`fill-current transform ${isProfileVisibility ? '' : 'rotate-180'}`}
          width={'20'}
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
      
      {isProfileVisibility && (
        <>
          <div className='flex gap-6 mt-4 flex-col md:flex-row'>
            <div className='w-full'>
              <label htmlFor="ageFrom" className="text-[20px] text-black font-semibold block mb-2">
                Age
              </label>
              <div className='flex gap-3 items-center justify-center'>
                <div className='w-full'>
                  <InputField 
                    label={''} 
                    placeholder='From'  
                    {...register('profile_visibility.visibility_age_from')}
                  />
                </div>
                <div className='w-full'>
                  <InputField 
                    label={''} 
                    placeholder='To' 
                    {...register('profile_visibility.visibility_age_to')}
                  />
                </div>
              </div>
            </div>

            <div className='w-full'>
              <label htmlFor="ageFrom" className="text-[20px] text-black font-semibold block mb-2">
                Height
              </label>
              <div className='flex gap-3 items-center justify-center'>
                <div className='w-full'>
                  <InputField 
                    label={''} 
                    placeholder='From' 
                    {...register('profile_visibility.visibility_height_from')}
                  />
                </div>
                <div className='w-full'>
                  <InputField 
                    label={''} 
                    placeholder='To' 
                    {...register('profile_visibility.visibility_height_to')}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Profession Checkboxes */}
          <div className="w-full mt-6">
            <h5 className="text-[18px] text-black font-semibold mb-2 cursor-pointer"  onClick={handleSelectAllProfessions}>
              Profession
            </h5>
            <div className="flex flex-wrap justify-between items-center">
              {profession?.map((profession: ProfessionPref) => (
                <div key={profession.Profes_Pref_id}>
                  <input
                    type="checkbox"
                    id={`professionVisibility-${profession.Profes_Pref_id}`}
                    checked={selectedProfessions.includes(profession.Profes_Pref_id)}
                    onChange={() => handleProfessionChange(profession.Profes_Pref_id)}
                  />
                  <label
                    htmlFor={`professionVisibility-${profession.Profes_Pref_id}`}
                    className='pl-1 text-[#000000e6] font-medium'
                  >
                    {profession.Profes_name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Education Checkboxes */}
          <div className='mt-6'>
            <label className="text-[18px] text-black font-semibold mb-2 cursor-pointer" onClick={handleSelectAllEducations}>
              Education
            </label>
            <div className="flex flex-wrap gap-4">
              {educationVisibility.map((option) => (
                <div key={option.Edu_Pref_id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`educationVisibility-${option.Edu_Pref_id}`}
                    checked={selectedEducations.includes(option.Edu_Pref_id.toString())}
                    onChange={() => handleEducationChange(option.Edu_Pref_id.toString())}
                  />
                  <label
                    htmlFor={`educationVisibility-${option.Edu_Pref_id}`}
                    className='pl-1 text-[#000000e6] font-medium'
                  >
                    {option.Edu_name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Annual Income Checkboxes */}
          <div className='mt-6'>
            <label className="text-[18px] text-black font-semibold mb-2 cursor-pointer" onClick={handleSelectAllAnnualIncomes}>
              Annual Income
            </label>
            <div className="flex flex-wrap gap-4">
              {annualIncomeVisibility?.map((option: AnnualIncome) => (
                <div key={option.income_id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`incomeVisibility-${option.income_id}`}
                    checked={selectedAnnualIncomes.includes(option.income_id.toString())}
                    onChange={() => handleAnnualIncomeChange(option.income_id.toString())}
                  />
                  <label
                    htmlFor={`incomeVisibility-${option.income_id}`}
                    className='pl-1 text-[#000000e6] font-medium'
                  >
                    {option.income_description}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Family Status Radio Buttons */}
          {/* <div className="w-full py-1 mt-6">
            <label className="block text-black font-medium mb-1">
              Family Status 
            </label>
            <div className="w-full inline-flex rounded max-md:flex-col">
              {FamilyStatus?.map((status) => (
                <label
                  key={status.family_status_id}
                  className={`w-full px-5 py-3 text-sm font-bold border border-black cursor-pointer ${
                    selectedFamilyStatus === status.family_status_id
                      ? 'bg-blue-500 text-white'
                      : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="familyStatus"
                    checked={selectedFamilyStatus === status.family_status_id}
                    onChange={() => handleFamilyStatusChange(status.family_status_id)}
                    className="hidden"
                  />
                  {status.family_status_name}
                </label>
              ))}
            </div>
          </div> */}

                 
  <div className="w-full py-1">
                <label className="block text-black font-medium mb-1">
                  Family Status 
                </label>
                <div className="w-full inline-flex rounded max-md:flex-col">
                  {FamilyStatus?.map((status) => ( 
                  
                    <label
                       key={status.family_status_id}
                     // className='w-full px-5 py-3 text-sm font-medium border cursor-pointer'
                      className={`w-full px-5 py-3 text-sm font-bold border border-black cursor-pointer ${String(selectedFamilyStatus) ===
                        String(status.family_status_id)
                        ? 'bg-blue-500 text-white'
                        : ''
                        }`}
                      onClick={() =>
                        setSelectedFamilyStatus(status.family_status_id)
                      }
                    >
                      <input
                         value={status.family_status_id}
                       {...register('profile_visibility.visibility_family_status')}
                        type="radio"
                        className="w-0"
                      />
                      {status.family_status_name}
                    </label>
                  ))}
                </div>
                 {/* {errors?.PartnerPreference?.FamilyStatus && (
                  <p className="text-red-600">Family status is required</p>
                )}  */}
                 {/* {errors?.profile_visibility.visibility_family_status && (
                  <p className="text-red-600">
                    {errors.profile_visibility.visibility_family_status.message}
                  </p>
                )} */}
              </div>


          {/* Other Options */}
          <div className='mt-6 flex flex-wrap items-center justify-between'>
            <div className="mb-5">
              <h4 className="text-[20px] text-black font-semibold mb-2 max-md:text-[18px]">
                Rahu/Ketu Dhosam
              </h4>
              <div className="flex space-x-4">
                <label className="inline-flex items-center text-ash">
                  <input
                    type="radio"
                    value="Yes"
                    {...register("profile_visibility.visibility_ragukethu")}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="inline-flex items-center text-ash">
                  <input
                    type="radio"
                    value="NO"
                    {...register("profile_visibility.visibility_ragukethu")}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            <div className="mb-5">
              <h4 className="text-[20px] text-black font-semibold mb-2 max-md:text-[18px]">
                Chevvai Dhosam
              </h4>
              <div className="flex space-x-4">
                <label className="inline-flex items-center text-ash">
                  <input
                    type="radio"
                    value="Yes"
                    {...register("profile_visibility.visibility_chevvai")}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="inline-flex items-center text-ash">
                  <input
                    type="radio"
                    value="NO"
                    {...register("profile_visibility.visibility_chevvai")}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            <div className="mb-5">
              <h4 className="text-[20px] text-black font-semibold mb-2 max-md:text-[18px]">
                Foreign Interest
              </h4>
              <div className="flex space-x-4">
                <label className="inline-flex items-center text-ash">
                  <input
                    type="radio"
                    value="Yes"
                    {...register("profile_visibility.visibility_foreign_interest")}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="inline-flex items-center text-ash">
                  <input
                    type="radio"
                    value="NO"
                    {...register("profile_visibility.visibility_foreign_interest")}
                    className="mr-2"
                  />
                  No
                </label>
                <label className="inline-flex items-center text-ash">
                  <input
                    type="radio"
                    value="BOTH"
                    {...register("profile_visibility.visibility_foreign_interest")}
                    className="mr-2"
                  />
                  Both
                </label>
              </div>
            </div>
          </div>

          <div className='flex justify-end mt-6'>
            <button 
              className='bg-blue-500 text-white px-15 py-2 rounded' 
              type="submit"
            >
              Save Profile Visibility
            </button>
          </div>
        </>
      )}
    </div>
  );
};
