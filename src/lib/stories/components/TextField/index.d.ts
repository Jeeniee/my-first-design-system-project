import { ReactNode } from "react";
import { Property } from "csstype";
export declare enum inputVariant {
    "standard" = "standard",
    "filled" = "filled",
    "outlined" = "outlined"
}
export declare enum inputType {
    "text" = "text",
    "email" = "email",
    "password" = "password",
    "number" = "number",
    "search" = "search"
}
export declare type InputMode = "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | undefined;
export interface TextFieldProps {
    id: string;
    type?: string;
    inputMode?: InputMode;
    variant?: string;
    title?: string;
    helperText?: string;
    placeHolder?: string;
    defaultValue?: string;
    error?: boolean;
    errorText?: string;
    disabled?: boolean;
    onChange?: any;
    onInput?: any;
    onFocus?: any;
    pattern?: string;
    autocomplete?: string;
    readonly?: any;
    onKeyUp?: any;
    onKeyDown?: any;
    onKeyPress?: any;
    maxlength?: number;
    sign?: ReactNode;
    contenteditable?: boolean;
    textAlign?: Property.TextAlign;
}
export declare const TextField: ({ variant, type, title, id, inputMode, helperText, placeHolder, defaultValue, error, errorText, disabled, onChange, onInput, onFocus, pattern, autocomplete, readonly, onKeyUp, onKeyDown, onKeyPress, maxlength, sign, contenteditable, textAlign, ...props }: TextFieldProps) => import("@emotion/react/jsx-runtime").JSX.Element;
