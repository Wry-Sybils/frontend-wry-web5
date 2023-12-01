import { Icon } from "@iconify/react";
import { useTheme } from "../context/ThemeContext";


export default function ProfilePhoto() {
    const {theme} = useTheme();

    const images = [
        "https://i.pinimg.com/originals/c6/67/3c/c6673cce74c0f1b7e7a536ac2d8cd562.jpg",
        "https://i.pinimg.com/originals/f9/d9/4d/f9d94dbfc9f81ac7be74499b2e753b51.jpg",
        "https://i.pinimg.com/originals/4e/9c/e6/4e9ce699d169572a7009b99754b77b93.jpg",
        "https://i.pinimg.com/originals/20/8a/1d/208a1d695a97fdc4957d9324ff3d5b9d.jpg",
        "https://i.pinimg.com/originals/c7/5a/93/c75a936a886dec11e47b4ed6dca3e64e.png",
        "https://i.pinimg.com/originals/c9/06/dc/c906dc596966e635b7d1c4d0b2c86135.jpg",
    ]

  return (
    <div className={`relative h-[5em] w-[5em] rounded-full overflow-hidden ${theme === 'dark' ? '' : ''} `}>
        <label htmlFor="image" className="bg-tr-gray text-white h-full w-full flex items-center justify-center">
            <Icon icon="bx:image-add" className="text-[3em]" />
        </label>
        <input type="image" src={images.images} alt="" id="image" />
    </div>
  )
}
