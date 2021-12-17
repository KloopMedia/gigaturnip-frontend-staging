import {useAuth} from "../../context/authentication/hooks/useAuth";
import {useLocation, Navigate} from "react-router-dom";
import {ROUTES} from "../../utils/constants/Paths";
import {CircularProgress} from "@mui/material";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const location = useLocation();

  console.log(auth)

  if (auth.ready && !auth.user) {
    return <Navigate to={ROUTES.login.path} state={{ from: location }} />;
  }

  return auth.ready ? children : <CircularProgress/>;
};

export default RequireAuth