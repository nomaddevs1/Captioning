import { Grid, GridItem, Flex } from "@chakra-ui/react";
import TranscriptionSideBar from "src/components/sidebar/TranscriptionSideBar";
//@ts-ignore
import TranscriptionBarItem from "src/components/sidebar/TranscriptionItem";
import { SelectInput } from "src/components/forms/SelectInput";
import { useTranscription } from "src/context/TranscriptionContext";
import {
  updateContextValue,
  selectOptions,
  styleSwitches,
} from "src/utils/transcriptionUtils";
import { tutorial_list } from "src/utils/tutorial_list";
import DisplayTranscript from "src/components/DisplayTranscript";
import "react-color-palette/dist/css/rcp.css";
import ColorPickerComponent from "src/components/forms/ColorPickerInput";
import StyleSwitch from "src/components/forms/SwitchButtonIcon";

const TranscriptionPage = ({ updateTutorialList }: any) => {
  updateTutorialList(tutorial_list);
  const transcriptionContext = useTranscription();


  return (
    <Grid templateAreas={`"side main"`} gridTemplateColumns={"352px 1fr"}>
      <GridItem
        bg="primary.bay.100"
        area={"side"}
        height={"100vh"}
        overflowY={"auto"}
      >
        <TranscriptionSideBar>
          <TranscriptionBarItem title={"Transcription Settings"}>
            {selectOptions.map(({ label, options, setter, isFloat }) => (
              //@ts-ignore
              <SelectInput
                key={label}
                label={label}
                onChange={(value) =>
                  updateContextValue(
                    //@ts-ignore
                    transcriptionContext[setter],
                    isFloat ? parseFloat(value) : value
                  )
                }
                options={options}
              />
            ))}
            <Grid templateColumns="repeat(3, 1fr)" gap={4} mb={2} mt={2}>
              {styleSwitches.map(({ label, stateKey, setter }) => (
                <StyleSwitch
                  key={label}
                  label={label}
                  //@ts-ignore
                  isChecked={transcriptionContext[stateKey]}
                  //@ts-ignore
                  onChange={transcriptionContext[setter]}
                />
              ))}
            </Grid>
            <ColorPickerComponent
              text="Transcript Font Color"
              onChange={(value) =>
                updateContextValue(transcriptionContext.setFontColor, value)
              }
            />
            <ColorPickerComponent
              text="Highlight Text"
              onChange={(value) =>
                updateContextValue(
                  transcriptionContext.setHighlightColor,
                  value
                )
              }
            />
          </TranscriptionBarItem>
        </TranscriptionSideBar>
      </GridItem>
      <GridItem area={"main"}>
        <Flex flexDirection="column">
          <DisplayTranscript />
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default TranscriptionPage;

