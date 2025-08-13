import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface field {
  WorkState: string;
}

export interface State {
  state_id: string;
  state_name: string;
}
interface DistrictSelectProps {
  setWorkState: Dispatch<SetStateAction<string>>;
  selectedCountryId: string;
  WorkState: State[];
}

// Zod schema for validating the district selection
const districtSchema = z.object({
  workdistrict: z.string().min(1, 'District is required'),
});

const StateSelect: React.FC<DistrictSelectProps> = ({
  WorkState,
  setWorkState,
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
    console.log('Form submitted with district:', data.WorkState);
    // You can perform additional actions here like API calls
  };

  const state = watch('WorkState');
  useEffect(() => {
    if (selectedCountryId === '1') {
      if (state === '') {
        setError('WorkState', {
          type: 'manual',
          message: 'state is required',
        });
      } else {
        clearErrors('WorkState');
      }
    }
  }, [selectedCountryId, state]);
  useEffect(() => {
    if (selectedCountryId !== '1') {
      clearErrors('WorkState');
    }
  }, [selectedCountryId, state]);
  return (
    <div>
      <label className="block text-black font-medium mb-1">
        State (Based on country selection)
      </label>
      <select
        {...register('WorkState')}
        onChange={(e) => {
          const value = e.target.value;
          setValue('WorkState', value); // Set the value for react-hook-form
          setWorkState(value); // Update state for selected district
          handleSubmit(onSubmit)(); // Submit the form after setting the value
        }}
        className="outline-none w-full px-4 py-2 border border-black rounded"
      >
        <option value="" disabled>
          Select your District
        </option>
        {WorkState?.map((option: State) => (
          <option key={option.state_id} value={option.state_id}>
            {option.state_name}
          </option>
        ))}
      </select>
      {errors?.WorkState && (
        <p className="text-red-600">{errors?.WorkState?.message}</p>
      )}
    </div>
  );
};

export default StateSelect;
