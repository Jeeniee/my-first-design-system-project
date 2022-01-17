import { ReactNode } from "react";
export declare enum IconButtonSize {
    "small" = "small",
    "medium" = "medium",
    "large" = "large"
}
export interface IconButtonProps {
    children: ReactNode;
    size?: IconButtonSize;
    onClick?: () => void;
}
export declare const IconButton: ({ children, size, onClick, ...props }: IconButtonProps) => import("@emotion/react/jsx-runtime").JSX.Element;
