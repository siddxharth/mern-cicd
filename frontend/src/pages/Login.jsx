import { useState, useContext } from "react";
import api from "../utils/api";
import { AuthContext } from "../AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { updateUser } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/login", { email, password });

            // Check for error messages from the server and log them
            if (response.data.error) {
                console.log(response.data.error);
                // Optionally, you can handle different types of errors differently here
                return;
            }

            // Check for specific messages (like incorrect password)
            if (response.data.message) {
                console.log(response.data.message);
                return;
            }

            // Check if both token and user data are present in the response before calling updateUser
            if (response.data.token && response.data.user) {
                updateUser(response.data.token, response.data.user);
                window.location.href = "/user";
            } else {
                console.error("Invalid response from the server");
            }
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    return (
        <section className="section">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                        <form onSubmit={handleLogin} className="box">
                            <div className="field">
                                <label htmlFor="email" className="label">
                                    Email
                                </label>
                                <div className="control">
                                    <input
                                        type="email"
                                        id="email"
                                        className="input"
                                        required
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="password" className="label">
                                    Password
                                </label>
                                <div className="control">
                                    <input
                                        type="password"
                                        id="current-password"
                                        className="input"
                                        required
                                        value={password}
                                        autoComplete="on"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <a
                                    href="/forgot-password"
                                    className="is-small-text"
                                >
                                    <strong>Forgot Password?</strong>
                                </a>
                            </div>
                            <div className="field">
                                <button
                                    type="submit"
                                    className={"button is-success"}
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                        <div className="field">
                            <p>
                                {`Don't have an account? `}
                                <a href="/register">
                                    <strong>Sign Up</strong>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
