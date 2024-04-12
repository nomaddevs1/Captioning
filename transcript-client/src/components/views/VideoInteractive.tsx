import { useEffect, useRef, useState } from "react";
import { useTranscription } from "src/context/TranscriptionContext";
import useProcessVTT from "src/hooks/useProcessVtt";
import { videoTutorials } from "src/utils/videoTutorials";
import { useTutorialContext } from 'src/context/TutorialContext';

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
    textShadow,
    textStroke,
  } = useTranscription();
  const { processVTTString, processedVTT } = useProcessVTT({
    fontSize,
    fontStyle,
    fontColor,
  });
  const videoRef = useRef<any>(null);
  const [vttUrl, setVttUrl] = useState<string | null>(null);
  const [activeCue, setActiveCue] = useState<any>(null);

  const { updateTutorialList } = useTutorialContext();
  useEffect(() => {
    updateTutorialList(videoTutorials);
  }, [updateTutorialList]);

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
      font-family: ${fontStyle};
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
    ::cue(.shadow) {
      text-shadow: ${textShadow};
    }
    ::cue(.stroke) {
      text-shadow: 
        -1px -1px 0 ${textStroke},
        0 -1px 0 ${textStroke},
        1px -1px 0 ${textStroke},
        1px 0 0 ${textStroke},
        1px 1px 0 ${textStroke},
        0 1px 0 ${textStroke},
        -1px 1px 0 ${textStroke},
        -1px 0 0 ${textStroke};
    }
  `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [fontSize, fontStyle, fontColor, videoHighlightColors, isBold, isItalic, isUnderline, textShadow, textStroke]);

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
    if (videoRef.current && videoRef.current.textTracks[0]) {
      const track = videoRef.current.textTracks[0];
      const newCue = () => {
        setActiveCue(track.activeCues[0]);
      };
  
      track.oncuechange = newCue;
  
      return () => {
        track.oncuechange = null;
      };
    }
  }, [videoRef.current, vttUrl]); 

  useEffect(() => {
    if (videoRef.current && videoRef.current.textTracks[0]) {
      const track = videoRef.current.textTracks[0];
      if (track.activeCues[0]) {
        let active_cue = track.activeCues[0];
        active_cue.line = line;
        active_cue.size = 40;
        active_cue.position = position;
        active_cue.text = `<c.background.bold.underline.italic.shadow.stroke>${active_cue.text}</c>`;
      }
    }
  }, [line, position, activeCue]);

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
