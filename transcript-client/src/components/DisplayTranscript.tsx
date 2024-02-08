import React, { useRef, useState } from "react";
import { Box, Button } from "@chakra-ui/react";

import { useDisplayTranscriptContext } from "src/hooks/useDisplayTranscriptContext";

import AudioControls from "./AudioControls";
import { Eraser } from "@phosphor-icons/react";
import { TranscriptionSegment } from "src/types/transcriptionDataTypes";
import InteractiveTranscriptView from "src/components/InteractiveTranscript";
import StandardTranscriptView from "src/components/StandardTranscriptView";
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

  

  return (
    <Box height="100%" p={5}>
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
      <Box mt={4} height="85vh" pos="relative" overflowY={"auto"}>
        {isInteractiveMode && transcriptionData ? (
          <InteractiveTranscriptView
            segments={transcriptionData as TranscriptionSegment[]}
            onSegmentClick={handleSeek}
            currentTime={currentTime} 
          />
        ) : (
          <StandardTranscriptView
            setInitialContentState={setInitialContentState}
            editorRef={editorRef}
            // onChange={onEditorChange}
          />
        )}
      </Box>
    </Box>
  );
};

export default DisplayTranscript;
