import { useUser } from "../context/UserContext"

export default function UserPanel() {
    const { user } = useUser();

  return (
    <menu role="menu" aria-label={`${user?.username}'s Profile Menu`} title={`${user?.username}'s Profile Menu`} aria-labelledby={`${user?.username}'s Profile Menu`}>

    </menu>
  )
}
