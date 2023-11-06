import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SessionManager from "./SessionManager";





function RequireAuth({ allowedRoles }) {

  const { user, loggedIn } = useContext(AuthContext);
  const userRole = SessionManager.getRole();
  const location = useLocation();


  const checkAuth = () => {

    if(user || loggedIn ){
      if(allowedRoles.find(role => userRole.toLowerCase() === role.toLowerCase())){
        return <Outlet />
      }else{
        return <Navigate to="/denied" state={{ from: location}} replace />
      }

    }else{
      return <Navigate to="/account" state={{ from: location}} replace />
    }
  }


  return (
    checkAuth()
  
  )
}

export default RequireAuth;