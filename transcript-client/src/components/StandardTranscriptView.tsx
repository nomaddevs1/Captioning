import React, { useState } from "react";
//@ts-ignore
import { Editor, EditorState } from "draft-js";
import { handleKeyCommand, styleMap } from "src/utils/draftJsStylingUtils";
import { Box } from "@chakra-ui/react";
import useEditorHook from "src/hooks/useEditor";
import { useTranscription } from "src/context/TranscriptionContext";
import { useEditor } from "src/context/EditorContext";

interface StandardTranscriptViewProps {
  setInitialContentState: (editorState: EditorState) => void;
  editorRef: React.MutableRefObject<null>;
}

const StandardTranscriptView: React.FC<StandardTranscriptViewProps> = ({
  setInitialContentState,
  editorRef,

}) => {
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
  const { editorState, setEditorState } = useEditor();
  const onChange = (newState: EditorState) => {
    setEditorState(newState);
  };
  const [currentStyleMap] = useState(() => styleMap(highlightColor));
  useEditorHook({
    setInitialContentState,
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
      style={{
        wordSpacing,
        lineHeight,
        fontSize,
        fontFamily: fontStyle,
        color: fontColor,
      }}
    >
      <Box height="100%">
        <Editor
          ref={editorRef}
          customStyleMap={currentStyleMap}
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
        />
      </Box>
    </Box>
  );
};

export default StandardTranscriptView;
