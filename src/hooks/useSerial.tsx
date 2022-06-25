import { useState } from "react";

interface useSerialProps {
  initTypedValue?: string;
}

export const useSerial = ({ initTypedValue = "" }: useSerialProps) => {
  const [typedValue, setTypedValue] = useState<string>(initTypedValue);
  return { typedValue, setTypedValue };
};
