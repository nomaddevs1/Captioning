
// src/utils/transcriptionUtils.ts

// Define the option types for select inputs
export interface SelectOption {
  value: string;
  label: string;
}

// Options for font sizes
export const fontSizeOptions: SelectOption[] = [
  { value: '12px', label: '12px' },
  { value: '14px', label: '14px' },
  { value: '16px', label: '16px' },
  // ...additional font sizes
];

// Options for font styles
export const fontStyleOptions: SelectOption[] = [
  { value: 'Georgia', label: 'Georgia' }, // Serif
  { value: 'Times New Roman', label: 'Times New Roman' }, // Serif
  { value: 'Helvetica', label: 'Helvetica' }, // Sans-serif
  { value: 'Verdana', label: 'Verdana' }, // Sans-serif
  { value: 'Trebuchet MS', label: 'Trebuchet MS' }, // Sans-serif
  { value: 'Courier New', label: 'Courier New' }, // Monospace
  { value: 'Lucida Console', label: 'Lucida Console' }, // Monospace
  { value: 'Roboto', label: 'Roboto' }, // Sans-serif
  { value: 'Lato', label: 'Lato' }, // Sans-serif
  { value: 'Open Sans', label: 'Open Sans' }, // Sans-serif
  { value: 'Noto Sans', label: 'Noto Sans' }, // Sans-serif, good for multilingual support
  { value: 'Source Sans Pro', label: 'Source Sans Pro' }, // Sans-serif
  { value: 'Montserrat', label: 'Montserrat' }, // Sans-serif
  { value: 'Oswald', label: 'Oswald' }, // Sans-serif
  
  // ...additional font styles
];

// Options for line heights
export const lineHeightOptions: SelectOption[] = [
  { value: '1.0', label: 'Single' },
  { value: '1.5', label: '1.5' },
  { value: '2.0', label: 'Double' },
  // ...additional line heights
];

// Options for word spacings
export const wordSpacingOptions: SelectOption[] = [
  { value: '0', label: 'Default' },
  { value: '2px', label: '2px' },
  { value: '5px', label: '5px' },
  // ...additional word spacings
];

// Functions to update the context values
export const updateContextValue = (setter: React.Dispatch<React.SetStateAction<any>>, value: any) => {
  setter(value);
};
