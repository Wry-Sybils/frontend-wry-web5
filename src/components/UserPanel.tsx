import { useNavigate, useResolvedPath } from "react-router-dom";
import { useUser } from "../context/UserContext"
import ToggleButton from "./ToggleButton";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
    active: boolean;
    isActive: (active: boolean) => void;
}

export default function UserPanel({active}: Props) {
    const { user } = useUser();
    const navigate = useNavigate();
    const url = useResolvedPath('').pathname;

    const items = [
        {
            id: "your profile",
            title: "YOUR PROFILE",
            icon: "gg:profile",
            to: navigate(`${url}/your profile`)
        },
        {
            id: "settings",
            title: "SETTINGS",
            icon: "tabler:settings-2",
            to: navigate(`${url}/settings`)
        },
    ]

  return (
    <menu role="menu" 
        aria-label={`${user?.username}'s Profile Menu`} 
        title={`${user?.username}'s Profile Menu`} 
        aria-labelledby={`${user?.username}'s Profile Menu`}
        className={`${active}`}
    >
        <p>
            YOUR DID:
            <span>{user?.DID}</span>
        </p>

        {items.map(data => (
            <ToggleButton
                key={data.id}
                type="button"
                title={data.title}
                ariaLabel={data.id}
            >
                <Icon icon={data.icon} />
            </ToggleButton>
        ))}
    </menu>
  )
}
