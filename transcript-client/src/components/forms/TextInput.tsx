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

export const SelectInput = ({label, value, ...props }: TextInputProps) => {
  // Define options for the select
  const options = [
    { value: 'Comic', label: 'Comic' },
    { value: 'SansSerif', label: 'SansSerif' },
    { value: 'Serif', label: 'Serif' },
    { value: 'Mono', label: 'Mono' },
  ];

  // Set the current value for the select
  const selectedValue = options.find(option => option.value === value);

  return (
<FormControl m="1px">
    <FormLabel>{label}</FormLabel>
      <Select
        required={true}
        value={selectedValue}
        name="series"
        options={options}
        {...props} // Spread additional props here if needed
      />
    </FormControl>
  );
};

