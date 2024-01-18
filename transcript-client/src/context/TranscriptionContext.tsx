import React, { createContext, useState, useContext} from 'react';

// Define the structure of your context data
interface TranscriptionData {
  // Example field, replace with your actual data fields
  content?: string; 
}
interface TranscriptionProviderProps {
  children: React.ReactNode;
}

interface TranscriptionContextType {
  transcriptionData: TranscriptionData | null;
  setTranscriptionData: (data: TranscriptionData | null) => void;

}


export const TranscriptionContext = createContext<TranscriptionContextType | undefined>(undefined);

export const TranscriptionProvider = ({ children }: TranscriptionProviderProps) => {
  const [transcriptionData, setTranscriptionData] = useState<TranscriptionData | null>(null);
  const [fontSize, setFontSize] = useState('16px')

  return (
    <TranscriptionContext.Provider value={{ transcriptionData, setTranscriptionData,  fontSize, setFontSize }}>
      {children}
    </TranscriptionContext.Provider>
  );
};


export const useTranscription = () => useContext(TranscriptionContext);
