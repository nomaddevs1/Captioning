import { Button, Grid, GridItem } from "@chakra-ui/react";
import TranscriptionSideBar from "src/components/sidebar/TranscriptionSideBar";
import TranscriptionBarItem from "src/components/sidebar/transcriptionItem";
import { SelectInput } from "src/components/forms/SelectInput";
import { useTranscription } from "src/context/TranscriptionContext";
import { useAudioContext } from "src/context/AudioContext";
import DisplayTranscript from "src/components/DisplayTranscript";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  updateContextValue,
  fontSizeOptions,
  fontStyleOptions,
  lineHeightOptions,
  wordSpacingOptions,
} from "src/utils/transcriptionUtils";

import "react-color-palette/dist/css/rcp.css";
import ColorPickerComponent from "src/components/forms/ColorPickerInput";
import StyleSwitch from "src/components/forms/SwitchButtonIcon";

const TranscriptionPage = () => {
  const {
    setFontSize,
    setFontStyle,
    setLineHeight,
    setWordSpacing,
    setFontColor,
    setHighlightColor,
    setAudioFile,
    isBold, setIsBold, isItalic, setIsItalic, isUnderline, setIsUnderline
  } = useTranscription();

  const {
    audioFile,
    setAudioFile: setContextAudioFile,
    play,
    pause,
    isPlaying,
    currentTime,
  } = useAudioContext(); // Access audio file, playback functions, and playback position from context
  
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Retrieve the uploaded file from the route state
  const location = useLocation();
  const uploadedFile = (location.state as any)?.uploadedFile as File | undefined;

  // Handle the uploaded file, you may want to set it in the audio context or perform other actions
  useEffect(() => {
    // Handle the uploaded file, you may want to set it in the audio context or perform other actions
    if (uploadedFile && !audioFile) {
      setContextAudioFile(uploadedFile);
      // Additional processing if needed
    }
  }, [uploadedFile, audioFile, setContextAudioFile]);

  const handlePlayPause = () => {
    if (isAudioPlaying) {
      pause(); // Pause the audio playback
    } else {
      play(); // Start or resume the audio playback
    }
    setIsAudioPlaying(!isAudioPlaying);
  };
  // You can use updateContextValue for all setters
  return (
    <Grid templateAreas={`"side main"`} gridTemplateColumns={"352px 1fr"}>
      <GridItem
        bg="primary.bay.100"
        area={"side"}
        top="0"
        right="0"
        height={"100vh"}
        overflowY={"auto"}
      >
        <TranscriptionSideBar>
          <TranscriptionBarItem title={"Transcription Settings"}>
            <Button onClick={isPlaying ? pause : play}>
              {isPlaying ? "Pause Audio" : "Play Audio"}
            </Button>
            {/* @ts-ignore */}
            <SelectInput
              label="Font Size"
              //@ts-ignore
              onChange={(value) => updateContextValue(setFontSize, value)}
              options={fontSizeOptions}
            />
            {/* @ts-ignore */}
            <SelectInput
              label="Font Style"
              //@ts-ignore
              onChange={(value) => updateContextValue(setFontStyle, value)}
              options={fontStyleOptions}
            />
            <Grid templateColumns="47% 47%" gap="6%" >
              {/* @ts-ignore */}
              <SelectInput
                label="Line Height"
                //@ts-ignore
                onChange={(value) =>
                  updateContextValue(setLineHeight, parseFloat(value))
                }
                options={lineHeightOptions}
              />
              {/* @ts-ignore */}
              <SelectInput
                label="Word Spacing"
                //@ts-ignore
                onChange={(value) =>
                  updateContextValue(setWordSpacing, parseFloat(value))
                }
                options={wordSpacingOptions}
              />
            </Grid>
            <Grid templateColumns="30% 30% 30%" gap="4%" mb={2} mt={2}>
              <StyleSwitch
                label="Bold"
                isChecked={isBold}
                onChange={setIsBold}
              />
              <StyleSwitch
                label="Italic"
                isChecked={isItalic}
                onChange={setIsItalic}
              />
              <StyleSwitch
                label="Underline"
                isChecked={isUnderline}
                onChange={setIsUnderline}
              />
            </Grid>
            <ColorPickerComponent
              text="Transcript Font Color"
              onChange={(value) => {
                updateContextValue(setFontColor, value);
              }}
            />
            <ColorPickerComponent
              text="Highlight Text"
              onChange={(value) => {
                updateContextValue(setHighlightColor, value);
              }}
            />
          </TranscriptionBarItem>
        </TranscriptionSideBar>
      </GridItem>
      <GridItem area={"main"}>
        <DisplayTranscript />
      </GridItem>
    </Grid>
  );
};

export default TranscriptionPage;

