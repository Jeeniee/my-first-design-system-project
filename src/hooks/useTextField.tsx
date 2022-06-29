import { useState } from "react";
import { useRecoilValue } from "recoil";
import { surveyList } from "store/index";
import { useModalContext } from "store/ModalProvider";

interface useTextFieldProps {
  name: string;
  email: string;
  todays_feeling: string;
}

const initTextFieldForm = {
  name: "",
  email: "",
  todays_feeling: "",
};

export const useTextField = () => {
  const editModeValue = useRecoilValue(surveyList);

  const { editMode, editIndex } = useModalContext();
  const user = editModeValue[editIndex]?.user;

  const [textValue, setTextValue] = useState<useTextFieldProps>(
    editMode && user ? user : initTextFieldForm
  );
  return { textValue, setTextValue };
};
