import { ReactNode } from 'react';
export interface ListProps {
    children?: ReactNode;
    spacing?: number;
}
export declare const List: ({ children, spacing, ...props }: ListProps) => import("@emotion/react/jsx-runtime").JSX.Element;
