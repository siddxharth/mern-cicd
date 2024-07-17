import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
// import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            try {
                // const decodedToken = jwtDecode(token);
                // console.log(decodedToken);
                // setUser({ id: decodedToken._id, name: decodedToken.name });
                // For future: update jwt token for server auth
            } catch (error) {
                console.error("error:", error);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, [token]);

    const updateUser = (newToken, userData) => {
        setToken(newToken);
        setUser(userData);
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logoutUser = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, token, updateUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
export { AuthContext };
