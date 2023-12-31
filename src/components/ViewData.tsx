import { useState, startTransition } from 'react';
import { Icon } from "@iconify/react";
import { useCreateData } from "../context/CreateDataContext";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";
import ToggleButton from "./ToggleButton";
import { useNavigate } from 'react-router-dom';

export default function ViewData() {
  const { theme } = useTheme();
  const { data, deleteData } = useCreateData();
  const { user } = useUser();
  const navigate = useNavigate();
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  function handleDelete(id: string) {
    deleteData(id); 
  }

  return (
    <main className={`relative h-full w-full flex flex-wrap items-center max-md:justify-center justify-start gap-3 transition ${theme === 'dark' ? '' : ''}`}>

      {data.map((items) => (
        <section
          key={items.id}
          className={`relative max-w-[12em] basis-[12em] grow overflow-hidden p-4 rounded-lg mt-2 flex flex-col items-center justify-center text-center gap-3 transition-colors cursor-pointer
            ${theme === 'dark' ? 'bg-gray hover:bg-tr-white' : 'bg-dk-white hover:bg-tr-gray'}
          `}
          onMouseEnter={() => setHoveredItemId(items.id)}
          onMouseLeave={() => setHoveredItemId(null)}
          onClick={() => {
            startTransition(() => {
              navigate(`data/${items.id}`)
            })
          }}
        >

          <img src={user?.photo} alt={`${user?.username}'s ${items.title}`} className="rounded-full w-24 h-24" />
          <h4 className='relative uppercase font-semibold font-2xl font-taruno'>
            {items.title}
          </h4>

          {hoveredItemId === items.id && (
            <ToggleButton
              type="button"
              children={
                <Icon icon="ion:trash-bin" className="text-2xl text-pink" />
              }
              ariaLabel="Delete data"
              className="bg-tr-black rounded-full absolute top-2 right-2"
              onClick={(e) => {
                e.stopPropagation()
                handleDelete(items.id)
              }}
            />
          )}

        </section>
      ))}
    </main>
  );
}