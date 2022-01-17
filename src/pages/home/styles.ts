import { css } from "@emotion/react";

const BodyContainer = (isMobileView: boolean) => css`
  width: ${isMobileView ? "100vw" : "calc(100vw - 200px)"};
  height: calc(100vh - 64px);
`;
// overflow: auto;
export { BodyContainer };
