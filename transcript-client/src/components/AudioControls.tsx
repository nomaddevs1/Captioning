import { Box, Button, Flex, Text, Progress } from "@chakra-ui/react";
import { Pause, Play } from "@phosphor-icons/react";
import { formatTime, calculatePercentage } from "src/utils/audioUtils";

interface AudioControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  isPlaying,
  onPlayPause,
  currentTime,
  duration,
  onSeek,
}) => {

 const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This calculation assumes the input's max value is 100 for percentage.
    const percentage = parseFloat(e.target.value);
   const newTime = (percentage / 100) * duration;
    onSeek(newTime);
};

  return (
    <Box
      bottom={0}
      left={{base: 0, md: 360}}
      width={{base: "100%", md: "75%"}}
      p={4}
    >
      <Flex align="center" justify="space-between" gap="4">
        <Box onClick={onPlayPause} cursor="pointer">
          {!isPlaying ? <Play size={32} /> : <Pause size={32} />}
        </Box>
        <Text>{formatTime(currentTime)}</Text>
        <input
          type="range"
          value={calculatePercentage(currentTime, duration)}
          onChange={handleSeekChange}
          style={{ width: "60%" }}
          min="0"
          max="100"
        />
        <Text>{formatTime(duration)}</Text>
      </Flex>
    </Box>
  );
};

export default AudioControls;
