import { createContext, Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { User } from '../types.ts';
import config from '../config.ts';

export const userContext = createContext<{
  userDetails: User | null;
  setUserDetails: Dispatch<SetStateAction<User | null>>;
}>({ userDetails: null, setUserDetails: () => null });

type Props = { children: ReactNode };

// Our self-contained user context.
export const UserContextProvider: FC<Props> = ({ children }) => {
  // Current active state
  const [userDetails, setUserDetails] = useState<User | null>(() => {
    // Stored user is taken from sessionStorage, we get this in the callback to ensure that the user is available as soon as possible
    // without waiting for the second render which is when the useEffect kicks into place
    const storedUser = sessionStorage.getItem('userDetails');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (!('createdAt' in parsedUser)) {
        return parsedUser;
      }
      // We want to see whether the token has expired or not.  If more time has elapsed since it was created than our expiry cut-off
      // then we need to be returned to the login
      const timeDiff = Date.now() - parsedUser.createdAt;
      return timeDiff > config.EXPIRY_TIME_IN_SECONDS * 1000 ? null : parsedUser;
    }
    return null;
  });

  useEffect(() => {
    // Any changes to our user object should be reflected in our session storage
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
