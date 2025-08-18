import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import InputField from '../../InputField';

import { useForm, } from 'react-hook-form';
import { ProfileVisibilityResponse } from '../../../types/EditProfileVisibiltySchema';
import { annualIncomeApi, educationalPrefApi, fetchFamilyStatus, getProfession } from '../../../action';
import axios from 'axios';

export interface formProps {

  profile: any

}

export const ViewProfileVisibility: React.FC<formProps> = ({

  profile,

}) => {
  const { setValue, register, watch, } = useForm<ProfileVisibilityResponse>();
  const [isProfileVisibility, setIsProfileVisibility] = useState(true)
  const toggleSection = () => {
    setIsProfileVisibility(!isProfileVisibility);
  };

  // State for checkbox values
  const [selectedProfessions, setSelectedProfessions] = useState<number[]>([]);
  const [selectedEducations, setSelectedEducations] = useState<string[]>([]);
  const [selectedAnnualIncomes, setSelectedAnnualIncomes] = useState<string[]>([]);
  const [selectedFamilyStatus, setSelectedFamilyStatus] = useState('');

  const fromAge = watch('profile_visibility.visibility_age_from')
  // Initialize form values from EditData
  useEffect(() => {
    if (profile) {
      const visibility = profile[9];
      console.log('ns123', visibility)

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
  }, [profile, setValue]);






  // Family status radio handler
  const handleFamilyStatusChange = (id: string) => {
    setSelectedFamilyStatus(id);
    setValue('profile_visibility.visibility_family_status', id);
  };

  const { data: FamilyStatus } = useQuery({
    queryKey: ['FamilyStatus'],
    queryFn: fetchFamilyStatus,
  });

  const [annualIncome, setAnnualIncome] = useState<any>([]);
  const [eduPref, setEduPref] = useState<any>([]);

  const { data: profession } = useQuery({
    queryKey: ['profession'],
    queryFn: getProfession,
  });

  useEffect(() => {
    const fetchEduPref = async () => {
      try {
        const response = await axios.post(`${educationalPrefApi}`);
        const options = Object.values(response.data);

        setEduPref(options);
      } catch (error) {
        console.error('Error fetching Edu Pref options:', error);
      }
    };
    const fetchAnnualIncome = async () => {
      try {
        const response = await axios.post(`${annualIncomeApi}`);
        const options = Object.values(response.data);
        setAnnualIncome(options);
      } catch (error) {
        console.error('Error fetching Annual Income options:', error);
      }
    };
    fetchAnnualIncome();

    fetchEduPref();
  }, []);


  // Update your profession checkboxes section
  <div className="w-full mt-6">
    <div className="flex items-center mb-2">
      <h5 className="text-[18px] text-black font-semibold mr-3">
        Profession
      </h5>

    </div>
    <div className="flex flex-wrap justify-between items-center">
      {profession?.map((profession: any) => (
        <div key={profession.Profes_Pref_id}>
          <input
            type="checkbox"
            id={`professionVisibility-${profession.Profes_Pref_id}`}
            checked={selectedProfessions.includes(profession.Profes_Pref_id)}
            onClick={(e) => e.preventDefault()}
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
                    readOnly
                    value={fromAge}
                    {...register('profile_visibility.visibility_age_from')}
                  />
                </div>
                <div className='w-full'>
                  <InputField
                    label={''}
                    placeholder='To'
                    readOnly
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
                    readOnly
                    placeholder='From'
                    {...register('profile_visibility.visibility_height_from')}
                  />
                </div>
                <div className='w-full'>
                  <InputField
                    label={''}
                    placeholder='To'
                    readOnly
                    {...register('profile_visibility.visibility_height_to')}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Profession Checkboxes */}
          <div className="w-full mt-6">
            <h5 className="text-[18px] text-black font-semibold mb-2 cursor-pointer"  >
              Profession
            </h5>
            <div className="flex flex-wrap justify-between items-center">
              {profession?.map((profession: any) => (
                <div key={profession.Profes_Pref_id}>
                  <input
                    type="checkbox"
                    id={`professionVisibility-${profession.Profes_Pref_id}`}
                    checked={selectedProfessions.includes(profession.Profes_Pref_id)}
                    onClick={(e) => e.preventDefault()}
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
            <label className="text-[18px] text-black font-semibold mb-2 cursor-pointer">
              Education
            </label>
            <div className="flex flex-wrap gap-4">
              {eduPref.map((option: any) => (
                <div key={option.Edu_Pref_id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`educationVisibility-${option.Edu_Pref_id}`}
                    checked={selectedEducations.includes(option.Edu_Pref_id.toString())}
                    onClick={(e) => e.preventDefault()}
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
            <label className="text-[18px] text-black font-semibold mb-2 cursor-pointer" >
              Annual Income
            </label>
            <div className="flex flex-wrap gap-4">
              {annualIncome?.map((option: any) => (
                <div key={option.income_id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`incomeVisibility-${option.income_id}`}
                    checked={selectedAnnualIncomes.includes(option.income_id.toString())}
                    onClick={(e) => e.preventDefault()}
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
                  //   onClick={() =>
                  //     setSelectedFamilyStatus(status.family_status_id)
                  //   }
                  onClick={(e) => e.preventDefault()}
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
          <div className="grid grid-cols-3 gap-4">
            <div className="mb-5">
              <label className="block text-black font-bold mb-1">
                Rahu/Ketu Dhosam
              </label>
              <div className="relative">
                <select
                  {...register("profile_visibility.visibility_ragukethu")}
                  value={watch("profile_visibility.visibility_ragukethu")}
                  disabled
                  className="outline-none w-full text-placeHolderColor px-3 py-2.5 text-sm border border-ashBorder rounded appearance-none bg-gray-100"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  ▼
                </span>
              </div>
            </div>


            <div className="mb-5">
              <label className="block text-black font-bold mb-1">
                Chevvai Dhosam
              </label>
              <div className="relative">
                <select
                  {...register("profile_visibility.visibility_chevvai")}
                  value={watch("profile_visibility.visibility_chevvai")}
                  disabled
                  className="outline-none w-full text-placeHolderColor px-3 py-2.5 text-sm border border-ashBorder rounded appearance-none bg-gray-100"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  ▼
                </span>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-black font-bold mb-1">
                Foreign Interest
              </label>
              <div className="relative">
                <select
                  {...register("profile_visibility.visibility_foreign_interest")}
                  value={watch("profile_visibility.visibility_foreign_interest")}
                  disabled
                  className="outline-none w-full text-placeHolderColor px-3 py-2.5 text-sm border border-ashBorder rounded appearance-none bg-gray-100"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Both">Both</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  ▼
                </span>
              </div>
            </div>
          </div>


        </>
      )}
    </div>
  );
};
