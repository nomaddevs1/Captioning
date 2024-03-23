import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { TranscriptionData } from "src/types/transcriptionDataTypes";
import { AxiosPrivateClient } from "./axios";
import { MOCK_BACKEND } from "./environment";

async function realGenerateTranscript(
  audioFile: File,
  languageCode: string,
  setProgress: Dispatch<SetStateAction<number>>
): Promise<TranscriptionData> {
  const formData = new FormData();
  const axios = AxiosPrivateClient;
  formData.append("audio_file", audioFile);

  const { data } = await axios.post(
    `/transcribe/?language=${languageCode}&format=vtt`,
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

async function fakeGenerateTranscript(
  _audioFile: File,
  _languageCode: string,
  setProgress: Dispatch<SetStateAction<number>>
): Promise<TranscriptionData> {
  const onProgress = (evt: ProgressEvent<EventTarget>) => {
    if (evt.lengthComputable) {
      const percentConplete = (evt.loaded / evt.total) * 100;
      setProgress(percentConplete);
    } else {
      setProgress(100);
    }
  };

  const data = await new Promise<TranscriptionData>((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.onload = () => resolve(xhr.response);
    xhr.onerror = (err) => {
      toast.error("Could not fetch `mock_transcript.json`.");
      console.error(err);
    };
    xhr.onprogress = onProgress;
    xhr.open("GET", "/mock_transcript.json");
    xhr.send();
  });

  return data;
}

async function realGeneratePDF(
  styledHtml: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>
): Promise<Blob> {
  setIsLoading(true);

  const axios = AxiosPrivateClient;
  let blob: Blob | undefined;

  try {
    const response = await axios.post(
      "/generate-pdf/",
      {
        raw_html: styledHtml,
      },
      {
        responseType: "blob",
      }
    );

    if (response.status === 200) {
      blob = response.data;
    } else {
      console.error(
        "Failed to generate PDF:",
        response.status,
        response.statusText
      );
      throw new Error("Failed to generate PDF");
    }
  } catch (error) {
    toast.error("Error generating transcript, please try again later.");
    console.error("An error occurred while generating PDF:", error);
    throw error;
  } finally {
    setIsLoading(false);
  }

  return blob as Blob;
}

async function fakeGeneratePDF(
  _styledHtml: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) {
  setIsLoading(true);
  const result = await fetch("/mock_transcript.pdf");
  if (!result.ok) {
    toast.error("Could not fetch `mock_transcript.json`.");
  }

  const blob = await result.blob();
  setIsLoading(false);
  return blob;
}

export const generateTranscript = MOCK_BACKEND
  ? fakeGenerateTranscript
  : realGenerateTranscript;
export const generatePDF = MOCK_BACKEND
  ? fakeGeneratePDF 
  : realGeneratePDF;
