import DisplayTranscript from 'src/components/DisplayTranscript';
import { Grid, GridItem } from "@chakra-ui/react";
import TranscriptionSideBar from 'src/components/sidebar/TranscriptionSideBar';
import TranscriptionBarItem from 'src/components/sidebar/transcriptionItem';
import { SelectInput } from 'src/components/forms/TextInput';

const TranscriptionPage = () => {
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
            height="100%"
          >
            <TranscriptionSideBar >
            <TranscriptionBarItem title={"Transcription Settings"}>
                <SelectInput/> 
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
