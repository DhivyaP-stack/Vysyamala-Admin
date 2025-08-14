import { Dispatch, SetStateAction, useEffect, useLayoutEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import {
  annualIncomeApi,
  educationalPrefApi,
  fetchAnnualIncome,
  fetchFamilyStatus,
  fetchMaritalStatuses,
  fetchMatchPreferences,
  getProfession,
  StatePref,
} from '../../../action';
import axios from 'axios';
import MatchingStars from './EditMatchingStar';
import { SelectChangeEvent } from '@mui/material';
import { PartnerPreference } from '../../../types/EditScemaPartnerPref';
import { apiAxios } from '../../../api/apiUrl';


interface pageProps {
  EditData: any;
  gender: string;
  birthStarId: string;
  setPrefProf: Dispatch<SetStateAction<string>>;
  setprefEducation: Dispatch<SetStateAction<string>>;
  selectSetMaridStatus: Dispatch<SetStateAction<string>>;
  setAnnualIncomesVal: Dispatch<SetStateAction<string>>;
  setPoruthamstar: Dispatch<SetStateAction<string>>;
  setPreforuthamStarRasi: Dispatch<SetStateAction<string>>;
  isPartnerPreferenceOpen: boolean;
  setIsPartnerPreferenceOpen: Dispatch<SetStateAction<boolean>>;
  setProfessionVisibility: Dispatch<SetStateAction<ProfessionPref[]>>;
  setEducationVisibility: Dispatch<SetStateAction<EduPref[]>>
  setAnnualIncomeVisibility: Dispatch<SetStateAction<AnnualIncome[]>>
  setFamilyStatus: Dispatch<SetStateAction<string>>
  setPrefferedStatePartner: Dispatch<SetStateAction<string>>

}
export interface ProfessionPref {
  Profes_Pref_id: number;
  Profes_name: string;
}
export interface EduPref {
  Edu_Pref_id: number;
  Edu_name: string;
}

export interface AnnualIncome {
  income_id: number;
  income_description: string;
}
interface HoroscopeDetails {
  birth_rasi_name: string;
  birthstar_name: string
}
interface Gender {
  "Gender": string,
}
export interface SelectedStarIdItem {
  id: string;
  rasi: string;
  star: string;
  label: string;
}

const EditPartnerPreference: React.FC<pageProps> = ({
  setPrefProf,
  EditData,
  setPreforuthamStarRasi,
  setPoruthamstar,
  setAnnualIncomesVal,
  setprefEducation,
  selectSetMaridStatus,
  setProfessionVisibility,
  isPartnerPreferenceOpen,
  setIsPartnerPreferenceOpen,
  setEducationVisibility,
  setAnnualIncomeVisibility,
  setFamilyStatus,
  setPrefferedStatePartner
}) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    clearErrors
  } = useFormContext<PartnerPreference>();


  // const [matchStars, setMatchStars] = useState<MatchingStar[]>([]);
  const [selectedStarIds, setSelectedStarIds] = useState<SelectedStarIdItem[]>(
    [],
  );
  const [edit3, setEdit3] = useState<HoroscopeDetails>()
  const [edit0, setEdit0] = useState<Gender>()
  const AnnualmaxIncome = watch('PartnerPreference.pref_anual_income_max')
  const AnnualminIncome = watch('PartnerPreference.annualIncome')
  const handleCheckboxChange = (updatedIds: SelectedStarIdItem[]) => {
    setSelectedStarIds(updatedIds);
    // Update form value for validation
    setValue('PartnerPreference.matchingStars', updatedIds, { shouldValidate: true });
  };

  const toggleSection6 = () => {
    setIsPartnerPreferenceOpen(!isPartnerPreferenceOpen);
  };

  const [selectedProfessions, setSelectedProfessions] = useState<number[]>([]);
  const { data: profession } = useQuery({
    queryKey: ['profession'],
    queryFn: getProfession,
  });


  useEffect(() => {
    if (EditData && EditData.length > 0) {
      setEdit3(EditData[3]);
      setEdit0(EditData[0])
    }
  }, [EditData]);


  const rasiId: string = edit3?.birth_rasi_name as string;
  const starId: string = edit3?.birthstar_name as string;
  const gender: string = edit0?.Gender as string;


  // const { data: AnnualIncome } = useQuery<AnnualIncome[]>({
  //   queryKey: ['AnnualIncome'],
  //   queryFn: fetchAnnualIncome,
  // });
  const { data: MaritalStatuses } = useQuery({
    queryKey: ['MaritalStatuses'],
    queryFn: fetchMaritalStatuses,
  });
  // const handleAnnualIncomeChange = (id: string, isChecked: boolean) => {
  //   setSelectedAnnualIncomes((prev) =>
  //     isChecked ? [...prev, id] : prev.filter((incId) => incId !== id),
  //   );
  // };

  const { data: matchStars } = useQuery({
    queryKey: ['matchStars'],
    queryFn: () => fetchMatchPreferences(rasiId, starId, gender),
    enabled: !!rasiId && !!gender,
  });


  const [annualIncome, setAnnualIncome] = useState<AnnualIncome[]>([]);
  const [selectedAnnualIncomes, setSelectedAnnualIncomes] = useState<string[]>(
    [],
  );

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
    fetchAnnualIncome();
  }, []);

  const handleSelectAllEducation = () => {
    if (!eduPref || eduPref.length === 0) return;

    const allIds = eduPref.map(e => e.Edu_Pref_id.toString());
    const currentSelectedIds = EditEducation.split(',').filter(Boolean);

    // Check if all are currently selected
    const isAllSelected =
      currentSelectedIds.length === allIds.length &&
      allIds.every(id => currentSelectedIds.includes(id));

    if (isAllSelected) {
      // If all are selected, unselect all
      setEditEducation('');
    } else {
      // Else, select all
      setEditEducation(allIds.join(','));
    }
  };


  const handleSelectAllProfessions = () => {
    if (!profession || profession.length === 0) return;

    const allIds = profession.map((p: any) => p.Profes_Pref_id.toString());
    const currentSelectedIds = EditProfession.split(',').filter(Boolean);

    // Check if all are currently selected
    const isAllSelected =
      currentSelectedIds.length === allIds.length &&
      allIds.every((id: any) => currentSelectedIds.includes(id));

    if (isAllSelected) {
      // If all are selected, unselect all
      setEditProfession('');
    } else {
      // Else, select all
      setEditProfession(allIds.join(','));
    }
  };


  const handleSelectAllEditMaritalStatus = () => {
    if (!MaritalStatuses || MaritalStatuses.length === 0) {
      setEditMartualStatus('');
      selectSetMaridStatus('');
      return;
    }

    const allIds = MaritalStatuses.map((m: any) => m.marital_sts_id.toString()); // array of all IDs
    const currentSelectedIds = editMartualStatus.split(',').filter(Boolean); // current selection as array

    // Check if all are currently selected
    const isAllSelected =
      currentSelectedIds.length === allIds.length &&
      allIds.every(id => currentSelectedIds.includes(id));

    if (isAllSelected) {
      // If all are selected, unselect all
      setEditMartualStatus('');
      selectSetMaridStatus('');
    } else {
      // Else, select all
      const idsString = allIds.join(',');
      setEditMartualStatus(idsString);
      selectSetMaridStatus(idsString);
    }
  };
  // Function to handle the change of checkboxes
  const handleProfessionChange = (id: number) => {
    let currentProfessions = EditProfession ? EditProfession.split(',') : [];

    const professionIndex = currentProfessions.indexOf(`${id}`);

    if (professionIndex === -1) {
      // Add the profession to the list
      currentProfessions.push(`${id}`);
    } else {
      // Remove the profession from the list
      currentProfessions.splice(professionIndex, 1);
    }

    // Filter out any empty values and join them without extra commas
    setEditProfession(currentProfessions.filter(Boolean).join(','));
  };
  const handleMaritalStatusChange = (id: number) => {
    let currentMarriedStatus = editMartualStatus
      ? editMartualStatus.split(',')
      : [];

    const index = currentMarriedStatus.indexOf(`${id}`);

    if (index === -1) {
      // Add the status to the list
      currentMarriedStatus.push(`${id}`);
    } else {
      // Remove the status from the list
      currentMarriedStatus.splice(index, 1);
    }

    // Filter out any empty values and join them without extra commas
    setEditMartualStatus(currentMarriedStatus.filter(Boolean).join(','));
  };
  const handleEducationChange = (id: string) => {
    let currentEducation = EditEducation ? EditEducation.split(',') : [];

    const index = currentEducation.indexOf(id);

    if (index === -1) {
      // Add the education to the list
      currentEducation.push(id);
    } else {
      // Remove the education from the list
      currentEducation.splice(index, 1);
    }

    // Filter out any empty values and join them into a string
    setEditEducation(currentEducation.filter(Boolean).join(','));
  };
  // const handleAnnualIncomeChange = (id: string) => {
  //   let currentAnnualIncome = EditAnnualIncome
  //     ? EditAnnualIncome.split(',')
  //     : [];

  //   const index = currentAnnualIncome.indexOf(id);

  //   if (index === -1) {
  //     // Add the income ID to the list
  //     currentAnnualIncome.push(id);
  //   } else {
  //     // Remove the income ID from the list
  //     currentAnnualIncome.splice(index, 1);
  //   }

  //   // Filter out any empty values and join them into a string
  //   setEditAnnualIncome(currentAnnualIncome.filter(Boolean).join(','));
  // };
  // const handleAnnualIncomeChange = (id: string) => {
  //   let currentAnnualIncome = EditAnnualIncome
  //     ? EditAnnualIncome.split(',')
  //     : [];

  //   const index = currentAnnualIncome.indexOf(id);

  //   if (index === -1) {
  //     // Add the income ID to the list
  //     currentAnnualIncome.push(id);
  //   } else {
  //     // Remove the income ID from the list
  //     currentAnnualIncome.splice(index, 1);
  //   }

  //   // Filter out any empty values and join them into a string
  //   setEditAnnualIncome(currentAnnualIncome.filter(Boolean).join(','));
  // };
  const handleAnnualIncomeChange = (event: SelectChangeEvent<typeof EditAnnualIncome>) => {
    setEditAnnualIncome(event.target.value);
  };
  const [eduPref, setEduPref] = useState<EduPref[]>([]);
  const [selectedEducations, setSelectedEducations] = useState('');
  const [selectedFamilyStatus, setSelectedFamilyStatus] = useState('');
  console.log("mm123", selectedFamilyStatus)
  // const handleEducationChange = (id: string, isChecked: boolean) => {
  //   setSelectedEducations((prev) =>
  //     isChecked ? [...prev, id] : prev.filter((eduId) => eduId !== id),
  //   );
  // };
  // useEffect(() => {
  //   setprefEducation(selectedEducations);
  // }, [selectedEducations]);

  useEffect(() => {
    const fetchEduPref = async () => {
      try {
        const response = await axios.post(`${educationalPrefApi}`);
        const options = Object.values(response.data) as EduPref[];

        setEduPref(options);
      } catch (error) {
        console.error('Error fetching Edu Pref options:', error);
      }
    };
    fetchEduPref();
  }, []);

  const [selectedMaritalStatuses, setSelectedMaritalStatuses] = useState('');
  // const handleMaritalStatusChange = (id: string, isChecked: boolean) => {
  //   setSelectedMaritalStatuses((prev) =>
  //     isChecked ? [...prev, id] : prev.filter((statusId) => statusId !== id),
  //   );
  // };

  // useEffect(() => {
  //   selectSetMaridStatus(selectedMaritalStatuses);
  // }, [selectedMaritalStatuses]);
  const starArray = selectedStarIds.map((item) => item.id);
  const starRasiArray = selectedStarIds.map(
    (item) => `${item.star}-${item.rasi}`
  );

  // Create a comma-separated string for each array

  const StarString = starArray.join(',');
  const combinedString = starRasiArray.join(',');
  console.log(starArray, "starArray")
  console.log(StarString, 'StarString');
  console.log(combinedString, ' combinedString ');

  useEffect(() => {
    setPreforuthamStarRasi(combinedString);
    setPoruthamstar(StarString);
    setProfessionVisibility(profession);
    setFamilyStatus(selectedFamilyStatus)
  }, [StarString, combinedString]);

  const [EditProfession, setEditProfession] = useState('');
  const [editMartualStatus, setEditMartualStatus] = useState('');
  const [EditEducation, setEditEducation] = useState('');
  const [EditAnnualIncome, setEditAnnualIncome] = useState('');
  const [selectedPrefState, setSelectedPrefState] = useState('');

  useEffect(() => {
    if (EditData) {
      setValue('PartnerPreference.heightFrom', EditData[4].pref_height_from);
      setValue('PartnerPreference.toHeight', EditData[4].pref_height_to);
      setValue(
        'PartnerPreference.agePreference',
        EditData[4].pref_age_differences,
      );
      setValue('PartnerPreference.pref_anual_income_max', EditData[4].pref_anual_income_max);
      setValue('PartnerPreference.ChevvaiDhosam', EditData[4].pref_chevvai);
      setValue('PartnerPreference.ragukethu', EditData[4].pref_ragukethu);
      setValue(
        'PartnerPreference.foreignInterest',
        EditData[4].pref_foreign_intrest,
      );
      setValue('PartnerPreference.pref_family_status', EditData[4].pref_family_status || '' || null);
      setValue('PartnerPreference.pref_state', EditData[4].pref_state || '' || null);

      setSelectedFamilyStatus(EditData[4].pref_family_status || '');


      setValue('PartnerPreference.annualIncome', String(EditData[4].pref_anual_income));
      setEditProfession(EditData[4].pref_profession ?? '');
      setEditMartualStatus(EditData[4].pref_marital_status);
      setEditEducation(EditData[4].pref_education);
      //setEditAnnualIncome(EditData[4].pref_family_status );
      // setSelectedProfessions(EditData[4].pref_foreign_intrest)
      // setSelectedEducations(EditData[4].pref_foreign_intrest)
      // setSelectedMaritalStatuses()
      // setSelectedAnnualIncomes()

      // const selectedStarIdsFromApi = EditData[4].pref_porutham_star
      //   .split(',')
      //   .map((id: string) => ({
      //     id: id.trim(),
      //     rasi: '',
      //     star: '',
      //     label: '',
      //   }));

      // setSelectedStarIds(selectedStarIdsFromApi);





      //       const selectedStarIdsFromAp = EditData[4].pref_porutham_star
      //       ? EditData[4].pref_porutham_star.split(',')
      //       : [];

      //       const selectedStarIdsFromApii = EditData[4].pref_porutham_star_rasi
      //       ? EditData[4].pref_porutham_star_rasi.split(','):[];
      // const [rasih,starh]=selectedStarIdsFromApii.split('-');
      //     const selectedStarIdsFromApi = EditData[4].pref_porutham_star_rasi
      //       ? EditData[4].pref_porutham_star_rasi.split(',').map((rasiStar: string, index: number) => {
      //           const [rasi, star] = rasiStar.split('-'); // Split "21-10" into "21" (rasi) and "10" (star)
      //     console.log(rasi,"rasiiiiiiiiiiiiiiiiiiiiiii")
      //     console.log(star,"starrrrrrrrrrrrrrrrrrr")
      //           return {
      //             id: selectedStarIdsFromAp[index]?.trim() ?? "", // Ensure ID is always a string
      //             rasi: rasih.trim()??"", // Get rasi value
      //             star: starh.trim()??"",// Get star value
      //             label: "", // Add actual label value if needed
      //           };
      //         })
      //       : [];

      //     console.log(selectedStarIdsFromApi, "Updated selectedStarIds from API");

      //     setSelectedStarIds(selectedStarIdsFromApi);

      const selectedStarIdsFromAp = EditData[4].pref_porutham_star
        ? EditData[4].pref_porutham_star.split(',')
        : [];

      const selectedStarIdsFromApi = EditData[4].pref_porutham_star_rasi
        ? EditData[4].pref_porutham_star_rasi.split(',').map((rasiStar: string, index: number) => {
          const [star, rasi] = rasiStar.split('-').map((val) => val.trim()); // Ensure no extra spaces

          console.log(rasi, "rasiiiiiiiiiiiiiiiiiiiiiii");
          console.log(star, "starrrrrrrrrrrrrrrrrrr");

          return {
            id: selectedStarIdsFromAp[index]?.trim() ?? "", // Ensure ID is always a string
            star: star ?? "", // Get star value correctly
            rasi: rasi ?? "", // Get rasi value correctly
            label: `${star} - ${rasi}`, // Add actual label if needed
          };
        })
        : [];

      console.log(selectedStarIdsFromApi, "Updated selectedStarIds from API");

      setSelectedStarIds(selectedStarIdsFromApi);




    }
  }, [EditData]);

  useEffect(() => {
    setAnnualIncomesVal(EditAnnualIncome);
    selectSetMaridStatus(editMartualStatus);
    setprefEducation(EditEducation);
    setPrefProf(EditProfession);
    setEducationVisibility(eduPref);
    setAnnualIncomeVisibility(annualIncome)
    setPrefferedStatePartner(selectedPrefState)
  }, [EditProfession, editMartualStatus, EditEducation, EditAnnualIncome, eduPref, annualIncome, selectedPrefState]);



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



  // In the useEffect where you process EditData:
  useEffect(() => {
    if (EditData) {
      // ... other setValue calls ...
      setValue('PartnerPreference.pref_state', EditData[4].pref_state || '' || null);
      setSelectedPrefState(EditData[4].pref_state?.toString() || ''); // Convert to string explicitly
    }
  }, [EditData]);

  return (
    <div>
      <div className="bg-white p-5 mb-10 rounded shadow-md">
        <h4
          className="text-red-600 flex row items-center justify-between text-xl cursor-pointer font-semibold dark:text-white "
          onClick={toggleSection6}
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
            <div className="flex w-full flex-row gap-4">
              <div className="w-full">
                <label className='text-black font-semibold'>
                  Height from <span className='text-red-500 text-xl'>*</span>
                </label>
                <input
                  {...register('PartnerPreference.heightFrom')}
                  className="w-full px-4 py-2 border text-[#000000e6] font-medium border-black rounded"
                />
                {errors?.PartnerPreference?.heightFrom && (
                  <p className="text-red-600">
                    {errors.PartnerPreference.heightFrom.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label className='text-black font-semibold' >
                  Height to <span className='text-red-500 text-xl'>*</span>
                </label>
                <input
                  {...register('PartnerPreference.toHeight')}
                  className="w-full px-4 py-2 border text-[#000000e6] font-medium border-black rounded"
                />
                {errors?.PartnerPreference?.toHeight && (
                  <p className="text-red-600">
                    {errors.PartnerPreference.toHeight.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label className='text-black font-semibold'>
                  Age Difference <span className='text-red-500 text-xl'>*</span>
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
                  className="w-full px-4 py-2 border text-[#000000e6] font-medium border-black rounded"
                />
                {errors?.PartnerPreference?.agePreference && (
                  <p className="text-red-600">
                    {errors.PartnerPreference.agePreference.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex w-full flex-row gap-4">
              <div className="w-full">
                <label className='text-black font-semibold'>
                  Chevvai
                  {/* <span className='text-red-500 text-xl'>*</span> */}
                </label>
                <select
                  {...register('PartnerPreference.ChevvaiDhosam')}
                  className="w-full px-4 py-2 border text-[#000000e6] font-medium border-black rounded"
                >
                  <option value="" className='text-[#000000e6] font-medium'>Select</option>
                  <option value="Yes" className='text-[#000000e6] font-medium'>Yes</option>
                  <option value="No" className='text-[#000000e6] font-medium'>No</option>
                </select>
                {errors?.PartnerPreference?.ChevvaiDhosam && (
                  <p className="text-red-600">
                    {errors.PartnerPreference.ChevvaiDhosam.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label className='text-black font-semibold'>
                  Rahu / Ketu
                </label>
                <select
                  {...register('PartnerPreference.ragukethu')}
                  className="w-full px-4 py-2 border text-[#000000e6] font-medium border-black rounded"
                >
                  <option value="" className='text-[#000000e6] font-medium'>Select</option>
                  <option value="Yes" className='text-[#000000e6] font-medium'>Yes</option>
                  <option value="No" className='text-[#000000e6] font-medium'>No</option>
                </select>
                {errors?.PartnerPreference?.ragukethu && (
                  <p className="text-red-600">
                    {errors.PartnerPreference.ragukethu.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label className='text-black font-semibold'>
                  Foreign Interest
                </label>
                <select
                  {...register('PartnerPreference.foreignInterest')}
                  className="w-full px-4 py-2 border text-[#000000e6] font-medium border-black rounded"
                >
                  <option value="" className='text-[#000000e6] font-medium'>Select</option>
                  <option value="Both" className='text-[#000000e6] font-medium'>Both</option>
                  <option value="Yes" className='text-[#000000e6] font-medium'>Yes</option>
                  <option value="No" className='text-[#000000e6] font-medium'>No</option>
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
                {/* <span className='text-red-500 text-xl'>*</span> */}
              </label>
              <div className="w-full inline-flex rounded max-md:flex-col">
                {FamilyStatus?.map((status) => (
                  <label
                    key={status.family_status_id}
                    className={`w-full px-5 py-3 text-sm font-bold border border-black cursor-pointer ${String(watch('PartnerPreference.pref_family_status')) === String(status.family_status_id)
                      ? 'bg-blue-500 text-white'
                      : ''
                      }`}
                    onClick={() => {
                      setValue('PartnerPreference.pref_family_status', status.family_status_id);
                      clearErrors('PartnerPreference.pref_family_status');
                    }}
                  >
                    <input
                      value={status.family_status_id}
                      {...register('PartnerPreference.pref_family_status')}
                      type="radio"
                      className="w-0"
                      checked={String(watch('PartnerPreference.pref_family_status')) === String(status.family_status_id)}
                      onChange={() => { }} // Empty to suppress warnings
                    />
                    {status.family_status_name}
                  </label>
                ))}
              </div>
              {errors?.PartnerPreference?.pref_family_status && (
                <p className="text-red-600">
                  {errors.PartnerPreference.pref_family_status.message}
                </p>
              )}
            </div>

            <div className="w-full py-1">
              <label className="block text-black font-medium mb-1">
                Preffered State
                {/* <span className='text-red-500 text-xl'>*</span> */}
              </label>
              <div className="w-full inline-flex rounded max-md:flex-col">
                {stateOptions?.map((status) => (
                  <label
                    key={status.State_Pref_id}
                    className={`w-full px-5 py-3 text-sm font-bold border border-black cursor-pointer ${selectedPrefState === status.State_Pref_id.toString()
                      ? 'bg-blue-500 text-white'
                      : ''
                      }`}
                    onClick={() => {
                      setSelectedPrefState(status.State_Pref_id.toString())
                      clearErrors('PartnerPreference.pref_state')
                    }

                    }
                  >
                    <input
                      value={status.State_Pref_id}
                      {...register('PartnerPreference.pref_state')}
                      type="radio"
                      className="w-0"
                      checked={selectedPrefState === status.State_Pref_id.toString()}
                    />
                    {status.State_name}
                  </label>
                ))}
              </div>
              {errors?.PartnerPreference?.pref_state && (
                <p className="text-red-600">
                  {errors.PartnerPreference.pref_state.message}
                </p>
              )}
            </div>


            <div className="w-full">
              <h5 className="text-[18px] text-black  font-semibold mb-2 cursor-pointer"
                onClick={handleSelectAllProfessions}
              >
                Profession
              </h5>
              <div className="flex justify-between items-center">
                {profession?.map((profession: ProfessionPref) => (
                  <div key={profession.Profes_Pref_id}>
                    <input
                      type="checkbox"
                      id={`professionn-${profession.Profes_Pref_id}`}
                      value={profession.Profes_name}
                      // checked={(EditProfession ?? '').split(',').includes(
                      //   `${profession.Profes_Pref_id}`,
                      // )}

                      checked={(EditProfession || '').split(',').includes(
                        `${profession.Profes_Pref_id}`,
                      )}
                      onChange={() =>
                        handleProfessionChange(profession.Profes_Pref_id)
                      }
                    />
                    <label
                      htmlFor={`professionn-${profession.Profes_Pref_id}`}

                      className='pl-1 text-[#000000e6] font-medium'
                    >
                      {profession.Profes_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[18px] text-black font-semibold mb-2 cursor-pointer"
                onClick={handleSelectAllEducation}
              >
                Education
              </label>
              <div className="flex flex-wrap gap-4">
                {eduPref.map((option) => (
                  <div key={option.Edu_Pref_id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`educationn-${option.Edu_Pref_id}`}
                      value={option.Edu_Pref_id.toString()}
                      // checked={EditEducation.split(',').includes(
                      //   option.Edu_Pref_id.toString(),
                      // )}
                      checked={(EditEducation || '').split(',').includes(
                        option.Edu_Pref_id.toString(),
                      )}
                      onChange={() =>
                        handleEducationChange(option.Edu_Pref_id.toString())
                      }
                    />
                    <label
                      htmlFor={`educationn-${option.Edu_Pref_id}`}

                      className='pl-1 text-[#000000e6] font-medium'
                    >
                      {option.Edu_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-[18px] text-black font-semibold mb-2 cursor-pointer"
                onClick={handleSelectAllEditMaritalStatus}
              >
                Marital Status
              </h5>
              <div className="flex justify-between items-center">
                {MaritalStatuses?.map((status: any) => (
                  <div key={status.marital_sts_id}>
                    <input
                      type="checkbox"
                      id={`maritalStatuss-${status.marital_sts_id}`}
                      value={status.marital_sts_id.toString()}
                      // checked={editMartualStatus
                      //   .split(',')
                      //   .includes(status.marital_sts_id.toString())}
                      checked={(editMartualStatus || '')
                        .split(',')
                        .includes(status.marital_sts_id.toString())}
                      onChange={() =>
                        handleMaritalStatusChange(status.marital_sts_id)
                      }
                    />
                    <label htmlFor={`maritalStatuss-${status.marital_sts_id}`} className='pl-1 text-[#000000e6] font-medium'>
                      {status.marital_sts_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="AnnualIncome"
                className="text-[18px] text-black font-semibold mb-2"
              >
                Annual Income
              </label>
              <div className="flex items-center gap-2">
                <div className="w-full">
                  <label className="text-gray-600 font-bold " >Minimum Annual Income</label>
                  <select

                    value={AnnualminIncome}
                    {...register('PartnerPreference.annualIncome')}
                    className="outline-none w-full px-4 py-2 border text-[#000000e6] font-medium border-black rounded"
                  >
                    {/* <option value="" disabled>
                  Select  Minimum Annual Income
                  </option> */}
                    {annualIncome?.map((option: AnnualIncome) => (
                      <option key={option.income_id} value={option.income_id} className='pl-1 text-[#000000e6] font-medium'>
                        {option.income_description}
                      </option>
                    ))}
                  </select>
                  {errors?.PartnerPreference?.annualIncome && (
                    <p className="text-red-600">
                      {errors.PartnerPreference.annualIncome.message}
                    </p>
                  )}
                </div>


                <div className="w-full">
                  <label className="text-gray-600 font-bold">Maximum Annual Income</label>
                  <select
                    id="AnnualIncome"
                    value={AnnualmaxIncome}
                    {...register('PartnerPreference.pref_anual_income_max')}
                    className="outline-none w-full px-4 py-2 border text-[#000000e6] font-medium border-black rounded"
                  >
                    {/* <option value="" disabled>
                  Select  Maximum Annual Income
                  </option> */}
                    {annualIncome?.map((option: any) => (
                      <option key={option.income_id} value={option.income_id} className='pl-1 text-[#000000e6] font-medium'>
                        {option.income_description}
                      </option>
                    ))}
                  </select>
                  {errors?.PartnerPreference?.pref_anual_income_max && (
                    <p className="text-red-600">
                      {errors.PartnerPreference?.pref_anual_income_max.message}
                    </p>
                  )}
                </div>

              </div>
            </div>


            <div>
              <div className="justify-start items-center gap-x-5 text-black">
                {matchStars && matchStars?.length > 0 ? (
                  matchStars
                    .sort((a, b) => b[0].match_count - a[0].match_count)
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
                        <div key={index}>
                          <MatchingStars
                            key={index}
                            initialPoruthas={`No of porutham ${matchCountValue}`}
                            starAndRasi={starAndRasi}
                            selectedStarIds={selectedStarIds}
                            onCheckboxChange={handleCheckboxChange}
                            unique={"partner"}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div>
                    <p>No match stars available</p>
                  </div>
                )}
                {errors?.PartnerPreference?.matchingStars && (
                  <p className="text-red-600 mt-1">
                    {errors.PartnerPreference.matchingStars.message}
                    {/* Please select at least one matching star */}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        <div className='flex justify-end mt-10 '>
          <button
            // onClick={formHandleSubmit}
            type="submit"
            className="bg-blue-500 text-white px-15 py-2 rounded"
          >
            Save partner preference Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPartnerPreference;
