import { MouseEvent, useState } from "react";
import { useRecoilValue } from "recoil";
import { surveyList } from "store/index";
import { useModalContext } from "store/ModalProvider";

export const useToggle = () => {
  const editModeValue = useRecoilValue(surveyList);
  const { editMode, editIndex } = useModalContext();

  const selected = editModeValue[editIndex]?.genre;

  const [selectedValue, setSelectedValue] = useState<string[]>(
    editMode && selected ? selected : [""]
  );

  const handleToggle = (event: MouseEvent<HTMLElement>, value: string[]) => {
    event.preventDefault();
    setSelectedValue(() => [ ...value]);
  };
  return { selectedValue, handleToggle };
};
