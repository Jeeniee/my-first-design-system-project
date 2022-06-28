import React, { Fragment, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Image,
  Spacer,
  Stack,
  Typography,
  useTheme,
} from "@nwaycorp/nwayplay-designsystem-fe";
import { useRecoilState } from "recoil";
import { surveyList } from "store/index";
import {
  StyledSampleDiv,
  StyledSampleDiv2,
  StyledSampleDiv3,
  SurveyBox,
} from "./styles";
import SubmitList from "stories/components/SubmitList";
import SurveyModal from "stories/components/SurveyModal";
import { useModalContext } from "store/ModalProvider";

const Page = () => {
  const theme = useTheme();
  const { setShowModal } = useModalContext();
  const [resultArray, setResultArray] = useRecoilState(surveyList);
  console.log("홈페이지의 resultArray", resultArray);

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
          <Stack justifyContent="flex-start">
            {resultArray?.length > 0 &&
              resultArray?.map((item: any, index: number) => {
                return (
                  <Box key={item?.id}>
                    <SubmitList {...item} />
                    {index < resultArray?.length - 1 && <Spacer y="500" />}
                  </Box>
                );
              })}
          </Stack>
        </Grid>
      </Grid>
      <SurveyModal />
    </Fragment>
  );
};

export default Page;
