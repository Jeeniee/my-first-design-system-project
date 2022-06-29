import { useState } from "react";
import { useRecoilValue } from "recoil";
import { surveyList } from "store/index";
import { useModalContext } from "store/ModalProvider";

interface useRadioProps {
  initCheckedValue?: string;
}

export const useRadio = ({ initCheckedValue = "" }: useRadioProps) => {
  const editModeValue = useRecoilValue(surveyList);
  const { editMode, editIndex } = useModalContext();

  const color = editModeValue[editIndex]?.color;

  const [checkedValue, setCheckedValue] = useState<string>(
    editMode && color ? color : initCheckedValue
  );

  return { checkedValue, setCheckedValue };
};
