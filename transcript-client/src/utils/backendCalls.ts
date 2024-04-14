import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { TranscriptionData } from "src/types/transcriptionDataTypes";
import { AxiosPrivateClient } from "./axios";
import { MOCK_BACKEND } from "./environment";

async function realGenerateTranscript(
  audioFile: File,
  languageCode: string,
  video: boolean,
  setProgress: Dispatch<SetStateAction<number>>
): Promise<TranscriptionData> {
  const formData = new FormData();
  const axios = AxiosPrivateClient;
  formData.append("audio_file", audioFile);
  const route = video ?`/transcribe/?language=${languageCode}&format=vtt`: `/transcribe/?language=${languageCode}`
  const { data } = await axios.post(
    route,
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

async function realGenerateVideoWithCaptions(
  videoFile: File,
  assFile: File,
  setIsLoading: Dispatch<SetStateAction<boolean>>
): Promise<Blob> {
  setIsLoading(true);

  const formData = new FormData();
  formData.append("videoFile", videoFile); // Corrected key name
  formData.append("assFile", assFile); // Corrected key name

  const axios = AxiosPrivateClient;
  let blob: Blob | undefined;

  try {
    console.log("Sending request to process video with captions...");
    const response = await axios.post(
      "/process-video-with-captions/",
      formData,
      {
        responseType: "blob",
      }
    );

    if (response.status === 200) {
      console.log("Video with captions processed successfully.");
      blob = response.data;
    } else {
      console.error(
        "Failed to generate video with captions:",
        response.status,
        response.statusText
      );
      throw new Error("Failed to generate video with captions");
    }
  } catch (error) {
    toast.error("Error generating video with captions, please try again later.");
    console.error("An error occurred while generating video with captions:", error);
    throw error;
  } finally {
    setIsLoading(false);
    console.log("Request to process video with captions completed.");
  }

  return blob as Blob;
}


async function fakeGenerateVideoWithCaptions(
  _videoFile: File,
  _assFile: File,
  setIsLoading: Dispatch<SetStateAction<boolean>>
): Promise<Blob> {
  setIsLoading(true);

  // Simulate a delay to mimic server processing
  await new Promise(resolve => setTimeout(resolve, 2000));

  const mockVideoBlob = new Blob(["Mock video content"], { type: "video/mp4" });
  setIsLoading(false);
  return mockVideoBlob;
}

async function fakeGenerateTranscript(
  _audioFile: File,
  _languageCode: string,
  isVideo: boolean,
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
export const generateVideoWithCaptions = MOCK_BACKEND
  ? fakeGenerateVideoWithCaptions
  : realGenerateVideoWithCaptions;