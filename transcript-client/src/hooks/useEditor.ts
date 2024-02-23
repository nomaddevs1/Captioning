import { useEffect } from "react";
import { convertFromRaw, EditorState, Modifier } from "draft-js";
import { useEditor } from "src/context/EditorContext";
import { styleMap } from "src/utils/draftJsStylingUtils";

interface UseEditorHookProps {
  setInitialContentState: (content: EditorState) => void;
  transcriptionData: any; // Assuming transcriptionData matches RawDraftContentState structure
  isBold: boolean;
  setIsBold: (isBold: boolean) => void;
  isItalic: boolean;
  setIsItalic: (isItalic: boolean) => void;
  isUnderline: boolean;
  setIsUnderline: (isUnderline: boolean) => void;
  allHighlightColors: string[];
  setCurrentStyleMap: (styles: any) => void
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
  allHighlightColors,
  setCurrentStyleMap
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
  }, [transcriptionData, editorState, setEditorState, setInitialContentState]);

  useEffect(() => {
    const newCustomStyleMap = styleMap(allHighlightColors); // Function to generate dynamic style map
    setCurrentStyleMap(newCustomStyleMap);
  }, [allHighlightColors, setCurrentStyleMap]);

  const editorStateHasContent =(editorState: EditorState): boolean => {
    return editorState.getCurrentContent().hasText();
  }

      useEffect(() => {
    const selection = editorState.getSelection();

        if (!selection.isCollapsed()) {
          let newContentState = editorState.getCurrentContent();
          const styles = { BOLD: isBold, ITALIC: isItalic, UNDERLINE: isUnderline };
          Object.keys(styles).forEach((style) => {
            //@ts-ignore
            newContentState = styles[style]
              ? Modifier.applyInlineStyle(newContentState, selection, style)
              : Modifier.removeInlineStyle(newContentState, selection, style);
          });
        
          if (newContentState !== editorState.getCurrentContent()) {
            const newEditorState = EditorState.push(
              editorState,
              newContentState,
              "change-inline-style"
            );
            setEditorState(EditorState.forceSelection(newEditorState, selection));
          }
        }
  }, [isBold, isItalic, isUnderline, editorState, setEditorState])


  useEffect(() => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      let newContentState = editorState.getCurrentContent();
       const currentStyle = editorState.getCurrentInlineStyle();

       allHighlightColors.forEach(color => {
        const styleKey = `HIGHLIGHT_${color.replace('#', '')}`;
        if (!currentStyle.has(styleKey)) {
          newContentState = Modifier.applyInlineStyle(newContentState, selection, styleKey);
        }
         
      });
      if (newContentState !== editorState.getCurrentContent()) {
        const newEditorState = EditorState.push(
          editorState,
          newContentState,
          "change-inline-style"
        );
        setEditorState(EditorState.forceSelection(newEditorState, selection));
      }
    }
  }, [allHighlightColors, editorState, setEditorState]);

  // Update the state of the style toggles based on the current selection
  useEffect(() => {
    const currentStyle = editorState.getCurrentInlineStyle();
    setIsBold(currentStyle.has("BOLD"));
    setIsItalic(currentStyle.has("ITALIC"));
    setIsUnderline(currentStyle.has("UNDERLINE"));
  }, [editorState, setIsBold, setIsItalic, setIsUnderline]);
}


export default useEditorHook;
