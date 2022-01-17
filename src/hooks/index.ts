import { useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { prevRouteNameState } from "../store";

export function useHistoryBack() {
  const history = useHistory();
  const prevRouteName = useRecoilValue<string>(prevRouteNameState);

  const goBack = useCallback(() => {
    if (prevRouteName === "") {
      /// home으로
      history.push("/");
      return;
    }

    history.goBack();
  }, [history, prevRouteName]);

  return goBack;
}

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}
