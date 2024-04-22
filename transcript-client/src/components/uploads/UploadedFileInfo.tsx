import { useState, ReactNode } from 'react';
import { Box, Text, Flex, Select, } from "@chakra-ui/react";
//@ts-ignore
import upload_logo from 'src/assets/upload_logo.svg';

interface UploadedFileInfoProps {
  file: File;
  children?: ReactNode;
  onChange: (language: string) => void;
  onVideoFlagChange?: (isVideo: boolean) => void;
  videoFormatOption?: ReactNode;
}

const languages = [
  { label: 'English', value: 'en' },
  { label: 'Arabic', value: 'ar' },
  { label: 'Danish', value: 'da' },
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
  { label: 'Hindi', value: 'hi' }
];

const UploadedFileInfo = ({ file, children, onChange, videoFormatOption, }: UploadedFileInfoProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    onChange(newLanguage);
  };


  return (
    <Box maxWidth={{ base: "90%", md: "40%" }}>
      <Flex mb={4}>
        <img src={upload_logo} width="80px" alt="" />
        <Box ml={4}>
          <Text fontSize={{ base: "2xl", md: "3xl" }} noOfLines={1} mb={2} mr={0}>{file.name}</Text>
          <Flex alignItems="center">
            <Select 
              placeholder="Language" 
              width="68%" 
              bg="blue.200" 
              value={selectedLanguage} 
              onChange={handleLanguageChange}
              color="black"
            >
              {languages.map(({ label, value }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </Select>
            <Text width="auto" ml={4}>{Math.round(file.size / 1000000)} MB</Text>
          </Flex>
        </Box>
      </Flex>
      {videoFormatOption}
      {children}
    </Box>
  );
};

export default UploadedFileInfo;