import axios from 'axios';
import { MatchingStar } from '../components/new_profile/profile_form_components/Partner_preference';
import { apiAxios } from './apiUrl';
import { SubStatus } from '../components/new_profile/viewProfileComponents/ProfileViwePopup/CallManagementModel';

// User Matching Profiles Page -> Annual Income List
export const userAnnualIncome = async () => {
    try {
        const response = await apiAxios.post('/auth/Get_Annual_Income/', {});
        console.log("Annual Income fetched successfully", response);
        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch Annual Income");
        }
        return response.data; // Adjust based on the actual response structure
    } catch (error: any) {
        console.error("Error fetching Annual Income:", error.message || error);
        throw new Error("Unable to fetch Annual Income. Please try again later.");
    }
};

// User Matching Profiles Page -> Profession List
export const userProfession = async () => {
    try {
        const response = await apiAxios.post('/auth/Get_Profes_Pref/', {});
        console.log("Profession fetched successfully", response);

        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch Profession");
        }

        return response.data; // Adjust based on the actual response structure

    } catch (error: any) {
        console.error("Error fetching Profession:", error.message || error);
        throw new Error("Unable to fetch Profession. Please try again later.");
    }
};

// User Matching Profiles Page -> MaritalStatus List
export const userMaritalStatus = async () => {
    try {
        const response = await apiAxios.post('/auth/Get_Marital_Status/', {});
        console.log("MaritalStatus fetched successfully", response);
        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch MaritalStatus");
        }
        return response.data; // Adjust based on the actual response structure
    } catch (error: any) {
        console.error("Error fetching MaritalStatus:", error.message || error);
        throw new Error("Unable to fetch MaritalStatus. Please try again later.");
    }
};

// User Matching Profiles Page -> Education List
export const userEducation = async () => {
    try {
        const response = await apiAxios.post('/auth/Get_Highest_Education/', {});
        console.log("Education fetched successfully", response);
        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch Education");
        }
        return response.data; // Adjust based on the actual response structure
    } catch (error: any) {
        console.error("Error fetching Education:", error.message || error);
        throw new Error("Unable to fetch Education. Please try again later.");
    }
};

// User Matching Profiles Page -> State List
export const userState = async () => {
    try {
        const response = await apiAxios.post('/auth/Get_State_Pref/')
        console.log("State fetched successfully", response);
        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch State");
        }
        return response.data; // Adjust based on the actual response structure
    } catch (error: any) {
        console.error("Error fetching State:", error.message || error);
        throw new Error("Unable to fetch State. Please try again later.");
    }
};


// // User Matching Profiles Page -> City List
// export const userCity = async (districtID: number) => {
//     try {
//         const response = await apiAxios.post('/auth/Get_City/', {
//             district_id: districtID,
//         });
//         console.log("City fetched successfully", response);

//         // Assuming the API returns an object with a `status` field and a `data` field
//         if (!response.data || response.status !== 200) {
//             throw new Error("Failed to fetch City");
//         }

//         return response.data; // Adjust based on the actual response structure

//     } catch (error: any) {
//         console.error("Error fetching City:", error.message || error);
//         throw new Error("Unable to fetch City. Please try again later.");
//     }
// };

// API call to fetch district preferences
export const userCity = async () => {
    try {
        // Send GET request to the API endpoint
        const response = await apiAxios.post('/auth/Get_district_pref/');
        console.log("City preferences fetched successfully", response);
        // Check if the response is successful
        if (!response.data || response.status !== 200 || response.data.status !== 'success') {
            throw new Error("Failed to fetch city preferences");
        }
        // Return the district data from the API response
        return response.data.data;
    } catch (error: any) {
        console.error("Error fetching city preferences:", error.message || error);
        throw new Error("Unable to fetch city preferences. Please try again later.");
    }
};

// User Matching Profiles Page -> Complexion List
export const userComplexion = async () => {
    try {
        const response = await apiAxios.post('/auth/Get_Complexion/', {});
        console.log("Complexion fetched successfully", response);
        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch Complexion");
        }
        return response.data; // Adjust based on the actual response structure
    } catch (error: any) {
        console.error("Error fetching Complexion:", error.message || error);
        throw new Error("Unable to fetch Complexion. Please try again later.");
    }
};


// User Matching Profiles Page -> FamilyStatus List
export const userFamilyStatus = async () => {
    try {
        const response = await apiAxios.post('/auth/Get_FamilyStatus/', {});
        console.log("FamilyStatus fetched successfully", response);
        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch FamilyStatus");
        }
        return response.data; // Adjust based on the actual response structure
    } catch (error: any) {
        console.error("Error fetching FamilyStatus:", error.message || error);
        throw new Error("Unable to fetch FamilyStatus. Please try again later.");
    }
};


// User Matching Profiles Page -> Membership List
export const userMembership = async () => {
    try {
        const response = await apiAxios.post('/api/get_allplans/', {});
        console.log("Membership fetched successfully", response);
        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch Membership");
        }
        return response.data; // Adjust based on the actual response structure
    } catch (error: any) {
        console.error("Error fetching Membership:", error.message || error);
        throw new Error("Unable to fetch Membership. Please try again later.");
    }
};



// User Matching Profiles Page -> Matching stars List
export const userMatchingStars = async (rasiID: string, starID: string, gender: string) => {
    try {
        const response = await apiAxios.post('/auth/Get_Matchstr_Pref/', {
            birth_rasi_id: rasiID,
            birth_star_id: starID,
            gender: gender,
        });
        console.log("User Matching stars fetched successfully", response);
        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch User Matching stars");
        }
        return response.data; // Adjust based on the actual response structure
    } catch (error: any) {
        console.error("Error fetching User Matching stars:", error.message || error);
        throw new Error("Unable to fetch User Matching stars. Please try again later.");
    }
};


// export const userMatchingStars = async (
//   birth_rasi_id:string,
//   birthStarId: string,
//   gender: string,
// ) => {
//   try {
//     const response = await apiAxios.post('/auth/Get_Matchstr_Pref/', {
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



// User Matching Profiles Page -> Matching Records List
export const userMatchingProfiles = async (profileID: string, pageNumber: number, pageSize: number) => {
    try {
        const response = await apiAxios.post('/api/Get_prof_list_match/', {
            profile_id: profileID, // Replace with the actual category ID
            page_number: pageNumber, // Replace with the actual branch ID
            per_page: pageSize, // Replace with the actual branch ID
        });
        console.log("User Matching records fetched successfully", response);
        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch User Matching records");
        }
        return response.data; // Adjust based on the actual response structure
    } catch (error: any) {
        console.error("Error fetching User Matching records:", error.message || error);
        throw new Error("Unable to fetch User Matching records. Please try again later.");
    }
};



export const userMatchingProfilesFilterListMatch = async (
    ProfileID: string,
    pageNumber: number,
    pageSize: number,
    Complexion: string,
    Education: string,
    HeightFrom: number ,
    HeightTo: number,
    MinAnualIncome: number,
    MaxAnualIncome: number,
    ForeignInterest: string,
    State: number,
    City: number,
    Membership: number,
    HasPhotos: string,
    matching_stars: number,
) => {
    try {
        const response = await apiAxios.post('/api/Get_prof_list_match/', {
            profile_id: ProfileID,
            page_number: pageNumber, // Replace with the actual branch ID
            per_page: pageSize, // Replace with the actual branch ID
            complexion: Complexion,
            education: Education,
            height_from: HeightFrom,
            height_to: HeightTo,
            min_anual_income: MinAnualIncome,
            max_anual_income: MaxAnualIncome,
            foreign_intrest: ForeignInterest,
            state: State,
            city: City,
            membership: Membership,
            has_photos: HasPhotos,
            matching_stars: matching_stars,
        });
        console.log("User Matching records filter fetched successfully", response);
        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch User Matching records filter");
        }
        return response.data; // Adjust based on the actual response structure
    } catch (error: any) {
        console.error("Error fetching User Matching records filter:", error.message || error);
        throw new Error("Unable to fetch User Matching records filter. Please try again later.");
    }
};


// User Matching Profiles Page -> Matching Records filter List
export const userMatchingProfilesFilter = async (
    ProfileID: string | null,
    pageNumber: number,
    pageSize: number,
    Complexion: string |null,
    Education: string,
    HeightFrom: number,
    HeightTo: number,
    MinAnualIncome: number,
    MaxAnualIncome: number,
    ForeignInterest: string,
    State: number,
    City: number,
    Membership: number,
    HasPhotos: string,
    // matching_stars: number,
    selectedBirthStarIds:string,
    ageDifference:number,
    selectedProfessions:string,
    ageFrom:number,
    ageTo:number,
    sarpaDhosam:string,
     chevvaiDhosam:string,
     profileName:string,
    // selectedBirthStarIds
) => {
    try {
        const response = await apiAxios.post('/api/common-search/', {
            search_profile_id: ProfileID,
            page_number: pageNumber, // Replace with the actual branch ID
            per_page: pageSize, // Replace with the actual branch ID
            complexion: Complexion,
            education: Education,
            height_from: HeightFrom,
            height_to: HeightTo,
            min_anual_income: MinAnualIncome,
            max_anual_income: MaxAnualIncome,
            foreign_intrest: ForeignInterest,
            state: State,
            city: City,
            membership: Membership,
            has_photos: HasPhotos,
            matching_stars: selectedBirthStarIds,
            search_age:ageDifference,
            search_profession:selectedProfessions,
            age_from:ageFrom,
            age_to:ageTo,
            ragu_dosham:sarpaDhosam,
            chevvai_dosham:chevvaiDhosam,
            profile_name:profileName
        });
        console.log("User Matching records filter fetched successfully", response);
        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch User Matching records filter");
        }
        return response.data; // Adjust based on the actual response structure
    } catch (error: any) {
        console.error("Error fetching User Matching records filter:", error.message || error);
        throw new Error("Unable to fetch User Matching records filter. Please try again later.");
    }
};

// User Matching Profiles Page -> Matching Records Send Email
export const userMatchingProfilesSendEmail = async (Format: string, ProfileID: string, ToProfileID: string, ProfileOwner: string) => {
    try {
        const formData = new FormData();
        formData.append("format", Format);
        formData.append("profile_id", ProfileID);
        formData.append("to_profile_id", ToProfileID);
        formData.append("profile_owner", ProfileOwner);
        const response = await apiAxios.post('/api/Matching_sendemail/', formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        console.log("Sent Email successfully", response);
        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to send Email");
        }
        return response.data; // Adjust based on the actual response structure
    } catch (error: any) {
        console.error("Error Sending Email", error.message || error);
        throw new Error("Unable to Send Email. Please try again later.");
    }
};

// User Matching Profiles Page -> Matching Records Print Profile
export const userMatchingProfilesPrintProfile = async (Format: string, ProfileID: string, ToProfileID: string, ProfileOwner: string) => {
    try {
        const formData = new FormData();
        formData.append("format", Format);
        formData.append("profile_id", ProfileID);
        formData.append("to_profile_id", ToProfileID);
        formData.append("profile_owner", ProfileOwner);
        const response = await apiAxios.post('/api/matching-print-profiles/', formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                responseType: 'blob', // This is crucial for PDF downloads
            });
        console.log("Matching Profile Printed successfully", response);
        // Assuming the API returns an object with a `status` field and a `data` field
        if (response.status !== 200) {
            throw new Error("Failed to Matching Profile Print");
        }
        return response.data; // Adjust based on the actual response structure
    } catch (error: any) {
        console.error("Error Matching Profile Print", error.message || error);
        throw new Error("Unable to Matching Profile Print. Please try again later.");
    }
};

// User Matching Profiles Page -> Matching Records Print Profile
export const userMatchingProfilesWhatsapp = async (Format: string, ProfileID: string, ToProfileID: string, ActionType: string, ProfileOwner: string) => {
    try {
        const formData = new FormData();
        formData.append("format", Format);
        formData.append("profile_id", ProfileID);
        formData.append("to_profile_id", ToProfileID);
        formData.append("action_type", ActionType);
        formData.append("profile_owner", ProfileOwner);
        const response = await apiAxios.post('/api/Matching_whatsapp/', formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                responseType: 'blob', // This is crucial for PDF downloads
            });
        console.log("Matching Profile Printed successfully", response);
        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to Matching Profile Print");
        }
        return response.data; // Adjust based on the actual response structure
    } catch (error: any) {
        console.error("Error Matching Profile Print", error.message || error);
        throw new Error("Unable to Matching Profile Print. Please try again later.");
    }
};

// CallMAnagement --> Fetch Call Types 
export const fetchCallTypes = async () => {
    try {
        const response = await apiAxios.get('/api/calltypes/');
        if (response.status !== 200 || !Array.isArray(response.data)) {
            throw new Error("Failed to fetch CallTypes");
        }
        // Optional: Clean or process response if needed
        const callTypes = response.data.map((item: any) => ({
            id: item.id,
            name: item.call_type,
            status: item.status
        }));

        return callTypes; // This can now be used in dropdowns, lists, etc.
    } catch (error: any) {
        console.error("Error fetching call types:", error.message || error);
        throw new Error("Unable to fetch call types. Please try again later.");
    }
};
// CallMAnagement --> Fetch Callstatus 
export const fetchCallStatus = async () => {
    try {
        const response = await apiAxios.get('/api/callstatus/');
        if (response.status !== 200 || !Array.isArray(response.data)) {
            throw new Error("Failed to fetch Call Status");
        }
        // Optional: Clean or process response if needed
        const callStatus = response.data.map((item: any) => ({
            id: item.id,
            name: item.call_status,
            status: item.status
        }));

        return callStatus; // This can now be used in dropdowns, lists, etc.
    } catch (error: any) {
        console.error("Error fetching call status:", error.message || error);
        throw new Error("Unable to fetch call status. Please try again later.");
    }
};

// CallMAnagement --> Fetch CallAction 
export const fetchCallAction = async () => {
    try {
        const response = await apiAxios.get('/api/callactions/');
        if (response.status !== 200 || !Array.isArray(response.data)) {
            throw new Error("Failed to fetch Call Action");
        }
        // Optional: Clean or process response if needed
        const callStatus = response.data.map((item: any) => ({
            id: item.id,
            name: item.call_action_name,
            status: item.status
        }));

        return callStatus; // This can now be used in dropdowns, lists, etc.
    } catch (error: any) {
        console.error("Error fetching call actions:", error.message || error);
        throw new Error("Unable to fetch call actions. Please try again later.");
    }
};

// CallManagememntList
export const fetchProfileCallManagement = async (profileId: string) => {
    try {
        const response = await apiAxios.get(`/api/profile-call-management/list/`, {
            params: { profile_id: profileId }
        });
        if (response.status !== 200 || !Array.isArray(response.data)) {
            throw new Error("Failed to fetch Call Managemen");
        }
        return response.data;
    } catch (error: any) {
        console.error("Error fetching profile call management data:", error.message || error);
        throw new Error("Unable to fetch profile call management. Please try again later.");
    }
};

// create CallMAnagement
export const creatCallManagement = async (profileID: string, ProfileStatusID: string, OwnerID: string, comments: string, CallType?: string, CallStatus?: string, CallAction?: string, NextCallDate?:string, FutureAction?:string, NextDateAction?:string, WorkAssign?:string) => {
    try {
        const formData = new FormData();
        formData.append("profile_id", profileID);
        formData.append("profile_status_id", ProfileStatusID);
        formData.append("owner_id", OwnerID);
        formData.append("comments", comments);
        // formData.append("call_type_id", CallType);
        // Only append if provided
        if (CallType) {
            formData.append("call_type_id", CallType);
        }
        if (CallStatus) {
            formData.append("call_status_id", CallStatus);
        }
        if (CallAction) {
            formData.append("callaction_today_id", CallAction);
        }
        if (NextCallDate) {
            formData.append("next_calldate",NextCallDate);
        }
        if (FutureAction) {
            formData.append("future_actiontaken_id",FutureAction);
        }
        if (NextDateAction) {
            formData.append("next_dateaction_point",NextDateAction);
        }
        if (WorkAssign) {
            formData.append("work_asignid",WorkAssign);
        }
        const response = await apiAxios.post('/api/profile-call-management/create/', formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        console.log("call Management created successfully", response);
        if (!response.data || response.status !== 201) {
            throw new Error("Failed to create Call Management");
        }
        return response.data; // Adjust based on the actual response structure
    } catch (error: any) {
        console.error("Error creating CallManagement", error.message || error);
        throw new Error("Unable to create callMangement. Please try again later.");
    }
};

//Admin Details--> create MarriageSettleDetails
export const createMarriageSettleDetails = async (
    profileID: string,
    OwnerID: string,
    MarriageDate:string, 
    GroomBrideFatherName:string ,
    GroomBrideVysysaID:string,
    EngagementDate:string,
    MarriagePhotoDetails:string,
    EngagementPhotoDetails:string,
    AdminMarriageComments:string,
    GroomBrideName:string,
    GroomBrideCity:string,
    SettledThru:string,
    MarriageComments:string,
    MarriageInvitationDetails:string,
    EngagementInvitationDetails:string,
    AdminSettledThru:string
) => {
    try {
        const formData = new FormData();
        formData.append("profile_id", profileID);
        formData.append("owner_id", OwnerID);
        // Only append if provided
        if (MarriageDate) {
            formData.append("marriagedate", MarriageDate);
        }
        if (GroomBrideFatherName) {
            formData.append("groombridefathername", GroomBrideFatherName);
        }
        if (GroomBrideVysysaID) {
            formData.append("groombridevysysaid", GroomBrideVysysaID);
        }
        if (EngagementDate) {
            formData.append("engagementdate",EngagementDate);
        }
        if (MarriagePhotoDetails) {
            formData.append("marriagephotodetails",MarriagePhotoDetails);
        }
        if (EngagementPhotoDetails) {
            formData.append("engagementphotodetails",EngagementPhotoDetails);
        }
        if (AdminMarriageComments) {
            formData.append("adminmarriagecomments",AdminMarriageComments);
        }
        if (GroomBrideName) {
            formData.append("groombridename",GroomBrideName);
        }
        if (GroomBrideCity) {
            formData.append("groombridecity",GroomBrideCity);
        }
        if (SettledThru) {
            formData.append("settledthru",SettledThru);
        }
        if (MarriageComments) {
            formData.append("marriagecomments",MarriageComments);
        }
        if (MarriageInvitationDetails) {
            formData.append("marriageinvitationdetails",MarriageInvitationDetails);
        } 
        if (EngagementInvitationDetails) {
            formData.append("engagementinvitationdetails",EngagementInvitationDetails);
        }
        if (AdminSettledThru) {
            formData.append("adminsettledthru",AdminSettledThru);
        }
        const response = await apiAxios.post('/api/marriage-settle-details/create/', formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        console.log("Marriage Settle Details created successfully", response);
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to create Marriage Settle Details");
        }
        return response.data; // Adjust based on the actual response structure
    } catch (error: any) {
        console.error("Error creating Marriage Settle Details", error.message || error);
        throw new Error("Unable to create Marriage Settle Details. Please try again later.");
    }
};


// AdminDetails --> PaymentDetails
export const updatePaymentDetails = async (
    profileID: string, 
    PaymentType: string, 
    OwnerID: string, 
    Status: string,
    PaymentRefno:string,
    DiscountAmount:string
) => {
    try {
        const formData = new FormData();
        formData.append("profile_id", profileID);
        formData.append("payment_type", PaymentType);
        formData.append("status", Status);
        formData.append("owner_id", OwnerID);
        formData.append("payment_refno",PaymentRefno);
        if (DiscountAmount) {
            formData.append("discount_amont",DiscountAmount);
        }
        const response = await apiAxios.post('/api/payment-transaction/create/', formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        console.log("Payment Details created successfully", response);
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to create Payment Details");
        }
        return response.data; // Adjust based on the actual response structure
    } catch (error: any) {
        console.error("Error creating Payment Details", error.message || error);
        throw new Error("Unable to create Payment Details. Please try again later.");
    }
};

//Admin Details --> Payment details
export const fetchPaymentTransactions = async (profileID: string) => {
    try {
        const response = await apiAxios.get(`/api/payment-transaction/list/`, {
            params: {
                profile_id: profileID
            }
        });
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch payment transactions");
        }
        return response.data.data;
    } catch (error: any) {
        console.error("Error fetching payment transactions:", error.message || error);
        throw new Error("Unable to fetch payment transactions. Please try again later.");
    }
};

//fetchPaymentTransactions
export const fetchMarriageSettleDetails = async (profileID: string) => {
    try {
        const response = await apiAxios.get(`/api/marriage-settle-details/list/`, {
            params: {
                profile_id: profileID
            }
        });
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch Marriage Settle Details");
        }
        return response.data;
    } catch (error: any) {
        console.error("Error fetching  Marriage Settle Detail:", error.message || error);
        throw new Error("Unable to fetch  Marriage Settle Detail. Please try again later.");
    }
};

// fetchPhotoProofDetails
export const fetchPhotoProofDetails = async (profileID: string) => {
    try {
        const response = await apiAxios.get(`/api/get-photo-proof-details/`, {
            params: {
                profile_id: profileID
            }
        });
        if (!response.data || response.status !== 200 || response.data.status !== "success") {
            throw new Error("Failed to fetch Photo Proof Details");
        }
        return response.data.data;
    } catch (error: any) {
        console.error("Error fetching Photo Proof Details:", error.message || error);
        throw new Error("Unable to fetch Photo Proof Details. Please try again later.");
    }
};


export const getPhotoProofDetails = async (
    profileID: string,
    imageID: string,
    isDeleted: string,
    imageApproved: string,
   photoPassword: string
) => {
    try {
        const formData = new FormData();
        formData.append("profile_id", profileID);
        formData.append("image_id", imageID);
        formData.append("is_deleted", isDeleted);
        formData.append("image_approved", imageApproved);
        formData.append("photo_password", photoPassword);

        const response = await apiAxios.post('/api/get-photo-proof-details/', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("Photo Proof Details fetched successfully", response);
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch Photo Proof Details");
        }

        return response.data;
    } catch (error: any) {
        console.error("Error fetching Photo Proof Details", error.message || error);
        throw new Error("Unable to fetch Photo Proof Details. Please try again later.");
    }
};

//get full ProfileDetails
export const getProfileDetails = async (profileID: string) => {
    try {
        const response = await apiAxios.get(
            `/api/profile_details/${profileID}/`
        );
        console.log("Profile Details fetched successfully", response);
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch Profile Details");
        }
        return response.data;
    } catch (error: any) {
        console.error("Error fetching Profile Details", error.message || error);
        throw new Error("Unable to fetch Profile Details. Please try again later.");
    }
};

//CallManagement --> Admin-list
export const fetchAdminUsers = async () => {
  try {
    const response = await apiAxios.get(
      `/api/admin-users/list/`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching admin users", error.message || error);
    throw new Error("Unable to fetch admin users");
  }
};



// export const fetchProfilestatus = async () => {
//   try {
//     const response = await apiAxios.post(
//       `/api/get_sub_status_master/`,{primary_status:1}
//     );
//     console.log("dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",response)
//     return response.data;
//   } catch (error: any) {
//     console.error("Error fetching admin users", error.message || error);
//     throw new Error("Unable to fetch admin users");
//   }
// };

export const fetchProfilestatus = async (): Promise<SubStatus[]> => {
  try {
    const response = await apiAxios.post(
      `/api/get_sub_status_master/`,
      { primary_status: 1 }
    );
    return response.data.data; // assuming `data` inside response is the array
  } catch (error: any) {
    console.error("Error fetching profile status:", error.message || error);
    throw new Error("Unable to fetch profile status");
  }
};
