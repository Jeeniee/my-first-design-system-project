import { css } from "@emotion/react";

// 예외적으로 여기서 body에 스타일을 줌
// 글로벌 스타일은 여기서만 적용하도록 해야함

const app = css``;

const global = css`
  body {
    /* background: #f3f4f6; */
  }
`;

export { app, global };
