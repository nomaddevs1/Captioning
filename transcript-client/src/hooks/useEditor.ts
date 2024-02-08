import { useEffect, useState } from "react";
//@ts-ignore
import { convertFromRaw, EditorState, Modifier } from "draft-js";
import { useEditor } from "src/context/EditorContext";

interface UseEditorHookProps {
  setInitialContentState: (content: EditorState) => void;
  transcriptionData: any; // Assuming transcriptionData matches RawDraftContentState structure
  isBold: boolean;
  setIsBold: (isBold: boolean) => void;
  isItalic: boolean;
  setIsItalic: (isItalic: boolean) => void;
  isUnderline: boolean;
  setIsUnderline: (isUnderline: boolean) => void;
  highlightColor: string;
}

function useEditorHook({
  setInitialContentState,
  transcriptionData,
  isBold,
  setIsBold,
  isItalic,
  setIsItalic,
  isUnderline,
  setIsUnderline,
  highlightColor,
}: UseEditorHookProps) {

  const { editorState, setEditorState } = useEditor();

  useEffect(() => {
    if (transcriptionData && !editorStateHasContent(editorState)) {
      const contentState = convertFromRaw({
        blocks: transcriptionData,
        entityMap: {},
      });
      const initialEditorState = EditorState.createWithContent(contentState);
      setEditorState(EditorState.createWithContent(contentState));
      setInitialContentState(initialEditorState);
    
    }
  }, [transcriptionData]);


  const editorStateHasContent =(editorState: EditorState): boolean => {
    return editorState.getCurrentContent().hasText();
  }

  // Apply styles to selected text and update state based on current selection
  useEffect(() => {
    const selection = editorState.getSelection();

    if (!selection.isCollapsed()) {
      let newContentState = editorState.getCurrentContent();

      // Apply or remove styles based on the toggle state
      const styles = { BOLD: isBold, ITALIC: isItalic, UNDERLINE: isUnderline };
      Object.keys(styles).forEach((style) => {
        //@ts-ignore
        newContentState = styles[style]
          ? Modifier.applyInlineStyle(newContentState, selection, style)
          : Modifier.removeInlineStyle(newContentState, selection, style);
      });

      newContentState = highlightColor
        ? Modifier.applyInlineStyle(
            newContentState,
            selection,
            "CUSTOM_HIGHLIGHT_COLOR"
          )
        : Modifier.removeInlineStyle(
            newContentState,
            selection,
            "CUSTOM_HIGHLIGHT_COLOR"
          );
      if (newContentState !== editorState.getCurrentContent()) {
        const newEditorState = EditorState.push(
          editorState,
          newContentState,
          "change-inline-style"
        );
        setEditorState(EditorState.forceSelection(newEditorState, selection));
      }
    }
  }, [isBold, isItalic, isUnderline, highlightColor]);

  // Update the state of the style toggles based on the current selection
  useEffect(() => {
    const currentStyle = editorState.getCurrentInlineStyle();
    setIsBold(currentStyle.has("BOLD"));
    setIsItalic(currentStyle.has("ITALIC"));
    setIsUnderline(currentStyle.has("UNDERLINE"));
  }, [editorState, setIsBold, setIsItalic, setIsUnderline]);
}

export default useEditorHook;
