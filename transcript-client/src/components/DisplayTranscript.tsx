import { useEffect, useState, useRef } from 'react';
import { Editor, EditorState, RichUtils, Modifier, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Box } from "@chakra-ui/react";
import { useTranscription } from 'src/context/TranscriptionContext';

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
    <Box height="100%" style={{ wordSpacing, lineHeight, fontSize, fontFamily: fontStyle, color: fontColor }}>
      <Box pt={10} pl={20} pr={20} height="85vh" pos="relative">
        <Box overflowY="auto" height="100%" bg="primary.moss.100" p={6} textAlign="left">
          <Editor
            ref={editorRef}
            customStyleMap={styleMap}
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
