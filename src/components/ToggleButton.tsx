
type Props = {
    type: "submit" | "reset" | "button",
    title: string;
    className: string;
    children?: React.ReactNode;
    onClick: React.ReactEventHandler<HTMLButtonElement>;
    isActive?: boolean;
    setIsActiveClass?: string;
}

export default function ToggleButton(props:Props) {
    <button
        type={props.type}
        className={`
            relative p-4 outline-none text-base cursor-pointer focus:border-aqua border-
            ${props.className}
            ${props.isActive ? props.setIsActiveClass : ''}`
        }
        onClick={props.onClick}
    >
        {props.title}
        {props.children}
    </button>
}