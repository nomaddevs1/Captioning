import { Switch, FormControl, FormLabel } from "@chakra-ui/react";

interface StyleSwitchProps {
  label: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
}

const StyleSwitch = ({ label, isChecked, onChange }: StyleSwitchProps) => {
  return (
    <FormControl >
      <FormLabel htmlFor={label.toLowerCase()} mb="0" width="80%" fontSize="1.0rem" fontWeight="400" color={"neutral.50"}>
        {label}
      </FormLabel>
      <Switch 
        id={label.toLowerCase()}
        isChecked={isChecked} 
        onChange={(e) => onChange(e.target.checked)} 
        size="lg" 
        colorScheme="teal"
      />
    </FormControl>
  );
};

export default StyleSwitch;
