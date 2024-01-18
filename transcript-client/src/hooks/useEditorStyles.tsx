import { useEffect } from 'react';
import { EditorState, Modifier } from 'draft-js';

const useEditorStyles = (editorState, setEditorState, isDataLoaded, styles) => {
  useEffect(() => {
    if (!isDataLoaded) return;

    let newContentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    Object.entries(styles).forEach(([styleType, styleValue]) => {
      if (styleValue) {
        newContentState = Modifier.applyInlineStyle(newContentState, selection, `CUSTOM_${styleType.toUpperCase()}`);
      }
    });

    if (newContentState !== editorState.getCurrentContent()) {
      const newEditorState = EditorState.push(editorState, newContentState, 'change-inline-style');
      setEditorState(EditorState.forceSelection(newEditorState, selection));
    }
  }, [editorState,styles, isDataLoaded]);
};

export default useEditorStyles;
