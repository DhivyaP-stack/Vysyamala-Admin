import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface field {
  workdistrict: string;
}

export interface District {
  disctict_id: string;
  disctict_name: string;
}

interface DistrictSelectProps {
  selectWorkDistrict: Dispatch<SetStateAction<string>>;
  selectedCountryId: string;
  WorkDistrict: District[];
}

// Zod schema for validating the district selection
const districtSchema = z.object({
  // workdistrict: z.string().min(1, 'District is required'),
});

const DistrictSelect: React.FC<DistrictSelectProps> = ({
  WorkDistrict,
  selectWorkDistrict,
  selectedCountryId,
}) => {
  const {
    register,
    handleSubmit,
    setValue, // Use this to programmatically set form values
    formState: { errors },
    setError,
    watch,
    clearErrors,
  } = useForm<field>({
    resolver: zodResolver(districtSchema),
  });

  // Handle form submission
  const onSubmit = (data: field) => {
    console.log('Form submitted with district:', data.workdistrict);
    // You can perform additional actions here like API calls
  };

  const district = watch('workdistrict');
  useEffect(() => {
    if (selectedCountryId === '1') {
      if (district === '') {
        setError('workdistrict', {
          type: 'manual',
          message: 'District is required',
        });
      } else {
        clearErrors('workdistrict');
      }
    }
  }, [selectedCountryId, district]);
  useEffect(() => {
    if (selectedCountryId !== '1') {
      clearErrors('workdistrict');
    }
  }, [selectedCountryId, district]);
  return (
    <div>
      <label className="block text-black font-medium mb-1">District</label>
      <select
        {...register('workdistrict')}
        onChange={(e) => {
          const value = e.target.value;
          setValue('workdistrict', value); // Set the value for react-hook-form
          selectWorkDistrict(value); // Update state for selected district
          handleSubmit(onSubmit)(); // Submit the form after setting the value
        }}
        className="outline-none w-full px-4 py-2 border border-black rounded"
      >
        <option value="" disabled>
          Select your District
        </option>
        {WorkDistrict?.map((option: District) => (
          <option key={option.disctict_id} value={option.disctict_id}>
            {option.disctict_name}
          </option>
        ))}
      </select>
      {errors?.workdistrict && (
        <p className="text-red-600">{errors?.workdistrict?.message}</p>
      )}
    </div>
  );
};

export default DistrictSelect;
