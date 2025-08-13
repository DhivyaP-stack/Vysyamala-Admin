import React from "react";

interface AddOnsProps {
    label: string;
    desc: string;
    rate?: number;
    name: string;
    type?: string;
    value?: string;
    onChange?: (rate: number, checked: boolean) => void;
}

export const AddOns: React.FC<AddOnsProps> = ({
    label,
    desc,
    rate = 0,
    name,
    type = "checkbox",
    value,
    onChange,
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
                    onChange={handleCheckboxChange}
                />
                <div className="pl-2">
                    <label htmlFor={name} className="font-semibold">
                        {label}
                    </label>
                    <p className="text-sm font-normal">{desc}</p>
                </div>
            </div>

        </div>
    );
};