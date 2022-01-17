import Routes from "./routes";
import { useLayoutEffect } from "react";
import { prevRouteNameState } from "./store";
import { useSetRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import { Global } from "@emotion/react";
import { AmplitudeManager } from "./utils/AmplitudeManager";
import * as styles from "./styles";
import Layout from "./stories/components/Layout";

let _prevPath = "";

function App() {
  const location = useLocation();
  const setPrevRouteName = useSetRecoilState<string>(prevRouteNameState);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    // prevPath
    setPrevRouteName(_prevPath);
    _prevPath = location.pathname;
    // onLoadpage
    AmplitudeManager.Instance.onLoadpage(window.location.href);
  }, [location.pathname]);

  return (
    <div css={styles.app} className="App">
      <Global styles={styles.global} />
      <Layout>
        <Routes></Routes>
      </Layout>
    </div>
  );
}

export default App;
