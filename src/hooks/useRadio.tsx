import { useState } from "react";

interface useRadioProps {
  initCheckedValue?: string;
}

export const useRadio = ({ initCheckedValue = "" }: useRadioProps) => {
  const [checkedValue, setCheckedValue] = useState<string>(initCheckedValue);

  return { checkedValue, setCheckedValue };
};
