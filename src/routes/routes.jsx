import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";

const RouteGuard = ({children, requiresAuth,}) => {
  const { user } = useAuth();

  if (requiresAuth && !user) {
    return <Navigate to="/login" replace />;
  }
  
  console.log("RouteGuard", requiresAuth);

  return children;
};

export default RouteGuard;