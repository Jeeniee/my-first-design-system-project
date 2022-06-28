import styled from "@emotion/styled";
import { Stack, ThemeOptions } from "@nwaycorp/nwayplay-designsystem-fe";

export const StyledListStack = styled(Stack)`
  flex-direction: row;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  border-radius: 30px;
  padding: 20px;
  background: ${({ theme }: { theme: ThemeOptions }) => theme.colors.gray[100]};
`;
