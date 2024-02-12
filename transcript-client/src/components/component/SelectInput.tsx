import { FormLabel, FormControl } from "@chakra-ui/react";
import { Select } from "chakra-react-select";


interface Val{
    value: string;
    label: string
  }

interface TextInputProps {
  label: string,
  value: string;
  onChange: (value: string) => void;
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
      <FormLabel  width="80%" fontSize="1.1rem" fontWeight="400" color={"neutral.50"} mb={0} mt={'20px'}>{label}</FormLabel>
      <Select
        value={selectedValue}
        options={options}
        //@ts-ignore
        onChange={handleChange} // Set the selected value on change
      />
    </FormControl>
  );
};

