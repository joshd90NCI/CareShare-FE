import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';

// Simple context for sharing the search bar.  I didn't want to hold the state in the layout container to prop drill down
// The navbar and the search container so moved this into state
export const searchContext = createContext<{
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}>({ search: 'null', setSearch: () => null });

type Props = { children: ReactNode };

export const SearchContextProvider: FC<Props> = ({ children }) => {
  const [search, setSearch] = useState('');

  return <searchContext.Provider value={{ search, setSearch }}>{children}</searchContext.Provider>;
};
