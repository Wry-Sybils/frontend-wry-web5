import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type userTypes = {
    username: string | undefined;
    DID: string;
    photo: string | undefined;
}

interface UserProps{
    user: userTypes | null;
    setUser: (user: userTypes | null ) => void;
}

interface UserProviderProps {
    children: ReactNode;
}

const UserContext = createContext<UserProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
    const [user, setUser] = useState<userTypes | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}