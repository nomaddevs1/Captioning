import { FormLabel, FormControl, LightMode } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { selectionStyle} from "src/utils/manualStyle";


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
    <>
      <style>{selectionStyle}</style>
      <FormControl>
        <FormLabel  width="80%" fontSize="1.1rem" fontWeight="400" color={"neutral.50"} mb={0} mt={'20px'}>{label}</FormLabel>
        <LightMode>
        <Select
          class="selection-box"
          value={selectedValue}
          options={options}
          //@ts-ignore
          onChange={handleChange} // Set the selected value on change
        />
        </LightMode>
      </FormControl>
    </>
  );
};

