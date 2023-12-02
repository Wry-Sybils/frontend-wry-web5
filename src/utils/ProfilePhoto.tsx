import { useTheme } from '../context/ThemeContext';
import { Icon } from '@iconify/react';
import { useUser } from '../context/UserContext';
import { useState, useEffect, ChangeEvent } from 'react';

type Props = {
    className?: string;
}

export default function ProfilePhoto(props:Props) {
    const { user, setUser } = useUser();
    const { theme } = useTheme();
    const [randomImage, setRandomImage] = useState('');

    const images = [
        "https://i.pinimg.com/originals/c6/67/3c/c6673cce74c0f1b7e7a536ac2d8cd562.jpg",
        "https://i.pinimg.com/originals/f9/d9/4d/f9d94dbfc9f81ac7be74499b2e753b51.jpg",
        "https://i.pinimg.com/originals/4e/9c/e6/4e9ce699d169572a7009b99754b77b93.jpg",
        "https://i.pinimg.com/originals/20/8a/1d/208a1d695a97fdc4957d9324ff3d5b9d.jpg",
        "https://i.pinimg.com/originals/c7/5a/93/c75a936a886dec11e47b4ed6dca3e64e.png",
        "https://i.pinimg.com/originals/c9/06/dc/c906dc596966e635b7d1c4d0b2c86135.jpg",
    ]

    const generateRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    }

    useEffect(() => {
        const storedImage = localStorage.getItem('userImage');
        if (storedImage && user && user.photo) {
            setRandomImage(storedImage);
        } else if (user && !user.photo) {
            const newImage = generateRandomImage();
            setUser({
                ...user,
                photo: newImage,
            });
            localStorage.setItem('userImage', newImage);
        }
    }, [user, setUser]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedImage = e.target.files?.[0];
        const prevUser = user;
        if (selectedImage) {
            const imageUrl = URL.createObjectURL(selectedImage);
            setRandomImage(imageUrl);
            setUser(prevUser ? 
                { ...prevUser, 
                    photo: imageUrl, 
                    username: prevUser.username, 
                    DID: prevUser.DID 
                } : 
                { photo: imageUrl, username: undefined, DID: '' 
            });
        }
    }

    return (
        <div className={`relative h-[5em] w-[5em] rounded-full p-[.1em] overflow-hidden ${theme === 'dark' ? 'bg-pink' : 'bg-aqua'} ${props.className}`}>
            <label
                htmlFor="image"
                className="absolute top-0 left-0 bg-tr-gray text-white h-full w-full rounded-full flex items-center justify-center cursor-pointer opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100 hover:z-50"
            >
                <Icon icon="bx:image-add" className="text-[3em]" />
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
            </label>
            <img
                src={randomImage || user?.photo || generateRandomImage()}
                alt={`${user?.username} profile picture`}
                className='relative h-full w-full rounded-full'
            />
        </div>
    );
}