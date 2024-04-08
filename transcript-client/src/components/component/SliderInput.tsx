import { Box, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";

interface ColorPickerInput {
  text: string;
  onChange: (value: string) => void;
  min: number;
  max: number;
  defaultVal: number;
}


const SliderInput = ({ text, min, max, defaultVal, onChange }: ColorPickerInput) => {
  const handleChange = (value: any) => {
    onChange(value);
  };

  return (
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
      <Slider onChange={handleChange} min={min} max={max} defaultValue={defaultVal}>
        <SliderTrack bg='white'>
          <SliderFilledTrack bg='#557e4a'/>
        </SliderTrack>
        <SliderThumb boxSize="6"/>
      </Slider>  
    </Box>
  );
};

export default SliderInput;