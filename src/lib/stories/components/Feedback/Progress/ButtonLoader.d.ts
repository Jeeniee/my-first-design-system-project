export declare enum ButtonLoaderSize {
    "small" = "small",
    "medium" = "medium",
    "large" = "large"
}
export interface ButtonLoaderProps {
    color?: string;
    size?: string;
}
export declare const ButtonLoader: ({ color, size, ...props }: {
    [x: string]: any;
    color?: string | undefined;
    size?: ButtonLoaderSize | undefined;
}) => import("@emotion/react/jsx-runtime").JSX.Element;
