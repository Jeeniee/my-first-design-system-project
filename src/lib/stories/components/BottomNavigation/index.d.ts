import { ReactNode } from "react";
export interface NavigationList {
    label: string;
    icon: ReactNode;
}
export interface BottomNavigationActionProps extends NavigationList {
    onClickNav: (index: number) => void;
    index: number;
    color: ColorOption;
    isActive?: string;
}
export declare enum ColorOption {
    primary = "primary",
    secondary = "secondary"
}
export interface BottomNavigationProps {
    navigationListItems: NavigationList[];
    selectedIndex?: number;
    color?: ColorOption;
    onClick?: () => void;
}
export declare const BottomNavigation: ({ color, navigationListItems, selectedIndex, onClick, ...props }: BottomNavigationProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default BottomNavigation;
