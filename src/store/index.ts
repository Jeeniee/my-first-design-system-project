import { atom, GetRecoilValue, selectorFamily } from "recoil";
import { System } from "types";

const systemState = atom({
  key: "systemState",
  default: {
    isTestMode: true,
  } as System,
});

const prevRouteNameState = atom({
  key: "prevRouteNameState",
  default: "",
});

const testModeState = selectorFamily({
  key: "testModeState",
  get: () => ({ get }: { get: GetRecoilValue }) => {
    const system = get(systemState);
    return system.isTestMode;
  },
});

const viewNavigationState = atom({
  key: "viewNavigationState",
  default: {
    showHeaderOnMobile: false,
    isMobileView: false,
    hideNavigation: false,
  },
});

export { systemState, prevRouteNameState, viewNavigationState, testModeState };
