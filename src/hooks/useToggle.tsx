import { MouseEvent, useState } from "react";

interface useToggleProps {
  initSelectedValue?: string;
}

export const useToggle = ({ initSelectedValue = "" }: useToggleProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(initSelectedValue);
  const handleToggle = (event: MouseEvent<HTMLElement>, value: string) => {
    event.preventDefault();
    setSelectedValue(() => value);
  };
  return { selectedValue, handleToggle };
};
