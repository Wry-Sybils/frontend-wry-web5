type Props = {
    type: "submit" | "reset" | "button",
    title?: string;
    className?: string;
    children?: React.ReactNode;
    onClick: React.ReactEventHandler<HTMLButtonElement>;
    isActive?: boolean;
    setIsActiveClass?: string;
    ariaLabel: string;
    disabled?: boolean
}

export default function ToggleButton(props:Props) {
    return(
        <button
            type={props.type}
            className={`
                p-4 outline-none text-base cursor-pointer focus:border-aqua focus:border-1 z-10
                ${props.className}
                ${props.isActive ? props.setIsActiveClass : ''}`
            }
            onClick={props.onClick}
            aria-label={props.ariaLabel}
            aria-labelledby={props.ariaLabel}
            disabled={props.disabled}
        >
            {props.title}
            {props.children}
        </button>
    )
}