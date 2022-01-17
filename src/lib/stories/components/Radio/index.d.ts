/// <reference types="react" />
export declare type RadioVariant = "normal" | "list";
export interface RadioProps {
    id: string;
    formName: string;
    children?: React.ReactNode;
    value?: string;
    withImage?: boolean;
    imgSrc?: string;
    onClick?: any;
    selected?: boolean;
}
export declare const Radio: ({ id, formName, children, value, imgSrc, withImage, onClick, selected, ...props }: RadioProps) => import("@emotion/react/jsx-runtime").JSX.Element;
