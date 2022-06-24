import { toast } from 'react-toastify';

export const showSuccess = (msg = ``, options = {}) => {
  toast.success(msg, options);
};

export const showError = (msg = ``, options = {}) => {
  toast.error(msg, options);
};
