import { useEffect, useState } from 'react';
import { EditorState, convertFromRaw } from 'draft-js';

const useInitializeEditorState = (transcriptionData: any) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (transcriptionData.length > 0) {
      const contentState = convertFromRaw({
        blocks: transcriptionData,
        entityMap: {},
      });
      setEditorState(EditorState.createWithContent(contentState));
      setIsDataLoaded(true);
    }
  }, [transcriptionData]);

  return [editorState, setEditorState, isDataLoaded];
};

export default useInitializeEditorState;
