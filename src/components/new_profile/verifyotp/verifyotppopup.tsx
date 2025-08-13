import React, { useState, useRef } from 'react';
import { apiAxios } from '../../../api/apiUrl';
import { toast } from 'react-toastify';
import { IoClose } from 'react-icons/io5';

interface VerifyOTPPopupProps {
  onClose: () => void;
  profileId: string;
}

export default function VerifyOTPPopup({ onClose, profileId }: VerifyOTPPopupProps) {
  const [otpDigits, setOtpDigits] = useState(Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);
    // Focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const otp = otpDigits.join('');
    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await apiAxios.post('/api/verify_mobile_otp/', {
        profile_id: profileId,
        otp: otp,
      });
      const data = response.data;
      if (data.status === 'success') {
        toast.success('OTP Verified Successfully');
        onClose();
      } else {
        setError(data.message || 'Verification failed');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-md shadow-lg p-6 w-[400px]">
        <button
          onClick={onClose}
          className="absolute top-5 right-3 text-gray-500 hover:text-red-600 text-2xl"
        >
          <IoClose />
        </button>
        <h2 className="text-center text-xl font-bold text-red-600 mb-2">Verify OTP</h2>
        <p className="text-center text-gray-700 mb-4">Enter the Otp Received to the Profile mobile number</p>

        <div className="flex justify-center space-x-2 mb-4">
          {otpDigits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-12 text-center border border-gray-300 rounded text-xl focus-within:outline-none"
            />
          ))}
        </div>

        {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

        <div className="flex justify-center space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-red-600 bg-white border border-red-400 rounded shadow-sm hover:bg-gray-100"
          >
            CANCEL
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-red-600 rounded shadow hover:bg-red-700"
          >
            {loading ? 'VERIFYING...' : 'SUBMIT'}
          </button>
        </div>
      </div>
    </div>
  );
}
