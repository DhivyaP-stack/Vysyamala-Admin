import axios from 'axios';
import {
  Complexion,
  Country,
  State,
  District,
} from './components/new_profile/profile_form_components/AddProfileForm';
import {
  AnnualIncome,
  City,
  Degree,
  GetDegree,
  getFieldOfStudy,
  GetHighestEducation,
  ProfessionPref,
  ugDegrees,
} from './components/new_profile/profile_form_components/EducationalDetails';
import { MatchingStar } from './components/new_profile/profile_form_components/Partner_preference';
import { ProfileType } from './matchingProfile/matchingProfile';
import { string } from 'zod';

//family detail api's
const API_URL = 'https://app.vysyamala.com/auth';
export const API = 'https://app.vysyamala.com/api';

// const API_URL = 'https://gl9hwr3r-8000.inc1.devtunnels.ms/auth';
// const API = 'https://gl9hwr3r-8000.inc1.devtunnels.ms/api';
export interface FamilyType {
  family_id: string;
  family_description: string;
}

export interface FamilyValue {
  family_value_id: string;
  family_value_name: string;
}
export interface SuyaGothram {
  id: number;
  gothram_name: string;
  rishi: string;
  sanketha_namam: string;
  is_deleted: boolean
}

export interface getFamilyStatus {
  id: number;
  status: string;
  is_deleted: boolean;
}
export interface StatusOption {
  status_code: string;
  status_name: string;
}
export interface getEditProfileView {
  status_code: number;
  status_name: string;
}

export interface getPrimaryStatus {

  value: number;
  id: number;
  status_code: number;
  sub_status_name: string
}

export interface getSecondaryStatus {
  id: number;
  plan_name: string;
  plan_price: string
}
export interface FamilyStatus {
  family_status_id: number;
  family_status_name: string;
  family_status_description: string;
}

export interface StatePref {
  State_Pref_id: number;
  State_name: string;
}


export interface MaritalStatusOption {
  marital_sts_id: string;
  marital_sts_name: string;
}
// Function to fetch family types
export interface AddOnPackage {
  package_id: number;
  name: string;
  description: string;
  amount: number;
}
export const fetchPropertyworth = async () => {
  try {
    const response = await axios.post(`${API_URL}/Get_Property_Worth/`);
    const options = Object.values(response.data);
    return options;
  } catch (error) {
    console.error('Error fetching property worth options:', error);
  }
};
export const fetchFamilyTypes = async (): Promise<FamilyType[]> => {
  try {
    const response = await axios.post(`${API_URL}/Get_FamilyType/`);
    const data = response.data;
    console.log(data);
    return Object.values(data) as FamilyType[];
  } catch (error) {
    console.error('Error fetching family types:', error);
    return [];
  }
};


export const fetchSuyaGothram = async (): Promise<SuyaGothram[]> => {
  try {
    const response = await axios.get(`${API}/gothrams/`);
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching suya gothram:', error);
    return [];
  }
}

export const fetchFamilyValues = async (): Promise<FamilyValue[]> => {
  try {
    const response = await axios.post(`${API_URL}/Get_FamilyValue/`);
    const data = response.data;
    console.log(data);
    return Object.values(data) as FamilyValue[];
  } catch (error) {
    console.error('Error fetching family Value:', error);
    return [];
  }
};

export const fetchFamilyStatus = async (): Promise<FamilyStatus[]> => {
  try {
    const response = await axios.post(`${API_URL}/Get_FamilyStatus/`);
    const data = response.data;
    console.log(data);
    return Object.values(data) as FamilyStatus[];
  } catch (error) {
    console.error('Error fetching family Status:', error);
    return [];
  }
};

// export const fetchStatePreferences = async (): Promise<StatePref[]> => {
//   try {
//     const response = await axios.post(`${API_URL}/Get_State_Pref/`);
//     const data = response.data;

//     // Transform object to array
//     return Object.values(data) as StatePref[];
//   } catch (error) {
//     console.error('Error fetching state preferences:', error);
//     return [];
//   }
// };

export const fetchFamilyStatuses = async (): Promise<getFamilyStatus[]> => {
  const response = await axios.get(`${API}/family-statuses/`);
  console.log(response.data)
  return response.data;
};

// export const getEditProfileViewStatus = async ():Promise<getEditProfileView>=>{
//   try{
// const response = await axios.get('https://app.vysyamala.com/api/get_status_master/')
// // const data=response.data
// if(response.data?.status == "success"){
//   const data = response.data.data;
//   console.log(data)
//   return data
// }
//   }catch(error){
// console.error('Errror fetching status:0',error)
// return [];
//   }
// }


export const getEditProfileViewStatus = async (): Promise<getEditProfileView[]> => {
  try {
    const response = await axios.get(`${API}/get_status_master/`);

    // Ensure the response is successful before extracting data
    if (response.data?.status === "success" && Array.isArray(response.data?.data)) {
      return response.data.data as getEditProfileView[];
    }

    console.warn("Unexpected response format:", response.data);
    return [];
  } catch (error) {
    console.error('Error fetching status:', error);
    return [];
  }
};

// export const getProfilePrimaryStatus = async (status:string|number): Promise<getPrimaryStatus[]>=>{
//   console.log("ffff222222222222222222222222222222222222222222222",status)
//   if (!status) {
//     console.error("Primary status is missing or invalid");
//     return [];  // You might also want to return a default value here
//   }

//   try {
//      const response = await axios.post(`https://app.vysyamala.com/api/get_sub_status_master/`,{
//       primary_status: status,
//     })
//     console.log("fffff4444444444444444444444444444",response)
//     console.log(response.data)
//     if(response.data?.status === 'success'&& Array.isArray(response.data?.data)){
//       return response.data.data as getPrimaryStatus[];
//     }
//     console.warn("Unexpected response format:", response.data);
//     return[]
//   } catch (error) {
//     console.error('Error fetching status:', error);
//     return [];
//   }
// }

export const getProfilePrimaryStatus = async (status: string | number): Promise<getPrimaryStatus[]> => {
  console.log("Status received:", status);

  // Explicit check for undefined/null/empty string (but allows 0)
  // if (status === undefined || status === null) {
  //   console.error("Primary status is missing or invalid");
  //   return [];
  // }

  try {
    const ownerID = localStorage.getItem('id') || localStorage.getItem('id');
    const response = await axios.post(
      `https://app.vysyamala.com/api/get_sub_status_master/`,
      {
        primary_status: String(status),
        admin_user_id: ownerID,
      }
    );

    console.log("API response:", response.data);

    if (response.data?.status === 'success' && Array.isArray(response.data?.data)) {
      return response.data.data as getPrimaryStatus[];
    }

    console.warn("Unexpected response format:", response.data);
    return [];
  } catch (error) {
    console.error('Error fetching status:', error);
    return [];
  }
};

export const getProfileSecondaryStatus = async (secondaryStatus: string): Promise<getSecondaryStatus[]> => {
  if (!secondaryStatus) {
    console.error("Primary status is missing or invalid");
    return [];  // You might also want to return a default value here
  }
  try {
    const response = await axios.post(`https://app.vysyamala.com/api/get_plan_bystatus/`, {
      secondary_status: secondaryStatus,
    })
    console.log(response.data)
    if (response.data?.status === 'success' && Array.isArray(response.data?.data)) {
      return response.data.data as getSecondaryStatus[];
    }
    console.warn("Unexpected response format:", response.data);
    return []
  } catch (error) {
    console.error('Error fetching status:', error);
    return [];
  }
}

//profile detail api
export const getStatus = async (): Promise<StatusOption[]> => {
  try {
    const response = await axios.get(
      `https://app.vysyamala.com/api/get_status_master/`,
    );
    const data = Object.values(response.data.data) as StatusOption[];
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error fetching status:', error);
  }
};

export const fetchComplexionStatus = async (): Promise<Complexion[]> => {
  try {
    const response = await axios.post(`${API_URL}/Get_Complexion/`);
    const options = Object.values(response.data) as Complexion[];
    return options;
  } catch (error) {
    return [];
  }
};

export const fetchCountryStatus = async (): Promise<Country[]> => {
  const response = await axios.post(`${API_URL}/Get_Country/`);
  const options = Object.values(response.data) as Country[];
  return options;
};


export const fetchAddOnPackage = async (): Promise<AddOnPackage[]> => {
  const response = await axios.post(`https://app.vysyamala.com/auth/Get_addon_packages/`);
  const option = Object.values(response.data) as AddOnPackage[];
  console.log(option)
  return option
}

export const fetchStateStatus = async (countryId: string | undefined): Promise<State[]> => {
  const response = await axios.post(`${API_URL}/Get_State/`, {
    country_id: countryId,
  });
  const options = Object.values(response.data) as State[];
  console.log(options)
  return options;
};

export const GetDistrict = async (stateId: string | undefined | null): Promise<District[]> => {
  const response = await axios.post(`${API_URL}/Get_District/`, {
    state_id: stateId,
  });
  const options = Object.values(response.data) as District[];
  return options;
};

export const GetCity = async (districtId: string | undefined | null): Promise<City[]> => {
  const response = await axios.post(`${API_URL}/Get_City/`, {
    district_id: districtId,
  });
  const options = Object.values(response.data) as City[];
  return options;
};

export const fetchGetHighestEducation = async (): Promise<
  GetHighestEducation[]
> => {
  const response = await axios.post(`${API_URL}/Get_Highest_Education/`);
  const options = Object.values(response.data) as GetHighestEducation[];
  return options;
};


export const fetchFieldOfStudy = async (): Promise<
  getFieldOfStudy[]
> => {
  const response = await axios.post(`${API_URL}/Get_Field_ofstudy/`);
  const options = Object.values(response.data) as getFieldOfStudy[];
  return options;
};

export const fetchDegree = async (eduLevel: string, fieldOfStudy: string): Promise<GetDegree[]> => {
  const response = await axios.post(`${API_URL}/Get_Degree_list/`, {
    edu_level: eduLevel,
    field_of_study: fieldOfStudy,
  });
  const options = Object.values(response.data) as GetDegree[];
  return options;
}

export const fetchFieldDegree = async (): Promise<GetDegree[]> => {
  const response = await axios.get(`${API_URL}/pref_degree_list/`,);
  const options = Object.values(response.data) as GetDegree[];
  return options;
}

export const fetchUgDegree = async (): Promise<ugDegrees[]> => {
  const response = await axios.get(`${API}/api/ug-degrees/`);
  const options = Object.values(response.data) as ugDegrees[];
  return options;
};

export const fetchAnnualIncome = async (): Promise<AnnualIncome[]> => {
  const response = await axios.get(`${API}/api/annual-incomes/`);
  const options = Object.values(response.data) as AnnualIncome[];
  console.log(options)
  return options;
};

export const fetchProfessionalPrefe = async (): Promise<ProfessionPref[]> => {
  const response = await axios.post(`${API_URL}/Get_Profes_Pref/`);
  const options = Object.values(response.data) as ProfessionPref[];
  return options;
};

//hororScope api"s
export const fetchBirthStar = async () => {
  try {
    const response = await axios.post(`${API_URL}/Get_Birth_Star/`, {
      state_id: ' ',
    });
    const options = Object.values(response.data);
    return options;
  } catch (error: any) {
    throw new error('error');
  }
};

export const fetchRasi = async (birthStarId: string) => {
  try {
    const response = await axios.post(` ${API_URL}/Get_Rasi/`, {
      birth_id: birthStarId,
    });
    const options = Object.values(response.data);
    return options;
  } catch (error: any) {
    throw new error('error');
  }
};

export const fetchLagnam = async () => {
  try {
    const response = await axios.post(` ${API_URL}/Get_Lagnam_Didi/`);
    const options = Object.values(response.data);
    return options;
  } catch (error: any) {
    throw new error('error');
  }
};

export const getDasaName = async () => {
  try {
    const response = await axios.post(` ${API_URL}/Get_Dasa_Name/`);

    // Assuming response.data.value is an array of dasa names
    const dasaValue = Array.isArray(response.data)
      ? response.data
      : Object.values(response.data); // If it's not an array, convert it

    return dasaValue;
  } catch (error: any) {
    throw new error('error');
  }
};

//partner preference api"s
export const annualIncomeApi = `${API_URL}/Get_Annual_Income/`;
export const annualMaxIncomeApi = `${API_URL}/pref_anual_income_max/`;
// export const annualIncomeApi1 = `${API_URL}/Get_Annual_Income/`;
export const educationalPrefApi = `${API_URL}/Get_Edu_Pref/`;
export const fetchMaritalStatuses = async () => {
  try {
    const response = await axios.post(`${API_URL}/Get_Marital_Status/`);
    const options = Object.values(response.data);
    return options;
  } catch (error: any) {
    throw new error('error');
  }
};

export const fetchAnnualIncomes = async () => {
  try {
    const response = await axios.get(` ${API_URL}/annual-incomes/`);
    return response.data;
  } catch (error: any) {
    throw new error('error');
  }
};


//partner settings api"s

export const getAnnualIncome = async () => {
  try {
    const response = await axios.post(` ${API_URL}/Get_Annual_Income/`);

    const options = Object.values(response.data);
    return options;

    return response.data; // Return the response if needed
  } catch (error: any) {
    throw new error('error');
  }
};

export const getProfession = async () => {
  try {
    const response = await axios.post(`${API_URL}/Get_Profes_Pref/`);

    const options = Object.values(response.data);
    return options;

    return response.data; // Return the response if needed
  } catch (error: any) {
    throw new error('error');
  }
};

// export const fetchMatchPreferences = async (
//   birth_rasi_id:string,
//   birthStarId: string,
//   gender: string,
// ) => {
//   try {
//     const response = await axios.post(`${API_URL}/Get_Matchstr_Pref/`, {
//       birth_rasi_id:birth_rasi_id,
//       birth_star_id: birthStarId,
//       gender: gender,
//     });

//     const matchCountArrays: MatchingStar[][] = Object.values(response.data).map(
//       (matchCount: any) => matchCount,
//     );
//     console.log(matchCountArrays)
//     return matchCountArrays;
//   } catch (error) {
//     console.error('Error fetching match preferences:', error);
//     // Handle the error
//   }
// };

interface MatchingStar {
  // Define the properties of a MatchingStar here
  [key: string]: any;
}

export const fetchMatchPreferences = async (
  birth_rasi_id: string,
  birth_star_id: string,
  gender: string,
): Promise<MatchingStar[][] | undefined> => {
  try {
    const response = await axios.post(`${API_URL}/Get_Matchstr_Pref/`, {
      birth_rasi_id,
      birth_star_id: birth_star_id,  // Note: fixed parameter name to match request body
      gender,
    });

    if (!response.data) {
      throw new Error('No data received from server');
    }

    const matchCountArrays: MatchingStar[][] = Object.values(response.data);
    console.log('Match preferences:', matchCountArrays);
    return matchCountArrays;
  } catch (error) {
    console.error('Error fetching match preferences:', error);
    // Consider adding more specific error handling or re-throwing
    // throw error; // if you want calling code to handle it
    return undefined;
  }
};

// export const fetchMatchPreferences = async (): Promise<MatchingStar[][] | undefined> => {
//   try {
//     const response = await axios.post(`${API_URL}/Get_Matchstr_Pref/`, {
//       birth_rasi_id: "8",        // Static value
//       birth_star_id: "18",       // Static value
//       gender: "male",           // Static value
//     });

//     if (!response.data) {
//       throw new Error('No data received from server');
//     }

//     const matchCountArrays: MatchingStar[][] = Object.values(response.data);
//     console.log('Match preferences:', matchCountArrays);
//     return matchCountArrays;
//   } catch (error) {
//     console.error('Error fetching match preferences:', error);
//     return undefined;
//   }
// };

export const getMaritalStatus = async () => {
  try {
    const response = await axios.post(`${API_URL}/Get_Marital_Status/`);
    const options: MaritalStatusOption[] = Object.values(response.data);

    return options;
  } catch (error) {
    console.error('Error fetching marital status options:', error);
  }
};

//edit form
export const fetchEditProfileDetails = async (profile_id: any) => {
  try {
    const response = await axios.get(` ${API}/profile_details/${profile_id}/`);
    const data = Object.values(response.data);
    return data;
  } catch (error) {
    console.error('Error fetching profile details:', error);
  }
};

export const getProfileListMatch = async (id: any): Promise<ProfileType[]> => {
  try {
    const response = await axios.post(`${API}/Get_prof_list_match/`, {
      profile_id: id, // The profile_id should be part of the request body or params
    });
    const data = response.data.profiles as ProfileType[]; // Cast response data as ProfileType[]
    return data;
  } catch (error) {
    console.error('Error fetching profile details:', error);
    throw new Error('Failed to fetch profile details'); // Handle errors appropriately
  }
};
//add on packegs


