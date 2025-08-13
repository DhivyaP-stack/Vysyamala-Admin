import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface field {
  workCity: string;
}

export interface City {
  city_id: number;
  city_name: string;
}

interface DistrictSelectProps {
  selectWorkCity: Dispatch<SetStateAction<string>>;
  selectedCountryId: string;
  workCity: City[];
}

// Zod schema for validating the district selection
const districtSchema = z.object({
  // workdistrict: z.string().min(1, 'District is required'),
});

const CitySelect: React.FC<DistrictSelectProps> = ({
  workCity,
  selectWorkCity,
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
    console.log('Form submitted with district:', data.workCity);
    // You can perform additional actions here like API calls
  };

  const city = watch('workCity');
  useEffect(() => {
    if (selectedCountryId === '1') {
      if (city === '') {
        setError('workCity', {
          type: 'manual',
          message: 'city is required',
        });
      } else {
        clearErrors('workCity');
      }
    }
  }, [selectedCountryId, city]);
  useEffect(() => {
    if (selectedCountryId !== '1') {
      clearErrors('workCity');
    }
  }, [selectedCountryId, city]);
  return (
    <div>
      <label className="block text-black font-medium mb-1">Work City</label>
      <select
        {...register('workCity')}
        onChange={(e) => {
          const value = e.target.value;
          setValue('workCity', value); // Set the value for react-hook-form
          selectWorkCity(value); // Update state for selected district
          handleSubmit(onSubmit)(); // Submit the form after setting the value
        }}
        className="outline-none w-full px-4 py-2 border border-black rounded"
      >
        <option value="" disabled>
          Select your District
        </option>
        {workCity?.map((option: City) => (
          <option key={option.city_id} value={option.city_id}>
            {option.city_name}
          </option>
        ))}
      </select>
      {errors?.workCity && (
        <p className="text-red-600">{errors?.workCity?.message}</p>
      )}
    </div>
  );
};

export default CitySelect;
