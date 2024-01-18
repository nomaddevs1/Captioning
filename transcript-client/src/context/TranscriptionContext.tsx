
import React, { createContext, useContext, useState } from 'react';

interface TranscriptionContextType {
  transcriptionData: TranscriptionData | null // Define the type for your transcription data appropriately
  setTranscriptionData: (data: TranscriptionData | null) => void;
  fontSize: string;
  setFontSize: (fontSize: string) => void;
  fontStyle: string;
  setFontStyle: (fontStyle: string) => void;
  fontColor: string;
  setFontColor: (color: string) => void;
  highlightColor: string;
  setHighlightColor: (color: string) => void;
  lineHeight: number;
  setLineHeight: (lineHeight: number) => void;
  wordSpacing: string;
  setWordSpacing: (wordSpacing: string) => void;
}

const defaultState: TranscriptionContextType = {
  transcriptionData: null,
  fontSize: '16px',
  setFontSize: () => {},
  fontColor: '#000000',
  setFontColor: () => {},
  fontStyle: 'Arial',
  setFontStyle: () => {},
  highlightColor: '#FFFF00',
  setHighlightColor: () => {},
  lineHeight: 1.5,
  setLineHeight: () => {},
  wordSpacing: 'normal',
  setWordSpacing: () => {},
};

export const TranscriptionContext = createContext<TranscriptionContextType>(defaultState);

export const TranscriptionProvider: React.FC = ({ children }) => {
  const [transcriptionData, setTranscriptionData] = useState<TranscriptionData | null>(null);
  const [fontSize, setFontSize] = useState<string>('16px');
  const [fontColor, setFontColor] = useState<string>('#000000');
  const [highlightColor, setHighlightColor] = useState<string>('#FFFF00');
  const [lineHeight, setLineHeight] = useState<number>(1.5);
  const [fontStyle, setFontStyle] = useState<string>('Arial');

  return (
    <TranscriptionContext.Provider value={{
      transcriptionData, setTranscriptionData,
      fontSize, setFontSize,
      fontStyle, setFontStyle,
      fontColor, setFontColor,
      highlightColor, setHighlightColor,
      lineHeight, setLineHeight,
    }}>
      {children}
    </TranscriptionContext.Provider>
  );
};

export const useTranscription = () => useContext(TranscriptionContext);
