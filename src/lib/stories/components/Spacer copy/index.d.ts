/// <reference types="react" />
import { spacingType } from "@src/stories/foundation/Grid";
export declare enum MarginOption {
    marginLeft = "margin-left",
    marginRight = "margin-right",
    marginTop = "margin-top",
    marginBottom = "margin-bottom",
    marginX = "marginX",
    marginY = "marginY",
    marginW = "margin"
}
export declare enum PaddingOption {
    paddingLeft = "padding-left",
    paddingRight = "padding-right",
    paddingTop = "padding-top",
    paddingBottom = "padding-bottom",
    paddingX = "paddingX",
    paddingY = "paddingY",
    paddingW = "padding"
}
export interface SpacerProps {
    m?: MarginOption;
    p?: PaddingOption;
    mSize?: spacingType;
    pSize?: spacingType;
    children: React.ReactNode;
}
export declare const Spacer: ({ m, p, mSize, pSize, ...props }: SpacerProps) => import("@emotion/react/jsx-runtime").JSX.Element;
