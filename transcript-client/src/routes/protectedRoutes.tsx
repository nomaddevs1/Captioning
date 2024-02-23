
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useTranscription } from "src/hooks/useTranscription";

const ProtectedRoute = ({ children }: {
  children: PropsWithChildren
}) => {
  const { transcriptionData } = useTranscription();
  if (!transcriptionData) {
    // Redirect to the upload page if there's no transcription data
    return <Navigate to="/upload" replace />;
  }

  return children;
};


export default ProtectedRoute;
