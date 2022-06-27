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

interface ISurveyList {
//   user: { name: string; email: string; todays_feeling: string };

}

// type result = {
//   color: string;
//   genre: string[];
//   id: string;
//   todays_feeling: string;
//   user: { name: string; email: string; todays_feeling: string };
// };
// interface IData {
//   genre: string[];
//   color: string;
//   personality: string;
//   code: string | undefined;
//   user: { name: string; email: string; todays_feeling: string };
// }

const surveyList = atom<ISurveyList[]>({
  key: "surveyList",
  default: [],
});

export {
  systemState,
  prevRouteNameState,
  viewNavigationState,
  testModeState,
  surveyList,
};
