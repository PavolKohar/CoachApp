import { createContext, useState, useContext, use } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(token ? jwtDecode(token) : null);

    const loginUser = (token)=>{
        setToken(token);
        setUser(jwtDecode(token));
        localStorage.setItem("token", token);   
    };


    const logoutUser = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ token, user,loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);