import {
  Button,
  Grid,
  Modal,
  Spacer,
  Stack,
} from "@nwaycorp/nwayplay-designsystem-fe";
import { useState } from "react";
import QuestionTemplate from "../QuestionTemplate";

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
  { question: "Type this code", options: [], type: "serial" },
  { question: "정보입력", options: [], type: "input" },
];

const SurveyModal = ({ open }: { open: boolean }) => {
  const [showModal, setShowModal] = useState<boolean>(open);
  const [step, setStep] = useState<number>(1);

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

  return (
    <Modal
      open={open}
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
        <QuestionTemplate step={step} />
      </Grid>
    </Modal>
  );
};

export default SurveyModal;
