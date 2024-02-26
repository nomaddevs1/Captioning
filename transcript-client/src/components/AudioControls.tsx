import { Box,  Grid, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { Pause, Play, Waveform } from "@phosphor-icons/react";
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

  const handleSeekChange = (percentage: number) => {
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
      <Grid alignItems="center" gap="4" gridTemplateColumns="1fr 50px 10fr 50px">
        <Box onClick={onPlayPause} cursor="pointer">
          {!isPlaying ? <Play size={32} /> : <Pause size={32} />}
        </Box>
        <Text>{formatTime(currentTime)}</Text>
        <Slider
          value={calculatePercentage(currentTime, duration)}
          min={0}
          max={100}
          onChange={handleSeekChange}
          aria-label="audio-slider"
        >
          <SliderTrack>
            <SliderFilledTrack bg="#557E4A"/>
          </SliderTrack>
          <SliderThumb boxSize={4}><Waveform color="#557E4A" size={24}/></SliderThumb>
        </Slider>
        <Text>{formatTime(duration)}</Text>
      </Grid>
    </Box>
  );
};

export default AudioControls;
