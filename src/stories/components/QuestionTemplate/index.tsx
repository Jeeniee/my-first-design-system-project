import React, { useEffect } from "react";
import {
  Button,
  SerialField,
  Spacer,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@nwaycorp/nwayplay-designsystem-fe";
import { useRadio } from "hooks/useRadio";
import { useSerial } from "hooks/useSerial";
import { useTextField } from "hooks/useTextField";
import { useToggle } from "hooks/useToggle";
import { ChangeEvent, useState } from "react";
import { FormRadio } from "../FormRadio";
import { FormToggle } from "../FormToggle";
import StyledFormGroup from "../StyledFormGroup";
import { StyledQuestionBox } from "./style";
import { SURVEY_LIST } from "pages/home";

interface IStyledFormGroup {
  options: string[];
  onChange?: (event: MouseEvent, value: any) => void;
  index: number;
  type: "toggle" | "radio" | "serial" | "input" | "rate";
  setData?: any;
}

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

const QuestionTemplate = ({
  index,
  type,
  options,
  setData,
}: IStyledFormGroup) => {
  const { selectedValue, handleToggle } = useToggle({});
  const { checkedValue, setCheckedValue } = useRadio({});
  const { typedValue, setTypedValue } = useSerial({});
  const { textValue, setTextValue } = useTextField();
  const [feeling, setFeeling] = useState<"happy" | "gloomy" | undefined>();

  interface IForm {
    name: string;
    email: string;
    feeling: string;
  }

  const [form, setForm] = useState<IForm[]>();

  // console.log(
  //   "localState",
  //   selectedValue,
  //   checkedValue,
  //   typedValue,
  //   textValue,
  //   feeling
  // );

  const theme = useTheme();

  interface IData {
    genre: string[];
    color: string;
    personality: string;
    code: string | undefined;
    user: { name: string; email: string; todays_feeling: string };
  }

  useEffect(() => {
    const data = {
      genre: selectedValue,
      color: checkedValue,
      // personality: typedValue,
      // code: setTextValue,
      user: textValue,
      todays_feeling: feeling,
    };

    setData(data);
    console.log("컴포넌트 useEffect의 data", data);
  }, [selectedValue, checkedValue, typedValue, textValue, feeling, setData]);

  return (
    <StyledQuestionBox>
      <Typography variant="body4">
        {`Q${index + 1}. ${SURVEY_LIST[index]?.question}`}
      </Typography>
      {type === "toggle" ? (
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
              label="name"
              id="name"
              placeHolder="Jeenie"
              type="text"
              defaultValue={textValue.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTextValue((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <Spacer x={"500"} />
            <Typography variant="body9" color={theme.colors.error}>
              한글자 이상 입력해주세요.
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="flex-end">
            <TextField
              label="email"
              id="email"
              placeHolder="hajin.park@nway.com"
              type="email"
              asset={
                <Button color="gray" shape="round" size="s" variant="outline">
                  Varify
                </Button>
              }
              defaultValue={textValue.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTextValue((prev) => ({ ...prev, email: e.target.value }))
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
                    onClick={(e) => {
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
              defaultValue={textValue.todays_feeling}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTextValue((prev) => ({
                  ...prev,
                  todays_feeling: e.target.value,
                }))
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
      ) : null}
    </StyledQuestionBox>
  );
};
export default QuestionTemplate;
