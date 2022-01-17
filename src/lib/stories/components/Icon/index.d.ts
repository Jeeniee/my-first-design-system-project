/// <reference types="react" />
export interface IconProps {
  boxSize?: number;
  backgroundColor?: string;
  borderRadius?: boolean;
  children: React.ReactNode;
}
declare const Thumbnail: ({
  boxSize,
  backgroundColor,
  borderRadius,
  children,
}: IconProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default Thumbnail;
