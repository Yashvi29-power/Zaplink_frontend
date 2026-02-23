import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRoutesProps {
  isAuthenticated: boolean;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // redirect if not logged in
  }
  return <Outlet />; // renders the nested protected routes
};

export default ProtectedRoutes;