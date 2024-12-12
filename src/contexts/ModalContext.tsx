import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';
import { Post } from '../types.ts';

type ModalDetails = { openState: boolean; parentId?: number | null; postDetails?: Post };

// We return a self-contained JSX component that can wrap the rest of our application to provide the alert context
export const modalOpenContext = createContext<{
  modalDetails: ModalDetails;
  setModalDetails: Dispatch<SetStateAction<ModalDetails>>;
}>({ modalDetails: { openState: false }, setModalDetails: () => null });

type Props = { children: ReactNode };

// We have now created a self-contained alert context provider which manages all its own internal state
export const ModalOpenContextProvider: FC<Props> = ({ children }) => {
  const [modalDetails, setModalDetails] = useState({ openState: false });
  // We pass our state and set state down through the provider so that we can read and write the value from anywhere in the app
  return (
    <modalOpenContext.Provider value={{ modalDetails, setModalDetails }}>
      {children}
    </modalOpenContext.Provider>
  );
};
