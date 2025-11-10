import { useEffect, useState } from 'react';
import {
  fetchMaritalStatuses,
  getAnnualIncome,
  getProfession,
  fetchMatchPreferences,
  educationalPrefApi,
  annualIncomeApi,
  fetchFamilyStatus,
  StatePref,
} from '../../../action';
import { useQuery } from '@tanstack/react-query';
import Select from "react-select";


interface pageProps {
  profile: any;
  birthStarId: string;
  gender: any;
}

interface HoroscopeDetails {
  birth_rasi_name: string;
  birthstar_name: string
}
interface Gender {
  "Gender": string,
}

interface FieldOfStudy {
  study_id: number;
  study_description: string;
}

interface Degree {
  degeree_id: number;
  degeree_description: string;
}

import axios from 'axios';
import ViewMatchingStars from './ViewMatchingStars';
import { useForm } from 'react-hook-form';
import { apiAxios } from '../../../api/apiUrl';

const ViewSuggestedProfile: React.FC<pageProps> = ({
  profile,
  birthStarId,
}) => {
  const { register, setValue, watch } = useForm()
  const [isSuggestedProfileOpen, setIsSugggestedProfileOpen] = useState(true);
  const [SuggestedProfileDetails, setSuggestedProfileDetails] = useState<any>({});
  console.log(SuggestedProfileDetails.pref_foreign_intrest)
  // const [suggestedProfiles,setSuggestedProfiles] = useState<any>({})
  const [annualIncome, setAnnualIncome] = useState<any>([]);
  const [eduPref, setEduPref] = useState<any>([]);
  const [selectedFamilyStatus, setSelectedFamilyStatus] = useState('');
  const [selectedPrefState, setSelectedPrefState] = useState('');
  const [editFamilyStatus, setEditFamilyStatus] = useState('');
  const [editPrefState, setEditPrefState] = useState('');
  const [fieldOfStudyOptions, setFieldOfStudyOptions] = useState<FieldOfStudy[]>([]);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [selectedFieldsOfStudy, setSelectedFieldsOfStudy] = useState<string[]>([]);
  const [selectedDegrees, setSelectedDegrees] = useState<string[]>([]);
  const toggleSection5 = () => {
    setIsSugggestedProfileOpen(!isSuggestedProfileOpen);
  };

  const [edit3, setEdit3] = useState<HoroscopeDetails>()
  const [edit0, setEdit0] = useState<Gender>()
  const { data: profession } = useQuery({
    queryKey: ['profession'],
    queryFn: getProfession,
  });

  useEffect(() => {
    if (profile && profile.length > 0) {
      setSuggestedProfileDetails(profile[8]);
    }
  }, [profile]);
  const { data: MaritalStatuses } = useQuery({
    queryKey: ['MaritalStatuses'],
    queryFn: fetchMaritalStatuses,
  });

  useEffect(() => {
    if (profile && profile.length > 0) {
      setEdit3(profile[3]);
      setEdit0(profile[0]);
      const prefFamilyStatus = profile[8].pref_family_status;
      const prefState = profile[8].pref_state;
      const prefFieldOfStudy = profile[8].visibility_field_of_study || '';
      const prefDegree = profile[8].degree || '';

      setSelectedFamilyStatus(prefFamilyStatus);
      setSelectedPrefState(prefState);
      setSelectedFieldsOfStudy(prefFieldOfStudy.split(',').filter(Boolean));
      setSelectedDegrees(prefDegree.split(',').filter(Boolean));
      setValue("profileView.pref_family_status", prefFamilyStatus);
      setValue("profileView.pref_state", prefState);
      setValue("profileView.pref_anual_income", profile[8].pref_anual_income);
      setValue("profileView.pref_anual_income_max", profile[8].pref_anual_income_max);

    }
  }, [profile, setValue]);


  useEffect(() => {
    if (profile && profile.length > 0) {
      const suggestedProfile = profile[8];

      // Set field of study from suggested profile preferences
      if (suggestedProfile.pref_fieldof_study) {
        const fields = suggestedProfile.pref_fieldof_study.split(',').filter(Boolean);
        setSelectedFieldsOfStudy(fields);
      }

    // Also check profile visibility for field of study
      const visibility = profile[9];
      if (visibility && visibility.visibility_field_of_study) {
        const visibilityFields = visibility.visibility_field_of_study.split(',').filter(Boolean);
        setSelectedFieldsOfStudy(visibilityFields);
      }
    }
  }, [profile, setValue]);
  useEffect(() => {
    if (profile && profile.length > 0) {
      setEditFamilyStatus(profile[8].pref_family_status || '');
      setEditPrefState(profile[8].pref_state || '');
    }
  }, [profile]);

  useEffect(() => {
    if (profile && profile.length > 0) {
      setEdit3(profile[3]);
      setEdit0(profile[0])
    }
  }, [profile]);

  const rasiId: string = edit3?.birth_rasi_name as string;
  const starId: string = edit3?.birthstar_name as string;
  const gender: string = edit0?.Gender as string;

  const { data: matchStars } = useQuery({
    queryKey: ['matchStars'],
    queryFn: () => fetchMatchPreferences(rasiId, starId, gender),
    enabled: !!rasiId && !!gender,
  });

  const [selectedStarIds, setSelectedStarIds] = useState([]);

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

    const fetchFieldOfStudy = async () => {
      try {
        const response = await apiAxios.post(`auth/Get_Field_ofstudy/`);
        console.log('Field of Study API response:', response.data);

        // Handle different response structures
        let options: FieldOfStudy[] = [];

        if (Array.isArray(response.data)) {
          options = response.data;
        } else if (typeof response.data === 'object') {
          options = Object.values(response.data);
        }

        console.log('Processed field of study options:', options);
        setFieldOfStudyOptions(options);
      } catch (error) {
        console.error('Error fetching Field of Study options:', error);
      }
    };
    const fetchDegrees = async () => {
      try {
        const response = await apiAxios.get(
          `auth/pref_degree_list/`
        );
        const degreeOptions = Object.values(response.data) as Degree[];
        setDegrees(degreeOptions);
      } catch (error) {
        console.error('Error fetching Degree options:', error);
      }
    };


    fetchAnnualIncome();
    fetchEduPref();
    fetchFieldOfStudy();
    fetchDegrees();
  }, []);

  const educationArray = SuggestedProfileDetails.pref_profession?.split(',');
  const professionArray = SuggestedProfileDetails.pref_education?.split(',');
  const martalStatusArray =
    SuggestedProfileDetails.pref_marital_status?.split(',');


  useEffect(() => {
    if (SuggestedProfileDetails?.pref_porutham_star) {
      const selectedStarIdsFromApi = SuggestedProfileDetails.pref_porutham_star
        .split(',')
        .map((id: string) => ({
          id: id.trim(),
          rasi: '',
          star: '',
          label: '',
        }));
      setSelectedStarIds(selectedStarIdsFromApi);
    } else {
      // Handle case where pref_porutham_star is undefined or null, or set default value
      setSelectedStarIds([]);
    }
  }, [SuggestedProfileDetails]);


  const { data: FamilyStatus } = useQuery({
    queryKey: ['FamilyStatus'],
    queryFn: fetchFamilyStatus,
  });

  const [stateOptions, setStateOptions] = useState<StatePref[]>([]);

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


  return (
    <div>
      <div className="bg-white p-5 mb-10 rounded shadow-md">
        <h4
          className="text-red-600 flex row items-center justify-between text-xl font-semibold dark:text-white "
          onClick={toggleSection5}
        >
          Suggested Profile
          <svg
            className={`fill-current transform ${isSuggestedProfileOpen ? 'rotate-180' : ''
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
        {isSuggestedProfileOpen && (
          <div className="flex flex-col gap-5 pt-2">
            <div className="flex w-full flex-row gap-4">
              <div className="w-full text-[#5a5959e6] font-semibold">
                <label>
                  Height from <span className="text-red-500">*</span>
                </label>
                <input
                  disabled
                  value={SuggestedProfileDetails.pref_height_from}
                  className="w-full px-4 py-2 border  font-medium border-[#b5b2b2e6]  text-[#222020e6] rounded"
                />
              </div>
              <div className="w-full text-[#5a5959e6] font-semibold">
                <label>
                  Height to <span className="text-red-500">*</span>
                </label>
                <input
                  disabled
                  value={SuggestedProfileDetails.pref_height_to}
                  className="w-full px-4 py-2 border  font-medium border-[#b5b2b2e6]  text-[#222020e6] rounded"
                />
              </div>
              <div className="w-full text-[#5a5959e6] font-semibold">
                <label>
                  Age Difference <span className="text-red-500">*</span>
                </label>
                <input
                  disabled
                  value={SuggestedProfileDetails.pref_age_differences}
                  className="w-full px-4 py-2 border  font-medium border-[#b5b2b2e6]  text-[#222020e6] rounded"
                />
              </div>
            </div>

            <div className="flex w-full flex-row gap-4">
              <div className="w-full text-[#5a5959e6] font-semibold">
                <label>
                  Chevvai
                </label>
                <select
                  disabled
                  value={SuggestedProfileDetails.pref_chevvai}
                  className="w-full px-4 py-2 border  font-medium border-[#b5b2b2e6]  text-[#222020e6] rounded"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Both">Both</option>
                </select>
              </div>
              <div className="w-full text-[#5a5959e6] font-semibold">
                <label>
                  Rahu / Ketu
                </label>
                <select
                  disabled
                  value={SuggestedProfileDetails.pref_ragukethu}
                  className="w-full px-4 py-2 border  font-medium border-[#b5b2b2e6]  text-[#222020e6] rounded"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Both">Both</option>
                </select>
              </div>
              <div className="w-full text-[#5a5959e6] font-semibold">
                <label>
                  Foreign Interest
                </label>
                <select
                  disabled
                  value={SuggestedProfileDetails.pref_foreign_intrest}
                  // value={SuggestedProfileDetails.pref_foreign_intrest.charAt(0).toUpperCase() + SuggestedProfileDetails.pref_foreign_intrest.slice(1).toLowerCase()}
                  className="w-full px-4 py-2 border  font-medium border-[#b5b2b2e6]  text-[#222020e6] rounded"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Both">Both</option>
                </select>
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
                      // onChange={() => handleFamilyStatusChange(status.family_status_id)}
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
                      // onChange={() => handleStateChange(state.State_Pref_id)}
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
            </div>


            <div className="w-full">
              <h5 className="text-[18px] text-[#5a5959e6] font-semibold mb-2">
                Profession
              </h5>
              <div className="flex justify-between items-center">
                {profession?.map((profession: any) => (
                  <div key={profession.Profes_Pref_id}>
                    <input
                      type="checkbox"
                      id={`profession-${profession.Profes_Pref_id}`}
                      value={profession.Profes_Pref_id}
                      checked={educationArray?.includes(
                        profession.Profes_Pref_id.toString(),
                      )}
                      onClick={(e) => e.preventDefault()}
                    />
                    <label
                      htmlFor={`profession-${profession.Profes_Pref_id}`}
                      className="pl-1 text-[#5a5959e6] font-medium"
                    >
                      {profession.Profes_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <label className="text-[18px] text-[#5a5959e6] font-semibold mb-2">
                Education
              </label>
              <div className="flex flex-wrap gap-4">
                {' '}
                {eduPref?.map((option: any) => (
                  <div key={option.Edu_Pref_id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`education-${option.Edu_Pref_id}`}
                      value={option.Edu_Pref_id.toString()}
                      checked={professionArray?.includes(
                        option.Edu_Pref_id?.toString(),
                      )}
                      onClick={(e) => e.preventDefault()}
                    />
                    <label
                      htmlFor={`education-${option.Edu_Pref_id}`}
                      className="pl-1 text-[#5a5959e6] font-medium"
                    >
                      {option.Edu_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full py-1">
              <h5 className="text-[18px] text-[#5a5959e6] font-semibold mb-2">
                Field of Study
              </h5>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {fieldOfStudyOptions.map((option) => (
                  <div key={option.study_id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`study-${option.study_id}`}
                      value={option.study_id.toString()}
                      checked={selectedFieldsOfStudy.includes(option.study_id.toString())}
                      onClick={(e) => e.preventDefault()}
                      className="mr-2"
                    />
                    <label
                      htmlFor={`study-${option.study_id}`}
                      className='text-[#5a5959e6] font-medium'
                    >
                      {option.study_description}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Degree Section */}
            <div className="w-full py-1">
              <h5 className="text-[18px] text-[#5a5959e6] font-semibold mb-2">
                Degree
              </h5>
              <Select
                isMulti
                isDisabled // since you're just *viewing* preferences
                options={degrees.map((degree) => ({
                  value: degree.degeree_id.toString(),
                  label: degree.degeree_description,
                }))}
                value={degrees
                  .filter((degree) =>
                    selectedDegrees.includes(degree.degeree_id.toString())
                  )
                  .map((degree) => ({
                    value: degree.degeree_id.toString(),
                    label: degree.degeree_description,
                  }))}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Select Degrees"
              />
            </div>

            <div>
              <h5 className="text-[18px] text-[#5a5959e6] font-semibold mb-2">
                Marital Status
              </h5>
              <div className="flex justify-between items-center">
                {MaritalStatuses?.map((status: any) => (
                  <div key={status.marital_sts_id}>
                    <input
                      type="checkbox"
                      id={`maritalStatus-${status.marital_sts_id}`}
                      value={status.marital_sts_id.toString()}
                      checked={martalStatusArray?.includes(
                        status.marital_sts_id.toString(),
                      )}
                      onClick={(e) => e.preventDefault()}
                    />
                    <label htmlFor={`maritalStatus-${status.marital_sts_id}`} className='text-[#5a5959e6] font-medium'>
                      {status.marital_sts_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="AnnualIncome"
                className="text-[18px] text-[#5a5959e6] font-semibold mb-2"
              >
                Annual Income
              </label>
              <div className="flex items-center gap-2">
                <div className="w-full">
                  <label className="text-black font-semibold ">Minimum Annual Income</label>
                  <select
                    disabled
                    {...register('profileView.pref_anual_income')}
                    className="outline-none w-full px-4 py-2 border  font-medium  border-[#b5b2b2e6]  text-[#222020e6]  rounded bg-gray-100"
                  >
                    <option value="" disabled>Select</option>
                    {annualIncome?.map((option: any) => (
                      <option key={option.income_id} value={option.income_id} className='text-[#5a5959e6] font-medium'>
                        {option.income_description}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full">
                  <label className="text-[#5a5959e6] font-semibold">Maximum Annual Income</label>
                  <select
                    disabled
                    {...register('profileView.pref_anual_income_max')}
                    className="outline-none w-full px-4 py-2 border  font-medium border-[#b5b2b2e6]  text-[#222020e6] rounded bg-gray-100"
                  >
                    <option value="" disabled>Select</option>
                    {annualIncome?.map((option: any) => (
                      <option key={option.income_id} value={option.income_id} className='text-[#5a5959e6] font-medium'>
                        {option.income_description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <div className="justify-start items-center gap-x-5 text-[#5a5959e6]">
                {matchStars && matchStars?.length > 0 ? (
                  matchStars
                    .sort((a, b) => b[0].match_count - a[0].match_count) // Sort by match_count
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
                        <ViewMatchingStars
                          key={index}
                          initialPoruthas={`No of porutham ${matchCountValue}`}
                          starAndRasi={starAndRasi}
                          selectedStarIds={selectedStarIds}
                        />
                      );
                    })
                ) : (
                  <p>No match stars available</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSuggestedProfile;
