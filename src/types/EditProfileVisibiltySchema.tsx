import { z } from "zod";

export const profileVisibilitySchema = z.object({
  profile_visibility: z.object({
    visibility_age_from: z.string().optional(),
    visibility_age_to: z.string().optional(),
    visibility_height_from: z.string().optional(),
    visibility_height_to: z.string().optional(),
    visibility_profession: z.string().optional(),
    visibility_education: z.string().optional(),
    visibility_field_of_study: z.string().optional(),
    degree: z.string().optional(),
    visibility_anual_income: z.string().optional(),
    visibility_anual_income_max: z.string().optional(),
    visibility_family_status: z.string().nullable().optional(),
    visibility_chevvai: z.string().optional(),
    visibility_ragukethu: z.string().optional(),
    visibility_foreign_interest: z.string().optional(),
    status: z.string().optional()
  })
});


export interface ProfileVisibilityResponse {
  profile_visibility: {
    profile_id?: string;
    visibility_age_from: string;
    visibility_age_to: string;
    visibility_height_from: string;
    visibility_height_to: string;
    visibility_profession: string;
    visibility_education: string;
    visibility_field_of_study: string;
    degree: string;
    visibility_anual_income: string;
    visibility_anual_income_max: string;
    visibility_family_status: string | null;
    visibility_chevvai: string;
    visibility_ragukethu: string;
    visibility_foreign_interest: string;
    status?: string;
  };
}
