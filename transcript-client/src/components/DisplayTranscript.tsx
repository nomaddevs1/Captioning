import React, { useRef, useState } from "react";
import { Box, Button } from "@chakra-ui/react";

import { useDisplayTranscriptContext } from "src/hooks/useDisplayTranscriptContext";

import AudioControls from "./AudioControls";
import { Eraser } from "@phosphor-icons/react";
import { TranscriptionSegment } from "src/types/transcriptionDataTypes";
import InteractiveTranscriptView from "src/components/views/InteractiveTranscript";
import StandardTranscriptView from "src/components/views/StandardTranscriptView";
//@ts-ignore
import { EditorState } from 'draft-js';


const DisplayTranscript: React.FC = () => {
  const {
    transcriptionData,
    toggleInteractiveMode,
    isInteractiveMode,
    handleSeek,
    showAudioControls,
    resetEditor,
    isPlaying,
    pause,
    play,
    duration,
    currentTime,
  } = useDisplayTranscriptContext();
  const [initialContentState, setInitialContentState] =
    useState<EditorState | null>(null);
  const editorRef = useRef(null);
  const [currentStyleMap, setCurrentStyleMap] = useState({});
  
  

  return (
    <Box height="100%" p={4}>
      <Button
        onClick={() => resetEditor(initialContentState)}
        leftIcon={<Eraser size={24} />}
        colorScheme="teal"
        variant="solid"
        size="sm"
      >
        Reset Editor
      </Button>
      <Button
        onClick={toggleInteractiveMode}
        ml={4}
        colorScheme={isInteractiveMode ? "pink" : "blue"}
        variant="outline"
        size="sm"
      >
        {isInteractiveMode
          ? "Switch to Standard View"
          : "Switch to Interactive View"}
      </Button>
      {showAudioControls && (
        <AudioControls
          onSeek={handleSeek}
          isPlaying={isPlaying}
          onPlayPause={() => {
            isPlaying ? pause() : play();
          }}
          currentTime={currentTime}
          duration={duration}
        />
      )}
      {isInteractiveMode && transcriptionData ? (
        <Box height="70vh" overflowY={"auto"} mt={4}  flex="1" pos="relative" bg={"white"} className={"scrollContainer"} borderRadius={4} p={4} textAlign="left">
          <InteractiveTranscriptView
            segments={transcriptionData as TranscriptionSegment[]}
            onSegmentClick={handleSeek}
            currentTime={currentTime} 
          />
        </Box>
      ) : (
        <Box height="80vh" overflowY={"auto"} mt={4} pos="relative" bg="white" borderRadius={4} p={4} textAlign="left">
          <StandardTranscriptView
            setInitialContentState={setInitialContentState}
              editorRef={editorRef}
              currentStyleMap={currentStyleMap}
              setCurrentStyleMap={setCurrentStyleMap}
            // onChange={onEditorChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default DisplayTranscript;
