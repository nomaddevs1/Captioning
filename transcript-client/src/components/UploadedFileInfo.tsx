import { useState, ReactNode } from 'react';
import { Box, Text, Flex, Select } from "@chakra-ui/react";
//@ts-ignore
import upload_logo from '../assets/upload_logo.svg';

interface UploadedFileInfoProps {
  file: File;
  children?: ReactNode;
  onChange: (language: string) => void;
}


const UploadedFileInfo = ({ file, children, onChange }: UploadedFileInfoProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState(''); // State for selected language

  // Function to handle language selection
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    onChange(newLanguage); // Call the passed onChange function with the new language
    
  };

  return (
  <Box>
    <Flex mb={4}>
      <img src={upload_logo} width="80px" alt="" />
      <Box ml={4}>
        <Text fontSize="3xl" mb={2} mr={0}>{file.name}</Text>
        <Flex alignItems="center">
          <Select placeholder="Language" width="68%" bg="primary.moss.100" value={selectedLanguage} onChange={handleLanguageChange}>
            <option value='da'>Danish</option>
            <option value='en'>English</option>
            <option value='fr'>French</option>
            <option value='de'>German</option>
            <option value='ja'>Japanese</option>
            <option value='no'>Norwegian</option>
            <option value='pl'>Polish</option>
            <option value='pt'>Portuguese</option>
            <option value='es'>Spanish</option>
            <option value='sv'>Swedish</option>
            <option value='th'>Thai</option>
            <option value='uk'>Ukrainian</option>
            <option value='vi'>Vietnamese</option>

          </Select>
          <Text width="auto" ml={2}>{Math.round(file.size / 1000000)} MB</Text>
        </Flex>
      </Box>
    </Flex>
    {children} {/* Render children here */}
  </Box>
  );
    };

export default UploadedFileInfo;
