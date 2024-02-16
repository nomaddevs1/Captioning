// src/components/InteractiveTranscriptView.tsx
import React, { useRef, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { TranscriptionSegment } from "src/types/transcriptionDataTypes";
import { interactiveTutorials } from "src/utils/interactiveTutorials";

interface InteractiveTranscriptViewProps {
  segments: TranscriptionSegment[];
  onSegmentClick: (startTime: number) => void;
  currentTime: number;
  updateTutorialList: (tutorial_list: any) => void;
}

const InteractiveTranscriptView: React.FC<InteractiveTranscriptViewProps> = ({
  segments,
  onSegmentClick,
  currentTime,
  updateTutorialList
}) => {
  const segmentRefs = useRef(new Array(segments.length));
  updateTutorialList(interactiveTutorials);

  useEffect(() => {
  const activeSegmentIndex = segments.findIndex(
    segment => currentTime >= segment.start && currentTime <= segment.end
  );

  if (activeSegmentIndex !== -1 && segmentRefs.current[activeSegmentIndex]) {
    const segmentEl = segmentRefs.current[activeSegmentIndex];
    const scrollContainerEl = segmentEl.closest('.scrollContainer'); // Add the correct selector for your scroll container

    if (scrollContainerEl) {
      const segmentTop = segmentEl.offsetTop;
      const segmentHeight = segmentEl.offsetHeight;
      const scrollContainerHeight = scrollContainerEl.offsetHeight;

      if (segmentTop < scrollContainerEl.scrollTop ||
          segmentTop + segmentHeight > scrollContainerEl.scrollTop + scrollContainerHeight) {
        scrollContainerEl.scrollTop = segmentTop + (segmentHeight - scrollContainerHeight) / 2;
      }
    }
  }
}, [currentTime, segments]);


  return (
    <>
      {segments.map((segment, index) => (
        <Box
          key={index}
          ref={el => (segmentRefs.current[index] = el)}
          onClick={() => onSegmentClick(segment.start)}
          bg={
            currentTime >= segment.start && currentTime <= segment.end
              ? "gray.300"
              : "transparent"
          }
          fontWeight={
            currentTime >= segment.start && currentTime <= segment.end
              ? "bold"
              : "normal"
          }
          p={2}
          m={1}
          borderRadius="md"
          boxShadow={
            currentTime >= segment.start && currentTime <= segment.end
              ? "0px 0px 8px rgba(0, 0, 0, 0.5)"
              : "none"
          }
          transition="background-color 0.3s, box-shadow 0.3s"
          cursor="pointer"
        >
          {segment.text}
        </Box>
      ))}
    </>
  );
};

export default InteractiveTranscriptView;
