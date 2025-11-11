import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import Input from '../../Fromfield/Inputfield';
import { useQuery } from '@tanstack/react-query';
import DistrictSelect from './util/DistrictSelect';
import StateSelect from './util/StateSelect';
import CurrencyCodes from 'currency-codes';
import currencySymbolMap from 'currency-symbol-map';
import {
  GetDistrict,
  GetCity,
  fetchGetHighestEducation,
  fetchUgDegree,
  fetchAnnualIncome,
  fetchProfessionalPrefe,
  fetchStateStatus,
  fetchCountryStatus,
  fetchFieldOfStudy,
  fetchDegree,
} from '../../../action';
import { useForm, useFormContext } from 'react-hook-form';
import { Country } from './AddProfileForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { parentSchema } from '../../../scema';
import { FormValues } from '../AddProfile';
import CitySelect from './util/CitySelect';
import Profession from './util/Profession';
import axios from 'axios';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Select from 'react-select';
//import { ugDegrees } from '../EditFormComponents/EducationalDetails';

export interface State {
  state_id: string;
  state_name: string;
}
export interface District {
  disctict_id: string;
  disctict_name: string;
}
export interface GetHighestEducation {
  education_id: string;
  education_description: string;
}

export interface getFieldOfStudy {
  study_id: string;
  study_description: string;
}

export interface GetDegree {
  degeree_id: string;
  degeree_description: string;
}

export interface ugDegrees {
  id: string;
  degree: string;
  is_deleted: boolean;
}

export interface AnnualIncome {
  id: string;
  income: string;
  income_amount: string;
  is_deleted: boolean;
}

export interface ProfessionPref {
  Profes_Pref_id: number;
  Profes_name: string;
}

export interface City {
  city_id: number;
  city_name: string;
}
interface pageprop {
  setProfession: Dispatch<SetStateAction<number>>;
  profession: number;
  isEducationDetailsOpen: boolean;
  setIsEducationDetailsOpen: Dispatch<SetStateAction<boolean>>;
}
const EducationalDetails: React.FC<pageprop> = ({
  profession,
  setIsEducationDetailsOpen,
  isEducationDetailsOpen,
  setProfession,
}) => {
  const { } = useForm({
    resolver: zodResolver(parentSchema),
    mode: "onChange",
  });
  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
    clearErrors

  } = useFormContext<FormValues>();
  const selectedDegreeName = watch('EducationDetails.degree');
  const selectedWorkCountry = watch('EducationDetails.workCountry');
  const selectedState = watch('EducationDetails.work_state');
  const currencyOptions = CurrencyCodes.codes(); // Correct way to get currency codes
  const [showCityTextInput, setShowCityTextInput] = useState(false);
  if (selectedState) {
    sessionStorage.removeItem('stateError');
    sessionStorage.setItem('errormsg', '1');
  }
  const selecteddistrict = watch('EducationDetails.work_district');
  if (selecteddistrict) {
    sessionStorage.removeItem('districtError');
    sessionStorage.setItem('errormsg', '1');
  }
  const selectedDegree = watch('EducationDetails.degree');
  const selectedcity = watch('EducationDetails.work_city');
  if (selectedcity) {
    sessionStorage.removeItem('cityError');
    sessionStorage.setItem('errormsg', '1');
  }

  const toggleSection3 = () => {
    setIsEducationDetailsOpen(!isEducationDetailsOpen);
  };

  const { data: WorkCountry } = useQuery<Country[]>({
    queryKey: ['WorkCountry'],
    queryFn: fetchCountryStatus,
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
  const { data: City } = useQuery<City[]>({
    queryKey: [selecteddistrict, 'City'],
    queryFn: () => GetCity(selecteddistrict),
    enabled: !!selecteddistrict,
  });

  const { data: GetHighestEducation } = useQuery<GetHighestEducation[]>({
    queryKey: ['GetHighestEducation'],
    queryFn: fetchGetHighestEducation,
  });

  const { data: getFieldOfStudy } = useQuery<getFieldOfStudy[]>({
    queryKey: ['getFieldOfStudy'],
    queryFn: fetchFieldOfStudy,
  });

  const { data: UgDegrees } = useQuery<ugDegrees[]>({
    queryKey: ['UgDegrees'],
    queryFn: fetchUgDegree,
  });

  const { data: AnnualIncome } = useQuery<AnnualIncome[]>({
    queryKey: ['AnnualIncome'],
    queryFn: fetchAnnualIncome,
  });

  const { data: ProfessionalPreference } = useQuery<ProfessionPref[]>({
    queryKey: ['ProfessionalPreference'],
    queryFn: fetchProfessionalPrefe,
  });

  const [selectedDescription, setSelectedDescription] = useState<GetDegree[] | undefined>(undefined);
  const [selectedEducation, setSelectedEducation] = useState<any>('');
  console.log("selectedEducation", selectedEducation);
  const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState<string>('');
  console.log("selectedFieldOfStudy", selectedFieldOfStudy);
  const [degrees, setDegrees] = useState<GetDegree[]>([]);
  console.log("degrees", degrees);
  const [noDegreeOptions, setNoDegreeOptions] = useState<boolean>(false);
  //const [selectedProfessionId, setSelectedProfessionId] = React.useState<number>(0); // Default to 0
  const [selectedDegrees, setSelectedDegrees] = useState<string[]>([]); // State for multiple selection
  console.log("selectedDegrees", selectedDegrees)
  // Fetch degrees when both selections are valid
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);

  // State to store the value of the custom degree text
  const [otherDegree, setOtherDegree] = useState('');
  useEffect(() => {
    const fetchDegrees = async () => {
      if (selectedEducation && selectedFieldOfStudy) {
        try {
          const degreeData = await fetchDegree(
            selectedEducation,
            selectedFieldOfStudy,
          );
          setDegrees(degreeData);
          console.log(degreeData);
          setNoDegreeOptions(degreeData.length === 0); // Check if no degree options are available
        } catch (error) {
          console.error('Error fetching degrees:', error);
        }
      } else {
        setDegrees([]); // Reset degree options if conditions are not met
        setNoDegreeOptions(false);
      }
    };

    fetchDegrees();
  }, [selectedEducation, selectedFieldOfStudy]);

  const watchHighestEducation = watch('EducationDetails.heighestEducation');
  console.log("watchHighestEducation", watchHighestEducation)
  const showStudyAndDegree = ['1', '2', '3', '4'].includes(selectedEducation);


  // This function updates 'EducationDetails.degree', not 'degree'
  const handleDegreeChange = (newValue: any) => {
    // Check if "Others" (assuming its value is '86') is among the selected options.
    const hasOthers = newValue.some((option: any) => option.value === '86');
    // Show or hide the text input based on the selection.
    setShowOtherInput(hasOthers);
    // Get all selected degree IDs.
    const selectedDegreeIds = newValue.map((option: any) => option.value);
    setSelectedDegrees(selectedDegreeIds);
    // Update the main 'degree' field in the form with a comma-separated string of IDs.
    setValue('EducationDetails.degree', selectedDegreeIds.join(','));
    // If "Others" is no longer selected, clear the text input and its form value.
    if (!hasOthers) {
      setOtherDegree('');
      setValue('EducationDetails.other_degree', '');
    }
  };

  // A separate handler for the text input itself
  const handleOtherDegreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newOtherDegree = event.target.value;
    setOtherDegree(newOtherDegree);
    // This line correctly updates the form data
    setValue('EducationDetails.other_degree', newOtherDegree);
  };

  const getSelectedOptions = () => {
    return selectedDegrees.map(id => {
      const degree = degrees.find(d => d.degeree_id.toString() === id);
      return degree ? {
        value: degree.degeree_id.toString(),
        label: degree.degeree_description
      } : null;
    }).filter(Boolean);
  };


  useEffect(() => {
    const ugDegreeValue = watch('EducationDetails.degree');
    if (ugDegreeValue) {
      setSelectedDegrees(ugDegreeValue.split(','));
    }
  }, []);

  // Add this useEffect to clear degrees when education level changes
  useEffect(() => {
    if (!showStudyAndDegree) {
      setSelectedDegrees([]);
      setValue('EducationDetails.degree', '');
    }
  }, [showStudyAndDegree, setValue]);
  // // Handle removing a selected degree
  // const handleRemoveDegree = (degreeId: string) => {
  //   setSelectedDegrees(selectedDegrees.filter((id) => id !== degreeId));
  // };

  // const preferredCurrencies = [ "INR","USD", "EUR"]; // Add your preferred currencies here
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
  const [isOtherCity, setIsOtherCity] = React.useState(false);

  const selectedDegreesArray = selectedDegrees.map(Number);
  console.log(selectedDegreesArray);

  const selectedDescriptio = degrees.filter((degree) =>
    selectedDegreesArray.includes(Number(degree.degeree_id)),
  );
  console.log(selectedDescriptio);

  useEffect(() => {
    const selectedDegreesArray = selectedDegrees.map(Number);
    const selectedDescriptionData = degrees.filter((degree) =>
      selectedDegreesArray.includes(Number(degree.degeree_id))
    );
    setSelectedDescription(selectedDescriptionData);
  }, [degrees, selectedDegrees]);

  const watchFieldOfStudy = watch('EducationDetails.field_ofstudy');
  useEffect(() => {
    console.log('Current field_ofstudy value:', watchFieldOfStudy);
  }, [watchFieldOfStudy]);

  useEffect(() => {
    // If the condition to show the fields is false...
    if (!showStudyAndDegree) {
      // ...clear the values in react-hook-form.
      setValue('EducationDetails.field_ofstudy', '');
      setValue('EducationDetails.degree', '');

      // Also reset any related local state
      setSelectedFieldOfStudy('');
      setSelectedDegrees([]);
    }
  }, [showStudyAndDegree, setValue]); // This effect runs when the condition changes

  const ugDegreeValue = watch('EducationDetails.degree');
  const selectedDegreeIds = ugDegreeValue ? ugDegreeValue.split(',') : [];

  const degreeOptions =
    degrees?.map((degree) => ({
      value: degree.degeree_id,
      label: degree.degeree_description,
    })) || [];

  const selectedValueObjects = degreeOptions.filter((option) =>
    selectedDegreeIds.includes(option.value),
  );
  console.log("selectedValueObjects", selectedValueObjects)
  // This is the new onChange handler for the Select component
  const handleMultiSelectChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setValue('EducationDetails.degree', selectedValues.join(','));
    trigger('EducationDetails.degree'); // Optional: trigger validation on change
  };

  // In EducationalDetails.tsx

  useEffect(() => {
    const fetchDegrees = async () => {
      // Add these console logs for debugging
      console.log('Attempting to fetch degrees...');
      console.log('Selected Education ID:', selectedEducation);
      console.log('Selected Field of Study ID:', selectedFieldOfStudy);

      if (selectedEducation && selectedFieldOfStudy) {
        try {
          // IMPORTANT: Ensure your API expects strings or convert them to numbers
          const educationId = selectedEducation; // Or parseInt(selectedEducation, 10)
          const studyId = selectedFieldOfStudy;   // Or parseInt(selectedFieldOfStudy, 10)

          console.log(`Fetching with Education: ${educationId}, Study: ${studyId}`);

          const degreeData = await fetchDegree(educationId, studyId);

          console.log('API Response for degrees:', degreeData); // Log the response

          setDegrees(degreeData);
          setNoDegreeOptions(degreeData.length === 0);
        } catch (error) {
          console.error('Error fetching degrees:', error);
        }
      } else {
        setDegrees([]); // Reset degrees if selections are cleared
        setNoDegreeOptions(false);
      }
    };

    fetchDegrees();
  }, [selectedEducation, selectedFieldOfStudy]);

  useEffect(() => {
    setValue('EducationDetails.company_name', '');
    setValue('EducationDetails.designation', '');
    setValue('EducationDetails.profession_details', '');
    setValue('EducationDetails.business_name', '');
    setValue('EducationDetails.business_address', '');
    setValue('EducationDetails.nature_of_business', '');
    if (profession === 3 || profession === 4 || profession === 5) {
      setValue('EducationDetails.workCountry', '');
      setValue('EducationDetails.work_state', '');
      setValue('EducationDetails.work_district', '');
      setValue('EducationDetails.work_city', '');
      setValue('EducationDetails.work_place', ''); // Although it may not be used, good to clear
      setValue('EducationDetails.pincode', '');
      setValue('EducationDetails.CareerPlans', '');
    }
  }, [profession, setValue]);

  return (
    <div className="bg-white p-5 mb-10 rounded shadow-md">
      <h4
        className="text-red-600 flex row items-center justify-between text-xl font-semibold  dark:text-white cursor-pointer  after-red-line::after"
        onClick={toggleSection3}
      >
        Education Details {' '}
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
          <div className="flex w-full flex-row gap-4 max-md:flex-col">
            <div className="w-full">
              <label className="block text-black font-medium mb-1">
                Highest Education Level <span className="text-red-500">*</span>
              </label>
              <select
                className="outline-none w-full px-4 py-2 border border-black rounded"
                {...register('EducationDetails.heighestEducation')}
                // onChange={(e) => setSelectedEducation(e.target.value)}
                onChange={async (e) => {
                  setSelectedEducation(e.target.value);
                  await trigger('EducationDetails.heighestEducation'); // Force validation
                  clearErrors("EducationDetails.heighestEducation")
                }}
              >
                <option value="">Select education level</option>
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

            {showStudyAndDegree && (
              <div className="w-full">
                <label className="block text-black font-medium mb-1">
                  Field Of Study
                </label>
                <select
                  className="outline-none w-full px-4 py-2 border border-black rounded"
                  {...register('EducationDetails.field_ofstudy')}
                  onChange={(e) => setSelectedFieldOfStudy(e.target.value)}
                >
                  <option value="">Select Field Of Study</option>
                  {getFieldOfStudy?.map((study) => (
                    <option key={study.study_id} value={study.study_id}>
                      {study.study_description}
                    </option>
                  ))}
                </select>
                {errors?.EducationDetails?.field_ofstudy && (
                  <p className="text-red-600">
                    {errors.EducationDetails?.field_ofstudy.message}
                  </p>
                )}
              </div>
            )}
          </div>


          {showStudyAndDegree && (
            <div className="w-full">
              <label className="block text-black font-medium mb-1">Degree</label>

              {noDegreeOptions ? (
                <input
                  type="text"
                  className="outline-none w-full px-4 py-2 border border-black rounded"
                  {...register("EducationDetails.degree", {
                    required: "Degree is required",
                  })}
                  placeholder="Enter your degree"
                />
              ) : (
                <>
                  <Select
                    isMulti
                    options={[
                      ...degrees?.map((degree) => ({
                        value: degree.degeree_id.toString(),
                        label: degree.degeree_description,
                      })),
                    ]}
                    value={getSelectedOptions()}
                    onChange={handleDegreeChange}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Select Degree"
                  />

                  {showOtherInput && (
                    <input
                      type="text"
                      value={otherDegree}
                      {...register("EducationDetails.other_degree")} // Register with React Hook Form
                      onChange={handleOtherDegreeChange}
                      placeholder="Enter Specific field"
                      className="outline-none w-full px-4 py-2 border text-[#000000e6] font-medium border-black rounded mt-2"
                    />
                  )}

                  {/* Hidden input for comma-separated degree IDs */}
                  <input
                    type="hidden"
                    {...register("EducationDetails.degree")}
                    value={selectedDegrees.join(",")}
                  />
                </>
              )}

              {errors?.EducationDetails?.degree && (
                <p className="text-red-600">
                  {errors.EducationDetails?.degree.message}
                </p>
              )}
            </div>
          )}


          <div className="flex w-full flex-row gap-4 max-md:flex-col">
            <div className="w-full">
              <Input
                required
                label={'About your Education'}
                {...register('EducationDetails.AboutEducation')}
              />
              {errors?.EducationDetails?.AboutEducation && (
                <p className="text-red-600">
                  {errors.EducationDetails.AboutEducation.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-black font-medium mb-1">
                Annual Income
              </label>
              <div className="flex items-center space-x-2">
                <span className="outline-none w-1/25 text-placeHolderColor px-4 py-[6px] border border-ashBorder rounded">
                  INR(₹)
                </span>
                <select
                  className="outline-none w-full px-4 py-2 border border-black rounded"
                  {...register('EducationDetails.AnnualIncome')}
                >
                  <option value="">Annual Income</option>
                  {AnnualIncome?.map((education) => (
                    <option key={education.id} value={education.id}>
                      {education.income}
                    </option>
                  ))}
                </select>
                {errors?.EducationDetails?.AnnualIncome && (
                  <p className="text-red-600">
                    {errors.EducationDetails.AnnualIncome.message}
                  </p>
                )}
              </div>

            </div>
          </div>

          <div className="flex w-full flex-row gap-4 max-md:flex-col">
            <div className="w-2/4 ">
              <label
                htmlFor="actualIncome"
                className="block mb-1 text-black font-medium"
              >
                Actual Income
              </label>
              <div className="flex item-center space-x-2">
                <select
                  id="currency"
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  // className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-ashBorder rounded"4
                  className="outline-none text-placeHolderColor px-4 py-[6px] border border-ashBorder rounded"
                  style={{ width: '300px' }} // Adjust the width as needed
                >
                  <option value="" >
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
                {errors?.EducationDetails?.ActualIncome && (
                  <p className="text-red-600">
                    {errors.EducationDetails.ActualIncome.message}
                  </p>
                )}

              </div>

            </div>
          </div>

          <div className="mt-3">
            <div className="w-full">
              <label className="block text-black font-medium mb-1">
                <h1 className="mb-3">Profession <span className="text-red-500">*</span> </h1>
              </label>

              <div className="w-full  inline-flex  rounded max-md:flex-col">
                {ProfessionalPreference?.map((Profession: ProfessionPref) => (
                  <label
                    key={Profession.Profes_Pref_id}
                    className={`w-full px-5 py-3 text-sm font-medium border text-center cursor-pointer flex flex-wrap max-md:flex-col ${profession === Profession.Profes_Pref_id
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
              <p className="text-red-600"> Profession is required</p>
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
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-ashBorder rounded"
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
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-ashBorder rounded"
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
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-ashBorder rounded"
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
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-ashBorder rounded"
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
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-ashBorder rounded"
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
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-ashBorder rounded"
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
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-ashBorder rounded"
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
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-ashBorder rounded"
                    placeholder="Enter designation"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="professionDetail"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Profession Details
                  </label>
                  <textarea
                    id="professionDetail"
                    {...register("EducationDetails.profession_details")}
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-ashBorder rounded"
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
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-ashBorder rounded"
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
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-ashBorder rounded"
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
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-ashBorder rounded"
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
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-ashBorder rounded"
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
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-ashBorder rounded"
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
                    className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-ashBorder rounded"
                    placeholder="Enter profession details"
                  />
                </div>
              </div>
            )}
          </div>
          {!(profession === 3 || profession === 4 || profession === 5) && (
            <>
              <h4 className="text-xl font-semibold text-black dark:text-white">
                Work Location
              </h4>
              <div className="flex w-full flex-row gap-4 max-md:flex-col">
                <div className="w-full">
                  <label className="block text-black font-medium mb-1">
                    Country
                  </label>
                  <select
                    {...register('EducationDetails.workCountry')}
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                  >
                    <option value=""> Select your Country </option>
                    {WorkCountry?.map((option) => (
                      <option key={option.country_id} value={option.country_id}>
                        {option.country_name}
                      </option>
                    ))}
                  </select>
                  {errors?.EducationDetails?.workCountry && (
                    <p className="text-red-600">
                      {errors.EducationDetails.workCountry.message}
                    </p>
                  )}
                </div>
                {selectedWorkCountry == '1' ? (
                  <div className="w-full">
                    <label className="block text-black font-medium mb-1">
                      State (Based on country selection){' '}
                    </label>
                    <select
                      className="outline-none w-full px-4 py-2 border border-black rounded"
                      {...register('EducationDetails.work_state')}
                    >
                      <option value="" >
                        Select your state
                      </option>
                      {WorkState?.map((option: State) => (
                        <option key={option.state_id} value={option.state_id}>
                          {option.state_name}
                        </option>
                      ))}
                    </select>
                    {sessionStorage.getItem('stateError') && (
                      <p className="text-red-600">
                        {sessionStorage.getItem('stateError')}
                      </p>
                    )}
                    {errors?.EducationDetails?.work_state && (
                      <p className="text-red-600">
                        {errors.EducationDetails.work_state.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex w-full flex-row gap-4 max-md:flex-col">
                    <Input
                      label={'work city'}
                      placeholder="Work place"
                      {...register('EducationDetails.work_place')}
                    />
                  </div>
                )}
              </div>

              <div className="flex w-full flex-row gap-4 max-md:flex-col">
                {selectedState && (
                  <div className="w-2/4">
                    <label className="block text-black font-medium mb-1">
                      District
                    </label>

                    {Number(selectedState) > 7 ? (
                      // Render text field when selectedState > 7
                      <input
                        type="text"
                        className="outline-none w-full px-4 py-2 border border-black rounded"
                        placeholder="Enter your District"
                        {...register('EducationDetails.work_district')}
                      />
                    ) : (
                      // Render dropdown when selectedState <= 7
                      <select
                        className="outline-none w-full px-4 py-2 border border-black rounded"
                        {...register('EducationDetails.work_district')}
                      >
                        <option value="" disabled>
                          Select your District
                        </option>
                        {WorkDistrict?.map((option: District) => (
                          <option
                            key={option.disctict_id}
                            value={option.disctict_id}
                          >
                            {option.disctict_name}
                          </option>
                        ))}
                      </select>
                    )}

                    {sessionStorage.getItem('districtError') && (
                      <p className="text-red-600">
                        {sessionStorage.getItem('districtError')}
                      </p>
                    )}
                    {errors?.EducationDetails?.work_district && (
                      <p className="text-red-600">
                        {errors.EducationDetails.work_district.message}
                      </p>
                    )}
                  </div>
                )}
                {selecteddistrict && (
                  <div className="w-2/4">
                    <label className="block text-black font-medium mb-1">
                      Work City
                      <div className="relative inline-block ml-2 group">
                        <AiOutlineInfoCircle className="text-gray-500 cursor-pointer ml-2" />

                        <div className="absolute hidden group-hover:flex flex-col bg-white border border-ashSecondary rounded shadow-md p-2 w-48 z-10">
                          <p className="text-sm text-black">
                            Select your city from the list. If your city is not
                            listed, select Others.
                          </p>
                        </div>
                      </div>
                    </label>
                    <>
                      {Number(selectedState) > 7 ? (
                        // Render text field when selectedState > 7
                        <input
                          type="text"
                          className="outline-none w-full px-4 py-2 border border-black rounded"
                          placeholder="Enter your City"
                          {...register('EducationDetails.work_city')}
                        />
                      ) : (
                        // Render dropdown when selectedState <= 7
                        <>
                          {!isOtherCity ? (
                            <select
                              className="outline-none w-full px-4 py-2 border border-black rounded"
                              {...register('EducationDetails.work_city')}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === 'others') {
                                  setIsOtherCity(true); // Switch to text field
                                }
                              }}
                            >
                              <option value="">
                                Select your City
                              </option>
                              {City?.map((option: City) => (
                                <option key={option.city_id} value={option.city_name}>
                                  {option.city_name}
                                </option>
                              ))}
                              <option value="others">Others</option>
                            </select>
                          ) : (
                            <input
                              type="text"
                              className="outline-none w-full px-4 py-2 border border-black rounded"
                              placeholder="Enter your City"
                              {...register('EducationDetails.work_city')}
                            />
                          )}
                        </>
                      )}

                      {sessionStorage.getItem('cityError') && (
                        <p className="text-red-600">
                          {sessionStorage.getItem('cityError')}
                        </p>
                      )}
                      {errors?.EducationDetails?.work_city && (
                        <p className="text-red-600">
                          {errors.EducationDetails.work_city.message}
                        </p>
                      )}
                    </>
                  </div>
                )}
              </div>

              <div className="flex w-full flex-row gap-4 max-md:flex-col">
                <div className="w-2/4">
                  {' '}
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
                  <div className="w-full">
                    <label className="block text-black font-medium mb-1">
                      Career Plans / Notes
                    </label>
                    <textarea
                      className="outline-none w-full px-4 py-2 border h-10.5 border-black rounded"
                      {...register('EducationDetails.CareerPlans')}
                    ></textarea>
                    {errors?.EducationDetails?.CareerPlans && (
                      <p className="text-red-600">
                        {errors.EducationDetails.CareerPlans.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </>)}
        </div>

      )}
    </div>
  );
};

export default EducationalDetails;
