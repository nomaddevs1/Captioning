// src/components/InteractiveTranscriptView.tsx
import React from 'react';
import { Box } from '@chakra-ui/react';
import { TranscriptionSegment } from "src/types/transcriptionDataTypes";

interface InteractiveTranscriptViewProps {
  segments: TranscriptionSegment[];
  onSegmentClick: (startTime: number) => void;
  currentTime: number;
}

const InteractiveTranscriptView: React.FC<InteractiveTranscriptViewProps> = ({ segments, onSegmentClick, currentTime }) => (
  <>
    {segments.map((segment, index) => (
      <Box key={index} onClick={() => onSegmentClick(segment.start)} cursor="pointer">
        {segment.text}
      </Box>
    ))}
  </>
);

export default InteractiveTranscriptView;
