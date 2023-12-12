import React, { createContext, useContext, useState, ReactNode } from 'react';
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
  dataContent: DataContentProps | null;
  setDataContent: React.Dispatch<React.SetStateAction<DataContentProps | null>>;
  createDataContent: (newDataContent: DataContentProps) => void;
  updateDataContent: (id: string, updatedDataContent: DataContentProps) => void;
  deleteDataContent: (id: string) => void;
}

const DataContentContext = createContext<DataContentContextValue | undefined>(undefined);

export const DataContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dataContent, setDataContent] = useState<DataContentProps | null>(null);

  const createDataContent = (newDataContent: DataContentProps) => {
    setDataContent({ ...newDataContent, id: nanoid() });
  };

  const updateDataContent = (id: string, updatedDataContent: DataContentProps) => {
    if (dataContent && dataContent.id === id) {
      setDataContent(updatedDataContent);
    }
  };

  const deleteDataContent = (id: string) => {
    if (dataContent && dataContent.id === id) {
      setDataContent(null);
    }
  };

  return (
    <DataContentContext.Provider value={{ dataContent, setDataContent, createDataContent, updateDataContent, deleteDataContent }}>
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
