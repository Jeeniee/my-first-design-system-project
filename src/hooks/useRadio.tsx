import { useState } from "react";
import { useFindData } from "./useFindData";

interface useRadioProps {
  initCheckedValue?: string;
}

export const useRadio = ({ initCheckedValue = "" }: useRadioProps) => {
  const { value } = useFindData();
  const result = (value && value.color) || initCheckedValue;
  const [checkedValue, setCheckedValue] = useState<string>(result);

  return { checkedValue, setCheckedValue };
};
