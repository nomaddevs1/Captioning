import { useEffect, useState } from "react";
import { useTranscription } from "src/context/TranscriptionContext";
import useProcessVTT from "src/hooks/useProcessVtt";

function convertToASSColor(hexColor) {
    // Remove the '#' symbol if present
    hexColor = hexColor.replace("#", "");

    // Split the hex color into red, green, and blue components
    let red = hexColor.substr(0, 2);
    let green = hexColor.substr(2, 2);
    let blue = hexColor.substr(4, 2);

    // Convert hex color to BGR format
    let bgrColor = blue + green + red;

    // Return the BGR color in ASS format
    return `&H${bgrColor}`;
}
  
const useGenerateASS = () => {
  const {
    fontSize,
    fontStyle,
    fontColor,
    transcriptionVTT,
    isBold,
    isItalic,
    isUnderline
  } = useTranscription();
  const { processVTTString, processedVTT } = useProcessVTT({
    fontSize,
    fontStyle,
    fontColor: convertToASSColor(fontColor),
  });
  const [assFile, setAssFile] = useState<File | null>(null);
  const asscolor = convertToASSColor(fontColor);
  useEffect(() => {
    processVTTString(transcriptionVTT!);
  }, [transcriptionVTT, processVTTString]);

  useEffect(() => {
    if (processedVTT) {
      // Split the processed VTT content into individual subtitle entries
      const subtitles = processedVTT.split("\n\n").map(entry => entry.trim());

      // Create ASS content
      const assStyles = `[Script Info]
Script generated by FFmpeg
ScriptType: v4.00+
ScaledBorderAndShadow: yes
Collisions: Reverse

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,${fontStyle},${fontSize},${asscolor},${isBold ? "-1" : "0"},${isItalic ? "-1" : "0"},${isUnderline ? "-1" : "0"},0,100,100,0,0,1,2,0,2,0,0,0,1
\n[Events]`;

      const assLines = subtitles.map((subtitle, index) => {
        // Extract the timestamp and text from each subtitle entry
        const [timestampLine, ...textLines] = subtitle.split("\n");
        const [start, end] = timestampLine.split(" --> ");
        const text = textLines.join("\\N"); // Join text lines with newline characters
        // Create ASS dialogue line for each subtitle
        return `Dialogue: 0,${start}, ${end},Default,{\\pos({x},{y})}Default,,0,0,${text}`;
      }).join("\n");
      // Combine styles and dialogue lines to form the complete ASS content
      const assContent = `${assStyles}\n${assLines}`;

      // Convert ASS content to a Blob
      const blob = new Blob([assContent], { type: "text/plain" });
      
      // Create a File object from the Blob
      const assFile = new File([blob], "captions.ass", { type: "text/plain" });

      // Set the File object
      setAssFile(assFile);
    }
  }, [processedVTT, fontSize, fontStyle, fontColor, isBold, isItalic, isUnderline]);

  return assFile;
};

export default useGenerateASS;