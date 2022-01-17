import { ReactNode } from "react";
export declare const gridColumn: (string | number)[];
export declare const gridSpacing: number[];
export declare enum alignContentType {
    "stretch" = "stretch",
    "center" = "center",
    "flexStart" = "start",
    "flexEnd" = "end",
    "spaceBetween" = "between",
    "spaceAround" = "around"
}
export declare enum alignItemsType {
    "stretch" = "stretch",
    "center" = "center",
    "flexStart" = "start",
    "flexEnd" = "end",
    "baseline" = "baseline"
}
export declare enum directionType {
    "row" = "row",
    "rowReverse" = "row-reverse",
    "column" = "col",
    "columnReverse" = "col-reverse"
}
export declare enum justifyContentType {
    "center" = "center",
    "flexStart" = "start",
    "flexEnd" = "end",
    "spaceBetween" = "between",
    "spaceAround" = "around",
    "spaceEvenly" = "evenly"
}
export declare enum wrapType {
    "nowrap" = "nowrap",
    "wrap" = "wrap",
    "wrapReverse" = "wrap-reverse"
}
export declare enum spacingType {
    "xxs" = "xxs",
    "xs" = "xs",
    "s" = "s",
    "m" = "m",
    "l" = "l",
    "xl" = "xl"
}
export interface GridProps {
    alignContent?: alignContentType;
    alignItems?: alignItemsType;
    children?: ReactNode;
    container?: boolean;
    direction?: directionType;
    item?: boolean;
    justifyContent?: justifyContentType;
    xs?: any;
    sm?: any;
    md?: any;
    lg?: any;
    xl?: any;
    wrap?: wrapType;
    spacing?: any;
}
export declare const Grid: ({ alignContent, alignItems, container, direction, item, justifyContent, wrap, spacing, children, ...props }: GridProps) => import("@emotion/react/jsx-runtime").JSX.Element;
