import api from "../utils/api";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [timer, setTimer] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const { updateUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return; // Prevent form submission
        }
        try {
            const response = await api.post("/register", formData);
            updateUser(response.data.token, response.data.user);
            window.location.href = "/user";
        } catch (error) {
            console.error("There was an error!", error);
            setErrorMessage("An unexpected error occurred."); // Display a generic error message
        }
    };

    useEffect(() => {
        let interval;
        if (errorMessage) {
            setTimer(100); // Start the timer at 100%
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    const newTimer = prevTimer - 2; // Decrease timer by 2% every 100ms
                    if (newTimer <= 0) {
                        clearInterval(interval);
                        setErrorMessage(""); // Clear the error message when timer reaches 0
                        return 0;
                    }
                    return newTimer;
                });
            }, 100); // Update every 100ms
        }
        return () => clearInterval(interval); // Cleanup on component unmount or when errorMessage changes
    }, [errorMessage]);

    const clearErrorMessage = () => {
        setErrorMessage(""); // Manually clear the error message
        setTimer(0); // Reset timer
    };

    return (
        <div
            className="container"
            style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
        >
            {errorMessage && (
                <div className="notification is-danger">
                    {errorMessage}
                    <button
                        className="delete"
                        onClick={clearErrorMessage}
                    ></button>
                    <div className="timer-container">
                        <div
                            className="timer-progress"
                            style={{ width: `${timer}%` }}
                        ></div>
                    </div>
                </div>
            )}
            <form onSubmit={handleSubmit} className="box">
                <div className="field">
                    <label className="label">Username</label>
                    <input
                        className="input"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                    />
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <input
                        className="input"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                </div>

                <div className="field">
                    <label className="label">Full Name</label>
                    <input
                        className="input"
                        type="text"
                        name="name"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        required
                    />
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <input
                        className="input"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                </div>

                <div className="field">
                    <label className="label">Confirm Password</label>
                    <input
                        className="input"
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        required
                    />
                </div>

                <div className="field">
                    <label className="checkbox">
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        {` Show Password`}
                    </label>
                </div>

                <div className="field">
                    <button type="submit" className="button is-primary">
                        Sign Up
                    </button>
                </div>
            </form>
            <p className="mt-4">
                Already signed up?{" "}
                <a href="/login" className="has-text-primary">
                    Login
                </a>
            </p>
        </div>
    );
}

export default Register;
