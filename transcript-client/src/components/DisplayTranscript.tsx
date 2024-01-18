import React, { useEffect, useState, useRef } from 'react';
import { Box } from "@chakra-ui/react";
import { Editor, EditorState, Modifier, convertFromRaw, DraftStyleMap } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useTranscription } from 'src/context/TranscriptionContext';

function DisplayTranscript() {
  const { transcriptionData, fontSize, fontStyle } = useTranscription();
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [isDataLoaded, setIsDataLoaded] = useState(false); 
  const editorRef = useRef<Editor>(null);


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
    
    // if (wordSpacing) {
    //   newContentState = Modifier.applyInlineStyle(newContentState, selection, 'CUSTOM_WORD_SPACING');
    // }
 if (newContentState !== editorState.getCurrentContent()) {
    const newEditorState = EditorState.push(editorState, newContentState, 'change-inline-style');
    setEditorState(EditorState.forceSelection(newEditorState, selection)); 
}
  }, [fontSize, fontStyle, isDataLoaded]); 

  const styleMap: DraftStyleMap = {
    'CUSTOM_FONT_SIZE': {
      fontSize: fontSize,
    },
    'CUSTOM_FONT_STYLE': {
      fontFamily: fontStyle,
    },
    // Additional styles will be added here as needed
  };

  const getBlockStyle = (block) => {
    // Implementation for block style based on the block type
    return 'myBlockStyle';
  };

  return (
    <Box height="100%">
      <Box pt={10} pl={20} pr={20} height="85vh" pos="relative">
        <Box overflowY="auto" height="100%" bg="primary.moss.100" p={6} textAlign="left">
          <Editor
            ref={editorRef}
            customStyleMap={styleMap}
            editorState={editorState}
            onChange={setEditorState}
            blockStyleFn={getBlockStyle}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default DisplayTranscript;

