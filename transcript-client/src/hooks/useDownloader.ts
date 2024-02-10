import { useState } from "react";
import { useTranscription } from "src/context/TranscriptionContext";
import { useEditor } from "src/context/EditorContext";
import useStyledHtmlExporter from "src/hooks/useStyledHtmlExporter";
import axios from "axios";
import useAxios from "./useAxios";

interface Downloader {
  generatePDF: () => Promise<Blob>;
  isLoading: boolean;
}

const useDownloader = (): Downloader => {
  const {
    highlightColor,
    fontColor,
    fontSize,
    fontStyle,
    lineHeight,
    wordSpacing,
  } = useTranscription();
  const { editorState } = useEditor();
  const styledHtml = useStyledHtmlExporter(editorState, {
    fontSize,
    fontStyle,
    wordSpacing,
    lineHeight,
    fontColor,
    highlightColor,
  });
  // create a state to keep track of the loading state
  const [isLoading, setIsLoading] = useState(false);
  const axios = useAxios();
  const generatePDF = async (): Promise<Blob> => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/generate-pdf/",
        {
          raw_html: styledHtml,
        },
        {
          responseType: "blob", // This tells Axios to expect a blob response
        }
      );

      if (response.status >= 200 && response.status < 300) {
        // The response is a Blob if the request succeeds
        console.log(response);
        return response.data; // `response.data` is a Blob representing the PDF
      } else {
        console.error(
          "Failed to generate PDF:",
          response.status,
          response.statusText
        );
        throw new Error("Failed to generate PDF");
      }
    } catch (error) {
      console.error("An error occurred while generating PDF:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { generatePDF, isLoading };
};

export default useDownloader;
