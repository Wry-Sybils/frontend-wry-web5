import { useTheme } from "../context/ThemeContext";

type Props = {
    type: "submit" | "reset" | "button",
    title?: string;
    className?: string;
    children?: React.ReactNode;
    onClick?: React.ReactEventHandler<HTMLButtonElement>;
    isActive?: boolean;
    setIsActiveClass?: string;
    ariaLabel: string;
    disabled?: boolean;
    disabledClass?: string;
    addDark?: string;
    addLight?: string;
}

export default function ToggleButton(props:Props) {
    const {theme} = useTheme();

    return(
        <button
            type={props.type}
            className={`
                p-2 outline-none text-base flex items-center cursor-pointer focus:border-aqua focus-visible:border-gray focus:border-1 z-10 overflow-hidden
                ${props.className}
                ${props.isActive ? `overflow-hidden ${props.setIsActiveClass}` : ''}
                ${theme === 'dark' ? props.addDark : props.addLight}
                ${props.disabled ? props.disabledClass : ''}
                ${props.disabled && props.disabledClass}
            `}
            onClick={props.onClick}
            aria-label={props.ariaLabel}
            aria-labelledby={props.ariaLabel}
            title={props.ariaLabel}
            disabled={props.disabled}
        >
            {props.children}
            {props.title}
        </button>
    )
}