import React from 'react';

interface AddOnsProps {
  label: string;
  desc: string;
  rate?: number;
  name: string;
  type?: string;
  value?: string;
}

export const AddOnView: React.FC<AddOnsProps> = ({
  label,
  desc,
  rate = 0,
  name,
  type = 'checkbox',
  value,
}) => {
  const isChecked = Boolean(value);
  console.log(value, '////');

  return (
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-baseline">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          checked={isChecked}
        />
        <div className="pl-2">
          <label htmlFor={name} className="font-semibold text-black">
            {label}
          </label>
          <p className=" font-medium text-black">{desc}</p>
        </div>
      </div>

      <div>
        <p className="text-black">&#8377; {rate}</p>
      </div>
    </div>
  );
};
