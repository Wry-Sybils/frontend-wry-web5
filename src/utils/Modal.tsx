import { Icon } from "@iconify/react";
import ToggleButton from "../components/ToggleButton";
import { useTheme } from "../context/ThemeContext";

type ModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void
    children?: React.ReactNode
}

export default function Modal(props:ModalProps) {
    const { theme } = useTheme();

    function handleClose() {
        props.setOpen(!props.open)
    }

  return (
    <main role="main" className={`fixed h-screen w-screen top-0 left-0 flex items-center justify-center z-[999] ${props.open ? 'block' : 'hidden'} ${theme === 'dark' ? 'bg-tr-black' : 'bg-tr-gray'}`}>
        <ToggleButton
            type="button"
            ariaLabel="Modal Close Button"
            onClick={handleClose}
            children={
                <Icon icon="carbon:close-outline" className="text-3xl" />
            }
            className="absolute top-5 right-5"
            addDark="text-white"
            addLight="text-white"
        />
        {props.children}
    </main>
  )
}
