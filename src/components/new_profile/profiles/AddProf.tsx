// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';

// import Input from '../../Fromfield/Inputfield';
// import AmsamGrid from '../../HoroDetails/AmsamGrid';
// import RasiGrid from '../../HoroDetails/RasiGrid';

// // Define Zod schema for validation
// const schema = z.object({
//   temp_profileid: z.string().nonempty('This field is required'),
//   Gender: z.enum(['Male', 'Female'], { errorMap: () => ({ message: 'Please select a gender' }) }),
//   Mobile_no: z.string().length(10, 'Mobile number must be 10 digits').regex(/^\d+$/, 'Invalid mobile number'),
//   EmailId: z.string().email('Invalid email address'),
//   Password: z.string().min(6, 'Password must be at least 6 characters'),
//   Profile_marital_status: z.string().nonempty('Please select your marital status'),
//   Profile_dob: z.string().nonempty('Date of birth is required'),
//   Profile_complexion: z.string().nonempty('Complexion is required'),
//   Profile_address: z.string().nonempty('Address is required'),
//   Profile_country: z.string().nonempty('Country is required'),
//   Profile_state: z.string().nonempty('State is required'),
//   Profile_city: z.string().nonempty('City is required'),
//   Profile_pincode: z.string().length(6, 'Pincode must be 6 digits').regex(/^\d+$/, 'Invalid pincode'),
//   father_name: z.string().nonempty('Father\'s name is required'),
//   father_occupation: z.string().nonempty('Father\'s occupation is required'),
//   mother_name: z.string().nonempty('Mother\'s name is required'),
//   mother_occupation: z.string().nonempty('Mother\'s occupation is required'),
//   family_name: z.string().nonempty('Family name is required'),
//   about_self: z.string().nonempty('This field is required'),
//   hobbies: z.string().nonempty('Hobbies are required'),
//   blood_group: z.string().nonempty('Blood group is required'),
//   Pysically_changed: z.enum(['Yes', 'No'], { errorMap: () => ({ message: 'This field is required' }) }),
//   property_details: z.string().nonempty('Property details are required'),
//   property_worth: z.string().nonempty('Property worth is required'),
//   suya_gothram: z.string().nonempty('Suya Gothram is required'),
//   uncle_gothram: z.string().nonempty('Uncle Gothram is required'),
//   ancestor_origin: z.string().nonempty('Ancestor origin is required'),
//   about_family: z.string().nonempty('About family is required'),
//   highest_education: z.string().nonempty('Highest education is required'),
//   ug_degeree: z.string().nonempty('UG Degree is required'),
//   about_edu: z.string().nonempty('About education is required'),
//   anual_income: z.string().nonempty('Annual income is required'),
//   actual_income: z.string().nonempty('actual_income income is required'),
//   work_country: z.string().nonempty('Work country is required'),
//   work_state: z.string().nonempty('Work state is required'),
//   work_pincode: z.string().length(6, 'Pincode must be 6 digits').regex(/^\d+$/, 'Invalid pincode'),
//   career_plans: z.string().nonempty('Career plans are required'),
//   timeOfBirth: z.string().nonempty('Time of Birth is required'),
//   placeOfBirth: z.string().nonempty('Place of Birth is required'),
//   birthStar: z.string().nonempty('Birth Star is required'),
//   rasi: z.string().nonempty('Rasi is required'),
//   lagnam: z.string().nonempty('Lagnam is required'),
//   chevvaiDhosam: z.string().nonempty('Chevvai Dhosam is required'),
//   sarpaDhosham: z.string().nonempty('Sarpa Dhosham is required'),
//   naalikai: z.string().nonempty('Naalikai is required'),
//   dasaName: z.string().nonempty('Dasa Name is required'),
//   day: z.string().nonempty('Day is required'),
//   month: z.string().nonempty('Month is required'),
//   year: z.string().nonempty('Year is required'),
//   horoscopeHints: z.string().nonempty('Horoscope Hints is required'),
// });

// interface MaritalStatusOption {
//   marital_sts_id: number;
//   marital_sts_name: string;
// }
// interface AnnualIncome {
//   income_id: number;
//   income_description: string;
// }

// interface BirthStar {
//   birth_id: number;
//   birth_star: string;
// }

// interface Rasi {
//   rasi_id: number;
//   rasi_name: string;
// }

// interface Lagnam {
//   didi_id: number;
//   didi_description: string;
// }

// const Forming = () => {
//   const { register, handleSubmit, formState: { errors }, reset } = useForm({
//     resolver: zodResolver(schema),
//   });

//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [highestEducations, setHighestEducations] = useState([]);
//   const [ugDegrees, setUgDegrees] = useState([]);
//   const [annualIncomes, setAnnualIncomes] = useState([]);
//   const [isBasicDetailsOpen, setIsBasicDetailsOpen] = useState(true);
//   const [isFamilyDetailsOpen, setIsFamilyDetailsOpen] = useState(true);
//   const [isPartnerPreferenceOpen, setIsPartnerPreferenceOpen] = useState(true);
//   const [maritalStatuses, setMaritalStatuses] = useState<MaritalStatusOption[]>([]);
//   const [isFeaturePreferenceOpen, setIsFeaturePreferenceOpen] = useState(true);
//   const [annualIncome, setAnnualIncome] = useState<AnnualIncome[]>([]);
//   const [isHoroscopeDetailsOpen, setIsHoroscopeDetailsOpen] = useState(true);

//   //grid
//   const [rasiContent, setRasiContent] = useState([]);
//   const [amsamContent, setAmsamContent] = useState([]);
//    //HoroScope

//    const [birthStar, setBirthStar] = useState<BirthStar[]>([]);
//    const [rasi, setRasiOptions] = useState<Rasi[]>([]);
//    const [lagnam, setLagnamOptions] = useState<Lagnam[]>([]);
//    const [selectedProfession, setSelectedProfession] = useState<string>('');

//   const toggleSection1 = () => {
//     setIsBasicDetailsOpen(!isBasicDetailsOpen);
//   }

//   const toggleSection2 = () => {
//     setIsFamilyDetailsOpen(!isFamilyDetailsOpen);
//   }

//   const toggleSection5 = () => {
//     setIsPartnerPreferenceOpen(!isPartnerPreferenceOpen);
//   }
//   const toggleSection4 = () => {
//     setIsHoroscopeDetailsOpen(!isHoroscopeDetailsOpen);
//   }
//   const toggleSection6 = () => {
//     setIsFeaturePreferenceOpen(!isFeaturePreferenceOpen);
//   }

//   const onRasiContentsChange = (newContent: React.SetStateAction<never[]>) => {
//     setRasiContent(newContent);
//   };

//   const onAmsamContentsChange = (newContent: React.SetStateAction<never[]>) => {
//     setAmsamContent(newContent);
//   }

//   useEffect(() => {
//     const fetchMaritalStatuses = async () => {
//       try {
//         const response = await axios.post<{
//           [key: string]: MaritalStatusOption;
//         }>(' https://app.vysyamala.com/auth/Get_Marital_Status/');
//         const options = Object.values(response.data);
//         setMaritalStatuses(options);
//       } catch (error) {
//         console.error('Error fetching marital statuses:', error);
//       }
//     };
//     fetchMaritalStatuses();
//   }, []);

//   //AnnualIncome
//   useEffect(() => {
//     const fetchAnnualIncome = async () => {
//       try {
//         const response = await axios.post(` https://app.vysyamala.com/auth/Get_Annual_Income/`);
//         const options = Object.values(response.data) as AnnualIncome[];
//         setAnnualIncome(options);
//       } catch (error) {
//         console.error("Error fetching Annual Income  options:", error);
//       }
//     };
//     fetchAnnualIncome();
//   }, []);

//   //Birthstar
//   useEffect(() => {
//     const fetchBirthStar = async () => {
//       try {
//         const response = await axios.post(` https://app.vysyamala.com/auth/Get_Birth_Star/`, { state_id: " " });
//         const options = Object.values(response.data) as BirthStar[];
//         setBirthStar(options);
//       } catch (error) {
//         console.error("Error fetching birth star options:", error);
//       }
//     };
//     fetchBirthStar();
//   }, []);

//   //Rasi
//   const [selectedBirthStarId, setSelectedBirthStarId] = useState<string>('');

//   const handleBirthStarChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedId = e.target.value;
//     setSelectedBirthStarId(selectedId);
//     console.log('Selected Birth Star ID:', selectedId);
//   };

//   useEffect(() => {
//     if (selectedBirthStarId) {
//       const fetchStateStatus = async () => {
//         try {
//           const response = await axios.post(` https://app.vysyamala.com/auth/Get_Rasi/`, { birth_id: selectedBirthStarId });
//           const options = Object.values(response.data) as Rasi[];
//           setRasiOptions(options);
//         } catch (error) {
//           console.error("Error fetching rasi options:", error);
//         }
//       };
//       fetchStateStatus();
//     }
//   }, [selectedBirthStarId]);

//   //Lagnam

//   useEffect(() => {
//     const fetchLagnam = async () => {
//       try {
//         const response = await axios.post(` https://app.vysyamala.com/auth/Get_Lagnam_Didi/`);
//         const options = Object.values(response.data) as Lagnam[];
//         setLagnamOptions(options);
//       } catch (error) {
//         console.error("Error fetching Laganam options:", error);
//       }
//     };
//     fetchLagnam();
//   }, []);

//   const onSubmit = async (data) => {
//     console.log("Form Submitted Data:", data); // Debug log for form data

//     try {
//       const loginDetailsResponse = await axios.post('https://app.vysyamala.com/api/logindetails/', data, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const profileId = loginDetailsResponse.data.ProfileId;

//       console.log("Profile ID:", profileId); // Debug log for profile ID

//       // Log the payload being sent for profile-edudetails
//       const educationPayload = {
//         profile_id: profileId,
//         ...data,
//       };
//       console.log("Education Payload:", educationPayload);

//       await axios.post('https://app.vysyamala.com/api/profile-edudetails/', educationPayload, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         await axios.post('https://app.vysyamala.com/api/profile-partner-pref/', {
//           profile_id: profileId,
//           ...data,
//         }, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//       alert('Profile created successfully');
//       reset();  // Reset the form after successful submission
//     } catch (error) {
//       console.error('Error creating profile:', error);
//       if (error.response) {
//         console.error('Error response data:', error.response.data);
//         alert(`Error creating profile: ${JSON.stringify(error.response.data)}`);
//       } else {
//         alert('Error creating profile. Please check the console for more details.');
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await axios.get('https://app.vysyamala.com/api/api/countries/');
//         setCountries(response.data);
//       } catch (error) {
//         console.error("Error fetching countries:", error);
//       }
//     };

//     fetchCountries();
//   }, []);

//   useEffect(() => {
//     const fetchStates = async () => {
//       try {
//         const response = await axios.get('https://app.vysyamala.com/api/api/states/');
//         setStates(response.data);
//       } catch (error) {
//         console.error("Error fetching states:", error);
//       }
//     };

//     fetchStates();
//   }, []);

//   useEffect(() => {
//     const fetchHighestEducations = async () => {
//       try {
//         const response = await axios.get('https://app.vysyamala.com/api/api/highest-educations/');
//         setHighestEducations(response.data);
//       } catch (error) {
//         console.error("Error fetching highest educations:", error);
//       }
//     };

//     fetchHighestEducations();

//     const fetchUgDegrees = async () => {
//       try {
//         const response = await axios.get('https://app.vysyamala.com/api/api/ug-degrees/');
//         setUgDegrees(response.data);
//       } catch (error) {
//         console.error("Error fetching UG degrees:", error);
//       }
//     };

//     fetchUgDegrees();

//     const fetchAnnualIncomes = async () => {
//       try {
//         const response = await axios.get('https://app.vysyamala.com/api/api/annual-incomes/');
//         setAnnualIncomes(response.data);
//       } catch (error) {
//         console.error("Error fetching annual incomes:", error);
//       }
//     };

//     fetchAnnualIncomes();
//   }, []);

//   return (
//     <div>
//       <form className="bg-white p-5 mb-10" onSubmit={handleSubmit(onSubmit)}>
//         <div className="flex flex-col gap-5">
//       <h4 className="text-red-600 flex row items-center justify-between text-xl font-semibold text-black dark:text-white cursor-pointer  after-red-line::after" onClick={toggleSection1}>
//             Basic Details
//             <svg className={`fill-current transform ${isBasicDetailsOpen ? 'rotate-180' : ''}`} width={"20"} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z" fill=""></path></svg>
//           </h4>

//           {/* Basic Details Form Fields */}
//           <div className="flex w-full flex-row gap-4">
//             <div className="w-2/4">
//               <Input label={"Profile ID"} name="temp_profileid" {...register('temp_profileid')} />
//               {errors.temp_profileid && <span className="text-red-500">{errors.temp_profileid.message}</span>}
//             </div>
//             <div className="w-2/4 py-1">
//               <label className="block text-black font-medium mb-1">Select Gender</label>
//               <input
//                 type="radio"
//                 value="Male"
//                 name="Gender"
//                 {...register('Gender')}
//               />
//               <label className="text-black px-4">Male</label>
//               <input
//                 type="radio"
//                 value="Female"
//                 name="Gender"
//                 {...register('Gender')}
//               />
//               <label className="text-black px-4">Female</label>
//               {errors.Gender && <span className="text-red-500">{errors.Gender.message}</span>}
//             </div>
//           </div>

//           <div className="flex w-full flex-row gap-4">
//             <div className="w-2/4">
//               <Input label={"Mobile Number"} name="Mobile_no" {...register('Mobile_no')} />
//               {errors.Mobile_no && <span className="text-red-500">{errors.Mobile_no.message}</span>}
//             </div>
//             <div className="w-2/4">
//               <Input label={"Email"} name="EmailId" {...register('EmailId')} />
//               {errors.EmailId && <span className="text-red-500">{errors.EmailId.message}</span>}
//             </div>
//           </div>
//           <div className="flex w-full flex-row gap-4">
//             <div className="w-full">
//               <Input label={"Create Password"} name="Password" {...register('Password')} />
//               {errors.Password && <span className="text-red-500">{errors.Password.message}</span>}
//             </div>
//             <div className="w-full">
//               <label className="block text-black font-medium mb-1">Select your Marital Status</label>
//               <select
//                 name="Profile_marital_status"
//                 className="outline-none w-full px-4 py-2 border border-black rounded"
//                 {...register('Profile_marital_status')}
//               >
//                 <option value="">Select your Marital Status</option>
//                 <option value="Divorced">Divorced</option>
//                 <option value="Not married">Not married</option>
//                 <option value="Widow">Widow</option>
//                 <option value="Widower">Widower</option>
//               </select>
//               {errors.Profile_marital_status && <span className="text-red-500">{errors.Profile_marital_status.message}</span>}
//             </div>
//           </div>

//           <div className="flex w-full flex-row gap-4">
//             <div className="w-2/4">
//               <Input label={"Date of Birth"} type={"date"} name="Profile_dob" {...register('Profile_dob')} />
//               {errors.Profile_dob && <span className="text-red-500">{errors.Profile_dob.message}</span>}
//             </div>
//             <div className="w-2/4">
//               <Input label={"Complexion"} type={"text"} name="Profile_complexion" {...register('Profile_complexion')} />
//               {errors.Profile_complexion && <span className="text-red-500">{errors.Profile_complexion.message}</span>}
//             </div>
//           </div>

//           <div className="flex w-full flex-row gap-4">
//             <div className="w-full">
//               <Input label={"Address"} name="Profile_address" {...register('Profile_address')} />
//               {errors.Profile_address && <span className="text-red-500">{errors.Profile_address.message}</span>}
//             </div>
//             <div className="w-full">
//               <label className="block text-black font-medium mb-1">Country</label>
//               <select
//                 name="Profile_country"
//                 className="outline-none w-full px-4 py-2 border border-black rounded"
//                 {...register('Profile_country')}
//               >
//                 <option value="">Country</option>
//                 {countries.map((education) => (
//                   <option key={education.id} value={education.name}>
//                     {education.name}
//                   </option>
//                 ))}
//               </select>
//               {errors.Profile_country && <span className="text-red-500">{errors.Profile_country.message}</span>}
//             </div>
//           </div>
//           <div className="flex w-full flex-row gap-4">
//             <div className="w-full">
//               <label className="block text-black font-medium mb-1">State (Based on country selection)</label>
//               <select
//                 name="Profile_state"
//                 className="outline-none w-full px-4 py-2 border border-black rounded"
//                 {...register('Profile_state')}
//               >
//                 <option value="">Select your state</option>
//                 {states.map((state) => (
//                   <option key={state.id} value={state.name}>
//                     {state.name}
//                   </option>
//                 ))}
//               </select>
//               {errors.Profile_state && <span className="text-red-500">{errors.Profile_state.message}</span>}
//             </div>

//             <div className="w-full">
//               <label className="block text-black font-medium mb-1">City</label>
//               <select
//                 name="Profile_city"
//                 className="outline-none w-full px-4 py-2 border border-black rounded"
//                 {...register('Profile_city')}
//               >
//                 <option value="">Select your City</option>
//                 <option value="option 1">option 1</option>
//                 <option value="option 2">option 2</option>
//                 <option value="option 3">option 3</option>
//               </select>
//               {errors.Profile_city && <span className="text-red-500">{errors.Profile_city.message}</span>}
//             </div>
//           </div>
//           <div className="flex w-full flex-row gap-4">
//             <div className="w-full">
//               <Input label={"Pincode"} type={"text"} name="Profile_pincode" {...register('Profile_pincode')} />
//               {errors.Profile_pincode && <span className="text-red-500">{errors.Profile_pincode.message}</span>}
//             </div>
//           </div>
//         </div>

//         <h4 className="text-xl font-semibold text-black dark:text-white mb-4">Family Details</h4>
//         <div className="flex flex-col gap-5">
//           {/* Family Details Form Fields */}
//           <div className="flex w-full flex-row gap-4">
//             <div className="w-full">
//               <Input label={"Father name"} name="father_name" {...register('father_name')} />
//               {errors.father_name && <span className="text-red-500">{errors.father_name.message}</span>}
//             </div>
//             <div className="w-full">
//               <label className="block text-black font-medium mb-1">Father Occupation</label>
//               <select
//                 name="father_occupation"
//                 className="outline-none w-full px-4 py-2 border border-black rounded"
//                 {...register('father_occupation')}
//               >
//                 <option value="">Father Occupation</option>
//                 <option value="01">01</option>
//               </select>
//               {errors.father_occupation && <span className="text-red-600">{errors.father_occupation.message}</span>}
//             </div>
//           </div>
//           <div className="flex w-full flex-row gap-4">
//             <div className="w-full">
//               <Input label={"Mother name"} name="mother_name" {...register('mother_name')} />
//               {errors.mother_name && <span className="text-red-500">{errors.mother_name.message}</span>}
//             </div>
//             <div className="w-full">
//               <label className="block text-black font-medium mb-1">Mother Occupation</label>
//               <select
//                 name="mother_occupation"
//                 className="outline-none w-full px-4 py-2 border border-black rounded"
//                 {...register('mother_occupation')}
//               >
//                 <option value="">Mother Occupation</option>
//                 <option value="02">02</option>
//               </select>
//               {errors.mother_occupation && <span className="text-red-600">{errors.mother_occupation.message}</span>}
//             </div>
//           </div>
//           <div className="flex w-full flex-row gap-4">
//             <div className="w-full">
//               <Input label={"Family name"} type={"text"} name="family_name" {...register('family_name')} />
//               {errors.family_name && <span className="text-red-500">{errors.family_name.message}</span>}
//             </div>
//             <div className="w-full">
//               <Input label={"About Myself"} type={"text"} name="about_self" {...register('about_self')} />
//               {errors.about_self && <span className="text-red-500">{errors.about_self.message}</span>}
//             </div>
//           </div>

//           <div className="flex w-full flex-row gap-4">
//             <div className="w-full">
//               <Input label={"My Hobbies"} type={"text"} name="hobbies" {...register('hobbies')} />
//               {errors.hobbies && <span className="text-red-500">{errors.hobbies.message}</span>}
//             </div>
//             <div className="w-full">
//               <Input label={"Blood Group"} type={"text"} name="blood_group" {...register('blood_group')} />
//               {errors.blood_group && <span className="text-red-500">{errors.blood_group.message}</span>}
//             </div>
//           </div>
//           <div className="flex w-full flex-row gap-4">
//             <div className="w-full py-1">
//               <label className="block text-black font-medium mb-1">Physically Challenged</label>
//               <input
//                 type="radio"
//                 value="Yes"
//                 name="Pysically_changed"
//                 {...register('Pysically_changed')}
//               />
//               <label className="text-black px-4">Yes</label>
//               <input
//                 type="radio"
//                 value="No"
//                 name="Pysically_changed"
//                 {...register('Pysically_changed')}
//               />
//               <label className="text-black px-4">No</label>
//               {errors.Pysically_changed && <span className="text-red-600">{errors.Pysically_changed.message}</span>}
//             </div>
//             <div className="w-full">
//               <Input label={"Property Details"} type={"text"} name="property_details" {...register('property_details')} />
//               {errors.property_details && <span className="text-red-500">{errors.property_details.message}</span>}
//             </div>
//           </div>
//           <div className="flex w-full flex-row gap-4">
//             <div className="w-full">
//               <label className="block text-black font-medium mb-1">Property Worth</label>
//               <select
//                 name="property_worth"
//                 className="outline-none w-full px-4 py-2 border border-black rounded"
//                 {...register('property_worth')}
//               >
//                 <option value="">Select property worth</option>
//                 <option value="Residential Property">Residential Property</option>
//                 <option value="Commercial Property">Commercial Property</option>
//                 <option value="Industrial Property">Industrial Property</option>
//                 <option value="Agricultural Land">Agricultural Land</option>
//                 <option value="Vacant Land">Vacant Land</option>
//               </select>
//               {errors.property_worth && <span className="text-red-600">{errors.property_worth.message}</span>}
//             </div>
//             <div className="w-full">
//               <Input label={"Suya Gothram"} name="suya_gothram" {...register('suya_gothram')} />
//               {errors.suya_gothram && <span className="text-red-500">{errors.suya_gothram.message}</span>}
//             </div>
//           </div>
//           <div className="flex w-full flex-row gap-4">
//             <div className="w-full">
//               <Input label={"Uncle Gothram"} type={"text"} name="uncle_gothram" {...register('uncle_gothram')} />
//               {errors.uncle_gothram && <span className="text-red-500">{errors.uncle_gothram.message}</span>}
//             </div>
//             <div className="w-full">
//               <Input label={"Ancestor Origin"} type={"text"} name="ancestor_origin" {...register('ancestor_origin')} />
//               {errors.ancestor_origin && <span className="text-red-500">{errors.ancestor_origin.message}</span>}
//             </div>
//           </div>
//           <div className="flex w-full flex-row gap-4">
//             <div className="w-full">
//               <label className="block text-black font-medium mb-1">About my Family</label>
//               <textarea
//                 className="outline-none w-full px-4 py-2 border border-black rounded"
//                 name="about_family"
//                 {...register('about_family')}
//               ></textarea>
//               {errors.about_family && <span className="text-red-600">{errors.about_family.message}</span>}
//             </div>
//           </div>
//         </div>

//         <h4 className="text-xl font-semibold text-black dark:text-white mb-4">Education Details</h4>
//         <div className="flex flex-col gap-5">
//           {/* Education Details Form Fields */}
//           <div className="flex w-full flex-row gap-4">
//             <div className="w-full">
//               <label className="block text-black font-medium mb-1">Highest Education Level *</label>
//               <select
//                 name="highest_education"
//                 className="outline-none w-full px-4 py-2 border border-black rounded"
//                 {...register('highest_education')}
//               >
//                 <option value="">Select education level</option>
//                 {highestEducations.map((education) => (
//                   <option key={education.id} value={education.degree}>
//                     {education.degree}
//                   </option>
//                 ))}
//               </select>
//               {errors.highest_education && <span className="text-red-500">{errors.highest_education.message}</span>}
//             </div>
//             <div className="w-full">
//               <label className="block text-black font-medium mb-1">UG Degree (Only if masters selected in highest education)</label>
//               <select
//                 name="ug_degeree"
//                 className="outline-none w-full px-4 py-2 border border-black rounded"
//                 {...register('ug_degeree')}
//               >
//                 <option value="">Select education level</option>
//                 {ugDegrees.map((education) => (
//                   <option key={education.id} value={education.degree}>
//                     {education.degree}
//                   </option>
//                 ))}
//               </select>
//               {errors.ug_degeree && <span className="text-red-500">{errors.ug_degeree.message}</span>}
//             </div>
//           </div>
//           <div className="flex w-full flex-row gap-4">
//             <Input label={"About your Education *"} name="about_edu" {...register('about_edu')} />
//             <div className="w-full">
//               <label className="block text-black font-medium mb-1">Annual Income</label>
//               <select
//                 name="anual_income"
//                 className="outline-none w-full px-4 py-2 border border-black rounded"
//                 {...register('anual_income')}
//               >
//                 <option value="">Annual Income</option>
//                 {annualIncomes.map((education) => (
//                   <option key={education.id} value={education.income}>
//                     {education.income}
//                   </option>
//                 ))}
//               </select>
//               {errors.anual_income && <span className="text-red-500">{errors.anual_income.message}</span>}
//             </div>
//           </div>
//           <div className="flex w-full flex-row gap-4">
//             <Input label={"Actual Income"} name="actual_income" {...register('actual_income')} />
//           </div>
//           <h4 className="text-xl font-semibold text-black dark:text-white">Work Location</h4>
//           <div className="flex w-full flex-row gap-4">
//             <div className="w-full">
//               <label className="block text-black font-medium mb-1">Country *</label>
//               <select
//                 name="work_country"
//                 className="outline-none w-full px-4 py-2 border border-black rounded"
//                 {...register('work_country')}
//               >
//                 <option value="">Country</option>
//                 {countries.map((education) => (
//                   <option key={education.id} value={education.name}>
//                     {education.name}
//                   </option>
//                 ))}
//               </select>
//               {errors.work_country && <span className="text-red-500">{errors.work_country.message}</span>}
//             </div>
//             <div className="w-full">
//               <label className="block text-black font-medium mb-1">State * (Based on country selection)</label>
//               <select
//                 name="work_state"
//                 className="outline-none w-full px-4 py-2 border border-black rounded"
//                 {...register('work_state')}
//               >
//                 <option value="">Select your state</option>
//                 {states.map((state) => (
//                   <option key={state.id} value={state.name}>
//                     {state.name}
//                   </option>
//                 ))}
//               </select>
//               {errors.work_state && <span className="text-red-500">{errors.work_state.message}</span>}
//             </div>
//           </div>
//           <div className="flex w-full flex-row gap-4">
//             <Input label={"Pincode (Based on Country Selection)"} name="work_pincode" {...register('work_pincode')} />
//           </div>
//           <div className="flex w-full flex-row gap-4">
//             <div className="w-full">
//               <label className="block text-black font-medium mb-1">Career Plans / Notes</label>
//               <textarea
//                 className="outline-none w-full px-4 py-2 border border-black rounded"
//                 name="career_plans"
//                 {...register('career_plans')}
//               ></textarea>
//               {errors.career_plans && <span className="text-red-500">{errors.career_plans.message}</span>}
//             </div>
//           </div>
//         </div>
//         {/* Family Details */}
//         <div className='bg-white p-5 mb-10 rounded shadow-md '>
//           <h4 className="text-red-600 flex row items-center justify-between text-xl font-semibold text-black dark:text-white cursor-pointer  after-red-line::after" onClick={toggleSection2}>
//             Family Details
//             <svg className={`fill-current transform ${isFamilyDetailsOpen ? 'rotate-180' : ''}`} width={"20"} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z" fill=""></path></svg>
//           </h4>

//           <div className="flex gap-4">
//         <div className="flex-1">
//           <label htmlFor="father_name" className="block text-black font-medium mb-1">
//             Father Name
//           </label>
//           <input
//             id="father_name"
//             type="text"
//             {...register('father_name', { required: 'Father name is required' })}
//             className="outline-none w-full px-4 py-2 border border-black rounded"
//           />

//         </div>

//         <div className="flex-1">
//           <label htmlFor="father_occupation" className="block text-black font-medium mb-1">
//             Father Occupation
//           </label>
//           <select
//             id="father_occupation"
//             {...register('father_occupation', { required: 'Father occupation is required' })}
//             className="outline-none w-full px-4 py-2 border border-black rounded"
//           >
//             <option value="" disabled>
//               Select Occupation
//             </option>

//           </select>

//         </div>
//         </div>
// <div className="flex w-full flex-row gap-4">
//         <div className="w-full">
//           <label className="block text-black font-medium mb-1">Mother Name</label>
//           <input
//             {...register('mother_name', { required: 'Mother name is required' })}
//             className="outline-none w-full px-4 py-2 border border-black rounded"
//           />

//         </div>
//         <div className="w-full">
//           <label className="block text-black font-medium mb-1">
//             Mother Occupation
//           </label>
//           <select
//             {...register('mother_occupation', { required: 'Mother occupation is required' })}
//             className="outline-none w-full px-4 py-2 border border-black rounded"
//           >
//             <option value="" disabled selected>
//               -- Select Occupation --
//             </option>

//           </select>

//         </div>
//       </div>
//       <div className="flex w-full flex-row gap-4">
//         <div className="w-full">
//           <label className="block text-black font-medium mb-1">Family Name</label>
//           <input
//             type="text"
//             {...register('family_name', { required: 'Family name is required' })}
//              className="outline-none w-full px-4 py-2 border border-black rounded"
//           />
//           {errors.family_name && (
//             <span className="text-red-500">{errors.family_name.message}</span>
//           )}
//         </div>
//         <div className="w-full">
//           <label className="block text-black font-medium mb-1">About Myself</label>
//           <input
//             type="text"
//             {...register('about_self', { required: 'This field is required' })}
//              className="outline-none w-full px-4 py-2 border border-black rounded"
//           />
//           {errors.about_self && (
//             <span className="text-red-500">{errors.about_self.message}</span>
//           )}
//         </div>
//       </div>

//       <div className="flex w-full flex-row gap-4">
//         <div className="w-full">
//           <label className="block text-black font-medium mb-1">My Hobbies</label>
//           <input
//             type="text"
//             {...register('hobbies', { required: 'This field is required' })}
//              className="outline-none w-full px-4 py-2 border border-black rounded"
//           />
//           {errors.hobbies && (
//             <span className="text-red-500">{errors.hobbies.message}</span>
//           )}
//         </div>
//         <div className="w-full">
//           <label className="block text-black font-medium mb-1">Blood Group</label>
//           <input
//             type="text"
//             {...register('blood_group', { required: 'This field is required' })}
//              className="outline-none w-full px-4 py-2 border border-black rounded"
//           />
//           {errors.blood_group && (
//             <span className="text-red-500">{errors.blood_group.message}</span>
//           )}
//         </div>
//       </div>

//       <div className="flex w-full flex-row gap-4">
//         <div className="w-full py-1">
//           <label className="block text-black font-medium mb-1">
//             Physically Challenged
//           </label>
//           <label className="text-black px-4">
//             <input
//               type="radio"
//               value="Yes"
//               {...register('physically_challenged', { required: 'This field is required' })}
//               className="mr-2"
//             />
//             Yes
//           </label>
//           <label className="text-black px-4">
//             <input
//               type="radio"
//               value="No"
//               {...register('physically_challenged', { required: 'This field is required' })}
//               className="mr-2"
//             />
//             No
//           </label>
//           {errors.physically_challenged && (
//             <span className="text-red-600">
//               {errors.physically_challenged.message}
//             </span>
//           )}
//         </div>

//         <div className="w-full">
//           <label className="block text-black font-medium mb-1">Property Details</label>
//           <input
//             type="text"
//             {...register('property_details', { required: 'This field is required' })}
//              className="outline-none w-full px-4 py-2 border border-black rounded"
//           />
//           {errors.property_details && (
//             <span className="text-red-500">{errors.property_details.message}</span>
//           )}
//         </div>
//       </div>
// </div>

// <h4
//         className="text-red-600 flex row items-center justify-between text-xl font-semibold text-black dark:text-white cursor-pointer"
//         onClick={toggleSection5}
//       >
//         Partner Preference
//         <svg
//           className={`fill-current transform ${isPartnerPreferenceOpen ? 'rotate-180' : ''}`}
//           width="20"
//           viewBox="0 0 20 20"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             fillRule="evenodd"
//             clipRule="evenodd"
//             d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
//             fill=""
//           />
//         </svg>
//       </h4>

//       {isPartnerPreferenceOpen && (
//         <div className="flex flex-col gap-5">
//           <div className="flex w-full flex-row gap-4 pt-2">
//             <div className="w-full">
//               <label className="block text-black font-medium mb-1">Height from</label>
//               <input
//                 type="text"
//                 {...register('from_month', { required: 'Height from is required' })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded"
//               />
//               {errors.from_month && (
//                 <span className="text-red-500">{errors.from_month.message}</span>
//               )}
//             </div>

//             <div className="w-full">
//               <label className="block text-black font-medium mb-1">Height To</label>
//               <input
//                 type="text"
//                 {...register('from_year', { required: 'Height To is required' })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded"
//               />
//               {errors.from_year && (
//                 <span className="text-red-500">{errors.from_year.message}</span>
//               )}
//             </div>

//             <div className="w-full">
//               <label className="block text-black font-medium mb-1">Age Preference</label>
//               <input
//                 type="text"
//                 {...register('age_pref', { required: 'Age Preference is required' })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded"
//               />
//               {errors.age_pref && (
//                 <span className="text-red-500">{errors.age_pref.message}</span>
//               )}
//             </div>
//           </div>

//           <div className="flex w-full flex-row gap-4">
//             <div className="w-full">
//               <label className="block text-black font-medium mb-1">Height Preference</label>
//               <input
//                 type="text"
//                 {...register('pref_height_from', { required: 'Height Preference is required' })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded"
//               />
//               {errors.pref_height_from && (
//                 <span className="text-red-500">{errors.pref_height_from.message}</span>
//               )}
//             </div>

//             <div className="w-full">
//               <label className="block text-black font-medium mb-1">Chevvai</label>
//               <select
//                 {...register('pref_chevvai')}
//                 className="outline-none w-full px-4 py-2 border border-black rounded"
//               >
//                 <option value="">Chevvai</option>
//                 <option value="Yes">Yes</option>
//                 <option value="No">No</option>
//               </select>
//             </div>

//             <div className="w-full">
//               <label className="block text-black font-medium mb-1">Rehu / Ketu</label>
//               <select
//                 {...register('pref_ragukethu')}
//                 className="outline-none w-full px-4 py-2 border border-black rounded"
//               >
//                 <option value="">Rehu / Ketu</option>
//                 <option value="Yes">Yes</option>
//                 <option value="No">No</option>
//               </select>
//             </div>
//           </div>

//           <div className="flex w-full flex-row gap-4">
//             <div className="w-full">
//               <label className="block text-black font-medium mb-1">Foreign Interest</label>
//               <select
//                 {...register('pref_foreign_intres')}
//                 className="outline-none w-full px-4 py-2 border border-black rounded"
//               >
//                 <option value="">Foreign Interest</option>
//                 <option value="Both">Both</option>
//                 <option value="Yes">Yes</option>
//                 <option value="No">No</option>
//               </select>
//             </div>
//           </div>

//           <div className="w-full">
//             <h5 className="text-[18px] text-black font-semibold mb-2">Profession</h5>
//             <div className="flex justify-between items-center">
//               <div>
//                 <input
//                   type="checkbox"
//                   id="employed"
//                   {...register('pref_profession')}
//                   value="employed"
//                 />
//                 <label htmlFor="employed" className="pl-1">
//                   Employed
//                 </label>
//               </div>
//               <div>
//                 <input
//                   type="checkbox"
//                   id="business"
//                   {...register('pref_profession')}
//                   value="business"
//                 />
//                 <label htmlFor="business" className="pl-1">
//                   Business
//                 </label>
//               </div>
//               <div>
//                 <input
//                   type="checkbox"
//                   id="student"
//                   {...register('pref_profession')}
//                   value="student"
//                 />
//                 <label htmlFor="student" className="pl-1">
//                   Student
//                 </label>
//               </div>
//               <div>
//                 <input
//                   type="checkbox"
//                   id="notWorking"
//                   {...register('pref_profession')}
//                   value="notWorking"
//                 />
//                 <label htmlFor="notWorking" className="pl-1">
//                   Not Working
//                 </label>
//               </div>
//               <div>
//                 <input
//                   type="checkbox"
//                   id="notMentioned"
//                   {...register('pref_profession')}
//                   value="notMentioned"
//                 />
//                 <label htmlFor="notMentioned" className="pl-1">
//                   Not Mentioned
//                 </label>
//               </div>
//             </div>
//           </div>

//           <div>
//             <h5 className="text-[18px] text-black font-semibold mb-2">Marital Status</h5>
//             <div className="flex justify-between items-center">
//               {maritalStatuses.map((status) => (
//                 <div key={status.marital_sts_id} className="flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     id={`maritalStatus-${status.marital_sts_id}`}
//                     {...register('marital_status')}
//                     value={status.marital_sts_id.toString()}
//                   />
//                   <label htmlFor={`maritalStatus-${status.marital_sts_id}`}>
//                     {status.marital_sts_name}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>

//            {/* Annual Income */}
//            <div>
//               <label className="text-[18px] text-black font-semibold mb-2">Annual Income</label>
//               <div className="grid grid-rows-1 grid-cols-4">
//                 {annualIncome.map((option) => (
//                   <div key={option.income_id} className="mb-2">
//                     <input
//                       type="checkbox"
//                       id={`annualIncomee-${option.income_id}`}
//                       {...register('annualIncome')}
//                       value={option.income_id.toString()}
//                     />
//                     <label htmlFor={`annualIncomee-${option.income_id}`} className="pl-1">{option.income_description}</label>
//                   </div>
//                 ))}
//               </div>
//               {errors.annualIncome && <span className="text-red-500">{errors.annualIncome.message}</span>}
//             </div>
//         </div>

//       )}

// <div className='bg-white p-5 mb-10 rounded shadow-md'>
//         <h4 className="text-red-600 flex row items-center justify-between text-xl font-semibold text-black dark:text-white" onClick={toggleSection6}>
//           Feature Preference{' '}
//           <svg className={`fill-current transform ${isFeaturePreferenceOpen ? 'rotate-180' : ''}`} width={"20"} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z" fill=""></path></svg>
//         </h4>

//         {isFeaturePreferenceOpen && (
//           <div className="flex flex-col gap-5 pt-2">
//             {/* Height Inputs */}
//             <div className="flex w-full flex-row gap-4">
//               <div className="w-full">
//                 <label>Height from</label>
//                 <input {...register('heightFrom')} className="w-full px-4 py-2 border border-black rounded" />
//                 {errors.heightFrom && <span className="text-red-500">{errors.heightFrom.message}</span>}
//               </div>
//               <div className="w-full">
//                 <label>Height to</label>
//                 <input {...register('heightTo')} className="w-full px-4 py-2 border border-black rounded" />
//                 {errors.heightTo && <span className="text-red-500">{errors.heightTo.message}</span>}
//               </div>
//               <div className="w-full">
//                 <label>Age Preference</label>
//                 <input {...register('agePreference')} className="w-full px-4 py-2 border border-black rounded" />
//                 {errors.agePreference && <span className="text-red-500">{errors.agePreference.message}</span>}
//               </div>
//             </div>

//             {/* Other Inputs */}
//             <div className="flex w-full flex-row gap-4">
//               <div className="w-full">
//                 <label>Height Preference</label>
//                 <input {...register('heightPreference')} className="w-full px-4 py-2 border border-black rounded" />
//                 {errors.heightPreference && <span className="text-red-500">{errors.heightPreference.message}</span>}
//               </div>
//               <div className="w-full">
//                 <label>Chevvai</label>
//                 <select {...register('chevvai')} className="w-full px-4 py-2 border border-black rounded">
//                   <option value="">Select</option>
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                 </select>
//                 {errors.chevvai && <span className="text-red-500">{errors.chevvai.message}</span>}
//               </div>
//               <div className="w-full">
//                 <label>Rehu / Ketu</label>
//                 <select {...register('rehuKetu')} className="w-full px-4 py-2 border border-black rounded">
//                   <option value="">Select</option>
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                 </select>
//                 {errors.rehuKetu && <span className="text-red-500">{errors.rehuKetu.message}</span>}
//               </div>
//             </div>

//             <div className="flex w-full flex-row gap-4">
//               <div className="w-full">
//                 <label>Foreign Interest</label>
//                 <select {...register('foreignInterest')} className="w-full px-4 py-2 border border-black rounded">
//                   <option value="">Select</option>
//                   <option value="Both">Both</option>
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                 </select>
//                 {errors.foreignInterest && <span className="text-red-500">{errors.foreignInterest.message}</span>}
//               </div>
//             </div>

//             {/* Profession Checkboxes */}
//             <div className="w-full">
//               <h5 className="text-[18px] text-black font-semibold mb-2">Profession</h5>
//               <div className="flex justify-between items-center">
//                 {['employed', 'business', 'student', 'notWorking', 'notMentioned'].map((profession) => (
//                   <div key={profession}>
//                     <input
//                       type="checkbox"
//                       id={`profession-${profession}`}
//                       {...register('professionPreference')}
//                       value={profession}
//                     />
//                     <label htmlFor={`profession-${profession}`} className="pl-1">{profession}</label>
//                   </div>
//                 ))}
//               </div>
//               {errors.professionPreference && <span className="text-red-500">{errors.professionPreference.message}</span>}
//             </div>

//             {/* Marital Status */}
//             <div>
//               <h5 className="text-[18px] text-black font-semibold mb-2">Marital Status</h5>
//               <div className="flex justify-between items-center">
//                 {maritalStatuses.map((status) => (
//                   <div key={status.marital_sts_id}>
//                     <input
//                       type="checkbox"
//                       id={`maritalStatus-${status.marital_sts_id}`}
//                       {...register('maritalStatus')}
//                       value={status.marital_sts_id.toString()}
//                     />
//                     <label htmlFor={`maritalStatus-${status.marital_sts_id}`}>{status.marital_sts_name}</label>
//                   </div>
//                 ))}
//               </div>
//               {errors.maritalStatus && <span className="text-red-500">{errors.maritalStatus.message}</span>}
//             </div>

//             {/* Annual Income */}
//             <div>
//               <label className="text-[18px] text-black font-semibold mb-2">Annual Income</label>
//               <div className="grid grid-rows-1 grid-cols-4">
//                 {annualIncome.map((option) => (
//                   <div key={option.income_id} className="mb-2">
//                     <input
//                       type="checkbox"
//                       id={`annualIncome-${option.income_id}`}
//                       {...register('annualIncome')}
//                       value={option.income_id.toString()}
//                     />
//                     <label htmlFor={`annualIncome-${option.income_id}`} className="pl-1">{option.income_description}</label>
//                   </div>
//                 ))}
//               </div>
//               {errors.annualIncome && <span className="text-red-500">{errors.annualIncome.message}</span>}
//             </div>
//           </div>
//         )}

//       <div className='bg-white p-5 mb-10 rounded shadow-md'>
//         <h4 className="text-red-600 flex row items-center justify-between text-xl font-semibold text-black dark:text-white cursor-pointer" onClick={toggleSection4}>
//           Horoscope Details
//           <svg className={`fill-current transform ${isHoroscopeDetailsOpen ? 'rotate-180' : ''}`} width={"20"} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z" fill=""></path></svg>
//         </h4>

//         {isHoroscopeDetailsOpen && (
//           <div className="flex flex-col gap-5 pt-2">
//             <div className="flex w-full flex-row gap-4">
//               <div className='w-full'>
//                 <label htmlFor="timeOfBirth" className="block text-black font-medium mb-1">Time of Birth</label>
//                 <input
//                   id="timeOfBirth"
//                   type="time"
//                   {...register('timeOfBirth')}
//                   className="outline-none w-full px-4 py-2 border border-black rounded"
//                 />
//                 {errors.timeOfBirth && <span className="text-red-500">{errors.timeOfBirth.message}</span>}
//               </div>

//               <div className='w-full'>
//                 <label htmlFor="placeOfBirth" className="block text-black font-medium mb-1">Place of Birth</label>
//                 <input
//                   id="placeOfBirth"
//                   type="text"
//                   {...register('placeOfBirth')}
//                   className="outline-none w-full px-4 py-2 border border-black rounded"
//                 />
//                 {errors.placeOfBirth && <span className="text-red-500">{errors.placeOfBirth.message}</span>}
//               </div>
//             </div>

//             <div className="flex w-full flex-row gap-4">
//               <div className='w-full'>
//                 <label htmlFor="birthStar" className="block text-black font-medium mb-1">Birth Star</label>
//                 <select
//                   id="birthStar"
//                   {...register('birthStar')}
//                   className="outline-none w-full px-4 py-2 border border-black rounded"
//                 >
//                   <option value="" disabled>-- Select your Birth Star --</option>
//                   {birthStar.map((option) => (
//                     <option key={option.birth_id} value={option.birth_id}>{option.birth_star}</option>
//                   ))}
//                 </select>
//                 {errors.birthStar && <span className="text-red-500">{errors.birthStar.message}</span>}
//               </div>

//               <div className='w-full'>
//                 <label htmlFor="rasi" className='block text-black font-medium mb-1'>Rasi</label>
//                 <select
//                   id="rasi"
//                   {...register('rasi')}
//                   className="outline-none w-full px-4 py-2 border border-black rounded"
//                 >
//                   <option value="" disabled>-- Select your Rasi --</option>
//                   {rasi.map((option) => (
//                     <option key={option.rasi_id} value={option.rasi_id}>{option.rasi_name}</option>
//                   ))}
//                 </select>
//                 {errors.rasi && <span className="text-red-500">{errors.rasi.message}</span>}
//               </div>
//             </div>

//             <div className="flex w-full flex-row gap-4">
//               <div className='w-full'>
//                 <label htmlFor="lagnam" className="block text-black font-medium mb-1">Lagnam / Didi</label>
//                 <select
//                   id="lagnam"
//                   {...register('lagnam')}
//                   className="outline-none w-full px-4 py-2 border border-black rounded"
//                 >
//                   <option value="" disabled>-- Select your Lagnam / Didi --</option>
//                   {lagnam.map((option) => (
//                     <option key={option.didi_id} value={option.didi_id}>{option.didi_description}</option>
//                   ))}
//                 </select>
//                 {errors.lagnam && <span className="text-red-500">{errors.lagnam.message}</span>}
//               </div>

//               <div className='w-full'>
//                 <label htmlFor="chevvaiDhosam" className="block text-black font-medium mb-1">Chevvai Dhosam</label>
//                 <select
//                   id="chevvaiDhosam"
//                   {...register('chevvaiDhosam')}
//                   className="outline-none w-full px-4 py-2 border border-black rounded"
//                 >
//                   <option value="" disabled>-- Select Chevvai Dhosam --</option>
//                   <option value="UnKnown">UnKnown</option>
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                 </select>
//                 {errors.chevvaiDhosam && <span className="text-red-500">{errors.chevvaiDhosam.message}</span>}
//               </div>
//             </div>

//             <div className="flex w-full flex-row gap-4">
//               <div className='w-full'>
//                 <label htmlFor="sarpaDhosham" className="block text-black font-medium mb-1">Sarpa Dhosham</label>
//                 <select
//                   id="sarpaDhosham"
//                   {...register('sarpaDhosham')}
//                   className="outline-none w-full px-4 py-2 border border-black rounded"
//                 >
//                   <option value="" disabled>-- Select Sarpa Dhosham --</option>
//                   <option value="UnKnown">UnKnown</option>
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                 </select>
//                 {errors.sarpaDhosham && <span className="text-red-500">{errors.sarpaDhosham.message}</span>}
//               </div>

//               <div className='w-full'>
//                 <label htmlFor="naalikai" className="block text-black font-medium mb-1">Naalikai</label>
//                 <input
//                   id="naalikai"
//                   type="text"
//                   {...register('naalikai')}
//                   className="outline-none w-full px-4 py-2 border border-black rounded"
//                 />
//                 {errors.naalikai && <span className="text-red-500">{errors.naalikai.message}</span>}
//               </div>
//             </div>

//             <div className="flex w-full flex-row gap-4">
//               <div className='w-2/4'>
//                 <label htmlFor="dasaName" className="block mb-1">Dasa Name</label>
//                 <input
//                   id="dasaName"
//                   type="text"
//                   {...register('dasaName')}
//                   className="outline-none w-full px-4 py-2 border border-black rounded"
//                 />
//                 {errors.dasaName && <span className="text-red-500">{errors.dasaName.message}</span>}
//               </div>

//               <div className='w-2/4'>
//                 <label htmlFor="dasaBalance" className="block mb-1">Dasa Balance</label>
//                 <div className="flex space-x-2">
//                   <div className='w-full'>
//                     <select
//                       id="day"
//                       {...register('day')}
//                       className="outline-none w-full px-4 py-2 border border-black rounded"
//                     >
//                       <option value="" disabled>Day</option>
//                       {[...Array(31)].map((_, i) => (
//                         <option key={i + 1} value={i + 1}>{i + 1}</option>
//                       ))}
//                     </select>
//                     {errors.day && <span className="text-red-500">{errors.day.message}</span>}
//                   </div>
//                   <div className='w-full'>
//                     <select
//                       id="month"
//                       {...register('month')}
//                       className="outline-none w-full px-4 py-2 border border-black rounded"
//                     >
//                       <option value="" disabled>Month</option>
//                       {[...Array(12)].map((_, i) => (
//                         <option key={i + 1} value={i + 1}>{i + 1}</option>
//                       ))}
//                     </select>
//                     {errors.month && <span className="text-red-500">{errors.month.message}</span>}
//                   </div>
//                   <div className='w-full'>
//                     <select
//                       id="year"
//                       {...register('year')}
//                       className="outline-none w-full px-4 py-2 border border-black rounded"
//                     >
//                       <option value="" disabled>Year</option>
//                       {Array.from({ length: 30 }, (_, i) => i + 1).map((year) => (
//                         <option key={year} value={year}>{year}</option>
//                       ))}
//                     </select>
//                     {errors.year && <span className="text-red-500">{errors.year.message}</span>}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className=' mb-1'>
//               <label htmlFor="horoscopeHints" className="block">Horoscope Hints</label>
//               <input
//                 id="horoscopeHints"
//                 type="text"
//                 {...register('horoscopeHints')}
//                 className="outline-none w-full px-4 py-2 border border-black rounded"
//               />
//               {errors.horoscopeHints && <span className="text-red-500">{errors.horoscopeHints.message}</span>}
//             </div>

//             {/* Rasi Grid and Amsam Grid components */}
//             <div>
//               <h4 className="text-xl font-semibold text-black dark:text-white mb-4">Rasi Grid</h4>
//               <RasiGrid centerLabel={'Rasi'} onRasiContentsChange={onRasiContentsChange} />
//             </div>

//             <br />

//             <div>
//               <h4 className="text-xl font-semibold text-black dark:text-white mb-4">Amsam Grid</h4>
//               <AmsamGrid centerLabel={'Amsam'} onAmsamContentsChange={onAmsamContentsChange} />
//             </div>
//           </div>
//         )}
//       </div>

//       </div>

//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
//       </form>
//     </div >
//   );
// };

// export default Forming;

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from '../../Fromfield/Inputfield';
import AmsamGrid from '../../HoroDetails/AmsamGrid';
import RasiGrid from '../../HoroDetails/RasiGrid';

// Define Zod schema for validation
const schema = z.object({
  temp_profileid: z.string().nonempty('This field is required'),
  Gender: z.enum(['Male', 'Female'], {
    errorMap: () => ({ message: 'Please select a gender' }),
  }),
  Mobile_no: z
    .string()
    .length(10, 'Mobile number must be 10 digits')
    .regex(/^\d+$/, 'Invalid mobile number'),
  EmailId: z.string().email('Invalid email address'),
  Password: z.string().min(6, 'Password must be at least 6 characters'),
  Profile_marital_status: z
    .string()
    .nonempty('Please select your marital status'),
  Profile_dob: z.string().nonempty('Date of birth is required'),
  Profile_complexion: z.string().nonempty('Complexion is required'),
  Profile_address: z.string().nonempty('Address is required'),
  Profile_country: z.string().nonempty('Country is required'),
  Profile_state: z.string().nonempty('State is required'),
  Profile_city: z.string().nonempty('City is required'),
  Profile_pincode: z
    .string()
    .length(6, 'Pincode must be 6 digits')
    .regex(/^\d+$/, 'Invalid pincode'),
  father_name: z.string().nonempty("Father's name is required"),
  father_occupation: z.string().nonempty("Father's occupation is required"),
  mother_name: z.string().nonempty("Mother's name is required"),
  mother_occupation: z.string().nonempty("Mother's occupation is required"),
  family_name: z.string().nonempty('Family name is required'),
  about_self: z.string().nonempty('This field is required'),
  hobbies: z.string().nonempty('Hobbies are required'),
  blood_group: z.string().nonempty('Blood group is required'),
  Pysically_changed: z.enum(['Yes', 'No'], {
    errorMap: () => ({ message: 'This field is required' }),
  }),
  property_details: z.string().nonempty('Property details are required'),
  property_worth: z.string().nonempty('Property worth is required'),
  suya_gothram: z.string().nonempty('Suya Gothram is required'),
  uncle_gothram: z.string().nonempty('Uncle Gothram is required'),
  ancestor_origin: z.string().nonempty('Ancestor origin is required'),
  about_family: z.string().nonempty('About family is required'),
  highest_education: z.string().nonempty('Highest education is required'),
  ug_degeree: z.string().nonempty('UG Degree is required'),
  about_edu: z.string().nonempty('About education is required'),
  anual_income: z.string().nonempty('Annual income is required'),
  actual_income: z.string().nonempty('actual_income income is required'),
  work_country: z.string().nonempty('Work country is required'),
  work_state: z.string().nonempty('Work state is required'),
  work_pincode: z
    .string()
    .length(6, 'Pincode must be 6 digits')
    .regex(/^\d+$/, 'Invalid pincode'),
  career_plans: z.string().nonempty('Career plans are required'),
  timeOfBirth: z.string().nonempty('time Of Birth are required'),
  pref_age_differences: z.string().nonempty('time Of Birth are required'),
  pref_height_from: z.string().nonempty('time Of Birth are required'),
  place_of_birth: z.string().nonempty('time Of Birth are required'),
  chevvai_dosaham: z.string().nonempty('time Of Birth are required'),
});

//basic

interface FamilyValue {
  family_value_id: number;
  family_value_name: string;
}

interface CountryOption {
  country_id: number;
  country_name: string;
}

interface FamilyType {
  family_id: number;
  family_description: string;
}

interface AnnualIncome {
  income_id: number;
  income_description: string;
}

interface BirthStar {
  birth_id: number;
  birth_star: string;
}

interface FamilyStatus {
  family_status_id: number;
  family_status_name: string;
  family_status_description: string;
}

interface ComplexionOption {
  complexion_id: number;
  complexion_description: string;
}

const Forming = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onRasiContentsChange = (newContent: React.SetStateAction<never[]>) => {
    setRasiContent(newContent);
  };

  const onAmsamContentsChange = (newContent: React.SetStateAction<never[]>) => {
    setAmsamContent(newContent);
  };

  const [rasiContent, setRasiContent] = useState([]);
  const [amsamContent, setAmsamContent] = useState([]);

  const [maritalStatuses, setMaritalStatuses] = useState<MaritalStatusOption[]>(
    [],
  );

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [highestEducations, setHighestEducations] = useState([]);
  const [ugDegrees, setUgDegrees] = useState([]);
  const [annualIncomes, setAnnualIncomes] = useState([]);

  const [annualIncome, setAnnualIncome] = useState<AnnualIncome[]>([]);

  const [birthStar, setBirthStar] = useState<BirthStar[]>([]);
  const [rasi, setRasiOptions] = useState<Rasi[]>([]);
  const [lagnam, setLagnamOptions] = useState<Lagnam[]>([]);
  const [selectedProfession, setSelectedProfession] = useState<string>('');

  const [familyStatus, setFamilyStatus] = useState<FamilyStatus[]>([]);
  // const [selectedFamilyStatus, setSelectedFamilyStatus] = useState<number | null>(null);

  //complextion
  useEffect(() => {
    const fetchComplexionStatus = async () => {
      try {
        const response = await axios.post(
          ' https://app.vysyamala.com/auth/Get_Complexion/',
        );
        const options = Object.values(response.data) as ComplexionOption[];
        setComplexionOptions(options);
      } catch (error) {
        console.error('Error fetching complexion options:', error);
      }
    };
    fetchComplexionStatus();
  }, []);

  const onSubmit = async (data) => {
    console.log('Form Submitted Data:', data); // Debug log for form data

    try {
      const loginDetailsResponse = await axios.post(
        'https://app.vysyamala.com/api/logindetails/',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const profileId = loginDetailsResponse.data.ProfileId;

      console.log('Profile ID:', profileId); // Debug log for profile ID

      // Log the payload being sent for profile-familydetails
      const familyDetailsPayload = {
        profile_id: profileId,
        ...data,
      };
      console.log('Family Details Payload:', familyDetailsPayload);

      // API call to save family details
      await axios.post(
        'https://app.vysyamala.com/api/profile-familydetails/',
        familyDetailsPayload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // Log the payload being sent for profile-edudetails
      const educationPayload = {
        profile_id: profileId,
        ...data,
      };
      console.log('Education Payload:', educationPayload);

      await axios.post(
        'https://app.vysyamala.com/api/profile-edudetails/',
        educationPayload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // API call to save horoscope details
      const horoscopePayload = {
        profile_id: profileId,
        ...data,
      };
      console.log('Horoscope Payload:', horoscopePayload);

      await axios.post(
        'https://app.vysyamala.com/api/profile-horoscope/',
        horoscopePayload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // API call to save partner preferences after family, education, and horoscope details
      // await axios.post('https://app.vysyamala.com/api/profile-partner-pref/', {
      //   profile_id: profileId,
      //   ...data,
      // }, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      alert('Profile created successfully');
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error('Error creating profile:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        alert(`Error creating profile: ${JSON.stringify(error.response.data)}`);
      } else {
        alert(
          'Error creating profile. Please check the console for more details.',
        );
      }
    }
  };
  const [familyTypes, setFamilyTypes] = useState<FamilyType[]>([]);
  const buttonClass = (isSelected: boolean) =>
    isSelected
      ? 'bg-secondary text-white'
      : 'border-gray hover:bg-secondary hover:text-white';

  const [familyValue, setFamilyValue] = useState<FamilyValue[]>([]);
  // const [selectedFamilyValue, setSelectedFamilyValue] = useState<number | null>(null);

  const [selectedSisterValue, setSelectedSisterValue] = useState<string>('');
  const [sisterMarriedValues, setSisterMarriedValues] = useState<string[]>([]);
  const [selectedSisterMarriedValue, setSelectedSisterMarriedValue] =
    useState<string>('');

  const [selectedBrotherValue, setSelectedBrotherValue] = useState<string>('');
  const [brotherMarriedValues, setBrotherMarriedValues] = useState<string[]>(
    [],
  );
  const [selectedBrotherMarriedValue, setSelectedBrotherMarriedValue] =
    useState<string>('');

  //brother

  const handleBrotherValueSelection = (value: string) => {
    setSelectedBrotherValue(value);
    setSelectedBrotherMarriedValue(''); // Reset selected Brother Married value

    // Define the array of Brother Married values based on selected Brother value
    let values: string[] = [];
    switch (value) {
      case '1':
        values = ['0', '1'];
        break;
      case '2':
        values = ['0', '1', '2'];
        break;
      case '3':
        values = ['0', '1', '2', '3'];
        break;
      case '4':
        values = ['0', '1', '2', '3', '4'];
        break;
      case '5+':
        values = ['0', '1', '2', '3', '4', '5+'];
        break;
      default:
        values = [];
    }

    setBrotherMarriedValues(values);
  };

  //sister
  const handleSisterValueSelection = (value: string) => {
    setSelectedSisterValue(value);
    setSelectedSisterMarriedValue(''); // Reset selected Sister Married value

    // Define the array of Sister Married values based on selected Sister value
    let values: string[] = [];
    switch (value) {
      case '1':
        values = ['0', '1'];
        break;
      case '2':
        values = ['0', '1', '2'];
        break;
      case '3':
        values = ['0', '1', '2', '3'];
        break;
      case '4':
        values = ['0', '1', '2', '3', '4'];
        break;
      case '5+':
        values = ['0', '1', '2', '3', '4', '5+'];
        break;
      default:
        values = [];
    }

    setSisterMarriedValues(values);
  };

  useEffect(() => {
    const fetchMaritalStatuses = async () => {
      try {
        const response = await axios.post<{
          [key: string]: MaritalStatusOption;
        }>(' https://app.vysyamala.com/auth/Get_Marital_Status/');
        const options = Object.values(response.data);
        setMaritalStatuses(options);
      } catch (error) {
        console.error('Error fetching marital statuses:', error);
      }
    };
    fetchMaritalStatuses();
  }, []);

  useEffect(() => {
    const fetchAnnualIncome = async () => {
      try {
        const response = await axios.post(
          ` https://app.vysyamala.com/auth/Get_Annual_Income/`,
        );
        const options = Object.values(response.data) as AnnualIncome[];
        setAnnualIncome(options);
      } catch (error) {
        console.error('Error fetching Annual Income  options:', error);
      }
    };
    fetchAnnualIncome();
  }, []);

  useEffect(() => {
    const fetchFamilyTypes = async () => {
      try {
        const response = await axios.post(
          ` https://app.vysyamala.com/auth/Get_FamilyType/`,
        );
        const data = response.data;
        const familyTypesArray = Object.values(data) as FamilyType[];
        setFamilyTypes(familyTypesArray);
      } catch (error) {
        console.error('Error fetching family types:', error);
      }
    };

    fetchFamilyTypes();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          'https://app.vysyamala.com/api/api/countries/',
        );
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(
          'https://app.vysyamala.com/api/api/states/',
        );
        setStates(response.data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchHighestEducations = async () => {
      try {
        const response = await axios.get(
          'https://app.vysyamala.com/api/api/highest-educations/',
        );
        setHighestEducations(response.data);
      } catch (error) {
        console.error('Error fetching highest educations:', error);
      }
    };

    fetchHighestEducations();

    const fetchUgDegrees = async () => {
      try {
        const response = await axios.get(
          'https://app.vysyamala.com/api/api/ug-degrees/',
        );
        setUgDegrees(response.data);
      } catch (error) {
        console.error('Error fetching UG degrees:', error);
      }
    };

    fetchUgDegrees();

    const fetchAnnualIncomes = async () => {
      try {
        const response = await axios.get(
          'https://app.vysyamala.com/api/api/annual-incomes/',
        );
        setAnnualIncomes(response.data);
      } catch (error) {
        console.error('Error fetching annual incomes:', error);
      }
    };

    fetchAnnualIncomes();
  }, []);

  const [selectedFamilyType, setSelectedFamilyType] = useState<string | null>(
    null,
  );
  const [selectedFamilyValue, setSelectedFamilyValue] = useState<string | null>(
    null,
  );
  const [selectedFamilyStatus, setSelectedFamilyStatus] = useState<
    string | null
  >(null);

  //Basic

  const [complexionOptions, setComplexionOptions] = useState<
    ComplexionOption[]
  >([]);
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<string>('');
  const [stateOptions, setStateOptions] = useState<StateOption[]>([]);

  const professionRef = useRef<HTMLDivElement>(null);

  //familystatus

  const handleTypeSelectionStatus = (typeId: number) => {
    setSelectedFamilyStatus(typeId);
    // Perform any other actions based on selected type
  };
  //familytype

  const handleTypeSelection = (typeId: number) => {
    setSelectedFamilyType(typeId);
    // Perform any other actions based on selected type
  };

  const handleProfessionChange = (value: string) => {
    setSelectedProfession(value);
    setValue('profession', value, { shouldValidate: true });
  };

  useEffect(() => {
    const fetchFamilyStatus = async () => {
      try {
        const response = await axios.post(
          ` https://app.vysyamala.com/auth/Get_FamilyStatus/`,
        );
        const data = response.data;
        const familyTypesArray = Object.values(data) as FamilyStatus[];
        setFamilyStatus(familyTypesArray);
      } catch (error) {
        console.error('Error fetching family status:', error);
      }
    };

    fetchFamilyStatus();
  }, []);

  //FamilyValue

  const handleTypeSelectionValue = (typeId: number) => {
    setSelectedFamilyValue(typeId);
    // Perform any other actions based on selected type
  };

  useEffect(() => {
    const fetchFamilyValue = async () => {
      try {
        const response = await axios.post(
          ` https://app.vysyamala.com/auth/Get_FamilyValue/`,
        );
        const data = response.data;
        const familyTypesArray = Object.values(data) as FamilyValue[];
        setFamilyValue(familyTypesArray);
      } catch (error) {
        console.error('Error fetching family value:', error);
      }
    };

    fetchFamilyValue();
  }, []);

  //country
  useEffect(() => {
    const fetchCountryStatus = async () => {
      try {
        const response = await axios.post(
          ' https://app.vysyamala.com/auth/Get_Country/',
        );
        const options = Object.values(response.data) as CountryOption[];
        setCountryOptions(options);
      } catch (error) {
        console.error('Error fetching country options:', error);
      }
    };
    fetchCountryStatus();
  }, []);

  const handleInputChange1 = (e: ChangeEvent<HTMLSelectElement>) => {
    const countryId = e.target.value;
    setSelectedCountryId(countryId);
    console.log('Selected Country ID:', countryId);
    // setErrors({});
  };

  const sections = [
    { label: 'Family Image', sectionIndex: 0, isMultiple: true },
    { label: 'Horoscope Image', sectionIndex: 1, isMultiple: false },
    { label: 'ID Proof', sectionIndex: 2, isMultiple: false },
  ];

  const [selectedFiles, setSelectedFiles] = useState<string[][]>([
    Array(10).fill([]), // Family Image: 10 buttons
    [], // Horoscope Image: Single list
    [], // ID Proof: Single list
  ]);

  const [isBasicDetailsOpen, setIsBasicDetailsOpen] = useState(true);
  const [isFamilyDetailsOpen, setIsFamilyDetailsOpen] = useState(true);
  const [isEducationDetailsOpen, setIsEducationDetailsOpen] = useState(true);
  const [isHoroscopeDetailsOpen, setIsHoroscopeDetailsOpen] = useState(true);
  const [isPartnerPreferenceOpen, setIsPartnerPreferenceOpen] = useState(true);
  const [isFeaturePreferenceOpen, setIsFeaturePreferenceOpen] = useState(true);
  const [isUploadImagesOpen, setIsUploadImagesOpen] = useState(true);

  const toggleSection1 = () => {
    setIsBasicDetailsOpen(!isBasicDetailsOpen);
  };

  const toggleSection2 = () => {
    setIsFamilyDetailsOpen(!isFamilyDetailsOpen);
  };
  const toggleSection3 = () => {
    setIsEducationDetailsOpen(!isEducationDetailsOpen);
  };
  const toggleSection4 = () => {
    setIsHoroscopeDetailsOpen(!isHoroscopeDetailsOpen);
  };
  const toggleSection5 = () => {
    setIsPartnerPreferenceOpen(!isPartnerPreferenceOpen);
  };
  const toggleSection6 = () => {
    setIsFeaturePreferenceOpen(!isFeaturePreferenceOpen);
  };
  const toggleSection7 = () => {
    setIsUploadImagesOpen(!isUploadImagesOpen);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    sectionIndex: number,
    buttonIndex?: number,
  ) => {
    const files = Array.from(event.target.files || []);
    const newSelectedFiles = [...selectedFiles] as string[][];

    if (buttonIndex !== undefined) {
      // For Family Image: Append new files to existing ones for the specified button
      const existingFiles = newSelectedFiles[sectionIndex][buttonIndex] || [];
      newSelectedFiles[sectionIndex][buttonIndex] = [
        ...existingFiles,
        ...files.map((file) => file.name),
      ].slice(0, 10); // Limit to 10 files
    } else {
      // For Horoscope Image and ID Proof: Append new files to the existing list
      newSelectedFiles[sectionIndex] = [
        ...newSelectedFiles[sectionIndex],
        ...files.map((file) => file.name),
      ].slice(0, 10); // Limit to 10 files
    }

    setSelectedFiles(newSelectedFiles);
  };

  // Trigger file input click
  const triggerFileInput = (inputId: string) => {
    const fileInput = document.getElementById(
      inputId,
    ) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div>
      <form className=" p-5 mb-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white p-5 mb-10 rounded shadow-md">
          <h4
            className="text-red-600 flex row items-center justify-between text-xl font-semibold text-black dark:text-white cursor-pointer  after-red-line::after"
            onClick={toggleSection1}
          >
            Basic Details
            <svg
              className={`fill-current transform ${
                isBasicDetailsOpen ? 'rotate-180' : ''
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
          {isBasicDetailsOpen && (
            <div className="flex flex-col gap-5">
              {/* Basic Details Form Fields */}
              <div className="flex w-full flex-row gap-4">
                <div className="w-2/4">
                  <Input
                    label={'Profile ID'}
                    name="temp_profileid"
                    {...register('temp_profileid')}
                  />
                  {errors.temp_profileid && (
                    <span className="text-red-500">
                      {errors.temp_profileid.message}
                    </span>
                  )}
                </div>
                <div className="w-2/4 py-1">
                  <label className="block text-black font-medium mb-1">
                    Select Gender
                  </label>
                  <input
                    type="radio"
                    value="Male"
                    name="Gender"
                    {...register('Gender')}
                  />
                  <label className="text-black px-4">Male</label>
                  <input
                    type="radio"
                    value="Female"
                    name="Gender"
                    {...register('Gender')}
                  />
                  <label className="text-black px-4">Female</label>
                  {errors.Gender && (
                    <span className="text-red-500">
                      {errors.Gender.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-row gap-4">
                <div className="w-2/4">
                  <Input
                    label={'Mobile Number'}
                    name="Mobile_no"
                    {...register('Mobile_no')}
                  />
                  {errors.Mobile_no && (
                    <span className="text-red-500">
                      {errors.Mobile_no.message}
                    </span>
                  )}
                </div>
                <div className="w-2/4">
                  <Input
                    label={'Email'}
                    name="EmailId"
                    {...register('EmailId')}
                  />
                  {errors.EmailId && (
                    <span className="text-red-500">
                      {errors.EmailId.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <Input
                    label={'Create Password'}
                    name="Password"
                    {...register('Password')}
                  />
                  {errors.Password && (
                    <span className="text-red-500">
                      {errors.Password.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <label className="block text-black font-medium mb-1">
                    Select your Marital Status
                  </label>
                  <select
                    name="Profile_marital_status"
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                    {...register('Profile_marital_status')}
                  >
                    <option value="">Select your Marital Status</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Not married">Not married</option>
                    <option value="Widow">Widow</option>
                    <option value="Widower">Widower</option>
                  </select>
                  {errors.Profile_marital_status && (
                    <span className="text-red-500">
                      {errors.Profile_marital_status.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-row gap-4">
                <div className="w-2/4">
                  <Input
                    label={'Date of Birth'}
                    type={'date'}
                    name="Profile_dob"
                    {...register('Profile_dob')}
                  />
                  {errors.Profile_dob && (
                    <span className="text-red-500">
                      {errors.Profile_dob.message}
                    </span>
                  )}
                </div>
                <div className="w-2/4">
                  <label
                    htmlFor="Profile_complexion"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Complexion
                  </label>
                  <select
                    id="Profile_complexion"
                    name="Profile_complexion"
                    {...register('Profile_complexion')}
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                  >
                    <option value="">Select complexion</option>
                    {complexionOptions.map((option) => (
                      <option
                        key={option.complexion_id}
                        value={option.complexion_description}
                      >
                        {option.complexion_description}
                      </option>
                    ))}
                  </select>
                  {errors.Profile_complexion && (
                    <span className="text-red-500">
                      {errors.Profile_complexion.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <Input
                    label={'Address'}
                    name="Profile_address"
                    {...register('Profile_address')}
                  />
                  {errors.Profile_address && (
                    <span className="text-red-500">
                      {errors.Profile_address.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <label className="block text-black font-medium mb-1">
                    Country
                  </label>
                  <select
                    name="Profile_country"
                    {...register('Profile_country')}
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                    onChange={(e) => handleInputChange1(e, 'basicDetails')}
                  >
                    <option value="">-- Select your Country --</option>
                    {countryOptions.map((option) => (
                      <option key={option.country_id} value={option.country_id}>
                        {option.country_name}
                      </option>
                    ))}
                  </select>
                  {errors.Profile_country && (
                    <span className="text-red-500">
                      {errors.Profile_country.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <label className="block text-black font-medium mb-1">
                    State (Based on country selection)
                  </label>
                  <select
                    name="Profile_state"
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                    {...register('Profile_state')}
                  >
                    <option value="">Select your state</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {errors.Profile_state && (
                    <span className="text-red-500">
                      {errors.Profile_state.message}
                    </span>
                  )}
                </div>

                <div className="w-full">
                  <label className="block text-black font-medium mb-1">
                    City
                  </label>
                  <select
                    name="Profile_city"
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                    {...register('Profile_city')}
                  >
                    <option value="">Select your City</option>
                    <option value="option 1">option 1</option>
                    <option value="option 2">option 2</option>
                    <option value="option 3">option 3</option>
                  </select>
                  {errors.Profile_city && (
                    <span className="text-red-500">
                      {errors.Profile_city.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <Input
                    label={'Pincode'}
                    type={'text'}
                    name="Profile_pincode"
                    {...register('Profile_pincode')}
                  />
                  {errors.Profile_pincode && (
                    <span className="text-red-500">
                      {errors.Profile_pincode.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-5 mb-10 rounded shadow-md ">
          <h4
            className="text-red-600 flex row items-center justify-between text-xl font-semibold text-black dark:text-white cursor-pointer  after-red-line::after"
            onClick={toggleSection2}
          >
            Family Details
            <svg
              className={`fill-current transform ${
                isFamilyDetailsOpen ? 'rotate-180' : ''
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
          {isFamilyDetailsOpen && (
            <div className="flex flex-col gap-5">
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <Input
                    label={'Father name'}
                    name="father_name"
                    {...register('father_name')}
                  />
                  {errors.father_name && (
                    <span className="text-red-500">
                      {errors.father_name.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <label className="block text-black font-medium mb-1">
                    Father Occupation
                  </label>
                  <select
                    name="father_occupation"
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                    {...register('father_occupation')}
                  >
                    <option value="">Father Occupation</option>
                    <option value="01">01</option>
                  </select>
                  {errors.father_occupation && (
                    <span className="text-red-600">
                      {errors.father_occupation.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <Input
                    label={'Mother name'}
                    name="mother_name"
                    {...register('mother_name')}
                  />
                  {errors.mother_name && (
                    <span className="text-red-500">
                      {errors.mother_name.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <label className="block text-black font-medium mb-1">
                    Mother Occupation
                  </label>
                  <select
                    name="mother_occupation"
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                    {...register('mother_occupation')}
                  >
                    <option value="">Mother Occupation</option>
                    <option value="02">02</option>
                  </select>
                  {errors.mother_occupation && (
                    <span className="text-red-600">
                      {errors.mother_occupation.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <Input
                    label={'Family name'}
                    type={'text'}
                    name="family_name"
                    {...register('family_name')}
                  />
                  {errors.family_name && (
                    <span className="text-red-500">
                      {errors.family_name.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <Input
                    label={'About Myself'}
                    type={'text'}
                    name="about_self"
                    {...register('about_self')}
                  />
                  {errors.about_self && (
                    <span className="text-red-500">
                      {errors.about_self.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <Input
                    label={'My Hobbies'}
                    type={'text'}
                    name="hobbies"
                    {...register('hobbies')}
                  />
                  {errors.hobbies && (
                    <span className="text-red-500">
                      {errors.hobbies.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <Input
                    label={'Blood Group'}
                    type={'text'}
                    name="blood_group"
                    {...register('blood_group')}
                  />
                  {errors.blood_group && (
                    <span className="text-red-500">
                      {errors.blood_group.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex w-full flex-row gap-4">
                <div className="w-full py-1">
                  <label className="block text-black font-medium mb-1">
                    Physically Challenged
                  </label>
                  <input
                    type="radio"
                    value="Yes"
                    name="Pysically_changed"
                    {...register('Pysically_changed')}
                  />
                  <label className="text-black px-4">Yes</label>
                  <input
                    type="radio"
                    value="No"
                    name="Pysically_changed"
                    {...register('Pysically_changed')}
                  />
                  <label className="text-black px-4">No</label>
                  {errors.Pysically_changed && (
                    <span className="text-red-600">
                      {errors.Pysically_changed.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <Input
                    label={'Property Details'}
                    type={'text'}
                    name="property_details"
                    {...register('property_details')}
                  />
                  {errors.property_details && (
                    <span className="text-red-500">
                      {errors.property_details.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Family Type Section */}
              <div className="flex w-full flex-row gap-4">
                <div className="w-full py-1">
                  <label className="block text-black font-medium mb-1">
                    Family Type
                  </label>
                  <div className="w-full inline-flex rounded">
                    {familyTypes.map((type) => (
                      <button
                        key={type.family_id}
                        type="button"
                        className={`w-full px-5 py-3 text-sm font-medium border ${
                          selectedFamilyType === type.family_id
                            ? 'bg-blue-500 text-white'
                            : ''
                        }`}
                        onClick={() => handleTypeSelection(type.family_id)}
                      >
                        {type.family_description}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="w-full py-1">
                  <label className="block text-black font-medium mb-1">
                    Family Value
                  </label>
                  <div className="w-full inline-flex rounded">
                    {familyValue.map((type) => (
                      <button
                        key={type.family_value_id}
                        type="button"
                        className={`w-full px-5 py-3 text-sm font-medium border ${
                          selectedFamilyValue === type.family_value_id
                            ? 'bg-blue-500 text-white'
                            : ''
                        }`}
                        onClick={() =>
                          handleTypeSelectionValue(type.family_value_id)
                        }
                      >
                        {type.family_value_name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full py-1">
                <label className="block text-black font-medium mb-1">
                  Family Status
                </label>
                <div className="w-full inline-flex rounded">
                  {familyStatus.map((type) => (
                    <button
                      key={type.family_status_id}
                      type="button"
                      className={`w-full px-5 py-3 text-sm font-medium border ${
                        selectedFamilyStatus === type.family_status_id
                          ? 'bg-blue-500 text-white'
                          : ''
                      }`}
                      onClick={() =>
                        handleTypeSelectionStatus(type.family_status_id)
                      }
                    >
                      {type.family_status_name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex w-full flex-row gap-4">
                <div className="w-2/4 py-1">
                  <div className="mb-4">
                    <label className="block text-black font-medium mb-1">
                      Brother
                    </label>
                    <div className="w-full inline-flex rounded">
                      {['0', '1', '2', '3', '4', '5+'].map((value) => (
                        <button
                          key={value}
                          type="button"
                          className={`w-full px-5 py-3 text-sm font-medium border ${
                            selectedBrotherValue === value
                              ? 'bg-blue-500 text-white'
                              : ''
                          }`}
                          onClick={() => handleBrotherValueSelection(value)}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {parseInt(selectedBrotherValue) > 0 && (
                  <div className="mb-4 w-2/4">
                    <label className="block text-black font-medium mb-1">
                      Brother Married
                    </label>
                    <div className="w-full inline-flex rounded">
                      {brotherMarriedValues.map((value) => (
                        <button
                          key={value}
                          type="button"
                          className={`w-full px-5 py-3 text-sm font-medium border ${
                            selectedBrotherMarriedValue === value
                              ? 'bg-blue-500 text-white'
                              : 'bg-white text-black'
                          }`}
                          onClick={() => setSelectedBrotherMarriedValue(value)}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex w-full flex-row gap-4">
                <div className="w-2/4 mb-4">
                  <label className="block text-black font-medium mb-1">
                    Sister
                  </label>
                  <div className="w-full inline-flex rounded">
                    {['0', '1', '2', '3', '4', '5+'].map((value) => (
                      <button
                        key={value}
                        type="button"
                        className={`w-full px-5 py-3 text-sm font-medium border ${
                          selectedSisterValue === value
                            ? 'bg-blue-500 text-white'
                            : ''
                        }`}
                        onClick={() => handleSisterValueSelection(value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                {parseInt(selectedSisterValue) > 0 && (
                  <div className=" w-2/4 mb-4">
                    <label className="block text-black font-medium mb-1">
                      Sister Married
                    </label>
                    <div className="w-full inline-flex rounded">
                      {sisterMarriedValues.map((value) => (
                        <button
                          key={value}
                          type="button"
                          className={`w-full px-5 py-3 text-sm font-medium border ${
                            selectedSisterMarriedValue === value
                              ? 'bg-blue-500 text-white'
                              : 'bg-white text-black'
                          }`}
                          onClick={() => setSelectedSisterMarriedValue(value)}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <label className="block text-black font-medium mb-1">
                    Property Worth
                  </label>
                  <select
                    name="property_worth"
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                    {...register('property_worth')}
                  >
                    <option value="">Select property worth</option>
                    <option value="Residential Property">
                      Residential Property
                    </option>
                    <option value="Commercial Property">
                      Commercial Property
                    </option>
                    <option value="Industrial Property">
                      Industrial Property
                    </option>
                    <option value="Agricultural Land">Agricultural Land</option>
                    <option value="Vacant Land">Vacant Land</option>
                  </select>
                  {errors.property_worth && (
                    <span className="text-red-600">
                      {errors.property_worth.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <Input
                    label={'Suya Gothram'}
                    name="suya_gothram"
                    {...register('suya_gothram')}
                  />
                  {errors.suya_gothram && (
                    <span className="text-red-500">
                      {errors.suya_gothram.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <Input
                    label={'Uncle Gothram'}
                    type={'text'}
                    name="uncle_gothram"
                    {...register('uncle_gothram')}
                  />
                  {errors.uncle_gothram && (
                    <span className="text-red-500">
                      {errors.uncle_gothram.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <Input
                    label={'Ancestor Origin'}
                    type={'text'}
                    name="ancestor_origin"
                    {...register('ancestor_origin')}
                  />
                  {errors.ancestor_origin && (
                    <span className="text-red-500">
                      {errors.ancestor_origin.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <label className="block text-black font-medium mb-1">
                    About my Family
                  </label>
                  <textarea
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                    name="about_family"
                    {...register('about_family')}
                  ></textarea>
                  {errors.about_family && (
                    <span className="text-red-600">
                      {errors.about_family.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-5 mb-10 rounded shadow-md">
          <h4
            className="text-red-600 flex row items-center justify-between text-xl font-semibold text-black dark:text-white cursor-pointer  after-red-line::after"
            onClick={toggleSection3}
          >
            Education Details
            <svg
              className={`fill-current transform ${
                isEducationDetailsOpen ? 'rotate-180' : ''
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
          {isEducationDetailsOpen && (
            <div className="flex flex-col gap-5">
              {/* Education Details Form Fields */}
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <label className="block text-black font-medium mb-1">
                    Highest Education Level *
                  </label>
                  <select
                    name="highest_education"
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                    {...register('highest_education')}
                  >
                    <option value="">Select education level</option>
                    {highestEducations.map((education) => (
                      <option key={education.id} value={education.degree}>
                        {education.degree}
                      </option>
                    ))}
                  </select>
                  {errors.highest_education && (
                    <span className="text-red-500">
                      {errors.highest_education.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <label className="block text-black font-medium mb-1">
                    UG Degree (Only if masters selected in highest education)
                  </label>
                  <select
                    name="ug_degeree"
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                    {...register('ug_degeree')}
                  >
                    <option value="">Select education level</option>
                    {ugDegrees.map((education) => (
                      <option key={education.id} value={education.degree}>
                        {education.degree}
                      </option>
                    ))}
                  </select>
                  {errors.ug_degeree && (
                    <span className="text-red-500">
                      {errors.ug_degeree.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-row gap-4">
                <Input
                  label={'About your Education *'}
                  name="about_edu"
                  {...register('about_edu')}
                />
                <div className="w-full">
                  <label className="block text-black font-medium mb-1">
                    Annual Income
                  </label>
                  <select
                    name="anual_income"
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                    {...register('anual_income')}
                  >
                    <option value="">Annual Income</option>
                    {annualIncomes.map((education) => (
                      <option key={education.id} value={education.income}>
                        {education.income}
                      </option>
                    ))}
                  </select>
                  {errors.anual_income && (
                    <span className="text-red-500">
                      {errors.anual_income.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex w-2/4 flex-row gap-4">
                <Input
                  label={'Actual Income'}
                  name="actual_income"
                  {...register('actual_income')}
                />
              </div>

              <div className="mt-3">
                <h1 className="mb-3">Profession</h1>

                <div ref={professionRef} className="w-full inline-flex rounded">
                  {[
                    'Employed',
                    'Business',
                    'Student',
                    'Not Working',
                    'Not Mentioned',
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={`w-full px-5 py-3 text-sm font-medium border ${buttonClass(
                        selectedProfession === type,
                      )}`}
                      onClick={() => handleProfessionChange(type)}
                      {...register('profession')}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {errors.profession && (
                  <span className="text-red-500">
                    {errors.profession.message}
                  </span>
                )}
              </div>
              <h4 className="text-xl font-semibold text-black dark:text-white">
                Work Location
              </h4>
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <label className="block text-black font-medium mb-1">
                    Country *
                  </label>
                  <select
                    name="work_country"
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                    {...register('work_country')}
                  >
                    <option value="">Country</option>
                    {countries.map((education) => (
                      <option key={education.id} value={education.name}>
                        {education.name}
                      </option>
                    ))}
                  </select>
                  {errors.work_country && (
                    <span className="text-red-500">
                      {errors.work_country.message}
                    </span>
                  )}
                </div>

                <div className="w-full">
                  <label className="block text-black font-medium mb-1">
                    State * (Based on country selection)
                  </label>
                  <select
                    name="work_state"
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                    {...register('work_state')}
                  >
                    <option value="">Select your state</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {errors.work_state && (
                    <span className="text-red-500">
                      {errors.work_state.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-row gap-4">
                <Input
                  label={'Pincode (Based on Country Selection)'}
                  name="work_pincode"
                  {...register('work_pincode')}
                />
              </div>
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <label className="block text-black font-medium mb-1">
                    Career Plans / Notes
                  </label>
                  <textarea
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                    name="career_plans"
                    {...register('career_plans')}
                  ></textarea>
                  {errors.career_plans && (
                    <span className="text-red-500">
                      {errors.career_plans.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-5 mb-10 rounded shadow-md">
          <h4
            className="text-red-600 flex row items-center justify-between text-xl font-semibold text-black dark:text-white cursor-pointer  after-red-line::after"
            onClick={toggleSection4}
          >
            Horoscope Details
            <svg
              className={`fill-current transform ${
                isHoroscopeDetailsOpen ? 'rotate-180' : ''
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
          {isHoroscopeDetailsOpen && (
            <div className="flex flex-col gap-5 pt-2">
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <label
                    htmlFor="timeOfBirth"
                    className="block text-black font-medium mb-1"
                  >
                    Time of Birth
                  </label>
                  <input
                    id="timeOfBirth"
                    type="time"
                    {...register('timeOfBirth')}
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                  />
                  {errors.timeOfBirth && (
                    <span className="text-red-500">
                      {errors.timeOfBirth.message}
                    </span>
                  )}
                </div>

                <div className="w-full">
                  <label
                    htmlFor="place_of_birth"
                    className="block text-black font-medium mb-1"
                  >
                    Place of Birth
                  </label>
                  <input
                    id="place_of_birth"
                    type="text"
                    {...register('place_of_birth')}
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                  />
                  {errors.place_of_birth && (
                    <span className="text-red-500">
                      {errors.place_of_birth.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <label
                    htmlFor="birthStar"
                    className="block text-black font-medium mb-1"
                  >
                    Birth Star
                  </label>
                  <select
                    id="birthStar"
                    {...register('birthStar')}
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                  >
                    <option value="" disabled>
                      -- Select your Birth Star --
                    </option>
                    {birthStar.map((option) => (
                      <option key={option.birth_id} value={option.birth_id}>
                        {option.birth_star}
                      </option>
                    ))}
                  </select>
                  {errors.birthStar && (
                    <span className="text-red-500">
                      {errors.birthStar.message}
                    </span>
                  )}
                </div>

                <div className="w-full">
                  <label
                    htmlFor="rasi"
                    className="block text-black font-medium mb-1"
                  >
                    Rasi
                  </label>
                  <select
                    id="rasi"
                    {...register('rasi')}
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                  >
                    <option value="" disabled>
                      -- Select your Rasi --
                    </option>
                    {rasi.map((option) => (
                      <option key={option.rasi_id} value={option.rasi_id}>
                        {option.rasi_name}
                      </option>
                    ))}
                  </select>
                  {errors.rasi && (
                    <span className="text-red-500">{errors.rasi.message}</span>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <label
                    htmlFor="lagnam"
                    className="block text-black font-medium mb-1"
                  >
                    Lagnam 
                  </label>
                  <select
                    id="lagnam"
                    {...register('lagnam')}
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                  >
                    <option value="" disabled>
                      -- Select your Lagnam 
                    </option>
                    {lagnam.map((option) => (
                      <option key={option.didi_id} value={option.didi_id}>
                        {option.didi_description}
                      </option>
                    ))}
                  </select>
                  {errors.lagnam && (
                    <span className="text-red-500">
                      {errors.lagnam.message}
                    </span>
                  )}
                </div>

                <div className="w-full">
                  <label
                    htmlFor="chevvai_dosaham"
                    className="block text-black font-medium mb-1"
                  >
                    Chevvai Dhosam
                  </label>
                  <select
                    id="chevvai_dosaham"
                    {...register('chevvai_dosaham')}
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                  >
                    <option value="" disabled>
                      -- Select Chevvai Dhosam --
                    </option>
                    <option value="UnKnown">UnKnown</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.chevvai_dosaham && (
                    <span className="text-red-500">
                      {errors.chevvai_dosaham.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <label
                    htmlFor="sarpaDhosham"
                    className="block text-black font-medium mb-1"
                  >
                    Sarpa Dhosham
                  </label>
                  <select
                    id="sarpaDhosham"
                    {...register('sarpaDhosham')}
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                  >
                    <option value="" disabled>
                      -- Select Sarpa Dhosham --
                    </option>
                    <option value="UnKnown">UnKnown</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.sarpaDhosham && (
                    <span className="text-red-500">
                      {errors.sarpaDhosham.message}
                    </span>
                  )}
                </div>

                <div className="w-full">
                  <label
                    htmlFor="naalikai"
                    className="block text-black font-medium mb-1"
                  >
                    Naalikai
                  </label>
                  <input
                    id="naalikai"
                    type="text"
                    {...register('naalikai')}
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                  />
                  {errors.naalikai && (
                    <span className="text-red-500">
                      {errors.naalikai.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-row gap-4">
                <div className="w-2/4">
                  <label htmlFor="dasaName" className="block mb-1">
                    Dasa Name
                  </label>
                  <input
                    id="dasaName"
                    type="text"
                    {...register('dasaName')}
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                  />
                  {errors.dasaName && (
                    <span className="text-red-500">
                      {errors.dasaName.message}
                    </span>
                  )}
                </div>

                <div className="w-2/4">
                  <label htmlFor="dasaBalance" className="block mb-1">
                    Dasa Balance
                  </label>
                  <div className="flex space-x-2">
                    <div className="w-full">
                      <select
                        id="day"
                        {...register('day')}
                        className="outline-none w-full px-4 py-2 border border-black rounded"
                      >
                        <option value="" disabled>
                          Day
                        </option>
                        {[...Array(31)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                      {errors.day && (
                        <span className="text-red-500">
                          {errors.day.message}
                        </span>
                      )}
                    </div>
                    <div className="w-full">
                      <select
                        id="month"
                        {...register('month')}
                        className="outline-none w-full px-4 py-2 border border-black rounded"
                      >
                        <option value="" disabled>
                          Month
                        </option>
                        {[...Array(12)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                      {errors.month && (
                        <span className="text-red-500">
                          {errors.month.message}
                        </span>
                      )}
                    </div>
                    <div className="w-full">
                      <select
                        id="year"
                        {...register('year')}
                        className="outline-none w-full px-4 py-2 border border-black rounded"
                      >
                        <option value="" disabled>
                          Year
                        </option>
                        {Array.from({ length: 30 }, (_, i) => i + 1).map(
                          (year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ),
                        )}
                      </select>
                      {errors.year && (
                        <span className="text-red-500">
                          {errors.year.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className=" mb-1">
                <label htmlFor="horoscopeHints" className="block">
                  Horoscope Hints
                </label>
                <input
                  id="horoscopeHints"
                  type="text"
                  {...register('horoscopeHints')}
                  className="outline-none w-full px-4 py-2 border border-black rounded"
                />
                {errors.horoscopeHints && (
                  <span className="text-red-500">
                    {errors.horoscopeHints.message}
                  </span>
                )}
              </div>

              {/* Rasi Grid and Amsam Grid components */}
              <div>
                <h4 className="text-xl font-semibold text-black dark:text-white mb-4">
                  Rasi Grid
                </h4>
                <RasiGrid
                  centerLabel={'Rasi'}
                  onRasiContentsChange={onRasiContentsChange}
                />
              </div>

              <br />

              <div>
                <h4 className="text-xl font-semibold text-black dark:text-white mb-4">
                  Amsam Grid
                </h4>
                <AmsamGrid
                  centerLabel={'Amsam'}
                  onAmsamContentsChange={onAmsamContentsChange}
                />
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-5 mb-10 rounded shadow-md">
          <h4
            className="text-red-600 flex row items-center justify-between text-xl font-semibold text-black dark:text-white"
            onClick={toggleSection6}
          >
            Feature Preference{' '}
            <svg
              className={`fill-current transform ${
                isFeaturePreferenceOpen ? 'rotate-180' : ''
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

          {isFeaturePreferenceOpen && (
            <div className="flex flex-col gap-5 pt-2">
              {/* Height Inputs */}
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <label>Height from</label>
                  <input
                    {...register('pref_height_to')}
                    className="w-full px-4 py-2 border border-black rounded"
                  />
                  {errors.pref_height_to && (
                    <span className="text-red-500">
                      {errors.pref_height_to.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <label>Height to</label>
                  <input
                    {...register('heightTo')}
                    className="w-full px-4 py-2 border border-black rounded"
                  />
                  {errors.heightTo && (
                    <span className="text-red-500">
                      {errors.heightTo.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <label>Age Preference</label>
                  <input
                    {...register('pref_age_differences')}
                    className="w-full px-4 py-2 border border-black rounded"
                  />
                  {errors.pref_age_differences && (
                    <span className="text-red-500">
                      {errors.pref_age_differences.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Other Inputs */}
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <label>Height Preference</label>
                  <input
                    {...register('pref_height_from')}
                    className="w-full px-4 py-2 border border-black rounded"
                  />
                  {errors.pref_height_from && (
                    <span className="text-red-500">
                      {errors.pref_height_from.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <label>Chevvai</label>
                  <select
                    {...register('chevvai')}
                    className="w-full px-4 py-2 border border-black rounded"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.chevvai && (
                    <span className="text-red-500">
                      {errors.chevvai.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <label>Rehu / Ketu</label>
                  <select
                    {...register('rehuKetu')}
                    className="w-full px-4 py-2 border border-black rounded"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.rehuKetu && (
                    <span className="text-red-500">
                      {errors.rehuKetu.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <label>Foreign Interest</label>
                  <select
                    {...register('pref_foreign_intrest')}
                    className="w-full px-4 py-2 border border-black rounded"
                  >
                    <option value="">Select</option>
                    <option value="Both">Both</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.pref_foreign_intrest && (
                    <span className="text-red-500">
                      {errors.pref_foreign_intrest.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Profession Checkboxes */}
              <div className="w-full">
                <h5 className="text-[18px] text-black font-semibold mb-2">
                  Profession
                </h5>
                <div className="flex justify-between items-center">
                  {[
                    'employed',
                    'business',
                    'student',
                    'notWorking',
                    'notMentioned',
                  ].map((profession) => (
                    <div key={profession}>
                      <input
                        type="checkbox"
                        id={`profession-${profession}`}
                        {...register('pref_profession')}
                        value={profession}
                      />
                      <label
                        htmlFor={`profession-${profession}`}
                        className="pl-1"
                      >
                        {profession}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.pref_profession && (
                  <span className="text-red-500">
                    {errors.pref_profession.message}
                  </span>
                )}
              </div>

              {/* Marital Status */}
              <div>
                <h5 className="text-[18px] text-black font-semibold mb-2">
                  Marital Status
                </h5>
                <div className="flex justify-between items-center">
                  {maritalStatuses.map((status) => (
                    <div key={status.marital_sts_id}>
                      <input
                        type="checkbox"
                        id={`maritalStatus-${status.marital_sts_id}`}
                        {...register('pref_marital_status')}
                        value={status.marital_sts_id.toString()}
                      />
                      <label
                        htmlFor={`pref_marital_status-${status.marital_sts_id}`}
                      >
                        {status.marital_sts_name}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.pref_marital_status && (
                  <span className="text-red-500">
                    {errors.pref_marital_status.message}
                  </span>
                )}
              </div>

              {/* Annual Income */}
              <div>
                <label className="text-[18px] text-black font-semibold mb-2">
                  Annual Income
                </label>
                <div className="grid grid-rows-1 grid-cols-4">
                  {annualIncome.map((option) => (
                    <div key={option.income_id} className="mb-2">
                      <input
                        type="checkbox"
                        id={`annualIncome-${option.income_id}`}
                        {...register('pref_anual_income')}
                        value={option.income_id.toString()}
                      />
                      <label
                        htmlFor={`pref_anual_income-${option.income_id}`}
                        className="pl-1"
                      >
                        {option.income_description}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.pref_anual_income && (
                  <span className="text-red-500">
                    {errors.pref_anual_income.message}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-5 mb-10 rounded shadow-md">
          <h4
            className="text-red-600 flex row items-center justify-between text-xl font-semibold text-black dark:text-white "
            onClick={toggleSection5}
          >
            {' '}
            Partner Preference
            <svg
              className={`fill-current transform ${
                isPartnerPreferenceOpen ? 'rotate-180' : ''
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
              {/* Height Inputs */}
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <label>Height from</label>
                  <input
                    {...register('heightFrom')}
                    className="w-full px-4 py-2 border border-black rounded"
                  />
                  {errors.heightFrom && (
                    <span className="text-red-500">
                      {errors.heightFrom.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <label>Height to</label>
                  <input
                    {...register('heightTo')}
                    className="w-full px-4 py-2 border border-black rounded"
                  />
                  {errors.heightTo && (
                    <span className="text-red-500">
                      {errors.heightTo.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <label>Age Preference</label>
                  <input
                    {...register('agePreference')}
                    className="w-full px-4 py-2 border border-black rounded"
                  />
                  {errors.agePreference && (
                    <span className="text-red-500">
                      {errors.agePreference.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Other Inputs */}
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <label>Height Preference</label>
                  <input
                    {...register('heightPreference')}
                    className="w-full px-4 py-2 border border-black rounded"
                  />
                  {errors.heightPreference && (
                    <span className="text-red-500">
                      {errors.heightPreference.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <label>Chevvai</label>
                  <select
                    {...register('chevvai')}
                    className="w-full px-4 py-2 border border-black rounded"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.chevvai && (
                    <span className="text-red-500">
                      {errors.chevvai.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <label>Rehu / Ketu</label>
                  <select
                    {...register('rehuKetu')}
                    className="w-full px-4 py-2 border border-black rounded"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.rehuKetu && (
                    <span className="text-red-500">
                      {errors.rehuKetu.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <label>Foreign Interest</label>
                  <select
                    {...register('foreignInterest')}
                    className="w-full px-4 py-2 border border-black rounded"
                  >
                    <option value="">Select</option>
                    <option value="Both">Both</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.foreignInterest && (
                    <span className="text-red-500">
                      {errors.foreignInterest.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Profession Checkboxes */}
              <div className="w-full">
                <h5 className="text-[18px] text-black font-semibold mb-2">
                  Profession
                </h5>
                <div className="flex justify-between items-center">
                  {[
                    'employed',
                    'business',
                    'student',
                    'notWorking',
                    'notMentioned',
                  ].map((profession) => (
                    <div key={profession}>
                      <input
                        type="checkbox"
                        id={`profession-${profession}`}
                        {...register('professionPreference')}
                        value={profession}
                      />
                      <label
                        htmlFor={`profession-${profession}`}
                        className="pl-1"
                      >
                        {profession}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.professionPreference && (
                  <span className="text-red-500">
                    {errors.professionPreference.message}
                  </span>
                )}
              </div>

              {/* Marital Status */}
              <div>
                <h5 className="text-[18px] text-black font-semibold mb-2">
                  Marital Status
                </h5>
                <div className="flex justify-between items-center">
                  {maritalStatuses.map((status) => (
                    <div key={status.marital_sts_id}>
                      <input
                        type="checkbox"
                        id={`maritalStatus-${status.marital_sts_id}`}
                        {...register('maritalStatus')}
                        value={status.marital_sts_id.toString()}
                      />
                      <label htmlFor={`maritalStatus-${status.marital_sts_id}`}>
                        {status.marital_sts_name}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.maritalStatus && (
                  <span className="text-red-500">
                    {errors.maritalStatus.message}
                  </span>
                )}
              </div>

              {/* Annual Income */}
              <div>
                <label className="text-[18px] text-black font-semibold mb-2">
                  Annual Income
                </label>
                <div className="grid grid-rows-1 grid-cols-4">
                  {annualIncome.map((option) => (
                    <div key={option.income_id} className="mb-2">
                      <input
                        type="checkbox"
                        id={`annualIncome-${option.income_id}`}
                        {...register('annualIncome')}
                        value={option.income_id.toString()}
                      />
                      <label
                        htmlFor={`annualIncome-${option.income_id}`}
                        className="pl-1"
                      >
                        {option.income_description}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.annualIncome && (
                  <span className="text-red-500">
                    {errors.annualIncome.message}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-5 mb-10 rounded shadow-md">
          <h4
            className="text-red-600 flex row items-center justify-between text-xl font-semibold text-black dark:text-white"
            onClick={toggleSection7}
          >
            {' '}
            Upload Images{' '}
            <svg
              className={`fill-current transform ${
                isUploadImagesOpen ? 'rotate-180' : ''
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
          {isUploadImagesOpen && (
            <div className="w-full py-2">
              {sections.map(({ label, sectionIndex, isMultiple }) => (
                <div
                  key={sectionIndex}
                  className={`mb-8 ${
                    sectionIndex > 0 ? 'inline-block w-48 mr-4' : ''
                  }`}
                >
                  <h2 className="text-lg font-semibold mb-4">{label}</h2>
                  <div
                    className={` ${
                      sectionIndex > 0 ? '' : 'flex-col space-y-4'
                    }`}
                  >
                    {isMultiple ? (
                      <div className="grid grid-cols-5 gap-4">
                        {Array.from({ length: 10 }).map((_, buttonIndex) => (
                          <div
                            key={buttonIndex}
                            className="flex flex-col space-y-2"
                          >
                            {/* <label className="block text-sm font-medium mb-1">
                            Image
                          </label> */}
                            <button
                              type="button"
                              className="px-4 py-2 bg-gray-200 text-sm font-medium border rounded"
                              onClick={() =>
                                triggerFileInput(
                                  `fileInput${sectionIndex}-${buttonIndex}`,
                                )
                              }
                            >
                              Image {buttonIndex + 1}
                            </button>
                            <input
                              type="file"
                              id={`fileInput${sectionIndex}-${buttonIndex}`}
                              style={{ display: 'none' }}
                              multiple
                              onChange={(e) =>
                                handleFileChange(e, sectionIndex, buttonIndex)
                              }
                            />
                            <div className="flex flex-col space-y-1 mt-2">
                              {selectedFiles[sectionIndex][buttonIndex]?.map(
                                (fileName, fileIndex) => (
                                  <span key={fileIndex} className="text-sm">
                                    {fileName}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-2">
                        {/* <label className="block text-sm font-medium mb-1">
                        Choose File
                      </label> */}
                        <button
                          type="button"
                          className="w-full px-4 py-2 bg-gray-200 text-sm font-medium border rounded"
                          onClick={() =>
                            triggerFileInput(`fileInput${sectionIndex}-0`)
                          }
                        >
                          Select File
                        </button>
                        <input
                          type="file"
                          id={`fileInput${sectionIndex}-0`}
                          style={{ display: 'none' }}
                          onChange={(e) => handleFileChange(e, sectionIndex)}
                        />
                        <div className="flex flex-col space-y-1 mt-2">
                          {selectedFiles[sectionIndex]?.map(
                            (fileName, fileIndex) => (
                              <span key={fileIndex} className="text-sm">
                                {fileName}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Partner Preference */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Forming;
