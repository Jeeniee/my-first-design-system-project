import { Link } from "react-router-dom";
import {
  Grid,
  alignItemsType,
  justifyContentType,
  wrapType,
  foundation,
  Typography,
  Button,
  ButtonVariant,
  ButtonColor,
  ButtonSize,
  alignContentType,
  Spacer,
} from "lib";
import { CookieName } from "utils/cookie";
import constants from "constants";
import CookieManager from "utils/CookieManager";
import { useRecoilValue } from "recoil";
import configs from "configs";
import * as styles from "./styles";
import { useEffect, useState } from "react";

const GlobalNavigationBar = () => {
  return (
    <header css={styles.header}>
      <Grid
        container
        alignItems={alignItemsType.center}
        alignContent={alignContentType.center}
        justifyContent={justifyContentType.spaceBetween}
      >
        {/* logo */}
        <Grid item>
          <Grid
            container
            wrap={wrapType.nowrap}
            alignItems={alignItemsType.center}
            justifyContent={justifyContentType.flexStart}
          >
            <Grid item>
              <a href={configs.NWAYPLAY_DOMAIN || "/"} css={styles.logoIcon}>
                <img src={"/assets/images/logo_nway_new.svg"} alt="" />
              </a>
            </Grid>
            <Grid item>
              <div css={styles.logoText}>
                <Link to="/">
                  <Typography
                    variant="title1"
                    color={foundation.tailWindColors.gray[900]}
                  >
                    FrontEnd
                  </Typography>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </header>
  );
};

export default GlobalNavigationBar;
