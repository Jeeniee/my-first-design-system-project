import { useModal } from "hooks/useModal";
import { createContext, Fragment, ReactNode } from "react";
import { ModalProvider } from "store/ModalProvider";
import Footer from "../Footer";
import GlobalNavigationBar from "../GlobalNavigationBar";
import Main from "../Main";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <ModalProvider>
        <GlobalNavigationBar />
        <Main>{children}</Main>
        <Footer />
      </ModalProvider>
    </Fragment>
  );
};

export default Layout;
