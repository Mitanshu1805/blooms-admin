import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
  if (!sessionStorage.getItem("auth_token")) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoute;
