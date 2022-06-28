import { useModal } from "hooks/useModal";
import React, { createContext, useContext, useState } from "react";
import { useRecoilState } from "recoil";
import { IData } from "stories/components/QuestionTemplate";
import { surveyList } from ".";

const ModalContext = createContext({
  showModal: false,
  setShowModal: (showModal: boolean) => {},
  handleEdit: (index: number) => {},
});

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const { showModal, setShowModal } = useModal();
  const [resultArray, setResultArray] = useRecoilState(surveyList);
  const [editIndex, setEditIndex] = useState<number>(0);

  const data = resultArray.find((arr) => arr.id === editIndex);
  // editIndex가 아닌 id
  console.log(data);

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setShowModal(true);
    console.log(`=========${editIndex}번 인덱스 edit 요청임`);
  };

  return (
    <ModalContext.Provider value={{ showModal, setShowModal, handleEdit }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModalContext = () => {
  return useContext(ModalContext);
};

export { ModalProvider, useModalContext };

// 1. setshowModal의 parameter로 id를 전달
// 2. 해당 id로 findIndex해서 resultArray배열 안에서의 index를 찾고
// 3. resultArray[index]로 해당 객체의 데이터를 넣는다

// 변경
// 1. 해당 id로 findIndex해서 resultArray배열 안에서의 index를 handleEdit의 parameter로 전달하고
// 2. resultArray[index]로 해당 객체의 데이터를 넣는다
