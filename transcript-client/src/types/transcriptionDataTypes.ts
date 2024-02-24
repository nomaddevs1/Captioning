interface TranscriptionData {
    start: number;
    end: number;
    text: string;
}


interface TranscriptionContextType {
  transcriptionData: TranscriptionData[] | null // Define the type for your transcription data appropriately
  setTranscriptionData: (data: TranscriptionData[] | null) => void;
  fontSize: string;
  setFontSize: (fontSize: string) => void;
  fontStyle: string;
  setFontStyle: (fontStyle: string) => void;
  fontColor: string;
  setFontColor: (color: string) => void;
  allHighlightColors: string[];
  setAllHighlightColors: (color: string[]) => void;
  lineHeight: number;
  setLineHeight: (lineHeight: number) => void;
  wordSpacing: string;
  setWordSpacing: (wordSpacing: string) => void;
  isBold: boolean;
  setIsBold: (isBold: boolean) => void;
  isItalic: boolean;
  setIsItalic: (isItalic: boolean) => void;
  isUnderline: boolean;
  setIsUnderline: (isUnderline: boolean) => void;
  resetStyles: () => void;
  audioFile: File | null;
  setAudioFile: React.Dispatch<React.SetStateAction<File | null>>;
}


interface TranscriptionSegment {
  start: number;
  end: number;
  text: string;
}



export {TranscriptionData, TranscriptionContextType, TranscriptionSegment}