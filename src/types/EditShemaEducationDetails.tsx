// // import { z } from 'zod';

// // export const EditScheemaEducationDetails = z.object({
// //     EducationDetails: z.object({
// //         workCountry: z.string().min(1, 'Work Country is required'),
// //         heighestEducation: z.string().min(1, 'HeighestEducation is required'),
// //         field_ofstudy: z.string().min(1, 'Field Of Study is required'),
// //         AboutEducation: z.string().min(1, 'About your education is required'),
// //         AnnualIncome: z.string().min(1, 'Annual income is required'),
// //         ActualIncome: z.string().min(1, 'Actual income is required'),
// //         pincode: z.string().length(6, 'Post code must be 6 digits'),
// //         CareerPlans: z.string().min(1, 'CareerPlans are required'),
// //         ug_degeree: z.string().min(1, 'UG degree is required'),
// //         profession: z.string().min(1, 'Profession is required'),
// //         workplace: z.string().optional(),
// //         statetemp: z.string().optional(),
// //         citytemp: z.string().optional(),
// //         disttemp: z.string().optional(),
// //       }),

// //   });


// // export interface EducationDetails{
// //     EducationDetails: {
// //       workCountry: string;
// //       heighestEducation: string;
// //       AboutEducation: string;
// //       workdistrict: string;
// //       WorkState: string;
// //       profession: string;
// //       AnnualIncome: string;
// //       ActualIncome: string;
// //       pincode: string;
// //       ug_degeree: string;
// //       CareerPlans: string;
// //       workplace: string;
// //       statetemp: string;
// //       citytemp: string;
// //       disttemp: string;
// //       field_ofstudy:string;
// //     };
// //   }



// import { z } from 'zod';

// export const EditScheemaEducationDetails = z.object({
//     EducationDetails: z.object({
//         work_country: z.string().min(1, 'Work Country is required'),
//         heighestEducation: z.string().min(1, 'HeighestEducation is required'),
//         // field_ofstudy: z.string().min(1, 'Field Of Study is required'),
//         field_ofstudy: z.string().optional(),
//         AboutEducation: z.string().min(1, 'About your education is required'),
//         AnnualIncome: z.string().min(1, 'Annual income is required'),
//         ActualIncome: z.string().min(1, 'Actual income is required'),
//         pincode: z.string().min(1, 'Please enter your pincode'),
//         CareerPlans: z.string().min(1, 'CareerPlans are required'),
//         // ug_degeree: z.string().min(1, 'UG degree is required'),
//         degree: z.string().nullish().optional(),
//         other_degree: z.string().optional(),
//         profession: z.string().min(1, 'Profession is required'),
//         workplace: z.string().optional(),
//         work_state: z.string().min(1, 'State is required'),
//         work_city: z.string().min(1, 'City is required'),
//         work_district: z.string().min(1, 'District is required'),
//       }),

//     }).refine(
//       (data) => {
//         const { heighestEducation, field_ofstudy } = data.EducationDetails;

//         // If highest education is 1, 2, 3, or 4, field_ofstudy is required
//         if (['1', '2', '3', '4'].includes(heighestEducation)) {
//           return !!field_ofstudy && field_ofstudy.trim() !== '';
//         }

//         // Otherwise, no additional validation is needed
//         return true;
//       },
//       {
//         message: 'Field of Study is required',
//         path: ['EducationDetails.field_ofstudy'],
//       }
//     ).refine(
//       (data) => {
//         const { heighestEducation, degree } = data.EducationDetails;

//         // If highest education is 1, 2, 3, or 4, degree is required
//         if (['1', '2', '3', '4'].includes(heighestEducation)) {
//           return !!degree && degree.trim() !== '';
//         }

//         // Otherwise, no additional validation is needed
//         return true;
//       },
//       {
//         message: 'Degree is required',
//         path: ['EducationDetails.degree'],
//       }
//     ).refine(
//       (data) => {
//         const { work_country, work_state, work_district } = data.EducationDetails;

//         // If work_country is '1' (India) and work_state is selected, work_district is required
//         if (work_country === '1' && work_state && work_state.trim() !== '') {
//           return work_district && work_district.trim() !== '';
//         }

//         // Otherwise, work_district is optional
//         return true;
//       },
//       {
//         message: 'District is required',
//         path: ['EducationDetails.work_district'],
//       }
//     );


// export interface EducationDetails{
//     EducationDetails: {
//       work_country: string;
//       heighestEducation: string;
//       AboutEducation: string;
//       work_district?: string | null;
//       work_state?: string | null;
//       profession: string;
//       AnnualIncome: string;
//       ActualIncome: string;
//       pincode: string;
//       degree?: string | null;
//       other_degree?: string | null;
//       CareerPlans: string;
//       workplace?: string | null;
//       statetemp?: string | null;
//       work_city?: string | null;
//       field_ofstudy?: string | null;
//     };
//   }



import { z } from 'zod';

export const EditScheemaEducationDetails = z.object({
  EducationDetails: z.object({
    work_country: z.string().optional(),
    heighestEducation: z.string().min(1, 'Highest Education is required'),
    field_ofstudy: z.string().optional(),
    AboutEducation: z.string().optional(),
    AnnualIncome: z.string().optional(),
    ActualIncome: z.string().optional(),
    pincode: z.string().optional(),
    CareerPlans: z.string().optional(),
    degree: z.string().nullish().optional(),
    other_degree: z.string().optional(),
    profession: z.string().min(1, 'Profession is required'),
    workplace: z.string().optional(),
    // Make state and district optional by default
    work_state: z.string().optional(),
    work_city: z.string().optional(),
    work_district: z.string().optional(),
  })
    .refine(
      (data) => {
        // If country = 1 → work_state must not be empty
        if (data.work_country === '1') {
          return !!data.work_state && data.work_state.trim().length > 0;
        }
        return true;
      },
      {
        message: 'Work State is required for the selected country.',
        path: ['work_state'],
      }
    )
    .refine(
      (data) => {
        // If country = 1 and state selected → work_district must not be empty
        if (data.work_country === '1') {
          return !!data.work_district && data.work_district.trim().length > 0;
        }
        return true;
      },
      {
        message: 'Work District is required for the selected country..',
        path: ['work_district'],
      }
    ),
})
// .refine(
//   (data) => {
//     const { heighestEducation, field_ofstudy } = data.EducationDetails;
//     if (['1', '2', '3', '4'].includes(heighestEducation)) {
//       return !!field_ofstudy && field_ofstudy.trim() !== '';
//     }
//     return true;
//   },
//   {
//     message: 'Field of Study is required',
//     path: ['EducationDetails.field_ofstudy'],
//   }
// )
// .refine(
//   (data) => {
//     const { heighestEducation, degree } = data.EducationDetails;
//     if (['1', '2', '3', '4'].includes(heighestEducation)) {
//       return !!degree && degree.trim() !== '';
//     }
//     return true;
//   },
//   {
//     message: 'Degree is required',
//     path: ['EducationDetails.degree'],
//   }
// )
// .refine(
//   (data) => {
//     const { work_country, work_state } = data.EducationDetails;
//     // Only require state if country is India (1)
//     if (work_country === '1') {
//       return !!work_state && work_state.trim() !== '';
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
//     const { work_country, work_district } = data.EducationDetails;
//     // Only require district if country is India (1)
//     if (work_country === '1') {
//       return !!work_district && work_district.trim() !== '';
//     }
//     return true;
//   },
//   {
//     message: 'District is required for India',
//     path: ['EducationDetails.work_district'],
//   }
// );

export interface EducationDetails {
  EducationDetails: {
    work_country: string;
    heighestEducation: string;
    AboutEducation: string;
    work_district?: string | null;
    work_state?: string | null;
    profession: string;
    AnnualIncome: string;
    ActualIncome: string;
    pincode: string;
    degree?: string | null;
    other_degree?: string | null;
    CareerPlans: string;
    workplace?: string | null;
    work_city: string;
    field_ofstudy?: string | null;
  };
}