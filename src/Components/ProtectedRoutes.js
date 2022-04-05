import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ user, role }) => {
  const location = useLocation();
  if (user === null) {
    return null
  }

  if (user.loggedIn && user.userType === role) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default ProtectedRoutes;
