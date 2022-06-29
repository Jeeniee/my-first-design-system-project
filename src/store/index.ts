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

// export type userType = { name: "1"; email: "1"; todays_feeling: "1" };
// export interface ISurveyListData {
//   code: string;
//   color: string;
//   genre: string[] | string;
//   id: number;
//   user: userType;
// }

// const surveyList = atom<ISurveyListData[]>({
//   key: "surveyList",
//   default: [],
// });

const surveyList = atom<any[]>({
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
