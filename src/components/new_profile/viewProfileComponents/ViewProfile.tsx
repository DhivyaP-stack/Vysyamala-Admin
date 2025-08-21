// import { Dispatch, SetStateAction, useEffect, useLayoutEffect, useState } from "react";
// import { Button } from '@mui/material';
// import { ArrowBack, Print, Settings, WhatsApp } from "@mui/icons-material";
// import ViewProfileButton from "../../../matchingProfile/ViewProfileButton";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { useQuery } from "@tanstack/react-query";
// import { getStatus } from "../../../action";
// import Profile from "../../../pages/Profile";
// import { useLocation, useNavigate } from "react-router-dom";
// import { downloadProfilePdf } from "../../../services/api";
// interface pageProps{
//   profile:any;
//     isViewDetai: boolean;
//     setViewDetails: Dispatch<SetStateAction<boolean>>;
// }




// export interface AddOnPackage{
//   package_id: number,
//   name:string ,
//   description: string,
//   amount:number
// }


// interface Alert {
//   id: number;
//   alert_name: string;
// }

// interface AlertSettingsResponse {
//   status: string;
//   message: string;
//   data: {
//     'Email Alerts': Alert[];
//     'SMS Alerts': Alert[];
//   };
// }


// interface FamilyStatus {
//   id: number;
//   status: string;
//   is_deleted: boolean;
// }



// const ViewProfile: React.FC<pageProps> = ({profile,isViewDetai, setViewDetails}) => {
//   const{register,setValue,watch}=useForm()
//   const [profileView,setProfileView]=useState<any>({});
//   const [profileView7,setProfileView7]=useState<any>({});
// const [addonPackage,setAddonPackage]=useState<AddOnPackage[]>([])
// const [emailAlerts, setEmailAlerts] = useState<Alert[]>([]);
// const [smsAlerts, setSmsAlerts] = useState<Alert[]>([]);
// const [familyStatuses, setFamilyStatuses] = useState<FamilyStatus[]>([]);
// const[formattedDate,setFormattedDate]=useState<string>('')
// const [checkEmailAlert, setCheckEmailAlert]=useState<string|undefined>()
// const [smsAlert,setSmsAlert]=useState<string|undefined>()
// const [checkAddOn,setCheckAddOn]=useState<string|undefined>()
// const [image, setImage] = useState<string | null>(null);
// // const [profileCountt,setProfileCountt]=useState()
// //   import moment from "moment";
// //   npm install moment
// //   npm install @types/moment --save-dev
// console.log('ffffffffffffffffffffvvvvvvvvvvvvvvv',profileView7)

// useEffect(()=>{
// if(profile){
//   // const apiDate =profile[6].DateOfJoin;
//   // const formattedDate=apiDate ? moment(apiDate).format("DD MMM YYYY") : "N/A";
//   // setFormattedDate(formattedDate)
//   // setValue('profileView.DateOfJoin',formattedDate)
//   if (profile[6]?.DateOfJoin) {
//       // Assuming EditData[5].DateOfJoin is like "2023-05-07T00:00:00"
//       const dateOfJoin = new Date(profile[6].DateOfJoin);
//       const formattedDate = dateOfJoin.toISOString().split('T')[0]; // '2023-05-07'
//     console.log(formattedDate)
//       // Set the value for the date input
//       setFormattedDate(formattedDate)
//       setValue('profileView.DateOfJoin', formattedDate);
//     }

//   const checkEmailAlert=profile[6].Notifcation_enabled
//   setCheckEmailAlert(checkEmailAlert)
//  const SmsAlert = profile[6].Notifcation_enabled
//  setSmsAlert(SmsAlert)
//  console.log(SmsAlert)
// const AddOnPackages = profile[6].Addon_package
// setCheckAddOn(AddOnPackages)
// console.log(AddOnPackages)
// const file =profile[6].profile_image; // Get the first file
// console.log(file)
// if (file) {
//   // const imageUrl = URL.createObjectURL(file); // Convert to URL
//   setImage(file); // Store URL in state
// }
// }
// },[])
// const navigate = useNavigate();
//  const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const profileId = queryParams.get('profileId');
//   console.log(profileId)
// const email= profileView.Notifcation_enabled?.split(',');
// const sms= profileView.Notifcation_enabled?.split(',');
// const addOn=profileView.Addon_package?.split(',');
// console.log(addOn)
// const { data: Status } = useQuery({
//   queryKey: ['Status'],
//   queryFn: getStatus,
// });
// console.log(Status)
// useEffect(() => {
//   axios
//     .get<FamilyStatus[]>('https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/family-statuses/')
//     .then(response => {
//       const filteredStatuses = response.data.filter(status => !status.is_deleted);
//       setFamilyStatuses(filteredStatuses);
//     })
//     .catch(error => {
//       console.error('Error fetching family statuses:', error);
//     });
// }, []);
// useEffect(() => {
//   // Fetch alert settings from the API
//   axios.post<AlertSettingsResponse>('https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/auth/Get_alert_settings/')
//     .then(response => {
//       if (response.data.status === '1') {
//         setEmailAlerts(response.data.data['Email Alerts']);
//         setSmsAlerts(response.data.data['SMS Alerts']);
//       } else {
//         console.error('Failed to fetch alert settings.');
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching alert settings:', error);
//     });
// }, []);


// const fetchAddOnPackages = async ()=>{
//   try{
//   const response = await axios.post('https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/auth/Get_addon_packages/');
//   if(response.data.status === 'success'){
//     console.log(response.data.data)
// setAddonPackage(response.data.data)
//   }
//   else{
//     console.log(response.data.message||'Failed to fetch packages');
//   }
//   }catch(err){
//  console.error(err);
//   }
// }


// useEffect(()=>{
//   fetchAddOnPackages()
// },[])



//   useLayoutEffect(() => {
//     if (profile && profile.length > 0) {
//       setProfileView(profile[6]);
//     }
//   }, [profile]);


//   useLayoutEffect(() => {
//     if (profile && profile.length > 0) {
//       setProfileView7(profile[7]);
//     }
//   }, [profile]);

// //  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",profile[7])

//     const toggleSection10 = () => {
//         setViewDetails(!isViewDetai);
//     console.log(isViewDetai,"isViewDetais")
//       };

// // const profileCount = profile[7]
// // console.log("11111111111111111111111111111111111111111111111111111",profileCount)
// //   setProfileCountt(profileCount)

// const handlePrintProfile = () => {
//   if (profileId) {
//     downloadProfilePdf(profileId);
//   } else {
//     console.error('Profile ID is not available');
//   }
// };


//   const profileData = [
//     { count: 453, label: "Matching Profile" },
//     { count: 38, label: "Suggested Profile" },
//     { count: 34, label: "Viewed Profile" },
//     { count: 26, label: "Visitor Profile" },
//     { count: 4, label: "C to C Sent" },
//     { count: 6, label: "C to C Received" },
//     { count: 56, label: "EI Sent" },
//     { count: 23, label: "EI Received" },
//     { count: 6, label: "Mutual Interest" },
//     { count: 23, label: "Shortlisted" },
//     { count: 3, label: "PR Sent" },
//     { count: 5, label: "VA Request" },
//   ];
//   const addOnPackages = [
//     { name: "Video Profile", price: 2900 },
//     { name: "Profile Booster", price: 900 },
//     { name: "Portrait Photography", price: 4900 },
//     { name: "Astro Service", price: 900 },
//     { name: "Vys Assist", price: 900 },
//   ];
//   return (
//     <div>
//       <div>
//         <div className="bg-white p-2 mb-10 rounded shadow-md">

// <h4
//   onClick={toggleSection10}
//   className="text-red-600 flex items-center justify-between text-xl cursor-pointer font-semibold dark:text-white"
// >
//   <span>Profile View</span> {/* Add a title or any text here */}

//   <svg
//     className={`fill-current transform ${
//       isViewDetai ? 'rotate-180' : ''
//     }`}
//     width="20"
//     viewBox="0 0 20 20"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       fillRule="evenodd"
//       clipRule="evenodd"
//       d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
//       fill=""
//     ></path>
//   </svg>

// </h4>
//  { isViewDetai &&( 
//  <div>
// <div className="flex items-center justify-between mt-3 ">
//       {/* Back Text with Icon on Left */}
//       <div className="flex items-center gap-2 text-blue-600 cursor-pointer hover:text-blue-800">
//         <ArrowBack fontSize="small" />
//         <span>Back</span>
//       </div>

//       {/* Other Texts with Icons on Right */}
//       <div className="flex gap-6 text-gray-700">
//         <div className="flex items-center gap-2 cursor-pointer hover:text-green-600" >
//           <WhatsApp fontSize="small"  className=" text-green-700"/>
//           <span>WhatsApp</span>
//         </div>
//         <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900" onClick={handlePrintProfile}>
//           <Print fontSize="small" />
//           <span>Print</span>
//         </div>
//         <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
//           <Settings fontSize="small" />
//           <span>Settings</span>
//         </div>
//       </div>
//     </div>
//     <div className="flex flex-row gap-2 mt-1 ">
//         {/* <div className="flex  items-center ml-2 mt-2 w-50 h-35 border-2 border-red-600 rounded-sm ">
//         <img
//          src="https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/media/default_groom.png" alt="Back" className="w-full h-full object-cover" />
//         </div> */}
//       <div>
// <div className="flex flex-col items-center ml-2 mt-2 border-2 border-red-600  w-[150px] h-[180px] sm:w-[250px] sm:h-[180px] md:w-[160px] md:h-[180px] lg:w-[170px] lg:h-[190px]">
//   {/* <img
//     //src="https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/media/default_groom.png"
//     src={image}
//     alt="Back"
//     className="w-full h-full object-cover rounded-sm"
//   /> */}
//     {/* {image ? (
//         <img
//         //src="https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/media/default_groom.png"
//           src={image}
//           alt="Profile"
//          // className="w-40 h-40 rounded-full border border-gray-300 shadow-md"
//           className='w-40 h-40 rounded-full border border-red-500 shadow-md mt-3'
//                   />
//       ) : (
//         <p>Loading image...</p>
//       )} */}
//       {profile?.[6]?.profile_image ? (
//   <img
//     src={profile[6].profile_image || "https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/media/default_groom.png"}
//     alt="Profile"
//     className="w-40 h-40 rounded-full border border-red-500 shadow-md mt-3"
//   //  onError={(e) => (e.currentTarget.src = "https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/media/default_groom.png")} // Fallback if image fails
//   />
// ) : (
//   <p>Loading image...</p>
// )}

//   </div>  
//   <div className="flex flex-col ml-2 mt-2">
//   <span className="text-vibrantOrange">Gold online + Email</span>
//   <br/>
//   <span className="text-vibrantOrange">valid till: 12-march-2025</span>
//   </div>
// </div>


//         <div className="flex ">
//             <div>
//             <div className="flex items-center mt-5">
//   <span className="text-green-600">{profileView.ProfileId}-sudhir</span>
//   <div className="h-4 border-l-2 border-green-800 mx-1"></div>
//   <span className="text-green-600">23</span>
//   <div className="h-4 border-l-2 border-green-800 mx-1"></div>
//   <span className="text-green-600">Mithunangula</span>
//   <div className="h-4 border-l-2 border-green-800 mx-1"></div>
//   <span className="text-green-600">Gold online + Email</span>
//   <div className="h-4 border-l-2 border-green-800 mx-1"></div>
//   <span className="text-green-600">valid till: 12-march-2025</span>
//   <div className="h-4 border-l-2 border-green-800 mx-1"></div>
//   <span className="text-green-600">created date:12-march-2025 </span>
//   <div className="h-4 border-l-2 border-green-800 mx-1"></div>
//   <span className="text-green-600">idle days: 12-march-2025</span>

// </div>
// <div className="w-full border-t-2 border-blue-600 mt-2"></div>
// <div className="w-full border-t-2 border-blue-600 mt-1"></div>

// {/* <div className="grid grid-cols-12 items-center  mt-3">
//     <div className="flex flex-col items-center mt-0">
// <span className="text-orange-500">453</span>
// <span className="text-blue-500">Matchng profile</span>
//     </div>
//     <div className="flex flex-col items-center  mt-1">
// <span className="text-orange-500">38</span>
// <span className="text-blue-500">sugessted profile</span>
//     </div>

//     <div className=" border-l-2 h-12 border-orange-500  flex flex-col items-center mt-1">
// <span className="text-orange-500">34</span>
// <span className="text-blue-500 mx-2" >viewed profile</span>
//     </div>
//     <div className="flex flex-col items-center  mt-1">
// <span className="text-orange-500">26</span>
// <span className="text-blue-500">visitor profile</span>
//     </div>
//     <div className="flex flex-col items-center  mt-1">
// <span className="text-orange-500">4</span>
// <span className="text-blue-500">c to c</span>
// <span className="text-blue-500">Sent</span>
//     </div>
//     <div className="flex flex-col items-center  mt-1">
// <span className="text-orange-500">6</span>
// <span className="text-blue-500">c to c</span>
// <span className="text-blue-500">Received</span>
//     </div>

//     <div className=" border-l-2 h-12 border-orange-500 flex flex-col items-center mt-1">
// <span className="text-orange-500">56</span>
// <span className="text-blue-500">EI sent</span>
//     </div>
//     <div className="flex flex-col items-center  mt-1">
// <span className="text-orange-500">23</span>
// <span className="text-blue-500">EI received</span>
//     </div>
//     <div className="flex flex-col items-center  mt-1">
// <span className="text-orange-500">6</span>
//  <span className="text-blue-500 mx-3 whitespace-pre-line">Mutual Interest</span>

//     </div>

//     <div className="border-l-2 h-12 border-orange-500  flex flex-col items-center mt-1">
// <span className="text-orange-500">23</span>
// <span className="text-blue-500">Shortlisted</span>
//     </div>
//     <div className="flex flex-col items-center  mt-1">
// <span className="text-orange-500">3</span>
// <span className="text-blue-500">PR sent</span>
//     </div>

//     <div className="border-l-2 h-12 border-orange-500  flex flex-col items-center mt-1">
// <span className="text-orange-500">5</span>
// <span className="text-blue-500">VA Request</span>
//     </div>
//     <div className="flex flex-col items-center  mt-1">
// <span className="text-orange-500">6</span>
// <span className="text-blue-500">Astro</span>
//     </div>

// </div> */}
//  {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 [1240]:grid-cols-10 lg:grid-cols-12 gap-4 overflow-auto"> */}

// <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 xl:grid-cols-12 lg:grid-cols-10 gap-4 overflow-auto">


// <div className="flex flex-col items-center text-center border-l-2 border-orange-500 p-2 cursor-pointer" onClick={()=>navigate(`/matchingProfiles?profileId=${profileId}`)}>
//   <span className="text-orange-500 text-lg font-semibold">{profileView7.matchingprofile_count}</span>
//   <span className="text-blue-500">Matching Profile</span>
// </div>
// <div className="flex flex-col items-center text-center border-l-2 border-orange-500 cursor-pointer" onClick={()=>navigate(`/suggestedProfiles?profileId=${profileId}`)} >
//   <span className="text-orange-500 text-lg font-semibold">{profileView7.suggestedprofile_count}</span>
//   <span className="text-blue-500">Suggested Profile</span>
// </div>
// <div className="flex flex-col items-center text-center border-l-2 border-orange-500 p-2 cursor-pointer " onClick={()=>navigate(`/ViewedProfilesById?profileId=${profileId}`)} >
//   <span className="text-orange-500 text-lg font-semibold">{profileView7.viewedprofile_count}</span>
//   <span className="text-blue-500">Viewed Profile</span>
// </div>
// <div className="flex flex-col items-center text-center border-l-2 border-orange-500 p-2 cursor-pointer"  onClick={()=>navigate(`/VisitorProfilesById?profileId=${profileId}`)}>
//   <span className="text-orange-500 text-lg font-semibold">{profileView7.visitorprofile_count}</span>
//   <span className="text-blue-500">Visitor Profile</span>
// </div>
// <div className="flex flex-col items-center text-center border-l-2 border-orange-500 p-2 cursor-pointer" onClick={(()=>navigate(`/CToCSentProfiles?profileId=${profileId}`))} >
//   <span className="text-orange-500 text-lg font-semibold">{profileView7.ctocsend_count}</span>
//   <span className="text-blue-500">C to C Sent</span>
// </div>
// <div className="flex flex-col items-center text-center border-l-2 border-orange-500 cursor-pointer" onClick={(()=>navigate(`/CToCReceivedProfiles?profileId=${profileId}`))} >
//   <span className="text-orange-500 text-lg font-semibold">{profileView7.ctocreceived_count}</span>
//   <span className="text-blue-500">C to C Received</span>
// </div>
// <div className="flex flex-col items-center text-center border-l-2 border-orange-500 p-2 cursor-pointer" onClick={(()=>navigate(`/ExpressInterestProfiles?profileId=${profileId}`))} >
//   <span className="text-orange-500 text-lg font-semibold">{profileView7.exp_int_sentcount}</span>
//   <span className="text-blue-500">EI Sent</span>
// </div>
// <div className="flex flex-col items-center text-center border-l-2 border-orange-500 cursor-pointer" onClick={()=>navigate(`/ExpressInterestReceivedProfiles?profileId=${profileId}`)} >
//   <span className="text-orange-500 text-lg font-semibold">{profileView7.exp_int_reccount}</span>
//   <span className="text-blue-500">EI Received</span>
// </div>
// <div className="flex flex-col items-center text-center border-l-2 border-orange-500 p-2 cursor-pointer" onClick={()=>navigate(`/ExpressInterestMutualProfiles?profileId=${profileId}`)} >
//   <span className="text-orange-500 text-lg font-semibold">{profileView7.mutual_int_count}</span>
//   <span className="text-blue-500">Mutual Interest</span>
// </div>
// <div className="flex flex-col items-center text-center border-l-2 border-orange-500 p-2" >
//   <span className="text-orange-500 text-lg font-semibold">{profileView7.shortlisted_count}</span>
//   <span className="text-blue-500">Shortlisted</span>
// </div>
// <div className="flex flex-col items-center text-center border-l-2 border-orange-500 p-2 cursor-pointer" onClick={()=>navigate(`/ProfileSentTo?profileId=${profileId}`)}>
//   <span className="text-orange-500 text-lg font-semibold">{profileView7.prsent_count}</span>
//   <span className="text-blue-500">PR Sent</span>
// </div>
// <div className="flex flex-col items-center text-center border-l-2 border-orange-500 p-2 cursor-pointer" onClick={()=>navigate(`/VysaAssist?profileId=${profileId}`)} >
//   <span className="text-orange-500 text-lg font-semibold">{profileView7.varequest_count}</span>
//   <span className="text-blue-500">VA Request</span>
// </div>

// </div>
//  {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 xl:grid-cols-12 lg:grid-cols-10 gap-4 overflow-auto">

//         {profileData.map((item, index) => (
//           <div
//             key={index}
//             className="flex flex-col items-center text-center border-l-2 border-orange-500 p-2"
//           >
//             <span className="text-orange-500 text-lg font-semibold">{item.count}</span>
//             <span className="text-blue-500">{item.label}</span>
//           </div>
//         ))}
//         </div> */}
// <div className="w-full border-t-2 border-1 border-blue-600"></div>
// <div className="flex items-center gap-5">
// <span className="text-green-600">
//   Profile Completion <span className="text-orange-500">{profileView.profile_completion}%</span>
// </span>

// <span className="text-green-600">
//   Verified percentage<span className="text-orange-500">30%</span>
// </span>
// <span className="text-green-600">
//   EI percentage<span className="text-orange-500">30%</span>
// </span>

//   <span className="text-green-500">2023 sathya priya</span>

// {/* <button className="bg-blue-700 text-white px-2 py-1 text-md mt-1 rounded">Update owner</button> */}
// </div>

// <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 p-4 gap-4">
// <button
//  type="button"
//   className="bg-blue-700 text-white px-2 py-1 text-sm h-auto rounded whitespace-nowrap"
// >
//   Matching Profiles
// </button>

// <button
//     className={`bg-blue-700 text-white px-2 py-1 text-sm h-auto rounded whitespace-nowrap `}
// >
//   call Management
// </button>
// <button
//     className={`bg-blue-700 text-white px-2 py-1 text-sm h-auto rounded `}
// >
//   Admin Details
// </button>
// <button
//     className={`bg-blue-700 text-white px-2 py-1 text-sm h-auto rounded `}
// >
//   Data History
// </button>
// <button
//     className={`bg-blue-700 text-white px-2 py-1 text-sm h-auto rounded whitespace-nowrap text-center`}
// >
//   Invoice Generation
// </button>
// </div>
// <div className="flex">
// <div>
// <div>
//                 <p className="text-black font-semibold ">Payment Info:<span className="text-green-700"> Date/Package Name /Add on package / Payment mode </span></p>
//               </div>
//               <div className="flex mt-3 gap-2 ">
//                 <label className="font-semibold text-black ">Profile Status:</label>
//                 <span>Approved</span>
//                 {/* <button className="bg-blue-700 text-white px-2 py-1 text-md mt-0 rounded">Update profile status 1</button> */}
//               </div>

//               <div className="flex gap-2 mt-3 ">
//                 <label className="font-semibold text-black whitespace-nowrap">
//                   Membership Date:
//                 </label>

//                 <div className="flex gap-1 ">
//                   <label className="text-black  ">From:</label>
//                   <input type="Date" />
//                 </div>
//                 <div className="flex gap-1">
//                   <label className="text-black">To:</label>
//                   <input {...register("profileView.DateOfJoin")} type="Date" />
//                 </div>
//               <div>
//               {/* <button className="flex flex-row bg-blue-700 text-white px-2 py-1 text-md mt-1 rounded whitespace-nowrap">Update profile status2</button> */}
//               </div>
//               </div>

//               <div className="flex  mt-2 gap-2 ">
//                 <label className="font-semibold text-black ">
//                  Mini Membership Date:
//                 </label>

//                 <div className="flex gap-1">
//                   <label className="text-black mt-0 ">From:</label>
//                   <input type="Date" />
//                 </div>
//                 <div className="flex gap-1">
//                   <label className="text-black ">To:</label>
//                   <input type="Date" />
//                   {/* <input {...register("profileView.DateOfJoin")} type="Date" /> */}
//                 </div>
//               <div>
//              <span>count: 10/11/25</span>
//               </div>
//               </div>



//                      <div className="w-full">

//                 {/* <div className="flex gap-1">
//                   <label className="text-black font-semibold mt-0 ">AddOn Packages:</label>
//                   <span>Video Profile-2900</span>
//                 </div> */}
//                  {/* <div className="flex gap-1">
//     <label className="text-black font-semibold mt-0">AddOn Packages:</label>
//     <div className="flex flex-wrap gap-2">
//       {addOnPackages.map((pkg, index) => (
//         <span key={index}>{`${pkg.name}-${pkg.price}`}</span>
//       ))}
//     </div>
//     </div>
//     */}

//   <div className="flex gap-1 mt-2">
//     <label className="text-black font-semibold mt-0 whitespace-nowrap">AddOn Packages:</label>
//     <span>
//       {addOnPackages.map((pkg) => `${pkg.name}-${pkg.price}`).join(",")}
//     </span>
//   </div>

//                                            </div>
//                                            <div className="mt-2">
//              <span className="font-semibold text-black">Visit Count No: <span  className="font-medium text-black">50</span></span>
//               </div>
//               <div className="mt-2">
//              <span  className="font-semibold text-black">Exp int lock:No Count: <span  className="font-medium text-black">50</span></span>
//               </div>
//               <div>
//               {/* <button className="bg-blue-700 text-white px-2 py-1 text-md mt-2 rounded">Update profile status2</button> */}
//               </div>
//               <div
//                 className="flex gap-6 bg-#DDDFFF mt-2"
//                 style={{ backgroundColor: '#DDDFFF' }}
//               >
//                 <div
//                   className=" mt-2
//             flex"
//                 >
//                   <p className="text-black ml-2 ">Mobile Number:</p>
//                   <p className="text-red-500">{profileView.Mobile_no}</p>
//                 </div>
//                 <div
//                   className="mt-2 
//             flex"
//                 >
//                   <p className="text-black ">Verification:</p>
//                   <input type="radio" className="ml-1" /> <label className="ml-1">Yes</label>
//                   <input type="radio" className="ml-2" />
//                   <label className="ml-1">No</label>
//                 </div>
//                {/* <div>
//                <button className="bg-blue-700  text-white px-3 py-1 text-md mt-1 rounded">Send otp</button>
//                </div> */}
//               </div>
//               {/* <button className="bg-blue-700  text-white px-3 py-1 text-md mt-5 rounded">Update profile</button> */}
//     </div>

//     {/* <div className="gap-20 items-center
//      justify-center p-2">

// <input
//   type="text"
//   placeholder="Enter text..."
//   className="w-full ml-22 mr-22 sm:w-80 md:w-96 h-17 border-2 border-green-500 rounded-lg px-4 focus:outline-none focus:border-blue-700 transition duration-300"
// />

//     <div className="flex mt-2 mb-2">
//                 <div className="flex items-center space-x-2">
//   <label className="font-semibold text-black">Horo Hint:</label>
//   <input
//     type="text"
//     placeholder="Enter hint..."
//     className="w-60 h-10 border-2 border-blue-500 rounded-lg px-4 focus:outline-none focus:border-blue-700 transition duration-300"
//   />
// </div>

//               </div>
//               <Button variant="contained" sx={{ textTransform: 'none' }}>
//                 Save Admin comments
//               </Button>
//               <div className="flex gap-1">
//               <button className="bg-blue-700 text-white px-2 py-1 text-md mt-1 rounded">Admin Chevvai Dhosam</button>

//                   <select 
//                   disabled

//                   className="px-2 py-1 border border-black rounded">
//                   {BooleanType.map((option)=>(
//                     <option key={option.Value}  value={option.Value}>{option.label}</option>
//                   ))}
//                   </select>
//                 </div>

//                 <div className="flex gap-1 mt-2">
//                 <button className="bg-blue-700 text-white px-2 py-1 text-md mt-1 rounded">Admin Rahu/Kethu Dhosam</button>

//                   <select 
//                   disabled

//                   className=" px-2 py-1 border border-black rounded">
//                   {BooleanType.map((option)=>(
//                     <option key={option.Value} value={option.Value}>{option.label}</option>
//                   ))}
//                   </select>
//                 </div> 
//     <div>
//                 <p className="text-black ">Payment Info: / / / </p>
//               </div>
// </div> */}

// <div className="flex flex-col items-center justify-center p-10 space-y-4">

//   {/* Large Input Field */}
//   <input
//     type="text"
//     value={profileView.Admin_comments}
//     placeholder="Enter Adnin Comments..."
//     className="w-full sm:w-80 md:w-96 h-40 border-2 border-green-500 rounded-3xl px-4 focus:outline-none focus:border-blue-700 transition duration-300"
//   />
//     {/* <Button variant="contained" sx={{ textTransform: "none",ml:20 }}>
//     Save Admin Comments
//   </Button> */}

//   {/* Horo Hint Section */}
//   <div className="flex items-center space-x-4">
//     <label className="font-semibold text-black">Horo Hint:</label>
//     <input
//     value={profileView.horoscope_hints}
//       type="text"
//       placeholder="Enter hint..."
//       className="w-70 h-10 border-2 border-blue-500 rounded-lg px-4 focus:outline-none focus:border-blue-700 transition duration-300"
//     />
//   </div>

//   {/* Save Button */}


//   {/* Admin Chevvai Dhosam Section */}
//   <div className="flex items-center gap-2">
//     <label className="font-semibold text-black ml-7">Admin Chevvai Dhosam:</label>
//     <span>{profileView.calc_chevvai_dhosham}</span>
//   </div>

//   {/* Admin Rahu/Kethu Dhosam Section */}
//   <div className="flex items-center gap-2">
//   <label className="font-semibold text-black">Admin Rahu/Kethu Dhosam:</label>
//   <span>{profileView.calc_raguketu_dhosham}</span>
//   </div>
// </div>

// </div>
//             </div>


//         </div>

//     </div>

// </div>

// )}
// </div>

//     </div>  
//     </div>
//   );
// };

// export default ViewProfile;




import {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { Button } from '@mui/material';
import { ArrowBack, CameraAlt, Print, Settings, WhatsApp } from '@mui/icons-material';
import ViewProfileButton from '../../../matchingProfile/ViewProfileButton';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { getStatus } from '../../../action';
import Profile from '../../../pages/Profile';
import { useLocation, useNavigate } from 'react-router-dom';
import { downloadProfilePdf } from '../../../services/api';
import { ViewCallManagement } from './ProfileViwePopup/ViewCallManagement';
import { CallManagementModel } from './ProfileViwePopup/CallManagementModel';
import { AdminDetailsPopup } from './ProfileViwePopup/AdminDetailsPopup';
import { DataHistoryPopup } from './ProfileViwePopup/DataHistoryPopup';
import { MyProfileShare } from '../WhatsUpShare/MyProfileShare';
import { notify } from '../../TostNotification';

interface pageProps {
  profile: any;
  isViewDetai: boolean;
  setViewDetails: Dispatch<SetStateAction<boolean>>;
}

export interface AddOnPackage {
  package_id: number;
  name: string;
  description: string;
  amount: number;
}

interface Alert {
  id: number;
  alert_name: string;
}

interface AlertSettingsResponse {
  status: string;
  message: string;
  data: {
    'Email Alerts': Alert[];
    'SMS Alerts': Alert[];
  };
}

interface FamilyStatus {
  id: number;
  status: string;
  is_deleted: boolean;
}

const ViewProfile: React.FC<pageProps> = ({
  profile,
  isViewDetai,
  setViewDetails,
}) => {
  const { register, setValue, watch } = useForm();
  const [profileView, setProfileView] = useState<any>({});


  const [profileView7, setProfileView7] = useState<any>({});

  const [emailAlerts, setEmailAlerts] = useState<Alert[]>([]);
  const [smsAlerts, setSmsAlerts] = useState<Alert[]>([]);
  const [familyStatuses, setFamilyStatuses] = useState<FamilyStatus[]>([]);
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [checkEmailAlert, setCheckEmailAlert] = useState<string | undefined>();
  const [smsAlert, setSmsAlert] = useState<string | undefined>();
  const [checkAddOn, setCheckAddOn] = useState<string | undefined>();
  const [image, setImage] = useState<string | null>(null);
  const [openCallManagement, setOpenCallManagement] = useState<boolean>(false)
  const [OpenAdminDetails, setOpenAdminDetails] = useState<boolean>(false)
  const [openDataHistory, setOpenDataHistory] = useState<boolean>(false)
  const [pass, setPass] = useState<any>({});

  // const [profileCountt,setProfileCountt]=useState()
  //   import moment from "moment";
  //   npm install moment
  //   npm install @types/moment --save-dev
  console.log('profileView7', profileView7);
  console.log("profileView", profileView)

  useEffect(() => {
    if (profile) {
      setPass(profile[0]);
    }
  }, [pass])

  useEffect(() => {
    if (profile) {
      if (profile[6]) {
        const membership_fromdate = new Date(profile[6].membership_fromdate);
        const formattedDateFrom = membership_fromdate.toISOString().split('T')[0];

        const membership_todate = new Date(profile[6].membership_todate);
        const formattedDate = membership_todate.toISOString().split('T')[0];


        // Set both date fields using setValue
        setValue('profileView.membership_fromdate', formattedDateFrom);
        setValue('profileView.membership_todate', formattedDate); // or use the appropriate end date
      }

      // ... rest of your useEffect code
    }
  }, [profile, setValue]);


  // useEffect(() => {
  //     const formattedDate = new Date(apiValue).toISOString().split("T")[0];
  //     setValue("profileView.membership_fromdate", formattedDate);
  //   }, []);

  useEffect(() => {
    if (profile) {
      // const apiDate =profile[6].DateOfJoin;
      // const formattedDate=apiDate ? moment(apiDate).format("DD MMM YYYY") : "N/A";
      // setFormattedDate(formattedDate)
      // setValue('profileView.DateOfJoin',formattedDate)
      if (profile[6]?.DateOfJoin) {
        // Assuming EditData[5].DateOfJoin is like "2023-05-07T00:00:00"
        const dateOfJoin = new Date(profile[6].DateOfJoin);
        const formattedDate = dateOfJoin.toISOString().split('T')[0]; // '2023-05-07'
        console.log(formattedDate);
        // Set the value for the date input
        setFormattedDate(formattedDate);
        setValue('profileView.DateOfJoin', formattedDate);
      }

      const checkEmailAlert = profile[6].Notifcation_enabled;
      setCheckEmailAlert(checkEmailAlert);
      const SmsAlert = profile[6].Notifcation_enabled;
      setSmsAlert(SmsAlert);
      console.log(SmsAlert);
      const AddOnPackages = profile[6].Addon_package;
      setCheckAddOn(AddOnPackages);
      console.log(AddOnPackages);
      const file = profile[6].profile_image; // Get the first file
      console.log(file);
      if (file) {
        // const imageUrl = URL.createObjectURL(file); // Convert to URL
        setImage(file); // Store URL in state
      }
    }
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const profileId = queryParams.get('profileId');
  console.log(profileId);
  const email = profileView.Notifcation_enabled?.split(',');
  const sms = profileView.Notifcation_enabled?.split(',');
  const addOn = profileView.Addon_package?.split(',');
  console.log("addd123addd123", addOn)
  console.log(addOn);
  const { data: Status } = useQuery({
    queryKey: ['Status'],
    queryFn: getStatus,
  });
  console.log(Status);
  useEffect(() => {
    axios
      .get<FamilyStatus[]>('https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/family-statuses/')
      .then((response) => {
        const filteredStatuses = response.data.filter(
          (status) => !status.is_deleted,
        );
        setFamilyStatuses(filteredStatuses);
      })
      .catch((error) => {
        console.error('Error fetching family statuses:', error);
      });
  }, []);
  useEffect(() => {
    // Fetch alert settings from the API
    axios
      .post<AlertSettingsResponse>(
        'https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/auth/Get_alert_settings/',
      )
      .then((response) => {
        if (response.data.status === '1') {
          setEmailAlerts(response.data.data['Email Alerts']);
          setSmsAlerts(response.data.data['SMS Alerts']);
        } else {
          console.error('Failed to fetch alert settings.');
        }
      })
      .catch((error) => {
        console.error('Error fetching alert settings:', error);
      });
  }, []);

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

  useLayoutEffect(() => {
    if (profile && profile.length > 0) {
      setProfileView(profile[6]);
    }
  }, [profile]);

  useLayoutEffect(() => {
    if (profile && profile.length > 0) {
      setProfileView7(profile[7]);
    }
  }, [profile]);



  const toggleSection10 = () => {
    setViewDetails(!isViewDetai);
    console.log(isViewDetai, 'isViewDetais');
  };

  // const handlePrintProfile = () => {
  //   if (profileId) {
  //     downloadProfilePdf(profileId);
  //   } else {
  //     console.error('Profile ID is not available');
  //   }
  // };

  const profileData = [
    { count: 453, label: 'Matching Profile' },
    { count: 38, label: 'Suggested Profile' },
    { count: 34, label: 'Viewed Profile' },
    { count: 26, label: 'Visitor Profile' },
    { count: 4, label: 'C to C Sent' },
    { count: 6, label: 'C to C Received' },
    { count: 56, label: 'EI Sent' },
    { count: 23, label: 'EI Received' },
    { count: 6, label: 'Mutual Interest' },
    { count: 23, label: 'Shortlisted' },
    { count: 3, label: 'PR Sent' },
    { count: 5, label: 'VA Request' },
  ];


  const [addonPackage, setAddonPackage] = useState<AddOnPackage[]>([]);



  useEffect(() => {


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
    <div className="bg-white p-8 mb-10 rounded shadow-md">
      <h4
        onClick={toggleSection10}
        className="text-red-600 flex items-center justify-between text-xl cursor-pointer font-semibold dark:text-white"
      >
        <span>Profile View</span>
        <svg
          className={`fill-current transform ${isViewDetai ? 'rotate-180' : ''}`}
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

      {isViewDetai && (
        <div className="mt-3">
          {/* Header with back and action buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div
              className="flex items-center gap-2 text-blue-600 cursor-pointer hover:text-blue-800"
              onClick={() => navigate(-1)}
            >
              <ArrowBack fontSize="small" />
              <span>Back</span>
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-6 text-gray-700">
              {/* <div className="flex items-center gap-2 cursor-pointer hover:text-green-600">
                <WhatsApp fontSize="small" className="text-green-700" />
                <span>WhatsApp</span>
              </div> */}
              <div
                className="flex items-center gap-2 cursor-pointer hover:text-gray-900"
                onClick={() =>
                  window.open(`/UploadApprovalProfileImg?profileId=${profileId}`, "_blank")
                }
              >
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
                    profileImagess={profile[6]?.profile_image || ""}
                    //   profileImage={get_myprofile_personal?.profile_id}
                    profileId={profileId}
                    profileName={profile[6]?.Profile_name}
                    age={profile[6]?.age}
                    starName={profile[3]?.star_name}
                  />
                )}
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer hover:text-gray-900"
                // onClick={handlePrintProfile}
                onClick={togglePdfVisibility}
              >
                <Print fontSize="small" />
                <span>Print</span>

                {
                  isPdfOptionsVisible && (
                    <div className='absolute right-20 mt-30 z-10 w-[220px] rounded-md shadow-lg p-2 bg-white max-sm:left-auto max-sm:right-[-200px]'>
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

          {/* Profile Image and Basic Info */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            {/* Profile Image */}
            <div className="flex flex-col items-center">
              <div className="border-2 border-red-600 w-[150px] h-[180px] sm:w-[200px] sm:h-[200px] md:w-[180px] md:h-[200px] flex items-center justify-center">
                {profile?.[6]?.profile_image ? (
                  <img
                    src={
                      profile[6].profile_image ||
                      'https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/media/default_groom.png'
                    }
                    alt="Profile"
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-red-500 shadow-md object-cover"
                  />
                ) : (
                  <p>Loading image...</p>
                )}
              </div>
              <div className="mt-2 text-center">
                <span className="text-vibrantOrange block">
                  {profileView.Package_name}
                </span>
                <span className="text-vibrantOrange">
                  valid till: {profileView.valid_till}
                </span>
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1">
              {/* Profile ID and Basic Info */}
              <div className="flex flex-wrap items-center gap-1 text-sm sm:text-base">
                <span className="text-green-600">
                  {profileView.ProfileId}-{profileView.Profile_name}
                </span>
                <div className="h-4 border-l-2 border-green-800 mx-1"></div>
                <span className="text-green-600">{profileView.age}</span>
                <div className="h-4 border-l-2 border-green-800 mx-1"></div>
                <span className="text-green-600">{profileView.suya_gothram}</span>
                <div className="h-4 border-l-2 border-green-800 mx-1"></div>
                <span className="text-green-600">{profileView.Package_name}</span>
                <div className="h-4 border-l-2 border-green-800 mx-1"></div>
                <span className="text-green-600">valid till: {profileView.valid_till}</span>
                <div className="h-4 border-l-2 border-green-800 mx-1"></div>
                <span className="text-green-600">Password: {pass.Password}</span>

              </div>

              <div className="w-full border-t-2 border-blue-600 my-2"></div>
              <div className="w-full border-t-2 border-blue-600"></div>

              {/* Stats Grid */}
              <div className="mt-4 overflow-x-auto">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-2 min-w-[600px]">
                  {[
                    { count: profileView7.matchingprofile_count, label: "Matching Profile", onClick: `/UserMatchingProfiles?profileId=${profileId}` },
                    { count: profileView7.suggestedprofile_count, label: "Suggested Profile", onClick: `/suggestedProfiles?profileId=${profileId}` },
                    { count: profileView7.viewedprofile_count, label: "Viewed Profile", onClick: `/ViewedProfilesById?profileId=${profileId}` },
                    { count: profileView7.visitorprofile_count, label: "Visitor Profile", onClick: `/VisitorProfilesById?profileId=${profileId}` },
                    { count: profileView7.ctocsend_count, label: "C to C Sent", onClick: `/CToCSentProfiles?profileId=${profileId}` },
                    { count: profileView7.ctocreceived_count, label: "C to C Received", onClick: `/CToCReceivedProfiles?profileId=${profileId}` },
                    { count: profileView7.exp_int_sentcount, label: "EI Sent", onClick: `/ExpressInterestProfiles?profileId=${profileId}` },
                    { count: profileView7.exp_int_reccount, label: "EI Received", onClick: `/ExpressInterestReceivedProfiles?profileId=${profileId}` },
                    { count: profileView7.mutual_int_count, label: "Mutual Interest", onClick: `/ExpressInterestMutualProfiles?profileId=${profileId}` },
                    { count: profileView7.shortlisted_count, label: "Shortlisted" },
                    { count: profileView7.prsent_count, label: "PR Sent", onClick: `/ProfileSentTo?profileId=${profileId}` },
                    { count: profileView7.varequest_count, label: "VA Request", onClick: `/VysaAssist?profileId=${profileId}` },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`flex flex-col items-center text-center p-1 border-l-2 border-orange-500 ${item.onClick ? 'cursor-pointer' : ''}`}
                      onClick={item.onClick ? () => navigate(item.onClick) : undefined}
                    >
                      <span className="text-orange-500 text-sm sm:text-lg font-semibold">{item.count}</span>
                      <span className="text-blue-500 text-xs sm:text-sm">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full border-t-2 border-blue-600 my-2"></div>

              {/* Profile Completion */}
              <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
                <span className="text-green-600">
                  Profile Completion <span className="text-orange-500">{profileView.profile_completion}%</span>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                <Button
                  variant="contained"
                  size="small"
                  className="bg-blue-700 whitespace-nowrap"
                >
                  Matching Profiles
                </Button>

                <Button
                  variant="contained"
                  size="small"
                  className="bg-blue-700 whitespace-nowrap"
                  onClick={() => setOpenCallManagement(true)}
                >
                  Call Management
                </Button>

                <Button
                  variant="contained"
                  size="small"
                  className="bg-blue-700 whitespace-nowrap"
                  onClick={() => setOpenAdminDetails(true)}
                >
                  Admin Details
                </Button>

                <Button
                  variant="contained"
                  size="small"
                  className="bg-blue-700 whitespace-nowrap"
                  onClick={() => setOpenDataHistory(true)}
                >
                  Data History
                </Button>

                <Button
                  variant="contained"
                  size="small"
                  className="bg-blue-700 whitespace-nowrap"
                >
                  Invoice Generation
                </Button>
              </div>

              {/* Profile Info Sections */}
              <div className="mt-4 flex flex-col lg:flex-row gap-4">
                {/* Left Section */}
                <div className="flex-1">
                  <div className="mb-2">
                    <p className="text-black font-semibold">
                      Payment Info:
                      <span className="text-green-700 ml-1">
                        {profileView.payment_date}/{profileView.Package_name} /{profileView.add_on_pack_name}/{profileView.payment_mode}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-semibold text-black">Profile Status:</span>
                    <span className="text-[#000000e6]">{profileView.Package_name}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <span className="font-semibold text-black whitespace-nowrap">Membership Date:</span>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">From:</span>
                      <span className="text-[#000000e6]">
                        {watch('profileView.membership_fromdate')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">To:</span>
                      <span className="text-[#000000e6]">
                        {watch('profileView.membership_todate')}
                      </span>
                    </div>
                  </div>

                  {/* <div className="flex flex-wrap items-center gap-1 mb-2">
                    <span className="font-semibold text-black whitespace-nowrap">AddOn Packages:</span>
                    <span className="text-[#000000e6]">
                      {addonPackage.map(pkg => `${pkg.name}-${pkg.amount}`).join(', ')}
                    </span>
                  </div> */}

                  <div className="flex flex-wrap items-center gap-1 mb-2">
                    <span className="font-semibold text-black whitespace-nowrap">AddOn Packages:</span>
                    <span className="text-[#000000e6]">
                      {addonPackage
                        .filter(pkg => addOn?.includes(pkg.package_id.toString()))
                        .map(pkg => `${pkg.name}-${pkg.amount}`)
                        .join(', ')}
                    </span>
                  </div>


                  <div className="flex flex-wrap items-center gap-4 mb-2">
                    <span className="font-semibold text-black">
                      Visit Count No: <span className="font-normal">{profileView.visit_count}</span>
                    </span>
                  </div>
                  <div>

                    <span className="font-semibold text-black">
                      Exp Interest: <span className="font-normal">
                        {profileView.exp_int_lock === 1 ? "Yes" : "No"}
                        {profileView.exp_int_lock === 1 && (
                          <span className="ml-2 font-semibold">Exp No Count: <span className="font-normal">{profileView.exp_int_count}</span></span>
                        )}
                      </span>
                    </span>
                  </div>

                  {/* Mobile Verification */}
                  <div className="bg-[#DDDFFF] p-2 rounded mt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex items-center">
                        <span className="font-semibold mr-2">Mobile Number:</span>
                        <span className="text-red-500">{profileView.Mobile_no}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-semibold mr-2">Verification:</span>
                        <label className="ml-1 flex items-center">
                          <input
                            type="radio"
                            value="1"
                            {...register("mobile_otp_verify")}
                            checked={profileView.mobile_otp_verify === 1}
                            className="mr-1"
                          />
                          Yes
                        </label>
                        <label className="ml-3 flex items-center">
                          <input
                            type="radio"
                            value="0"
                            {...register("mobile_otp_verify")}
                            checked={profileView.mobile_otp_verify === 0}
                            className="mr-1"
                          />
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section - Admin Comments */}
                <div className="flex-1 max-w-full lg:max-w-md">
                  <textarea
                    value={profileView.Admin_comments}
                    placeholder="Enter Admin Comments..."
                    className="w-full h-32 sm:h-40 border-2 border-green-500 rounded-3xl p-4 text-black focus:outline-none focus:border-blue-700 transition duration-300 resize-none"
                  />

                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <label className="font-semibold">Horo Hint:</label>
                      <input
                        value={profileView.horoscope_hints}
                        type="text"
                        className="flex-1 border-2 border-blue-500 rounded-lg px-3 py-1 text-black focus:outline-none focus:border-blue-700"
                      />
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <label className="font-semibold">Admin Chevvai Dhosam:</label>
                      <span className="text-[#000000e6]">{profileView.calc_chevvai_dhosham}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="font-semibold">Admin Rahu/Kethu Dhosam:</label>
                      <span className="text-[#000000e6]">{profileView.calc_raguketu_dhosham}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <CallManagementModel
        open={openCallManagement}
        onClose={() => setOpenCallManagement(false)}
      />
      <AdminDetailsPopup
        open={OpenAdminDetails}
        onClose={() => setOpenAdminDetails(false)}
      />
      <DataHistoryPopup
        open={openDataHistory}
        onClose={() => setOpenDataHistory(false)}
      />
    </div>
  );
};

export default ViewProfile;
