import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { TranscriptionData } from "src/types/transcriptionDataTypes";
import { AxiosPrivateClient } from "./axios";

async function realGenerateTranscript(
  audioFile: File,
  languageCode: string,
  setProgress: Dispatch<SetStateAction<number>>
): Promise<TranscriptionData> {
  const formData = new FormData();
  const axios = AxiosPrivateClient;
  formData.append("audio_file", audioFile);

  const { data } = await axios.post(
    `/transcribe/?language=${languageCode}`,
    formData,
    {
      onUploadProgress: (progressEvent) => {
        const loaded = progressEvent.loaded || 0;
        const total = progressEvent.total || 1;

        const percentCompleted = Math.round((loaded * 100) / total);
        setProgress(Math.min(percentCompleted, 100)); // Update based on previous progress
      },
    }
  );

  return data;
}

async function mockGenerateTranscript(
  _audioFile: File,
  _languageCode: string,
  _setProgress: Dispatch<SetStateAction<number>>
): Promise<TranscriptionData> {
  const result = await fetch("/mock_transcript.json");
  if (!result.ok) {
    toast.error("Could not fetch `mock_transcript.json`.");
  }
  const blob = await result.blob();
  const text = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsText(blob, "utf-8")
  });

  console.log(text)
  const data = JSON.parse(text)

  return data;
}

export const generateTranscript = (() => {
  if (process.env.REACT_APP_MOCK_BACKEND === "true") {
    return mockGenerateTranscript;
  } else {
    return realGenerateTranscript;
  }
})();
