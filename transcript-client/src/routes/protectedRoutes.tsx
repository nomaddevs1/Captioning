
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useTranscription } from "src/hooks/useTranscription";

const ProtectedRoute = ({ children }: {
  children: ReactNode
}) => {
  const { transcriptionData, transcriptionVTT } = useTranscription();
  if ((!transcriptionData || transcriptionVTT) && (transcriptionData || !transcriptionVTT)) {
    // Redirect to the upload page if there's no transcription data
    return <Navigate to="/upload" replace />;
  }

  return children;
};


export default ProtectedRoute;
