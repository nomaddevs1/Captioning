import { useEffect, useState, useRef } from 'react';
import { Box } from "@chakra-ui/react";
//@ts-ignore
import { Editor, EditorState, Modifier, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useTranscription } from 'src/context/TranscriptionContext';


function DisplayTranscript() {
  const { transcriptionData, fontSize, fontStyle, wordSpacing, lineHeight } = useTranscription();
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const editorRef = useRef<Editor>(null);
// const [editorState, setEditorState, isDataLoaded] = useInitializeEditorState(transcriptionData);
  useEffect(() => {
    editorRef.current?.focus();
  }, []);

  useEffect(() => {
    if (transcriptionData.length > 0) {
      const contentState = convertFromRaw({
        blocks: transcriptionData,
        entityMap: {},
      });
      setEditorState(EditorState.createWithContent(contentState));
      setIsDataLoaded(true);
    }
  }, [transcriptionData]);

  useEffect(() => {
    if (!isDataLoaded) return;
    let newContentState = editorState.getCurrentContent(); 
    const selection = editorState.getSelection();

    if (fontSize) {
      newContentState = Modifier.applyInlineStyle(newContentState, selection, 'CUSTOM_FONT_SIZE');
    }
    if (fontStyle) {
      newContentState = Modifier.applyInlineStyle(newContentState, selection, 'CUSTOM_FONT_STYLE');
    }

    if (newContentState !== editorState.getCurrentContent()) {
      const newEditorState = EditorState.push(editorState, newContentState, 'change-inline-style');
      setEditorState(newEditorState); // Removed forceSelection for simplicity
    }
  }, [fontSize, fontStyle, isDataLoaded]); // Removed editorState from dependencies

  const styleMap = {
    'CUSTOM_FONT_SIZE': {
      fontSize: fontSize,
    },
    'CUSTOM_FONT_STYLE': {
      fontFamily: fontStyle,
    },
    // Word spacing moved to wrapper style
  };

  return (
    <Box height="100%" style={{ wordSpacing: wordSpacing, lineHeight: lineHeight, fontSize: fontSize, fontFamily: fontStyle }}>
      <Box pt={10} pl={20} pr={20} height="85vh" pos="relative">
        <Box overflowY="auto" height="100%" bg="primary.moss.100" p={6} textAlign="left">
          <Editor
            ref={editorRef}
            customStyleMap={styleMap}
            editorState={editorState}
            onChange={setEditorState}
            // blockStyleFn and blockRendererFn removed for simplicity
          />
        </Box>
      </Box>
    </Box>
  );
}

export default DisplayTranscript;

