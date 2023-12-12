import { useState } from 'react';
import { Icon } from "@iconify/react";
import { useCreateData } from "../context/CreateDataContext";
import { useTheme } from "../context/ThemeContext";
import FormInput from "./FormInput";
import ToggleButton from "./ToggleButton";
import Modal from '../utils/Modal';
import { useNavigate } from 'react-router-dom';

export default function DataContent() {
  const { data, setData } = useCreateData();
  const {theme} = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const urlParts = window.location.pathname.split('/');
  const selectedId = urlParts[urlParts.length - 1];

  const selectedData = data.find(item => item.id === selectedId);

  if (!selectedData) {
    return <div>Data not found</div>;
  }

  function handleModalOpen() {
    setOpen(!open);
  }

  return (
    <section className="relative w-full h-full">
      <header className={`w-full py-4 px-2 flex items-center justify-between border-b ${theme === 'dark' ? 'border-b-tr-white' : 'border-b-tr-black'}`}>
        <div className="w-full">
          <h2 className={`uppercase text-2xl font-taruno ${theme === 'dark' ? 'text-pink' : ''}`}>
            {selectedData.title}
          </h2>
          <p className={theme === 'dark' ? 'text-dk-white' : 'text-tr-black'}>
            {selectedData.description}
          </p>
        </div>

        <FormInput
          type="checkbox"
          id='privacy'
          title="Set Private"
          checked={selectedData.privacy}
          value="privacy"
          ariaLabel="set privacy"
          onChange={() => setData(data.map(item => item.id === selectedId ? {...item, privacy: !item.privacy} : item))}
          required={false}
          className='!flex-row-reverse items-center !w-max gap-2 cursor-pointer'
          inputClass={`h-4 w-4 cursor-poiner ${theme === 'dark' ? 'accent-pink bg-gray' : 'accent-gray'}`}
          labelClass="text-sm"
        />

        <ToggleButton
          type='button'
          ariaLabel='go back a step'
          onClick={() => navigate(-1)}
          children={
            <Icon icon="ooui:arrow-previous-ltr" className='text-3xl' />
          }
          className='rounded-full py-1.5 ml-2 border'
          addDark='bg-gray text-pink border-pink'
          addLight='bg-black text-white border-dk-white'
        />
      </header>

      <section className="py-4">
        <ToggleButton
          type="button"
          title="ADD NEW"
          children={
            <Icon icon="fluent:tab-new-24-filled" className="text-8xl" />
          }
          ariaLabel="ADD DATA"
          className="border-2 border-dashed rounded-lg flex-col p-6 font-taruno text-sm"
          addDark="hover:bg-tr-black border-dk-white"
          addLight="hover:bg-tr-gray border-gray"
          onClick={handleModalOpen}
        />
      </section>

      <Modal
        open={open}
        setOpen={handleModalOpen}
      />
    </section>
  );
}
