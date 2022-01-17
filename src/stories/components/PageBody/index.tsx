import React from "react";
import { useRecoilValue } from "recoil";
import { viewNavigationState } from "../../../store";
import { BodyContainer } from "./styles";

const PageBody = ({
  pl = 0, // spacing으로 바꿔야함
  pr = 0,
  children,
}: {
  pl?: number;
  pr?: number;
  children?: React.ReactNode;
}) => {
  const layoutState = useRecoilValue<{
    showHeaderOnMobile: boolean;
    isMobileView: boolean;
    hideNavigation: boolean;
  }>(viewNavigationState);

  return (
    <BodyContainer isMobileView={layoutState.isMobileView} pl={pl} pr={pr}>
      {children}
    </BodyContainer>
  );
};

export default PageBody;
