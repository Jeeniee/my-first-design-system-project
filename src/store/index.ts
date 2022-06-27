import { atom, GetRecoilValue, selector, selectorFamily } from "recoil";
import { System } from "types";

const systemState = atom({
  key: "systemState",
  default: {
    isTestMode: true,
  } as System,
});
// default 값은 Promise 객체도 설정가능하나, atom에서 바로 비동기 요청을 할 순 없다.

const surveyList = atom({
  key: "surveyList",
  default: [],
});

// const surveyResultState = atom({
//   key: "surveyResultState",
//   default: {
//     genre: "",
//     color: "",
//     personality: "",
//     form: {
//       name: "",
//       email: "",
//       feeling: "",
//     },
//   },
// });

// type TUser = { name: string; email: string; todays_feeling: string };

// interface ISurveyList {
//   id: number;
//   user: TUser;
//   genre: string;
//   color: string;
// }

// // const resultList = atom<ISurveyList[]>({
// //   key: "resultList",
// //   default: [],
// // });

// const listAtom = atom({
//   key: "listAtom",
//   default: [],
// });

// const resultData = atomFamily<ISurveyList, number>({
//   key: "resultData",
//   default: (id: number) => ({
//     id,
//     user: {
//       name: "default name",
//       email: "default email",
//       todays_feeling: "default feeling",
//     },
//     genre: "default genre",
//     color: "default color",
//   }),
// });

// const resultIdList = atom<number[]>({
//   key: "resultIdList",
//   default: [],
// });

// const resultDataList = selector({
//   key: "resultDataList",
//   get: ({ get }) => get(resultIdList).map((id) => get(resultData(id))),
// });

// const genreState = atom({
//   key: "genreState",
//   default: "",
// });

// const colorState = atom({
//   key: "colorState",
//   default: "",
// });

// const personalityState = atom({
//   key: "personalityState",
//   default: "",
// });
// const userFormState = atom({
//   key: "userFormState",
//   default: {
//     name: "",
//     email: "",
//     todays_feeling: "",
//   },
// });

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

const resultStateSelector = selector({
  key: "resultStateSelector",
  get: () => ({ get }: { get: GetRecoilValue }) => {},
  set: () => () => {},
});

const viewNavigationState = atom({
  key: "viewNavigationState",
  default: {
    showHeaderOnMobile: false,
    isMobileView: false,
    hideNavigation: false,
  },
});

export {
  systemState,
  prevRouteNameState,
  viewNavigationState,
  testModeState,
  resultStateSelector,
  //
  surveyList,
};
