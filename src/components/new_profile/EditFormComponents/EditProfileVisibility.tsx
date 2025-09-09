import { useQuery } from '@tanstack/react-query'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import InputField from '../../InputField';
import { AnnualIncome, EduPref, ProfessionPref } from './EditPartnerPreference';
import { useFormContext } from 'react-hook-form';
import { ProfileVisibilityResponse } from '../../../types/EditProfileVisibiltySchema';
import { annualIncomeApi, fetchFamilyStatus, getProfession } from '../../../action';
import axios from 'axios';
import { apiAxios } from '../../../api/apiUrl';
import Select from 'react-select'; // Import react-select


interface FieldOfStudy {
  study_id: number;
  study_description: string;
}

interface Degree {
  degeree_id: number;
  degeree_description: string;
}

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
  const [selectedFamilyStatus, setSelectedFamilyStatus] = useState<string[]>([]);
  const [annualIncome, setAnnualIncome] = useState<AnnualIncome[]>([]);
  console.log(annualIncome);
  const [selectedMaxAnnualIncome, setSelectedMaxAnnualIncome] = useState<string>('');
  // --- New State for Field of Study and Degree ---
  const [fieldOfStudyOptions, setFieldOfStudyOptions] = useState<FieldOfStudy[]>([]);
  const [degreeOptions, setDegreeOptions] = useState<Degree[]>([]);
  const [selectedFieldsOfStudy, setSelectedFieldsOfStudy] = useState<string[]>([]);
  const [selectedDegrees, setSelectedDegrees] = useState<string[]>([]);

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

    // --- New API Calls to Fetch Field of Study and Degree ---
    const fetchFieldOfStudy = async () => {
      try {
        const response = await apiAxios.post(`auth/Get_Field_ofstudy/`);
        const options = Object.values(response.data) as FieldOfStudy[];
        setFieldOfStudyOptions(options);
      } catch (error) {
        console.error('Error fetching Field of Study options:', error);
      }
    };

    const fetchDegrees = async () => {
      try {
        const response = await apiAxios.get(`auth/pref_degree_list/`);
        // Check the actual response structure
        console.log('Degree API response:', response.data);

        // Adjust based on actual API response structure
        const options = Array.isArray(response.data)
          ? response.data
          : Object.values(response.data) as Degree[];

        setDegreeOptions(options);
      } catch (error) {
        console.error('Error fetching Degree options:', error);
      }
    };
    fetchFieldOfStudy();
    fetchDegrees();
    fetchAnnualIncome();
  }, []);

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
      // setValue('profile_visibility.degree', visibility.degree);

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

      if (visibility.visibility_anual_income_max) {
        setSelectedMaxAnnualIncome(visibility.visibility_anual_income_max);
        setValue('profile_visibility.visibility_anual_income_max', visibility.visibility_anual_income_max);
      }

      if (visibility.visibility_family_status) {
        const familyStatuses = visibility.visibility_family_status.split(',');
        setSelectedFamilyStatus(familyStatuses);
        setValue('profile_visibility.visibility_family_status', familyStatuses.join(','));
        setFamilyStatusVisibility(familyStatuses.join(','));
      }
      // --- Set initial values for Field of Study and Degree ---
      if (visibility.visibility_field_of_study) {
        const fields = visibility.visibility_field_of_study.split(',');
        setSelectedFieldsOfStudy(fields);
        setValue('profile_visibility.visibility_field_of_study', fields.join(','));
      }

      if (visibility.degree) {
        const degrees = visibility.degree.split(',').filter(Boolean);
        setSelectedDegrees(degrees);
        setValue('profile_visibility.degree', degrees.join(','));
      }
    }
  }, [EditData, setValue, setFamilyStatusVisibility]);

  const handleMaxAnnualIncomeChange = (value: string) => {
    setSelectedMaxAnnualIncome(value);
    setValue('profile_visibility.visibility_anual_income_max', value);
  };

  // Update family status in parent component
  useEffect(() => {
    setFamilyStatusVisibility(selectedFamilyStatus.join(','));
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

  // Family status checkbox handler
  const handleFamilyStatusChange = (id: string) => {
    setSelectedFamilyStatus(prev => {
      const newStatuses = prev.includes(id)
        ? prev.filter(statusId => statusId !== id)
        : [...prev, id];

      // Update form value
      setValue('profile_visibility.visibility_family_status', newStatuses.join(','));
      return newStatuses;
    });
  };

  // Field of Study handler
  const handleFieldOfStudyChange = (id: string) => {
    setSelectedFieldsOfStudy(prev => {
      const newFields = prev.includes(id)
        ? prev.filter(fieldId => fieldId !== id)
        : [...prev, id];
      setValue('profile_visibility.visibility_field_of_study', newFields.join(','));
      return newFields;
    });
  };

  // Degree handler
  const handleDegreeChange = (selectedOptions: any) => {
    const selectedIds = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    setSelectedDegrees(selectedIds);
    setValue('profile_visibility.degree', selectedIds.join(','));
  };
  const getSelectedDegreeOptions = () => {
    return degreeOptions
      .filter(degree => selectedDegrees.includes(degree.degeree_id.toString()))
      .map(degree => ({
        value: degree.degeree_id.toString(),
        label: degree.degeree_description
      }));
  };

  // --- New "Select All" handlers ---
  const handleSelectAllFieldOfStudy = () => {
    if (!fieldOfStudyOptions || fieldOfStudyOptions.length === 0) return;
    const allIds = fieldOfStudyOptions.map(f => f.study_id.toString());
    const isAllSelected = selectedFieldsOfStudy.length === allIds.length;
    if (isAllSelected) {
      setSelectedFieldsOfStudy([]);
      setValue('profile_visibility.visibility_field_of_study', '');
    } else {
      setSelectedFieldsOfStudy(allIds);
      setValue('profile_visibility.visibility_field_of_study', allIds.join(','));
    }
  };

  const handleSelectAllDegrees = () => {
    if (!degreeOptions || degreeOptions.length === 0) return;
    const allIds = degreeOptions.map(d => d.degeree_id.toString());
    const isAllSelected = selectedDegrees.length === allIds.length;
    if (isAllSelected) {
      setSelectedDegrees([]);
      setValue('profile_visibility.degree', '');
    } else {
      setSelectedDegrees(allIds);
      setValue('profile_visibility.degree', allIds.join(','));
    }
  };

  const { data: FamilyStatus } = useQuery({
    queryKey: ['FamilyStatus'],
    queryFn: fetchFamilyStatus,
  });

  const handleSelectAllFamilyStatus = () => {
    if (!FamilyStatus || FamilyStatus.length === 0) return;

    const allIds = FamilyStatus.map(f => f.family_status_id.toString());
    const isAllSelected = selectedFamilyStatus.length === allIds.length;

    if (isAllSelected) {
      // If all are selected, deselect all
      setSelectedFamilyStatus([]);
      setValue('profile_visibility.visibility_family_status', '');
    } else {
      // Else, select all
      setSelectedFamilyStatus(allIds);
      setValue('profile_visibility.visibility_family_status', allIds.join(','));
    }
  };

  const handleSelectAllEducations = () => {
    if (!educationVisibility || educationVisibility.length === 0) return;

    const allEducationIds = educationVisibility.map(e => e.Edu_Pref_id.toString());
    const isAllSelected = selectedEducations.length === allEducationIds.length;

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
    const isAllSelected = selectedAnnualIncomes.length === allIncomeIds.length;

    if (isAllSelected) {
      setSelectedAnnualIncomes([]);
      setValue('profile_visibility.visibility_anual_income', '');
    } else {
      setSelectedAnnualIncomes(allIncomeIds);
      setValue('profile_visibility.visibility_anual_income', allIncomeIds.join(','));
    }
  };

  const handleSelectAllProfessions = () => {
    if (!profession || profession.length === 0) return;

    const allProfessionIds = profession.map((p: any) => p.Profes_Pref_id.toString());
    const isAllSelected = selectedProfessions.length === allProfessionIds.length;

    if (isAllSelected) {
      setSelectedProfessions([]);
      setValue('profile_visibility.visibility_profession', '');
    } else {
      setSelectedProfessions(allProfessionIds.map((id: string) => parseInt(id)));
      setValue('profile_visibility.visibility_profession', allProfessionIds.join(','));
    }
  };

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
              <label htmlFor="ageFrom" className="text-[20px] text-[#5a5959e6] font-semibold block mb-2">
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
              <label htmlFor="ageFrom" className="text-[20px] text-[#5a5959e6] font-semibold block mb-2">
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
            <div className="flex items-center mb-2">
              <h5 className="text-[18px] text-[#5a5959e6] font-semibold mr-3 cursor-pointer" onClick={handleSelectAllProfessions}>
                Profession
              </h5>
              {/* <button
                type="button"
                onClick={handleSelectAllProfessions}
                className="text-sm text-blue-500 hover:underline"
              >
                {selectedProfessions.length === profession?.length ? 'Unselect All' : 'Select All'}
              </button> */}
            </div>
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
                    className='pl-1 text-[#5a5959e6] font-medium'
                  >
                    {profession.Profes_name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Education Checkboxes */}
          <div className='mt-6'>
            <div className="flex items-center mb-2">
              <label className="text-[18px] text-[#5a5959e6] font-semibold mr-3 cursor-pointer" onClick={handleSelectAllEducations}>
                Education
              </label>
            </div>
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
                    className='pl-1 text-[#5a5959e6] font-medium'
                  >
                    {option.Edu_name}
                  </label>
                </div>
              ))}
            </div>
          </div>


          {/* --- Field of Study Checkboxes --- */}
          <div className='mt-6'>
            <div className="flex items-center mb-2">
              <label className="text-[18px] text-[#5a5959e6] font-semibold mr-3 cursor-pointer" onClick={handleSelectAllFieldOfStudy}>
                Field of Study
              </label>
            </div>
            <div className="flex flex-wrap gap-4">
              {fieldOfStudyOptions.map((option) => (
                <div key={option.study_id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`fieldOfStudy-visibility-${option.study_id}`}
                    checked={selectedFieldsOfStudy.includes(option.study_id.toString())}
                    onChange={() => handleFieldOfStudyChange(option.study_id.toString())}
                  />
                  <label
                    htmlFor={`fieldOfStudy-visibility-${option.study_id}`}
                    className='pl-1 text-[#5a5959e6] font-medium'
                  >
                    {option.study_description}
                  </label>
                </div>
              ))}
            </div>
          </div>


          {/* --- Degree Checkboxes --- */}
          <div className='mt-6'>
            <div className="flex items-center mb-2">
              <label className="text-[18px] text-[#5a5959e6] font-semibold mr-3 cursor-pointer" onClick={handleSelectAllDegrees}>
                Degree
              </label>
            </div>
            <Select
              isMulti
              options={degreeOptions.map(degree => ({
                value: degree.degeree_id.toString(),
                label: degree.degeree_description,
              }))}
              value={getSelectedDegreeOptions()}
              onChange={handleDegreeChange}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select Degrees"
            />
          </div>


          {/* Annual Income Checkboxes */}
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

                  {...register('profile_visibility.visibility_anual_income')}
                  className="outline-none w-full px-4 py-2 border border-[#b5b2b2e6]  text-[#222020e6] font-medium  rounded"
                >
                  <option value="" className='text-[#000000e6] font-medium'>
                    Select  Minimum Annual Income
                  </option>
                  {annualIncome?.map((option: any) => (
                    <option key={option.income_id} value={option.income_id} className='text-[#000000e6] font-medium'>
                      {option.income_description}
                    </option>
                  ))}
                </select>
                {errors?.profile_visibility?.visibility_anual_income && (
                  <p className="text-red-600">
                    {errors.profile_visibility.visibility_anual_income.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label className="text-[#5a5959e6] font-bold">Maximum Annual Income</label>
                <select
                  id="maxAnnualIncome"
                  value={selectedMaxAnnualIncome}
                  onChange={(e) => handleMaxAnnualIncomeChange(e.target.value)}
                  className="outline-none w-full px-4 py-2 border  font-medium border-[#b5b2b2e6]  text-[#222020e6] rounded"
                >
                  <option value="" className='text-[#5a5959e6] font-semibold'>
                    Select  Maximum Annual Income
                  </option>
                  {annualIncome?.map((option: any) => (
                    <option key={option.income_id} value={option.income_id} className='text-[#000000e6] font-medium'>
                      {option.income_description}
                    </option>
                  ))}
                </select>
                {errors?.profile_visibility?.visibility_anual_income_max && (
                  <p className="text-red-600">
                    {errors.profile_visibility.visibility_anual_income_max.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Family Status Checkboxes */}
          <div className='mt-6'>
            <div className="flex items-center mb-2">
              <h5 className="text-[18px] text-[#5a5959e6] font-semibold mr-3 cursor-pointer" onClick={handleSelectAllFamilyStatus}>
                Family Status
              </h5>
              {/* <button
                type="button"
                onClick={handleSelectAllFamilyStatus}
                className="text-sm text-blue-500 hover:underline"
              >
                {selectedFamilyStatus.length === FamilyStatus?.length ? 'Unselect All' : 'Select All'}
              </button> */}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {FamilyStatus?.map((status) => (
                <div key={status.family_status_id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`profileVisibility-${status.family_status_id}`}
                    checked={selectedFamilyStatus.includes(status.family_status_id.toString())}
                    onChange={() => handleFamilyStatusChange(status.family_status_id.toString())}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`profileVisibility-${status.family_status_id}`}
                    className='text-[#5a5959e6] font-medium'
                  >
                    {status.family_status_name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Other Options */}
          <div className='grid grid-cols-3 gap-4 mt-6'>
            <div className="mb-5 ">
              <label className="block  text-[#5a5959e6] font-bold mb-1">
                Rahu/Ketu Dhosam
              </label>
              <div className="relative">
                <select
                  {...register("profile_visibility.visibility_ragukethu")}
                  className="outline-none w-full text-placeHolderColor px-3 py-2.5 text-sm border border-[#b5b2b2e6]  text-[#222020e6] rounded appearance-none"
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

            <div className="mb-5">
              <label className="block text-[#5a5959e6] font-bold mb-1">
                Chevvai Dhosam
              </label>
              <div className="relative">
                <select
                  {...register("profile_visibility.visibility_chevvai")}
                  className="outline-none w-full text-placeHolderColor px-3 py-2.5 text-sm border border-[#b5b2b2e6]  text-[#222020e6] rounded appearance-none"
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

            <div className="mb-5">
              <label className="block text-[#5a5959e6] font-bold mb-1">
                Foreign Interest
              </label>
              <div className="relative">
                <select
                  {...register("profile_visibility.visibility_foreign_interest")}
                  className="outline-none w-full text-placeHolderColor px-3 py-2.5 text-sm border border-[#b5b2b2e6]  text-[#222020e6] rounded appearance-none"
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