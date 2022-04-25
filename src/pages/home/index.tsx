import {
  Grid2,
  Typography2,
  useTheme,
} from "@nwaycorp/nwayplay-designsystem-fe";
import { StyledSampleDiv } from "./styles";

const Page = () => {
  const theme = useTheme();

  return (
    <Grid2 outer>
      <Grid2 container>
        <Grid2 xs={12} item>
          <StyledSampleDiv theme={theme}>
            <Typography2 variant="h4" color={theme.colors.gray.white}>
              메인 홈 화면
            </Typography2>
          </StyledSampleDiv>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default Page;
