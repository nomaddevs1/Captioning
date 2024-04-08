import { useEffect, useRef, useState } from "react";
import { useTranscription } from "src/context/TranscriptionContext";
import useProcessVTT from "src/hooks/useProcessVtt";

const VideoInteractiveView = () => {
  const {
    fontSize,
    fontStyle,
    fontColor,
    videoHighlightColors,
    transcriptionVTT,
    videoFile,
    isBold,
    isItalic,
    isUnderline,
    line,
    position,
  } = useTranscription();
  const { processVTTString, processedVTT } = useProcessVTT({
    fontSize,
    fontStyle,
    fontColor,
  });
  const videoRef = useRef<any>(null);
  const [vttUrl, setVttUrl] = useState<string | null>(null);
  useEffect(() => {
    processVTTString(transcriptionVTT!);
  }, [transcriptionVTT, processVTTString]);

  useEffect(() => {
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = `
    ::cue {
      color: ${fontColor};
      font-size: ${fontSize};
      font-family: ${fontStyle}
    }
    ::cue(.background){
      background-color: ${videoHighlightColors};
    }
    ::cue(.bold) {
      font-weight: ${isBold ? 'bold' : 'normal'};
    }
    ::cue(.underline) {
      text-decoration: ${isUnderline ? 'underline' : 'none'};
    }
    ::cue(.italic) {
      font-style: ${isItalic ? 'italic' : 'normal'};
    }
  `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [fontSize, fontStyle, fontColor, videoHighlightColors, isBold, isItalic, isUnderline]);

  useEffect(() => {
    if (processedVTT) {
      // Convert processed VTT string to a Blob URL for the <track> src
      const blob = new Blob([processedVTT], { type: "text/vtt" });
      const url = URL.createObjectURL(blob);
      setVttUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [processedVTT]);

  useEffect(() => {
    if (videoRef.current && vttUrl) {
      const trackElement = document.createElement("track");
      trackElement.kind = "captions";
      trackElement.src = vttUrl;
      trackElement.default = true;
      trackElement.style.width = "auto";
      //@ts-ignore
      videoRef.current.appendChild(trackElement);

      //@ts-ignore
      videoRef.current.textTracks[0].mode = "showing"; // This might help in forcing the captions to display
      return () => {
        //@ts-ignore
        videoRef.current.removeChild(trackElement);
      };
    }
  }, [vttUrl]);

  useEffect(() => {
    if (videoRef.current && videoRef.current.textTracks[0]){
      let track = videoRef.current.textTracks[0];
      track.oncuechange = () => {
        if (track.activeCues[0]) {
          let active_cue = track.activeCues[0];
          active_cue.line = line;
          active_cue.position = position;
          active_cue.text = `<c.background.bold.underline.italic>${active_cue.text}</c>`;
        }
      }
    }
  }, [videoRef.current, vttUrl, line, position])

  return (
    <div>
      {videoFile && (
        <video controls ref={videoRef} style={{ width: "100%" }}>
          <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
          {/* {vttUrl && <track default kind="subtitles" src={vttUrl} label="English" />} */}
        </video>
      )}
    </div>
  );
};

export default VideoInteractiveView;
