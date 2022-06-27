import {
  Button,
  Grid,
  Image,
  Modal,
  Spacer,
  Stack,
  Typography,
  useTheme,
} from "@nwaycorp/nwayplay-designsystem-fe";
import { Fragment, useState } from "react";
import { useRecoilState } from "recoil";
import {} from "store/index";
import QuestionTemplate from "stories/components/QuestionTemplate";
import {
  StyledSampleDiv,
  StyledSampleDiv2,
  StyledSampleDiv3,
  SurveyBox,
} from "./styles";

export interface ISurveyList {
  question: string;
  options: string[];
  type: "toggle" | "radio" | "serial" | "input" | "rate";
}

export const SURVEY_LIST: ISurveyList[] = [
  { question: "영화 장르 고르기", options: [], type: "toggle" },
  {
    question: "How do you wear colour?",
    options: [
      "PRETTY PASTELS",
      "BLACK IS THE ONE",
      "STRONG, CONTRASTING AND BRIGHT SHADES",
      "THAT'S NOT A THING",
    ],
    type: "radio",
  },
  { question: "Type this code", options: [], type: "serial" },
  { question: "정보입력", options: [], type: "input" },
];

const Page = () => {
  const theme = useTheme();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  // const [form, setForm] = useRecoilState(userFormState);
  // const [genre, setGenre] = useRecoilState(genreState);
  // const [color, setColor] = useRecoilState(colorState);
  // const [personality, setPersonality] = useRecoilState(personalityState);

  // const listAtomArray = useRecoilState(listAtom);

  const handlePrev = () => {
    setStep((prev) => prev - 1);
    console.log(step);
  };
  const handleNext = () => {
    if (step > SURVEY_LIST?.length - 1) {
      return;
    }
    setStep((prev) => prev + 1);
    console.log(step);
  };

  const handleSubmit = () => {
    console.log("submit");
    setShowModal(false);
  };
  return <></>;
  return (
    <Fragment>
      <Grid container>
        <Grid xs={12} item>
          <StyledSampleDiv theme={theme}>
            <Typography variant="h1" color={theme.colors.gray.white}>
              AirPods Pro
            </Typography>
          </StyledSampleDiv>
          <StyledSampleDiv2 theme={theme}>
            <Typography variant="h1" color={theme.colors.gray.white}>
              AirPods Pro2
            </Typography>
          </StyledSampleDiv2>
          <StyledSampleDiv3 theme={theme}>
            <SurveyBox theme={theme}>
              <Stack alignItems="flex-start" justifyContent="center">
                <Typography variant="h5" color={theme.colors.gray.white}>
                  Choose your Type
                </Typography>
                <Spacer y={"100"} />
                <Typography variant="body6" color={theme.colors.gray[400]}>
                  <p style={{ textAlign: "left" }}>
                    Did you know that 1.5 million typeforms are submitted every
                    day?
                  </p>
                </Typography>
                <Spacer y={"500"} />
                <Button
                  color="gray"
                  size="m"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  <Typography variant="h9">Start</Typography>
                </Button>
              </Stack>
              <Image
                width={"300"}
                src={
                  "https://images.unsplash.com/photo-1584635234347-ce88034d9501?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
                }
              />
            </SurveyBox>
          </StyledSampleDiv3>
          <StyledSampleDiv theme={theme}>
            {/* {listAtomArray?.length > 0 &&
              listAtomArray?.map((item) => (
                <Stack direction="row" background="pink">
                  <Typography variant="body4">user email</Typography>
                </Stack>
              ))} */}
          </StyledSampleDiv>
        </Grid>
      </Grid>
      <Modal
        open={showModal}
        fixBottom={
          <Stack direction="row" justifyContent="flex-end">
            <Button onClick={handlePrev} disabled={step < 2} color="gray">
              prev
            </Button>
            <Spacer x={"300"} />
            {step > SURVEY_LIST?.length - 1 ? (
              <Button onClick={handleSubmit}>Submit</Button>
            ) : (
              <Button onClick={handleNext}>next</Button>
            )}
          </Stack>
        }
        onClose={() => setShowModal(false)}
        size="m"
      >
        <Grid outer>
          {/* <QuestionTemplate step={step} /> */}
        </Grid>
      </Modal>
    </Fragment>
  );
};

// export default Page;
