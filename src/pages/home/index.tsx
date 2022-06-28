import React, { Fragment, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Image,
  Modal,
  Spacer,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@nwaycorp/nwayplay-designsystem-fe";
import { useRecoilState } from "recoil";
import { surveyList } from "store/index";
import QuestionTemplate, { IData } from "stories/components/QuestionTemplate";
import {
  StyledSampleDiv,
  StyledSampleDiv2,
  StyledSampleDiv3,
  SurveyBox,
} from "./styles";
import SubmitList from "stories/components/SubmitList";

interface ISurveyList {
  question: string;
  options: string[];
  type: "toggle" | "radio" | "serial" | "input" | "rate";
}

export const SURVEY_QUESTION_LIST: ISurveyList[] = [
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

type result = {
  color: string;
  genre: string[];
  id: string;
  todays_feeling: string;
  user: { name: string; email: string; todays_feeling: string };
};

const Page = () => {
  const theme = useTheme();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [data, setData] = useState<IData>();
  console.log("홈페이지의 data", data);

  const [resultArray, setResultArray] = useRecoilState(surveyList);
  console.log("홈페이지의 resultArray", resultArray);

  const handlePrev = () => {
    setIndex((prev) => prev - 1);
    console.log(index);
  };

  const handleNext = () => {
    if (index === SURVEY_QUESTION_LIST?.length - 1) {
      return;
    }
    setIndex((prev) => prev + 1);
    console.log(index);
  };

  const handleSubmit = () => {
    console.log("submit");
    const timeStamp = new Date().getTime();
    setResultArray((prev) => [...prev, { id: timeStamp, ...data }]);
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
    setIndex(0);
  };

  return (
    <Fragment>
      <Grid>
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
        </Grid>
        <Grid item>
          <Stack justifyContent="flex-start">
            {resultArray?.length > 0 &&
              resultArray?.map((item: any, index: number) => {
                return (
                  <Box key={item?.id}>
                    <SubmitList {...item} />
                    {index < resultArray?.length - 1 && <Spacer y="500" />}
                  </Box>
                );
              })}
          </Stack>
        </Grid>
      </Grid>
      <Modal
        open={showModal}
        fixBottom={
          <Stack direction="row" justifyContent="flex-end">
            <Button onClick={handlePrev} disabled={index < 1} color="gray">
              prev
            </Button>
            <Spacer x={"300"} />
            {index === SURVEY_QUESTION_LIST?.length - 1 ? (
              <Button onClick={handleSubmit}>Submit</Button>
            ) : (
              <Button onClick={handleNext}>next</Button>
            )}
          </Stack>
        }
        onClose={handleClose}
        size="m"
      >
        <Grid outer>
          <QuestionTemplate
            index={index}
            options={SURVEY_QUESTION_LIST[index]?.options}
            type={SURVEY_QUESTION_LIST[index]?.type}
            setData={setData}
          />
        </Grid>
      </Modal>
    </Fragment>
  );
};

export default Page;
