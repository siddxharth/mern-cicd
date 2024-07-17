import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import AuthProvider from "./AuthContext";
import User from "./pages/User";
import Dashboard from "./pages/Dashboard";
import NewQuiz from "./pages/NewQuiz";
import Quizzes from "./pages/Quizzes";
import Quiz from "./pages/Quiz";

import PrivateRoute from "./components/PrivateRoute";

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/user"
                        element={<PrivateRoute element={User} />}
                    />
                    <Route
                        path="/dashboard"
                        element={<PrivateRoute element={Dashboard} />}
                    />
                    <Route path="/newquiz" element={<NewQuiz />} />
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/quizzes"
                        element={<PrivateRoute element={Quizzes} />}
                    />
                    <Route
                        path="/quiz/:id"
                        element={<PrivateRoute element={Quiz} />}
                    />
                    <Route element={<>Not Found</>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}
