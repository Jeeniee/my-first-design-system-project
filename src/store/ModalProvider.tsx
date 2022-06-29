import { useModal } from "hooks/useModal";
import React, { createContext, useContext, useState } from "react";
import { useRecoilState } from "recoil";
import { IData } from "stories/components/QuestionTemplate";
import { surveyList } from ".";

const ModalContext = createContext({
  showModal: false,
  setShowModal: (showModal: boolean) => {},
  handleEdit: (id: number) => {},
  editIndex: 0,
  setEditIndex: (id: number) => {},
  editMode: false,
  setEditMode: (prev: boolean) => {},
});

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const { showModal, setShowModal } = useModal();
  const [editIndex, setEditIndex] = useState<number>(0);

  const [editMode, setEditMode] = useState<boolean>(false);

  const handleEdit = (id: number) => {
    setEditMode(true);
    setEditIndex(id);
    setShowModal(true);
    console.log(`=========id :${id} edit 요청임`);
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        setShowModal,
        handleEdit,
        editIndex,
        setEditIndex,
        editMode,
        setEditMode,
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
