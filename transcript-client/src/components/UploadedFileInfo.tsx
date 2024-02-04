import { useState, ReactNode } from 'react';
import { Box, Text, Flex, Select } from "@chakra-ui/react";
//@ts-ignore
import upload_logo from '../assets/upload_logo.svg';

interface UploadedFileInfoProps {
  file: File;
  children?: ReactNode;
  onChange: (language: string) => void;
}

const languages = [
  { label: 'Danish', value: 'da' },
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Norwegian', value: 'no' },
  { label: 'Polish', value: 'pl' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Spanish', value: 'es' },
  { label: 'Swedish', value: 'sv' },
  { label: 'Thai', value: 'th' },
  { label: 'Ukrainian', value: 'uk' },
  { label: 'Vietnamese', value: 'vi' },
];


const UploadedFileInfo = ({ file, children, onChange }: UploadedFileInfoProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    onChange(newLanguage);
  };

  return (
    <Box>
      <Flex mb={4}>
        <img src={upload_logo} width="80px" alt="" />
        <Box ml={4}>
          <Text fontSize="3xl" mb={2} mr={0}>{file.name}</Text>
          <Flex alignItems="center">
            <Select 
              placeholder="Language" 
              width="68%" 
              bg="primary.moss.100" 
              value={selectedLanguage} 
              onChange={handleLanguageChange}
            >
              {languages.map(({ label, value }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </Select>
            <Text width="auto" ml={2}>{Math.round(file.size / 1000000)} MB</Text>
          </Flex>
        </Box>
      </Flex>
      {children}
    </Box>
  );
};

export default UploadedFileInfo;