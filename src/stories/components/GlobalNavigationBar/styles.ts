import { css } from "@emotion/react";
import { foundation } from "lib";

const header = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  padding: ${foundation.theme.spacing * 3 + 2}px
    ${foundation.theme.spacing * 5}px;
  background: ${foundation.tailWindColors.white};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.16);
  display: flex;
  justify-content: center;
`;

const logoIcon = css`
  img {
    width: 30px;
    height: 30px;
  }
  display: block;
`;

const logoText = css`
  line-height: 30px;
  margin-left: 6px;
  &.logo-text-true > a > div {
    color: ${foundation.tailWindColors.white};
    @media (min-width: ${foundation.theme.screens.sm}) {
      color: ${foundation.tailWindColors.gray[900]};
    }
  }
`;

const profileAvatar = css`
  display: block;
`;

const profileName = css`
  max-width: 120px;
  & > * {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export {
  header,
  logoIcon,
  logoText,
  profileAvatar,
  profileName,
  // GlobalStyles,
};
