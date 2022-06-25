import { Stack, Typography } from "@nwaycorp/nwayplay-designsystem-fe";
import { SURVEY_LIST } from "pages/home";
import StyledFormGroup from "../StyledFormGroup";
import { StyledQuestionBox } from "./style";

interface QuestionTemplateProp {
  step: number;
}
const QuestionTemplate = ({ step }: QuestionTemplateProp) => {
  return (
    <StyledQuestionBox>
        <Typography variant="body4">
          {`Q${step}. ${SURVEY_LIST[step - 1].question}`}
        </Typography>
      <StyledFormGroup
        step={step - 1}
        options={SURVEY_LIST[step - 1].options}
        type={SURVEY_LIST[step - 1].type}
      />
    </StyledQuestionBox>
  );
};
export default QuestionTemplate;
