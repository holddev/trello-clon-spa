import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const { isSignedIn, isLoaded } = useAuth();


  if (!isLoaded) {
    return <div>Cargando sesión...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/" />;
  }


  return children;
};

export default ProtectedRoute;
