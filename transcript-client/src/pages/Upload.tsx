import {Center, Button} from "@chakra-ui/react";
import useAxios from 'src/hooks/useAxios';
import { useState } from 'react';
import useUploader from 'src/hooks/useUploader';
import  Progress  from 'src/components/Progress'
import UploadedFileInfo from "src/components/UploadedFileInfo";
import FileUploadArea from "src/components/FileUploadArea";
import { useTranscription } from "src/hooks/useTranscription";
import { useNavigate } from 'react-router-dom';

function Upload() {
  const [uploaded, setUploaded] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState(false)
  const [progress, setProgress] = useState(0)
  const { getInputProps, getRootProps } = useUploader(setUploaded);
  const axios = useAxios()
  const navigate = useNavigate();
  const { setTranscriptionData} = useTranscription()


  const passTranscript = async (e: React.SyntheticEvent) => {
  e.preventDefault();
  setIsLoading(true);
  if (uploaded) {
    const formData = new FormData();
    formData.append('audio_file', uploaded);

    try {
      const {data} = await axios.post('/transcribe/?language=en', formData, {
        onUploadProgress: (progressEvent) => {
          //@ts-ignore
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(prevProgress => Math.min(percentCompleted, 100)); // Update based on previous progress
        }
      });
      //@ts-ignore
      setTranscriptionData(data.transcript)
    } catch (err) {
      setIsLoading(false);
      //TODO: add toast error message
      console.error(err);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      setUploaded(null);
      navigate('/transcription');
    }
  }
}



  return (
    <Center textAlign="center" height="100vh">
      {isLoading ? <Progress value={progress} /> : 
      uploaded ? (
        <UploadedFileInfo file={uploaded}>
          <Button width="100%" onClick={passTranscript}>Transcribe</Button>
        </UploadedFileInfo>
      ) : (
        <FileUploadArea  getInputProps={getInputProps} getRootProps={getRootProps} />
      )}
    </Center>

  );
}

export default Upload;
