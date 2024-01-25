import { useEffect, useState, useRef } from 'react';
import { Box } from "@chakra-ui/react";
//@ts-ignore
import { Editor, EditorState, Modifier, convertFromRaw, SelectionState } from 'draft-js';
import { useTranscription } from 'src/context/TranscriptionContext';
import 'draft-js/dist/Draft.css';


function DisplayTranscript() {
  const { transcriptionData, fontSize, fontStyle, wordSpacing, lineHeight, fontColor, highlightColor } = useTranscription();
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const editorRef = useRef<Editor>(null);
  const lastSelectionRef = useRef<SelectionState | null>(null);

// const [editorState, setEditorState, isDataLoaded] = useInitializeEditorState(transcriptionData);
  useEffect(() => {
    editorRef.current?.focus();
  }, []);

  useEffect(() => {
    //@ts-ignore
    if (transcriptionData?.length > 0) {
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
  let selection = editorState.getSelection();
  
  // Check if there is a current selection
  if (!selection.isCollapsed()) {
    lastSelectionRef.current = selection;
  }
  
  // If fontColor is set and there is a last known selection, apply the style
  if (fontColor && lastSelectionRef.current) {
    newContentState = Modifier.applyInlineStyle(
      newContentState,
      lastSelectionRef.current,
      'CUSTOM_HIGHLIGTH_COLOR'
    );
    
    // We create a new editor state with the new content
    let newEditorState = EditorState.push(editorState, newContentState, 'change-inline-style');
    
    // And then force the editor to select the last known selection
    newEditorState = EditorState.forceSelection(newEditorState, lastSelectionRef.current);
    
    // Finally, we update the editor state
    setEditorState(newEditorState);
  }
    // // if (fontSize) {
    // //   newContentState = Modifier.applyInlineStyle(newContentState, selection, 'CUSTOM_FONT_SIZE');
    // // }
    // // if (fontStyle) {
    // //   newContentState = Modifier.applyInlineStyle(newContentState, selection, 'CUSTOM_FONT_STYLE');
    // // }
  }, [isDataLoaded, highlightColor]); // Removed editorState from dependencies

  const styleMap = {
    // 'CUSTOM_FONT_SIZE': {
    //   fontSize: fontSize,
    // },
    // 'CUSTOM_FONT_STYLE': {
    //   fontFamily: fontStyle,
    // },
    'CUSTOM_HIGHLIGTH_COLOR': {
      backgroundColor: highlightColor
    }
    // Word spacing moved to wrapper style
  };

  return (
    <Box height="100%" style={{ wordSpacing: wordSpacing, lineHeight: lineHeight, fontSize: fontSize, fontFamily: fontStyle, color: fontColor }}>
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

