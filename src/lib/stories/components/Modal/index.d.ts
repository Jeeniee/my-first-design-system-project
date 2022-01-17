import React from "react";
export declare enum ModalSize {
    "small" = "small",
    "medium" = "medium",
    "large" = "large"
}
export interface ModalProps {
    title?: string;
    size?: string;
    children: React.ReactNode;
    fixChildren?: React.ReactNode;
    open: boolean;
    canClose?: boolean;
    onClose: () => void;
}
export declare const Modal: ({ title, size, children, fixChildren, open, canClose, onClose, ...props }: ModalProps) => import("@emotion/react/jsx-runtime").JSX.Element;
