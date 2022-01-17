import { foundation, Typography } from "../../lib";
import { useRecoilValue } from "recoil";
import { Fragment } from "react";
import Card from "../../stories/components/Card";
import PageBody from "../../stories/components/PageBody";
import PageHeader from "../../stories/components/PageHeader";
import * as styles from "./styles";
import { viewNavigationState } from "../../store";

const Page = () => {
  const layoutState = useRecoilValue<{
    showHeaderOnMobile: boolean;
    isMobileView: boolean;
    hideNavigation: boolean;
  }>(viewNavigationState);

  return (
    <Fragment>
      <PageHeader
        show={layoutState.isMobileView}
        title="Wallet"
        main
      ></PageHeader>
      <PageBody>
        <Card page>
          <div css={styles.ErrorContainer}>
            <div css={styles.LoginImage}>
              <img src="/assets/images/404_image.svg" alt="page not found" />
            </div>
            <div css={styles.ContentContainer}>
              <Typography variant="h1" color={foundation.tailWindColors.white}>
                This page is lost.
              </Typography>
              <Typography
                variant="title1"
                color={foundation.theme.colors.primary.light}
              >
                We've explored deep and wide, but we can't find the page you
                were looking for.
              </Typography>
            </div>
          </div>
        </Card>
      </PageBody>
    </Fragment>
  );
};

export default Page;
