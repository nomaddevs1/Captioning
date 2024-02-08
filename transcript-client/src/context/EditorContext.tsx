import React, { createContext, useContext, useState, ReactNode } from "react";
import { EditorState } from "draft-js";

interface EditorContextType {
  editorState: EditorState;
  setEditorState: (editorState: EditorState) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <EditorContext.Provider value={{ editorState, setEditorState }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = (): EditorContextType => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error("useEditor must be used within a EditorProvider");
  }
  return context;
};
