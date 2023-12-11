import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DataProps {
    title: string | undefined;
    description: string | undefined;
    privacy: boolean;
}

interface CreateDataContextProps {
    children: ReactNode;
}

interface CreateDataContextValue {
    data: DataProps | null;
    setData: (data: DataProps | null) => void;
}

const CreateDataContext = createContext<CreateDataContextValue | undefined>(undefined);

export const CreateDataProvider: React.FC<CreateDataContextProps> = ({ children }) => {
    const [data, setData] = useState<DataProps | null>(() => {
        const storedData = localStorage.getItem('createdData');
        return storedData ? JSON.parse(storedData) : null;
    });

    useEffect(() => {
        if (data) {
            localStorage.setItem('createdData', JSON.stringify(data));
        } else {
            localStorage.removeItem('createdData');
        }
    }, [data]);

    return (
        <CreateDataContext.Provider value={{ data, setData }}>
            {children}
        </CreateDataContext.Provider>
    );
};

export const useCreateData = () => {
    const context = useContext(CreateDataContext);
    if (context === undefined) {
        throw new Error('useCreateData must be used within a CreateDataProvider');
    }
    return context;
};