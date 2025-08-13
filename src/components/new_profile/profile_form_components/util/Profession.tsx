import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
interface field {
  Profession: string;
}

export interface ProfessionPref {
  Profes_Pref_id: number;
  Profes_name: string;
}
interface ProfessionProps {
  ProfessionalPreference: ProfessionPref[];
  profession: number;
  setProfession: Dispatch<SetStateAction<number>>;
}
const districtSchema = z.object({
  // workdistrict: z.string().min(1, 'District is required'),
});
const buttonClass = (isSelected: boolean) =>
  isSelected
    ? 'bg-secondary text-white'
    : 'border-gray hover:bg-secondary hover:text-white';

const Profession: React.FC<ProfessionProps> = ({
  ProfessionalPreference,
  setProfession,
  profession,
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
  const selectProfession = watch('Profession');
  useEffect(() => {
    if (!profession) {
      setError('Profession', {
        type: 'manual',
        message: 'Please select at least one profession',
      });
    }
  }, [profession]);
  useEffect(() => {
    if (profession) {
      clearErrors('Profession');
    }
  }, [profession, clearErrors]);

  return (
    <>
      <label className="block text-black font-medium mb-1">
        <h1 className="mb-3">Profession</h1>
      </label>

      <div className="w-full inline-flex rounded">
        {ProfessionalPreference?.map((Profession: ProfessionPref) => (
          <button
            key={Profession.Profes_Pref_id}
            type="button"
            className={`w-full px-5 py-3 text-sm font-medium border ${buttonClass(
              profession === Profession.Profes_Pref_id,
            )}`}
            onClick={() => setProfession(Profession.Profes_Pref_id)}
            {...register('Profession')}
          >
            {Profession.Profes_name}
          </button>
        ))}
      </div>
      {errors?.Profession && (
        <p className="text-red-600">{errors?.Profession?.message}</p>
      )}
    </>
  );
};

export default Profession;
