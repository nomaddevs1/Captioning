import { Box, Button, Text , Grid} from "@chakra-ui/react"
import { ReactNode } from "react"
import useDownloader from "src/hooks/useDownloader"



interface TranscriptionItemProps {
  title: string
  children: ReactNode
}

const TranscriptionBarItem = ({ title, children }: TranscriptionItemProps) => {
  const { generatePDF, isLoading } = useDownloader();

  const handleDownloadPDF = async () => {
    try {
      const blob = await generatePDF();

      // Initiate the download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated-pdf.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      // Handle errors if needed
      console.error('Error downloading transcript:', error);
    }
  };
  
  return (
    <Box mb="20px">
      <Text mb="20px" width="100%" fontSize="1.2625rem" fontWeight="800" color={"neutral.50"}>
        {title}
      </Text>
      {children}
        <Button mt="10px" width="100%" mb="70px" color="black" onClick={handleDownloadPDF} disabled={isLoading}>{isLoading ? 'Generating PDF...' : 'Save Transcript'}</Button>
    </Box>
  )
}

export default TranscriptionBarItem
