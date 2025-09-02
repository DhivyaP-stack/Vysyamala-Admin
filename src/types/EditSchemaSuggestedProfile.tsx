import { z } from 'zod';

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
    pref_fieldof_study: z.string().optional(),
    degree: z.string().nullish().optional(),
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
    pref_family_status: string
    pref_state: string;
    pref_fieldof_study: string;
    degree: string;
  };
}
