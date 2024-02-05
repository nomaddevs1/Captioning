import { useState } from 'react';
import { useTranscription } from "src/context/TranscriptionContext";
import useStyledHtmlExporter from 'src/hooks/useStyledHtmlExporter';

interface Downloader {
  generatePDF: () => Promise<Blob>;
  isLoading: boolean;
}

const useDownloader = (): Downloader => {
    // get the editor state and the styles from the context
    const { 
      editorState,
      highlightColor,
      fontColor, 
      fontSize,
      fontStyle, 
      lineHeight, 
      wordSpacing
    } = useTranscription();
    // use the useStyledHtmlExporter hook to get the styled html
    const styledHtml = useStyledHtmlExporter(editorState, {
      fontSize,
      fontStyle,
      wordSpacing,
      lineHeight,
      fontColor,
      highlightColor
    });
    // create a state to keep track of the loading state
    const [isLoading, setIsLoading] = useState(false);
    const generatePDF = async (): Promise<Blob> => {
    setIsLoading(true);
      try {
        // send the styled html to the server to generate the pdf
        // TODO: replace the URL with the correct server URL
        const response = await fetch('http://localhost:8000/generate-pdf/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            raw_html: styledHtml,
          }),
        });
  
  
      if (response.ok) {
        const blob = await response.blob();
        return blob;
      } else {
        console.error('Failed to generate PDF:', response.status, response.statusText);
        throw new Error('Failed to generate PDF');
      }
    } catch (error) {
      console.error('An error occurred while generating PDF:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  

  return { generatePDF, isLoading };
};

export default useDownloader;