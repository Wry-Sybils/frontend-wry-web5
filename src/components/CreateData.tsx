import { Icon } from '@iconify/react';
import { useTheme } from '../context/ThemeContext';
import FormInput from './FormInput';
import { useCreateData } from '../context/CreateDataContext';
import ToggleButton from './ToggleButton';
import { useState } from 'react';
import { nanoid } from 'nanoid/non-secure';

type CreateDataProps ={
    modal: boolean;
    toggleModal: (modal: boolean) => void
}

export default function CreateData(props:CreateDataProps) {
    const { theme } = useTheme();
    const { createData } = useCreateData();
    const [formState, setFormState] = useState({
        id: nanoid(),
        title: '',
        description: '',
        privacy: false,
    })
    

    const handleFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        createData(formState);
        console.log(formState)
        setFormState({
            id: '',
            title: '',
            description: '',
            privacy: false,
        })
        props.toggleModal(!props.modal);
    }

  return (
    <main role='main' className={`relative md:w-[50%] max-md:w-[97%] p-8 flex flex-col gap-3 border rounded-lg ${theme === 'dark' ? 'bg-black border-aqua' : 'bg-white border-tr-gray'}`}>
        <header>
            <h1 className={`relative font-taruno text-2xl flex items-start border-b py-4 ${theme === 'dark' ? 'text-pink border-b-gold' : ''}`}>
                NEW DATA
                <Icon icon="uil:plus" className={`text-2xl ${theme === 'dark' ? 'text-gold' : ''}`} />
            </h1>
        </header>



        <form action="" className='w-100%' onSubmit={handleFormSubmit}>
            <FormInput
                type='text'
                id={formState.title}
                title='Title'
                value={formState.title}
                ariaLabel='Title'
                required
                onChange={(e) => setFormState({...formState, title: e.target.value})}
            />
            
            <FormInput
                type='text'
                id={formState.description}
                title='Description'
                value={formState.description}
                ariaLabel='Description'
                required
                onChange={(e) => setFormState({...formState, description: e.target.value})}
            />

            <FormInput
                type='checkbox'
                id='privacy'
                title='Set private'
                checked={formState.privacy}
                required={false}
                value={'privacy'}
                onChange={() => setFormState({ ...formState, privacy: !formState.privacy })}
                ariaLabel='private'
                className='!flex-row-reverse items-center !text-xs gap-2 !justify-start !w-max mt-4 cursor-pointer'
                inputClass={`h-4 w-4 cursor-poiner ${theme === 'dark' ? 'accent-pink bg-gray' : 'accent-gray'}`}
            />


            <ToggleButton
                type='submit'
                title='CREATE'
                ariaLabel='CREATE DATA'
                className='font-taruno mt-12 items-center self-center justify-center'
                addDark='bg-pink'
                addLight='bg-gray text-white'
            />
        </form>
    </main>
  )
}
