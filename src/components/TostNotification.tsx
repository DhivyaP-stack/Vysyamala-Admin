
import React from 'react';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
  transition: Bounce,
};

export const notify = (message: string, options?: ToastOptions) => {
  toast.success(message, { ...defaultOptions, ...options });
};
export const notifyDelete = (message: string, options?: ToastOptions) => {
  toast.error(message, { ...defaultOptions, ...options });
};

const Notification: React.FC = () => {
  return <ToastContainer />;
};

export default Notification;
