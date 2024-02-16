// src/components/InteractiveTranscriptView.tsx
import React from 'react';
import { Box } from '@chakra-ui/react';
import { TranscriptionSegment } from "src/types/transcriptionDataTypes";
import { interactiveTutorials } from "src/utils/interactiveTutorials";

interface InteractiveTranscriptViewProps {
  segments: TranscriptionSegment[];
  onSegmentClick: (startTime: number) => void;
  currentTime: number;
  updateTutorialList: (tutorial_list: any) => void;
}

const InteractiveTranscriptView: React.FC<InteractiveTranscriptViewProps> = ({ segments, onSegmentClick, currentTime, updateTutorialList }) => {
  updateTutorialList(interactiveTutorials)
  return (<>
    {segments.map((segment, index) => (
        <Box key={index} onClick={() => onSegmentClick(segment.start)}
            bg={
          currentTime >= segment.start && currentTime <= segment.end
            ? "yellow"
            : "transparent"
        }
        fontWeight={
          currentTime >= segment.start && currentTime <= segment.end
            ? "bold"
            : "normal"
        } cursor="pointer">
        {segment.text}
      </Box>
    ))}
  </>)
};

export default InteractiveTranscriptView;

