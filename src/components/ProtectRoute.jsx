import { Navigate } from "react-router-dom";
import useUserStore from "../stores/userStore";

const ProtectedRoute = ({ element }) => {
  const { user } = useUserStore(state => state);
  
  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;