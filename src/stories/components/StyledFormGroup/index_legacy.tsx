import { MouseEvent, useState } from "react";

import { useTheme } from "@nwaycorp/nwayplay-designsystem-fe";
import { useRadio } from "hooks/useRadio";
import { useSerial } from "hooks/useSerial";
import { useTextField } from "hooks/useTextField";

export const GENRE_LIST = [
  {
    value: "HORROR",
    icon: <></>,
  },
  {
    value: "COMEDY",
    icon: <></>,
  },
  {
    value: "Sci-Fi",
    icon: <></>,
  },
  {
    value: "ROMANCE",
    icon: <></>,
  },
  {
    value: "ACTION",
    icon: <></>,
  },
  {
    value: "ANIMATION",
    icon: <></>,
  },
];

interface IStyledFormGroup {
  options: string[];
  onChange?: (event: MouseEvent, value: any) => void;
  type?: "toggle" | "radio" | "serial" | "input" | "rate";
}

const StyledFormGroup = ({ type, options }: IStyledFormGroup) => {
  const { checkedValue, setCheckedValue } = useRadio({});
  const { typedValue, setTypedValue } = useSerial({});
  const { textValue, setTextValue } = useTextField();
  const [feeling, setFeeling] = useState<"happy" | "gloomy" | undefined>();

  // const [form, setForm] = useRecoilState(userFormState);
  // const [genre, setGenre] = useRecoilState(genreState);
  // const [color, setColor] = useRecoilState(colorState);
  // const [personality, setPersonality] = useRecoilState(personalityState);

  // // const [selectedValue, setSelectedValue] = useState<string>(initSelectedValue);

  // const handleToggle = (event: MouseEvent<HTMLElement>, value: string) => {
  //   event.preventDefault();
  //   setGenre(() => value);
  // };

  // console.log("globalState", genre, color, personality, form);

  const theme = useTheme();
  // return type === "toggle" ? (
  return <></>;
};

// export default StyledFormGroup;
