import { useMemo } from "react";
import { stateToHTML } from "draft-js-export-html";
import { getExportOptions } from "src/utils/draftJsStylingUtils";
import { useTranscription } from "./useTranscription";
import { useEditor } from "src/context/EditorContext";

const useStyledHtmlExporter = (): string => {
  const { editorState } = useEditor();
  const {
    fontSize,
    fontStyle,
    wordSpacing,
    lineHeight,
    fontColor,
    allHighlightColors,
  } = useTranscription();

  // Convert Draft.js editor state to HTML and apply styles
  const styledHtml = useMemo(() => {
    const contentState = editorState.getCurrentContent();
    const exportOptions = getExportOptions(allHighlightColors);

    const rawHtml = stateToHTML(contentState, exportOptions);
    const additionalStyles = `
      font-size: ${fontSize}px; 
      font-family: '${fontStyle}'; 
      word-spacing: ${wordSpacing}px; 
      line-height: ${lineHeight}; 
      color: ${fontColor};`;

    const styledHtml = `
      <div style="${additionalStyles}">${rawHtml}</div>`;

    return styledHtml;
  }, [
    editorState,
    fontSize,
    fontStyle,
    wordSpacing,
    lineHeight,
    fontColor,
    allHighlightColors,
  ]);
  return styledHtml;
};

export default useStyledHtmlExporter;
