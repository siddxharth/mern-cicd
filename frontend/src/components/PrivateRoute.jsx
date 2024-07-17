import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import PropTypes from "prop-types";

PrivateRoute.propTypes = {
    element: PropTypes.elementType.isRequired,
};

export default function PrivateRoute({ element: Element, ...rest }) {
    const { user } = useContext(AuthContext);
    return user ? <Element {...rest} /> : <Navigate to="/login" />;
}
