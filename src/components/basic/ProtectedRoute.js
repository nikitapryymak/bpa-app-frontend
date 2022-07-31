import { Navigate } from "react-router-dom";
import { isAuthed } from "../../utils/utils";

const ProtectedRoute = ({ children }) => {
  let authed = isAuthed();

  return authed ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
