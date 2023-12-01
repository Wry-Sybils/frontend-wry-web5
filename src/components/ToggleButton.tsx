import { useTheme } from "../context/ThemeContext";

type Props = {
    type: "submit" | "reset" | "button",
    title?: string;
    className?: string;
    children?: React.ReactNode;
    onClick: React.ReactEventHandler<HTMLButtonElement>;
    isActive?: boolean;
    setIsActiveClass?: string;
    ariaLabel: string;
    disabled?: boolean;
    addDark?: string;
    addLight?: string;
}

export default function ToggleButton(props:Props) {
    const {theme} = useTheme();

    return(
        <button
            type={props.type}
            className={`
                p-4 outline-none text-base cursor-pointer focus:border-aqua focus-visible:border-gray focus:border-1 z-10
                ${props.className}
                ${props.isActive ? props.setIsActiveClass : ''}
                ${theme === 'dark' ? props.addDark : props.addLight}
                `
            }
            onClick={props.onClick}
            aria-label={props.ariaLabel}
            aria-labelledby={props.ariaLabel}
            title={props.ariaLabel}
            disabled={props.disabled}
        >
            {props.title}
            {props.children}
        </button>
    )
}