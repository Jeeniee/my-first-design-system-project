import React from "react";
import { useRecoilValue } from "recoil";
import { surveyList } from "store/index";

export const useFindDataIndex = (id: number) => {
  const SurveyListArray = useRecoilValue(surveyList);
  const arrayIndex = SurveyListArray.findIndex((item) => item?.id === id);
  return { arrayIndex };
};
