import { z } from 'zod';

export const EditScheemaPartnerPreference = z.object({
  PartnerPreference: z.object({
    heightFrom: z.string().min(3, 'Height is required'),
    toHeight: z.string().min(3, 'Height is required'),
    agePreference: z.string().min(1, 'age difference is required'),
    ChevvaiDhosam: z.string().optional(),
    ragukethu: z.string().optional(),
    // heightPreference: z.string().min(3, 'Please select prefered Height'),
    //FamilyStatus: z.string().min(1, 'Family status is required'),
    foreignInterest: z.string().optional(),
    profession: z.string().optional(),
    annualIncome: z.string().optional(),
    pref_family_status: z.string().nullable(),
    pref_state: z.string().nullable(),
    pref_anual_income_max: z.string().optional(),
    // matchingStars: z.array(z.object({
    //   id: z.string(),
    //   rasi: z.string(),
    //   star: z.string(),
    //   label: z.string()
    // })).min(1, 'Please select at least one matching star'),
    matchingStars: z.array(
      z.object({
        id: z.string().min(1),
        rasi: z.string().min(1),
        star: z.string().min(1),
        label: z.string().min(1)
      })

    ).optional()
  }),
  pref_fieldof_study: z.string().optional(),
  degree: z.string().optional(),

});




export interface PartnerPreference {
  PartnerPreference: {
    foreignInterest: boolean;
    heightFrom: string;
    toHeight: string;
    agePreference: string;
    heightPreference: string;
    ragukethu: string;
    ChevvaiDhosam: string;
    // FamilyStatus: string;
    pref_family_status: string | null;
    profession: string;
    annualIncome: string;
    pref_anual_income_max: string;
    matchingStars: {
      id: string;
      rasi: string;
      star: string;
      label: string;
    }[];
    pref_state: string;
    pref_fieldof_study:string;
    degree:string;
  };
}