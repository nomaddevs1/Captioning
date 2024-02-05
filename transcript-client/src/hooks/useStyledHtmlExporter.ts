import { useMemo } from 'react';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

interface StyledHtmlExporterConfig {
  fontSize: number | string;
  fontStyle: string;
  wordSpacing: number | string;
  lineHeight: number | string;
  fontColor: string;
  highlightColor: string;
}

const useStyledHtmlExporter = (
  editorState: EditorState,
  { fontSize, fontStyle, wordSpacing, lineHeight, fontColor, highlightColor }: StyledHtmlExporterConfig
): string => {
  // Convert Draft.js editor state to HTML and apply styles
  const styledHtml = useMemo(() => {
    const contentState = editorState.getCurrentContent();
    const rawHtml = stateToHTML(contentState);
    const additionalStyles = `
      font-size: ${fontSize}px; 
      font-family: '${fontStyle}'; 
      word-spacing: ${wordSpacing}px; 
      line-height: ${lineHeight}; 
      color: ${fontColor};`;

    return `<div style="${additionalStyles}">${rawHtml}</div>`;
  }, [editorState, fontSize, fontStyle, wordSpacing, lineHeight, fontColor, highlightColor]);
  return styledHtml;
};

export default useStyledHtmlExporter;
