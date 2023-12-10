import { useTheme } from "../context/ThemeContext";
import ToggleButton from "./ToggleButton";

export default function YourData() {
  const { theme } = useTheme();
  return (
    <main role="main">
      <header className={`relative w-full py-3 px-2 flex items-center border-b border-b-tr-white ${theme === 'dark' ? '' : 'border-b-tr-gray'}`}>
        <h1 className={`relative font-taruno ${theme === 'dark' ? 'text-pink' : 'text-black'}`}>
          MY DATA
        </h1>
        <ToggleButton
          type="button"
          title="Create Data"
          ariaLabel="Create Data"
          className="ml-auto rounded-md font-taruno uppercase text-sm"
          addDark="bg-aqua hover:bg-tr-aqua text-black"
          addLight="bg-black text-white hover:bg-tr-gray"
        />
      </header>

      <section>
        {/*This place contains the place where data created would be stored and seen*/}
      </section>
    </main>
  )
}
