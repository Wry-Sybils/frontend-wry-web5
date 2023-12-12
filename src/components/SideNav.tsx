import { Icon } from "@iconify/react";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";
import { NavigateFunction, useNavigate } from "react-router-dom";
import ToggleButton from "./ToggleButton";
import { startTransition, useEffect } from "react";

type Props = {
    activeBar: string;
    setActiveBar: NavigateFunction;
    expand: boolean;
    setExpand: (expand: boolean) => void;
};

export default function SideNav({ activeBar, setActiveBar, expand }: Props) {
    const { user } = useUser();
    const { theme } = useTheme();
    const navigate = useNavigate();
    const defaultBar = "connected apps";
    const activeContent = activeBar || defaultBar;

    useEffect(() => {
        localStorage.getItem("activeItem");
    }, [activeContent]);

    const sideBarItems = [
        {
            id: "apps",
            title: "CONNECTED APPS",
            icon: "fluent:apps-32-filled"
        },
        {
            id: "data",
            title: "YOUR DATA",
            icon: "majesticons:data-plus-line"
        },
    ];

    return (
        <menu role="menu" 
            className={`oveflow-hidden h-full font-taruno border-r transition-all duration-300
                ${theme === 'dark' ? 'bg-black border-r-tr-white' : 'bg-dk-white border-r-tr-gray'}
                ${expand ? 'w-0' : 'w-[28%]'}
            `}
        >
            <header className={`overflow-hidden border-b border-b-tr-white py-4 m-4 transition-opacity duration-300`}>
                <h3 className={`text-[12px] text-center  ${theme === 'dark' ? '' : ''}`}>
                    Hello <span className={theme === 'dark' ? 'text-gold' : 'text-white text-fill'}>{user?.username}</span>
                </h3>
            </header>

            <section className={`overflow-hidden relative w-full mt-16 px-6 flex flex-col items-start gap-5 transition-transform duration-300 ${expand ? '-translate-x-[100%]' : 'translate-x-0'}`}>
                {sideBarItems.map((items, index) => (
                    <ToggleButton
                        type="button"
                        key={index}
                        title={items.title}
                        ariaLabel={items.title}
                        className="w-full !text-[.7em] gap-4 rounded-lg"
                        addDark="hover:bg-tr-pink"
                        addLight="hover:bg-gray hover:text-white"
                        onClick={() => {
                            startTransition(() => {
                                setActiveBar(`${items.id}`);
                                navigate(`/dashboard/${items.id}`);
                            });
                        }}
                        isActive={items.id === activeBar}
                        setIsActiveClass={theme === 'dark' ? 'bg-pink' : 'bg-gray text-white'}
                    >
                        <Icon icon={items.icon} 
                            className={`text-2xl ${theme === 'dark' ? 'text-aqua' : ''} 
                            ${items.id === activeBar && theme === 'dark' ? 'text-gold' : ''}`}
                        />
                    </ToggleButton>
                ))}
            </section>
        </menu>
    );
}