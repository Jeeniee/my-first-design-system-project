import React from "react";
export declare enum TypoVariant {
    "display" = "display",
    "h1" = "h1",
    "h2" = "h2",
    "h3" = "h3",
    "h4" = "h4",
    "title1" = "title1",
    "title2" = "title2",
    "title3" = "title3",
    "title4" = "title4",
    "title5" = "title5",
    "title6" = "title6",
    "body1" = "body1",
    "body2" = "body2",
    "body3" = "body3",
    "body4" = "body4",
    "caption1" = "caption1",
    "caption2" = "caption2",
    "caption3" = "caption3",
    "caption4" = "caption4",
    "label" = "label",
    "tag" = "tag"
}
export interface TypographyProps {
    variant?: string;
    color?: string;
    children: React.ReactNode;
}
export declare const Typography: ({ variant, color, children, ...props }: TypographyProps) => import("@emotion/react/jsx-runtime").JSX.Element;
