import { MouseEvent, useState } from "react";

export const useToggle = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const handleToggle = (event: MouseEvent<HTMLElement>, value: string) => {
    event.preventDefault();
    setSelectedValue(() => value);
  };
  return { selectedValue, handleToggle };
};
