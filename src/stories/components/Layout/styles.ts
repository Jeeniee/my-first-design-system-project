import { css } from "@emotion/react";
import { foundation } from "../../../lib";

// 변수 소문자로 바꾸기

const LayoutStyle = (isMobileView: boolean) => css`
  width: 100%;
  min-height: 100%;
  display: flex;
  margin: 0;
  margin-bottom: 64px;
  padding: 0;
  position: relative;
  flex-direction: ${isMobileView ? "column" : "row"};
`;

const pcPageStyle = css`
  max-width: 414px;
  margin: 74px auto 0px;
  padding-top: 16px;
`;

const MainStyle = (isMobileView: boolean) => css`
  width: 100%;
  ${isMobileView ? "" : pcPageStyle}
`;

export { LayoutStyle, MainStyle };
