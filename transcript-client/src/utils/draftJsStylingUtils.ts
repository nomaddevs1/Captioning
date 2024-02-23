// src/utils/draftJsStylingUtils.ts
//@ts-ignore
import {  EditorState, RichUtils } from 'draft-js';


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

//@ts-ignore
export const getExportOptions = (allHighlightColors) => {
  //@ts-ignore
  const inlineStyleOptions = allHighlightColors.reduce((styles, color) => {
    const styleKey = `HIGHLIGHT_${color.replace('#', '')}`;
    styles[styleKey] = { style: { backgroundColor: color } };
    return styles;
  }, {});

  // Add standard styles
  inlineStyleOptions['BOLD'] = { style: { fontWeight: 'bold' } };
  inlineStyleOptions['ITALIC'] = { style: { fontStyle: 'italic' } };
  inlineStyleOptions['UNDERLINE'] = { style: { textDecoration: 'underline' } };

  return {
    inlineStyles: inlineStyleOptions
  };
};



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
