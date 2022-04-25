import { Fragment, ReactNode } from "react";
import GlobalNavigationBar from "../GlobalNavigationBar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <GlobalNavigationBar />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;
