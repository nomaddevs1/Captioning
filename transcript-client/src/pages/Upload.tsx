import {Center, Button} from "@chakra-ui/react";
import useAxios from 'src/hooks/useAxios';
import { useState } from 'react';
import useUploader from 'src/hooks/useUploader';
import  Progress  from 'src/components/Progress'
import UploadedFileInfo from "src/components/UploadedFileInfo";
import FileUploadArea from "src/components/FileUploadArea";
import { useTranscription } from "src/hooks/useTranscription";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const tutorial_list = [
  {
    position: {pos: "fixed", top: "100px", right: "4"},
    text: "Upload an audio file in a variety of formats (mp3, mp4, mpeg, mpga, mp4a, wav, webm). Once uploaded, select the transcript language from the dropdown menu and click 'Transcribe'."
  },
]

function Upload({updateTutorialList}: any) {
  const [uploaded, setUploaded] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState(false)
  const [progress, setProgress] = useState(0)
  const { getInputProps, getRootProps } = useUploader(setUploaded);
  const axios = useAxios()
  const navigate = useNavigate();
  const { setTranscriptionData} = useTranscription()
  const [languageCode, setLanguageCode] = useState("en")

  updateTutorialList(tutorial_list);

  const passTranscript = async (e: React.SyntheticEvent) => {
  e.preventDefault();
  setIsLoading(true);
  if (uploaded) {
    const formData = new FormData();
    formData.append('audio_file', uploaded);

    try {
      // add file format and size checks before making request
      const allowedFormats = ['.mp3', '.wav', '.m4a', '.mpga', '.mp4', '.webm', '.mpeg'];
      const maxFileSize = 300; // max file size in MB

      if (!allowedFormats.some(format => uploaded.name.toLowerCase().endsWith(format))) {
        toast.error('File format not supported');
        return;
      } // file size too large error
      else if (uploaded.size > maxFileSize * 1000000) {
        toast.error('File size is too large. Please upload file smaller than 300 MB.');
        return;
      }
      const {data} = await axios.post(`/transcribe/?language=${languageCode}`, formData, {
        onUploadProgress: (progressEvent) => {
          //@ts-ignorex
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(prevProgress => Math.min(percentCompleted, 100)); // Update based on previous progress
          toast.success('File successfully uploaded');
        }
      });
      //@ts-ignore
      setTranscriptionData(data.transcript)
    } catch (err) {
      setIsLoading(false);
      toast.error('Error uploading file. Please ensure file is an acceptable format.')
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
    <Center textAlign="center" height="100%">
      {isLoading ? <Progress value={progress} /> : 
      uploaded ? (
        <UploadedFileInfo file={uploaded} onChange={(value) =>setLanguageCode(value)}>
          <Button width="100%" onClick={passTranscript}>Transcribe</Button>
        </UploadedFileInfo>
      ) : (
        <FileUploadArea  getInputProps={getInputProps} getRootProps={getRootProps} />
      )}
    </Center>

  );
}

export default Upload;
