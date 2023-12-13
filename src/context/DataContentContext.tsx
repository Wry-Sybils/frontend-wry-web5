import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

export interface DataContentProps {
  id: string;
  title: string | undefined;
  description: string | undefined;
  file: File | undefined;
  link: string | undefined;
  otherText: string | undefined;
}

export interface DataContentContextValue {
  dataContent: DataContentProps[];
  setDataContents: React.Dispatch<React.SetStateAction<DataContentProps[]>>;
  createDataContent: (newDataContent: DataContentProps) => void;
  updateDataContent: (id: string, updatedDataContent: DataContentProps) => void;
  deleteDataContent: (id: string) => void;
}

const DataContentContext = createContext<DataContentContextValue | undefined>(undefined);

export const DataContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [dataContent, setDataContents] = useState<DataContentProps[]>(() => {
      const storedData = localStorage.getItem('createdDataContent');
      return storedData ? JSON.parse(storedData) : [];
    });

    const createDataContent = (newDataContent: DataContentProps) => {
      setDataContents((prevDataContents) => [
      ...prevDataContents,
      { ...newDataContent, id: nanoid() },
      ]);
    };

    const updateDataContent = (id: string, updatedDataContent: DataContentProps) => {
      setDataContents((prevDataContents) =>
      prevDataContents.map((content) =>
          content.id === id ? { ...content, ...updatedDataContent } : content
      )
      );
    };

    const deleteDataContent = (id: string) => {
      setDataContents((prevDataContents) =>
      prevDataContents.filter((content) => content.id !== id)
      );
    };

    useEffect(() => {
      if (dataContent) {
        localStorage.setItem('createdDataContent', JSON.stringify(dataContent));
      } else {
        localStorage.removeItem('createdDataContent');
      }
    }, [dataContent]);

  return (
    <DataContentContext.Provider
      value={{ dataContent, setDataContents, createDataContent, updateDataContent, deleteDataContent }}
    >
      {children}
    </DataContentContext.Provider>
  );
};

export const useDataContent = () => {
  const context = useContext(DataContentContext);
  if (context === undefined) {
    throw new Error('useDataContent must be used within a DataContentProvider');
  }
  return context;
};