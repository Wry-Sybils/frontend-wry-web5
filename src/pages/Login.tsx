import { useTheme } from "../context/ThemeContext";
import Content from "../utils/Content";
import ProfilePhoto from "../utils/ProfilePhoto";
import ThemeButton from "../utils/ThemeButton";


export default function Login() {
    const {theme} =useTheme();

  return (
    <Content className={`h-screen w-screen z-10 ${theme === 'dark' ? '' : ''}`}>
        <ThemeButton />
<ProfilePhoto />
        <form action="">

        </form>
    </Content>
  )
}
