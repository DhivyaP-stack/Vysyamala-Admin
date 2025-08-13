import { z } from "zod";

// export const profileVisibilitySchema = z.object({
//   profile_id: z.string().optional(),
//   visibility_age_from: z.string().optional(),
//   visibility_age_to: z.string().optional(),
//   visibility_height_from: z.string().optional(),
//   visibility_height_to: z.string().optional(),
//   visibility_profession: z.string().optional(), // comma-separated string
//   visibility_education: z.string().optional(),
//   visibility_anual_income: z.string().optional(),
//   visibility_family_status: z.string().nullable().optional(),
//   visibility_chevvai: z.enum(["Yes", "No", "YES", "NO"]).optional(),
//   visibility_ragukethu: z.enum(["Yes", "No", "YES", "NO"]).optional(),
//   visibility_foreign_interest: z.enum(["Yes", "No", "BOTH", "YES", "NO"]).optional(),
//   status: z.string().optional()
// });


export const profileVisibilitySchema = z.object({
  profile_visibility: z.object({
    visibility_age_from: z.string().optional(),
    visibility_age_to: z.string().optional(),
    visibility_height_from: z.string().optional(),
    visibility_height_to: z.string().optional(),
    visibility_profession: z.string().optional(),
    visibility_education: z.string().optional(),
    visibility_anual_income: z.string().optional(),
    visibility_family_status: z.string().nullable().optional(),
    visibility_chevvai: z.string().optional(),
    visibility_ragukethu: z.string().optional(),
    visibility_foreign_interest: z.string().optional(),
    status: z.string().optional()
  })
});

// const fullSchema = z.object({
//   profile_visibility: z.array(profileVisibilitySchema).optional()
// });


// export interface ProfileVisibility {
//   profile_id?: string;
//   visibility_age_from?: string;
//   visibility_age_to?: string;
//   visibility_height_from?: string;
//   visibility_height_to?: string;
//   visibility_profession?: string; // e.g., "5,1,5"
//   visibility_education?: string;  // e.g., "5"
//   visibility_anual_income?: string; // e.g., "1,5,1"
//   visibility_family_status?: string | null;
//   visibility_chevvai?: "Yes" | "No" | "YES" | "NO";
//   visibility_ragukethu?: "Yes" | "No" | "YES" | "NO";
//   visibility_foreign_interest?: "Yes" | "No" | "BOTH" | "YES" | "NO";
//   status?: string;
// }

// export interface ProfileVisibilityResponse {
//   profile_visibility?: {
//      profile_id?: string;
//   visibility_age_from?: string;
//   visibility_age_to?: string;
//   visibility_height_from?: string;
//   visibility_height_to?: string;
//   visibility_profession?: string; // e.g., "5,1,5"
//   visibility_education?: string;  // e.g., "5"
//   visibility_anual_income?: string; // e.g., "1,5,1"
//   visibility_family_status?: string | null;
//   visibility_chevvai?: "Yes" | "No" | "YES" | "NO";
//   visibility_ragukethu?: "Yes" | "No" | "YES" | "NO";
//   visibility_foreign_interest?: "Yes" | "No" | "BOTH" | "YES" | "NO";
//   status?: string;
//   }
// }


export interface ProfileVisibilityResponse {
  profile_visibility: {
    profile_id?: string;
    visibility_age_from: string;
    visibility_age_to: string;
    visibility_height_from: string;
    visibility_height_to: string;
    visibility_profession: string;
    visibility_education: string;
    visibility_anual_income: string;
    visibility_family_status: string | null;
    visibility_chevvai: string;
    visibility_ragukethu: string;
    visibility_foreign_interest: string;
    status?: string;
  };
}
