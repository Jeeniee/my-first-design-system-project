import React from "react";
import { useFindDataIndex } from "hooks/usefindIndex";
import { useRecoilValue } from "recoil";
import { surveyList } from "store/index";

export const useDelete = (id: number) => {
  const SurveyListArray = useRecoilValue(surveyList);
  const { arrayIndex } = useFindDataIndex(id);

  const newArr = [
    ...SurveyListArray.slice(0, arrayIndex),
    ...SurveyListArray.slice(arrayIndex + 1),
  ];

  return { newArr };
};
