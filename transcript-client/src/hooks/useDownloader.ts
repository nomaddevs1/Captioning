import { useState } from 'react';
import { useTranscription } from "src/context/TranscriptionContext";

interface Downloader {
  generatePDF: () => Promise<Blob>;
  isLoading: boolean;
}


const useDownloader = (): Downloader => {
    const { 
      transcriptionData, fontColor, fontSize,
      fontStyle, lineHeight, wordSpacing, 
      isBold, isItalic, isUnderline 
    } = useTranscription();
    //console.log('transcriptionData:', transcriptionData);
    const [isLoading, setIsLoading] = useState(false);
    // TODO: Add more settings, figure out bg_color

    const settings = {
        bg_color: '',
        font_color: fontColor || '',
        font_size: fontSize || '', 
        font: fontStyle || '',
        line_height: lineHeight.toString() || '',
        word_spacing: wordSpacing.toString()+'px' || '',
        font_weight: isBold ? 'bold': 'normal',
        font_style: isItalic ? 'italic': 'normal',
        text_decoration: isUnderline ? 'underline': 'none',
      };
    const generatePDF = async (): Promise<Blob> => {
    setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8000/generate-pdf/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            settings,
            transcript: transcriptionData,
            raw_html: '',
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