import { Dispatch, SetStateAction, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { MOCK_BACKEND } from "src/utils/environment";


const mockAudioFile = async(onFileUploaded: Dispatch<SetStateAction<File | null>>) => {
  try {
    const response = await fetch("/sonnet18_shakespeare_ik_128kb.mp3");
    if (!response.ok) {
      console.error("Error uploading audio file, status:", response.status);
      throw new Error("Error uploading audio file, status: " + response.status);
    }
    const blob = await response.blob();
    const file = new File([blob], "sonnet18_shakespeare_ik_128kb.mp3");
    onFileUploaded(file);
  } catch (err: any) {
    throw new Error("Error uploading audio file: " + err.toString());
  }
};


const useUploader = (onFileUploaded: (file: File | null) => void) => {
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
      if (MOCK_BACKEND) {
        // use Shakespeare sonnet audio if the backend is mocked
        mockAudioFile(onFileUploaded as any) // >:3
      }

      const file = acceptedFiles[0];
      onFileUploaded(file);
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".webm", ".mpeg"],
    },
  });

  return { getInputProps, getRootProps };
};

export default useUploader;
