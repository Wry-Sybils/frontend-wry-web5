import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTheme } from "../context/ThemeContext";
import FormInput from "./FormInput";
import ToggleButton from "./ToggleButton";
import { useDataContent } from "../context/DataContentContext";
import { nanoid } from "nanoid";

type CreateDataProps ={
    modal: boolean;
    toggleModal: (modal: boolean) => void
}

export default function CreateDataContent(props:CreateDataProps) {
    const { theme } = useTheme();
    const { createDataContent } = useDataContent();
    const [formState, setFormstate] = useState({
        id: nanoid(),
        title: '',
        description:'',
        file: new File([], 'filename'),
        link: '',
        otherText: '',
    })

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        createDataContent(formState);
        setFormstate({
            id: '',
            title: '',
            description:'',
            file: new File([], 'filename'),
            link: '',
            otherText: '',
        })

        props.toggleModal(!props.modal);
    }

  return (
    <main role="form" className={`w-[50%] h-[80%] overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-lg max-md:w-[97%] rounded-lg border p-6 ${theme === 'dark' ? 'bg-black border-aqua scrollbar-track-black scrollbar-thumb-dk-white' : 'bg-dk-white border-gray scrollbar-track-dk-white scrollbar-thumb-gray'}`}>
        <header className={`flex items-start gap-2 py-2 border-b ${theme === 'dark' ? 'border-b-dk-white' : 'border-b-black'}`}>
            <h1 className={`text-2xl font-taruno ${theme === 'dark' ? 'text-pink' : 'text-black'}`}>
                ADD NEW
            </h1>
            <Icon icon="uil:plus" className={`text-2xl ${theme === 'dark' ? 'text-gold' : 'text-gray'}`} />
        </header>

        <form action="" className={`flex flex-col gap-4`} onSubmit={handleSubmit}>
            <FormInput
                type="text"
                id={formState.title}
                title="Title"
                value={formState.title}
                onChange={(e) => setFormstate({...formState, title: e.target.value})}
                ariaLabel="title"
                required
            />

            <FormInput
                type="text"
                id={formState.description}
                title="Description"
                value={formState.description}
                onChange={(e) => setFormstate({...formState, description: e.target.value})}
                ariaLabel="description"
                required
            />

            <span className={`relative w-full border-2 border-dashed rounded-lg py-4 items-center justify-center cursor-pointer transition-colors hover:bg-tr-gray ${theme === 'dark' ? '' : 'hover:text-dk-white'}`}>
                <label htmlFor="file" className={`text-center flex flex-col gap-4 items-center w-full cursor-pointer font-taruno text-sm`}>
                    <Icon icon="fluent:document-add-28-regular" className={`text-6xl self-center justify-center`} />
                    ADD FILE
                </label>
                <input type="file" name="file" id="file" className="hidden" value=""
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        setFormstate({ ...formState, file: file });
                    }
                }}/>
            </span>

            <FormInput
                type="text"
                id={formState.link}
                value={formState.link}
                onChange={(e) => setFormstate({...formState, link: e.target.value})}
                ariaLabel="link"
                title={'Link'}
            />

            <span className={`w-full h-32 overflow-hidden border rounded-md flex flex-col gap-1 p-2 font-gilroy`}>
                <label htmlFor="otherText">Enter Manual Data</label>
                <textarea name="otherText" id="otherText" value={formState.otherText} onChange={(e) => setFormstate({...formState, otherText: e.target.value})}
                className={`w-full h-full overflow-x-hidden font-gilroy outline-none resize-none border-none ${theme === 'dark' ? ' bg-black' : 'bg-dk-white'}`}></textarea>
            </span>

            <ToggleButton
                type="submit"
                ariaLabel="submit button"
                title="SUBMIT"
                className="rounded-md text-center justify-center font-taruno"
                addDark="bg-pink"
                addLight="bg-gray text-white"
            />

        </form>
    </main>
  )
}
