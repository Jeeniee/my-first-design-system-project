import { useState } from "react";
import { useFindData } from "./useFindData";

interface useTextFieldProps {
  name: string;
  email: string;
  todays_feeling: string;
}

const initTextFieldForm = {
  name: "",
  email: "",
  todays_feeling: "",
};

export const useTextField = () => {
const { value } = useFindData();

  const result = (value && value.user) || initTextFieldForm;

  const [textValue, setTextValue] = useState<useTextFieldProps>(result);
  return { textValue, setTextValue };
};
