import { Fragment, ReactNode } from "react";
import Footer from "../Footer";
import GlobalNavigationBar from "../GlobalNavigationBar";
import Main from "../Main";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <GlobalNavigationBar />
      <Main>{children}</Main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
