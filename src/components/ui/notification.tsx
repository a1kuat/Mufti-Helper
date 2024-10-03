import { toast, Toaster } from 'react-hot-toast';

const notify = (message: string, type: 'success' | 'error') => {
  const accentColor = type === 'error' ? '#B00020' : '#191D23';
  toast[type](message, {
    style: {
      border: `1px solid ${accentColor}`,
      padding: '8px',
      color: accentColor,
    },
    iconTheme: {
      primary: accentColor,
      secondary: '#FFFAEE',
    },
    position: 'top-right',
  });
};
export { Toaster, notify };
