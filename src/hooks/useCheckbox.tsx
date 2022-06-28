import { MouseEvent, useState } from "react";

export const useCheckbox = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const handleCheck = () => {
    setChecked((prev) => !prev);
  };

  return { checked, handleCheck };
};
