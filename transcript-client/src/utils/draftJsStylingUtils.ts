// src/utils/draftJsStylingUtils.ts
//@ts-ignore
import {  EditorState, Modifier, RichUtils } from 'draft-js';


export const styleMap = (allHighlightColors: string[]) => {
const dynamicStyles = allHighlightColors.reduce((acc, color) => {
  const styleKey = `HIGHLIGHT_${color.replace('#', '')}`;
  //@ts-ignore
    acc[styleKey] = { backgroundColor: color };
    return acc;
  }, {});

  return {
    ...dynamicStyles,
    'BOLD': { fontWeight: 'bold' },
    'ITALIC': { fontStyle: 'italic' },
    'UNDERLINE': { textDecoration: 'underline' },
  };

}


  export const handleKeyCommand = (command: string, editorState: EditorState, setEditorState: (editorState: EditorState) => void) => {
    let newState;
    if (command === "bold") {
      newState = RichUtils.toggleInlineStyle(editorState, "BOLD");
    } else if (command === "italic") {
      newState = RichUtils.toggleInlineStyle(editorState, "ITALIC");
    } else if (command === "underline") {
      newState = RichUtils.toggleInlineStyle(editorState, "UNDERLINE");
    }

    if (newState) {
      setEditorState(newState);
      return "handled";
    }

    return "not-handled";
  };
