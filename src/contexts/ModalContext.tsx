import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';

type ModalDetails = { openState: boolean; parentId?: number };

export const modalOpenContext = createContext<{
  modalDetails: { openState: boolean; parentId?: number };
  setModalDetails: Dispatch<SetStateAction<ModalDetails>>;
}>({ modalDetails: { openState: false }, setModalDetails: () => null });

type Props = { children: ReactNode };

export const ModalOpenContextProvider: FC<Props> = ({ children }) => {
  const [modalDetails, setModalDetails] = useState({ openState: false });

  return (
    <modalOpenContext.Provider value={{ modalDetails, setModalDetails }}>
      {children}
    </modalOpenContext.Provider>
  );
};
