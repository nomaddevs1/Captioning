import { useState } from "react";

const useUploadASS = () => {
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadASS = async (file: File) => {
    const formData = new FormData();
    formData.append("assFile", file);

    try {
      const response = await fetch("/api/upload-ass", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload ASS file");
      }

      // Handle successful upload
      console.log("ASS file uploaded successfully");
    } catch (error: any) { // Explicitly type error as any Error object
      if (error instanceof Error) { // Check if error is an instance of Error
        setUploadError(error.message);
      } else {
        setUploadError("An unknown error occurred");
      }
    }
  };

  return { uploadASS, uploadError };
};

export default useUploadASS;
