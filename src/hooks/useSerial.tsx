import { useState } from "react";

export const useSerial = () => {
  const [typedValue, setTypedValue] = useState<string>("");

  const handleChange = (value: string) => {
    const targetValue = value;

    setTypedValue(targetValue);
  };
  return { typedValue, handleChange };
};
