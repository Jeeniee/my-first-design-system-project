import { Link } from "react-router-dom";
import configs from "../../../configs";
import {
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@nwaycorp/nwayplay-designsystem-fe";
import { StyledBox, StyledHeader } from "./styles";
import { Fragment } from "react";

const GlobalNavigationBar = () => {
  const theme = useTheme();
  return (
    <Fragment>
      <StyledHeader>
        <Grid outer>
          <Grid container>
            <Grid xs={12} item>
              <Stack direction="row" spacing="200" alignItems="center">
                <a href={configs.NWAYPLAY_DOMAIN || "/"}>
                  <img src={"/assets/images/logo_nway_new.svg"} alt="" />
                </a>
                <Link to="/">
                  <Typography
                    variant="subtitle1"
                    color={theme.colors.gray[900]}
                  >
                    Boilerplate
                  </Typography>
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </StyledHeader>
    </Fragment>
  );
};

export default GlobalNavigationBar;
