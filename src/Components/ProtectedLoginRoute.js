import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedLoginRoutes = ({ user }) => {
  const location = useLocation();
  if (user === null) {
    return null;
  }

  if (user.userType === 'admin') {
    return <Navigate to="/dashboard" state={{ from: location }} replace/>;
  }  else if(user.userType === 'user'){
    return <Navigate to="/" state={{ from: location }} replace/>;
  } else {
    return <Outlet />;
  }
};

export default ProtectedLoginRoutes;