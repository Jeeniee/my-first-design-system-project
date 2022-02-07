import { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { viewNavigationState } from "store";
import GlobalNavigationBar from "stories/components/GlobalNavigationBar";
import * as styles from "./styles";

const Layout = ({ children }: { children: ReactNode }) => {
  const layoutState = useRecoilValue<{
    showHeaderOnMobile: boolean;
    isMobileView: boolean;
    hideNavigation: boolean;
  }>(viewNavigationState);

  return (
    <div css={styles.LayoutStyle(layoutState.isMobileView)}>
      {layoutState.isMobileView === true ? null : <GlobalNavigationBar />}
      {/* {!isMobileView && !hideNavigation && <SideNavigation />} */}
      <main css={styles.MainStyle(layoutState.isMobileView)}>{children}</main>
      {/* {isMobileView && !hideNavigation && <BottomNavigation />} */}
    </div>
  );
};

export default Layout;
