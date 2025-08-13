import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import MatchingStars from '../../PartnerPreference/MatchingStars';
import {
  fetchMaritalStatuses,
  getAnnualIncome,
  getProfession,
  fetchMatchPreferences,
  annualIncomeApi,
  educationalPrefApi,
  fetchFamilyStatus,
  StatePref,

} from '../../../action';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../AddProfile';
import axios from 'axios';
import { IoMdArrowDropdown } from 'react-icons/io';
interface ProfessionPref {
  Profes_Pref_id: number;
  Profes_name: string;
}
interface Partnerpreference {
  birthStarId: string;
  gender: string;
  rasiid:string;
  setPoruthamstar: Dispatch<SetStateAction<string>>;
  setPreforuthamStarRasi: Dispatch<SetStateAction<string>>;
  setMaritalStaus: Dispatch<SetStateAction<string>>;
  setPrefProf: Dispatch<SetStateAction<number[]>>;
  setPrefEducation: Dispatch<SetStateAction<string[] | undefined>>;
  setAnnualIncomesValmax: Dispatch<SetStateAction<string[]>>;
  setAnnualIncomesVal: Dispatch<SetStateAction<string[]>>;
  selectSetMaridStatus: Dispatch<SetStateAction<string[]>>;
  setIsPartnerPreferenceOpen: Dispatch<SetStateAction<boolean>>;
  isPartnerPreferenceOpen: boolean;
}
export interface SelectedStarIdItem {
  id: string;
  rasi: string;
  star: string;
  label: string;
}

export interface MatchingStar {
  dest_rasi_id: number;
  dest_star_id: number;
  id: number;
  match_count: number;
  matching_porutham: string;
  matching_starname: string;
  matching_rasiname: string;
  protham_names: string[];
  source_star_id: number;
  setPreforuthamStarRasi: Dispatch<SetStateAction<string>>;
  setPoruthamstar: Dispatch<SetStateAction<string>>;
}

export interface SelectedStarIdItem {
  id: string;
  rasi: string;
  star: string;
  label: string;
}

export interface EduPref {
  Edu_Pref_id: number;
  Edu_name: string;
}
interface MaritalStatus {
  marital_sts_id: number;
  marital_sts_name: string;
}
interface AnnualIncome {
  income_id: number;
  income_description: string;
}
const Partner_preference: React.FC<Partnerpreference> = ({
  birthStarId,
  gender,
  rasiid,
  setPoruthamstar,
  setPreforuthamStarRasi,
  setMaritalStaus,
  selectSetMaridStatus,
  setPrefProf,
  setPrefEducation,
  setAnnualIncomesVal,
  setAnnualIncomesValmax,
  isPartnerPreferenceOpen,
  setIsPartnerPreferenceOpen,
}) => {
  const {
    register,

    formState: { errors },
  } = useFormContext<FormValues>();

  // const [matchStars, setMatchStars] = useState<MatchingStar[]>([]);
  const [selectedStarIds, setSelectedStarIds] = useState<SelectedStarIdItem[]>(
    [],
  );
// const [partnerSelectedStarIds, setPartnerSelectedStarIds] = useState<SelectedStarIdItem[]>([]);
//   // Generate the strings in a useEffect or when needed
// const partnerStarString = partnerSelectedStarIds.map(item => item.star).join(',');
// const partnerCombinedString = partnerSelectedStarIds.map(item => `${item.star}-${item.rasi}`).join(',');
//    useEffect(() => {
//     const starString = partnerSelectedStarIds.map(item => item.star).join(',');
//     const combinedString = partnerSelectedStarIds.map(item => `${item.star}-${item.rasi}`).join(',');
    
//     setPoruthamstar(starString);
//     setPreforuthamStarRasi(combinedString);
    
//     // For debugging:
//     console.log('Partner Preference Stars:', starString);
//     console.log('Partner Preference Combined:', combinedString);
//   }, [partnerSelectedStarIds]);
  const handleCheckboxChange = (updatedIds: SelectedStarIdItem[]) => {
    setSelectedStarIds(updatedIds);
  };

  const [eduPref, setEduPref] = useState<EduPref[]>([]);
  const [selectedEducations, setSelectedEducations] = useState<string[]>([]);
  const handleEducationChange = (id: string, isChecked: boolean) => {
    setSelectedEducations((prev) =>
      isChecked ? [...prev, id] : prev.filter((eduId) => eduId !== id),
    );
  };
  useEffect(() => {
    setPrefEducation(selectedEducations);
  }, [selectedEducations]);
  const toggleSection5 = () => {
    setIsPartnerPreferenceOpen(!isPartnerPreferenceOpen);
  };

  const { data: MaritalStatuses } = useQuery({
    queryKey: ['MaritalStatuses'],
    queryFn: fetchMaritalStatuses,
  });

  const { data: AnnualIncomes } = useQuery({
    queryKey: ['AnnualIncomes'],
    queryFn: getAnnualIncome,
  });
  const { data: profession } = useQuery({
    queryKey: ['profession'],
    queryFn: getProfession,
  });
  const { data: matchStars } = useQuery({
    queryKey: ['matchingStars'],
    queryFn: () => fetchMatchPreferences(rasiid,birthStarId, gender),
    enabled: !!birthStarId && !!gender && !!rasiid,
  });
  
  const starArray = selectedStarIds.map((item) => item.id);
  const starRasiArray = selectedStarIds.map(
    (item) => `${item.star}-${item.rasi}`,
  );

  // Create a comma-separated string for each array

  const StarString = starArray.join(',');
  const combinedString = starRasiArray.join(',');

 
  useEffect(() => {
    setPreforuthamStarRasi(combinedString);
    setPoruthamstar(StarString);
  }, [StarString, combinedString]);
  // const handleAnnualIncomeChange = (id: string, isChecked: boolean) => {
  //   setSelectedAnnualIncomes((prev) =>
  //     isChecked ? [...prev, id] : prev.filter((incId) => incId !== id),
  //   );
  // };

  const handleAnnualIncomeChange = (value: string) => {
    setSelectedAnnualIncomes([value]); // Ensure it's always a single value
  };

  const handleAnnualIncomeChangeMax = (value: string) => {
    setSelectedAnnualIncomesMax([value]); // Ensure it's always a single value
  };


  const [annualIncome, setAnnualIncome] = useState<AnnualIncome[]>([]);

  const [selectedAnnualIncomes, setSelectedAnnualIncomes] = useState<string[]>(
    [],
  );

  const [selectedAnnualIncomesMax, setSelectedAnnualIncomesMax] = useState<string[]>(
    [],
  );
// In Partner_preference component


  useEffect(() => {
    setAnnualIncomesVal(selectedAnnualIncomes);
  }, [selectedAnnualIncomes]);

  useEffect(() => {
    setAnnualIncomesValmax(selectedAnnualIncomesMax);
  }, [selectedAnnualIncomesMax]);

  useEffect(() => {
    const fetchAnnualIncome = async () => {
      try {
        const response = await axios.post(
          `${annualIncomeApi}`,
        );
        const options = Object.values(response.data) as AnnualIncome[];
        setAnnualIncome(options);
      } catch (error) {
        console.error('Error fetching Annual Income options:', error);
      }
    };
    fetchAnnualIncome();
  }, []);



  useEffect(() => {
    const fetchEduPref = async () => {
      try {
        const response = await axios.post(
          `${educationalPrefApi}`,
        );
        const options = Object.values(response.data) as EduPref[];
        console.log(options);
        setEduPref(options);
      } catch (error) {
        console.error('Error fetching Edu Pref options:', error);
      }
    };
    fetchEduPref();
  }, []);

  ////mar status
  const [selectedMaritalStatuses, setSelectedMaritalStatuses] = useState<
    string[]
  >([]);
   const [selectedFamilyStatus, setSelectedFamilyStatus] = useState('');
  const handleMaritalStatusChange = (id: string, isChecked: boolean) => {
    setSelectedMaritalStatuses((prev) =>
      isChecked ? [...prev, id] : prev.filter((statusId) => statusId !== id),
    );
  };

  useEffect(() => {
    selectSetMaridStatus(selectedMaritalStatuses);
  }, [selectedMaritalStatuses]);
  const resStatus = sessionStorage.getItem('responseStatus');
  useEffect(() => {
    if (resStatus === '201') {
      setSelectedProfessions([]);
      setSelectedEducations([]);
      setSelectedMaritalStatuses([]);
      setSelectedAnnualIncomes([]);
      setSelectedStarIds([]);

      setTimeout(() => {
        sessionStorage.removeItem('responseStatus');
      }, 3000);
    }
  }, [resStatus]);
  const [selectedProfessions, setSelectedProfessions] = useState<number[]>([]);

  // Function to handle the change of checkboxes
  const handleProfessionChange = (professionId: number) => {
    setSelectedProfessions((prevSelected) => {
      // Check if the profession is already selected
      if (prevSelected.includes(professionId)) {
        // If already selected, remove it from the array
        return prevSelected.filter((id) => id !== professionId);
      } else {
        // If not selected, add it to the array
        return [...prevSelected, professionId];
      }
    });
  };
  useEffect(() => {
    setPrefProf(selectedProfessions);
  }, [selectedProfessions]);


  const handleSelectAllProfessions = () => {
  // Check if all are already selected
  const allSelected = profession?.every((p:any) => 
    selectedProfessions.includes(p.Profes_Pref_id)
  );
  
  if (allSelected) {
    // Deselect all
    setSelectedProfessions([]);
  } else {
    // Select all
    const allIds = profession?.map((p:any) => p.Profes_Pref_id) || [];
    setSelectedProfessions(allIds);
  }
};

const handleSelectAllMaritalStatus = () => {
  const allSelected = MaritalStatuses?.every((m:any) => 
    selectedMaritalStatuses.includes(m.marital_sts_id.toString())
  );
  
  if (allSelected) {
    setSelectedMaritalStatuses([]);
  } else {
    const allIds = MaritalStatuses?.map((m:any )=> m.marital_sts_id.toString()) || [];
    setSelectedMaritalStatuses(allIds);
  }
};
const handleSelectAllEducation = () => {
  const allSelected = eduPref.every(e => 
    selectedEducations.includes(e.Edu_Pref_id.toString())
  );
  
  if (allSelected) {
    setSelectedEducations([]);
  } else {
    const allIds = eduPref.map(e => e.Edu_Pref_id.toString());
    setSelectedEducations(allIds);
  }
};

 const { data: FamilyStatus } = useQuery({
    queryKey: ['FamilyStatus'],
    queryFn: fetchFamilyStatus,
  });


  const [selectedPrefState, setSelectedPrefState] = useState('');
   const [stateOptions, setStateOptions] = useState<StatePref[]>([]); // ✅ Typed useState
console.log("bqw",stateOptions)
 

  useEffect(() => {
  const fetchStatePreferences = async () => {
    try {
      const response = await axios.post(
        `https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/auth/Get_State_Pref/`
      );

      console.log("fffffffffffffffffffffff",response);
      
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
          className="text-red-600 flex row items-center justify-between text-xl cursor-pointer font-semibold dark:text-white "
          onClick={toggleSection5}
        >
          {' '}
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
            <div className="flex w-full flex-row gap-4 max-md:flex-col">
              <div className="w-full">
                <label>
                  Height from <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('PartnerPreference.heightFrom')}
                  className="w-full px-4 py-2 border border-black rounded"
                />
                {errors?.PartnerPreference?.heightFrom && (
                  <p className="text-red-600">
                    {errors.PartnerPreference.heightFrom.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label>
                  Height to <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('PartnerPreference.toHeight')}
                  className="w-full px-4 py-2 border border-black rounded"
                />
                {errors?.PartnerPreference?.toHeight && (
                  <p className="text-red-600">
                    {errors.PartnerPreference.toHeight.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label>
                  Age Difference <span className="text-red-500">*</span>
                </label>
                <input
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

                    // Get the current value of the input field
                    const inputValue = (e.target as HTMLInputElement).value;

                    // If the key pressed is not allowed or if the length of the input is already 2, prevent it
                    if (
                      !allowedKeys.includes(e.key) ||
                      (inputValue.length >= 2 &&
                        ![
                          'Backspace',
                          'Tab',
                          'ArrowLeft',
                          'ArrowRight',
                          'Delete',
                        ].includes(e.key))
                    ) {
                      e.preventDefault();
                    }
                  }}
                  {...register('PartnerPreference.agePreference')}
                  className="w-full px-4 py-2 border border-black rounded"
                />

                {errors?.PartnerPreference?.agePreference && (
                  <p className="text-red-600">
                    {errors.PartnerPreference.agePreference.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex w-full flex-row gap-4 max-md:flex-col">
              <div className="w-full">
                <label>
                  Chevvai 
                  {/* <span className="text-red-500">*</span> */}
                </label>
                <select
                  {...register('PartnerPreference.ChevvaiDhosam')}
                  className="w-full px-4 py-2 border border-black rounded"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors?.PartnerPreference?.ChevvaiDhosam && (
                  <p className="text-red-600">
                    {errors.PartnerPreference.ChevvaiDhosam.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label>
                  Rahu / Ketu <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('PartnerPreference.ragukethu')}
                  className="w-full px-4 py-2 border border-black rounded"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors?.PartnerPreference?.ragukethu && (
                  <p className="text-red-600">
                    {errors.PartnerPreference.ragukethu.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label>
                  Foreign Interest <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('PartnerPreference.foreignInterest')}
                  className="w-full px-4 py-2 border border-black rounded"
                >
                  <option value="">Select</option>
                  <option value="Both">Both</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors?.PartnerPreference?.foreignInterest && (
                  <p className="text-red-600">
                    {errors.PartnerPreference.foreignInterest.message}
                  </p>
                )}
              </div>
            </div>



  <div className="w-full py-1">
                <label className="block text-black font-medium mb-1">
                  Family Status 
                   {/* <span className="text-red-500">*</span> */}
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
                       {...register('PartnerPreference.pref_family_status')}
                        type="radio"
                        className="w-0"
                      />
                      {status.family_status_name}
                    </label>
                  ))}
                </div>
                 {/* {errors?.PartnerPreference?.pref_family_status && (
                  <p className="text-red-600">{errors?.PartnerPreference?.pref_family_status.message}</p>
                )}  */}
               
              </div>



              
  <div className="w-full py-1">
                <label className="block text-black font-medium mb-1">
                Preffered State 
                </label>
                <div className="w-full inline-flex rounded max-md:flex-col">
                  {stateOptions?.map((status) => ( 
                  
                    <label
                       key={status.State_Pref_id}
                     // className='w-full px-5 py-3 text-sm font-medium border cursor-pointer'
                      className={`w-full px-5 py-3 text-sm font-bold border border-black cursor-pointer ${
                        String(selectedPrefState) ===
                        String(status.State_Pref_id)
                       // watch("suggested_pref_details.pref_state") === String(status.State_Pref_id)

                        ? 'bg-blue-500 text-white'
                        : ''
                        }`}
                      onClick={() =>
                        setSelectedPrefState(String(status.State_Pref_id))
                      }
                    >
                      <input
                         value={status.State_Pref_id}
                       {...register('PartnerPreference.pref_state')}
                        type="radio"
                        className="w-0"
                      />
                      {status.State_name}
                    </label>
                  ))}
                </div>
                 {/* {errors?.PartnerPreference?.FamilyStatus && (
                  <p className="text-red-600">Family status is required</p>
                )}  */}
                 {/* {errors?.SuggestedProfileForm?.pref_state && (
                  <p className="text-red-600">
                    {errors.SuggestedProfileForm.pref_state.message}
                  </p>
                )} */}
              </div>

            <div className="w-full">
              <h5 className="text-[18px] text-black font-semibold mb-2 cursor-pointer"  onClick={handleSelectAllProfessions}>
                Profession
              </h5>
              <div className="flex justify-between items-center max-md:flex-col max-md:gap-3 max-md:items-start">
                {profession?.map((profession: ProfessionPref) => (
                  <div key={profession.Profes_Pref_id}>
                    <input
                      type="checkbox"
                      id={`profession-${profession.Profes_Pref_id}`}
                      // {...register('professionPreference')} // Assuming you're using react-hook-form
                      value={profession.Profes_name}
                      checked={selectedProfessions.includes(
                        profession.Profes_Pref_id,
                      )}
                      onChange={() =>
                        handleProfessionChange(profession.Profes_Pref_id)
                      }
                    />
                    <label
                      htmlFor={`profession-${profession.Profes_Pref_id}`}
                      className="pl-1"
                    >
                      {profession.Profes_name}
                    </label>
                  </div>
                ))}
              </div>
              {/* {errors.professionPreference && (
                  <span className="text-red-500">
                    {errors.professionPreference.message}
                  </span>
                )} */}
            </div>
            <div>
              <label className="text-[18px] text-black font-semibold mb-2 cursor-pointer"  onClick={handleSelectAllEducation}>
                Education
              </label>
              <div className="flex flex-wrap gap-4">
                {eduPref.map((option) => (
                  <div key={option.Edu_Pref_id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`education-${option.Edu_Pref_id}`}
                      value={option.Edu_Pref_id.toString()}
                      checked={selectedEducations.includes(
                        option.Edu_Pref_id.toString(),
                      )}
                      onChange={(e) =>
                        handleEducationChange(
                          option.Edu_Pref_id.toString(),
                          e.target.checked,
                        )
                      }
                    />
                    <label
                      htmlFor={`education-${option.Edu_Pref_id}`}
                      className="pl-1"
                    >
                      {option.Edu_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-[18px] text-black font-semibold mb-2 cursor-pointer" onClick={handleSelectAllMaritalStatus}>
                Marital Status
              </h5>
              <div className="flex justify-between items-center max-md:flex-col max-md:gap-3 max-md:items-start">
                {MaritalStatuses?.map((status: any) => (
                  <div key={status.marital_sts_id}>
                    <input
                      type="checkbox"
                      id={`maritalStatus-${status.marital_sts_id}`}
                      value={status.marital_sts_id.toString()}
                      checked={selectedMaritalStatuses.includes(
                        status.marital_sts_id.toString(),
                      )}
                      onChange={(e) =>
                        handleMaritalStatusChange(
                          status.marital_sts_id.toString(),
                          e.target.checked,
                        )
                      }
                    />
                    <label htmlFor={`maritalStatus-${status.marital_sts_id}`}>
                      {status.marital_sts_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>


              <h5 className="text-[18px] text-black font-semibold mb-2">
                Annual Income
              </h5>
              <div className='flex w-full gap-4 flex-row max-md:flex-col'>
                <div className="w-full">
                  <h5>Minimum Annual Income</h5>
                  <div className="relative">
                    <select
                      id="annualIncome_min"
                      className="block w-full px-3 py-[13px] text-sm border border-ashBorder rounded outline-none appearance-none bg-transparent"
                      value={selectedAnnualIncomes}
                      onChange={(e) => handleAnnualIncomeChange(e.target.value)}
                    >
                      <option value="" disabled>
                        Select min Annual Income
                      </option>
                      {annualIncome?.length > 0 ? (
                        annualIncome.map((option) => (
                          <option key={option.income_id} value={option.income_id}>
                            {option.income_description}
                          </option>
                        ))
                      ) : (
                        <option disabled>No income options available</option>
                      )}
                    </select>
                    <IoMdArrowDropdown className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="w-full">
                  <h5 >Maximum Annual Income</h5>
                  <div className="relative">
                    <select
                      id="annualIncome_min"
                      className="block w-full px-3 py-[13px] text-sm border border-ashBorder rounded outline-none appearance-none bg-transparent"
                      value={selectedAnnualIncomesMax}
                      onChange={(e) => handleAnnualIncomeChangeMax(e.target.value)}
                    >
                      <option value="" disabled>
                        Select max Annual Income
                      </option>
                      {annualIncome?.length > 0 ? (
                        annualIncome.map((option) => (
                          <option key={option.income_id} value={option.income_id}>
                            {option.income_description}
                          </option>
                        ))
                      ) : (
                        <option disabled>No income options available</option>
                      )}
                    </select>
                    <IoMdArrowDropdown className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {annualIncome.map((option) => (
                  <div
                    key={option.income_id}
                    className="mb-2 flex items-center"
                  >
                    <input
                      type="checkbox"
                      id={`annualIncome-${option.income_id}`}
                      value={option.income_id.toString()}
                      checked={selectedAnnualIncomes.includes(
                        option.income_id.toString(),
                      )}
                      onChange={(e) =>
                        handleAnnualIncomeChange(
                          option.income_id.toString(),
                          e.target.checked,
                        )
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
              </div> */}
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
                        <MatchingStars
                          key={index}
                          initialPoruthas={`No of porutham ${matchCountValue}`}
                          starAndRasi={starAndRasi}
                          selectedStarIds={selectedStarIds}
                          onCheckboxChange={handleCheckboxChange}
                          unique={"partner"}
                        />

//                         <MatchingStars
//                          key={index}
//   unique="partner"
//   initialPoruthas={`No of porutham ${matchCountValue}`}
//   starAndRasi={starAndRasi}
//   selectedStarIds={partnerSelectedStarIds}
//   onCheckboxChange={setPartnerSelectedStarIds}
// />
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

export default Partner_preference;
