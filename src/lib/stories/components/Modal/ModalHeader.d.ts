export interface ModalHeaderProps {
    title?: string;
    showClose?: boolean;
    onClose?: () => void;
}
export declare const ModalHeader: ({ title, showClose, onClose, ...props }: ModalHeaderProps) => import("@emotion/react/jsx-runtime").JSX.Element;
