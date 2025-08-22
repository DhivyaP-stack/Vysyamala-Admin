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
    company_name: z.string().optional(),
    designation: z.string().optional(),
    profession_details: z.string().optional(),
    business_name: z.string().optional(),
    business_address: z.string().optional(),
    nature_of_business: z.string().optional(),
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

export interface EducationDetails {
  EducationDetails: {
    work_country: string;
    heighestEducation: string;
    AboutEducation: string;
    work_district?: string | null;
    work_state?: string | null;
    profession: string;
    company_name:string;
    designation:string;
    profession_details:string;
    business_name:string;
    business_address:string;
    nature_of_business:string;
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