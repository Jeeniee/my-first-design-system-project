import React, { useState } from "react";
import {
  Button,
  Grid,
  Modal,
  Spacer,
  Stack,
} from "@nwaycorp/nwayplay-designsystem-fe";
import QuestionTemplate from "../QuestionTemplate";
import { useRecoilState } from "recoil";
import { useModalContext } from "store/ModalProvider";
import { ISurveyListData, surveyList } from "store/index";
import { useFindDataIndex } from "hooks/usefindIndex";

interface IQuestionList {
  question: string;
  options: string[];
  type: "toggle" | "radio" | "serial" | "input" | "rate";
}

export const SURVEY_QUESTION_LIST: IQuestionList[] = [
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

const initData: ISurveyListData = {
  code: "",
  color: "",
  genre: [""],
  id: 0,
  user: {
    name: "",
    email: "",
    todays_feeling: "",
  },
};

const SurveyModal = () => {
  const [index, setIndex] = useState<number>(0);
  const [data, setData] = useState<ISurveyListData>(initData);
  const [, setResultArray] = useRecoilState(surveyList);
  const { showModal, setShowModal, editId, setEditId } = useModalContext();
  const { arrayIndex } = useFindDataIndex(editId!);

  const handlePrev = () => {
    setIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (index > SURVEY_QUESTION_LIST?.length - 1) {
      return;
    }
    setIndex((prev) => prev + 1);
  };

  const handleSubmit = () => {
    setResultArray((prev) => [...prev, { ...data }]);
    setShowModal(false);
    setIndex(0);
  };

  const handleEdit = () => {
    arrayIndex > -1 &&
      setResultArray((prev) => [
        ...prev.slice(0, arrayIndex),
        { ...data },
        ...prev.slice(arrayIndex + 1),
      ]);

    setEditId(undefined);
    setShowModal(false);
    setIndex(0);
  };

  const handleClose = () => {
    setEditId(undefined);
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
            <Button onClick={editId ? handleEdit : handleSubmit}>Submit</Button>
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
