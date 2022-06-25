import React, { Fragment, useState } from "react";

import {
  Box,
  Button,
  Chip,
  ChipVariant,
  IconButton,
  SerialField,
  Spacer,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@nwaycorp/nwayplay-designsystem-fe";
import { useRadio } from "hooks/useRadio";
import { useSerial } from "hooks/useSerial";
import { useToggle } from "hooks/useToggle";
import { FormRadio } from "../FormRadio";
import { FormToggle } from "../FormToggle";
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
  step: number;
  type: "toggle" | "radio" | "serial" | "input" | "rate";
}

const StyledFormGroup = ({ type, options }: IStyledFormGroup) => {
  const { selectedValue, handleToggle } = useToggle({});
  const { checkedValue, setCheckedValue } = useRadio({});
  const { typedValue, setTypedValue } = useSerial({});
  const { textValue, setTextValue } = useTextField();

  const [feeling, setFeeling] = useState<"happy" | "gloomy" | undefined>();
  console.log("-0-=-0=-0=-0", selectedValue, checkedValue, typedValue);

  const theme = useTheme();
  return type === "toggle" ? (
    <FormToggle value={selectedValue} onChange={handleToggle} />
  ) : type === "radio" ? (
    <FormRadio
      options={options}
      value={checkedValue}
      onChange={(value) => setCheckedValue(value!)}
    />
  ) : type === "input" ? (
    <Stack alignItems="flex-start">
      <Stack direction="row" alignItems="flex-end">
        <TextField
          label="Name"
          id="name"
          placeHolder="Jeenie"
          type="text"
          defaultValue={textValue.name}
          onChange={({ value }: { value: string }) =>
            setTextValue((prev) => ({ ...prev, name: value }))
          }
        />
        <Spacer x={"500"} />
        <Typography variant="body9" color={theme.colors.error}>
          한글자 이상 입력해주세요.
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="flex-end">
        <TextField
          label="Email"
          asset={
            <Button color="gray" shape="round" size="s" variant="outline">
              Varify
            </Button>
          }
          id="email"
          placeHolder="hajin.park@nway.com"
          type="email"
          defaultValue={textValue.email}
          onChange={({ value }: { value: string }) =>
            setTextValue((prev) => ({ ...prev, email: value }))
          }
        />
        <Spacer x={"500"} />
        <Typography variant="body9" color={theme.colors.error}>
          이메일 형식이 맞지 않습니다.
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="flex-end">
        <TextField
          label="Feeling"
          asset={
            <Stack direction="row">
              <Button
                color="primary"
                shape="round"
                size="s"
                variant="outline"
                onClick={() => {
                  setFeeling("happy");
                  setTextValue((prev) => ({
                    ...prev,
                    todays_feeling: "happy",
                  }));
                }}
                selected={feeling === "happy"}
              >
                Happy
              </Button>
              <Spacer x={"100"} />
              <Button
                color="gray"
                shape="round"
                size="s"
                variant="outline"
                onClick={() => {
                  setFeeling("gloomy");
                  setTextValue((prev) => ({
                    ...prev,
                    todays_feeling: "gloomy",
                  }));
                }}
                selected={feeling === "gloomy"}
              >
                Gloomy
              </Button>
            </Stack>
          }
          id="feeling"
          placeHolder="How's your day?"
          type="text"
          defaultValue={textValue.email}
          onChange={({ value }: { value: string }) =>
            setTextValue((prev) => ({ ...prev, email: value }))
          }
        />
        <Spacer x={"500"} />
        <Typography
          variant="body9"
          color={
            feeling === "happy"
              ? theme.colors.primary[500]
              : theme.colors.gray[500]
          }
        >
          {feeling === "happy"
            ? "I'm happy for you! XD"
            : feeling === "gloomy"
            ? "I wish you well ;)"
            : "How way your day?"}
        </Typography>
        <Typography
          variant="body9"
          color={
            feeling === "happy"
              ? theme.colors.primary[500]
              : theme.colors.gray[500]
          }
        >
          {feeling === "happy"
            ? "I'm happy for you! XD"
            : feeling === "gloomy"
            ? "I wish you well ;)"
            : "How way your day?"}
        </Typography>
      </Stack>
    </Stack>
  ) : type === "serial" ? (
    <SerialField
      type="text"
      inputMode="numeric"
      length={"6"}
      value={typedValue}
      onChange={(value) => setTypedValue(value)}
    />
  ) : //   ) : type === "rate" ? (
  //     <Chip
  //       color="primary"
  //       label="test"
  //       onClick={() => {}}
  //       size="medium"
  //     //   textColor="black"
  //     //   variant="outlined"
  //     />
  null;
};

export default StyledFormGroup;
