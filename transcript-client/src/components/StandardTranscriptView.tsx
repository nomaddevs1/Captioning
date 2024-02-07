// src/components/StandardTranscriptView.tsx
import React, { useState } from 'react';
//@ts-ignore
import { Editor, EditorState } from 'draft-js';
import { handleKeyCommand, styleMap } from 'src/utils/draftJsStylingUtils';
import { Box } from '@chakra-ui/react';
import useEditorHook from 'src/hooks/useEditor';
import { useTranscription } from 'src/context/TranscriptionContext';

interface StandardTranscriptViewProps {
    editorRef: React.MutableRefObject<null>,
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
  setEditorState: (editorState: EditorState) => void;
}

const StandardTranscriptView: React.FC<StandardTranscriptViewProps> = ({ editorRef, editorState, onChange, setEditorState }) => {
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

 
  const [initialContentState, setInitialContentState] =
    useState<EditorState | null>(null);
  const [currentStyleMap] = useState(() =>
    styleMap(highlightColor)
  );
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
        onChange={onChange}
        handleKeyCommand={handleKeyCommand}
            />
            </Box>
            </Box>
    )
};

export default StandardTranscriptView;
