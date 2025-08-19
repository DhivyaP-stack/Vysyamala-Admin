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

import axios from 'axios';
import ViewMatchingStars from './ViewMatchingStars';
import { useForm } from 'react-hook-form';

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
  // const { data: matchStars } = useQuery({
  //   queryKey: ['matchingStars'],
  //   queryFn: () => fetchMatchPreferences(rasiId,starId,gender),
  //   enabled: !!birthStarId && !!gender,
  // });



  const rasiId: string = edit3?.birth_rasi_name as string;
  const starId: string = edit3?.birthstar_name as string;
  const gender: string = edit0?.Gender as string;

  const { data: matchStars } = useQuery({
    queryKey: ['matchStars'],
    queryFn: () => fetchMatchPreferences(rasiId, starId, gender),
    enabled: !!rasiId && !!gender,
  });


  // useEffect(() => {
  //   if (profile && profile.length > 0) {
  //     setEdit3(profile[3]);
  //     setEdit0(profile[0])
  //      const prefFamilyStatus=profile[4].pref_family_status
  //      setValue("profileView.pref_family_status",prefFamilyStatus)
  //       const prefstate=profile[4].pref_state
  //      setValue("profileView.pref_state",prefstate)

  //   }
  // }, [profile]);



  // Modify your useEffect to set the initial values
  useEffect(() => {
    if (profile && profile.length > 0) {
      setEdit3(profile[3]);
      setEdit0(profile[0]);
      const prefFamilyStatus = profile[4].pref_family_status;
      const prefState = profile[4].pref_state;

      setSelectedFamilyStatus(prefFamilyStatus);
      setSelectedPrefState(prefState);
      setValue("profileView.pref_family_status", prefFamilyStatus);
      setValue("profileView.pref_state", prefState);

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
    fetchAnnualIncome();

    fetchEduPref();
  }, []);
  const educationArray = partnerSettingsDetails.pref_profession?.split(',');
  const professionArray = partnerSettingsDetails.pref_education?.split(',');
  const martalStatusArray =
    partnerSettingsDetails.pref_marital_status?.split(',');
  const annualIncomeArray =
    partnerSettingsDetails.pref_anual_income?.split(',');

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
          `https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/auth/Get_State_Pref/`
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
              <div className="w-full text-black font-semibold">
                <label>
                  Height from <span className="text-red-500">*</span>
                </label>
                <input
                  disabled
                  value={partnerSettingsDetails.pref_height_from}
                  className="w-full text-black font-medium px-4 py-2 border border-black rounded"
                />
              </div>
              <div className="w-full text-black font-semibold">
                <label>
                  Height to <span className="text-red-500">*</span>
                </label>
                <input
                  disabled
                  value={partnerSettingsDetails.pref_height_to}
                  className="w-full text-black font-medium px-4 py-2 border border-black rounded"
                />
              </div>
              <div className="w-full text-black font-semibold">
                <label>
                  Age Difference <span className="text-red-500">*</span>
                </label>
                <input
                  disabled
                  value={partnerSettingsDetails.pref_age_differences}
                  className="w-full text-black font-medium px-4 py-2 border border-black rounded"
                />
              </div>
            </div>

            <div className="flex w-full text-black font-semibold flex-row gap-4">
              <div className="w-full text-black font-semibold">
                <label>
                  Chevvai
                </label>
                <select
                  disabled
                  value={partnerSettingsDetails.pref_chevvai}
                  className="w-full text-black font-bold px-4 py-2 border border-black rounded"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="w-full text-black font-semibold">
                <label>
                  Rahu / Ketu
                </label>
                <select
                  disabled
                  value={partnerSettingsDetails.pref_ragukethu}
                  className="w-full text-black font-bold px-4 py-2 border border-black rounded"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="w-full text-black font-semibold">
                <label>
                  Foreign Interest
                </label>
                <select
                  disabled
                  value={partnerSettingsDetails.pref_foreign_intrest}
                  className="w-full text-black font-semibold px-4 py-2 border border-black rounded"
                >
                  <option value="">Select</option>
                  <option value="Both">Both</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>


            <div>
              <h5 className="text-[18px] text-black font-semibold mb-2 cursor-pointer"

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
                      className='text-[#000000e6] font-medium'
                    >
                      {status.family_status_name}
                    </label>
                  </div>
                ))}
              </div>

            </div>



            <div>
              <h5 className="text-[18px] text-black font-semibold mb-2 cursor-pointer"

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
                      className='text-[#000000e6] font-medium'
                    >
                      {state.State_name}
                    </label>
                  </div>
                ))}
              </div>


            </div>

            <div className="w-full text-black font-semibold">
              <h5 className="text-[18px] text-black font-semibold mb-2">
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
                      className="pl-1 text-black font-medium"
                    >
                      {profession.Profes_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <label className="text-[18px] text-black font-semibold mb-2">
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
                      className="pl-1 text-black font-medium"
                    >
                      {option.Edu_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-[18px] text-black font-semibold mb-2">
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
                    <label htmlFor={`maritalStatus-${status.marital_sts_id}`} className='text-black font-medium'>
                      {status.marital_sts_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[18px] text-black font-semibold mb-2">
                Annual Income
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {annualIncome.map((option: any) => (
                  <div
                    key={option.income_id}
                    className="mb-2 flex items-center"
                  >
                    <input
                      type="checkbox"
                      id={`annualIncome-${option.income_id}`}
                      value={option.income_id.toString()}
                      checked={annualIncomeArray?.includes(
                        option.income_id.toString(),
                      )}
                      onClick={(e) => e.preventDefault()}
                    />
                    <label
                      htmlFor={`annualIncome-${option.income_id}`}
                      className="pl-1 text-black font-medium"
                    >
                      {option.income_description}
                    </label>
                  </div>
                ))}
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
