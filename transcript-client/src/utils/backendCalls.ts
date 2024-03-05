import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { TranscriptionData } from "src/types/transcriptionDataTypes";
import { AxiosPrivateClient } from "./axios";
import { mockBackend } from "./environment";

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

async function fakeGenerateTranscript(
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
    reader.readAsText(blob, "utf-8");
  });
  const data = JSON.parse(text);

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

export const generateTranscript = mockBackend()
  ? fakeGenerateTranscript
  : realGenerateTranscript;
export const generatePDF = mockBackend()
  ? fakeGeneratePDF
  : realGeneratePDF;
