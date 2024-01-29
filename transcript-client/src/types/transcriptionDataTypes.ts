interface TranscriptionData {
    start: number;
    end: number;
    text: string;
}


interface TranscriptionContextType {
  //@ts-ignore
  transcriptionData: TranscriptionData[] | null // Define the type for your transcription data appropriately
  //@ts-ignore
  setTranscriptionData: (data: TranscriptionData[] | null) => void;
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
    isBold: boolean;
  setIsBold: (isBold: boolean) => void;
  isItalic: boolean;
  setIsItalic: (isItalic: boolean) => void;
  isUnderline: boolean;
  setIsUnderline: (isUnderline: boolean) => void;

}

export {TranscriptionData, TranscriptionContextType}