import DisplayTranscript from 'src/components/DisplayTranscript';
import { Grid, GridItem } from "@chakra-ui/react";
import TranscriptionSideBar from 'src/components/sidebar/TranscriptionSideBar';
import TranscriptionBarItem from 'src/components/sidebar/transcriptionItem';
import { SelectInput } from 'src/components/forms/TextInput';
import { TranscriptionContext } from 'src/context/TranscriptionContext';
import {useTranscription} from 'src/context/TranscriptionContext'
const TranscriptionPage = () => {
  
  const {setFontSize} = useTranscription()

const handleFontSizeChange = (newFontSize: string) => {
    setFontSize(newFontSize); // This function is provided by your TranscriptionContext
  };

  return (
   <Grid
      templateAreas={`"side main"`}
      gridTemplateColumns={"352px 1fr"}
      height="100%"
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
          <SelectInput 
              label="Font Size"
              value={""} // The current font size value
              onChange={handleFontSizeChange}
              options={[
                { value: '12px', label: '12px' },
                { value: '14px', label: '14px' },
                { value: '50px', label: '50px' },
            // ... additional font sizes
          ]}
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
