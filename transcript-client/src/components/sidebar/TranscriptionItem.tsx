import { Box, Button, Text , Flex, IconButton} from "@chakra-ui/react"
import { ReactNode, useState } from "react"
import { CaretDoubleDown, CaretDoubleUp } from "@phosphor-icons/react"
import { generatePDF } from "src/utils/backendCalls"
import useStyledHtmlExporter from "src/hooks/useStyledHtmlExporter"
import { generateVideoWithCaptions } from "src/utils/backendCalls"
import useGenerateASS from "src/hooks/useGenerateASS";
import { useTranscription } from "src/context/TranscriptionContext";

interface TranscriptionItemProps {
  title: string
  children: ReactNode
  toggleSidebar: () => void
  collapsed: boolean
}

const TranscriptionBarItem = ({ title, children, toggleSidebar, collapsed }: TranscriptionItemProps) => {
  const [ isLoading, setIsLoading ] = useState(false);
  const styledHtml = useStyledHtmlExporter();
  const {videoFile} = useTranscription();
  const assFile = useGenerateASS(); // Get the ASS file content

  const handleDownloadPDF = async () => {
    try {
      const blob = await generatePDF(styledHtml, setIsLoading);

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
  
  const handleDownloadVideoWithCaptions = async () => {
    try {
      console.log("Requesting download of video with captions...");
      setIsLoading(true);


      if (videoFile && assFile) {
        const blob = await generateVideoWithCaptions(videoFile, assFile, setIsLoading);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "video-with-captions.mp4";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        console.log("Video with captions has been generated successfully.");
      } else {
        console.error("Both video and ASS files are required to generate captions.");
      }


      // Assuming the video with captions has been generated successfully
      // Initiate the download
  

      setIsLoading(false);
    } catch (error) {
      // Handle errors if needed
      console.error("Error downloading video with captions:", error);
      setIsLoading(false);
    }
  };

  return (
    <Box mb="80px">
      <Flex 
        flexDirection="row" 
        alignItems="center" 
        pos={{base: "absolute", md: "unset"}} 
        top="0" 
        bg="primary.gray.100" 
        height="40px" 
        zIndex="100" 
        width="95vw"
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
        <Flex flexDirection="column">
        <Button mt="10px" width="100%" mb="10px" color="black" onClick={handleDownloadPDF} disabled={isLoading}>
          {isLoading ? 'Generating PDF...' : 'Save Transcript'}
        </Button>
        <Button width="100%" colorScheme="blue" onClick={handleDownloadVideoWithCaptions} disabled={isLoading}>
          {isLoading ? 'Generating Video...' : 'Download Video with Captions'}
        </Button>
      </Flex>
    </Box>
  )
}

export default TranscriptionBarItem
