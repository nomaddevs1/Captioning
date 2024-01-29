import { Grid, GridItem, Flex, Button } from "@chakra-ui/react";
import TranscriptionSideBar from "src/components/sidebar/TranscriptionSideBar";
import TranscriptionBarItem from "src/components/sidebar/transcriptionItem";
import { SelectInput } from "src/components/forms/SelectInput";
import { useTranscription } from "src/context/TranscriptionContext";
import TutorialPopup from "src/components/TutorialPopup";
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

const tutorial_list = [
  {
    position: {pos: "fixed", left: "380", top: "200"},
    text: "Use the sidebar to adjust the font style and size of the transcript text, or adjust the spacing between lines and words."
  },
  {
    position: {pos: "fixed", left: "380", top: "500"},
    text: "Adjust the color of the text or select lines within the display of the text to highlight specific sections."
  },
  {
    position: {pos: "fixed", left: "380", bottom: "5"},
    text: "When you are done customizing the text, click 'Save Transcript' to download a pdf file to your computer with your chosen accessability settings."
  },
  {
    position: {pos: "fixed", right: "100", bottom: "20"},
    text: "Click on 'Interactive Transcript' to switch to an interactive experience with media controls that will highlight text as is it spoken in your uploaded audio file."
  }
]

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
            <Grid templateColumns="47% 47%" gap="6%">
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
        <Flex flexDirection="column">
          <DisplayTranscript />
          <Button alignSelf="center" mb="10px" width="350px">Interactive Transcript</Button>
        </Flex>
        <TutorialPopup tutorials={tutorial_list}/>
      </GridItem>
    </Grid>
  );
};

export default TranscriptionPage;
