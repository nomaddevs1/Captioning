interface TranscriptionSegment {
  start: number;
  end: number;
  text: string;
}

interface TranscriptionData {
  transcript: TranscriptionSegment[]
  vtt?: string;
}

interface TranscriptionContextType {
  isVideo: boolean;
  setIsVideo: (isVideo: boolean) => void;
  videoFile: File | null;
  setVideoFile: (videoFile: File | null) => void;
  transcriptionData: TranscriptionSegment[] | null; // Define the type for your transcription data appropriately
  setTranscriptionData: (data: TranscriptionSegment[] | null) => void;
  transcriptionVTT: TranscriptionData | null; 
  setTranscriptionVTT: (vtt: TranscriptionData) => void;
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
  videoHighlightColors: string;
  setVideoHighlightColors: (color: string) => void;
  line: number;
  setLine: (line: number) => void;
  position: number;
  setPosition: (position: number) => void;
  textShadow: string;
  setTextShadow: (textShadow: string) => void;
  textStroke: string;
  setTextStroke: (textStroke: string) => void;
}

export {TranscriptionData, TranscriptionContextType, TranscriptionSegment}