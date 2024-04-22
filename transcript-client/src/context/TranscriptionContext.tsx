import { createContext, useContext, useState } from "react";
import {
  TranscriptionContextType,
  TranscriptionData,
  TranscriptionSegment,
} from "src/types/transcriptionDataTypes";


const defaultState: TranscriptionContextType = {
  isVideo: true,
  setIsVideo: () => { },
  videoFile: null,
  setVideoFile: () => {},
  transcriptionData: null,
  setTranscriptionData: () => null,
  transcriptionVTT: null,
  setTranscriptionVTT: () => null,
  fontSize: "16px",
  setFontSize: () => {},
  fontColor: "#000000",
  setFontColor: () => {},
  fontStyle: "Arial",
  setFontStyle: () => {},
  allHighlightColors: [],
  setAllHighlightColors: () => {},
  lineHeight: 1.5,
  setLineHeight: () => {},
  wordSpacing: "normal",
  setWordSpacing: () => {},
  isBold: false,
  setIsBold: () => {},
  isItalic: false,
  setIsItalic: () => {},
  isUnderline: false,
  setIsUnderline: () => {},
  audioFile: null,
  setAudioFile: () => null,
  resetStyles: () => {},

  videoHighlightColors: "#FF",
  setVideoHighlightColors: () => {},
  line: -8,
  setLine: () => {},
  position: 50,
  setPosition: () => {},
  textShadow: "",
  setTextShadow: () => {},
  textStroke: "#FF",
  setTextStroke: () => {},
};

export const TranscriptionContext =
  createContext<TranscriptionContextType>(defaultState);

export const TranscriptionProvider = ({ children }: any) => {
  const [transcriptionData, setTranscriptionData] = useState<
    TranscriptionSegment[] | null
    >(null);
  const [isVideo, setIsVideo] = useState<boolean>(true);
  const defaultColor = isVideo ? "#ffffff" : "#000000"
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [transcriptionVTT, setTranscriptionVTT] = useState<TranscriptionData | null>(null)
  const [fontSize, setFontSize] = useState<string>("16px");
  const [fontColor, setFontColor] = useState<string>(defaultColor);
  const [allHighlightColors, setAllHighlightColors] = useState<string[]>([]);
  const [lineHeight, setLineHeight] = useState<number>(1.5);
  const [fontStyle, setFontStyle] = useState<string>("Arial");
  const [wordSpacing, setWordSpacing] = useState<string>("normal");
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [videoHighlightColors, setVideoHighlightColors] = useState<string>("");
  const [line, setLine] = useState<number>(20);
  const [position, setPosition] = useState<number>(50);
  const [textShadow, setTextShadow] = useState<string>("");
  const [textStroke, setTextStroke] = useState<string>("#FF");

  
  const resetStyles = () => {
    setFontSize(defaultState.fontSize);
    setFontStyle(defaultState.fontStyle);
    setFontColor(defaultState.fontColor);
    setLineHeight(defaultState.lineHeight);
    setWordSpacing(defaultState.wordSpacing);
  };
  return (
    <TranscriptionContext.Provider
      value={{
        isVideo,
        setIsVideo,
        videoFile,
        setVideoFile,
        transcriptionData,
        setTranscriptionData,
        transcriptionVTT,
        setTranscriptionVTT,
        fontSize,
        setFontSize,
        fontStyle,
        setFontStyle,
        fontColor,
        setFontColor,
        allHighlightColors,
        setAllHighlightColors,
        lineHeight,
        setLineHeight,
        wordSpacing,
        setWordSpacing,
        isBold,
        setIsBold,
        isItalic,
        setIsItalic,
        isUnderline,
        setIsUnderline,
        resetStyles,
        audioFile,
        setAudioFile,
        videoHighlightColors,
        setVideoHighlightColors,
        line,
        setLine,
        position,
        setPosition,
        textShadow,
        setTextShadow,
        textStroke,
        setTextStroke,
      }}
    >
      {children}
    </TranscriptionContext.Provider>
  );
};

export const useTranscription = () => useContext(TranscriptionContext);
