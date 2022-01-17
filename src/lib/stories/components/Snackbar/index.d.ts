/// <reference types="react" />
export declare enum AnchorOrigin {
    topCenter = "top-center",
    topLeft = "top-Left",
    topRight = "top-right",
    bottomCenter = "bottom-center",
    bottomRight = "bottom-right",
    bottomLeft = "bottom-left"
}
export declare enum AlertOption {
    none = "none",
    error = "error",
    warning = "warning",
    info = "info",
    success = "success"
}
export interface SnackbarProps {
    message: string;
    actionMessage: string;
    actionButton?: boolean;
    anchorPosition?: AnchorOrigin;
    textColor?: string;
    alert?: AlertOption;
    className?: string;
    children?: string | React.ReactNode;
    onClick?: () => void;
    onClose?: () => void;
}
export declare const Snackbar: ({ message, actionMessage, actionButton, anchorPosition, alert, textColor, className, children, onClick, onClose, ...props }: SnackbarProps) => import("@emotion/react/jsx-runtime").JSX.Element;
