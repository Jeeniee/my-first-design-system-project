import { useState } from "react";

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
  const [textValue, setTextValue] = useState<useTextFieldProps>(
    initTextFieldForm
  );
  return { textValue, setTextValue };
};
