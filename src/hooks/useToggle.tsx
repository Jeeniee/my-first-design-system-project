import { MouseEvent, useState } from "react";
import { useFindData } from "./useFindData";

export const useToggle = () => {
  const { value } = useFindData();
  const result = (value && value.genre) || [""];
  const [selectedValue, setSelectedValue] = useState<string[]>(result);
  const handleToggle = (event: MouseEvent<HTMLElement>, value: string[]) => {
    event.preventDefault();
    setSelectedValue(() => [...value]);
  };
  return { selectedValue, handleToggle };
};
