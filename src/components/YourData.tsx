import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import ToggleButton from "./ToggleButton";
import Modal from "../utils/Modal";
import CreateData from "./CreateData";
import ViewData from "./ViewData";
import { useCreateData } from "../context/CreateDataContext";

export default function YourData() {
  const { theme } = useTheme();
  const { data } = useCreateData();
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(!open);
  }

  return (
    <main role="main" className="w-full h-full">
      <header className={`relative w-full py-3 px-2 flex items-center border-b border-b-tr-white ${theme === 'dark' ? '' : 'border-b-tr-black'}`}>
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
          onClick={handleModalOpen}
        />
      </header>

      <section>
        {data.length > 0 ?(
          <ViewData />
          // <></>
        ): (
          <div className="w-full h-full flex flex-col gap-5 items-center justify-center p-4">
            <p className={theme === 'dark' ? 'text-dk-white' : 'text-tr-gray'}>
              <i>There is no data yet</i>
            </p>
            <ToggleButton
              type="button"
              title="Create Data"
              onClick={handleModalOpen}
              ariaLabel="Create Data Button"
              className="rounded-md w-[15em] self-center justify-center"
              addDark="bg-pink"
              addLight="bg-gray text-white"
            />
          </ div>
        )}
      </section>
      <Modal 
        open={open} 
        setOpen={handleModalOpen}
        children={
          <CreateData modal={open} toggleModal={handleModalOpen} />
        }
      />
    </main>
  )
}
