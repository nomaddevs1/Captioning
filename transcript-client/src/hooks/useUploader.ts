import { useCallback } from "react";
import { useDropzone } from "react-dropzone";


const useUploader = (setUploaded:  React.Dispatch<React.SetStateAction<File | null>>) => {
    const onDrop = useCallback((acceptedFiles: Array<File>) => {
        console.log(acceptedFiles)
        setUploaded(acceptedFiles[0]);
    }, [setUploaded]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "audio/*": [".mp3", ".m4a", ".wav", ".mpga"],
            "video/*": [".mp4", ".webm", ".mpeg"],
        },
    })

    return { getInputProps, getRootProps }
}


export default useUploader
