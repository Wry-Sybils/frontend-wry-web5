import Background from "../components/Background";
import { useTheme } from "../context/ThemeContext"

type Props = {
    children:React.ReactNode;
    className: string;
}

export default function Content(props:Props) {
    const {theme} = useTheme()
  return (
    <main className={`h-screen w-screen overflow-hidden transition-colors duration-500 ease-in-out z-10 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} ${props.className}`}>
      <Background />
      {props.children}
    </main>
  )
}
