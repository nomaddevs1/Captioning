import { useState } from "react";
import { Grid, GridItem, Flex } from "@chakra-ui/react";
import TranscriptionSideBar from "src/components/sidebar/TranscriptionSideBar";
import TranscriptionBarItem from "src/components/sidebar/TranscriptionItem";
import { SelectInput } from "src/components/component/SelectInput";
import { useTranscription } from "src/context/TranscriptionContext";
import {
  updateContextValue,
  selectOptions,
  styleSwitches,
} from "src/utils/transcriptionUtils";
import DisplayTranscript from "src/components/DisplayTranscript";
import "react-color-palette/dist/css/rcp.css";
import ColorPickerComponent from "src/components/component/ColorPickerInput";
import StyleSwitch from "src/components/component/SwitchButtonIcon";

const TranscriptionPage = () => {
  const transcriptionContext = useTranscription();
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };


  return (
    <Grid templateAreas={`"side main"`} gridTemplateColumns={{base: "0 1fr", md: "352px 1fr"}}>
      <GridItem
        bg= "primary.bay.100"
        area={"side"}
        height={{base: collapsed ? "40px" : "40vh", md:"100vh"}}
        overflowY={"auto"}
        position={{base: "absolute", md: "unset"}}
        zIndex={{base: "100"}}
        bottom="0"
        width="100%"
        transition="height 0.3s ease"
        boxShadow={{base: "rgba(100,100,111,0.2) 0px 0px 10px", md: "none"}}
      >
        <TranscriptionSideBar>
          <TranscriptionBarItem title={"Transcription Settings"} toggleSidebar={toggleSidebar} collapsed={collapsed}>
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
              onChange={(value) => {
                if (!transcriptionContext.allHighlightColors.includes(value)) {
                  transcriptionContext.setAllHighlightColors([...transcriptionContext.allHighlightColors, value]);
                }
              }}
            />
          </TranscriptionBarItem>
        </TranscriptionSideBar>
      </GridItem>
      <GridItem area={"main"}>
        <Flex flexDirection="column">
          <DisplayTranscript/>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default TranscriptionPage;

