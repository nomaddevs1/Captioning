import { useEffect, useState, useRef } from 'react';
import { Editor, EditorState, RichUtils, Modifier, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Box, Button } from "@chakra-ui/react";
import { useTranscription } from 'src/context/TranscriptionContext';
import AudioControls from './AudioControls';
import { useAudioContext } from 'src/context/AudioContext';
import { useLocation } from "react-router-dom";

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
    setIsUnderline
  } = useTranscription();

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
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

  // Initialize the editor with the transcription data
  useEffect(() => {
    if (transcriptionData) {
      const contentState = convertFromRaw({
        blocks: transcriptionData,
        entityMap: {},
      });
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [transcriptionData]);

  // Apply styles to selected text and update state based on current selection
  useEffect(() => {
    const selection = editorState.getSelection();

    if (!selection.isCollapsed()) {
      let newContentState = editorState.getCurrentContent();

      // Apply or remove styles based on the toggle state
      const styles = { BOLD: isBold, ITALIC: isItalic, UNDERLINE: isUnderline };
      Object.keys(styles).forEach(style => {
        newContentState = styles[style]
          ? Modifier.applyInlineStyle(newContentState, selection, style)
          : Modifier.removeInlineStyle(newContentState, selection, style);
      });
      
       newContentState = highlightColor
      ? Modifier.applyInlineStyle(newContentState, selection, 'CUSTOM_HIGHLIGHT_COLOR')
      : Modifier.removeInlineStyle(newContentState, selection, 'CUSTOM_HIGHLIGHT_COLOR');


      if (newContentState !== editorState.getCurrentContent()) {
        const newEditorState = EditorState.push(editorState, newContentState, 'change-inline-style');
        setEditorState(EditorState.forceSelection(newEditorState, selection));
      }
    }
  }, [isBold, isItalic, isUnderline, highlightColor]);

  // Update the state of the style toggles based on the current selection
  useEffect(() => {
    const currentStyle = editorState.getCurrentInlineStyle();
    setIsBold(currentStyle.has('BOLD'));
    setIsItalic(currentStyle.has('ITALIC'));
    setIsUnderline(currentStyle.has('UNDERLINE'));
  }, [editorState, setIsBold, setIsItalic, setIsUnderline]);

  const styleMap = {
    'CUSTOM_HIGHLIGHT_COLOR': {
      backgroundColor: highlightColor,
    },
    'BOLD': {
      fontWeight: 'bold',
    },
    'ITALIC': {
      fontStyle: 'italic',
    },
    'UNDERLINE': {
      textDecoration: 'underline',
    },
  };

  const handleKeyCommand = (command: string) => {
    let newState;
    if (command === 'bold') {
      newState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
    } else if (command === 'italic') {
      newState = RichUtils.toggleInlineStyle(editorState, 'ITALIC');
    } else if (command === 'underline') {
      newState = RichUtils.toggleInlineStyle(editorState, 'UNDERLINE');
    }

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const onEditorChange = (newEditorState: any) => {
    setEditorState(newEditorState);
  };

  return (
    <Box height="100%" style={{ wordSpacing, lineHeight, fontSize, fontFamily: fontStyle, color: fontColor, marginBottom: '100px' }}>
      <Box pt={10} pl={20} pr={20} height="85vh" pos="relative">
        <Box overflowY="auto" height="90%" bg="primary.moss.100" p={6} textAlign="left">
          <Editor
            ref={editorRef}
            customStyleMap={styleMap}
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
