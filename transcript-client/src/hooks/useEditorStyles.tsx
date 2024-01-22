import { useEffect } from 'react';
import { Modifier, EditorState } from 'draft-js';

interface UseApplyEditorStylesProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  isDataLoaded: boolean;
  fontSize: string;
  fontStyle: string;
}

const useApplyEditorStyles = ({
  editorState,
  setEditorState,
  isDataLoaded,
  fontSize,
  fontStyle,
}: UseApplyEditorStylesProps): void => {
  useEffect(() => {
    if (!isDataLoaded) return;

    let newContentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    // Apply font size style
    if (fontSize) {
      newContentState = Modifier.applyInlineStyle(
        newContentState,
        selection,
        'CUSTOM_FONT_SIZE'
      );
    }

    // Apply font style
    if (fontStyle) {
      newContentState = Modifier.applyInlineStyle(
        newContentState,
        selection,
        'CUSTOM_FONT_STYLE'
      );
    }

    // Only update the editor state if there are changes
    if (newContentState !== editorState.getCurrentContent()) {
      const newEditorState = EditorState.push(editorState, newContentState, 'change-inline-style');
      setEditorState(newEditorState);
    }
  }, [fontSize, fontStyle, isDataLoaded, setEditorState]);
};

export default useApplyEditorStyles;

