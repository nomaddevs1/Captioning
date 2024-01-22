
// ColorPickerInput.tsx
import { useState } from 'react';
import { SketchPicker } from 'react-color';
import { Box, FormLabel, FormControl } from '@chakra-ui/react';

interface ColorPickerInputProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

const ColorPickerInput = ({ label, value, onChange }: ColorPickerInputProps) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  console.log(displayColorPicker)
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    onChange(color.hex);
  };

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Box
        bg={value}
        width="36px"
        height="14px"
        borderRadius="2px"
        onClick={handleClick}
        cursor="pointer"
      />
      {true ? (
        <Box position="absolute" zIndex="2">
          <Box
            position="fixed"
            top="0px"
            right="0px"
            bottom="0px"
            left="0px"
            onClick={handleClose}
          />
          <SketchPicker color={value} onChange={handleChange} />
        </Box>
      ) : null}
    </FormControl>
  );
};

export default ColorPickerInput;
