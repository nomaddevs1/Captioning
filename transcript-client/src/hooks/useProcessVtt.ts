import { useState, useCallback } from 'react';
import { TranscriptionData } from 'src/types/transcriptionDataTypes';

function useProcessVTT({fontSize, fontStyle, fontColor}:{fontSize: string, fontStyle: string, fontColor: string}) {

  const [processedVTT, setProcessedVTT] = useState('');

  const processVTTString = useCallback((vttString: TranscriptionData) => {
    // Example of processing: Adding custom notes/comments with styles that your backend can interpret
    let newVttString = ``;
    newVttString += vttString;
    setProcessedVTT(newVttString);
    // Further processing can be done here as needed
  }, [fontSize, fontStyle, fontColor]);

  
  return { processVTTString, processedVTT };
}

export default useProcessVTT