import { useEffect, useState } from "react";
import { useTranscription } from "src/context/TranscriptionContext";
import useProcessVTT from "src/hooks/useProcessVtt";

const useGenerateASS = () => {
  const {
    fontSize,
    fontStyle,
    fontColor,
    transcriptionVTT,
    isBold,
    isItalic,
    isUnderline,
    position,
  } = useTranscription();
  const { processVTTString, processedVTT } = useProcessVTT({
    fontSize,
    fontStyle,
    fontColor,
  });
  const [assFile, setAssFile] = useState<File | null>(null);
  const lineHeight = 1.5; // Adjust as needed
  const line = -8; // Adjust as needed

  useEffect(() => {
    processVTTString(transcriptionVTT!);
  }, [transcriptionVTT, processVTTString]);

  useEffect(() => {
    if (processedVTT) {
      // Create ASS content
      const assStyles = `[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,${fontStyle},${fontSize},${fontColor},${isBold ? "-1" : "0"},${isItalic ? "-1" : "0"},${isUnderline ? "-1" : "0"},0,100,100,0,0,1,2,0,2,10,10,10,1
`;

      const assLines = processedVTT
        .split("\n")
        .map(line => line.trim())
        .filter(line => line !== "")
        .map((line, index) => `Dialogue: 0,0:00:00.00,0:00:05.00,Default,,0,0,0,,${position},${position + (lineHeight * index)},,${line}\n`)
        .join("");

      const assContent = `Dialogue: 0,0:00:00.00,0:00:05.00,Default,,0,0,0,,${position},${position},,${line}\n${assLines}`;

      // Convert ASS content to a Blob
      const blob = new Blob([assStyles + assContent], { type: "text/plain" });
      
      // Create a File object from the Blob
      const assFile = new File([blob], "captions.ass", { type: "text/plain" });

      // Set the File object
      setAssFile(assFile);
    }
  }, [processedVTT, fontSize, fontStyle, fontColor, isBold, isItalic, isUnderline, position]);

  return assFile;
};

export default useGenerateASS;
