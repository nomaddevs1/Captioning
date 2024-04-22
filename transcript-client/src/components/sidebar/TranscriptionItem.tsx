import { Box, Button, Text , Flex, IconButton} from "@chakra-ui/react"
import { ReactNode, useState } from "react"
import { CaretDoubleDown, CaretDoubleUp } from "@phosphor-icons/react"
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
  const {videoFile, line, position} = useTranscription();
  const assFile = useGenerateASS(); // Get the ASS file content
  
  const handleDownloadVideoWithCaptions = async () => {
    const originalMin = 0;
    const originalMax = 20;
    const newMin = 0;
    const newMax = 100;
    const percentage = (line - originalMin) / (originalMax - originalMin);
    const yscale = percentage * (newMax - newMin) + newMin; // vertical position
    const xscale = position;
    try {
      console.log("Requesting download of video with captions...");


      if (videoFile && assFile) {
        const blob = await generateVideoWithCaptions(videoFile, assFile, xscale, yscale, setIsLoading);
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
        <Button 
          width="100%" 
          mt="10px"
          onClick={handleDownloadVideoWithCaptions} 
          disabled={isLoading}
          bg={isLoading ? "gray.300" : "blue.200"}
          _hover={!isLoading ? { bg: "gray.200" } : undefined}
        >
          {isLoading ? 'Generating Video...' : 'Save Video with Captions'}
        </Button>
      </Flex>
    </Box>
  )
}

export default TranscriptionBarItem
