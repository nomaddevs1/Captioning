import { Grid, GridItem } from "@chakra-ui/react";
import TranscriptionSideBar from "src/components/sidebar/TranscriptionSideBar";
import TranscriptionBarItem from "src/components/sidebar/transcriptionItem";
import { SelectInput } from "src/components/forms/SelectInput";
import { useTranscription } from "src/context/TranscriptionContext";
import DisplayTranscript from "src/components/DisplayTranscript";
import {
  updateContextValue,
  fontSizeOptions,
  fontStyleOptions,
  lineHeightOptions,
  wordSpacingOptions,
} from "src/utils/transcriptionUtils";

import "react-color-palette/dist/css/rcp.css";
import ColorPickerComponent from "src/components/forms/ColorPickerInput";

const TranscriptionPage = () => {
  const { setFontSize, setFontStyle, setLineHeight, setWordSpacing, setFontColor, setHighlightColor } =
    useTranscription();
  // You can use updateContextValue for all setters
  return (
    <Grid
      templateAreas={`"side main"`}
      gridTemplateColumns={"352px 1fr"}
      
    >
      <GridItem
        bg="primary.bay.100"
        area={"side"}
        top="0"
        right="0"
        height={"100vh"}
        overflowY={"auto"}
      >
        <TranscriptionSideBar>
          <TranscriptionBarItem title={"Transcription Settings"} >
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
            <ColorPickerComponent text="Transcript Font Color" onChange={(value) => {
              updateContextValue(setFontColor, value)
            }} />
            <ColorPickerComponent text="Highlight Text" onChange={(value) => {
              updateContextValue(setHighlightColor, value)
            }} />
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
