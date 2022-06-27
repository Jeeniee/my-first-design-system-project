import React, { Fragment, useState } from "react";
import {
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
import QuestionTemplate from "stories/components/QuestionTemplate";
import {
  StyledSampleDiv,
  StyledSampleDiv2,
  StyledSampleDiv3,
  SurveyBox,
} from "./styles";

interface ISurveyList {
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
  {
    question: "Which personality do you most aspire to?",
    options: [
      "RISK-TAKER, LIVES LIFE TO THE FULLEST",
      "TOTAL ZEN",
      "WELL-GROOMED, SOPHISTICATED",
      "TREND-SETTER, LAID BACK",
    ],
    type: "radio",
  },
  { question: "Type this code", options: [], type: "serial" },
  // {
  //   question: "How many stars would you rate this form?",
  //   options: [],
  //   type: "rate",
  // },
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
  const [data, setData] = useState([]);
  console.log("홈페이지의 data", data);

  const [resultArray, setResultArray] = useRecoilState(surveyList);
  console.log("홈페이지의 resultArray", resultArray);

  const handlePrev = () => {
    setIndex((prev) => prev - 1);
    console.log(index);
  };

  const handleNext = () => {
    if (index > SURVEY_LIST?.length - 1) {
      return;
    }
    setIndex((prev) => prev + 1);
    console.log(index);
  };

  const handleSubmit = () => {
    console.log("submit");
    // setResultArray(data);
    const timeStamp = new Date().getTime();
    setResultArray((prev) => [...prev, { id: timeStamp, ...data }]);
    // 제출하기를 누르면
    // 로딩화면
    // 1. QuestionTemplate 안에 있는 데이터들이 setData 되어서 여기의 data에 들어옴
    // 2. 그럼 들어온 그 data가 setResultArray(data);로 recoil에 저장됨
    // console.log("제출 된 data!!!!", data);
  };

  // const addTodoItem = () => {
  //   if (inputValue) {
  //     setTodoList((oldTodoList) => [
  //       ...oldTodoList,
  //       {
  //         id: generateUID(),
  //         text: inputValue,
  //         isComplete: false,
  //       },
  //     ]);
  //     setInputValue("");
  //   }
  // };

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
          <Stack justifyContent="center">
            {resultArray?.length > 0 &&
              resultArray?.map((item: any) => {
                console.log("item", item);
                return (
                  <Stack direction="row" key={item?.id}>
                    <Typography variant="body8">
                      List ID : {item?.id}
                    </Typography>
                    <Spacer x="500" />
                    <Stack direction="row" alignItems="center">
                      <TextField
                        label="email"
                        id="email"
                        type="text"
                        defaultValue={item?.user?.name || "user_name"}
                        readonly
                      />
                      <Spacer x="300" />
                      <TextField
                        label="email"
                        id="email"
                        type="text"
                        defaultValue={item?.user?.email || "user_email"}
                        readonly
                      />
                    </Stack>
                  </Stack>
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
            {index > SURVEY_LIST?.length - 1 ? (
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
          <QuestionTemplate
            index={index}
            options={SURVEY_LIST[index]?.options}
            type={SURVEY_LIST[index]?.type}
            setData={setData}
          />
        </Grid>
      </Modal>
      {/* <SurveyModal isShow={showModal} setIsShow={setShowModal} /> */}
    </Fragment>
  );
};

export default Page;
