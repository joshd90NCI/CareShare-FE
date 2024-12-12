import { createContext, FC, ReactNode, useCallback, useState } from 'react';
import { AlertContextType } from '../types.ts';
import { Alert, AlertProps, Snackbar } from '@mui/material';

// We pass this into our useContext
export const AlertContext = createContext<AlertContextType>({ showAlert: () => null });

// Children is a special key word, represents everything between the opening and closing tag in the JSX
type Props = { children: ReactNode };

// We return a self-contained JSX component that can wrap the rest of our application to provide the alert context
export const AlertProvider: FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  // What color styling, error, warning etc
  const [severity, setSeverity] = useState<AlertProps['severity']>('info');

  // Wrap this in a useCallback as we want to return a stable reference to the function and not have it recreate with every rerender
  // If passed to a useEffect could cause an infinite rerender
  const showAlert = useCallback((msg: string, sev: AlertProps['severity'] = 'info') => {
    // Simply adjust the state
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  // We have now created a self-contained alert context provider which manages all its own internal state
  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {/*We have our alert message sitting outside the rest of the context underneath the rest of the children so it*/}
      {/*take precedence in the dom layering*/}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {/*The actual content*/}
        <Alert onClose={handleClose} severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};
