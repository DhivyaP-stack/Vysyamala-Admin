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

const ViewPartnerSettings: React.FC<pageProps> = ({
  profile,
  birthStarId,

}) => {
  const { register, setValue, watch } = useForm()
  const [isPartnerPreferenceOpen, setIsPartnerPreferenceOpen] = useState(true);
  const [partnerSettingsDetails, setPartnerSettingDetails] = useState<any>({});
  const [selectedPrefState, setSelectedPrefState] = useState('');
  const [selectedFamilyStatus, setSelectedFamilyStatus] = useState('');
  const [annualIncome, setAnnualIncome] = useState<any>([]);
  const [eduPref, setEduPref] = useState<any>([]);
  const [edit3, setEdit3] = useState<HoroscopeDetails>()
  const [edit0, setEdit0] = useState<Gender>()
  const [editFamilyStatus, setEditFamilyStatus] = useState('');
  const [selectedPrefStates, setSelectedPrefStates] = useState<string[]>([]);
  // Add state for Field of Study and Degree
  const [fieldOfStudyOptions, setFieldOfStudyOptions] = useState<FieldOfStudy[]>([]);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [selectedFieldsOfStudy, setSelectedFieldsOfStudy] = useState<string[]>([]);
  const [selectedDegrees, setSelectedDegrees] = useState<string[]>([]);

  const toggleSection5 = () => {
    setIsPartnerPreferenceOpen(!isPartnerPreferenceOpen);
  };
  const { data: profession } = useQuery({
    queryKey: ['profession'],
    queryFn: getProfession,
  });

  useEffect(() => {
    if (profile && profile.length > 0) {
      setPartnerSettingDetails(profile[4]);
    }
  }, [profile]);
  const { data: MaritalStatuses } = useQuery({
    queryKey: ['MaritalStatuses'],
    queryFn: fetchMaritalStatuses,
  });

  const rasiId: string = edit3?.birth_rasi_name as string;
  const starId: string = edit3?.birthstar_name as string;
  const gender: string = edit0?.Gender as string;

  const { data: matchStars } = useQuery({
    queryKey: ['matchStars'],
    queryFn: () => fetchMatchPreferences(rasiId, starId, gender),
    enabled: !!rasiId && !!gender,
  });

  // Modify your useEffect to set the initial values
  useEffect(() => {
    if (profile && profile.length > 0) {
      setEdit3(profile[3]);
      setEdit0(profile[0]);
      const prefFamilyStatus = profile[4].pref_family_status;
      const prefState = profile[4].pref_state;
      const prefFieldOfStudy = profile[4].pref_fieldof_study || '';
      const prefDegree = profile[4].degree || '';

      setSelectedFamilyStatus(prefFamilyStatus);
      setSelectedPrefState(prefState);
      setSelectedFieldsOfStudy(prefFieldOfStudy.split(',').filter(Boolean));
      setSelectedDegrees(prefDegree.split(',').filter(Boolean));
      setValue("profileView.pref_family_status", prefFamilyStatus);
      setValue("profileView.pref_state", prefState);
      // ✨ ADDED: Set the min and max annual income values
      setValue("profileView.pref_anual_income", profile[4].pref_anual_income);
      setValue("profileView.pref_anual_income_max", profile[4].pref_anual_income_max);
    }
  }, [profile, setValue]);



  useEffect(() => {
    if (profile && profile.length > 0) {
      setEditFamilyStatus(profile[4].pref_family_status || '');
      setSelectedPrefStates(profile[4].pref_state || '');
    }
  }, [profile]);
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
        const response = await apiAxios.post(
          `auth/Get_Field_ofstudy/`,
        );
        const options = Object.values(response.data) as FieldOfStudy[];
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
  const educationArray = partnerSettingsDetails.pref_profession?.split(',');
  const professionArray = partnerSettingsDetails.pref_education?.split(',');
  const martalStatusArray =
    partnerSettingsDetails.pref_marital_status?.split(',');
  // const annualIncomeArray =
  //   partnerSettingsDetails.pref_anual_income?.split(',');

  useEffect(() => {
    if (partnerSettingsDetails?.pref_porutham_star) {
      const selectedStarIdsFromApi = partnerSettingsDetails.pref_porutham_star
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
  }, [partnerSettingsDetails]);


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

  return (
    <div>
      <div className="bg-white p-5 mb-10 rounded shadow-md">
        <h4
          className="text-red-600 flex row items-center justify-between text-xl font-semibold dark:text-white "
          onClick={toggleSection5}
        >
          Partner Preference
          <svg
            className={`fill-current transform ${isPartnerPreferenceOpen ? 'rotate-180' : ''
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
        {isPartnerPreferenceOpen && (
          <div className="flex flex-col gap-5 pt-2">
            <div className="flex w-full text-black font-semibold flex-row gap-4">
              <div className="w-full text-[#5a5959e6] font-semibold">
                <label>
                  Height from <span className="text-red-500">*</span>
                </label>
                <input
                  disabled
                  value={partnerSettingsDetails.pref_height_from}
                  className="w-full border-[#b5b2b2e6]  text-[#222020e6] font-medium px-4 py-2 border  rounded"
                />
              </div>
              <div className="w-full text-[#5a5959e6] font-semibold">
                <label>
                  Height to <span className="text-red-500">*</span>
                </label>
                <input
                  disabled
                  value={partnerSettingsDetails.pref_height_to}
                  className="w-full font-medium px-4 py-2 border border-[#b5b2b2e6]  text-[#222020e6]  rounded"
                />
              </div>
              <div className="w-full text-[#5a5959e6] font-semibold">
                <label>
                  Age Difference <span className="text-red-500">*</span>
                </label>
                <input
                  disabled
                  value={partnerSettingsDetails.pref_age_differences}
                  className="w-full  font-medium px-4 py-2 border border-[#b5b2b2e6]  text-[#222020e6] rounded"
                />
              </div>
            </div>

            <div className="flex w-full text-black font-semibold flex-row gap-4">
              <div className="w-full text-[#5a5959e6] font-semibold">
                <label>
                  Chevvai
                </label>
                <select
                  disabled
                  value={partnerSettingsDetails.pref_chevvai}
                  className="w-full  font-bold px-4 py-2 border border-[#b5b2b2e6]  text-[#222020e6] rounded"
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
                  value={partnerSettingsDetails.pref_ragukethu}
                  className="w-full  font-bold px-4 py-2 border border-[#b5b2b2e6]  text-[#222020e6] rounded"
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
                  value={partnerSettingsDetails.pref_foreign_intrest}
                  className="w-full  font-semibold px-4 py-2 border border-[#b5b2b2e6]  text-[#222020e6]  rounded"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Both">Both</option>
                </select>
              </div>
            </div>


            <div>
              <h5 className="text-[18px] text-[#5a5959e6] font-semibold mb-2 cursor-pointer"

              >
                Family Status
              </h5>

              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {FamilyStatus?.map((status) => (
                  <div key={status.family_status_id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`family-status-${status.family_status_id}`}
                      value={status.family_status_id}
                      checked={(editFamilyStatus || '').split(',').includes(
                        status.family_status_id.toString()
                      )}

                      className="mr-2"
                    />
                    <label
                      htmlFor={`family-status-${status.family_status_id}`}
                      className='text-[#5a5959e6] font-medium'
                    >
                      {status.family_status_name}
                    </label>
                  </div>
                ))}
              </div>

            </div>



            <div>
              <h5 className="text-[18px] text-[#5a5959e6] font-semibold mb-2 cursor-pointer"

              >
                Preferred State
              </h5>

              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {stateOptions?.map((state) => (
                  <div key={state.State_Pref_id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`state-${state.State_Pref_id}`}
                      value={state.State_Pref_id}
                      checked={selectedPrefStates.includes(state.State_Pref_id.toString())}

                      className="mr-2"
                    />
                    <label
                      htmlFor={`state-${state.State_Pref_id}`}
                      className='text-[#5a5959e6] font-medium'
                    >
                      {state.State_name}
                    </label>
                  </div>
                ))}
              </div>


            </div>

            <div className="w-full text-[#5a5959e6] font-semibold">
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

            {/* Field of Study Section */}
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
              <label className="text-[18px] text-[#5a5959e6] font-semibold mb-2">
                Annual Income
              </label>
              <div className="flex items-center gap-4">
                <div className="w-full">
                  <label className="text-gray-600 font-semibold ">Minimum Annual Income</label>
                  <select
                    disabled
                    {...register('profileView.pref_anual_income')}
                    className="outline-none w-full px-4 py-2 border text-[#000000e6] font-medium border-black rounded bg-gray-100"
                  >
                    {annualIncome?.map((option: any) => (
                      <option key={option.income_id} value={option.income_id} className='pl-1 text-[#000000e6] font-medium'>
                        {option.income_description}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full">
                  <label className="text-gray-600 font-semibold">Maximum Annual Income</label>
                  <select
                    disabled
                    {...register('profileView.pref_anual_income_max')}
                    className="outline-none w-full px-4 py-2 border text-[#000000e6] font-medium border-black rounded bg-gray-100"
                  >
                    {annualIncome?.map((option: any) => (
                      <option key={option.income_id} value={option.income_id} className='pl-1 text-[#000000e6] font-medium'>
                        {option.income_description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <div className="justify-start items-center gap-x-5 text-black">
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

export default ViewPartnerSettings;
