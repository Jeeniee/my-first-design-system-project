/// <reference types="react" />
export interface ListButtonProps {
    children?: React.ReactNode;
    value?: string;
    withImage?: boolean;
    imgSrc?: string;
    onClick?: () => void;
    selected?: boolean;
}
export declare const ListButton: ({ children, value, imgSrc, withImage, onClick, selected, ...props }: ListButtonProps) => import("@emotion/react/jsx-runtime").JSX.Element;
