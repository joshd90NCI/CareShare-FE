import { createContext, Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { User } from '../types.ts';
import config from '../config.ts';

export const userContext = createContext<{
  userDetails: User | null;
  setUserDetails: Dispatch<SetStateAction<User | null>>;
}>({ userDetails: null, setUserDetails: () => null });

type Props = { children: ReactNode };

export const UserContextProvider: FC<Props> = ({ children }) => {
  const [userDetails, setUserDetails] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem('userDetails');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log(parsedUser);
      if (!('createdAt' in parsedUser)) {
        return parsedUser;
      }
      const timeDiff = Date.now() - parsedUser.createdAt;
      return timeDiff > config.EXPIRY_TIME_IN_SECONDS * 1000 ? null : parsedUser;
    }
    return null;
  });

  useEffect(() => {
    if (userDetails) {
      sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
    } else {
      sessionStorage.removeItem('userDetails');
    }
  }, [userDetails]);

  return (
    <userContext.Provider value={{ userDetails, setUserDetails }}>{children}</userContext.Provider>
  );
};
