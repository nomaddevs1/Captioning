import { Box, Button, Text , Flex, IconButton} from "@chakra-ui/react"
import { ReactNode } from "react"
import useDownloader from "src/hooks/useDownloader"
import { CaretDoubleDown, CaretDoubleUp } from "@phosphor-icons/react"



interface TranscriptionItemProps {
  title: string
  children: ReactNode
  toggleSidebar: () => void
  collapsed: boolean
}

const TranscriptionBarItem = ({ title, children, toggleSidebar, collapsed }: TranscriptionItemProps) => {
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
      <Flex 
        flexDirection="row" 
        alignItems="center" 
        pos={{base: "absolute", md: "unset"}} 
        top="0" 
        bg="primary.gray.100" 
        height="40px" 
        zIndex="100" 
        width="97vw"
        boxShadow={{base: "rgba(100,100,111,0.2) 0px 7px 29px 0px", md: "none"}}
      >
        <Text mb="0px" width="90%" fontSize="1.2625rem" fontWeight="800" color={"neutral.50"}>
          {title}
        </Text>
        <IconButton
          display={{md: "none"}} 
          aria-label="collapse-sidebar" 
          variant="link" color="white" 
          icon= {collapsed ? <CaretDoubleUp size={24} /> : <CaretDoubleDown size={24} />}
          onClick={toggleSidebar}
          size="xsm"
          width="10%"
        >
        </IconButton>
      </Flex>
      {children}
        <Button mt="10px" width="100%" mb={{base: "10px", md: "70px"}} color="black" onClick={handleDownloadPDF} disabled={isLoading}>{isLoading ? 'Generating PDF...' : 'Save Transcript'}</Button>
    </Box>
  )
}

export default TranscriptionBarItem
