import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";

import api from "../utils/api";

export default function Quizzes() {
    const [quizzes, setQuizzes] = useState([]);
    const { user } = useContext(AuthContext);

    const fetchQuizzes = useCallback(async () => {
        const response = await api.post("/quizzes", { creator: user._id });
        setQuizzes(response.data);
    }, [user._id]);

    useEffect(() => {
        fetchQuizzes();
    }, [fetchQuizzes]);

    return (
        <section className="section">
            <div>
                <h1 className="title is-3">View Quizzes</h1>
                <p>
                    Showing all quizzes for <b>{user.name}</b>
                </p>
            </div>
            <div className="container">
                {quizzes.length > 0 ? (
                    quizzes.map((quiz) => (
                        <div key={quiz._id} className="card quiz-card">
                            <div className="card-content">
                                <div
                                    className="quiz-header"
                                    style={{ marginBottom: "10px" }}
                                >
                                    <p className="title is-4 quiz-title">
                                        {quiz.title}
                                    </p>
                                    <p className="subtitle is-6 quiz-description">
                                        {quiz.description}
                                    </p>
                                </div>
                                <div className="buttons are-right">
                                    <div className="dropdown is-hoverable">
                                        <div className="dropdown-trigger">
                                            <button
                                                className="button"
                                                aria-haspopup="true"
                                                aria-controls="dropdown-menu"
                                            >
                                                <span>Show Questions</span>
                                                <span className="icon is-small">
                                                    <i
                                                        className="fas fa-angle-down"
                                                        aria-hidden="true"
                                                    ></i>
                                                </span>
                                            </button>
                                        </div>
                                        <div
                                            className="dropdown-menu"
                                            id="dropdown-menu"
                                            role="menu"
                                        >
                                            <div className="dropdown-content dropdown-content-scrollable">
                                                {quiz.questions.map(
                                                    (question) => (
                                                        <a
                                                            key={question._id}
                                                            className="dropdown-item"
                                                        >
                                                            {question.question}
                                                        </a>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dropdown is-hoverable">
                                        <div className="dropdown-trigger">
                                            <button
                                                className="button"
                                                aria-haspopup="true"
                                                aria-controls="dropdown-menu2"
                                            >
                                                <span>Show Friends</span>
                                            </button>
                                        </div>
                                        <div
                                            className="dropdown-menu"
                                            id="dropdown-menu2"
                                            role="menu"
                                        >
                                            <div className="dropdown-content dropdown-content-scrollable">
                                                {quiz.friends.map((friend) => (
                                                    <Link
                                                        key={friend._id}
                                                        className="dropdown-item"
                                                    >
                                                        {friend.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <Link
                                        className="button is-primary is-light"
                                        to={`/quiz/${quiz._id}`}
                                        // onClick={() => {
                                        //     console.log(quiz._id);
                                        // }}
                                        preventScrollReset={true}
                                        state={{ id: user._id }}
                                    >
                                        View Quiz
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="has-text-centered">No quizzes found.</div>
                )}
            </div>
        </section>
    );
}
