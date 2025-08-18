import { Dispatch, SetStateAction, useEffect, useLayoutEffect, useState } from 'react';
import { Button } from '@mui/material';
import {
  ArrowBack,
  CameraAlt,
  Numbers,
  Print,
  Settings,
  WhatsApp,
} from '@mui/icons-material';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { notify, notifyDelete } from '../../TostNotification';
import {
  getEditProfileView,
  getEditProfileViewStatus,
  getPrimaryStatus,
  getProfilePrimaryStatus,
  getProfileSecondaryStatus,
  getSecondaryStatus,
} from '../../../action';
import { useFormContext } from 'react-hook-form';
import { profileView } from '../../../types/EditProfilrSchema';
import ProfileForm from './adminForm';
import { useNavigate } from 'react-router-dom';
import { downloadProfilePdf } from '../../../services/api';
import { CallManagementModel } from '../viewProfileComponents/ProfileViwePopup/CallManagementModel';
import { AdminDetailsPopup } from '../viewProfileComponents/ProfileViwePopup/AdminDetailsPopup';
import { DataHistoryPopup } from '../viewProfileComponents/ProfileViwePopup/DataHistoryPopup';
import VerifyOTPPopup from '../verifyotp/verifyotppopup';
import { apiAxios } from '../../../api/apiUrl';
import { MyProfileShare } from '../WhatsUpShare/MyProfileShare';

interface pageProps {
  handleSubmit: () => void;
  error: any;
  EditData: any;
  isViewDetais: boolean;
  setViewDetail: Dispatch<SetStateAction<boolean>>;
}

export interface AddOnPackage {
  package_id: number;
  name: string;
  description: string;
  amount: number;
}

const EditViewProfile: React.FC<pageProps> = ({
  isViewDetais,
  setViewDetail,
  EditData,
  handleSubmit
}) => {
  const {
    setValue,
    watch,
    register,
    getValues,
    formState: { errors },
  } = useFormContext<profileView>();
  const [addonPackage, setAddonPackage] = useState<AddOnPackage[]>([]);
  const [profileView7, setProfileView7] = useState<any>({});
  const [openCallManagement, setOpenCallManagement] = useState<boolean>(false)
  const [openDataHistory, setOpenDataHistory] = useState<boolean>(false)
  const [OpenAdminDetails, setOpenAdminDetails] = useState<boolean>(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const status = watch('profileView.status') ?? ''; // Ensure it doesn't break

  const primaryStatus = watch('profileView.primary_status') ?? ''; // Prevent undefined errors

  const secondaryStatus = watch('profileView.secondary_status') ?? '';

  const image = watch('profileView.profile_image');


  const navigate = useNavigate();
  const primary = watch('profileView.primary_status');
  const secondaryy = watch('profileView.secondary_status');
  const profileName = watch('profileView.Profile_name');
  const profileId = watch('profileView.ProfileId');
  const Mobile_no = watch('profileView.Mobile_no');
  const suya_gothram = watch('profileView.suya_gothram');
  const profile_completion = watch('profileView.profile_completion');
  const Registration_Date = watch('profileView.DateOfJoin');
  const chevvai = watch('profileView.calc_chevvai_dhosham');
  const raagu = watch('profileView.calc_raguketu_dhosham');
  const Package_name = watch('profileView.Package_name');
  const valid_till = watch('profileView.valid_till'); // Ensure this matches the schema
  const age = watch('profileView.age'); // Ensure this matches the schema
  const gender = watch('profileView.Gender')
  const created_date = watch('profileView.created_date');
  const idle_days = watch('profileView.idle_days');
  const visit_count = watch('profileView.visit_count');
  const exp_int_lock = watch('profileView.exp_int_lock');
  const exp_int_count = watch('profileView.exp_int_count');
  const payment_date = watch('profileView.payment_date');
  const payment_mode = watch('profileView.payment_mode');
  const add_on_pack_name = watch('profileView.add_on_pack_name');
  useEffect(() => {
    if (EditData?.[6]) {
      const data = EditData[6];
      setValue('profileView.status', data.status ?? 0);
      setValue('profileView.primary_status', data.primary_status ?? '');
      setValue('profileView.secondary_status', data.secondary_status ?? '');
      setValue('profileView.plan_status', data.plan_status ?? '');
      setValue('profileView.Profile_name', data.Profile_name ?? '');
      setValue('profileView.ProfileId', data.ProfileId ?? '');
      setValue('profileView.Mobile_no', data.Mobile_no ?? '');
      setValue('profileView.suya_gothram', data.suya_gothram ?? '');
      setValue('profileView.profile_completion', data.profile_completion ?? '');
      setValue('profileView.family_status', data.family_status ?? '');
      setValue('profileView.Gender', data.Gender ?? '');
      setValue(
        'profileView.calc_chevvai_dhosham',
        data.calc_chevvai_dhosham ?? '',
      );
      setValue('profileView.calc_raguketu_dhosham', data.calc_raguketu_dhosham ?? '',);
      setValue('profileView.horoscope_hints', data.horoscope_hints ?? '');
      setValue('profileView.Admin_comments', data.Admin_comments ?? '');
      setValue('profileView.Addon_package', data.Addon_package ?? '');
      const value =
        data.Notifcation_enabled?.trim() === '' || data.Notifcation_enabled == null
          ? ''
          : data.Notifcation_enabled;
      setValue(
        'profileView.Notifcation_enabled',
        value,
      );
      setValue('profileView.profile_image', EditData[6].profile_image);
      setValue('profileView.Package_name', data.Package_name ?? '');
      setValue('profileView.valid_till', data.valid_till ?? '');
      setValue('profileView.age', data.age ?? '');
      setValue('profileView.created_date', data.created_date ?? '');
      setValue('profileView.visit_count', data.visit_count === null || "" || 0 ? 0 : data.visit_count);
      setValue('profileView.exp_int_count', data.exp_int_count === null || "" || 0 ? 0 : data.exp_int_count);
      setValue('profileView.exp_int_lock', data.exp_int_lock === null || data.exp_int_lock === "" || data.exp_int_lock === undefined ? 0 : Number(data.exp_int_lock)
      );

      setValue('profileView.payment_date', data.payment_date ?? '');
      setValue('profileView.payment_mode', data.payment_mode ?? '');
      setValue('profileView.add_on_pack_name', data.add_on_pack_name ?? 0);
      setValue('profileView.mobile_otp_verify', data.mobile_otp_verify ?? '');
      setValue('profileView.membership_fromdate', data.membership_fromdate ?? '');
      setValue('profileView.membership_todate', data.membership_todate ?? '')

      if (data?.DateOfJoin) {
        const formattedDate = new Date(data.DateOfJoin)
          .toISOString()
          .split('T')[0];
        setValue('profileView.DateOfJoin', formattedDate);
      }
    }
  }, [EditData]);

  useLayoutEffect(() => {
    if (EditData && EditData.length > 0) {
      setProfileView7(EditData[7]);
    }
  }, [EditData]);

  const toggleSection1 = () => {
    setViewDetail(!isViewDetais);
    console.log(isViewDetais, 'isViewDetais');
  };

  const { data: Status } = useQuery({
    queryKey: ['Status'],
    queryFn: getEditProfileViewStatus,
  });

  // const { data: Primary } = useQuery({
  //   queryKey: [status ?? '', 'primary'],
  //   queryFn: () => getProfilePrimaryStatus(status ?? ''),
  //   enabled: Boolean(status),
  // });

  // const { data: secondary } = useQuery({
  //   queryKey: [primaryStatus ?? '', 'secondary'],
  //   queryFn: () => getProfileSecondaryStatus(primaryStatus ?? ''),
  //   enabled: Boolean(primaryStatus),
  // });

  //   const { data: Primary } = useQuery({
  //   queryKey: [status ?? '', 'primary'],
  //   queryFn: () => getProfilePrimaryStatus(status ?? ''),
  //   enabled: status !== null && status !== undefined,  // ✅ allow 0
  // });

  const { data: Primary } = useQuery({
    queryKey: ['primaryStatus', status],
    queryFn: () => getProfilePrimaryStatus(status),
    enabled: status !== undefined && status !== null, // Allows 0
  });

  const { data: secondary } = useQuery({
    queryKey: [primaryStatus ?? '', 'secondary'],
    queryFn: () => getProfileSecondaryStatus(primaryStatus ?? ''),
    enabled: primaryStatus !== null && primaryStatus !== undefined, // ✅ allow 0
  });


  const fetchAddOnPackages = async () => {
    try {
      const response = await axios.post(
        'https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/auth/Get_addon_packages/',
      );
      if (response.data.status === 'success') {
        console.log(response.data.data);
        setAddonPackage(response.data.data);
      } else {
        console.log(response.data.message || 'Failed to fetch packages');
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchAddOnPackages();
  }, []);



  const handlePrintProfile = (format: string) => {
    if (profileId) {
      downloadProfilePdf(profileId, format);
    } else {
      console.error('Profile ID is not available or invalid');
      notify('Invalid profile ID. Please check the profile details.', { type: 'error' });
    }
  };

  const sendOtp = async () => {
    try {
      const response = await apiAxios.post(
        '/api/send_mobile_otp/',
        {
          profile_id: profileId // Using the profileId from your form
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.data.status === 1) {
        // Success case
        console.log("OTP sent successfully:", response.data.message);
        setShowOtpPopup(true); // Show the OTP popup after successful send
        // You might want to show a success toast/notification here
      } else {
        console.error("Failed to send OTP:", response.data.message);
        // Show error message to user
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      // Show error message to user
    }
  };

  //   const handleProfileView = async (data: profileView, event?: React.BaseSyntheticEvent) => {
  //     event?.preventDefault();
  //     try {
  //         // Check for empty membership dates
  //         if (!data.profileView.membership_fromdate || data.profileView.membership_fromdate.trim() === '') {
  //             notifyDelete("Membership from date is required");
  //             return;
  //         }
  //         if (!data.profileView.membership_todate || data.profileView.membership_todate.trim() === '') {
  //             notifyDelete("Membership to date is required");
  //             return;
  //         }

  //         // Check for mobile verification
  //         if (data.profileView.mobile_otp_verify === null || 
  //             data.profileView.mobile_otp_verify === undefined || 
  //             data.profileView.mobile_otp_verify.trim() === '') {
  //             notifyDelete("Please select mobile verification status (Yes/No)");
  //             return;
  //         }

  //         const editDataProfileView = {
  //             profile_common_details: {
  //                 Addon_package: data.profileView.Addon_package,
  //                 Notifcation_enabled: data.profileView.Notifcation_enabled,
  //                 status: data.profileView.status,
  //                 DateOfJoin: data.profileView.DateOfJoin,
  //                 ProfileId: data.profileView.ProfileId,
  //                 Gender: data.profileView.Gender,
  //                 Profile_name: data.profileView.Profile_name,
  //                 Mobile_no: data.profileView.Mobile_no,
  //                 calc_chevvai_dhosham: data.profileView.calc_chevvai_dhosham,
  //                 calc_raguketu_dhosham: data.profileView.calc_raguketu_dhosham,
  //                 horoscope_hints: data.profileView.horoscope_hints,
  //                 family_status: data.profileView.family_status,
  //                 Admin_comments: data.profileView.Admin_comments,
  //                 suya_gothram: data.profileView.suya_gothram,
  //                 profile_completion: data.profileView.profile_completion,
  //                 primary_status: data.profileView.primary_status,
  //                 secondary_status: data.profileView.secondary_status,
  //                 plan_status: data.profileView.plan_status,
  //                 profile_image: data.profileView.profile_image,
  //                 mobile_otp_verify: data.profileView.mobile_otp_verify,
  //                 membership_fromdate: data.profileView.membership_fromdate,
  //                 membership_todate: data.profileView.membership_todate,
  //                 visit_count: data.profileView.visit_count === null || "" || 0 ? 0 : data.profileView.visit_count,
  //                 exp_int_count: data.profileView.exp_int_count === null || "" || 0 ? 0 : data.profileView.exp_int_count,
  //                 exp_int_lock: data.profileView.exp_int_lock === null || data.profileView.exp_int_lock === 0 ? 0 : data.profileView.exp_int_lock
  //             },
  //         };

  //         const Name = "profileView";
  //         await handleSubmit();
  //     } catch (error) {
  //         console.error("Update failed:", error);
  //         notifyDelete("Failed to update profile");
  //     }
  // };

  const [isShareVisible, setIsShareVisible] = useState(false);
  const [isPdfOptionsVisible, setIsPdfOptionsVisible] = useState(false);

  const toggleShareVisibility = () => {
    setIsShareVisible((prevState) => !prevState);
    setIsPdfOptionsVisible(false)
  };


  const togglePdfVisibility = () => {
    setIsPdfOptionsVisible((prevState) => !prevState)
    setIsShareVisible(false)
  }

  return (
    <div>
      <div>

        <div className="bg-white p-2 mb-10 rounded shadow-md">
          <h4
            onClick={toggleSection1}
            className="text-red-600 flex items-center justify-between text-xl cursor-pointer font-semibold dark:text-white"
          >
            <span>Profile View</span>{' '}
            {/* Add a title or any text here */}
            <svg
              className={`fill-current transform ${isViewDetais ? 'rotate-180' : ''
                }`}
              width="20"
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
          {isViewDetais && (
            <div >
              <div className="flex  items-center justify-between mt-3">
                {/* Back Text with Icon on Left */}
                <div className="flex items-center gap-2 text-blue-600 cursor-pointer hover:text-blue-800"
                  onClick={() => navigate(-1)}
                >
                  <ArrowBack fontSize="small" />
                  <span>Back</span>
                </div>

                {/* Other Texts with Icons on Right */}
                <div className="flex gap-6 text-gray-700">
                   <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900"   onClick={() => navigate(`/UploadApprovalProfileImg?profileId=${profileId}`)}>  
                    <CameraAlt fontSize="small" />
                    <span>Photo Update</span>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-green-600" onClick={toggleShareVisibility} >
                    <WhatsApp fontSize="small" className=" text-green-700" />
                    <span>WhatsApp</span>

                    {isShareVisible && (
                      // <Share closePopup={toggleShareVisibility} />
                      <MyProfileShare

                        closePopup={toggleShareVisibility}
                        // profileImagess={'https://www.kannikadhanam.com/members/parthasarathyr/'}
                        profileImagess={EditData[6]?.profile_image || ""}
                        //   profileImage={get_myprofile_personal?.profile_id}
                        profileId={profileId}
                        profileName={profileName}
                        age={age}
                        starName={EditData[3]?.star_name}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900"
                    // onClick={handlePrintProfile}
                    onClick={togglePdfVisibility}
                  >
                    <Print fontSize="small" />
                    <span>Print</span>



                    {
                      isPdfOptionsVisible && (
                        <div className='absolute right-20 mt-60 z-10 w-[220px] rounded-md shadow-lg p-2 bg-white max-sm:left-auto max-sm:right-[-200px]'>
                          <div className='flex flex-col items-start pb-1 font-semibold'>
                            <button onClick={() => handlePrintProfile('withoutaddress')}>Format 1</button>
                          </div>
                          <div className='flex flex-col items-start pb-1 font-semibold'>
                            <button onClick={() => handlePrintProfile('withaddress')}>Format 2</button>
                          </div>
                          <div className='flex flex-col items-start pb-1 font-semibold'>
                            <button onClick={() => handlePrintProfile('withoutcontact')}>Format 3</button>
                          </div>
                          <div className='flex flex-col items-start pb-1 font-semibold'>
                            <button onClick={() => handlePrintProfile('withonlystar')}>Format 5</button>
                          </div>
                          <div className='flex flex-col items-start pb-1 font-semibold'>
                            <button onClick={() => handlePrintProfile('withcontactonly')}>Format 7</button>
                          </div>
                          <div className='flex flex-col items-start pb-1 font-semibold'>
                            <button onClick={() => handlePrintProfile('withoutcontactonly')}>Format 8</button>
                          </div>
                        </div>
                      )
                    }
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                    <Settings fontSize="small" />
                    <span>Settings</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-2 mt-1 max-xl:flex-wrap">
                <div>
                  <div className="flex flex-col items-center ml-2 mt-2 border-2 border-red-600  w-[150px] h-[180px] sm:w-[180px] sm:h-[180px] md:w-[160px] md:h-[180px] lg:w-[170px] lg:h-[190px]">
                    {image ? (
                      <img
                        src={image}
                        alt="Profile"
                        className="w-40 h-40 rounded-full border border-gray-300 shadow-md mt-3"
                      />
                    ) : (
                      <p>Loading image...</p>
                    )}
                  </div>
                  <div className=" flex flex-col ml-2 mt-5">
                    <span className="text-vibrantOrange">
                      {Package_name}
                      {/* + Email */}
                    </span>
                    <br />
                    <span className="text-vibrantOrange">
                      valid till:{valid_till}
                    </span>
                  </div>
                </div>

                {/* <div className="flex  mx-auto border-x-lime-100 overflow-auto rounded-xl "> */}
                <div className="flex  flex-wrap ">
                  <div>
                    <div className="flex items-center mt-5 flex-wrap ">
                      <span className="text-green-600">
                        {profileId}-{profileName}
                      </span>
                      <div className="h-4 border-l-2 border-green-800 mx-1"></div>
                      <span className="text-green-600">{age}-{gender}</span>
                      <div className="h-4 border-l-2 border-green-800 mx-1"></div>
                      <span className="text-green-600">{suya_gothram}</span>
                      <div className="h-4 border-l-2 border-green-800 mx-1"></div>
                      <span className="text-green-600">
                        {Package_name}
                        {/* + Email */}
                      </span>
                      <div className="h-4 border-l-2 border-green-800 mx-1"></div>
                      <span className="text-green-600">
                        valid till:{valid_till}
                      </span>
                      <div className="h-4 border-l-2 border-green-800 mx-1"></div>
                      <span className="text-green-600">
                        created date:{created_date}
                      </span>
                      <div className="h-4 border-l-2 border-green-800 mx-1"></div>
                      <span className="text-green-600">
                        idle days:{idle_days}
                      </span>
                    </div>
                    <div className="w-full border-t-2 border-blue-600 mt-2"></div>
                    <div className="w-full border-t-2 border-blue-600 mt-1"></div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-12 lg:grid-cols-10 gap-4 overflow-auto ">
                      <div className="flex flex-col items-center text-center border-l-2 border-orange-500 p-2 cursor-pointer" onClick={() => navigate(`/UserMatchingProfiles?profileId=${profileId}`)}>
                        <span className="text-orange-500 text-lg font-semibold">{profileView7.matchingprofile_count}</span>
                        <span className="text-blue-500">Matching Profile</span>
                      </div>
                      <div className="flex flex-col items-center text-center border-l-2 border-orange-500 cursor-pointer" onClick={() => navigate(`/suggestedProfiles?profileId=${profileId}`)} >
                        <span className="text-orange-500 text-lg font-semibold">{profileView7.suggestedprofile_count}</span>
                        <span className="text-blue-500">Suggested Profile</span>
                      </div>
                      <div className="flex flex-col items-center text-center border-l-2 border-orange-500 p-2 cursor-pointer " onClick={() => navigate(`/ViewedProfilesById?profileId=${profileId}`)} >
                        <span className="text-orange-500 text-lg font-semibold">{profileView7.viewedprofile_count}</span>
                        <span className="text-blue-500">Viewed Profile</span>
                      </div>
                      <div className="flex flex-col items-center text-center border-l-2 border-orange-500 p-2 cursor-pointer" onClick={() => navigate(`/VisitorProfilesById?profileId=${profileId}`)}>
                        <span className="text-orange-500 text-lg font-semibold">{profileView7.visitorprofile_count}</span>
                        <span className="text-blue-500">Visitor Profile</span>
                      </div>
                      <div className="flex flex-col items-center text-center border-l-2 border-orange-500 p-2 cursor-pointer" onClick={(() => navigate(`/CToCSentProfiles?profileId=${profileId}`))} >
                        <span className="text-orange-500 text-lg font-semibold">{profileView7.ctocsend_count}</span>
                        <span className="text-blue-500">C to C Sent</span>
                      </div>
                      <div className="flex flex-col items-center text-center border-l-2 border-orange-500 cursor-pointer" onClick={(() => navigate(`/CToCReceivedProfiles?profileId=${profileId}`))} >
                        <span className="text-orange-500 text-lg font-semibold">{profileView7.ctocreceived_count}</span>
                        <span className="text-blue-500">C to C Received</span>
                      </div>
                      <div className="flex flex-col items-center text-center border-l-2 border-orange-500 p-2 cursor-pointer" onClick={(() => navigate(`/ExpressInterestProfiles?profileId=${profileId}`))} >
                        <span className="text-orange-500 text-lg font-semibold">{profileView7.exp_int_sentcount}</span>
                        <span className="text-blue-500">EI Sent</span>
                      </div>
                      <div className="flex flex-col items-center text-center border-l-2 border-orange-500 cursor-pointer" onClick={() => navigate(`/ExpressInterestReceivedProfiles?profileId=${profileId}`)} >
                        <span className="text-orange-500 text-lg font-semibold">{profileView7.exp_int_reccount}</span>
                        <span className="text-blue-500">EI Received</span>
                      </div>
                      <div className="flex flex-col items-center text-center border-l-2 border-orange-500 p-2 cursor-pointer" onClick={() => navigate(`/ExpressInterestMutualProfiles?profileId=${profileId}`)} >
                        <span className="text-orange-500 text-lg font-semibold">{profileView7.mutual_int_count}</span>
                        <span className="text-blue-500">Mutual Interest</span>
                      </div>
                      <div className="flex flex-col items-center text-center border-l-2 border-orange-500 p-2" >
                        <span className="text-orange-500 text-lg font-semibold">{profileView7.shortlisted_count}</span>
                        <span className="text-blue-500">Shortlisted</span>
                      </div>
                      <div className="flex flex-col items-center text-center border-l-2 border-orange-500 p-2 cursor-pointer" onClick={() => navigate(`/ProfileSentTo?profileId=${profileId}`)}>
                        <span className="text-orange-500 text-lg font-semibold">{profileView7.prsent_count}</span>
                        <span className="text-blue-500">PR Sent</span>
                      </div>
                      <div className="flex flex-col items-center text-center border-l-2 border-orange-500 p-2 cursor-pointer" onClick={() => navigate(`/VysaAssist?profileId=${profileId}`)} >
                        <span className="text-orange-500 text-lg font-semibold">{profileView7.varequest_count}</span>
                        <span className="text-blue-500">VA Request</span>
                      </div>

                    </div>
                    <div className="w-full border-t-2 border-1 border-blue-600"></div>
                    <div className="flex items-center gap-5 mt-2">
                      <span className="text-green-600">
                        Profile Completion{' '}
                        <span className="text-orange-500">
                          {profile_completion}%
                        </span>
                      </span>

                      <button type='button' className="bg-blue-700 text-white px-2 py-1 text-md mt-1 rounded">
                        Update owner
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 p-4 gap-4">
                      <div>
                        <button
                          type="button"
                          className="bg-blue-700 text-white px-8 py-1 text-md h-auto rounded whitespace-nowrap"
                        >
                          Matching Profiles
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => setOpenCallManagement(true)}
                          className={`bg-blue-700 text-white px-8 py-1 text-md h-auto rounded whitespace-nowrap `}
                        >
                          Call Management
                        </button>

                        <CallManagementModel
                          open={openCallManagement}
                          onClose={() => setOpenCallManagement(false)}
                        />
                      </div>

                      <div>
                        <button
                          type="button"
                          onClick={() => setOpenAdminDetails(true)}
                          className={`bg-blue-700 text-white px-10 py-1 text-md h-auto rounded `}
                        >
                          Admin Details
                        </button>

                        <AdminDetailsPopup
                          open={OpenAdminDetails}
                          onClose={() => setOpenAdminDetails(false)}
                        />
                      </div>

                      <div>
                        <button
                          type="button"
                          onClick={() => setOpenDataHistory(true)}
                          className={`bg-blue-700 text-white px-12 py-1 text-md h-auto rounded `}
                        >
                          Data History
                        </button>
                        <DataHistoryPopup
                          open={openDataHistory}
                          onClose={() => setOpenDataHistory(false)}
                        />
                      </div>

                      <div>
                        <button
                          type="button"
                          className={`bg-blue-700 text-white px-5 py-1 text-md h-auto rounded whitespace-nowrap text-center`}
                        >
                          Invoice Generation
                        </button>
                      </div>

                    </div>
                    <div className="flex max-xl:flex-wrap">
                      <div>
                        <div>
                          <p className="text-black font-semibold ">
                            Payment Info:
                            <span className="text-green-700">
                              {' '}
                              {payment_date}/{Package_name} /{add_on_pack_name}/{payment_mode}{' '}
                            </span>
                          </p>
                        </div>
                        <div>
                          <div className="flex mt-3 gap-2">
                            <label className="font-semibold text-black">Profile Status:</label>
                            <select
                              {...register('profileView.status', {
                                setValueAs: (value) => value === "" ? undefined : Number(value)
                              })}
                              className="px-2 py-1 border border-black rounded  text-[#000000e6] "
                            >
                              <option value="" className=' text-[#000000e6] '>Select your Status</option>
                              {Status?.map((option) => (
                                <option
                                  key={option.status_code}
                                  value={option.status_code}
                                  className=' text-[#000000e6] '
                                >
                                  {option.status_name}
                                </option>
                              ))}
                            </select>


                            <select
                              {...register('profileView.primary_status', {
                                setValueAs: (value) => value === "" ? undefined : Number(value)
                              })}
                              value={watch('profileView.primary_status') || ''}
                              className="px-2 py-1 border border-black rounded  text-[#000000e6] "
                            >
                              <option value="" className=' text-[#000000e6] '>Select Primary Status</option>
                              {Primary?.map((option) => (
                                <option key={option.id} value={option.id} className=' text-[#000000e6] '>
                                  {option.sub_status_name}
                                </option>
                              ))}
                            </select>


                            {Number(watch('profileView.status')) !== 0 &&
                              watch('profileView.primary_status') &&
                              ![7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22].includes(Number(watch('profileView.primary_status'))) && (
                                <select
                                  {...register('profileView.secondary_status', {
                                    setValueAs: (value) => value === "" ? undefined : Number(value)
                                  })}
                                  value={watch('profileView.secondary_status') || ''}
                                  className="px-2 py-1 border border-black rounded  text-[#000000e6] "
                                >
                                  <option value="">Select Secondary Status</option>
                                  {secondary?.map((option) => (
                                    <option key={option.id} value={option.id} className=' text-[#000000e6] '>
                                      {option.plan_name}
                                    </option>
                                  ))}
                                </select>
                              )}
                          </div>

                          <div className="flex mt-5 justify-center">
                            {[12, 17, 22].includes(Number(primaryStatus)) && (
                              <input
                                type="text"
                                placeholder="Enter your reasons"
                                className="w-70 h-10 border-2 border-blue-500 rounded-lg px-4 focus:outline-none focus:border-blue-700 transition duration-300"
                              />
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2 mt-3 ">
                          <label className="font-semibold text-black">
                            Membership Date:
                          </label>
                          <div className="flex flex-col">
                            <div className="flex gap-1">
                              <label className="text-black font-medium">From:</label>
                              <input
                                {...register('profileView.membership_fromdate')}
                                type="date"
                                className='font-medium text-[#000000e6] mb-1'
                                value={watch('profileView.membership_fromdate')?.split('T')[0] || ''}
                              />
                            </div>
                            {errors?.profileView?.membership_fromdate && (
                              <span className="text-red-500 text-sm">
                                {errors.profileView.membership_fromdate.message}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <div className="flex gap-1">
                              <label className="text-black font-medium">To:</label>
                              <input
                                {...register('profileView.membership_todate')}
                                type="date"
                                className='font-medium text-[#000000e6] mb-1'
                                value={watch('profileView.membership_todate')?.split('T')[0] || ''}
                              />
                            </div>
                            {errors?.profileView?.membership_todate && (
                              <span className="text-red-500 text-sm">
                                {errors.profileView.membership_todate.message}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="w-full">
                          <h5 className="text-[18px] text-black font-semibold mb-3">
                            AddOn Packages
                          </h5>
                          <div>
                            {addonPackage.map((Package: AddOnPackage) => (
                              <div
                                key={Package.package_id}
                                className="flex items-center mb-3"
                              >
                                <input
                                  type="checkbox"
                                  id={`package-${Package.package_id}`}
                                  className="mr-2 font-medium text-[#000000e6]"
                                  value={Package.package_id}
                                  checked={getValues(
                                    'profileView.Addon_package',
                                  )
                                    ?.split(',')
                                    .includes(`${Package.package_id}`)} // Ensure checked state aligns with form value
                                  onChange={() => {
                                    const currentValues = getValues(
                                      'profileView.Addon_package',
                                    )
                                      ? getValues(
                                        'profileView.Addon_package',
                                      ).split(',')
                                      : [];

                                    const index = currentValues.indexOf(
                                      `${Package.package_id}`,
                                    );
                                    if (index === -1) {
                                      currentValues.push(
                                        `${Package.package_id}`,
                                      );
                                    } else {
                                      currentValues.splice(index, 1);
                                    }

                                    // Update the value in React Hook Form
                                    setValue(
                                      'profileView.Addon_package',
                                      currentValues.filter(Boolean).join(','),
                                      { shouldValidate: true }, // Ensure validation is triggered
                                    );
                                  }}
                                />
                                <label
                                  htmlFor={`package-${Package.package_id}`}
                                  className="cursor-pointer font-medium text-[#000000e6]"
                                >
                                  {Package.name} - {Package.amount}
                                </label>
                              </div>
                            ))}

                            {errors?.profileView?.Addon_package && (
                              <p className="text-red-600">
                                {errors.profileView.Addon_package.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          {/* <span className="font-semibold text-black">
                            Visit Count No:{' '}
                            <span className="font-medium text-[#000000e6]">{visit_count}</span>
                          </span> */}
                          <div className="flex items-center gap-2">
                            <label className="font-semibold text-black">Visit Count No:</label>
                            <input
                              {...register('profileView.visit_count', {
                                valueAsNumber: true // Ensures the value is treated as a number
                              })}
                              type="number"
                              min="0" // Prevent negative numbers
                              className="w-20 px-2 py-1 border border-gray-300 rounded font-medium text-[#000000e6]"
                            />
                          </div>
                        </div>
                        {/* <div className="mt-2">
                          <span className="font-semibold text-black">
                            Exp int lock:
                            <span className="font-medium text-[#000000e6]">{exp_int_lock}</span>
                          </span>
                          <span className="font-semibold text-black ml-4">
                            No Count:{' '}
                            <span className="font-medium text-[#000000e6]">{exp_int_count}</span>
                          </span>

                        </div> */}
                        {/* <div className="mt-2 flex items-center gap-4">
  <div className="flex items-center gap-2">
    <label className="font-semibold text-black">Exp int lock:</label>
    <input
      {...register('profileView.exp_int_lock', {
        valueAsNumber: true
      })}
      type="number"
      min="0"
      className="w-20 px-2 py-1 border border-gray-300 rounded font-medium text-[#000000e6]"
    />
  </div> */}



                        <div className="mt-2 flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <label className="font-semibold text-black">Exp Interest:</label>
                            <select
                              {...register('profileView.exp_int_lock',
                                {
                                  valueAsNumber: true,
                                }
                              )}
                              className="w-24 px-2 py-1 border border-gray-300 rounded font-medium text-[#000000e6]"
                            >
                              <option value={1}>Yes</option>
                              <option value={0}>No</option>
                            </select>
                          </div>


                          {Number(watch('profileView.exp_int_lock')) !== 0 && (
                            <div className="flex items-center gap-2">
                              <label className="font-semibold text-black">Exp No Count:</label>
                              <input
                                {...register('profileView.exp_int_count', {
                                  valueAsNumber: true
                                })}
                                type="number"
                                min="0"
                                className="w-20 px-2 py-1 border border-gray-300 rounded font-medium text-[#000000e6]"
                              />
                            </div>
                          )}
                        </div>
                        <div>
                          {/* <button className="bg-blue-700 text-white px-2 py-1 text-md mt-1 rounded">Update profile status2</button> */}
                        </div>
                        <div
                          className="flex gap-6 bg-#DDDFFF mt-2"
                          style={{ backgroundColor: '#DDDFFF' }}>
                          <div className=" mt-2 flex">
                            <p className="text-black ml-2 font-semibold">Mobile Number:</p>
                            <p className="text-red-500 text-[#000000e6]">{Mobile_no}</p>
                          </div>

                          <div className="mt-2 flex items-center">
                            <p className="text-black mr-2 font-semibold">Verification:</p>

                            <input
                              type="radio"
                              id="verifyYes"
                              {...register("profileView.mobile_otp_verify", {
                                required: "Please select mobile verification status"
                              })}
                              value="1"
                              checked={String(watch("profileView.mobile_otp_verify")) === "1"}
                              className="ml-1 font-medium"
                            />
                            <label htmlFor="verifyYes" className="ml-1 text-[#000000e6]">Yes</label>

                            <input
                              type="radio"
                              id="verifyNo"
                              {...register("profileView.mobile_otp_verify", {
                                required: "Please select mobile verification status"
                              })}
                              value="0"
                              checked={String(watch("profileView.mobile_otp_verify")) === "0"}
                              className="ml-2 font-medium text-[#000000e6]"
                            />
                            <label htmlFor="verifyNo" className="ml-1 text-[#000000e6]">No</label>


                          </div>

                          <div>
                            <button
                              onClick={sendOtp}
                              type="button"
                              className="bg-blue-700  text-white px-3 py-1 text-md mt-1 rounded">
                              Send otp
                            </button>
                          </div>
                        </div>
                        {errors?.profileView?.mobile_otp_verify && (
                          <p className="text-red-600 ml-2">
                            {errors.profileView.mobile_otp_verify.message || "Mobile verification is required"}
                          </p>
                        )}
                        <button
                          type="submit"
                          name="save2"
                          onClick={(e) => {
                            e.preventDefault();
                            handleSubmit();
                          }}
                          className="hidden xl:block bg-blue-700  text-white px-3 py-1 text-md mt-8 rounded"
                        >
                          Update profile
                        </button>
                      </div>

                      <div className="flex flex-col items-center justify-center p-20 space-y-4">
                        <div className="ml-30">
                          <ProfileForm
                            error={errors}
                            EditData={EditData}
                            profileId={profileId}
                          />
                        </div>
                        {/* Horo Hint Section */}
                        <div className="flex items-center space-x-4">
                          <label className="font-semibold text-black">
                            Horo Hint:
                          </label>
                          <textarea
                            {...register('profileView.horoscope_hints')}
                            placeholder="Enter hint..."
                            className="w-70 h-10  border-2 text-[#000000e6] font-medium border-blue-500 rounded-lg px-4 focus:outline-none focus:border-blue-700 transition duration-300"
                          />
                          {errors?.profileView?.horoscope_hints && (
                            <p className="text-red-600">
                              {errors.profileView.horoscope_hints.message}
                            </p>
                          )}
                        </div>

                        {/* Save Button */}

                        {/* Admin Chevvai Dhosam Section */}
                        <div className="flex items-center gap-2">
                          <label className="font-semibold text-black ml-7">
                            Admin Chevvai Dhosam:
                          </label>

                          <span className='font-medium  text-[#000000e6] '>{chevvai}</span>
                        </div>
                        {errors?.profileView?.calc_chevvai_dhosham && (
                          <p className="text-red-600">
                            {errors.profileView.calc_chevvai_dhosham.message}
                          </p>
                        )}

                        {/* Admin Rahu/Kethu Dhosam Section */}
                        <div className="flex items-center gap-2">
                          <label className="font-semibold text-black ">
                            Admin Rahu/Kethu Dhosam:
                          </label>
                          <span className='font-medium  text-[#000000e6] '>{raagu}</span>
                        </div>
                        {errors?.profileView?.calc_raguketu_dhosham && (
                          <p className="text-red-600">
                            {errors.profileView.calc_raguketu_dhosham.message}
                          </p>
                        )}
                        <div className=" justify-start items-start ">
                          <button
                            type="submit"
                            onClick={(e) => {
                              e.preventDefault();
                              handleSubmit();
                            }}
                            name="save2"
                            className="hidden max-xl:block bg-blue-700  text-white justify-start items-start px-3 py-1 text-md mt-8 rounded"
                          >
                            Update profile
                          </button>
                        </div>
                      </div>
                      {showOtpPopup && (
                        <VerifyOTPPopup
                          onClose={() => setShowOtpPopup(false)}
                          profileId={profileId}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default EditViewProfile;

