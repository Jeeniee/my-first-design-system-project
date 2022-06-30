import { useState } from "react";
import { useRecoilValue } from "recoil";
import { surveyList } from "store/index";
import { useModalContext } from "store/ModalProvider";

interface useRadioProps {
  initCheckedValue?: string;
}

export const useRadio = ({ initCheckedValue = "" }: useRadioProps) => {
  const SurveyListArray = useRecoilValue(surveyList);
  const { editId } = useModalContext();

  const value = SurveyListArray.find((v) => v.id === editId);
  const result = (value && value.color) || initCheckedValue;

  const [checkedValue, setCheckedValue] = useState<string>(result);

  return { checkedValue, setCheckedValue };
};
