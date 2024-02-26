import { Box, Text } from "@chakra-ui/react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/dist/css/rcp.css";
import { rcpStyle } from "src/utils/manualStyle";

interface ColorPickerInput {
  text: string;
  onChange: (value: string) => void;
}


const ColorPickerComponent = ({ text, onChange }: ColorPickerInput) => {
  const [color, setColor] = useColor("#00FF00");

  const handleChange = (value: any) => {
    setColor(value);
    onChange(value?.hex);
  };

  return (
    <>
      <style>{rcpStyle}</style>
      <Box>
        <Text
          mt="20px"
          width="80%"
          fontSize="1.1rem"
          fontWeight="400"
          color={"neutral.50"}
        >
          {text}
        </Text>
        <ColorPicker height={50} color={color} onChange={handleChange} />
      </Box>
    </>
  );
};

export default ColorPickerComponent;
