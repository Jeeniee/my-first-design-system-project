import styled from "@emotion/styled";

// TODO: header height에 의존성을 가지는 73px을 변수로 빼거나 동적으로 높이 값을 가져오는 식으로 개선해야함
interface BodyProps {
  isMobileView?: boolean;
  pl?: number;
  pr?: number;
}
const BodyContainer = styled.div(
  ({ isMobileView, pl, pr }: BodyProps) =>
    `
  padding-top: ${isMobileView === true ? "73px" : "0px"};
  padding-left: ${pl}px;
  padding-right: ${pr}px;
`
);

export { BodyContainer };
