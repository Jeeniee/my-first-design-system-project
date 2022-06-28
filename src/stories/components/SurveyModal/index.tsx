import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Button,
  Grid,
  Modal,
  Spacer,
  Stack,
} from "@nwaycorp/nwayplay-designsystem-fe";
import QuestionTemplate, { IData } from "../QuestionTemplate";
import { SetterOrUpdater } from "recoil";
import { useModalContext } from "store/ModalProvider";

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

const SurveyModal = ({
  index,
  setIndex,
  setResultArray,
  data,
  setData,
}: //   showModal,
//   setShowModal,
{
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  setResultArray: SetterOrUpdater<any[]>;
  data: IData | undefined;
  setData: React.Dispatch<React.SetStateAction<IData | undefined>>;
  //   showModal: boolean;
  //   setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handlePrev = () => {
    setIndex((prev) => prev - 1);
    console.log(index);
  };
  const { showModal, setShowModal } = useModalContext();

  const handleNext = () => {
    if (index > SURVEY_QUESTION_LIST?.length - 1) {
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
  );
};

export default SurveyModal;
