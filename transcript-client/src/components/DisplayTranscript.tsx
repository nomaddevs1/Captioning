import { Box } from "@chakra-ui/react";
import { useEffect, useState, useRef } from 'react';
import TutorialPopup from "./TutorialPopup";
import { Editor, EditorState, ContentState, convertFromRaw, RichUtils, Modifier, DraftStyleMap } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useTranscription } from 'src/context/TranscriptionContext';

function DisplayTranscript (){
  const { transcriptionData, fontSize } = useTranscription();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

    // const displayText = () => {
    //     if (transcription){
    //         const arr:Array<JSX.Element> = [];
    //         for (let i = 0; i < transcription.transcriptionData.length; i++){
    //           //@ts-ignore
    //             arr.push(<Text key={i} mb={4}>{transcription.transcriptionData[i].text}</Text>);
    //         }
    //         return arr;
    //     }
    // }

  const editorRef = useRef<Editor>(null);

// After component mounts
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);


  useEffect(() => {
    if (transcriptionData.length > 0) {
      const blocks = transcriptionData.map((item, index) => ({
        key: `block-${index}`,
        text: item.text,
        type: 'unstyled',
        data: {
          // Include any additional metadata you might want to use
          start: item.start,
          end: item.end,
        },
      }));


      const contentState = convertFromRaw({
        blocks,
        entityMap: {}, // No entities in this example, but you can add if needed
      });

      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [transcriptionData]);


  
// Apply the current font size from the context to the selection
  const applyFontSize = (fontSize: string) => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const nextContentState = Modifier.applyInlineStyle(
        editorState.getCurrentContent(),
        selection,
        'CUSTOM_FONT_SIZE'
      );
      setEditorState(EditorState.push(editorState, nextContentState, 'change-inline-style'));
    }
  };

  // When the fontSize in the context changes, apply it to the current selection
  useEffect(() => {
    applyFontSize(fontSize);
  }, [fontSize]); // Re-run this effect when fontSize changes




  const styleMap = {
    'CUSTOM_FONT_SIZE': {
      fontSize: fontSize // Use the font size from context
    },
  };


  const getBlockStyle = (block) => {
    return 'myBlockStyle';
  }
    return (
        // <Box height="100%">
        //     <Box pt={10} pl={20} pr={20} height="85vh" pos="relative">
        //         <Box overflowY="auto" height="100%" bg="primary.moss.100" p={6} textAlign="left">
        //             {displayText()}
        //         </Box>
        //     </Box>
        // </Box>
        <Box height="100%">
      <Box pt={10} pl={20} pr={20} height="85vh" pos="relative">
        <Box overflowY="auto" height="100%" bg="primary.moss.100" p={6} textAlign="left">
          <Editor
            ref= {editorRef}
            customStyleMap={styleMap}
            editorState={editorState}
            onChange={setEditorState}
            blockStyleFn={getBlockStyle}
          />
        </Box>
      </Box>
    </Box>
    );
}

export default DisplayTranscript;
