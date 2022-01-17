import { ReactNode } from "react";
export declare enum ButtonVariant {
    "normal" = "normal",
    "solid" = "solid",
    "text" = "text"
}
export declare enum ButtonColor {
    "primary" = "primary",
    "secondary" = "secondary",
    "normal" = "normal"
}
export declare enum ButtonSize {
    "small" = "small",
    "medium" = "medium",
    "large" = "large"
}
export interface ButtonProps {
    variant?: ButtonVariant;
    disabled?: boolean;
    block?: boolean;
    color?: ButtonColor;
    size?: ButtonSize;
    children: ReactNode;
    onClick?: () => void;
}
/**
 * Primary UI component for user interaction
 */
export declare const Button: ({ variant, disabled, block, color, size, children, onClick, ...props }: ButtonProps) => import("@emotion/react/jsx-runtime").JSX.Element;
