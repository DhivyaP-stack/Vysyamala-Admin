import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';
import FamilyDetails from './EditFormComponents/familyDetails';
import { EditScheema, FamilyDetailsValues, } from '../../EditSceema';
import { fetchEditProfileDetails } from '../../action';
import { useQuery } from '@tanstack/react-query';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { notify, notifyDelete } from '../TostNotification';
import { editProfileApi } from '../../services/api';
import EducationalDetails from './EditFormComponents/EducationalDetails';
import EditHororScopeDetails from './EditFormComponents/EditHororScope';
import { EditScheema2, HoroScopeDetails } from '../../types/EditSchemaHoro';
import { EditScheemaPartnerPreference, PartnerPreference } from '../../types/EditScemaPartnerPref';
import EditPartnerPreference, { AnnualIncome, EduPref, ProfessionPref } from './EditFormComponents/EditPartnerPreference';
import { EditScheemaEducationDetails, EducationDetails } from '../../types/EditShemaEducationDetails';
import BasicDetails from './EditFormComponents/basicDetails';
import { BasicDetailss, EditScheemaBasicDetails } from '../../types/EditSchemaBasicDetails';
import EditSuggestedProfile from './EditFormComponents/EditSuggestedProfile';
import ProfileView from './EditFormComponents/ProfileView';
import { EditSchemaProfileView, profileView } from '../../types/EditProfilrSchema';
import EditViewProfile from './EditFormComponents/EditProfile';
import ProfileForm from './EditFormComponents/adminForm';
import { EditScheemaSuggestedProfile, suggestedProfile } from '../../types/EditSchemaSuggestedProfile';
import { EditProfileVisibility } from './EditFormComponents/EditProfileVisibility';
import { ProfileVisibilityResponse, profileVisibilitySchema } from '../../types/EditProfileVisibiltySchema';

const EditProfile = () => {
  const familyMethods = useForm<FamilyDetailsValues>({
    resolver: zodResolver(EditScheema),
    defaultValues: {
      FamilyDetails: {
        FamilyName: '',
        physicallyChalanged: 'no',
        challengedDetail: '',
        PropertyWorth: '',
        SuyaGothram: '',
        EyeWear: '',
        marriedSisters: '0',
        marriedBrother: '0',
        UncleGothram: '',
        AncestorOrigin: '',
        AboutMyFamily: '',
        PropertyDetails: '',
        no_of_children:0,
          father_alive: 'yes', 
    mother_alive: 'yes',
        // Removed duplicate UncleGothram since it was already defined above
      },
    }
  });

  const HororScopeDetailsMethods = useForm<HoroScopeDetails>({
    resolver: zodResolver(EditScheema2),
    defaultValues: {
      HororScopeDetails: {
        dasaName: '',
        DasaBalanceDay: '',
        DasaBalanceMonth: '',
        DasaBalanceYear: '',
        horoscopeHints: '',
      },
    }
  });

  const PartnerPreferenceMethods = useForm<PartnerPreference>({
    resolver: zodResolver(EditScheemaPartnerPreference),
    defaultValues: {
      PartnerPreference: {
        annualIncome: '',
         pref_family_status: "" ,
 pref_state: '',
 
      },
    }
  });
  const suggestedProfileMethods = useForm<suggestedProfile>({
    resolver: zodResolver(EditScheemaSuggestedProfile),
    defaultValues: {
      suggested_pref_details: {
        pref_anual_income: '',
 pref_family_status: '', // or your backend value
      pref_state: '' // or your backend value
      },
    }
  });

  const ProfileVisibilityMethods = useForm<ProfileVisibilityResponse>({
  resolver: zodResolver(profileVisibilitySchema),
  defaultValues: {
    profile_visibility: {
    
      visibility_age_from: "",
      visibility_age_to: "",
      visibility_height_from: "",
      visibility_height_to: "",
      visibility_profession: "",
      visibility_education: "",
      visibility_anual_income: "",
      visibility_family_status: null,
      visibility_chevvai: "No",
      visibility_ragukethu: "No",
      visibility_foreign_interest: "No",
      status: "1",
    }
  }
});


  const BasicDetailsMethods = useForm<BasicDetailss>({
    resolver: zodResolver(EditScheemaBasicDetails),
    defaultValues: {
      BasicDetail: {
      },
    }
  });

  const ProfileViwewMethod = useForm<profileView>({
    resolver: zodResolver(EditSchemaProfileView),
    defaultValues: {
      profileView: {
        status: undefined ,
        primary_status: undefined,
        secondary_status: undefined,
        mobile_otp_verify: null ,
        membership_fromdate:null,
        membership_todate:null,
        visit_count:null
      }
    }
  })

  const EducationDetailsMethod = useForm<EducationDetails>({
    resolver: zodResolver(EditScheemaEducationDetails),
    defaultValues: {
      EducationDetails: {
        degree: '',
        workplace: '',
        // statetemp: '',
        work_state: '',
        work_district: '',
        work_city: '',
      },
    }
  })
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const profileId = queryParams.get('profileId');
  const navigate = useNavigate();
  const [isFamilyDetailsOpen, setIsFamilyDetailsOpen] = useState(true);
  const FamilySetailsRef = useRef<HTMLDivElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const EducationalFormRef = useRef<HTMLDivElement | null>(null);
  const [isEducationDetailsOpen, setIsEducationDetailsOpen] = useState(true);
  const HoroscopeRef = useRef<HTMLDivElement | null>(null);
  const partnerSettingspeRef = useRef<HTMLDivElement | null>(null);
  const SuggestedSettingspeRef = useRef<HTMLDivElement | null>(null);
  const AddFormRef = useRef<HTMLDivElement | null>(null);
  const ProfileViewRef = useRef<HTMLDivElement | null>(null)
  const AddProfileViewRef = useRef<HTMLDivElement | null>(null);
  const [prefporuthamstar, setPoruthamstar] = useState<string>('');
  const [preforuthamStarRasi, setPreforuthamStarRasi] = useState<string>('');
  const [prefporutham, setPorutham] = useState<string>('');
  const [preforuthamStar, setPreforuthamStar] = useState<string>('');
  const [rasiKattam, setRasiKattam] = useState<string>('');
  const [amsaKattam, setAmsaKattam] = useState<string>('');
  const [isHoroscopeDetailsOpen, setIsHoroscopeDetailsOpen] = useState(true);
  const [birthStarId, setBirthStarId] = useState<string>('');
  const [error, setError] = useState<any>([]);
  const [isPartnerPreferenceOpen, setIsPartnerPreferenceOpen] = useState(true);
  const [AnnualIncomesValmax, setAnnualIncomesValMax] = useState<string[]>([]);
  const [AnnualIncomesVal, setAnnualIncomesVal] = useState('');
  const [familyStatus,setFamilyStatus]=useState<string>('')
  const [familyStatusSuggested,setFamilyStatusSuggested]=useState<string>('')
  const [familyStatusVisibility,setFamilyStatusVisibility]=useState<string>('')

  const [prefferedStateSuggested,setPrefferedStateSuggested]=useState<string>('')
  const [prefferedStatePartner,setPrefferedStatePartner]=useState<string>('')
  const [prefEducation, setprefEducation] = useState('');
  const [setMariedStatus, selectSetMaridStatus] = useState('');
  const [gender, setGender] = useState<string>('');
  const [prefProf, setPrefProf] = useState('');
  const [alretSettings, setAlretSetting] = useState('');
  const [isBasicDetailsOpen, setIsBasicDetailsOpen] = useState(true);
  const [addOnPackageDetails, setAddonPackageDetails] = useState<number[]>([]);
  const [isSuggestedProfileOpen, setIsSuggestedProfileOpen] = useState(true);
  const [isViewDetais, setViewDetail] = useState(true);
  const [isProfileVisibility,setIsProfileVisibility]=useState(true)
  const [professionVisibility,setProfessionVisibility]=useState<ProfessionPref[]>([]);
  const [educationVisibility,setEducationVisibility]=useState<EduPref[]>([])
  const [annualIncomeVisibility,setAnnualIncomeVisibility]=useState<AnnualIncome[]>([])
  const [getMaritalStatus,setGetMaritalStatus]=useState<string>('')
  const [childrenn,setChildrenn]=useState< boolean>(false)
  const handleProfileUpdate = async (editData: any, Name: string) => {
    try {
      setIsSubmitting(true);
      const response = await axios.put(`${editProfileApi}/${profileId}/`, editData);
      console.log(response)
      if (response.status === 200 || response.status === 201) {
        notify(`${Name} Profile updated successfully`);
        // setTimeout(() => {
        //   navigate(-1);
        // }, 2000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        notifyDelete(`Error: ${JSON.stringify(error.response?.data)}`);
      } else {
        console.error('Unknown error:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleFamilyDetailsSubmit = async (data: FamilyDetailsValues) => {
  //   if (isSubmitting) return;
  //   console.log("data family details ==>", data);

  //   // Helper function to handle empty strings and convert to null
  //   const toNullIfEmpty = (value: string | null | undefined) => {
  //     if (value === undefined || value === null || value.trim() === '') {
  //       return null;
  //     }
  //     return value;
  //   };

  //   // Transform eye_wear from "Yes"/"No" to "1"/"0" for API
  //   const eyeWearValue = data.FamilyDetails.EyeWear === "Yes" ? "1" : 
  //                       data.FamilyDetails.EyeWear === "No" ? "0" : null;

  //   const editDataFamilyDetails = {
  //     family_details: {
  //       father_name: toNullIfEmpty(data.FamilyDetails.fathername),
  //       father_occupation: toNullIfEmpty(data.FamilyDetails.fatherOccupation),
  //       mother_name: toNullIfEmpty(data.FamilyDetails.motherName),
  //       mother_occupation: toNullIfEmpty(data.FamilyDetails.motherOccupation),
  //       about_self: toNullIfEmpty(data.FamilyDetails.AboutMyself),
  //       weight: toNullIfEmpty(data.FamilyDetails.weight),
  //       eye_wear: eyeWearValue,
  //       family_name: toNullIfEmpty(data.FamilyDetails.FamilyName),
  //       hobbies: toNullIfEmpty(data.FamilyDetails.MyHobbies),
  //       blood_group: toNullIfEmpty(data.FamilyDetails.bloodGroup),
  //       Pysically_changed: toNullIfEmpty(data.FamilyDetails.physicallyChalanged),
  //       no_of_brother: toNullIfEmpty(data.FamilyDetails.selectedBrother),
  //       no_of_sister: toNullIfEmpty(data.FamilyDetails.selectedSister),
  //       no_of_bro_married: toNullIfEmpty(data.FamilyDetails.marriedBrother),
  //       no_of_sis_married: toNullIfEmpty(data.FamilyDetails.marriedSisters),
  //       family_type: toNullIfEmpty(data.FamilyDetails.FamilyType),
  //       family_value: toNullIfEmpty(data.FamilyDetails.FamilyValue),
  //       family_status: toNullIfEmpty(data.FamilyDetails.FamilyStatus),
  //       property_details: toNullIfEmpty(data.FamilyDetails.PropertyDetails),
  //       property_worth: toNullIfEmpty(data.FamilyDetails.PropertyWorth),
  //       suya_gothram: toNullIfEmpty(data.FamilyDetails.SuyaGothram),
  //       uncle_gothram: toNullIfEmpty(data.FamilyDetails.UncleGothram),
  //       ancestor_origin: toNullIfEmpty(data.FamilyDetails.AncestorOrigin),
  //       about_family: toNullIfEmpty(data.FamilyDetails.AboutMyFamily),
  //     }
  //   };

  //   const Name = "FamilyDetails";
  //   try {
  //     await addProfile(editDataFamilyDetails, Name);
  //   } catch (error) {
  //     console.error("Failed to update family details:", error);
  //     notifyDelete("Failed to update family details. Please try again.");
  //   }
  // };



  const handleFamilyDetailsSubmit = async (data: FamilyDetailsValues) => {
  if (isSubmitting) return;

  const editDataFamilyDetails = {
    family_details: {
      father_name: data.FamilyDetails.fathername,
      father_occupation: data.FamilyDetails.fatherOccupation,
      mother_name: data.FamilyDetails.motherName,
      mother_occupation: data.FamilyDetails.motherOccupation,
      about_self: data.FamilyDetails.AboutMyself,
      weight: data.FamilyDetails.weight, // Map directly from form data
      eye_wear: data.FamilyDetails.EyeWear === "Yes" ? "1" : "0",
      family_name: data.FamilyDetails.FamilyName,
      hobbies: data.FamilyDetails.MyHobbies,
      blood_group: data.FamilyDetails.bloodGroup,
      Pysically_changed: data.FamilyDetails.physicallyChalanged,
      no_of_brother: data.FamilyDetails.selectedBrother,
      no_of_sister: data.FamilyDetails.selectedSister,
      no_of_bro_married: data.FamilyDetails.marriedBrother,
      no_of_sis_married: data.FamilyDetails.marriedSisters,
      family_type: data.FamilyDetails.FamilyType,
      family_value: data.FamilyDetails.FamilyValue,
      family_status: data.FamilyDetails.FamilyStatus,
      property_details: data.FamilyDetails.PropertyDetails,
      property_worth: data.FamilyDetails.PropertyWorth,
      suya_gothram: data.FamilyDetails.SuyaGothram,
      uncle_gothram: data.FamilyDetails.UncleGothram,
      ancestor_origin: data.FamilyDetails.AncestorOrigin,
      about_family: data.FamilyDetails.AboutMyFamily,
     // no_of_children:data.FamilyDetails.no_of_children ?? '',
      no_of_children: childrenn ? data.FamilyDetails.no_of_children : null,
      suya_gothram_admin:data.FamilyDetails.suya_gothram_admin ?? '',
      uncle_gothram_admin:data.FamilyDetails.uncle_gothram_admin ?? '',
        mother_alive:data.FamilyDetails.mother_alive ?? '',
      father_alive:data.FamilyDetails.father_alive ?? ''
    }
  };

  const Name = "FamilyDetails";
  await handleProfileUpdate(editDataFamilyDetails, Name);
};

  const handleBasicDetailsSubmit = async (data: BasicDetailss) => {
    if (isSubmitting) return;
    console.log("data family details ==>", data);
    console.log('Loggggggggggggggggggggggggggggggg', data.BasicDetail.Email)
    console.log('Loggggggggggggggggggggggggggggggg', data.BasicDetail.Gender)

    const editDataBasicDetails = {
      login_details: {
        Mobile_no: data.BasicDetail.Mobile_no || null,
        EmailId: data.BasicDetail.Email,
        Profile_alternate_mobile: data.BasicDetail.Alt_Mobile_Number,
        Profile_whatsapp: data.BasicDetail.WhatsAppNumber,
        Profile_district: data.BasicDetail.district,
        Profile_name: data.BasicDetail.Name,
        Profile_marital_status: data.BasicDetail.marital_status,
        Profile_dob: data.BasicDetail.dob,
        Profile_complexion: data.BasicDetail.complexion,
        Profile_address: data.BasicDetail.address,
        Profile_country: data.BasicDetail.country,
        Profile_state: data.BasicDetail.state,
        Profile_city: data.BasicDetail.City,
        Gender: data.BasicDetail.Gender,
        Profile_pincode: data.BasicDetail.pincode,
        status: data.BasicDetail.status,
        Notifcation_enabled: alretSettings,
        Profile_height:data.BasicDetail.Profile_height
        // Addon_package: addOnPackageDetails.join(','),
      },
    };

    const Name = "BasicDetails"
    await addProfile(editDataBasicDetails, Name);
  };


//   const handleVisibilitySubmit = async (data:  ProfileVisibilityResponse ) => {
//   if (isSubmitting) return;

//   console.log("Submitted visibility data:", data);

//   const payload = {
//     profile_visibility: {
//       profile_id: data.profile_visibility.profile_id,
//       visibility_age_from: data.profile_visibility.visibility_age_from,
//       visibility_age_to: data.profile_visibility.visibility_age_to,
//       visibility_height_from: data.profile_visibility.visibility_height_from,
//       visibility_height_to: data.profile_visibility.visibility_height_to,
//       visibility_profession: data.profile_visibility.visibility_profession,
//       visibility_education: data.profile_visibility.visibility_education,
//       visibility_anual_income: data.profile_visibility.visibility_anual_income,
//       visibility_family_status: data.profile_visibility.visibility_family_status,
//       visibility_chevvai: data.profile_visibility.visibility_chevvai,
//       visibility_ragukethu: data.profile_visibility.visibility_ragukethu,
//       visibility_foreign_interest: data.profile_visibility.visibility_foreign_interest,
//       status: data.profile_visibility.status,
//     }
//   };

//   const sectionName = "ProfileVisibility";
//   await addProfile(payload, sectionName);
// };

// const handleVisibilitySubmit = async (data: ProfileVisibilityResponse) => {
//   if (isSubmitting) return;

//    const visibility = data.profile_visibility; // safely get the first item

//   // if (!visibility) {
//   //   console.error("No profile_visibility data to submit.");
//   //   return;
//   // }

//   const payload = {
//     profile_visibility: {
    
//       visibility_age_from: data.profile_visibility?.visibility_age_from,
//       visibility_age_to: data.profile_visibility?.visibility_age_to,
//       visibility_height_from: data.profile_visibility?.visibility_height_from,
//       visibility_height_to: data.profile_visibility?.visibility_height_to,
//       visibility_profession: data.profile_visibility?.visibility_profession,
//       visibility_education: data.profile_visibility?.visibility_education,
//       visibility_anual_income: data.profile_visibility?.visibility_anual_income,
//       visibility_family_status:familyStatusVisibility,
//       visibility_chevvai: data.profile_visibility?.visibility_chevvai,
//       visibility_ragukethu: data.profile_visibility?.visibility_ragukethu,
//       visibility_foreign_interest: data.profile_visibility?.visibility_foreign_interest,
//       status: data.profile_visibility?.status,
//     }
//   };

//   const sectionName = "ProfileVisibility";
//   await handleProfileUpdatee (payload, sectionName);
// };


// const handleVisibilitySubmit = async (data: ProfileVisibilityResponse) => {
//    console.log("Form data before submission:", data);
//   console.log("Current familyStatusVisibility:", familyStatusVisibility);
//   if (isSubmitting) return;

//   const payload = {
//     profile_visibility: {
//       visibility_age_from: data.profile_visibility.visibility_age_from || "",
//       visibility_age_to: data.profile_visibility.visibility_age_to || "",
//       visibility_height_from: data.profile_visibility.visibility_height_from || "",
//       visibility_height_to: data.profile_visibility.visibility_height_to || "",
//       visibility_profession: data.profile_visibility.visibility_profession || "",
//       visibility_education: data.profile_visibility.visibility_education || "",
//       visibility_anual_income: data.profile_visibility.visibility_anual_income || "",
//       visibility_family_status: familyStatusVisibility || null,
//       visibility_chevvai: data.profile_visibility.visibility_chevvai || "No",
//       visibility_ragukethu: data.profile_visibility.visibility_ragukethu || "No",
//       visibility_foreign_interest: data.profile_visibility.visibility_foreign_interest || "No",
//       status: "1" // Assuming you want to keep status as active
//     }
//   };

//   const sectionName = "ProfileVisibility";
//   await handleProfileUpdate(payload, sectionName);
// };


const handleVisibilitySubmit = async (data: ProfileVisibilityResponse) => {
  if (isSubmitting) return;

  const payload = {
    profile_visibility_details: {
      profile_id: profileId, // Make sure profileId is available in your component
      visibility_age_from: data.profile_visibility.visibility_age_from,
      visibility_age_to: data.profile_visibility.visibility_age_to,
      visibility_height_from: data.profile_visibility.visibility_height_from,
      visibility_height_to: data.profile_visibility.visibility_height_to,
      visibility_profession: data.profile_visibility.visibility_profession,
      visibility_education: data.profile_visibility.visibility_education,
      visibility_anual_income: data.profile_visibility.visibility_anual_income,
      visibility_family_status: familyStatusVisibility || null,
      visibility_chevvai: data.profile_visibility.visibility_chevvai || "No",
      visibility_ragukethu: data.profile_visibility.visibility_ragukethu || "No",
      visibility_foreign_interest: data.profile_visibility.visibility_foreign_interest || "No",
      status: "1"
    }
  };

  try {
    setIsSubmitting(true);
    const response = await axios.put(
      `${editProfileApi}/${profileId}/`,
      payload
    );

    if (response.status === 200 || response.status === 201) {
      notify("Profile visibility updated successfully");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      notifyDelete(`Error: ${JSON.stringify(error.response?.data)}`);
    } else {
      console.error('Unknown error:', error);
    }
  } finally {
    setIsSubmitting(false);
  }
};

  // const handlePartnerPreferenceSubmit = async (data: PartnerPreference) => {
  //   if (isSubmitting) return;
  //    const toNullIfEmpty = (value: string | null | undefined) => {
  //     if (value === undefined || value === null || value.trim() === '') {
  //       return null;
  //     }
  //     return value;
  //   };
  //   console.log("data partnerPreference ==>", data);
  //   const editDataPartnerPreference = {
  //     partner_pref_details: {
  //       pref_height_from: data.PartnerPreference.heightFrom,
  //       pref_height_to: data.PartnerPreference.toHeight,
  //       pref_marital_status: setMariedStatus,
  //       pref_education: prefEducation,
  //       pref_anual_income: data.PartnerPreference.annualIncome,
  //       pref_profession: prefProf,
  //       pref_age_differences: data.PartnerPreference.agePreference,
  //       pref_chevvai: data.PartnerPreference.ChevvaiDhosam,
  //       pref_ragukethu: data.PartnerPreference.ragukethu,
  //       pref_foreign_intrest: data.PartnerPreference.foreignInterest,
  //        pref_family_status: toNullIfEmpty(data.PartnerPreference.FamilyStatus),
  //       pref_anual_income_max: data.PartnerPreference.pref_anual_income_max,
  //       pref_porutham_star: prefporuthamstar,
  //       pref_porutham_star_rasi: preforuthamStarRasi,
  //        //pref_family_status: data.PartnerPreference.FamilyStatus || null,
  //     },
  //   };
  //   const Name = "PartnerPreference"
  //   await addProfile(editDataPartnerPreference, Name);
  // };

const handlePartnerPreferenceSubmit = async (data: PartnerPreference) => {
  if (isSubmitting) return;
  
  const toNullIfEmpty = (value: string | null | undefined): string | null => {
    return (value === undefined || value === null || value.trim() === '') ? null : value;
  };

  try {
    console.log("data partnerPreference ==>", data);
    
    const editDataPartnerPreference = {
      partner_pref_details: {
        pref_height_from: data.PartnerPreference.heightFrom,
        pref_height_to: data.PartnerPreference.toHeight,
        pref_marital_status: setMariedStatus,
        pref_education: prefEducation,
        pref_anual_income: data.PartnerPreference.annualIncome,
        pref_profession: prefProf,
        pref_age_differences: data.PartnerPreference.agePreference,
        pref_chevvai: data.PartnerPreference.ChevvaiDhosam,
        pref_ragukethu: data.PartnerPreference.ragukethu,
        pref_foreign_intrest: data.PartnerPreference.foreignInterest,
         pref_family_status: familyStatus,
//         pref_family_status:
//   data.PartnerPreference.pref_family_status &&
//   data.PartnerPreference.pref_family_status !== "null" &&
//   data.PartnerPreference.pref_family_status !== "0"
//     ? data.PartnerPreference.pref_family_status
//     :  data.PartnerPreference.pref_family_status
// ,
        pref_anual_income_max: data.PartnerPreference.pref_anual_income_max,
        pref_porutham_star: prefporuthamstar,
        pref_porutham_star_rasi: preforuthamStarRasi,
        // pref_state:prefferedStatePartner
         pref_state:prefferedStatePartner,
//         pref_family_status:
      },
    };

    const Name = "PartnerPreference";
    await addProfile(editDataPartnerPreference, Name);
    
  } catch (error) {
    console.error("Error submitting partner preference:", error);
    // Handle error (e.g., show error message to user)
  }
};


  const handleSuggestedProfileSubmit = async (data: suggestedProfile) => {
    if (isSubmitting) return;
    console.log("data suggested profiles ==>", data);
    const editDataSuggestedProfiles = {
      suggested_pref_details: {
        pref_height_from: data.suggested_pref_details.pref_height_from,
        pref_height_to: data.suggested_pref_details.pref_height_to,
        pref_marital_status: setMariedStatus,
        pref_education: prefEducation,
        pref_anual_income: data.suggested_pref_details.pref_anual_income,
        pref_profession: prefProf,
        pref_age_differences: data.suggested_pref_details.pref_age_differences,
        pref_anual_income_max: data.suggested_pref_details.pref_anual_income_max,
        pref_chevvai: data.suggested_pref_details.pref_chevvai,
        pref_ragukethu: data.suggested_pref_details.pref_ragukethu,
        pref_foreign_intrest: data.suggested_pref_details.pref_foreign_intrest,
        pref_porutham_star: prefporuthamstar,
        pref_porutham_star_rasi: preforuthamStarRasi,
        pref_family_status:familyStatusSuggested,
        // pref_state:prefferedStateSuggested,
         pref_state:data.suggested_pref_details.pref_state,
      },
    };
    const Name = "suggestedProfile"
    await addProfile(editDataSuggestedProfiles, Name);
  };

  const addProfile = async (editDat: any, Name: string) => {
    try {
      const response = await axios.put(
        `${editProfileApi}/${profileId}/ `,
        editDat,
      );
      console.log("11111", response)
      if (response.status === 201) {
        notify(`${Name} Profile updated successfully`);
        //  reset();
        setAmsaKattam('');
        setRasiKattam('');
        setTimeout(() => {
          navigate(-1); // Navigate to the previous page
        }, 1000); // Adjust delay if needed
      }
      if (response.status === 200) {
        // alert(response.status);
        //  reset();

        setAmsaKattam('');
        setRasiKattam('');

        // setTimeout(() => {
        //   navigate(-1); // Navigate to the previous page
        // }, 1000); // Adjust delay if needed

        console.log(response.data);

        notify(`${Name} Profile updated successfully`);
        // Handle the response as needed, e.g., update state, show success message
      } else {
        console.error('Unexpected response:', response.status);
      }
    } catch (error: unknown) {

      if (axios.isAxiosError(error)) {
        // Axios-specific error handling

        // alert(
        //   `Error creating profile: ${JSON.stringify(error.response?.data)}`,
        // );
        const errorValue = Object.values(error.response?.data);
        notifyDelete(
          `error ${JSON.stringify(errorValue)}`,
        );
        setError(errorValue);
      } else {
        console.error('Unknown error:', error);
        alert(
          'An unknown error occurred. Please check the console for more details.',
        );
      }
    }
  };

  const onSubmit = async (data: HoroScopeDetails) => {
    console.log('Form submitted with data:', data);
    //console.log('FamilyName:', data.FamilyDetails?.FamilyName);
    // console.log('Selected Profiles:', selectedProfiles);

    const dasaDay = data.HororScopeDetails.DasaBalanceDay;
    const dasaMonth = data.HororScopeDetails.DasaBalanceMonth;
    const dasaYear = data.HororScopeDetails.DasaBalanceYear;
    const dasaBalance = `year:${dasaYear},month:${dasaMonth},day:${dasaDay}`;
    const editDataHoroscopeDetails = {
      horoscope_details: {
        time_of_birth: data.HororScopeDetails.timeOfBirth,
        place_of_birth: data.HororScopeDetails.PlaceofBirth,
        birthstar_name: data.HororScopeDetails.BirthStar,
        birth_rasi_name: data.HororScopeDetails.Rasi,
        lagnam_didi: data.HororScopeDetails.lagnam,
        chevvai_dosaham: data.HororScopeDetails.ChevvaiDhosam,
        ragu_dosham: data.HororScopeDetails.SarpaDhosham,
        nalikai: data.HororScopeDetails.nalikai,
        dasa_name: data.HororScopeDetails.dasaName,
        dasa_balance: dasaBalance,
        horoscope_hints: data.HororScopeDetails.horoscopeHints,
        rasi_kattam: rasiKattam ||data.HororScopeDetails.rasiKattam,
        amsa_kattam: amsaKattam || data.HororScopeDetails.amsaKattam,
      },
    }
    const Name = " horoscope details"
    await addProfile(editDataHoroscopeDetails, Name);
  };


  const handleEducationalDetailSubmit = async (data: EducationDetails) => {
    console.log("data family details ==>", data);
    const editDataEducationDetails = {
      education_details: {
        highest_education: data.EducationDetails.heighestEducation,
        degree: data.EducationDetails.degree,
        other_degree: data.EducationDetails.other_degree,
        about_edu: data.EducationDetails.AboutEducation,
        anual_income: data.EducationDetails.AnnualIncome,
        actual_income: data.EducationDetails.ActualIncome,
        profession: data.EducationDetails.profession,
        work_country: data.EducationDetails.work_country,
        work_state: data.EducationDetails.work_state,
        work_place: data.EducationDetails.workplace,
        work_district: data.EducationDetails.work_district,
        work_city: data.EducationDetails.work_city,
        work_pincode: data.EducationDetails.pincode,
        career_plans: data.EducationDetails.CareerPlans,
        field_ofstudy: data.EducationDetails.field_ofstudy,
      },
    };
    const Name = "EducationDetails"
    await handleProfileUpdate(editDataEducationDetails, Name);
  };

  const handleProfileView = async (data: profileView, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault();
    console.log("Form submission triggered!"); // Add this
    console.log("Form data:", data); // Add this
    console.log("Submitting form with data:", data);
    try {
      console.log("Form Data:", data);
      if(data.profileView.mobile_otp_verify === null || ""){
notify("error");
      }else{
 
   
      const editDataProfileView = {
        profile_common_details: {
          Addon_package: data.profileView.Addon_package,
          Notifcation_enabled: data.profileView.Notifcation_enabled,
          status: data.profileView.status,
          DateOfJoin: data.profileView.DateOfJoin,
          ProfileId: data.profileView.ProfileId,
          Gender: data.profileView.Gender,
          Profile_name: data.profileView.Profile_name,
          Mobile_no: data.profileView.Mobile_no,
          calc_chevvai_dhosham: data.profileView.calc_chevvai_dhosham,
          calc_raguketu_dhosham: data.profileView.calc_raguketu_dhosham,
          horoscope_hints: data.profileView.horoscope_hints,
          family_status: data.profileView.family_status,
          Admin_comments: data.profileView.Admin_comments,
          suya_gothram: data.profileView.suya_gothram,
          profile_completion: data.profileView.profile_completion,
          primary_status: data.profileView.primary_status,
          secondary_status: data.profileView.secondary_status,
          plan_status: data.profileView.plan_status,
          profile_image: data.profileView.profile_image,
          mobile_otp_verify: data.profileView.mobile_otp_verify,
          membership_fromdate: data.profileView.membership_fromdate,
          membership_todate: data.profileView.membership_todate,
          visit_count: data.profileView.visit_count === null ||""|| 0 ? 0: data.profileView.visit_count,
          exp_int_count: data.profileView.exp_int_count === null ||""|| 0 ? 0: data.profileView.exp_int_count,
          exp_int_lock:data.profileView.exp_int_lock === null ||data.profileView.exp_int_lock === 0? 0: data.profileView.exp_int_lock
},
      };
      console.log("API Payload:", editDataProfileView);
      const Name = "profileView"
      await handleProfileUpdatee(editDataProfileView, Name);
 
      // notify("Profile updated successfully");
     }
   }catch (error) {
      console.error("Update failed:", error);
      notifyDelete("Failed to update profile");
    }
  };
 

  const handleProfileUpdatee = async (editData: any, Name: string) => {
    try {
      setIsSubmitting(true);
      const response = await axios.put(`${editProfileApi}/${profileId}/`, editData);
      console.log("API Response:", response.data);
      if (response.status === 200 || response.status === 201) {
        notify(`${Name} Profile updated successfully`);
      } else {
        console.error('Unexpected response:', response.status);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.response?.data);
        notifyDelete(`Error: ${JSON.stringify(error.response?.data)}`);
      } else {
        console.error('Unknown error:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const { data: EditData } = useQuery({
    queryKey: [profileId, 'editData'],
    queryFn: () => fetchEditProfileDetails(profileId),
    enabled: !!profileId,
  });


  // const methods = useForm<>({
  //   resolver: zodResolver(),
  //   defaultValues: {

  //   }})

  console.log(EditData)



  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when entering
    setViewDetail(true); // Ensure ProfileView is open by default
  }, []);

  // useEffect(() => {


  //   if (ProfileViewRef.current) {
  //     ProfileViewRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }

  // }, []);




  return (
    <div className=" p-5 mb-10 max-md:p-0">
      <FormProvider {...ProfileViwewMethod}>
        <form onSubmit={ProfileViwewMethod.handleSubmit(handleProfileView)}>
          <div ref={ProfileViewRef}>
            <EditViewProfile
              isViewDetais={isViewDetais}
              setViewDetail={setViewDetail}
              EditData={EditData}
              handleSubmit={ProfileViwewMethod.handleSubmit(handleProfileView)}
              error={error}
            />
          </div>
        </form>
      </FormProvider>
      {/* <ProfileForm profileId={profileId} EditData={EditData} error={undefined} /> */}
      {/* <FormProvider {...ProfileViwewMethod}>
  <form onSubmit={ProfileViwewMethod.handleSubmit(handleProfileView)}>
    <ProfileView 
      isViewDetais={isViewDetais}
      setViewDetail={setViewDetail}
      EditData={EditData} 
      error={error}
    />
  </form>
</FormProvider>
     */}
      <FormProvider {...BasicDetailsMethods}>

        <form onSubmit={BasicDetailsMethods.handleSubmit(handleBasicDetailsSubmit)}>
          {/* <h2>Basic Details</h2> */}
          <div ref={AddFormRef}>
            <div >
              <BasicDetails
                setAlretSetting={setAlretSetting}
                isBasicDetailsOpen={isBasicDetailsOpen}
                setIsBasicDetailsOpen={setIsBasicDetailsOpen}
                error={error}
                setGender={setGender}
                EditData={EditData}
                setGetMaritalStatus={setGetMaritalStatus}
              />
              <div className='flex justify-end mt-10'>

              </div>
            </div>
          </div>
        </form>
      </FormProvider>


      <FormProvider {...familyMethods}>
        <form onSubmit={familyMethods.handleSubmit(handleFamilyDetailsSubmit)}>
          {/* <h2>Family Details</h2> */}
          <div ref={FamilySetailsRef}>
            <div >
              <FamilyDetails
                isFamilyDetailsOpen={isFamilyDetailsOpen}
                setIsFamilyDetailsOpen={setIsFamilyDetailsOpen}
                EditData={EditData}
                getMaritalStatus={getMaritalStatus}
                setChildrenn={setChildrenn}
              />

            </div>
          </div>
        </form>
      </FormProvider>


      <FormProvider {...EducationDetailsMethod}>
        <form onSubmit={EducationDetailsMethod.handleSubmit(handleEducationalDetailSubmit)}>
          {/* <h2>Educational Details</h2> */}
          <div ref={EducationalFormRef}>
            {/* <div className="bg-white p-5 mb-10 rounded shadow-md"> */}
            <div>
              <EducationalDetails
                isEducationDetailsOpen={isEducationDetailsOpen}
                setIsEducationDetailsOpen={setIsEducationDetailsOpen}
                EditData={EditData}
              />


            </div>
          </div>
        </form>
      </FormProvider>


      <FormProvider {...HororScopeDetailsMethods}>
        <form onSubmit={HororScopeDetailsMethods.handleSubmit(onSubmit)}>
          {/* <h2>Horoscope Details</h2> */}
          <div ref={HoroscopeRef}>
            <div >
              <EditHororScopeDetails
                isHoroscopeDetailsOpen={isHoroscopeDetailsOpen}
                setIsHoroscopeDetailsOpen={setIsHoroscopeDetailsOpen}
                setAmsaKattam={setAmsaKattam}
                setRasiKattam={setRasiKattam}
                setBirthStarId={setBirthStarId}
                EditData={EditData}
              />

            </div>
          </div>
        </form>
      </FormProvider>

      <FormProvider {...PartnerPreferenceMethods}>
        <form onSubmit={PartnerPreferenceMethods.handleSubmit(handlePartnerPreferenceSubmit)}>
          {/* <h2>Partner Preference</h2> */}
          <div ref={partnerSettingspeRef}>
            <div >
              <EditPartnerPreference
                setIsPartnerPreferenceOpen={setIsPartnerPreferenceOpen}
                isPartnerPreferenceOpen={isPartnerPreferenceOpen}
                EditData={EditData}
                setPreforuthamStarRasi={setPreforuthamStarRasi}
                setPoruthamstar={setPoruthamstar}
                setAnnualIncomesVal={setAnnualIncomesVal}
                setFamilyStatus={setFamilyStatus}
                // setAnnualIncomesValmax={setAnnualIncomesValMax}
                selectSetMaridStatus={selectSetMaridStatus}
                setprefEducation={setprefEducation}
                setPrefProf={setPrefProf}
                gender={gender}
                birthStarId={birthStarId}
                setProfessionVisibility={setProfessionVisibility}
                setEducationVisibility={setEducationVisibility}
                setAnnualIncomeVisibility={setAnnualIncomeVisibility}
                setPrefferedStatePartner={setPrefferedStatePartner}
              />

            </div>
          </div>
        </form>
      </FormProvider>



      <FormProvider {...suggestedProfileMethods}>
        <form onSubmit={suggestedProfileMethods.handleSubmit(handleSuggestedProfileSubmit)}>
          {/* <h2>Suggested Profile</h2> */}
          <div ref={SuggestedSettingspeRef}>
            <div>
              <EditSuggestedProfile
                isSuggestedProfileOpen={isSuggestedProfileOpen}
                setIsSuggestedProfileOpen={setIsSuggestedProfileOpen}
                EditData={EditData}
                setPreforuthamStar={setPreforuthamStarRasi}
                setPorutham={setPoruthamstar}
                setAnnualIncomesVal={setAnnualIncomesVal}
                setAnnualIncomesValmax={setAnnualIncomesValMax}
                selectSetMaridStatus={selectSetMaridStatus}
                setprefEducation={setprefEducation}
                setPrefProf={setPrefProf}
                setFamilyStatusSuggested={setFamilyStatusSuggested}
                // gender={''} birthStarId={''}                        
                gender={gender}
                birthStarId={birthStarId}
                setPrefferedStateSuggested={setPrefferedStateSuggested}
              // setSuggestedProfiles={setSuggestedProfiles}
              />

            
              {/* <div className='flex justify-end mt-10'>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`btn btn-primary ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    'Save Suggested Profile'
                  )}
                </button>
              </div> */}
            </div>
          </div>
        </form>
      </FormProvider>
  {/* <FormProvider {...ProfileVisibilityMethods}>
        <form onSubmit={ProfileVisibilityMethods.handleSubmit(handleVisibilitySubmit)}>
  <EditProfileVisibility
              isProfileVisibility={isProfileVisibility}
              setIsProfileVisibility={setIsProfileVisibility}
              professionVisibility={professionVisibility}
              educationVisibility={educationVisibility}
              annualIncomeVisibility={annualIncomeVisibility}
              EditData={EditData}
              setFamilyStatusVisibility={setFamilyStatusVisibility}
              />
  </form>
      </FormProvider> */}

      <FormProvider {...ProfileVisibilityMethods}>
  <form onSubmit={ProfileVisibilityMethods.handleSubmit(handleVisibilitySubmit)}>
    <EditProfileVisibility
      isProfileVisibility={isProfileVisibility}
      setIsProfileVisibility={setIsProfileVisibility}
      professionVisibility={professionVisibility}
      educationVisibility={educationVisibility}
      annualIncomeVisibility={annualIncomeVisibility}
      EditData={EditData}
      setFamilyStatusVisibility={setFamilyStatusVisibility}
    />
    {/* <div className='flex justify-end mt-6'>
      <button 
        type="submit" 
        className='bg-blue-500 text-white px-15 py-2 rounded'
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : 'Save Profile Visibility'}
      </button>
    </div> */}
  </form>
</FormProvider>
    </div>
  );
};

export default EditProfile;

