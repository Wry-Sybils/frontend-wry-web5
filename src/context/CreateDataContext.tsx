import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { nanoid } from 'nanoid';

export interface DataProps {
    id: string;
    title: string | undefined;
    description: string | undefined;
    privacy: boolean;
}

export interface CreateDataContextValue {
    data: DataProps[];
    createData: (newData: DataProps) => void;
    updateData: (id: string, updatedData: DataProps) => void;
    deleteData: (id: string) => void;
    setData: React.Dispatch<React.SetStateAction<DataProps[]>>;
}

interface CreateDataContextProps {
    children: ReactNode;
}

const CreateDataContext = createContext<CreateDataContextValue | undefined>(undefined);

export const CreateDataProvider: React.FC<CreateDataContextProps> = ({ children }) => {
    const [data, setData] = useState<DataProps[]>(() => {
        const storedData = localStorage.getItem('createdData');
        return storedData ? JSON.parse(storedData) : [];
    });

    const createData = (newData: DataProps) => {
        setData((prevData) => {
            if (!Array.isArray(prevData)) {
                // If prevData is not an array (undefined or null), initialize it as an empty array
                prevData = [];
            }
            return [...prevData, { ...newData, id: nanoid() }];
        });
    };    

    const updateData = (id: string, updatedData: DataProps) => {
        const updatedArray = data.map((item) => (item.id === id ? updatedData : item));
        setData(updatedArray);
    };

    const deleteData = (id: string) => {
        const filteredArray = data.filter((item) => item.id !== id);
        setData(filteredArray);
    };

    useEffect(() => {
        if (data) {
            localStorage.setItem('createdData', JSON.stringify(data));
        } else {
            localStorage.removeItem('createdData');
        }
    }, [data]);

    return (
        <CreateDataContext.Provider value={{ data, createData, updateData, deleteData, setData }}>
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