import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "../Pages/Loader";

const ProtectedLoginRoutes = ({ user }) => {
  const location = useLocation();
  if (user === null) {
    return <Loader />;
  }

  if (user.loggedIn && user.userType === "admin") {
    return (
      <Navigate to="/admin/dashboard" state={{ from: location }} replace />
    );
  } else if (user.loggedIn && user.userType === "user") {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else if (user.loggedIn && user.userType === "navigator") {
    return <Navigate to="/navigator/dashboard" state={{ from: location }} replace />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedLoginRoutes;
