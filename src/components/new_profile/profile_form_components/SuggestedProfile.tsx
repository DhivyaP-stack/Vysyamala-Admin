import { useFormContext } from 'react-hook-form';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FormValues } from '../AddProfile';
import axios from 'axios';
import { annualIncomeApi, educationalPrefApi, fetchMaritalStatuses, getProfession, fetchMatchPreferences, annualMaxIncomeApi, fetchFamilyStatus, StatePref } from '../../../action';
import { useQuery } from '@tanstack/react-query';
import MatchingStars from '../../PartnerPreference/MatchingStars';
import { IoMdArrowDropdown } from 'react-icons/io';
import { apiAxios } from '../../../api/apiUrl';
import Select from 'react-select';
interface AnnualIncome {
  income_id: number;
  income_description: string;
}

interface MaritalStatus {
  marital_sts_id: number;
  marital_sts_name: string;
}

export interface EduPref {
  Edu_Pref_id: number;
  Edu_name: string;
}

export interface SelectedStarIdItem {
  id: string;
  rasi: string;
  star: string;
  label: string;
}

interface ProfessionPref {
  Profes_Pref_id: number;
  Profes_name: string;
}

interface FieldOfStudy {
  study_id: number;
  study_description: string;
}
interface Degree {
  degeree_id: number;
  degeree_description: string;
}
interface SuggestedProfileForm {
  birthStarId: string;
  gender: string;
  rasiid: string;
  setPoruthamstar: Dispatch<SetStateAction<string>>;
  setPreforuthamStarRasi: Dispatch<SetStateAction<string>>;
  setMaritalStaus: Dispatch<SetStateAction<string>>;
  setPrefProf: Dispatch<SetStateAction<number[]>>;
  setPrefEducation: Dispatch<SetStateAction<string[] | undefined>>;
  setPrefFieldOfStudy: Dispatch<SetStateAction<string[]>>;
  setPrefDegree: Dispatch<SetStateAction<string[]>>;
  setAnnualIncomesVal: Dispatch<SetStateAction<string[]>>;
  setAnnualIncomesValmax: Dispatch<SetStateAction<string[]>>;
  selectSetMaridStatus: Dispatch<SetStateAction<string[]>>;
  setIsSuggestedProfileOpen: Dispatch<SetStateAction<boolean>>;
  isSuggestedProfileOpen: boolean;
  setFamilyStatus: Dispatch<SetStateAction<string>>;
  setPrefState: Dispatch<SetStateAction<string>>;
}
interface MatchingStar {
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
const SuggestedProfileForm: React.FC<SuggestedProfileForm> = ({
  birthStarId,
  gender,
  rasiid,
  setPoruthamstar,
  setPreforuthamStarRasi,
  setMaritalStaus,
  selectSetMaridStatus,
  setPrefProf,
  setPrefEducation,
  setPrefFieldOfStudy,
  setPrefDegree,
  setAnnualIncomesVal,
  setAnnualIncomesValmax,
  isSuggestedProfileOpen,
  setIsSuggestedProfileOpen,
  setFamilyStatus,
  setPrefState,
}) => {
  const {
    register,

    formState: { errors },
  } = useFormContext<FormValues>();

  const toggleSection = () => {
    (!isSuggestedProfileOpen);
  }; setIsSuggestedProfileOpen


  const [selectedStarIds, setSelectedStarIds] = useState<SelectedStarIdItem[]>([],);
  const [annualIncome, setAnnualIncome] = useState<AnnualIncome[]>([]);
  const [selectedAnnualIncomes, setSelectedAnnualIncomes] = useState<string[]>([],);
  const [selectedAnnualIncomesmax, setSelectedAnnualIncomesMax] = useState<string[]>([],);
  const [eduPref, setEduPref] = useState<EduPref[]>([]);
  const [selectedEducations, setSelectedEducations] = useState<string[]>([]);
  // Add Field of Study state
  const [fieldOfStudyOptions, setFieldOfStudyOptions] = useState<FieldOfStudy[]>([]);
  const [selectedFieldsOfStudy, setSelectedFieldsOfStudy] = useState<string[]>([]);
  const [allFieldsOfStudySelected, setAllFieldsOfStudySelected] = useState(false);
  // Add degree state
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [selectedDegrees, setSelectedDegrees] = useState<string[]>([]);

  useEffect(() => {
    setAnnualIncomesVal(selectedAnnualIncomes);
  }, [selectedAnnualIncomes]);

  useEffect(() => {
    setAnnualIncomesValmax(selectedAnnualIncomesmax);
  }, [selectedAnnualIncomesmax]);

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


  const handleAnnualIncomeChange = (value: string) => {
    setSelectedAnnualIncomes([value]); // Ensure it's always a single value
  };

  const handleAnnualIncomeChangemax = (value: string) => {
    setSelectedAnnualIncomesMax([value]); // Ensure it's always a single value
  };

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


  // Add Field of Study handler
  const handleFieldOfStudyChange = (id: string, isChecked: boolean) => {
    setSelectedFieldsOfStudy((prev) =>
      isChecked ? [...prev, id] : prev.filter((studyId) => studyId !== id),
    );
  };

  // Add Select All handler for Field of Study
  const handleSelectAllFieldsOfStudy = () => {
    if (allFieldsOfStudySelected) {
      // Deselect all
      setSelectedFieldsOfStudy([]);
    } else {
      // Select all
      const allIds = fieldOfStudyOptions.map(option => option.study_id.toString());
      setSelectedFieldsOfStudy(allIds);
    }
    setAllFieldsOfStudySelected(!allFieldsOfStudySelected);
  };

  // Add useEffect to update allFieldsOfStudySelected state
  useEffect(() => {
    const allSelected = fieldOfStudyOptions.length > 0 &&
      fieldOfStudyOptions.every(option =>
        selectedFieldsOfStudy.includes(option.study_id.toString())
      );
    setAllFieldsOfStudySelected(allSelected);
  }, [selectedFieldsOfStudy, fieldOfStudyOptions]);

  // Add useEffect to fetch Field of Study options
  useEffect(() => {
    const fetchFieldOfStudy = async () => {
      try {
        const response = await apiAxios.post(
          `/auth/Get_Field_ofstudy/`,
        );
        const options = Object.values(response.data) as FieldOfStudy[];
        setFieldOfStudyOptions(options);
      } catch (error) {
        console.error('Error fetching Field of Study options:', error);
      }
    };
    fetchFieldOfStudy();
  }, []);

  // Add useEffect to update parent component
  useEffect(() => {
    setPrefFieldOfStudy(selectedFieldsOfStudy);
  }, [selectedFieldsOfStudy, setPrefFieldOfStudy]);
  //mar status
  const [selectedMaritalStatuses, setSelectedMaritalStatuses] = useState<string[]>([]);
  const [selectedFamilyStatus, setSelectedFamilyStatus] = useState<string>('');
  const [selectedPrefState, setSelectedPrefState] = useState<string>('');

  // In SuggestedProfileForm.tsx, add these two useEffects

  useEffect(() => {
    setFamilyStatus(selectedFamilyStatus);
  }, [selectedFamilyStatus, setFamilyStatus]);

  useEffect(() => {
    setPrefState(selectedPrefState);
  }, [selectedPrefState, setPrefState]);

  // In SuggestedProfileForm.tsx

  // Handler for Family Status
  const handleFamilyStatusChange = (id: string) => {
    const currentIds = selectedFamilyStatus ? selectedFamilyStatus.split(',') : [];
    const index = currentIds.indexOf(id);

    if (index === -1) {
      currentIds.push(id); // Add if not present
    } else {
      currentIds.splice(index, 1); // Remove if present
    }
    setSelectedFamilyStatus(currentIds.join(','));
  };

  // Handler for Preferred State
  const handleStateChange = (id: string) => {
    const currentIds = selectedPrefState ? selectedPrefState.split(',') : [];
    const index = currentIds.indexOf(id);

    if (index === -1) {
      currentIds.push(id); // Add if not present
    } else {
      currentIds.splice(index, 1); // Remove if present
    }
    setSelectedPrefState(currentIds.join(','));
  };

  const handleEducationChange = (id: string, isChecked: boolean) => {
    setSelectedEducations((prev) =>
      isChecked ? [...prev, id] : prev.filter((eduId) => eduId !== id),
    );
  };
  const handleMaritalStatusChange = (id: string, isChecked: boolean) => {
    setSelectedMaritalStatuses((prev) =>
      isChecked ? [...prev, id] : prev.filter((statusId) => statusId !== id),
    );
  };


  const { data: profession } = useQuery({
    queryKey: ['profession'],
    queryFn: getProfession,
  });

  const { data: MaritalStatuses } = useQuery({
    queryKey: ['MaritalStatuses'],
    queryFn: fetchMaritalStatuses,
  });


  const { data: matchStars } = useQuery({
    queryKey: ['matchingStars'],
    queryFn: () => fetchMatchPreferences(rasiid, birthStarId, gender),
    enabled: !!birthStarId && !!gender && !!rasiid,
  });

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
      setSelectedAnnualIncomesMax([]);
      setSelectedFieldsOfStudy([]);
      // setSelectedStarIds([]);

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
  const starArray = selectedStarIds.map((item) => item.id);
  const starRasiArray = selectedStarIds.map(
    (item) => `${item.star}-${item.rasi}`,
  );
  const StarString = starArray.join(',');
  const combinedString = starRasiArray.join(',');

  useEffect(() => {
    setPreforuthamStarRasi(combinedString);
    setPoruthamstar(StarString);
  }, [StarString, combinedString]);

  const handleCheckboxChange = (updatedIds: SelectedStarIdItem[]) => {
    setSelectedStarIds(updatedIds);
  };

  const { data: FamilyStatus } = useQuery({
    queryKey: ['FamilyStatus'],
    queryFn: fetchFamilyStatus,
  });

  // const [selectedPrefState, setSelectedPrefState] = useState('');
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

  const handleSelectAllMaritalStatus = () => {
    const allSelected = MaritalStatuses?.every((m: any) =>
      selectedMaritalStatuses.includes(m.marital_sts_id.toString())
    );

    if (allSelected) {
      setSelectedMaritalStatuses([]);
    } else {
      const allIds = MaritalStatuses?.map((m: any) => m.marital_sts_id.toString()) || [];
      setSelectedMaritalStatuses(allIds);
    }
  };

  const handleSelectAllProfessions = () => {
    // Check if all are already selected
    const allSelected = profession?.every((p: any) =>
      selectedProfessions.includes(p.Profes_Pref_id)
    );

    if (allSelected) {
      // Deselect all
      setSelectedProfessions([]);
    } else {
      // Select all
      const allIds = profession?.map((p: any) => p.Profes_Pref_id) || [];
      setSelectedProfessions(allIds);
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

  useEffect(() => {
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
    fetchDegrees();
  }, []);


  const handleDegreeChange = (selectedOptions: any) => {
    const selectedIds = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setSelectedDegrees(selectedIds);
  };

  // Update parent component
  useEffect(() => {
    setPrefDegree(selectedDegrees);
  }, [selectedDegrees, setPrefDegree]);

  // Get selected options for display
  const getSelectedOptions = () => {
    return selectedDegrees.map(id => {
      const degree = degrees.find(d => d.degeree_id.toString() === id);
      return degree ? { value: id, label: degree.degeree_description } : null;
    }).filter(Boolean);
  };

  return (
    <div>
      <div className="bg-white p-5 mb-10 rounded shadow-md">
        <h4
          className="text-red-600 flex row items-center justify-between text-xl cursor-pointer font-semibold"
          onClick={toggleSection}
        >
          Suggested Profile
          <svg
            className={`fill-current transform ${isSuggestedProfileOpen ? 'rotate-180' : ''
              }`}
            width={'20'}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"></path>
          </svg>
        </h4>
        {isSuggestedProfileOpen && (
          <div className="flex flex-col gap-5 pt-2">
            {/* Height Inputs */}
            <div className="flex w-full flex-row gap-4 max-md:flex-col">
              <div className="w-full">
                <label>
                  Height From
                </label>
                <input
                  {...register('SuggestedProfileForm.heightFrom')}
                  className="w-full px-4 py-2 border border-black rounded"
                />
                {errors?.SuggestedProfileForm?.heightFrom && (
                  <p className="text-red-600">
                    {errors.SuggestedProfileForm.heightFrom.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label>
                  Height To
                </label>
                <input
                  {...register('SuggestedProfileForm.heightTo')}
                  className="w-full px-4 py-2 border border-black rounded"
                />
                {errors?.SuggestedProfileForm?.heightTo && (
                  <p className="text-red-600">
                    {errors.SuggestedProfileForm.heightTo.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label>
                  Age Difference
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
                  {...register('SuggestedProfileForm.agePreference')}
                  className="w-full px-4 py-2 border border-black rounded"
                />

                {errors?.SuggestedProfileForm?.agePreference && (
                  <p className="text-red-600">
                    {errors.SuggestedProfileForm.agePreference.message}
                  </p>
                )}
              </div>
            </div>

            {/* Chevvai and Rahu/Ketu */}
            <div className="flex w-full flex-row gap-4 max-md:flex-col">
              <div className="w-full">
                <label>
                  Chevvai
                </label>
                <select
                  {...register('SuggestedProfileForm.ChevvaiDhosam')}
                  className="w-full px-4 py-2 border border-black rounded"
                >
                  <option value="">Select</option>

                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Both">Both</option>
                </select>
                {errors?.SuggestedProfileForm?.ChevvaiDhosam && (
                  <p className="text-red-600">
                    {errors.SuggestedProfileForm.ChevvaiDhosam.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label>
                  Rahu / Ketu
                </label>
                <select
                  {...register('SuggestedProfileForm.ragukethu')}
                  className="w-full px-4 py-2 border border-black rounded"
                >
                  <option value="">Select</option>

                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Both">Both</option>
                </select>
                {errors?.SuggestedProfileForm?.ragukethu && (
                  <p className="text-red-600">
                    {errors.SuggestedProfileForm.ragukethu.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label>
                  Foreign Interest
                </label>
                <select
                  {...register('SuggestedProfileForm.foreignInterest')}
                  className="w-full px-4 py-2 border border-black rounded"
                >
                  <option value="">Select</option>

                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Both">Both</option>
                </select>
                {errors?.SuggestedProfileForm?.foreignInterest && (
                  <p className="text-red-600">
                    {errors.SuggestedProfileForm.foreignInterest.message}
                  </p>
                )}
              </div>
            </div>




            <div className="w-full ">
              <h5 className="text-[18px] text-black font-semibold mb-2">
                Family Status
              </h5>
              <div className="flex justify-between items-center max-md:flex-col max-md:gap-3 max-md:items-start">
                {FamilyStatus?.map((status) => (
                  <div key={status.family_status_id}>
                    <input
                      type="checkbox"
                      id={`suggested-form-family-status-${status.family_status_id}`}
                      value={status.family_status_id}
                      checked={(selectedFamilyStatus || '').split(',').includes(status.family_status_id.toString())}
                      onChange={() => handleFamilyStatusChange(status.family_status_id.toString())}
                      className="mr-2"
                    />
                    <label
                      htmlFor={`suggested-form-family-status-${status.family_status_id}`}
                      className='pl-1'
                    >
                      {status.family_status_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>


            <div className="w-full">
              <h5 className="text-[18px] text-black font-semibold mb-2">
                Preferred State
              </h5>
              <div className="flex justify-between items-center max-md:flex-col max-md:gap-3 max-md:items-start">
                {stateOptions?.map((state) => (
                  <div key={state.State_Pref_id}>
                    <input
                      type="checkbox"
                      id={`suggested-form-state-${state.State_Pref_id}`}
                      value={state.State_Pref_id}
                      checked={(selectedPrefState || '').split(',').includes(state.State_Pref_id.toString())}
                      onChange={() => handleStateChange(state.State_Pref_id.toString())}
                      className="mr-2"
                    />
                    <label
                      htmlFor={`suggested-form-state-${state.State_Pref_id}`}
                      className='pl-1'
                    >
                      {state.State_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>


            {/* Profession */}
            <div className="w-full">
              <label className='text-black font-semibold text-[18px] cursor-pointer' onClick={handleSelectAllProfessions}>Profession</label>
              <div className="flex justify-between items-center max-md:flex-col max-md:gap-3 max-md:items-start">
                {profession?.map((profession: ProfessionPref) => (
                  <div key={profession.Profes_Pref_id}>
                    <input
                      type="checkbox"
                      id={`professionSuggested-${profession.Profes_Pref_id}`}
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
                      htmlFor={`professionSuggested-${profession.Profes_Pref_id}`}
                      className="pl-1"
                    >
                      {profession.Profes_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <label className="text-[18px] text-black font-semibold mb-2 cursor-pointer" onClick={handleSelectAllEducation}>
                Education
              </label>

              <div className="flex flex-wrap gap-4">
                {eduPref.map((option) => (
                  <div key={option.Edu_Pref_id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`educationSuggested-${option.Edu_Pref_id}`}
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
                      htmlFor={`educationSuggested-${option.Edu_Pref_id}`}
                      className="pl-1"
                    >
                      {option.Edu_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full py-1">
              <h5
                onClick={handleSelectAllFieldsOfStudy}
                className="cursor-pointer text-[18px] text-black font-semibold mb-2">
                Field of Study
              </h5>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {fieldOfStudyOptions.map((option) => (
                  <div key={option.study_id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`suggested-study-${option.study_id}`}
                      value={option.study_id.toString()}
                      checked={selectedFieldsOfStudy.includes(
                        option.study_id.toString()
                      )}
                      onChange={(e) =>
                        handleFieldOfStudyChange(
                          option.study_id.toString(),
                          e.target.checked
                        )
                      }
                      className="mr-2"
                    />
                    <label
                      htmlFor={`suggested-study-${option.study_id}`}
                      className='text-[#000000e6] font-medium'
                    >
                      {option.study_description}
                    </label>
                  </div>
                ))}
              </div>
            </div>


            <div className="w-full py-1">
              <h5 className="text-[18px] text-black font-semibold mb-2">
                Degree
              </h5>
              <div className="relative">
                <Select
                  isMulti
                  options={degrees.map((degree) => ({
                    value: degree.degeree_id.toString(),
                    label: degree.degeree_description,
                  }))}
                  value={getSelectedOptions()}
                  onChange={handleDegreeChange}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Select Degrees"
                />
              </div>
            </div>


            {/* Marital Status */}
            <div>
              <label className="text-[18px] text-black font-semibold mb-2 cursor-pointer" onClick={handleSelectAllMaritalStatus}>
                Marital Status
              </label>

              <div className="flex justify-between items-center max-md:flex-col max-md:gap-3 max-md:items-start " >
                {MaritalStatuses?.map((status: any) => (
                  <div key={status.marital_sts_id}>
                    <input
                      type="checkbox"
                      className='mr-2'
                      id={`maritalStatusSuggested-${status.marital_sts_id}`}
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
                    <label htmlFor={`maritalStatusSuggested-${status.marital_sts_id}`}>
                      {status.marital_sts_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Income */}
            <div>
              <label className="text-[18px] text-black font-semibold mb-2">
                Annual Income
              </label>

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
                      value={selectedAnnualIncomesmax}
                      onChange={(e) => handleAnnualIncomeChangemax(e.target.value)}
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
                          unique={"suggested"}
                        />
                        //                         <MatchingStars
                        //                          key={index}
                        //   unique="suggested"
                        //   initialPoruthas={`No of porutham ${matchCountValue}`}
                        //   starAndRasi={starAndRasi}
                        //   selectedStarIds={suggestedSelectedStarIds}
                        //   onCheckboxChange={setSuggestedSelectedStarIds}
                        // />
                      );
                    })
                ) : (
                  <p>No match stars available</p>
                )}
              </div>
            </div>
            {errors.SuggestedProfileForm?.pref_porutham_star_rasi?.message && (
              <p className="text-red-600">
                {errors.SuggestedProfileForm.pref_porutham_star_rasi.message}
              </p>
            )}
          </div>
        )}
      </div>
      {/* {errors?.SuggestedProfileForm?.pref_porutham_star_rasi && (
                  <p className="text-red-600">
                    {errors.SuggestedProfileForm.pref_porutham_star_rasi}
                  </p>
                )} */}


    </div>
  );
};

export default SuggestedProfileForm;


