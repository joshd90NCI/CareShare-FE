import { createContext, FC, ReactNode, useCallback, useState } from 'react';
import { AlertContextType } from '../types.ts';
import { Alert, AlertProps, Snackbar } from '@mui/material';

export const AlertContext = createContext<AlertContextType>({ showAlert: () => null });

type Props = { children: ReactNode };

export const AlertProvider: FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertProps['severity']>('info');

  const showAlert = useCallback((msg: string, sev: AlertProps['severity'] = 'info') => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};
