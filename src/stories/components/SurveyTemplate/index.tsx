import {
  Button,
  Image,
  Radio,
  Select,
  SerialField,
  Spacer,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@nwaycorp/nwayplay-designsystem-fe";
import { StyledSurveyContainer, StyledSurveyTextWrapper } from "./style";

const SurveyTemplate = () => {
  return (
    <StyledSurveyContainer>
      <StyledSurveyTextWrapper>
        {/* <Typography variant="h5" color={theme.colors.gray[900]}>
          Choose your Type
        </Typography>
        <Spacer y={"100"} />
        <Typography variant="body6" color={theme.colors.gray[400]}>
          <p style={{ textAlign: "left" }}>
            Did you know that 1.5 million typeforms are submitted every day?
          </p>
        </Typography>
        <Spacer y={"500"} />
        <Button color="gray" size="m" onClick={() => {}}>
          <Typography variant="h9">Start</Typography>
        </Button> */}
        <TextField id="button" placeHolder="button" type="text" />
        {/* <SerialField
          type={undefined}
          inputMode={"numeric"}
          length={"false"}
          onChange={() => {}}
        /> */}
      </StyledSurveyTextWrapper>
      <Image
        width={"300"}
        src={
          "https://images.unsplash.com/photo-1584635234347-ce88034d9501?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
        }
      />
    </StyledSurveyContainer>
  );
};

export default SurveyTemplate;
