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
import { SURVEY_LIST } from "pages/home/index_legacy";
import { ChangeEvent, useState } from "react";
import { FormRadio } from "../FormRadio";
import { FormToggle } from "../FormToggle";
import StyledFormGroup from "../StyledFormGroup";
import { StyledQuestionBox } from "./style";

// interface QuestionTemplateProp {
//   step: number;
// }

interface surveyResult {
  genre: string;
  color: string;
  personality: string;
  form: {
    name: string;
    email: string;
    feeling: string;
  };
}

interface QuestionTemplateProp {
  options: string[];
  onChange?: (event: MouseEvent, value: any) => void;
  step: number;
  type: "toggle" | "radio" | "serial" | "input" | "rate";
}

const QuestionTemplate = ({ step, type, options }: QuestionTemplateProp) => {
  const { selectedValue, handleToggle } = useToggle({});
  const { checkedValue, setCheckedValue } = useRadio({});
  const { typedValue, setTypedValue } = useSerial({});
  const { textValue, setTextValue } = useTextField();
  const [feeling, setFeeling] = useState<"happy" | "gloomy" | undefined>();

  console.log(
    "-0-=-0=-0=-0",
    selectedValue,
    checkedValue,
    typedValue,
    textValue
  );
  const theme = useTheme();

  return (
    <StyledQuestionBox>
      <Typography variant="body4">
        {`Q${step}. ${SURVEY_LIST[step - 1]?.question}`}
      </Typography>
      {/* <StyledFormGroup
        step={step - 1}
        options={SURVEY_LIST[step - 1].options}
        type={SURVEY_LIST[step - 1].type}
      /> */}
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
              // onChange={({ value }: { value: string }) =>
              //   setTextValue((prev) => ({ ...prev, name: value }))
              // }
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
              // onChange={({ value }: { value: string }) =>
              //   setTextValue((prev) => ({ ...prev, name: value }))
              // }
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
      {/* {step > SURVEY_LIST?.length - 1 ? (
        <Button onClick={handleSubmit}>Submit</Button>
      ) : (
        <Button onClick={handleNext}>Next</Button>
      )} */}
    </StyledQuestionBox>
  );
};
export default QuestionTemplate;
