import { css } from "@emotion/react";
import { foundation } from "lib";

const PageHeaderStyle = (
  isMobileView: boolean,
  show: boolean,
  darkMode: boolean = false
) => css`
  position: ${isMobileView === true ? "fixed" : "relative"};
  padding: ${foundation.theme.spacing * 5}px 0;
  background-color: ${darkMode
    ? foundation.tailWindColors.black
    : foundation.tailWindColors.white};
  & button {
    display: block;
  }
  & svg > path {
    fill: ${darkMode
      ? foundation.tailWindColors.white
      : foundation.tailWindColors.black};
  }
  top: 0;
  left: 0;
  width: 100%;
  z-index: 998;
  display: ${show === true ? "block" : "none"};
`;

const logoIcon = css`
  display: block;
  width: 30px;
  height: 30px;
  background-image: url("/assets/images/logo_nway_new.svg");
  background-size: cover;
  background-position: left center;
  &.logo-nft-true {
    background-image: url("/assets/images/logo_nway_new.svg");
    @media (min-width: ${foundation.theme.screens.sm}) {
      background-image: url("/assets/images/logo_nway_new.svg");
    }
  }
  & > img {
    max-width: 100%;
    width: auto;
    height: 30px;
  }
`;

const WhiteSpace = (darkMode: boolean = false) => css`
  white-space: nowrap;
  color: ${darkMode
    ? foundation.tailWindColors.white
    : foundation.tailWindColors.gray[900]};
`;

export { PageHeaderStyle, logoIcon, WhiteSpace };
