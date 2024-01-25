// src/utils/draftJsStylingUtils.ts
import {  EditorState, Modifier } from 'draft-js';

export const applyInlineStyle = (
  editorState: EditorState,
  style: string
): EditorState => {
  const selection = editorState.getSelection();
  if (selection.isCollapsed()) {
    return editorState;
  }
  
  const contentState = editorState.getCurrentContent();
  const contentStateWithStyle = Modifier.applyInlineStyle(contentState, selection, style);
  return EditorState.push(editorState, contentStateWithStyle, 'change-inline-style');
};

// Add more utility functions here as needed

