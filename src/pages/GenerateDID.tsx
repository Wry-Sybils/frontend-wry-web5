import { useState, useEffect } from 'react';
import { useResolvedPath, useNavigate, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Content from '../utils/Content';
import ThemeButton from '../utils/ThemeButton';
import ToggleButton from '../components/ToggleButton';
import { Icon } from '@iconify/react/dist/iconify.js';
import { toast, Toaster } from 'sonner';
import { useUser } from '../context/UserContext';

export default function GenerateDID() {
  const { theme } = useTheme();
  const url = useResolvedPath('').pathname;
  const navigate = useNavigate();
  const [getDID, setGetDID] = useState(false);
  const [generateCode, setGenerateCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useUser();

  useEffect(() => {
    const storedCode = localStorage.getItem('generatedCode');
    if (storedCode) {
      setGenerateCode(storedCode);
      setGetDID(true);

      // Schedule code removal after 30 seconds
      const timeoutId = setTimeout(() => {
        localStorage.removeItem('generatedCode');
        setGenerateCode('');
        setGetDID(false);
      }, 30000);

      // Cleanup on component unmount
      return () => {
        clearTimeout(timeoutId);
        setIsLoading(false); // Reset loading state on unmount
      };
    }
  }, []);

  function getCode() {
    setIsLoading(true);

    setTimeout(() => {
        const code = generateRandomCode(24);
        setGenerateCode(code);
        localStorage.setItem('generatedCode', code);

        // Update user's data in local storage and context
        const storedImage = localStorage.getItem('userImage');
        const updatedUser = {
            DID: code,
            username: user?.username || undefined,
            photo: storedImage || undefined,
        };

        setUser(updatedUser);

        setGetDID(true);
        navigate(`${url}/code generated/${code}`);
        setIsLoading(false);
    }, 3000);
  }


  let isCodeCopied = false;

  function copyCode() {
    if (isCodeCopied) {
      toast.warning('You have already copied code to clipboard');
    } else {
      const codeToCopy = generateCode;
      navigator.clipboard
        .writeText(codeToCopy)
        .then(() => {
          toast.success('Code has been copied to clipboard successfully');
          isCodeCopied = true;
        })
        .catch(() => {
          toast.error('Your code could not be copied');
        });
    }
  }

  return (
    <Content className={`h-screen w-screen flex flex-col items-center justify-center`}>
      <ThemeButton />
      <h1
        className={`text-[1.5em] md:text-[3em] font-taruno text-center ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}
      >
        GENERATE YOUR &nbsp;
        <span className={theme === 'dark' ? 'text-pink' : 'text-aqua'}>DID</span> &nbsp; HERE
      </h1>
      {getDID ? (
        <section className='w-full flex flex-col items-center justify-center gap-4'>
          <p className={`text-[1.2em] ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Copy your code here
          </p>
          <span
            className={`px-5 py-2 flex items-center gap-10 rounded-lg ${
              theme === 'dark' ? 'bg-tr-gray text-white' : 'bg-black text-white'
            }`}
          >
            {generateCode}
            <ToggleButton type='button' ariaLabel='copy code' onClick={copyCode} className='!p-0'>
              <Icon icon='iconoir:copy' />
            </ToggleButton>
          </span>
          <small>Generate new code in </small>

          <ToggleButton
            type='button'
            ariaLabel='Login Button'
            onClick={() => navigate('/login')}
            className='fixed bottom-6 right-6 rounded-full'
            addDark='bg-pink text-white'
            addLight='bg-aqua text-white'
          >
            <Icon icon='ant-design:login-outlined' className='text-4xl' />
          </ToggleButton>
        </section>
        ) : (
            <ToggleButton
            type='button'
            title={isLoading ? '' : 'GENERATE'}
            ariaLabel='generate DID'
            className='relative font-taruno rounded-lg w-[15%] flex items-center justify-center'
            addDark='bg-pink text-white'
            addLight='bg-aqua'
            onClick={getCode}
            disabled={isLoading}
            disabledClass='bg-gray text-white'
            >
                {isLoading && <Icon icon="tabler:loader-3" className='animate-spin text-3xl cursor-not-allowed' />}
            </ToggleButton>
        )}

      <Outlet />
      <Toaster richColors position='top-right' />
    </Content>
  );
}

function generateRandomCode(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}
