import { useEffect, useState, useRef } from 'react';
import 'draft-js/dist/Draft.css';
import { Box, Button } from "@chakra-ui/react";
import { useTranscription } from 'src/context/TranscriptionContext';
import AudioControls from './AudioControls';
import { useAudioContext } from 'src/context/AudioContext';
import { useLocation } from "react-router-dom";
//@ts-ignore
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import {Eraser} from "@phosphor-icons/react"
import { handleKeyCommand, styleMap } from "src/utils/draftJsStylingUtils";
import useEditorHook from "src/hooks/useEditor";

const DisplayTranscript = () => {
  const {
    transcriptionData,
    editorState,
    setEditorState,
    fontSize,
    fontStyle,
    wordSpacing,
    lineHeight,
    fontColor,
    highlightColor,
    isBold,
    setIsBold,
    isItalic,
    setIsItalic,
    isUnderline,
    setIsUnderline,
  } = useTranscription();

  const [initialContentState, setInitialContentState] = useState<EditorState | null>(null)
   
  const [currentStyleMap, setCurrentStyleMap] = useState(() =>
    styleMap(highlightColor)
  );
  const editorRef = useRef(null);

  const [showAudioControls, setShowAudioControls] = useState(false);

  const {
    audioFile,
    setAudioFile: setContextAudioFile,
    play,
    pause,
    isPlaying,
    setCurrentTime,
    currentTime,
    duration,
  } = useAudioContext(); // Access audio file, playback functions, and playback position from context
  
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    // Update the playback time whenever the audio is playing
    if (isAudioPlaying) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, [isAudioPlaying, setCurrentTime]);


  // Retrieve the uploaded file from the route state
  const location = useLocation();
  const uploadedFile = (location.state as any)?.uploadedFile as File | undefined;
  const audioRef = useRef(new Audio());

  // Handle the uploaded file, you may want to set it in the audio context or perform other actions
  useEffect(() => {
    // Handle the uploaded file, you may want to set it in the audio context or perform other actions
    if (uploadedFile && !audioFile) {
      setContextAudioFile(uploadedFile);
      // Additional processing if needed
    }
  }, [uploadedFile, audioFile, setContextAudioFile]);

  const handlePlayPause = () => {
    if (isAudioPlaying) {
      pause(); // Pause the audio playback
    } else {
      play(); // Start or resume the audio playback
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  const toggleShowAudioControls = () => {
    setShowAudioControls(!showAudioControls);
  };

  const { resetStyles } = useTranscription()
  
  useEffect(() => {
    setCurrentStyleMap(styleMap(highlightColor));
  }, [highlightColor]);
  useEditorHook({
     setInitialContentState,
     editorState,
     setEditorState,
     transcriptionData,
     isBold,
     setIsBold,
     isItalic,
     setIsItalic,
     isUnderline,
     setIsUnderline,
     highlightColor,
  });
  
  const onEditorChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  const resetEditor = () => {
    setEditorState(initialContentState)
    resetStyles();
  }

  return (
    <Box
      height="100%"
      style={{
        wordSpacing,
        lineHeight,
        fontSize,
        fontFamily: fontStyle,
        color: fontColor,
      }}
    >
      <Box pt={10} pl={20} pr={20} height="85vh" pos="relative">
        <Button variant="outline" size="sm" pos={"fixed"} top={"85px"} right={1} onClick={resetEditor}>
          <Eraser size={32} weight="fill"/>
        </Button>
        <Box
          overflowY="auto"
          height="100%"
          bg="white"
          borderRadius={4}
          p={6}
          textAlign="left"
        >
          <Editor
            ref={editorRef}
            customStyleMap={currentStyleMap}
            editorState={editorState}
            onChange={onEditorChange}
            handleKeyCommand={handleKeyCommand}
          />
        </Box>
      </Box>
      {showAudioControls ? (
          <AudioControls
            isPlaying={isAudioPlaying}
            onPlayPause={handlePlayPause}
            currentTime={currentTime}
            duration={duration}
          />
        ) : (
          <Button onClick={toggleShowAudioControls} position="fixed" bottom={4} left={800} bg="primary.ivy.400" p={4}>
            Interactive Transcript
          </Button>
        )}
    </Box>
  );
};

export default DisplayTranscript;
