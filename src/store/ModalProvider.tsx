import { useModal } from "hooks/useModal";
import React, { createContext, useContext, useState } from "react";

interface IContextType {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  handleEdit: (id: number) => void;
  editId: number | undefined;
  setEditId: (index: number | undefined) => void;
}

const ModalContext = createContext<IContextType>({
  showModal: false,
  setShowModal: () => {},
  handleEdit: () => {},
  editId: undefined,
  setEditId: () => {},
});

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const { showModal, setShowModal } = useModal();
  const [editId, setEditId] = useState<number | undefined>();

  const handleEdit = (id: number) => {
    setEditId(id);
    setShowModal(true);
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        setShowModal,
        handleEdit,
        editId,
        setEditId,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const useModalContext = () => {
  return useContext(ModalContext);
};

export { ModalProvider, useModalContext };
