// import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Input from '../../Fromfield/Inputfield';
import { useFormContext } from 'react-hook-form';
// import Tooltip from '@mui/material/Tooltip';
import CurrencyCodes from 'currency-codes';
import currencySymbolMap from 'currency-symbol-map';
import {
  GetDistrict,
  GetCity,
  fetchGetHighestEducation,
  // fetchUgDegree,
  fetchAnnualIncome,
  fetchProfessionalPrefe,
  fetchStateStatus,
  fetchCountryStatus,
  fetchFieldOfStudy,
  fetchDegree,
} from '../../../action';

import { useQuery } from '@tanstack/react-query';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { EducationDetails } from '../../../types/EditShemaEducationDetails';
// import { editProfileApi } from '../../../services/api';
// import { object } from 'zod';
import Select from 'react-select';


export interface ugDegrees {
  id: string;
  degree: string;
  is_deleted: boolean;
}

export interface GetDegree {
  degeree_id: string;
  degeree_description: string;
}
export interface AnnualIncome {
  id: string;
  income: string;
  income_amount: string;
  is_deleted: boolean;
}
export interface getFieldOfStudy {
  study_id: string;
  study_description: string;
}
export interface GetHighestEducation {
  education_id: string;
  education_description: string;
}
export interface ProfessionPref {
  Profes_Pref_id: number;
  Profes_name: string;
}
export interface Country {
  country_id: string;
  country_name: string;
}
export interface State {
  state_id: string;
  state_name: string;
}
export interface District {
  disctict_id: string;
  disctict_name: string;
}

export interface City {
  city_id: number;
  city_name: string;
}

interface formProps {
  EditData: any;
  isEducationDetailsOpen: boolean;
  setIsEducationDetailsOpen: Dispatch<SetStateAction<boolean>>;
}
const EducationalDetails: React.FC<formProps> = ({
  EditData,
  isEducationDetailsOpen,
  setIsEducationDetailsOpen,
}) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<EducationDetails>();

  const selectedWorkCountry = watch('EducationDetails.work_country') || '';
  const selectedState = watch('EducationDetails.work_state') || '';
  const selecteddistrict = watch('EducationDetails.work_district') || '';
  const selectedCity = watch('EducationDetails.work_city') || '';
  const selectFieldOfStudy = watch('EducationDetails.field_ofstudy') || '';
  const selectProfession = watch('EducationDetails.profession_details') || '';
  console.log("selectFieldOfStudy", selectProfession);
  const selectedUgDegree = watch('EducationDetails.degree') || '';
  const [showCityTextInput, setShowCityTextInput] = useState(false);
  const [isCityValid, setIsCityValid] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [profession, setProfession] = useState<number>();
  const [degrees, setDegrees] = useState<GetDegree[]>([]);
  const [selectedDegrees, setSelectedDegrees] = useState<string[]>([]);
  const [otherDegree, setOtherDegree] = useState(''); // To store the value of "Other"
  const [showOtherInput, setShowOtherInput] = useState(false); // To conditionally show input box
  const currencyOptions = CurrencyCodes.codes(); // Correct way to get currency codes
  const [selectedEducation, setSelectedEducation] = useState<string>('');
  console.log(selectedEducation);
  const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState<string>('');
  console.log(selectFieldOfStudy);
  const [noDegreeOptions, setNoDegreeOptions] = useState<boolean>(true);
  console.log("noDegreeOptions", noDegreeOptions);


  const preferredCurrencies = [
    'INR', // Indian Rupee - India
    'MYR', // Malaysian Ringgit - Malaysia
    'SGD', // Singapore Dollar - Singapore

    'GBP', // British Pound Sterling - United Kingdom
    'USD', // US Dollar - United States of America
    'AED', // United Arab Emirates Dirham - UAE
  ];

  const otherCurrencies = currencyOptions.filter(
    (code) => !preferredCurrencies.includes(code),
  );
  const sortedCurrencyOptions = [...preferredCurrencies, ...otherCurrencies]; // Combine preferred and other currencies

  const toggleSection4 = () => {
    setIsEducationDetailsOpen(!isEducationDetailsOpen);
  };

  const { data: getFieldOfStudy } = useQuery<getFieldOfStudy[]>({
    queryKey: ['getFieldOfStudy'],
    queryFn: fetchFieldOfStudy,
  });
  console.log(getFieldOfStudy);
  const { data: GetHighestEducation } = useQuery<GetHighestEducation[]>({
    queryKey: ['GetHighestEducation'],
    queryFn: fetchGetHighestEducation,
  });
  console.log(GetHighestEducation);
  const { data: AnnualIncome } = useQuery<AnnualIncome[]>({
    queryKey: ['AnnualIncome'],
    queryFn: fetchAnnualIncome,
  });
  const { data: ProfessionalPreference } = useQuery<ProfessionPref[]>({
    queryKey: ['ProfessionalPreference'],
    queryFn: fetchProfessionalPrefe,
  });
  const { data: WorkCountry } = useQuery<Country[]>({
    queryKey: ['WorkCountry'],
    queryFn: fetchCountryStatus,
  });
  const { data: degreesData } = useQuery({
    queryKey: ['degrees', selectedEducation, selectedFieldOfStudy],
    queryFn: () => fetchDegree(selectedEducation, selectedFieldOfStudy),
    enabled: !!selectedEducation && !!selectedFieldOfStudy,
  });
  const { data: WorkState } = useQuery({
    queryKey: [selectedWorkCountry, 'WorkState'],
    queryFn: () => fetchStateStatus(selectedWorkCountry),
    enabled: !!selectedWorkCountry,
  });
  const { data: WorkDistrict } = useQuery({
    queryKey: [selectedState, 'District'],
    queryFn: () => GetDistrict(selectedState),
    enabled: !!selectedState,
  });
  console.log(WorkDistrict);
  const { data: City } = useQuery<City[]>({
    queryKey: [selecteddistrict, 'City'],
    queryFn: () => GetCity(selecteddistrict),
    enabled: !!selecteddistrict,
  });

  // Load selected values from sessionStorage on component mount
  useEffect(() => {
    const savedEducation = sessionStorage.getItem('selectedEducation');
    const savedFieldOfStudy = sessionStorage.getItem('selectedFieldOfStudy');
    const savedDegrees = sessionStorage.getItem('selectedDegrees');
    const savedOtherDegree = sessionStorage.getItem('otherDegree');


    if (savedEducation) {
      setSelectedEducation(savedEducation);
      setValue('EducationDetails.heighestEducation', savedEducation);
    }
    if (savedFieldOfStudy) {
      setSelectedFieldOfStudy(savedFieldOfStudy);
      setValue('EducationDetails.field_ofstudy', savedFieldOfStudy);
    }
    if (savedDegrees) {
      const parsedDegrees = JSON.parse(savedDegrees);
      setSelectedDegrees(parsedDegrees);
      setValue('EducationDetails.degree', parsedDegrees.join(','));
    }
    if (savedOtherDegree) {
      setOtherDegree(savedOtherDegree);
    }
  }, [setValue]);



  // Save selected values to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem('selectedEducation', selectedEducation);
  }, [selectedEducation]);

  useEffect(() => {
    sessionStorage.setItem('selectedFieldOfStudy', selectedFieldOfStudy);
  }, [selectedFieldOfStudy]);

  useEffect(() => {
    sessionStorage.setItem('selectedDegrees', JSON.stringify(selectedDegrees));
  }, [selectedDegrees]);

  useEffect(() => {
    sessionStorage.setItem('otherDegree', otherDegree);
  }, [otherDegree]);


  // Add useEffect for initial data population
  useEffect(() => {
    if (EditData && EditData[2]) {
      // Set highest education
      const highestEducation = EditData[2].highest_education;
      if (highestEducation) {
        setSelectedEducation(highestEducation);
        setValue('EducationDetails.heighestEducation', highestEducation);
      }

      // Set field of study if education level allows it
      if (['1', '2', '3', '4'].includes(highestEducation)) {
        const fieldOfStudy = EditData[2].field_ofstudy;
        if (fieldOfStudy) {
          setSelectedFieldOfStudy(fieldOfStudy);
          setValue('EducationDetails.field_ofstudy', fieldOfStudy);
        }
      }

      // Handle degrees including "Other" option - handle null values properly
      if (EditData[2].degree && EditData[2].degree !== null) {
        const existingDegrees = EditData[2].degree.split(',');
        setSelectedDegrees(existingDegrees);
        setValue('EducationDetails.degree', EditData[2].degree);

        // Check if "86" (Other) is in the degrees
        if (existingDegrees.includes('86')) {
          setShowOtherInput(true);
          setOtherDegree(EditData[2].other_degree || '');
          setValue('EducationDetails.other_degree', EditData[2].other_degree || '');
        }
      } else {
        // Handle null degree value
        setSelectedDegrees([]);
        setValue('EducationDetails.degree', '');
        setShowOtherInput(false);
        setOtherDegree('');
        setValue('EducationDetails.other_degree', '');
      }

      setValue('EducationDetails.AboutEducation', EditData[2].about_edu || '');
      setValue('EducationDetails.AnnualIncome', EditData[2].anual_income || '');
      setValue('EducationDetails.ActualIncome', EditData[2].actual_income || '');
      setValue('EducationDetails.profession', EditData[2].profession || '');
      setValue('EducationDetails.work_country', EditData[2].work_country || '');
      setValue('EducationDetails.workplace', EditData[2].work_place || '');

      // Handle work state - check if it's a name or ID
      const workState = EditData[2].work_state;
      if (workState) {
        // If workState is a string (state name), we'll handle it in a separate useEffect
        // that runs after WorkState data is loaded
        setValue('EducationDetails.work_state', workState);
      }

      setValue('EducationDetails.work_city', EditData[2].work_city || '');
      setValue('EducationDetails.profession', EditData[2].profession || '');
      setProfession(Number(EditData[2].profession));
      setValue('EducationDetails.company_name', EditData[2].company_name || '');
      setValue('EducationDetails.designation', EditData[2].designation || '');
      setValue('EducationDetails.profession_details', EditData[2].profession_details || '');
      setValue('EducationDetails.business_name', EditData[2].business_name || '');
      setValue('EducationDetails.business_address', EditData[2].business_address || '');
      setValue('EducationDetails.nature_of_business', EditData[2].nature_of_business || '');
      setValue('EducationDetails.work_district', EditData[2].work_district || '');
      setValue('EducationDetails.pincode', EditData[2].work_pincode || '');
      setValue('EducationDetails.CareerPlans', EditData[2].career_plans || '');
      setValue('EducationDetails.other_degree', EditData[2].other_degree || '');
    }
  }, [EditData, setValue]);

  // Handle state name to ID mapping when WorkState data is available
  useEffect(() => {
    if (EditData && EditData[2] && WorkState && EditData[2].work_state) {
      const workState = EditData[2].work_state;

      // Check if workState is a name (not a numeric ID)
      if (isNaN(Number(workState))) {
        // Find the state by name
        const stateByName = WorkState.find(state =>
          state.state_name.toLowerCase() === workState.toLowerCase()
        );

        if (stateByName) {
          // Set the state ID instead of the name
          setValue('EducationDetails.work_state', stateByName.state_id);
        }
      }
    }
  }, [EditData, WorkState, setValue]);

  // Handle district name to ID mapping when WorkDistrict data is available
  useEffect(() => {
    if (EditData && EditData[2] && WorkDistrict && EditData[2].work_district) {
      const workDistrict = EditData[2].work_district;

      // Check if workDistrict is a name (not a numeric ID)
      if (isNaN(Number(workDistrict))) {
        // Find the district by name
        const districtByName = WorkDistrict.find(district =>
          district.disctict_name.toLowerCase() === workDistrict.toLowerCase()
        );

        if (districtByName) {
          // Set the district ID instead of the name
          setValue('EducationDetails.work_district', districtByName.disctict_id);
        }
      }
    }
  }, [EditData, WorkDistrict, setValue]);

  // Handle city name to ID mapping when City data is available
  useEffect(() => {
    if (EditData && EditData[2] && City && EditData[2].work_city) {
      const workCity = EditData[2].work_city;

      // Check if workCity is a name (not a numeric ID)
      if (isNaN(Number(workCity))) {
        // Find the city by name
        const cityByName = City.find(city =>
          city.city_name.toLowerCase() === workCity.toLowerCase()
        );

        if (cityByName) {
          // Set the city ID instead of the name
          setValue('EducationDetails.work_city', cityByName.city_name);
        }
      }
    }
  }, [EditData, City, setValue]);

  // Add useEffect to handle degree data fetching when education and field of study change
  useEffect(() => {
    const fetchDegreeData = async () => {
      if (selectedEducation && selectedFieldOfStudy &&
        ['1', '2', '3', '4'].includes(selectedEducation)) {
        try {
          const degreeData = await fetchDegree(selectedEducation, selectedFieldOfStudy);
          setDegrees(degreeData);
          setNoDegreeOptions(degreeData.length === 0);

          // If there's existing degree data in EditData, set it
          if (EditData?.[2]?.degree && EditData[2].degree !== null) {
            const existingDegrees = EditData[2].degree.split(',');
            setSelectedDegrees(existingDegrees);
            setValue('EducationDetails.degree', EditData[2].degree);
          }
        } catch (error) {
          console.error('Error fetching degrees:', error);
          setNoDegreeOptions(true);
        }
      }
    };

    fetchDegreeData();
  }, [selectedEducation, selectedFieldOfStudy, EditData, setValue]);

  useEffect(() => {
    if (selectedEducation === '5' || selectedEducation === '6') {
      setValue('EducationDetails.field_ofstudy', '');
      setValue('EducationDetails.degree', '');
      setSelectedDegrees([]); // Clear selected degrees
      setShowOtherInput(false); // Hide the "Other" input field
    }
  }, [selectedEducation, setValue]);



  const handleOtherDegreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newOtherDegree = event.target.value;
    setOtherDegree(newOtherDegree);
    setValue('EducationDetails.other_degree', newOtherDegree);
  };

  const handleDegreeChange = (newValue: any) => {
    if (selectedEducation === '5' || selectedEducation === '6') {
      setValue('EducationDetails.field_ofstudy', '');
      setValue('EducationDetails.degree', '');
      setValue('EducationDetails.other_degree', '');
      setSelectedDegrees([]);
      setShowOtherInput(false);
      return;
    }

    // Check if "Others" (degree_id: 86) is selected
    const hasOthers = newValue.some((option: any) => option.value === '86');
    setShowOtherInput(hasOthers);

    // Extract all selected degree IDs including "Others" if selected
    const selectedDegreeIds = newValue.map((option: any) => option.value);
    setSelectedDegrees(selectedDegreeIds);

    // Update form value
    setValue('EducationDetails.degree', selectedDegreeIds.join(','));

    // If "Others" is not selected anymore, clear the other_degree field
    if (!hasOthers) {
      setValue('EducationDetails.other_degree', '');
      setOtherDegree('');
    }
  };

  // Get the selected options for the Select component
  const getSelectedOptions = () => {
    if (!degreesData) return [];

    return selectedDegrees.map(id => {
      const degree = Array.isArray(degreesData)
        ? degreesData.find(d => d.degeree_id.toString() === id)
        : null; // Handle non-array case safely

      return degree ? {
        value: degree.degeree_id.toString(),
        label: degree.degeree_description
      } : null;
    }).filter(Boolean);
  };

  useEffect(() => {
    if (City && selectedCity) {
      const cityExists = City.some(city => city.city_name === selectedCity);
      setIsCityValid(cityExists);
      setShowCityTextInput(!cityExists);
    }
  }, [City, selectedCity]);

  // Add this useEffect to clear work location fields when profession is 3, 4, or 5
  useEffect(() => {
    if (profession === 3 || profession === 4 || profession === 5) {
      // Clear all work location fields
      setValue('EducationDetails.work_country', '');
      setValue('EducationDetails.work_state', '');
      setValue('EducationDetails.work_district', '');
      setValue('EducationDetails.work_city', '');
      setValue('EducationDetails.pincode', '');
      setValue('EducationDetails.CareerPlans', '');
    }
  }, [profession, setValue]);

  // Add this useEffect to manage profession-related fields
  useEffect(() => {
    // Define the fields for salaried and business professions
    const salariedFields = [
      'EducationDetails.company_name',
      'EducationDetails.designation',
      'EducationDetails.profession_details',
    ];

    const businessFields = [
      'EducationDetails.business_name',
      'EducationDetails.business_address',
      'EducationDetails.nature_of_business',
    ];

    // A helper function to clear a list of fields
    const clearFields = (fieldsToClear: string[]) => {
      fieldsToClear.forEach((field) => {
        setValue(field as any, '');
      });
    };

    // Logic to set/clear fields based on the selected profession
    switch (profession) {
      case 1: // Salaried
      case 7: // Salaried Professional
        // Keep salaried fields, clear business fields
        clearFields(businessFields);
        break;

      case 2: // Business/Self-employed
        // Keep business fields, clear salaried fields
        clearFields(salariedFields);
        break;

      case 6: // Salaried and Business
        // Keep all fields, so we do nothing here
        break;

      default:
        // For any other option (e.g., Not Working, Student), clear all fields
        clearFields([...salariedFields, ...businessFields]);
        break;
    }
  }, [profession, setValue]); // This hook runs whenever 'profession' or 'setValue' changes

  useEffect(() => {
    if (profession === 3 || profession === 4 || profession === 5) {
      // Clear all work location fields
      setValue('EducationDetails.work_country', '');
      setValue('EducationDetails.work_state', '');
      setValue('EducationDetails.work_district', '');
      setValue('EducationDetails.work_city', '');
      setValue('EducationDetails.pincode', '');
      setValue('EducationDetails.CareerPlans', '');
      setValue('EducationDetails.workplace', '');
    }
  }, [profession, setValue]);


  return (
    <div className="bg-white p-5 mb-10 rounded shadow-md">
      <h4
        className="text-red-600 flex row items-center justify-between text-xl font-semibold  dark:text-white cursor-pointer  after-red-line::after"
        onClick={toggleSection4}
      >
        Education Details 
        <svg
          className={`fill-current transform ${isEducationDetailsOpen ? 'rotate-180' : ''
            }`}
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
      {isEducationDetailsOpen && (
        <div className="flex flex-col gap-5">
          {/* Education Details Form Fields */}
          <div className="flex w-full flex-row gap-4">
            <div className="w-full">
              <label className="block text-[#5a5959e6] font-semibold mb-1">
                Highest Education Level <span className="text-red-500">*</span>
              </label>
              <select
                {...register('EducationDetails.heighestEducation')}
                className="outline-none w-full px-4 py-2 border border-[#b5b2b2e6]  text-[#222020e6] font-medium  rounded"
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedEducation(value);
                  setValue('EducationDetails.heighestEducation', value);
                  // Reset dependent fields
                  setSelectedFieldOfStudy('');
                  setValue('EducationDetails.field_ofstudy', '');
                  setSelectedDegrees([]);
                  setValue('EducationDetails.degree', '');
                }}
                value={selectedEducation || ''}
              >
                <option value="" className='text-[#000000e6] font-medium'>Select education level</option>
                {GetHighestEducation?.map((education) => (
                  <option
                    key={education.education_id}
                    value={education.education_id}

                  >
                    {education.education_description}
                  </option>
                ))}
              </select>
              {errors?.EducationDetails?.heighestEducation && (
                <p className="text-red-600">
                  {errors.EducationDetails?.heighestEducation.message}
                </p>
              )}
            </div>
            {(selectedEducation === '1' ||
              selectedEducation === '2' ||
              selectedEducation === '3' ||
              selectedEducation === '4') && (
                <>
                  <div className="w-full">
                    <label className="block text-[#5a5959e6] font-semibold mb-1">
                      Field Of Study
                      {/* <span className="text-red-500">*</span> */}
                    </label>
                    <select
                      {...register('EducationDetails.field_ofstudy', { required: false })}
                      className="outline-none w-full px-4 py-2 border border-[#b5b2b2e6]  text-[#222020e6] rounded  font-medium"
                      onChange={(e) => {
                        const value = e.target.value;
                        setSelectedFieldOfStudy(value);
                        setValue('EducationDetails.field_ofstudy', value);
                        // Reset degree selection
                        setSelectedDegrees([]);
                        setValue('EducationDetails.degree', '');
                      }}
                      value={selectedFieldOfStudy || ''}
                    >
                      <option value="" className='text-[#000000e6] font-medium'>Select Field of Study</option>
                      {getFieldOfStudy?.map((education) => (
                        <option
                          key={education.study_id}
                          value={education.study_id}

                        >
                          {education.study_description}
                        </option>
                      ))}
                    </select>
                    {errors?.EducationDetails?.field_ofstudy && (
                      <p className="text-red-600">
                        {errors.EducationDetails.field_ofstudy.message}
                      </p>
                    )}
                  </div>
                </>
              )}
          </div>
          <div className="flex w-full flex-row gap-4">
            {(selectedEducation === '1' ||
              selectedEducation === '2' ||
              selectedEducation === '3' ||
              selectedEducation === '4') && (
                <div className="w-full">
                  <label className="block text-[#5a5959e6] font-semibold mb-1">
                    Degree
                  </label>

                  {noDegreeOptions ? (
                    <input
                      type="text"
                      className="outline-none w-full px-4 py-2 border text-black font-semibold border-black rounded"
                      {...register('EducationDetails.degree', {
                        required: 'Degree is required',
                      })}
                      placeholder="Enter your degreee"
                    />
                  ) : (
                    <div className="flex flex-col text-[#000000e6] font-medium gap-2">
                      <Select
                        {...register('EducationDetails.degree')}
                        isMulti
                        options={[
                          ...degrees?.map((degree) => ({
                            value: degree.degeree_id.toString(),
                            label: degree.degeree_description,
                          })),
                        ]}
                        value={getSelectedOptions()}
                        onChange={handleDegreeChange}
                      />
                      {showOtherInput && (
                        <input
                          type="text"
                          value={otherDegree}
                          {...register('EducationDetails.other_degree')}
                          onChange={handleOtherDegreeChange}
                          placeholder="Enter Specific field"
                          className="outline-none w-full px-4 py-2 border text-[#000000e6] font-medium border-black rounded mt-2"
                        />
                      )}

                      <input
                        type="hidden"
                        {...register("EducationDetails.degree")}
                        value={selectedDegrees.length > 0 ? selectedDegrees.join(",") : ""}
                        className='text-[#000000e6] font-medium'
                      />
                    </div>
                  )}

                  {!selectedUgDegree && errors?.EducationDetails?.degree && (
                    <p className="text-red-600">
                      {errors.EducationDetails?.degree.message}
                    </p>
                  )}
                </div>
              )}

            <div className="w-full">
              <Input
                required
                {...register('EducationDetails.AboutEducation')}
                label={'About your Education'}
              />
              {errors?.EducationDetails?.AboutEducation && (
                <p className="text-red-600">
                  {errors.EducationDetails.AboutEducation.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex w-full flex-row gap-4">
            <div className="w-full">
              <label className="block text-[#5a5959e6] font-semibold mb-1">
                Annual Income
              </label>
              <div className="flex items-center space-x-2">
                <span className="outline-none w-1/25 text-placeHolderColor  font-medium px-4 py-[6px] border border-[#b5b2b2e6]  text-[#222020e6] rounded">
                  INR(₹)
                </span>
                <select
                  {...register('EducationDetails.AnnualIncome')}
                  className="outline-none w-full px-4 py-2 border  rounded border-[#b5b2b2e6]  text-[#222020e6] font-medium"
                >
                  <option value="" className='text-[#5a5959e6] font-medium'>Annual Income</option>
                  {AnnualIncome?.map((education) => (
                    <option key={education.id} value={education.id}>
                      {education.income}
                    </option>
                  ))}
                </select>

              </div>
              {errors?.EducationDetails?.AnnualIncome && (
                <p className="text-red-600">
                  {errors.EducationDetails.AnnualIncome.message}
                </p>
              )}
            </div>
            <div className="w-full ">
              <label
                htmlFor="actualIncome"
                className="block mb-1 text-[#5a5959e6] font-semibold"
              >
                Actual Income
              </label>
              <div className="flex item-center space-x-2">
                <select
                  id="currency"
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  // className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-ashBorder rounded"4
                  className="outline-none text-placeHolderColor px-4 py-[6px]  font-medium border  rounded"
                  style={{ width: '300px' }} // Adjust the width as needed
                >
                  <option value="" className='text-[#5a5959e6] font-medium'>
                    Select Currency
                  </option>
                  {sortedCurrencyOptions.map((code) => (
                    <option key={code} value={code}>
                      {code} ({currencySymbolMap(code) || code})
                    </option>
                  ))}
                </select>
                <Input
                  label={''}
                  required
                  {...register('EducationDetails.ActualIncome')}
                />

              </div>
              {errors?.EducationDetails?.ActualIncome && (
                <p className="text-red-600">
                  {errors.EducationDetails.ActualIncome.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-3">
            <div className="w-full">
              <label className="block text-black font-medium mb-1">
                <h1 className="mb-3 text-[#5a5959e6] font-semibold">
                  Profession <span className="text-red-500">*</span>
                </h1>
              </label>

              <div className="w-full inline-flex rounded">
                {ProfessionalPreference?.map((Profession: ProfessionPref) => (
                  <label
                    key={Profession.Profes_Pref_id}
                    className={`w-full px-5 py-3 text-sm font-medium border border-b border-[#b5b2b2e6]  text-[#222020e6]   text-center cursor-pointer flex flex-wrap ${String(profession) === String(Profession.Profes_Pref_id)
                      ? 'bg-blue-500 text-white'
                      : 'bg-white'
                      } `}
                    onClick={() => setProfession(Profession.Profes_Pref_id)}
                  >
                    <input
                      id="profession"
                      value={Profession.Profes_Pref_id}
                      {...register('EducationDetails.profession')}
                      type="radio"
                      className="w-0"
                    />
                    {Profession.Profes_name}
                  </label>
                ))}
              </div>
            </div>
            {errors?.EducationDetails?.profession && (
              <p className="text-red-600">Profession is required</p>
            )}
            {profession === 1 && (
              <div className="mt-4">
                <div className="mb-3 text-black">
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Name
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    {...register("EducationDetails.company_name")}
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-[#b5b2b2e6] rounded"
                    placeholder="Enter company name"
                  />
                </div>

                <div className="mb-3 text-black">
                  <label
                    htmlFor="designation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Designation
                  </label>
                  <input
                    id="designation"
                    type="text"
                    {...register("EducationDetails.designation")}
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-[#b5b2b2e6] rounded"
                    placeholder="Enter designation"
                  />
                </div>

                <div className="mb-3 text-black">
                  <label
                    htmlFor="professionDetail"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Profession Details
                  </label>
                  <textarea
                    id="professionDetail"
                    {...register("EducationDetails.profession_details")}
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-[#b5b2b2e6] rounded"
                    placeholder="Enter profession details"
                  />
                </div>
              </div>
            )}
            {profession === 2 && (
              <div className="mt-4">
                <div className="mb-3 text-black">
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Business Name
                  </label>
                  <input
                    id="BusinessName"
                    type="text"
                    {...register("EducationDetails.business_name")}
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-[#b5b2b2e6] rounded"
                    placeholder="Enter Business name"
                  />
                </div>

                <div className="mb-3 text-black">
                  <label
                    htmlFor="BusinessAdress"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Business Address
                  </label>
                  <input
                    id="BusinessAdress"
                    type="text"
                    {...register("EducationDetails.business_address")}
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-[#b5b2b2e6] rounded"
                    placeholder="Enter Business Adress"
                  />
                </div>

                <div className="mb-3 text-black">
                  <label
                    htmlFor="NatureofBusiness"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nature of Buisness
                  </label>
                  <textarea
                    id="NatureofBusiness"
                    {...register("EducationDetails.nature_of_business")}
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-[#b5b2b2e6] rounded"
                    placeholder="Enter Nature of Business"
                  />
                </div>
              </div>
            )}

            {profession === 6 && (
              <div className="mt-4">
                <div className="mb-3 text-black">
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Name
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    {...register("EducationDetails.company_name")}
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-[#b5b2b2e6] rounded"
                    placeholder="Enter company name"
                  />
                </div>

                <div className="mb-3 text-black">
                  <label
                    htmlFor="designation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Designation
                  </label>
                  <input
                    id="designation"
                    type="text"
                    {...register("EducationDetails.designation")}
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-[#b5b2b2e6] rounded"
                    placeholder="Enter designation"
                  />
                </div>

                <div className="mb-3 text-black">
                  <label
                    htmlFor="professionDetail"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Profession Details
                  </label>
                  <textarea
                    id="professionDetail"
                    {...register("EducationDetails.profession_details")}
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-[#b5b2b2e6] rounded"
                    placeholder="Enter profession details"
                  />
                </div>
                <div className="mb-3 text-black">
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Business Name
                  </label>
                  <input
                    id="BusinessName"
                    type="text"
                    {...register("EducationDetails.business_name")}
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-[#b5b2b2e6] rounded"
                    placeholder="Enter Business name"
                  />
                </div>

                <div className="mb-3 text-black">
                  <label
                    htmlFor="BusinessAdress"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Business Address
                  </label>
                  <input
                    id="BusinessAdress"
                    type="text"
                    {...register("EducationDetails.business_address")}
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-[#b5b2b2e6] rounded"
                    placeholder="Enter Business Adress"
                  />
                </div>

                <div className="mb-3 text-black">
                  <label
                    htmlFor="NatureofBusiness"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nature of Buisness
                  </label>
                  <textarea
                    id="NatureofBusiness"
                    {...register("EducationDetails.nature_of_business")}
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-[#b5b2b2e6] rounded"
                    placeholder="Enter Nature of Business"
                  />
                </div>
              </div>
            )}

            {profession === 7 && (
              <div className="mt-4">
                <div className="mb-3 text-black">
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Name
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    {...register("EducationDetails.company_name")}
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-[#b5b2b2e6] rounded"
                    placeholder="Enter company name"
                  />
                </div>

                <div className="mb-3 text-black">
                  <label
                    htmlFor="designation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Designation
                  </label>
                  <input
                    id="designation"
                    type="text"
                    {...register("EducationDetails.designation")}
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-[#b5b2b2e6] rounded"
                    placeholder="Enter designation"
                  />
                </div>

                <div className="mb-3 text-black">
                  <label
                    htmlFor="professionDetail"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Profession Details
                  </label>
                  <textarea
                    id="professionDetail"
                    {...register("EducationDetails.profession_details")}
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-[#b5b2b2e6] rounded"
                    placeholder="Enter profession details"
                  />
                </div>
              </div>
            )}
          </div>
          {!(profession === 3 || profession === 4 || profession === 5) && (
            <>
              <h4 className="text-xl font-semibold text-[#5a5959e6] dark:text-white">
                Work Location
              </h4>

              <div className="flex flex-row gap-4">
                <div className="w-2/4">
                  <label className="block text-[#5a5959e6] font-semibold mb-1">
                    Country
                    {/* <span className="text-red-500">*</span> */}
                  </label>
                  <select
                    value={selectedWorkCountry}
                    {...register('EducationDetails.work_country')}
                    className="outline-none w-full px-4 py-2 border border-[#b5b2b2e6] text-[#222020e6] font-semibold rounded"
                    onChange={(e) => {
                      const value = e.target.value;
                      // Set the value for the country field itself
                      setValue('EducationDetails.work_country', value);

                      // Reset all dependent location fields
                      setValue('EducationDetails.work_state', '');
                      setValue('EducationDetails.work_district', '');
                      setValue('EducationDetails.work_city', '');
                    }}
                  >
                    <option value="" className='text-[#000000e6]'>Select your Country </option>
                    {WorkCountry?.map((option: Country) => (
                      <option key={option.country_id} value={option.country_id} className='text-[#222020e6] font-medium'>
                        {option.country_name}
                      </option>
                    ))}
                  </select>
                  {errors?.EducationDetails?.work_country && (
                    <p className="text-red-600">
                      {errors.EducationDetails.work_country.message?.toString()}
                    </p>
                  )}
                </div>
                {Number(selectedWorkCountry) > 1 ? (
                  <div className="w-2/4">
                    {Number(selectedWorkCountry) > 1 ? (
                      <div>
                        <label className="block text-[#5a5959e6] font-semibold mb-1">
                          City
                          {/* <span className="text-red-500">*</span> */}
                        </label>
                        <input
                          type="text"
                          value={selectedCity}
                          {...register('EducationDetails.work_city', {
                            required: 'City is required',
                          })}
                          className="outline-none w-full px-4 py-2 border  text-[#222020e6] font-semibold border-[#b5b2b2e6] rounded"
                          placeholder="Enter your city"
                        />
                        {errors?.EducationDetails?.work_city && (
                          <p className="text-red-600">
                            {errors.EducationDetails.work_city.message?.toString()}
                          </p>
                        )}
                      </div>
                    ) : (
                      selectedWorkCountry === '1' && selecteddistrict && ''
                    )}
                  </div>
                ) : (
                  <div className="w-2/4">
                    {selectedWorkCountry === '1' && (
                      <div className="w-full">
                        <label className="block text-[#5a5959e6] font-semibold mb-1">
                          State (Based on country selection){' '}
                          {/* <span className="text-red-500">*</span> */}
                        </label>
                        <select
                          value={selectedState}
                          {...register('EducationDetails.work_state')}
                          className="outline-none w-full px-4 text-[#222020e6] font-semibold py-2 border border-[#b5b2b2e6] rounded"
                          onChange={(e) => {
                            const value = e.target.value;
                            // Set the value for the state field
                            setValue('EducationDetails.work_state', value);

                            // Reset the district and city fields
                            setValue('EducationDetails.work_district', '');
                            setValue('EducationDetails.work_city', '');
                          }}
                        >
                          <option value="" selected>
                            Select State
                          </option>
                          {WorkState?.map((option: State) => (
                            <option key={option.state_id} value={option.state_id} className='text-[#222020e6] font-medium'>
                              {option.state_name}
                            </option>
                          ))}
                        </select>
                        {errors?.EducationDetails?.work_state && (
                          <p className="text-red-600">
                            {errors.EducationDetails.work_state.message?.toString()}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex w-full flex-row gap-4">
                {selectedWorkCountry === '1' && (
                  <div className="flex w-full flex-row gap-4">
                    <div className="w-full">
                      <label className="block   mb-1 text-[#5a5959e6] font-semibold">
                        District
                      </label>
                      {Number(selectedState) > 7 ? (
                        <>
                          <input
                            type="text"
                            value={selecteddistrict || ''}
                            {...register('EducationDetails.work_district')}
                            className="outline-none w-full px-4 py-2 border text-[#222020e6] font-medium border-[#b5b2b2e6] rounded"
                            placeholder="Enter your District"
                            onChange={(e) => {
                              setValue('EducationDetails.work_district', e.target.value);
                              // Reset city when district changes
                              setValue('EducationDetails.work_city', '');
                              setShowCityTextInput(false);
                            }}
                          />
                        </>
                      ) : (
                        <select
                          value={selecteddistrict || ''}
                          {...register('EducationDetails.work_district')}
                          // ... other props
                          className="outline-none w-full px-4 text-[#222020e6] font-semibold py-2 border border-[#b5b2b2e6] rounded"
                          onChange={(e) => {
                            const value = e.target.value;
                            setValue('EducationDetails.work_district', value);

                            // This line correctly resets the city
                            setValue('EducationDetails.work_city', '');

                            setShowCityTextInput(false);
                            setIsCityValid(true);
                          }}
                        >
                          <option value="" className='text-[#000000e6] font-medium' selected >
                            Select your District
                          </option>
                          {WorkDistrict?.map((option: District) => (
                            <option
                              key={option.disctict_id}
                              value={option.disctict_id}
                              className='text-[#000000e6] font-medium'
                            >
                              {option.disctict_name}
                            </option>
                          ))}
                        </select>
                      )}
                      {!selecteddistrict && errors?.EducationDetails?.work_district && (
                        <p className="text-red-600">
                          {errors.EducationDetails.work_district.message?.toString()}
                        </p>
                      )}

                    </div>

                    {Number(selectedState) > 7 ? (
                      <div className="w-full">
                        <label className="block text-[#5a5959e6] font-medium mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          {...register('EducationDetails.work_city', {
                            required: 'City is required',
                          })}
                          className="outline-none w-full px-4 py-2 border border-[#b5b2b2e6] rounded"
                          placeholder="Enter your city"
                        />
                        {errors?.EducationDetails?.work_city && (
                          <p className="text-red-600">
                            {errors.EducationDetails.work_city.message?.toString()}
                          </p>
                        )}
                      </div>
                    ) : (
                      selectedWorkCountry === '1' &&
                      (
                        <div className="w-full">
                          <div className="flex items-center gap-0">
                            <label
                              htmlFor="city"
                              className="block mb-1 text-[#5a5959e6] font-semibold"
                            >
                              City
                              {/* <span className="text-red-500">*</span> */}
                            </label>
                            <div className="relative inline-block ml-2 group">
                              <AiOutlineInfoCircle className="text-gray-500 cursor-pointer ml-2" />
                              <div className="absolute hidden group-hover:flex flex-col bg-white border border-[#b5b2b2e6] rounded shadow-md p-2 w-48 z-10">
                                <p className="text-sm text-black">
                                  Select your city from the list. If your city is
                                  not listed, select Others.
                                </p>
                              </div>
                            </div>
                          </div>


                          {isCityValid ? (
                            <div>
                              <select
                                value={selectedCity}
                                className="outline-none w-full px-4 py-2 border border-[#b5b2b2e6] rounded text-[#000000e6] font-medium"
                                {...register('EducationDetails.work_city', {
                                  required: 'City is required',
                                })}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setValue('EducationDetails.work_city', value);

                                  if (value === 'Others') {
                                    setShowCityTextInput(true);
                                    setValue('EducationDetails.work_city', ''); // Reset for text input
                                  } else {
                                    setShowCityTextInput(false);
                                  }
                                }}
                              >
                                <option value="" className='text-[#000000e6] font-medium'>Select City</option>
                                {City?.map((option: City) => (
                                  <option key={option.city_id} value={option.city_name} className='text-[#222020e6] font-medium'>
                                    {option.city_name}
                                  </option>
                                ))}
                                <option value="Others">Others</option>
                              </select>

                              {showCityTextInput && (
                                <input
                                  type="text"
                                  className="outline-none w-full px-4 py-2 border text-[#000000e6] font-medium border-[#b5b2b2e6] rounded mt-2"
                                  {...register('EducationDetails.work_city', {
                                    required: 'City is required',
                                  })}
                                  placeholder="Enter your city"
                                  onChange={(e) => setValue('EducationDetails.work_city', e.target.value)}
                                />
                              )}
                            </div>
                          ) : (
                            <input
                              type="text"
                              className="outline-none w-full px-4 py-2 border border-[#b5b2b2e6] text-[#000000e6] font-medium rounded"
                              {...register('EducationDetails.work_city', {
                                required: 'City is required',
                              })}
                              placeholder="Enter your city"
                              onChange={(e) => setValue('EducationDetails.work_city', e.target.value)}
                            />
                          )}
                          {!selectedCity && errors?.EducationDetails?.work_city && (
                            <p className="text-red-600">
                              {errors.EducationDetails.work_city.message?.toString()}
                            </p>
                          )}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              <div className="flex w-full flex-row gap-4">
                <div className="w-2/4">
                  <Input
                    required
                    onKeyDown={(e) => {
                      const allowedKeys = [
                        '0',
                        '1',
                        '2',
                        '3',
                        '4',
                        '5',
                        '6',
                        '7',
                        '8',
                        '9',
                        '+',
                        'Backspace',
                        'Tab',
                        'ArrowLeft',
                        'ArrowRight',
                        'Delete',
                      ];

                      // If the key pressed is not allowed, prevent it
                      if (!allowedKeys.includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    label={'Post code (Based on Country Selection)'}
                    {...register('EducationDetails.pincode')}
                  />
                  {errors?.EducationDetails?.pincode && (
                    <p className="text-red-600">
                      {errors.EducationDetails.pincode.message}
                    </p>
                  )}
                </div>

                <div className="w-2/4">
                  <div className="flex w-full flex-row gap-4">
                    <div className="w-full">
                      <label className="block text-[#5a5959e6] font-semibold  mb-1">
                        Career Plans / Notes
                      </label>
                      <textarea
                        {...register('EducationDetails.CareerPlans')}
                        className="outline-none w-full px-4 py-2 h-10.5 border text-[#000000e6] font-medium border-[#b5b2b2e6] rounded"
                      ></textarea>
                      {errors?.EducationDetails?.CareerPlans && (
                        <p className="text-red-600">
                          {errors.EducationDetails.CareerPlans.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div></>)}
        </div>
      )}
      <div className="flex justify-end mt-10 ">
        <button
          // onClick={formHandleSubmit}
          type="submit"
          className="bg-blue-500 text-white px-15 py-2 rounded"
        >
          Save Educational Details
        </button>
      </div>
    </div>
  );
};

export default EducationalDetails;