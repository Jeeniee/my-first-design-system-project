import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Modal,
  Spacer,
  Stack,
} from "@nwaycorp/nwayplay-designsystem-fe";
import QuestionTemplate, { IData } from "../QuestionTemplate";
import { useRecoilState, useRecoilValue } from "recoil";
import { useModalContext } from "store/ModalProvider";
import { surveyList } from "store/index";

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

const SurveyModal = () => {
  const [index, setIndex] = useState<number>(0);
  const [data, setData] = useState<IData>();
  const [resultArray, setResultArray] = useRecoilState(surveyList);
  const {
    showModal,
    setShowModal,
    editMode,
    setEditMode,
    editIndex,
  } = useModalContext();

  const handlePrev = () => {
    setIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (index > SURVEY_QUESTION_LIST?.length - 1) {
      return;
    }
    setIndex((prev) => prev + 1);
    console.log(index);
  };
  console.log(`is editMode? ${editMode}`);


  const handleSubmit = () => {
    console.log("submit");
    setResultArray((prev) => [...prev, { ...data }]);
    setShowModal(false);
    setIndex(0);
  };

  const handleEdit = () => {
    setResultArray((prev) => [
      ...prev.slice(0, editIndex),
      { ...data },
      ...prev.slice(editIndex + 1),
    ]);

    // 리코일배열[해당인덱스]의 데이터로 교체하는 로직
    // 모달 안에서의 로컬 state는 잘 변경되고 있으니, 마지막에 제출만 그 값으로 다시 해서 recoil 업데이트 하면 됨.

    setShowModal(false);
    setIndex(0);
  };

  const handleClose = () => {
    setEditMode(false);
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
            <Button onClick={editMode ? handleEdit : handleSubmit}>
              Submit
            </Button>
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
