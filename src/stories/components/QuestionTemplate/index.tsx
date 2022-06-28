import React, { useCallback, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Image,
  SerialField,
  Spacer,
  Stack,
  TextField,
  Transition,
  Typography,
  useSerialField,
  useTheme,
} from "@nwaycorp/nwayplay-designsystem-fe";
import { useRadio } from "hooks/useRadio";
import { useSerial } from "hooks/useSerial";
import { useTextField } from "hooks/useTextField";
import { useToggle } from "hooks/useToggle";
import { ChangeEvent, useState } from "react";
import { FormRadio } from "../FormRadio";
import { FormToggle } from "../FormToggle";
import { StyledCheckRobotStack, StyledQuestionBox } from "./style";
import { useCheckbox } from "hooks/useCheckbox";
import { SURVEY_QUESTION_LIST } from "../SurveyModal";

export interface IData {
  genre: string;
  color: string;
  code: string;
  user: { name: string; email: string; todays_feeling: string };
}

interface IQuestionTemplate {
  options: string[];
  onChange?: (event: MouseEvent, value: any) => void;
  index: number;
  type: "toggle" | "radio" | "serial" | "input" | "rate";
  setData: (data: IData) => void;
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
}: IQuestionTemplate) => {
  const { selectedValue, handleToggle } = useToggle();
  const { checkedValue: radioValue, setCheckedValue: setRadioValue } = useRadio(
    {}
  );
  const { textValue, setTextValue } = useTextField();
  const [feeling, setFeeling] = useState<"happy" | "gloomy" | undefined>();

  const [
    serial,
    onChangeSerialInput,
    isValidSerial,
    errorTextSerial,
  ] = useSerialField({
    validate: useCallback((value: string) => {
      if (value.length > 0 && value.length < 5) {
        return { isValid: false, message: "Number should be 5 digits." };
      }
      if (value !== "25283") {
        return { isValid: false, message: "Check your number." };
      }

      return {
        isValid: true,
        message: "",
      };
    }, []),
  });

  const { checked, handleCheck } = useCheckbox();

  const theme = useTheme();

  useEffect(() => {
    const data: IData = {
      genre: selectedValue,
      color: radioValue,
      code: serial,
      user: textValue,
    };
    setData(data);
  }, [selectedValue, radioValue, textValue, feeling, serial, setData]);

  return (
    <StyledQuestionBox>
      <Typography variant="body4">
        {`Q${index + 1}. ${SURVEY_QUESTION_LIST[index]?.question}`}
      </Typography>
      {type === "toggle" ? (
        <FormToggle value={selectedValue} onChange={handleToggle} />
      ) : type === "radio" ? (
        <FormRadio
          options={options}
          value={radioValue}
          onChange={(value) => setRadioValue(value!)}
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
        <StyledCheckRobotStack theme={theme}>
          <Stack direction="row" alignItems="center">
            <Checkbox checked={checked} onChange={handleCheck} />
            <Typography
              variant="body5"
              color={
                checked ? theme.colors.gray["black"] : theme.colors.gray[500]
              }
            >
              I'm not a Robot
            </Typography>
          </Stack>
          <Image
            src={`https://images.unsplash.com/photo-1511376029469-945f1314a13e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80`}
            width={"80%"}
          />
          <SerialField
            value={serial}
            onChange={onChangeSerialInput}
            errorText={errorTextSerial}
            error={isValidSerial}
            type=""
            inputMode={"numeric"}
            length={"5"}
          />
        </StyledCheckRobotStack>
      ) : null}
    </StyledQuestionBox>
  );
};
export default QuestionTemplate;
