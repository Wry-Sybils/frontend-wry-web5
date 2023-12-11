import { useState } from 'react'
import { useTheme } from "../context/ThemeContext";
import Modal from "../utils/Modal";
import ToggleButton from "./ToggleButton";

export default function ConnectApp() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false)
  
  const handleModalOpen = () => {
    setOpen(prevOpen => !prevOpen);
  }

  return (
    <main role="main" className={`relative w-full h-full`}>
      <header className={`relative w-full py-3 px-2 flex items-center border-b border-b-tr-white ${theme === 'dark' ? '' : 'border-b-tr-gray'}`}>
      <h1 className={`relative font-taruno ${theme === 'dark' ? 'text-aqua' : 'text-black'}`}>
        My APPS
      </h1>
        <ToggleButton
          type="button"
          title="Connect App"
          ariaLabel="Connect App"
          className="ml-auto rounded-md font-taruno uppercase text-sm"
          addDark="bg-pink hover:bg-tr-pink"
          addLight="bg-black text-white hover:bg-tr-gray"
          onClick={handleModalOpen}
        />
      </header>

      <Modal open={open} setOpen={handleModalOpen} />
    </main>
  )
}
