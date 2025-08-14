import { z } from 'zod';

const getMinDOB = () => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 18);
  return today.toISOString().split('T')[0];
};

export const EditScheemaBasicDetails = z.object({
  BasicDetail: z.object({
    Name: z.string().min(1, 'Name is required'),
    Profile_height: z.string().optional(),
    Gender: z.enum(['male', 'female'], {
      errorMap: () => ({ message: 'Please select a gender' }),
    }),
    Mobile_no: z
      .string().min(1, 'Mobile Number is required'),
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
    complexion: z.string().optional(),
    status: z.string().min(1, 'Status is required'),
    WhatsAppNumber: z.string().optional(),
  })
    .refine(
      (data) => {
        // If the selected country has an ID of '1'...
        if (data.country === '1') {
          // ...then the state field must not be empty.
          return !!data.state && data.state.length > 0;
        }
        // For any other country, this validation rule passes.
        return true;
      },
      {
        // This is the error message that will be shown.
        message: 'State is required for the selected country.',
        // This is crucial: it tells Zod to show the error on the 'state' field.
        path: ['state'],
      })
      .refine(
      (data) => {
        // If a state has been selected (i.e., it's not null or empty)...
        if (data.state && data.state.length > 0) {
          // ...then the district field must also not be empty.
          return !!data.district && data.district.length > 0;
        }
        // If no state is selected, this rule passes.
        return true;
      },
      {
        message: 'District is required when a state is selected.',
        // Crucially, attach this error to the 'district' field.
        path: ['district'],
      }
    ),
})


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
    Profile_height: string
  };
}

