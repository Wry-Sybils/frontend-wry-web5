import { useState } from 'react'
import { useResolvedPath, useNavigate, Outlet } from 'react-router-dom'
import { useTheme } from "../context/ThemeContext"
import Content from "../utils/Content";
import ThemeButton from "../utils/ThemeButton";
import ToggleButton from '../components/ToggleButton';
import { Icon } from '@iconify/react/dist/iconify.js';
import { toast, Toaster } from 'sonner';


export default function GenerateDID() {

    const { theme } = useTheme();
    const url = useResolvedPath("").pathname;
    const navigate = useNavigate();
    const [getDID, setGetDID] = useState(false);
    const [generateCode, setGenerateCode] = useState('')
    
    function getCode() {
        const code = generateRandomCode(24);
        setGenerateCode(code);
        setGetDID(!getDID)
        navigate(`${url}/code generated/${code}`);
    }

    let isCodeCopied = false;

    function copyCode(){
        if (isCodeCopied) {
            toast.warning('You have already copied code to clipboard');
        } else {
            const codeToCopy = generateCode;
            navigator.clipboard.writeText(codeToCopy).then(() => {
                toast.success('Code has been copied to clipboard successfully');
                isCodeCopied = true;
            }).catch(() => {
                toast.error('Your code could not be copied');
            });
        }
    }
    
    console.log('url', url)

    return(
        <Content className={`h-screen w-screen flex flex-col items-center justify-center`}>
            <ThemeButton />
            <h1 className={`text-[1.5em] md:text-[3em] font-taruno text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                GENERATE YOUR &nbsp;
                <span className={theme === 'dark' ? 'text-pink' : 'text-aqua'}>DID</span> &nbsp;
                HERE
            </h1>
            {getDID ? (
                <section className='w-full flex flex-col items-center justify-center gap-4'>
                    <p className={`text-[1.2em] ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                        Copy your code here
                    </p>
                    <span className={`px-5 py-2 flex items-center gap-10 rounded-lg ${theme === 'dark' ? 'bg-tr-gray text-white' : 'bg-black text-white'}`}>
                        {generateCode}
                        <ToggleButton
                            type='button'
                            ariaLabel='copy code'
                            onClick={copyCode}
                            className='!p-0'
                        >
                            <Icon icon="iconoir:copy" />
                        </ToggleButton>
                    </span>

                    <ToggleButton
                        type='button'
                        ariaLabel='Login Button'
                        onClick={() => navigate('/login')}
                        className={`fixed bottom-6 right-6 rounded-full ${theme === 'dark' ? 'bg-pink text-white' : 'bg-aqua text-white'}`}
                    >
                        <Icon icon="ant-design:login-outlined" className='text-4xl' />
                    </ToggleButton>
                </section>
                ) : (
                <ToggleButton
                    type='button'
                    title='GENERATE'
                    ariaLabel='generate DID'
                    className={`relative font-taruno rounded-lg ${theme === 'dark' ? 'bg-pink text-white' : 'bg-aqua'}`}
                    onClick={getCode}
                />
            )}

            <Outlet />
            <Toaster richColors position='top-right' />
        </Content>
    )
}

function generateRandomCode(length:number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}