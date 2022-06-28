import { useModal } from "hooks/useModal";
import React, { createContext, useContext } from "react";

const ModalContext = createContext({
  showModal: false,
  setShowModal: (showModal: boolean) => {},
});

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const { showModal, setShowModal } = useModal();
  return (
    <ModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModalContext = () => {
  return useContext(ModalContext);
};

export { ModalProvider, useModalContext };
