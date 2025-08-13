import React from 'react';

interface SelectFieldProps {
  label: string;
  name: string;
  options: { value: string | number; label: string }[];
  register: any; // Replace with the specific type from react-hook-form if you're using TypeScript
  errors?: any; // Replace with specific type if needed
  required?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  register,
  errors,
  required = false,
}) => {
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block text-black font-medium mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        {...register(name)}
        className="outline-none w-full px-4 py-2 border border-black rounded"
      >
        <option value="" disabled>
          Select your {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors && errors[name] && (
        <p className="text-red-600">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};

export default SelectField;
