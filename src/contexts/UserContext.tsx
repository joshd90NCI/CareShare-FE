import { createContext, Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { User } from '../types.ts';

export const userContext = createContext<{
  userDetails: User | null;
  setUserDetails: Dispatch<SetStateAction<User | null>>;
}>({ userDetails: null, setUserDetails: () => null });

type Props = { children: ReactNode };

export const UserContextProvider: FC<Props> = ({ children }) => {
  const [userDetails, setUserDetails] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('userDetails');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (userDetails) {
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
    } else {
      localStorage.removeItem('userDetails');
    }
  }, [userDetails]);

  return (
    <userContext.Provider value={{ userDetails, setUserDetails }}>{children}</userContext.Provider>
  );
};
