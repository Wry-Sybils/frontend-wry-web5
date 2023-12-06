import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";
import { userTypes } from "../context/UserContext";
import Content from "../utils/Content";
import ProfilePhoto from "../utils/ProfilePhoto";
import ThemeButton from "../utils/ThemeButton";
import ToggleButton from "../components/ToggleButton";


export default function Login() {
  const {theme} =useTheme();
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  
  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newUsername = e.target.value;
    const newUser = user
      ? { ...user, username: newUsername || '' }
      : { DID: '', username: newUsername || '', photo: '' } as userTypes;
    setUser(newUser);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(user)

    navigate(`/dashboard/${user?.username} = ${user?.DID}`)
  }

  return (
    <Content className={`h-screen w-screen z-10 flex items-center justify-center ${theme === 'dark' ? '' : ''}`}>
      <ThemeButton />
      
      <section className={`relative w-[95%] md:w-3/6 flex flex-col items-center justify-center p-10 border rounded-lg ${theme === 'dark' ? 'bg-tr-gray border-pink' : 'bg-tr-white border-aqua'}`}>
        <ProfilePhoto className="!absolute -top-10" />
        <form action="" onSubmit={handleSubmit} className="relative w-full py-10 flex flex-col items-start gap-3">
        <FormInput 
          type="text"
          id={user?.DID || ''}
          title={'YOUR DID'}
          value={user?.DID || ''}
          onChange={() => user?.DID || ''}
          ariaLabel="DID Input"
          disabled
          disabledClassLight="cursor-not-allowed pointer-none text-tr-gray"
          disabledClassDark="cursor-not-allowed pointer-none text-tr-white"
        />

          <FormInput
            type="text"
            id={user?.username || ''}
            title={'Your UserName'}
            value={user?.username || ''}
            onChange={handleUsernameChange}
            ariaLabel="Input Username"
          />

          <ToggleButton
            type="submit"
            title="SUBMIT"
            className="font-taruno rounded-lg !px-10 self-center"
            ariaLabel="SUBMIT BUTTON"
            addDark="bg-pink"
            addLight="bg-aqua"
          />
        </form>
      </section>
    </Content>
  )
}
