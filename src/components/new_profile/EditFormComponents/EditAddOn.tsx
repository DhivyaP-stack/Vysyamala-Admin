import React from "react";

interface AddOnsProps {
    label: string;
    desc: string;
    rate?: number;
    id:string;
    name: string;
    type?: string;
    value?: string;
    checked: boolean;
    onChange?: (rate: number, checked: boolean) => void;
}

export const EditAddOn: React.FC<AddOnsProps> = ({
    label,
    desc,
    rate = 0,
    name,
    type = "checkbox",
    value,
    onChange,
    checked,
    id
}) => {
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(rate, e.target.checked);
        }
    };

    return (
        <div className="flex justify-between items-start mb-3">
            <div className="flex items-baseline">
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                   
                    checked={checked}
                    onChange={handleCheckboxChange}
                />
                <div className="pl-2">
                    <label htmlFor={name} className="font-semibold">
                        {label}
                    </label>
                    <p className="text-sm font-normal">{desc}</p>
                </div>
            </div>

            <div>
                <p className="text-ash">&#8377; {rate}.00/-</p>
            </div>
        </div>
    );
};