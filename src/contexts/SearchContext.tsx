import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';

export const searchContext = createContext<{
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}>({ search: 'null', setSearch: () => null });

type Props = { children: ReactNode };

export const SearchContextProvider: FC<Props> = ({ children }) => {
  const [search, setSearch] = useState('');

  return <searchContext.Provider value={{ search, setSearch }}>{children}</searchContext.Provider>;
};
