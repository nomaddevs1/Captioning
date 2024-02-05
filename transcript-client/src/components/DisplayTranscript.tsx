import { useEffect, useState, useRef } from "react";
import "draft-js/dist/Draft.css";
import { Box, Button } from "@chakra-ui/react";
import { useTranscription } from "src/context/TranscriptionContext";
import AudioControls from "./AudioControls";
import { useAudioContext } from "src/context/AudioContext";
import { useLocation } from "react-router-dom";
//@ts-ignore
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { Eraser } from "@phosphor-icons/react";
import { handleKeyCommand, styleMap } from "src/utils/draftJsStylingUtils";
import useEditorHook from "src/hooks/useEditor";
import { TranscriptionData } from "src/types/transcriptionDataTypes";

const DisplayTranscript = () => {
  const {
    transcriptionData,
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
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [initialContentState, setInitialContentState] =
    useState<EditorState | null>(null);
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
  const [isInteractiveMode, setIsInteractiveMode] = useState(false);
  const location = useLocation();
  const uploadedFile = (location.state as any)?.uploadedFile as
    | File
    | undefined;
  const audioRef = useRef(new Audio());
  const lastSeekTimeRef = useRef(Date.now());
  const { resetStyles } = useTranscription();

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

  useEffect(() => {
    // Update the playback time whenever the audio is playing
    if (isAudioPlaying) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, [isAudioPlaying, setCurrentTime]);

  useEffect(() => {
    if (isPlaying) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, [isPlaying, setCurrentTime, audioRef.current.currentTime]);

  // Handle the uploaded file, you may want to set it in the audio context or perform other actions
  useEffect(() => {
    // Handle the uploaded file, you may want to set it in the audio context or perform other actions
    if (uploadedFile && !audioFile) {
      setContextAudioFile(uploadedFile);
      // Additional processing if needed
    }
  }, [uploadedFile, audioFile, setContextAudioFile]);

  useEffect(() => {
    setCurrentStyleMap(styleMap(highlightColor));
  }, [highlightColor]);

  // const handlePlayPause = () => {
  //   if (isAudioPlaying) {
  //     pause(); // Pause the audio playback
  //   } else {
  //     play(); // Start or resume the audio playback
  //   }
  //   setIsAudioPlaying(!isAudioPlaying);
  // };

  const toggleInteractiveMode = () => {
    setIsInteractiveMode(!isInteractiveMode);
    toggleShowAudioControls();
  };

  const handleSeek = (time: number) => {
    console.log(time)
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      lastSeekTimeRef.current = Date.now();
      setCurrentTime(time);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    const updateCurrentTime = () => {
      // Skip update if a seek operation was recently performed
      if (Date.now() - lastSeekTimeRef.current > 1000) { // Debounce time after seek
        setCurrentTime(currentTime);
      }
    }

    audio.addEventListener("timeupdate", updateCurrentTime);

    return () => {
      audio.removeEventListener("timeupdate", updateCurrentTime);
    };
  }, []);

  // Render each segment of the transcript for interactive mode
  const renderTranscriptSegments = (segments: TranscriptionData[] | null) =>
    segments?.map((segment, index) => (
      <Box
        key={index}
        onClick={() => handleSeek(segment.start)}
        bg={
          currentTime >= segment.start && currentTime <= segment.end
            ? "yellow"
            : "transparent"
        }
        fontWeight={
          currentTime >= segment.start && currentTime <= segment.end
            ? "bold"
            : "normal"
        }
        p={2}
        cursor="pointer"
      >
        {segment.text}
      </Box>
    ));

  const toggleShowAudioControls = () => {
    setShowAudioControls(!showAudioControls);
  };

  const onEditorChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  const resetEditor = () => {
    setEditorState(initialContentState);
    resetStyles();
  };

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
        <Button
          variant="outline"
          size="sm"
          pos={"fixed"}
          top={"85px"}
          right={1}
          onClick={resetEditor}
        >
          <Eraser size={32} weight="fill" />
        </Button>
        <Button
          onClick={toggleInteractiveMode}
          position="fixed"
          bottom={4}
          left={800}
          bg="primary.ivy.400"
          p={4}
        >
          {isInteractiveMode ? "Standard View" : "Interactive Transcript"}
        </Button>
        <Box
          overflowY="auto"
          height="100%"
          bg="white"
          borderRadius={4}
          p={6}
          textAlign="left"
        >
          {isInteractiveMode ? (
            renderTranscriptSegments(transcriptionData)
          ) : (
            <Editor
              ref={editorRef}
              customStyleMap={currentStyleMap}
              editorState={editorState}
              onChange={onEditorChange}
              handleKeyCommand={handleKeyCommand}
            />
          )}
        </Box>
      </Box>
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
    </Box>
  );
};

export default DisplayTranscript;
