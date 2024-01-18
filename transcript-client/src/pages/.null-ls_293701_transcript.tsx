
import { Grid, GridItem } from "@chakra-ui/react";
import TranscriptionSideBar from 'src/components/sidebar/TranscriptionSideBar';
import TranscriptionBarItem from 'src/components/sidebar/transcriptionItem';
import { SelectInput } from 'src/components/forms/TextInput';
import { useTranscription } from 'src/context/TranscriptionContext';
import DisplayTranscript from 'src/components/DisplayTranscript';
import {
  updateContextValue,
  fontSizeOptions,
  fontStyleOptions,
  lineHeightOptions,
  wordSpacingOptions
} from 'src/utils/transcriptionUtils';

const TranscriptionPage = () => {
  const {
    setFontSize,
    setFontStyle,
    setLineHeight,
    setWordSpacing
  } = useTranscription();
  console.log(fontSizeOptions)
  // You can use updateContextValue for all setters
  return (
    <Grid templateAreas={`"side main"`} gridTemplateColumns={"352px 1fr"} height="100%">
      <GridItem bg="primary.bay.100" area={"side"} top="0" right="0" height="100%">
        <TranscriptionSideBar>
          <TranscriptionBarItem title={"Transcription Settings"}>
            // <SelectInput 
            //   label="Font Size"
            //   onChange={(value) => updateContextValue(setFontSize, value)}
            //   options={fontSizeOptions}
            // />
            // <SelectInput 
            //   label="Font Style"
            //   onChange={(value) => updateContextValue(setFontStyle, value)}
            //   options={fontStyleOptions}
            // />
            // <SelectInput 
            //   label="Line Height"
            //   onChange={(value) => updateContextValue(setLineHeight, parseFloat(value))}
            //   options={lineHeightOptions}
            // />
            // <SelectInput 
            //   label="Word Spacing"
            //   onChange={(value) => updateContextValue(setWordSpacing, parseFloat(value))}
            //   options={wordSpacingOptions}
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
