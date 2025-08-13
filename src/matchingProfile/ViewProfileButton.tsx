// Button.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
 
  label: string;
  type?: 'button' | 'submit' | 'reset';
  path :string;
  profileId?:string;
}

const ViewProfileButton: React.FC<ButtonProps> = ({ label, type = 'button' ,path,profileId}) => {
    const navigate = useNavigate();
  return (
    <button
    onClick={() => navigate(`/${path}?profileId=${profileId}`)}
      type={type}
      className={`bg-blue-500 text-white px-4 py-2 rounded `}
    >
      {label}
    </button>
  );
};

export default ViewProfileButton;
