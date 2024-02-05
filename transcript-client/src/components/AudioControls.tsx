import { Box, Button, Flex, Text, Progress } from "@chakra-ui/react";
import { formatTime, calculatePercentage } from "../utils/audioUtils";
//@ts-ignore
import play_icon from "../assets/play_icon.png";
//@ts-ignore
import pause_icon from "../assets/pause_icon.png";



interface AudioControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  currentTime: number;
  duration: number;
}

const AudioControls: React.FC<AudioControlsProps> = ({ isPlaying, onPlayPause, currentTime, duration }) => {
  return (
    <Box position="fixed" bottom={0} left={360} width="75%" bg="primary.moss.50" p={4}>
      <Flex align="center" justify="space-between">
      <Box onClick={onPlayPause} cursor="pointer">
          {isPlaying ? <img src={pause_icon} alt="Pause Icon" /> : <img src={play_icon} alt="Play Icon" />}
        </Box>
        <Text>{formatTime(currentTime)}</Text>
        <Progress value={calculatePercentage(currentTime, duration)} width="60%" color="primary.moss.400" />
        <Text>{formatTime(duration)}</Text>
      </Flex>
    </Box>
  );
};

export default AudioControls;
