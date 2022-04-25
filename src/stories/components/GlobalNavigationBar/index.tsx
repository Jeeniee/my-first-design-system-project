import { Link } from "react-router-dom";
import configs from "../../../configs";
import {
  Box,
  foundation,
  Grid2,
  Stack,
  Typography,
} from "@nwaycorp/nwayplay-designsystem-fe";
import { StyledHeader } from "./styles";
import { Fragment } from "react";
import { css } from "@emotion/react";

const GlobalNavigationBar = () => {
  return (
    <Fragment>
      <StyledHeader>
        <Grid2 outer>
          <Grid2 container>
            <Grid2 xs={12} item>
              <Stack direction="row" spacing="200" alignItems="center">
                <a href={configs.NWAYPLAY_DOMAIN || "/"}>
                  <img src={"/assets/images/logo_nway_new.svg"} alt="" />
                </a>
                <Link to="/">
                  <Typography
                    variant="title1"
                    color={foundation.tailWindColors.gray[900]}
                  >
                    Boilerplate
                  </Typography>
                </Link>
              </Stack>
            </Grid2>
          </Grid2>
        </Grid2>
      </StyledHeader>
      <Box
        cssx={css`
          width: 100%;
          height: 78px;
        `}
      >
        -
      </Box>
    </Fragment>
  );
};

export default GlobalNavigationBar;
