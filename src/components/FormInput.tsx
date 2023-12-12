import { ChangeEvent, useState } from 'react';
import { Icon } from '@iconify/react';
import { useTheme } from '../context/ThemeContext';

type FormInputTypes = {
  type: string
  name?: string
  title: string
  id: string
  pattern?: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  maxLength?: number
  minLength?: number
  placeholder?: string
  className?: string
  children?: React.ReactNode
  message?: string
  disabled?: boolean
  disabledClassLight?: string
  disabledClassDark?: string
  inputClass?: string
  ariaLabel: string
  checked?: boolean
  required?: boolean
  labelClass?: string
}

export default function FormInput(props: FormInputTypes) {
  const { theme } = useTheme();
  const [formState, setFormState] = useState({
    [props.id]: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    e.preventDefault()
        
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  
  function togglePassword() {
    if (props.type === 'password') {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    }
  }
  
  return (
    <span id='form-input' className={`relative w-full flex flex-col items-start gap-1 bg-transparent rounded-small ${props.className}`}>
      <label htmlFor={props.id} className={`relative text-base text-sac-black 
        ${formState[props.id] ? 'active' : ''} font-gilroy
        ${theme === 'dark' ? 'text-white' : 'text-black'}
        ${props.labelClass}
      `}>
        {props.title}
      </label>

      <input
        type={props.type === 'password' && showPassword ? 'text' : props.type}
        name={props.id}
        id={props.id}
        value={props.value}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          handleChange(e);
          props.onChange(e);
        }}
        pattern={props.pattern}
        maxLength={props.maxLength}
        minLength={props.minLength}
        title={props.message}
        required={props.required}
        placeholder={props.placeholder}
        className={`relative w-full h-10 bg-transparent outline-none resize-none border rounded py-1 px-4 overflow-hidden textbase font-gilroy 
          ${theme === 'dark' ? 'focus-within:border-pink border-dk-white bg-tr-gray text-white' : 'focus-within:border-aqua border-gray bg-tr-white text-gray'}
          ${props.inputClass}
          ${props.disabled && theme === 'dark' ? props.disabledClassDark : props.disabledClassLight}
        `}

        disabled={props.disabled}
        aria-label={props.ariaLabel}
        aria-labelledby={props.ariaLabel}
        checked={props.checked}
      />
          {props.children}

      
          <span className='absolute top-1/2 right-3 w-max cursor-pointer' onClick={togglePassword}>
              {props.type === 'password' ? (
              showPassword ? (
                <Icon icon="ri:eye-fill" className='text-2xl'  />
                ) : (
                <Icon icon="ri:eye-close-fill" className='text-2xl' />
              )
              ) : null}
          </span>
    </span>
  );
  }
