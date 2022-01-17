import React from "react";
export interface SelectProps {
    id: string;
    title?: string;
    withImage?: boolean;
    items: any[];
    selectedIndex?: number;
    error?: boolean;
    errorText?: string;
    searchText?: string;
    modalChildren?: React.ReactNode;
    onClick?: () => void;
    onSelect?: (index: number) => void;
}
export declare const Select: ({ id, title, withImage, items, selectedIndex, error, errorText, searchText, modalChildren, onSelect, ...props }: SelectProps) => import("@emotion/react/jsx-runtime").JSX.Element;
