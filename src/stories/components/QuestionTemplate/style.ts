import styled from "@emotion/styled";
import { Stack, ThemeOptions } from "@nwaycorp/nwayplay-designsystem-fe";

export const StyledQuestionBox = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
`;

export const QuestionHead = styled.div`
  /* background: pink; */
`;

export const QuestionBody = styled.div`
  /* background: green; */
`;

export const QuestionFooter = styled.div`
  /* background: black; */
`;

export const StyledCheckRobotStack = styled(Stack)`
  background: ${({ theme }: { theme: ThemeOptions }) => theme.colors.gray[200]};
  padding: 15px;
  border: 1px solid;
  border-radius: 10px;
`;
