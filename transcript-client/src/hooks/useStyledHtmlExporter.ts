import { useMemo } from 'react';
//@ts-ignore
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { getExportOptions } from 'src/utils/draftJsStylingUtils';

interface StyledHtmlExporterConfig {
  fontSize: number | string;
  fontStyle: string;
  wordSpacing: number | string;
  lineHeight: number | string;
  fontColor: string;
  allHighlightColors: string[];
}

const useStyledHtmlExporter = (
  editorState: EditorState,
  { fontSize, fontStyle, wordSpacing, lineHeight, fontColor, allHighlightColors }: StyledHtmlExporterConfig
): string => {
  // Convert Draft.js editor state to HTML and apply styles
   const highlightStyles = allHighlightColors.map(color => {
      const className = `highlight-${color.replace('#', '')}`;
      return `.${className} { background-color: ${color}; }`;
    }).join(' ');
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
    
    return  styledHtml;
  }, [editorState, fontSize, fontStyle, wordSpacing, lineHeight, fontColor, allHighlightColors]);
  return styledHtml;
};

export default useStyledHtmlExporter;
