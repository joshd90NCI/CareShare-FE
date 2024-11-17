import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';
import { User } from '../types.ts';

export const userContext = createContext<{
  userDetails: User | null;
  setUserDetails: Dispatch<SetStateAction<User | null>>;
}>({ userDetails: null, setUserDetails: () => null });

type Props = { children: ReactNode };

export const UserContextProvider: FC<Props> = ({ children }) => {
  const [userDetails, setUserDetails] = useState<User | null>(null);

  return (
    <userContext.Provider value={{ userDetails, setUserDetails }}>{children}</userContext.Provider>
  );
};
