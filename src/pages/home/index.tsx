import {
  Button,
  Grid,
  Image,
  Spacer,
  Stack,
  Typography,
  useTheme,
} from "@nwaycorp/nwayplay-designsystem-fe";
import { Fragment, useState } from "react";
import { useRecoilState } from "recoil";
import { surveyList } from "store/index";
import SurveyModal from "stories/components/surveyModal";
import {
  StyledSampleDiv,
  StyledSampleDiv2,
  StyledSampleDiv3,
  SurveyBox,
} from "./styles";

const Page = () => {
  const theme = useTheme();
  const [showModal, setShowModal] = useState<boolean>(false);
  // 이 페이지에서만 말고, 다른페이지에서도 눌렀을 때 나와야하니까 위치를 어딘가로 옮겨야겠지

  const resultList = useRecoilState(surveyList);

  return (
    <Fragment>
      <Grid container>
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
          <StyledSampleDiv theme={theme}>
            {/* {listAtomArray?.length > 0 &&
              listAtomArray?.map((item) => (
                <Stack direction="row" background="pink">
                  <Typography variant="body4">user email</Typography>
                </Stack>
              ))} */}
            {resultList?.map((item) => (
              <Stack direction="row" background="pink">
                <Typography variant="body4">{item}</Typography>
              </Stack>
            ))}
          </StyledSampleDiv>
        </Grid>
      </Grid>
      <SurveyModal open={showModal} />
    </Fragment>
  );
};

export default Page;
