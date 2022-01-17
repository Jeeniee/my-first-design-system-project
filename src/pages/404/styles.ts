import { css } from "@emotion/react";
import { foundation } from "../../lib";

const LoginImage = css`
  position: relative;
  width: 100%;
  margin: 40px auto;

  & > img {
    width: 250px;
    display: inline-block;
  }
`;

const ContentContainer = css`
  text-align: center;
  max-width: 350px;
  margin: 0 auto;
  & > .nway-typography-h2 {
    margin-bottom: ${foundation.theme.spacing * 5}px;
  }
`;

const ErrorContainer = css`
  text-align: center;
  padding-bottom: ${foundation.theme.spacing * 5}px;
  max-width: 414px;
  margin: 0 auto;
  background-color: ${foundation.theme.colors.primary.main}!important;
  padding: ${foundation.theme.spacing * 5}px;
`;

export { LoginImage, ContentContainer, ErrorContainer };
