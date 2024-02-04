import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const useUploader = (onFileUploaded: (file: File | null) => void) => {
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = acceptedFiles[0];
    onFileUploaded(file);
  }, [onFileUploaded]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "audio/*": [".mp3", ".m4a", ".wav", ".mpga"],
      "video/*": [".mp4", ".webm", ".mpeg"],
    },
  });

  return { getInputProps, getRootProps };
};

export default useUploader;




