import { z } from 'zod';


export const EditScheema = z.object({

  FamilyDetails: z.object({
    fathername: z.string().min(1, 'Father Name is required'),
     father_alive:z.string().optional(),
    mother_alive:z.string().optional(),
    fatherOccupation: z.string().optional(),
    motherOccupation: z.string().optional(),
    AboutMyself: z.string().optional(),
    motherName: z.string().optional(),
    bloodGroup: z.string().optional(),
    // FamilyName: z.string().nullable().transform(val => val || '').pipe(
    //   z.string().min(1, 'Family Name is required')
    // ),

     FamilyName: z.string().nullable(),
    MyHobbies: z.string().optional(),
    EyeWear: z.string().optional(),
    PropertyDetails: z.string().optional(),
    SuyaGothram: z.string().min(1, 'SuyaGothram is required'),
    // UncleGothram: z.string().nullable().transform(val => val || '').pipe(
    //   z.string().min(1, 'Uncle Gothram is required')
    // ),
     UncleGothram: z.string().nullable().optional(),
    AncestorOrigin: z.string().optional(),
    AboutMyFamily: z.string().optional(),
    FamilyValue: z.string().optional(),
    FamilyType: z.string().optional(),
    FamilyStatus: z.string().optional(),
    // PropertyWorth: z.string().nullable().transform(val => val || '').pipe(
    //   z.string().min(1, 'Property Worth is required')
    // ),
      PropertyWorth: z.string().nullable().optional(),
    //kg: z.string().optional(),
    weight: z.string().optional(),
    challengedDetail: z.string().optional(),
    selectedBrother: z.string().optional(),
    marriedBrother: z.string().optional(),
    selectedSister: z.string().optional(),
    marriedSisters: z.string().optional(),
    physicallyChalanged: z.string().optional(),
    no_of_children: z.union([
  z.number().int().min(0).max(5),
  z.undefined()
]).optional().transform(val => val === undefined ? null : val),
   // no_of_children:z.number().optional(),
    // suya_gothram_admin:z.number().optional(),
    // uncle_gothram_admin:z.number().optional()
suya_gothram_admin: z.union([
  z.number(),
  z.string().transform(val => Number(val))
]).optional(),
uncle_gothram_admin: z.union([
  z.number(),
  z.string().transform(val => Number(val))
]).optional()
  }),

  // EducationDetails: z.object({
  //   workCountry: z.string().min(1, 'Work Country is required'),
  //   heighestEducation: z.string().min(1, 'HeighestEducation is required'),
  //   field_ofstudy: z.string().min(1, 'Field Of Study is required'),
  //   AboutEducation: z.string().min(1, 'About your education is required'),
  //   AnnualIncome: z.string().min(1, 'Annual income is required'),
  //   ActualIncome: z.string().min(1, 'Actual income is required'),
  //   pincode: z.string().length(6, 'Post code must be 6 digits'),
  //   CareerPlans: z.string().min(1, 'CareerPlans are required'),
  //   ug_degeree: z.string().min(1, 'UG degree is required'),
  //   profession: z.string().min(1, 'Profession is required'),
  //   workplace: z.string().optional(),
  //   statetemp: z.string().optional(),
  //   citytemp: z.string().optional(),
  //   disttemp: z.string().optional(),
  // }),

});



export interface FamilyDetailsValues {
  FamilyDetails: {
    MyHobbies: string;
    EyeWear: string;
    fathername: string;
    fatherOccupation: string;
    motherName: string;
    motherOccupation: string;
    AboutMyself: string;
    FamilyName: string;
    FamilyType: string;
    bloodGroup: string;
    PropertyDetails: string;
    //kg: string;
    weight:string;
    UncleGothram: string;
    FamilyValue: string;
    PhysicallyChallenged: string;
    FamilyStatus: string;
    PropertyWorth: string;
    selectedBrother: string;
    marriedBrother: string | null | undefined | "";
    selectedSister: string;
    marriedSisters: string | null | undefined | "";
    physicallyChalanged: 'yes' | 'no';
    Pysically_changed: string;
    challengedDetail: string;
    SuyaGothram: string;
    AncestorOrigin: string;
    AboutMyFamily: string;
    no_of_children?:number |null;
    suya_gothram_admin: string;
uncle_gothram_admin: string;
father_alive:string;
mother_alive:string
  };
}


// export interface EducationDetails{
//   EducationDetails: {
//     workCountry: string;
//     heighestEducation: string;
//     AboutEducation: string;
//     workdistrict: string;
//     WorkState: string;
//     profession: string;
//     AnnualIncome: string;
//     ActualIncome: string;
//     pincode: string;
//     ug_degeree: string;
//     CareerPlans: string;
//     workplace: string;
//     statetemp: string;
//     citytemp: string;
//     disttemp: string;
//   };
// }

