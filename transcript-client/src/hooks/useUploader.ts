import { Dispatch, SetStateAction, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { mockBackend } from "src/utils/environment";

const mockAudioFile = (onFileUploaded: Dispatch<SetStateAction<File | null>>) => {
  const handleErr = (err: any) => console.error(err);
  const onFulfilled = (response: Response) => {
    response
      .blob()
      .then((blob) => {
        onFileUploaded(new File([blob], "sonnet18_shakespeare_ik_128kb.mp3"));
      })
      .catch(handleErr);
  };
  fetch("/sonnet18_shakespeare_ik_128kb.mp3")
    .then(onFulfilled)
    .catch(handleErr);
};

const useUploader = (onFileUploaded: (file: File | null) => void) => {
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
      if (mockBackend()) {
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
      "audio/*": [".mp3", ".m4a", ".wav", ".mpga"],
      "video/*": [".mp4", ".webm", ".mpeg"],
    },
  });

  return { getInputProps, getRootProps };
};

export default useUploader;
