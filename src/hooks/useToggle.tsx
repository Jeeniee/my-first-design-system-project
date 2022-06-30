import { MouseEvent, useState } from "react";
import { useRecoilValue } from "recoil";
import { surveyList } from "store/index";
import { useModalContext } from "store/ModalProvider";

export const useToggle = () => {
  const SurveyListArray = useRecoilValue(surveyList);
  const { editId } = useModalContext();
  const value = SurveyListArray.find((v) => v.id === editId);
  const result = (value && value.genre) || [""];
  const [selectedValue, setSelectedValue] = useState<string[]>(result);
  
  const handleToggle = (event: MouseEvent<HTMLElement>, value: string[]) => {
    event.preventDefault();
    setSelectedValue(() => [...value]);
  };
  return { selectedValue, handleToggle };
};
