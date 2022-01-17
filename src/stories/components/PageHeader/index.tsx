import {
  alignItemsType,
  foundation,
  Grid,
  IconButton,
  IconButtonSize,
  InfoIcon,
  justifyContentType,
  KeyboardArrowLeftIcon,
  Typography,
  wrapType,
} from "../../../lib";
import { useRecoilValue } from "recoil";
import configs from "../../../configs";
import { useHistoryBack } from "../../../hooks";
import { viewNavigationState } from "../../../store";
import { CookieName } from "../../../utils/cookie";
import CookieManager from "../../../utils/CookieManager";
import Container from "../Container";
import * as styles from "./styles";

const PageHeader = ({
  show = true,
  main = false,
  title,
  onClickBack,
  tooltip,
  tooltipOnClick,
  darkMode,
}: {
  main?: boolean;
  show?: boolean;
  title?: string;
  tooltip?: boolean;
  darkMode?: boolean;
  tooltipOnClick?: () => void;
  onClickBack?: () => void;
}) => {
  const layoutState = useRecoilValue<{
    showHeaderOnMobile: boolean;
    isMobileView: boolean;
    hideNavigation: boolean;
  }>(viewNavigationState);
  const goHistoryBack = useHistoryBack();
  const email = CookieManager.getCookie(CookieName.NWAYPLAY_EMAIL) || "";

  const goBack = () => {
    if (onClickBack) {
      onClickBack();
      return;
    }

    // window.history.back();
    goHistoryBack();
  };

  return (
    <div css={styles.PageHeaderStyle(layoutState.isMobileView, show, darkMode)}>
      {/* 나중에 main과 normal 분리해야함 */}
      {main === true ? (
        <Container>
          <Grid
            container
            alignItems={alignItemsType.center}
            justifyContent={justifyContentType.spaceBetween}
          >
            <Grid item>
              <Grid
                container
                wrap={wrapType.nowrap}
                alignItems={alignItemsType.center}
                spacing={2}
              >
                <Grid item>
                  <a
                    href={configs.NWAYPLAY_DOMAIN || "/"}
                    css={styles.logoIcon}
                  />
                </Grid>
                <Grid item>
                  {(title || title !== undefined) && (
                    <Typography
                      variant="title2"
                      color={
                        darkMode
                          ? foundation.tailWindColors.white
                          : foundation.tailWindColors.gray[900]
                      }
                    >
                      <span css={styles.WhiteSpace(darkMode)}>{title}</span>
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Container>
          <Grid
            container
            alignItems={alignItemsType.center}
            justifyContent={justifyContentType.spaceBetween}
          >
            <Grid item>
              <Grid
                container
                wrap={wrapType.nowrap}
                alignItems={alignItemsType.center}
                spacing={2}
              >
                <Grid item>
                  <IconButton
                    size={IconButtonSize.large}
                    onClick={() => goBack()}
                  >
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  {(title || title !== undefined) && (
                    <Typography
                      variant="title2"
                      color={foundation.tailWindColors.gray[900]}
                    >
                      <span css={styles.WhiteSpace(darkMode)}>{title}</span>
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              {tooltip && (
                <IconButton
                  size={IconButtonSize.large}
                  onClick={tooltipOnClick}
                >
                  <InfoIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default PageHeader;
