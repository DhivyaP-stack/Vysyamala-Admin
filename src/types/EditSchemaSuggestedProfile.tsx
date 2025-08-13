// import { z } from 'zod';

// export const EditScheemaSuggestedProfile = z.object({
//     suggested_pref_details: z.object({
//         pref_height_from: z.string().min(3, 'Height is required'),
//         pref_height_to: z.string().min(3, 'Height is required'),
//         pref_age_differences: z.string().min(1, 'age difference is required'),
//         pref_chevvai: z.string().min(1, 'Please select Chevvai Dhosam'),
//         pref_ragukethu: z.string().min(1, 'Please select Rahu/Ketu Dhosam'),
//         // heightPreference: z.string().min(3, 'Please select prefered Height'),
//         foreignInterest: z.string().min(1, 'Please select Foreign Interest'),
//         pref_profession: z.string().optional(),
//         pref_anual_income:z.string().optional(),
//       }), 
//   });




//   export interface suggestedProfile{
//     suggested_pref_details: {
//         pref_height_from: string;
//         pref_height_to: string;
//         pref_age_differences: string;
//         heightPreference: string;
//         pref_ragukethu: string;
//         pref_chevvai: string;
//         pref_foreign_intrest: string;
//         pref_profession: string;
//         pref_anual_income:string;
//       };
//     }



import { z } from 'zod';

// export const EditScheemaSuggestedProfile = z.object({
//   suggested_pref_details: z.object({
//     pref_height_from: z.string().min(3, 'Height is required'),
//     pref_height_to: z.string().min(3, 'Height is required'),
//     pref_age_differences: z.string().min(1, 'Age difference is required'),
//     pref_chevvai: z.string().min(1, 'Please select Chevvai Dhosam'),
//     pref_ragukethu: z.string().min(1, 'Please select Rahu/Ketu Dhosam'),
//     pref_foreign_intrest: z.string().min(1, 'Please select Foreign Interest'),  
//     pref_profession: z.string().optional(),
//     pref_anual_income: z.string().optional(),
//     pref_anual_income_max: z.string().optional(),
//     pref_porutham_star: z.string().min(1, 'Please select at least one matching star'),
//     pref_family_status:z.string().min(1, 'Family status is required'),
//     pref_state:z.string().min(1, 'Preffered State is required'),
//     // pref_porutham_star_rasi: z.string().min(1, 'Star and Rasi combination is required'),
//   }), 
// });


export const EditScheemaSuggestedProfile = z.object({
  suggested_pref_details: z.object({
    pref_height_from: z.string().optional(),
    pref_height_to: z.string().optional(),
    pref_age_differences: z.string().optional(),
    pref_chevvai: z.string().optional(),
    pref_ragukethu: z.string().optional(),
    pref_foreign_intrest: z.string().optional(),
    pref_profession: z.string().optional(),
    pref_anual_income: z.string().optional(),
    pref_anual_income_max: z.string().optional(),
    pref_porutham_star: z.string().optional(),
    pref_family_status: z.string().optional(),
    pref_state: z.string().optional(),
    // pref_porutham_star_rasi: z.string().optional(),
  }),
});

export interface suggestedProfile {
  suggested_pref_details: {
    pref_height_from: string;
    pref_height_to: string;
    pref_age_differences: string;
    pref_ragukethu: string;
    pref_chevvai: string;
    pref_foreign_intrest: string;
    pref_profession?: string;
    pref_anual_income: string;
    pref_anual_income_max: string;
    pref_porutham_star: string;
    pref_porutham_star_rasi: string;
    pref_family_status:string
    pref_state:string
  };
}
