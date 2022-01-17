/// <reference types="react" />
export interface ModalContentProps {
    children?: React.ReactNode;
    onClick?: () => void;
}
export declare const BackDrop: ({ children, onClick, ...props }: ModalContentProps) => import("@emotion/react/jsx-runtime").JSX.Element;
