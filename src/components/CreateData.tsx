import { Icon } from '@iconify/react';
import { useTheme } from '../context/ThemeContext';
import FormInput from './FormInput';
import { useCreateData } from '../context/CreateDataContext';
import ToggleButton from './ToggleButton';

type CreateDataProps ={
    modal: boolean;
    toggleModal: (modal: boolean) => void
}

export default function CreateData(props:CreateDataProps) {
    const { theme } = useTheme();
    const { data, setData } = useCreateData();

    const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isPrivate = e.target.value === 'private';
        setData({ ...data, privacy: isPrivate, title: data?.title || '', description:data?.description || '' });
    };

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newTitle = e.target.value;
        setData({...data, privacy: data?.privacy || false, title: newTitle || '', description: data?.description || ''})
    }
    function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newDescription = e.target.value;
        setData({...data, privacy: data?.privacy || false, title: data?.title || '', description: newDescription || ''})
    }

    const handleFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        setData(data);
        console.log(data)
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
                id={data?.title || ''}
                title='Title'
                value={data?.title || ''}
                ariaLabel='Title'
                onChange={handleTitleChange}
            />
            
            <FormInput
                type='text'
                id={data?.description || ''}
                title='Description'
                value={data?.description || ''}
                ariaLabel='Description'
                onChange={handleDescriptionChange}
            />

            <FormInput
                type='radio'
                id='privacy'
                title='Public'
                value='public'
                checked={!data?.privacy}
                onChange={handlePrivacyChange}
                ariaLabel='public'
                className='!flex-row-reverse items-center !text-sm gap-2 !justify-start !w-max mt-4 cursor-pointer'
                inputClass={`h-4 w-4 cursor-poiner ${theme === 'dark' ? 'accent-pink bg-gray' : 'accent-gray'}`}
            />

            <FormInput
                type='radio'
                id='privacy'
                title='Private'
                value='private'
                checked={data?.privacy}
                onChange={handlePrivacyChange}
                ariaLabel='private'
                className='!flex-row-reverse items-center !text-sm gap-2 !justify-start !w-max cursor-pointer'
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
