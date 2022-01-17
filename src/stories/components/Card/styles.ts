import { css } from "@emotion/react";
import { foundation } from "../../../lib";

const CardStyle = css`
  border-radius: ${foundation.theme.spacing * 4}px;
  background-color: ${foundation.tailWindColors.white};
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  &.card-page-true {
    min-height: 100%;
    padding-bottom: ${foundation.theme.spacing * 5}px;
    border-radius: ${foundation.theme.spacing * 0}px;
    box-shadow: none;
    @media (min-width: ${foundation.theme.screens.sm}) {
      padding-bottom: 0;
      border-radius: ${foundation.theme.spacing * 4}px;
      min-height: inherit;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
    }
  }
`;

export { CardStyle };
