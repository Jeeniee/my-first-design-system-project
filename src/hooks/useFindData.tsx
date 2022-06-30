import React from "react";
import { useRecoilValue } from "recoil";
import { surveyList } from "store/index";
import { useModalContext } from "store/ModalProvider";

export const useFindData = () => {
  const SurveyListArray = useRecoilValue(surveyList);
  const { editId } = useModalContext();
  const value = SurveyListArray.find((v) => v.id === editId);
  return { value };
};
