import { useTheme } from '../context/ThemeContext';
import ToggleButton from '../components/ToggleButton';
import { Icon } from '@iconify/react';

type Props = {
  className?: string
}

export default function ThemeButton({className}: Props) {
    const {theme, toggleTheme} = useTheme();
  return (
    <ToggleButton
        type='button'
        onClick={toggleTheme}
        ariaLabel='theme change button'
        className={`fixed top-4 right-4 rounded transition-transform ease-in-out p-2 ${theme === 'dark' ? 'hover:bg-tr-white text-white' : 'hover:bg-tr-black text-black'} ${className}`}
      >  
        {theme === 'dark' ? <Icon icon="mingcute:sun-fill" className='text-3xl' /> : <Icon icon="mingcute:moon-fill" className='text-3xl' />}
    </ToggleButton>
  )
}
