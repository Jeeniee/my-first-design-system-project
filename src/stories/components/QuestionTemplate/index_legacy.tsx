import { Typography } from "@nwaycorp/nwayplay-designsystem-fe";
import { SURVEY_LIST } from "pages/home/index_legacy";
import StyledFormGroup from "../StyledFormGroup";
import { StyledQuestionBox } from "./style";

interface QuestionTemplateProp {
  step: number;
}

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

const QuestionTemplate = ({ step }: QuestionTemplateProp) => {
  // const [step, setStep] = useState<number>(1);
  // const result = useRecoilValue<surveyResult>(surveyResultState);

  // const [resultState, setResultState] = useRecoilValue<any>(surveyResultState);
  // const genre = useRecoilValue(genreState);
  // const color = useRecoilValue(colorState);
  // const form = useRecoilState(userFormState);
  // const [userForm, setUserForm] = useRecoilValue<any>(userFormState);
  // setPrevRouteName(_prevPath);

  // console.log("result====", resultState);

  // const handleNext = () => {
  //   if (step > SURVEY_LIST?.length - 1) {
  //     return;
  //   }
  //   setStep((prev) => prev + 1);
  //   console.log(step);
  //   console.log("템플릿에서 보는 globalState", genre, color, form);
  // };

  // const handleSubmit = () => {
  //   console.log("submit");
  //   console.log("템플릿에서 보는 globalState", genre, color, form);
  // };

  // 다음 버튼 누를 때마다 setState
  // 전체를 다 하나의 atom과 selector로 묶을 것인지, 각각 분리할 것인지

  return (
    // <StyledQuestionBox>
    //   <Typography variant="body4">
    //     {`Q${step}. ${SURVEY_LIST[step - 1].question}`}
    //   </Typography>
    //   <StyledFormGroup
    //     step={step - 1}
    //     options={SURVEY_LIST[step - 1].options}
    //     type={SURVEY_LIST[step - 1].type}
    //   />
    //   {/* {step > SURVEY_LIST?.length - 1 ? (
    //     <Button onClick={handleSubmit}>Submit</Button>
    //   ) : (
    //     <Button onClick={handleNext}>Next</Button>
    //   )} */}
    // </StyledQuestionBox>
    <></>
  );
};
// export default QuestionTemplate;
