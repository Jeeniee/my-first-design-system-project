import { Grid } from "@nwaycorp/nwayplay-designsystem-fe";
import { StyledFooter } from "./styles";
import { Fragment } from "react";

const Footer = () => {
  return (
    <Fragment>
      <StyledFooter>
        <Grid outer>
          <Grid container>
            <Grid xs={12} item>
              Footer
            </Grid>
          </Grid>
        </Grid>
      </StyledFooter>
    </Fragment>
  );
};

export default Footer;
