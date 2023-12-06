import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideNav from "../components/SideNav";
import Content from "../utils/Content";
import ThemeButton from "../utils/ThemeButton";
import ConnectApp from "../components/ConnectApp";
import YourData from "../components/YourData";
import ProfilePhoto from "../utils/ProfilePhoto";
import ToggleButton from "../components/ToggleButton";
import { useUser } from "../context/UserContext";
import { Icon } from "@iconify/react";
import { useTheme } from "../context/ThemeContext";
// import UserPanel from "../components/UserPanel";

export default function Dashboard() {
    const { theme } = useTheme();
    const { user } = useUser();
    const { id } = useParams();
    const navigate = useNavigate();
    const [expand, setExpand] = useState(false);

    const contentRender: { [key: string]: JSX.Element } = {
        apps: <ConnectApp />,
        data: <YourData />,
    };

    const handleExpand = () => {
        setExpand(!expand)
    }

    return (
        <Content className="flex items-start">
            <ThemeButton className="!top-5 !right-36 lg:!top-5" />
            <SideNav activeBar={id || 'apps'} setActiveBar={navigate} expand={expand} setExpand={handleExpand} />

            <main role="dashboard display" className={`w-full h-screen`}>
                <header className="w-full p-4 flex flex-row-reverse items-center justify-start">
                    <ToggleButton
                        type="button"
                        ariaLabel={`${user?.username}'s Profile`}
                    >
                        <ProfilePhoto className="!w-[2.5em] !h-[2.5em]" />
                    </ToggleButton>

                    <ToggleButton
                        type="button"
                        ariaLabel="Notification button"
                        className={`p-2 mx-2 rounded ${theme === 'dark' ? 'hover:bg-tr-white' : 'hover:bg-tr-black'}`}
                    >
                        <Icon icon="mingcute:notification-fill" className={`text-3xl `} />
                    </ToggleButton>
                    <ToggleButton
                        type="button"
                        ariaLabel="Expand menu"
                        onClick={handleExpand}
                        className="mr-auto text-2xl"
                    >
                        {!expand ? <Icon icon="fa6-solid:outdent" /> : <Icon icon="fa6-solid:indent" />}
                    </ToggleButton>
                </header>
                <section className={`h-[80%] rounded-lg mt-[3%] mx-10 p-4 z-40 border ${theme === 'dark' ? 'border-pink' : 'border-gray'}`}>
                    {contentRender[id ?? 'apps'] || <ConnectApp />}
                </section>

                {/* <UserPanel /> */}
            </main>
        </Content>
    );
}
