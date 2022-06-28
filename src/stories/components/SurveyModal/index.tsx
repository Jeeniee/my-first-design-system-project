import React, { useState } from "react";
import {
  Button,
  Grid,
  Modal,
  Spacer,
  Stack,
} from "@nwaycorp/nwayplay-designsystem-fe";
import QuestionTemplate from "../QuestionTemplate";
import { SURVEY_QUESTION_LIST } from "pages/home";

// interface ISurveyList {
//   question: string;
//   options: string[];
//   type: "toggle" | "radio" | "serial" | "input" | "rate";
// }

// export const SURVEY_QUESTION_LIST: ISurveyList[] = [
//   { question: "영화 장르 고르기", options: [], type: "toggle" },
//   {
//     question: "How do you wear colour?",
//     options: [
//       "PRETTY PASTELS",
//       "BLACK IS THE ONE",
//       "STRONG, CONTRASTING AND BRIGHT SHADES",
//       "THAT'S NOT A THING",
//     ],
//     type: "radio",
//   },
//   {
//     question: "Which personality do you most aspire to?",
//     options: [
//       "RISK-TAKER, LIVES LIFE TO THE FULLEST",
//       "TOTAL ZEN",
//       "WELL-GROOMED, SOPHISTICATED",
//       "TREND-SETTER, LAID BACK",
//     ],
//     type: "radio",
//   },
//   { question: "Type this code", options: [], type: "serial" },
//   // {
//   //   question: "How many stars would you rate this form?",
//   //   options: [],
//   //   type: "rate",
//   // },
//   { question: "정보입력", options: [], type: "input" },
// ];

const SurveyModal = ({
  isShow,
  setIsShow,
}: {
  isShow: boolean;
  setIsShow: any;
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  const handlePrev = () => {
    setIndex((prev) => prev - 1);
    console.log(index);
  };

  const handleNext = () => {
    if (index > SURVEY_QUESTION_LIST?.length - 1) {
      return;
    }
    setIndex((prev) => prev + 1);
    console.log(index);
  };

  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <Modal
      open={showModal}
      fixBottom={
        <Stack direction="row" justifyContent="flex-end">
          <Button onClick={handlePrev} disabled={index < 1} color="gray">
            prev
          </Button>
          <Spacer x={"300"} />
          {index > SURVEY_QUESTION_LIST?.length - 1 ? (
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
          setData={() => {}}
          index={index}
          options={SURVEY_QUESTION_LIST[index]?.options}
          type={SURVEY_QUESTION_LIST[index]?.type}
        />
      </Grid>
    </Modal>
  );
};

export default SurveyModal;
