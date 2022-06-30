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
  const SurveyListArray = useRecoilValue(surveyList);
  const { editId } = useModalContext();

  const value = SurveyListArray.find((v) => v.id === editId);
  const result = (value && value.user) || initTextFieldForm;

  const [textValue, setTextValue] = useState<useTextFieldProps>(result);
  return { textValue, setTextValue };
};
