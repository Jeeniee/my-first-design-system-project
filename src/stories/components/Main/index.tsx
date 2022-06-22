import { StyledMain } from "./styles";
import { Fragment, ReactNode } from "react";

const Main = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <StyledMain>{children}</StyledMain>
    </Fragment>
  );
};

export default Main;
