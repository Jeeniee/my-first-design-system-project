import styled from "@emotion/styled";
import { ThemeOptions } from "@nwaycorp/nwayplay-designsystem-fe";

export const StyledSampleDiv = styled.div`
  background: ${({ theme }: { theme: ThemeOptions }) =>
    theme.colors.primary[500]};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const StyledSampleDiv2 = styled.div`
  background: ${({ theme }: { theme: ThemeOptions }) =>
    theme.colors.secondary[500]};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const StyledSampleDiv3 = styled.div`
  background: ${({ theme }: { theme: ThemeOptions }) => theme.colors.gray[500]};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const SurveyBox = styled.div`
  background: ${({ theme }: { theme: ThemeOptions }) =>
    theme.colors.secondary[900]};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 60px;
  width: 60vw;
  height: 600px;
  border-radius: 20px;
`;
