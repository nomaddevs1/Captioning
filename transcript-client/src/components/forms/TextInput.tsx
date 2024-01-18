import { ReactNode } from "react";
import { Checkbox, Box, FormLabel, FormControl } from "@chakra-ui/react";
import { Select } from "chakra-react-select";


interface Val{
    value: string;
    label: string
  }

interface TextInputProps {
  label: string,
  value: string;
  props?: ReactNode;
  options: Val[] 
}

// SelectInput component

export const SelectInput = ({ label, value, onChange, options }: TextInputProps) => {
  // Find the current selected value based on the value prop
  const selectedValue = options.find(option => option.value === value);

  // Handle change event for Select
  const handleChange = (selectedOption: Val) => {
    onChange(selectedOption.value); // Propagate the change up
  };

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Select
        value={selectedValue}
        options={options}
        onChange={handleChange} // Set the selected value on change
      />
    </FormControl>
  );
};

