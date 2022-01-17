import { ReactNode } from "react";
export declare enum ChipVariant {
    normal = "normal",
    solid = "solid",
    outlined = "outlined"
}
export declare enum TextColor {
    black = "black",
    white = "white",
    false = "false"
}
export declare type Color = "normal" | "primary" | "secondary" | string;
export declare type ChipSize = "small" | "medium";
export interface ChipProps {
    variant?: ChipVariant;
    color?: string;
    size?: ChipSize;
    textColor?: TextColor;
    onClick?: () => void;
    label?: string;
    children?: ReactNode;
    disabled?: boolean;
}
export declare const Chip: ({ variant, color, size, textColor, label, children, onClick, disabled, ...props }: ChipProps) => import("@emotion/react/jsx-runtime").JSX.Element;
