// import { z } from 'zod';


// const getMinDOB = () => {
//     const today = new Date();
//     today.setFullYear(today.getFullYear() - 18);
//     return today.toISOString().split('T')[0];
//   };


// export const EditScheemaBasicDetails = z.object({


//         BasicDetail: z.object({
//             Name: z.string().min(1, 'Name is required'),
//             Gender: z.enum(['male', 'female'], {
//               errorMap: () => ({ message: 'Please select a gender' }),
//             }),
//             Mobile_no:
//             z
//     .string()
//     .min(10, { message: 'Must be a valid mobile number' })
//     .max(14, { message: 'Must be a valid mobile number' }),
//             //  z
//             //   .string().min(1, 'mobile number is required'),
//               //.length(10, 'Mobile number must be exactly 10 digits long'),
//               //.regex(/^[0-9]+$/, 'Mobile number must contain only numbers'),
//             Email: z 
//               .string()
//               .email('Invalid email address')
//               .regex(
//                 /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                 'Invalid email format',
//               ),
        
//             marital_status: z.string().min(1, 'Please select your marital status'),
        
//             dob: z
//               .string()
//               .min(1, 'Date of Birth is required')
//               .refine((val) => new Date(val) <= new Date(getMinDOB()), {
//                 message: 'You must be at least 18 years old',
//               }),
//             address: z.string().min(1, 'Address is must required'),
//             country: z.string({
//               required_error: 'Country is required',
//               invalid_type_error: 'Country is required'
//             }).min(1, 'Country is required'),
        
//             state: z.string().min(1, 'State is required'),
//             district: z.string().min(1, 'District is required'),
//             City: z.string().min(1, 'city is required'),
//             pincode: z.string().length(6, 'Post code must be 6 digits'),
//             // Alt_Mobile_Number: z.string().min(10, 'This field is required'),
//             Alt_Mobile_Number:
//             z
//             .string()
//             .min(10, { message: 'This field is required' })
//             .max(14, { message: 'This field is required' }),
//             AddOnPackage:z.string().optional(),
//             complexion: z.string().min(1, 'Complexion is required'),
//             status: z.string().min(1, 'Status is required'),
//             WhatsAppNumber: z.string().min(10, 'This field is required'),
//           }),
    
//   });


// export interface BasicDetailss{
//      BasicDetail: {
    
//     Name: string;
//     Gender: 'male' | 'female';
//     Mobile_no: string;
//     Alt_Mobile_Number: string;
//     WhatsAppNumber: string;
//     address: string;
//     Email: string;
//     country: string;
//     dob: string;
//     marital_status: string;
//     state: string;
//     City: string;
//     complexion: string;
//     district: string;
//     pincode: string;
//     status: string;
//     AddOnPackage:string
//   };
//   }
  


// import { z } from 'zod';

// const getMinDOB = () => {
//   const today = new Date();
//   today.setFullYear(today.getFullYear() - 18);
//   return today.toISOString().split('T')[0];
// };

// export const EditScheemaBasicDetails = z.object({
//   BasicDetail: z.object({
//     Name: z.string().min(1, 'Name is required'),
//     Gender: z.enum(['male', 'female'], {
//       errorMap: () => ({ message: 'Please select a gender' }),
//     }),
//     Mobile_no: z
//       .string()
//       .min(10, { message: 'Must be a valid mobile number' })
//       .max(14, { message: 'Must be a valid mobile number' }),
//     Email: z
//       .string()
//       .email('Invalid email address')
//       .regex(
//         /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//         'Invalid email format',
//       ),
//     marital_status: z.string().min(1, 'Please select your marital status'),
//     dob: z
//       .string()
//       .min(1, 'Date of Birth is required')
//       .refine((val) => new Date(val) <= new Date(getMinDOB()), {
//         message: 'You must be at least 18 years old',
//       }),
//     address: z.string().min(1, 'Address is required'),
//     country: z.string({
//       required_error: 'Country is required',
//       invalid_type_error: 'Country is required'
//     }).min(1, 'Country is required'),
    
//     // Make state and district optional by default
//     state: z.string().optional(),
//     district: z.string().optional(),
    
//     City: z.string().min(1, 'City is required'),
//     pincode: z.string().length(6, 'Post code must be 6 digits'),
//     Alt_Mobile_Number: z
//       .string()
//       .min(10, { message: 'This field is required' })
//       .max(14, { message: 'This field is required' }),
//     AddOnPackage: z.string().optional(),
//     complexion: z.string().min(1, 'Complexion is required'),
//     status: z.string().min(1, 'Status is required'),
//     WhatsAppNumber: z.string().min(10, 'This field is required'),
//   })
// })
// .refine(
//   (data) => data.BasicDetail.country !== '1' || !!data.BasicDetail.state, 
//   {
//     message: 'State is required when country is India',
//     path: ['BasicDetail', 'state']
//   }
// )
// .refine(
//   (data) => data.BasicDetail.country !== '1' || !!data.BasicDetail.district,
//   {
//     message: 'District is required when country is India',
//     path: ['BasicDetail', 'district']
//   }
// );

// export interface BasicDetailss {
//   BasicDetail: {
//     Name: string;
//     Gender: 'male' | 'female';
//     Mobile_no: string;
//     Alt_Mobile_Number: string;
//     WhatsAppNumber: string;
//     address: string;
//     Email: string;
//     country: string;
//     dob: string;
//     marital_status: string;
//     state?: string;  // Optional
//     City: string;
//     complexion: string;
//     district?: string; // Optional
//     pincode: string;
//     status: string;
//     AddOnPackage?: string;
//   };
// }

// import { z } from 'zod';

// const getMinDOB = () => {
//   const today = new Date();
//   today.setFullYear(today.getFullYear() - 18);
//   return today.toISOString().split('T')[0];
// };

// export const EditScheemaBasicDetails = z.object({
//   BasicDetail: z.object({
//     Name: z.string().min(1, 'Name is required'),
//     Gender: z.enum(['male', 'female'], {
//       errorMap: () => ({ message: 'Please select a gender' }),
//     }),
//     Mobile_no: z
//       .string()
//       .min(10, { message: 'Must be a valid mobile number' })
//       .max(14, { message: 'Must be a valid mobile number' }),
//     Email: z
//       .string()
//       .email('Invalid email address')
//       .regex(
//         /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//         'Invalid email format',
//       ),
//     marital_status: z.string().min(1, 'Please select your marital status'),
//     dob: z
//       .string()
//       .min(1, 'Date of Birth is required')
//       .refine((val) => new Date(val) <= new Date(getMinDOB()), {
//         message: 'You must be at least 18 years old',
//       }),
//     address: z.string().min(1, 'Address is required'),
//     country: z.string().min(1, 'Country is required'),
    
//     // Make state and district optional by default
//     state: z.string().optional(),
//     district: z.string().optional(),
    
//     City: z.string().min(1, 'City is required'),
//     pincode: z.string().length(6, 'Post code must be 6 digits'),
//     Alt_Mobile_Number: z
//       .string()
//       .min(10, { message: 'This field is required' })
//       .max(14, { message: 'This field is required' }),
//     AddOnPackage: z.string().optional(),
//     complexion: z.string().min(1, 'Complexion is required'),
//     status: z.string().min(1, 'Status is required'),
//     WhatsAppNumber: z.string().min(10, 'This field is required'),
//   }),
// })
// .refine(
//   (data) => {
//     const { country, state } = data.BasicDetail;
//     // Only require state if country is India (1)
//     if (country === '1') {
//       return !!state && state.trim() !== '';
//     }
//     return true;
//   },
//   {
//     message: 'State is required for India',
//     path: ['BasicDetail.state'],
//   }
// )
// .refine(
//   (data) => {
//     const { country, district } = data.BasicDetail;
//     // Only require district if country is India (1)
//     if (country === '1') {
//       return !!district && district.trim() !== '';
//     }
//     return true;
//   },
//   {
//     message: 'District is required for India',
//     path: ['BasicDetail.district'],
//   }
// );

// export interface BasicDetailss {
//   BasicDetail: {
//     Name: string;
//     Gender: 'male' | 'female';
//     Mobile_no: string;
//     Alt_Mobile_Number: string;
//     WhatsAppNumber: string;
//     address: string;
//     Email: string;
//     country: string;
//     dob: string;
//     marital_status: string;
//     state?: string | null;
//     City: string;
//     complexion: string;
//     district?: string | null;
//     pincode: string;
//     status: string;
//     AddOnPackage?: string | null;
//   };
// }






// import { z } from 'zod';

// const getMinDOB = () => {
//   const today = new Date();
//   today.setFullYear(today.getFullYear() - 18);
//   return today.toISOString().split('T')[0];
// };

// export const EditScheemaBasicDetails = z.object({
//   BasicDetail: z.object({
//     Name: z.string().min(1, 'Name is required'),
//     Gender: z.enum(['male', 'female'], {
//       errorMap: () => ({ message: 'Please select a gender' }),
//     }),
//     Mobile_no: z
//       .string()
//       .min(10, { message: 'Must be a valid mobile number' })
//       .max(14, { message: 'Must be a valid mobile number' }),
//     Email: z.string().email('Invalid email address'),
//     marital_status: z.string().min(1, 'Please select your marital status'),
//     dob: z.string()
//       .min(1, 'Date of Birth is required')
//       .refine(val => new Date(val) <= new Date(getMinDOB()), {
//         message: 'You must be at least 18 years old',
//       }),
//     address: z.string().min(1, 'Address is required'),
//     country: z.string().min(1, 'Country is required'),
    
//     // Make state and district optional by default
//     state: z.string().optional(),
//     district: z.string().optional(),
    
//     City: z.string().min(1, 'City is required'),
//     pincode: z.string().length(6, 'Post code must be 6 digits'),
//     Alt_Mobile_Number: z.string()
//       .min(10, 'This field is required')
//       .max(14, 'This field is required'),
//     AddOnPackage: z.string().optional(),
//     complexion: z.string().min(1, 'Complexion is required'),
//     status: z.string().min(1, 'Status is required'),
//     WhatsAppNumber: z.string().min(10, 'This field is required'),
//   }),
// })
// .refine(
//   (data) => {
//     const { country, state, City } = data.BasicDetail;
//     // Skip state validation if country and city are both filled
//     if (country && City) return true;
//     // Only require state if country is India (1)
//     if (country === '1') {
//       return !!state && state.trim() !== '';
//     }
//     return true;
//   },
//   {
//     message: 'State is required for India',
//     path: ['BasicDetail.state'],
//   }
// )
// .refine(
//   (data) => {
//     const { country, district, City } = data.BasicDetail;
//     // Skip district validation if country and city are both filled
//     if (country && City) return true;
//     // Only require district if country is India (1)
//     if (country === '1') {
//       return !!district && district.trim() !== '';
//     }
//     return true;
//   },
//   {
//     message: 'District is required for India',
//     path: ['BasicDetail.district'],
//   }
// );

// export interface BasicDetailss {
//   BasicDetail: {
//     Name: string;
//     Gender: 'male' | 'female';
//     Mobile_no: string;
//     Alt_Mobile_Number: string;
//     WhatsAppNumber: string;
//     address: string;
//     Email: string;
//     country: string;
//     dob: string;
//     marital_status: string;
//     state?: string | null;
//     City: string;
//     complexion: string;
//     district?: string | null;
//     pincode: string;
//     status: string;
//     AddOnPackage?: string | null;
//   };
// }



// import { z } from 'zod';



// const getMinDOB = () => {
//   const today = new Date();
//   today.setFullYear(today.getFullYear() - 18);
//   return today.toISOString().split('T')[0];
// };

// export const EditScheemaBasicDetails = z.object({
//   BasicDetail: z.object({
//     Name: z.string().min(1, 'Name is required'),
//     Gender: z.enum(['male', 'female'], {
//       errorMap: () => ({ message: 'Please select a gender' }),
//     }),
//     Mobile_no: z
//       .string()
//       .min(10, { message: 'Must be a valid mobile number' })
//       .max(14, { message: 'Must be a valid mobile number' }),
//     Email: z.string().email('Invalid email address'),
//     marital_status: z.string().min(1, 'Please select your marital status'),
//     dob: z.string()
//       .min(1, 'Date of Birth is required')
//       .refine(val => new Date(val) <= new Date(getMinDOB()), {
//         message: 'You must be at least 18 years old',
//       }),
//     address: z.string().min(1, 'Address is required'),
//     country: z.string().min(1, 'Country is required'),
    
//     // Make state and district optional by default
//     state: z.string().optional(),
//     district: z.string().optional(),
    
//     City: z.string().min(1, 'City is required'),
//     pincode: z.string().length(6, 'Post code must be 6 digits'),
//     Alt_Mobile_Number: z.string()
//       .min(10, 'This field is required')
//       .max(14, 'This field is required'),
//     AddOnPackage: z.string().optional(),
//     complexion: z.string().min(1, 'Complexion is required'),
//     status: z.string().min(1, 'Status is required'),
//     WhatsAppNumber: z.string().min(10, 'This field is required'),
//   }),
//  })

//  .refine(
//   (data) => {
//     const { country, state } = data.BasicDetail;
//     // Only require state if country is India (1)
//     if (country === '1') {
//       return !!state && state.trim() !== '';
//     }
//     return true;
//   },
//   {
//     message: 'State is required for India',
//     path: ['BasicDetail.state'], // Fixed path
//   }
// )
// .refine(
//   (data) => {
//     const { country, district } = data.BasicDetail;
//     // Only require district if country is India (1)
//     if (country === '1') {
//       return !!district && district.trim() !== '';
//     }
//     return true;
//   },
//   {
//     message: 'District is required for India',
//     path: ['BasicDetail.district'], // Fixed path
//   }
// );
// .refine(
//   (data) => {
//     // Only validate state if country is "1" (India)
//     if (data.BasicDetail.country !== '1') return true;
//     return !!data.BasicDetail.state && data.BasicDetail.state.trim() !== '';
//   },
//   {
//     message: 'State is required for India',
//     path: ['BasicDetail.state'],
//   }
// )
// .refine(
//   (data) => {
//     // Only validate district if country is "1" (India)
//     if (data.BasicDetail.country !== '1') return true;
//     return !!data.BasicDetail.district && data.BasicDetail.district.trim() !== '';
//   },
//   {
//     message: 'District is required for India',
//     path: ['BasicDetail.district'],
//   }
// );


// .refine(
//   (data) => {
//     const { country, state } = data. BasicDetail;
//     // Only require state if country is India (1)
//     if (country === '1') {
//       return !!state && state.trim() !== '';
//     }
//     return true;
//   },
//   {
//     message: 'State is required for India',
//     path: ['EducationDetails.work_state'],
//   }
// )
// .refine(
//   (data) => {
//     const { country, district } = data. BasicDetail;
//     // Only require district if country is India (1)
//     if (country === '1') {
//       return !!district && district.trim() !== '';
//     }
//     return true;
//   },
//   {
//     message: 'District is required for India',
//     path: ['EducationDetails.work_district'],
//   }
// );
// const getMinDOB = () => {
//   const today = new Date();
//   today.setFullYear(today.getFullYear() - 18);
//   return today.toISOString().split('T')[0];
// };

// export const EditScheemaBasicDetails = z.object({
//   BasicDetail: z.object({
//     Name: z.string().min(1, 'Name is required'),
//     Gender: z.enum(['male', 'female'], {
//       errorMap: () => ({ message: 'Please select a gender' }),
//     }),
//     Mobile_no: z
//       .string()
//       .min(10, { message: 'Must be a valid mobile number' })
//       .max(14, { message: 'Must be a valid mobile number' }),
//     Email: z.string().email('Invalid email address'),
//     marital_status: z.string().min(1, 'Please select your marital status'),
//     dob: z.string()
//       .min(1, 'Date of Birth is required')
//       .refine(val => new Date(val) <= new Date(getMinDOB()), {
//         message: 'You must be at least 18 years old',
//       }),
//     address: z.string().min(1, 'Address is required'),
//     country: z.string().min(1, 'Country is required'),
    
//     // Make state and district optional by default
//     state: z.string().optional(),
//     district: z.string().optional(),
    
//     City: z.string().min(1, 'City is required'),
//     pincode: z.string().length(6, 'Post code must be 6 digits'),
//     Alt_Mobile_Number: z.string()
//       .min(10, 'This field is required')
//       .max(14, 'This field is required'),
//     AddOnPackage: z.string().optional(),
//     complexion: z.string().min(1, 'Complexion is required'),
//     status: z.string().min(1, 'Status is required'),
//     WhatsAppNumber: z.string().min(10, 'This field is required'),
//   }),
// })
// .refine(
//   (data) => {
//     const { country, state } = data.BasicDetail;
//     // Skip state validation if country is not India (1)
//     if (country !== '1') return true;
//     return !!state && state.trim() !== '';
//   },
//   {
//     message: 'State is required for India',
//     path: ['BasicDetail.state'],
//   }
// )
// .refine(
//   (data) => {
//     const { country, district } = data.BasicDetail;
//     // Skip district validation if country is not India (1)
//     if (country !== '1') return true;
//     return !!district && district.trim() !== '';
//   },
//   {
//     message: 'District is required for India',
//     path: ['BasicDetail.district'],
//   }
// );





// const getMinDOB = () => {
//   const today = new Date();
//   today.setFullYear(today.getFullYear() - 18);
//   return today.toISOString().split('T')[0];
// };

// export const EditScheemaBasicDetails = z.object({
//   BasicDetail: z.object({
//     Name: z.string().min(1, 'Name is required'),
//     Gender: z.enum(['male', 'female'], {
//       errorMap: () => ({ message: 'Please select a gender' }),
//     }),
//     Mobile_no: z
//       .string()
//       .min(10, { message: 'Must be a valid mobile number' })
//       .max(14, { message: 'Must be a valid mobile number' }),
//     Email: z.string().email('Invalid email address'),
//     marital_status: z.string().min(1, 'Please select your marital status'),
//     dob: z.string()
//       .min(1, 'Date of Birth is required')
//       .refine(val => new Date(val) <= new Date(getMinDOB()), {
//         message: 'You must be at least 18 years old',
//       }),
//     address: z.string().min(1, 'Address is required'),
//     country: z.string().min(1, 'Country is required'),
    
//     // Make state and district optional by default
//     state: z.string().optional(),
//     district: z.string().optional(),
    
//     City: z.string().min(1, 'City is required'),
//     pincode: z.string().length(6, 'Post code must be 6 digits'),
//     Alt_Mobile_Number: z.string()
//       .min(10, 'This field is required')
//       .max(14, 'This field is required'),
//     AddOnPackage: z.string().optional(),
//     complexion: z.string().min(1, 'Complexion is required'),
//     status: z.string().min(1, 'Status is required'),
//     WhatsAppNumber: z.string().min(10, 'This field is required'),
//   }),
// })
// .refine(
//   (data) => {
//     // Skip validation if country is not "1" (India)
//     if (data.BasicDetail.country !== '1') return true;
//     return !!data.BasicDetail.state && data.BasicDetail.state.trim() !== '';
//   },
//   {
//     message: 'State is required for India',
//     path: ['BasicDetail.state'],
//   }
// )
// .refine(
//   (data) => {
//     // Skip validation if country is not "1" (India)
//     if (data.BasicDetail.country !== '1') return true;
//     return !!data.BasicDetail.district && data.BasicDetail.district.trim() !== '';
//   },
//   {
//     message: 'District is required for India',
//     path: ['BasicDetail.district'],
//   }
// );


// import { z } from 'zod';

// const getMinDOB = () => {
//   const today = new Date();
//   today.setFullYear(today.getFullYear() - 18);
//   return today.toISOString().split('T')[0];
// };

// export const EditScheemaBasicDetails = z.object({
//   BasicDetail: z.object({
//     Name: z.string().min(1, 'Name is required'),
//     Gender: z.enum(['male', 'female'], {
//       errorMap: () => ({ message: 'Please select a gender' }),
//     }),
//     Mobile_no: z
//       .string()
//       .min(10, { message: 'Must be a valid mobile number' })
//       .max(14, { message: 'Must be a valid mobile number' }),
//     Email: z.string().email('Invalid email address'),
//     marital_status: z.string().min(1, 'Please select your marital status'),
//     dob: z.string()
//       .min(1, 'Date of Birth is required')
//       .refine(val => new Date(val) <= new Date(getMinDOB()), {
//         message: 'You must be at least 18 years old',
//       }),
//     address: z.string().min(1, 'Address is required'),
//     country: z.string().min(1, 'Country is required'),
    
//     // Make state and district optional by default
//     state: z.string().optional(),
//     district: z.string().optional(),
    
//     City: z.string().min(1, 'City is required'),
//     pincode: z.string().length(6, 'Post code must be 6 digits'),
//     Alt_Mobile_Number: z.string()
//       .min(10, 'This field is required')
//       .max(14, 'This field is required'),
//     AddOnPackage: z.string().optional(),
//     complexion: z.string().min(1, 'Complexion is required'),
//     status: z.string().min(1, 'Status is required'),
//     WhatsAppNumber: z.string().min(10, 'This field is required'),
//   }),
// })
// // Only validate state if country is "1" (India)
// .refine(
//   (data) => {
//     const countryId = data.BasicDetail.country;
//     // Skip validation if country is not "1" (India)
//     if (countryId !== '1') return true;
//     // Otherwise, require state
//     return !!data.BasicDetail.state && data.BasicDetail.state.trim() !== '';
//   },
//   {
//     message: 'State is required for India',
//     path: ['BasicDetail.state'],
//   }
// )
// // Only validate district if country is "1" (India)
// .refine(
//   (data) => {
//     const countryId = data.BasicDetail.country;
//     // Skip validation if country is not "1" (India)
//     if (countryId !== '1') return true;
//     // Otherwise, require district
//     return !!data.BasicDetail.district && data.BasicDetail.district.trim() !== '';
//   },
//   {
//     message: 'District is required for India',
//     path: ['BasicDetail.district'],
//   }
// );



// import { z } from 'zod';

// const getMinDOB = () => {
//   const today = new Date();
//   today.setFullYear(today.getFullYear() - 18);
//   return today.toISOString().split('T')[0];
// };

// export const EditScheemaBasicDetails = z.object({
//   BasicDetail: z.object({
//     Name: z.string().min(1, 'Name is required'),
//     Gender: z.enum(['male', 'female'], {
//       errorMap: () => ({ message: 'Please select a gender' }),
//     }),
//     Mobile_no: z
//       .string()
//       .min(10, { message: 'Must be a valid mobile number' })
//       .max(14, { message: 'Must be a valid mobile number' }),
//     Email: z.string().email('Invalid email address'),
//     marital_status: z.string().min(1, 'Please select your marital status'),
//     dob: z.string()
//       .min(1, 'Date of Birth is required')
//       .refine(val => new Date(val) <= new Date(getMinDOB()), {
//         message: 'You must be at least 18 years old',
//       }),
//     address: z.string().min(1, 'Address is required'),
//     country: z.string().min(1, 'Country is required'),
    
//     // Make state and district optional by default
//     state: z.string().optional(),
//     district: z.string().optional(),
    
//     City: z.string().min(1, 'City is required'),
//     pincode: z.string().length(6, 'Post code must be 6 digits'),
//     Alt_Mobile_Number: z.string()
//       .min(10, 'This field is required')
//       .max(14, 'This field is required'),
//     AddOnPackage: z.string().optional(),
//     complexion: z.string().min(1, 'Complexion is required'),
//     status: z.string().min(1, 'Status is required'),
//     WhatsAppNumber: z.string().min(10, 'This field is required'),
//   }),
// })
// // Only validate state if country is "1" (India)
// .refine(
//   (data) => {
//     const countryId = data.BasicDetail.country;
//     // Skip validation if country is not "1" (India)
//     if (countryId !== '1') return true;
//     // Otherwise, require state
//     return !!data.BasicDetail.state && data.BasicDetail.state.trim() !== '';
//   },
//   {
//     message: 'State is required for India',
//     path: ['BasicDetail.state'],
//   }
// )
// // Only validate district if country is "1" (India)
// .refine(
//   (data) => {
//     const countryId = data.BasicDetail.country;
//     // Skip validation if country is not "1" (India)
//     if (countryId !== '1') return true;
//     // Otherwise, require district
//     return !!data.BasicDetail.district && data.BasicDetail.district.trim() !== '';
//   },
//   {
//     message: 'District is required for India',
//     path: ['BasicDetail.district'],
//   }
// );


// import { z } from 'zod';

// const getMinDOB = () => {
//   const today = new Date();
//   today.setFullYear(today.getFullYear() - 18);
//   return today.toISOString().split('T')[0];
// };

// export const EditScheemaBasicDetails = z.object({
//   BasicDetail: z.object({
//     Name: z.string().min(1, 'Name is required'),
//     Gender: z.enum(['male', 'female'], {
//       errorMap: () => ({ message: 'Please select a gender' }),
//     }),
//     Mobile_no: z
//       .string()
//       .min(10, { message: 'Must be a valid mobile number' })
//       .max(14, { message: 'Must be a valid mobile number' }),
//     Email: z.string().email('Invalid email address'),
//     marital_status: z.string().min(1, 'Please select your marital status'),
//     dob: z.string()
//       .min(1, 'Date of Birth is required')
//       .refine(val => new Date(val) <= new Date(getMinDOB()), {
//         message: 'You must be at least 18 years old',
//       }),
//     address: z.string().min(1, 'Address is required'),
//     country: z.string().min(1, 'Country is required'),
    
//     // Make state and district optional by default
//     state: z.string().optional(),
//     district: z.string().optional(),
    
//     City: z.string().min(1, 'City is required'),
//     pincode: z.string().length(6, 'Post code must be 6 digits'),
//     Alt_Mobile_Number: z.string()
//       .min(10, 'This field is required')
//       .max(14, 'This field is required'),
//     AddOnPackage: z.string().optional(),
//     complexion: z.string().min(1, 'Complexion is required'),
//     status: z.string().min(1, 'Status is required'),
//     WhatsAppNumber: z.string().min(10, 'This field is required'),
//   }),
// })
// // Only validate state if country is "1" (India)
// .refine(
//   (data) => {
//     const countryId = data.BasicDetail.country;
//     // Skip validation if country is not "1" (India)
//     if (countryId !== '1') return true;
//     // Otherwise, require state
//     return !!data.BasicDetail.state && data.BasicDetail.state.trim() !== '';
//   },
//   {
//     message: 'State is required for India',
//     path: ['BasicDetail.state'],
//   }
// )
// // Only validate district if country is "1" (India)
// .refine(
//   (data) => {
//     const countryId = data.BasicDetail.country;
//     // Skip validation if country is not "1" (India)
//     if (countryId !== '1') return true;
//     // Otherwise, require district
//     return !!data.BasicDetail.district && data.BasicDetail.district.trim() !== '';
//   },
//   {
//     message: 'District is required for India',
//     path: ['BasicDetail.district'],
//   }
// );



import { z } from 'zod';

const getMinDOB = () => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 18);
  return today.toISOString().split('T')[0];
};

export const EditScheemaBasicDetails = z.object({
  BasicDetail: z.object({
    Name: z.string().min(1, 'Name is required'),
    Profile_height:z.string().optional(),
    Gender: z.enum(['male', 'female'], {
      errorMap: () => ({ message: 'Please select a gender' }),
    }),
    Mobile_no: z
      .string().optional().nullable(),
      // .min(10, { message: 'Must be a valid mobile number' })
      // .max(14, { message: 'Must be a valid mobile number' }),
   Email: z.string().email('Invalid email address').optional().or(z.literal('')),
    //  Email: z
    //   .string()
    //   .email("Invalid email address")
    //   .regex(
    //     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    //     "Invalid email format"
    //   ),
    marital_status: z.string().min(1, 'Please select your marital status'),
    dob: z.string()
      .min(1, 'Date of Birth is required')
      .refine(val => new Date(val) <= new Date(getMinDOB()), {
        message: 'You must be at least 18 years old',
      }),
    address: z.string().optional().nullable(),
    country: z.string().optional().nullable(),
    
    // Make state and district optional by default
    state: z.string().optional().nullable(),
    district: z.string().optional().nullable(),
    
    City: z.string().optional().nullable(),
    pincode: z.string().optional().nullable(),
    Alt_Mobile_Number: z.string().optional(),
      // .min(10, 'This field is required')
      // .max(14, 'This field is required'),
    AddOnPackage: z.string().optional(),
    complexion: z.string().min(1, 'Complexion is required'),
    status: z.string().min(1, 'Status is required'),
    WhatsAppNumber: z.string().optional(),
  }),
})
// Only validate state if country is "1" (India)
// .refine(
//   (data) => {
//     const countryId = data.BasicDetail.country;
//     // Skip validation if country is not "1" (India)
//     if (countryId !== '1') return true;
//     // Otherwise, require state
//     return !!data.BasicDetail.state && data.BasicDetail.state.trim() !== '';
//   },
//   {
//     message: 'State is required for India',
//     path: ['BasicDetail.state'],
//   }
// )
// // Only validate district if country is "1" (India)
// .refine(
//   (data) => {
//     const countryId = data.BasicDetail.country;
//     // Skip validation if country is not "1" (India)
//     if (countryId !== '1') return true;
//     // Otherwise, require district
//     return !!data.BasicDetail.district && data.BasicDetail.district.trim() !== '';
//   },
//   {
//     message: 'District is required for India',
//     path: ['BasicDetail.district'],
//   }
// );

export interface BasicDetailss {
  BasicDetail: {
    Name: string;
    Gender: 'male' | 'female';
    Mobile_no: string;
    Alt_Mobile_Number: string;
    WhatsAppNumber: string;
    address: string;
    Email: string;
    country: string;
    dob: string;
    marital_status: string;
    state?: string | null;
    City: string;
    complexion: string;
    district?: string | null;
    pincode: string;
    status: string;
    AddOnPackage?: string | null;
    Profile_height:string
  };
}

