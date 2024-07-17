import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function Home() {
    const { user, logoutUser } = useContext(AuthContext);
    return (
        <div className="container">
            <h1 className="title is-1 is-capitalized has-text-centered">
                Welcome to Quiz App!
            </h1>
            {user ? (
                <div>
                    <div className="container">
                        <a
                            className="button is-primary"
                            style={{ marginRight: "10px" }}
                            href="/newquiz"
                        >
                            Create New Quiz
                        </a>
                        <a
                            className="button is-primary is-light"
                            style={{ marginRight: "10px" }}
                            href="/quizzes"
                        >
                            View Quizzes
                        </a>
                        <a
                            className="button is-danger is-light"
                            style={{ marginRight: "10px" }}
                            onClick={() => logoutUser()}
                        >
                            Logout User
                        </a>
                    </div>
                </div>
            ) : (
                <div className="has-text-centered">
                    Please login to your account to be able to create new quiz
                    dashboards.
                    <div style={{ marginTop: "100px" }}>
                        <a
                            className="button is-primary"
                            href="/login"
                            style={{ marginRight: "10px" }}
                        >
                            Login
                        </a>
                        <a
                            className="button is-primary is-light"
                            href="/register"
                            style={{ marginRight: "10px" }}
                        >
                            Register
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
