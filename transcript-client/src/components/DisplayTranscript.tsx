import { useEffect, useState, useRef } from "react";
//@ts-ignore
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { Box } from "@chakra-ui/react";
import { useTranscription } from "src/context/TranscriptionContext";
import { handleKeyCommand, styleMap } from "src/utils/draftJsStylingUtils";
import useEditorHook from "src/hooks/useEditor";

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
  const [initialContentState, setInitialContentState] = useState<EditorState | null>(null)
  const [currentStyleMap, setCurrentStyleMap] = useState(() =>
    styleMap(highlightColor)
  );
  const editorRef = useRef(null);
 
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
        <Box
          overflowY="auto"
          height="100%"
          bg="primary.moss.100"
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
    </Box>
  );
};

export default DisplayTranscript;
