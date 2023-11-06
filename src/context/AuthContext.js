import { createContext, useState } from "react"

export const AuthContext = createContext({});



const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;