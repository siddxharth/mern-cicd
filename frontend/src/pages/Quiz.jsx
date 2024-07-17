import { useCallback, useEffect, useState } from "react";
import api from "../utils/api";
import { useParams } from "react-router-dom";

export default function Quiz() {
    const [quiz, setQuiz] = useState(null);
    const { id } = useParams();
    const [submission, setSubmission] = useState([]);

    const handleOptionChange = (question_id, event) => {
        const friend_id = event.target.value;
        if (friend_id === null) {
            const updatedSubmission = submission.filter(
                (item) => item.question_id === question_id
            );
            submission.removeByValue;
        } else {
            const updatedSubmission = submission.filter(
                (item) => item.question_id !== question_id
            );
            updatedSubmission.push({ question_id, friend_id });
            setSubmission(updatedSubmission);
        }
    };

    const handleSubmit = () => {
        if (submission.length !== quiz.questions.length) {
            alert("Please answer all questions.");
        }
        console.log({ submission });
    };

    const fetchQuiz = useCallback(async () => {
        try {
            const response = await api.get(`/quiz/${id}`);
            setQuiz(response.data.quiz);
            console.log(response.data.quiz);
        } catch (error) {
            console.error(error);
            return;
        }
    }, [id]);

    useEffect(() => {
        fetchQuiz();
    }, [fetchQuiz]);

    return (
        <section className="section">
            <div className="container">
                <h1 className="title has-text-centered">Quiz</h1>
                {quiz ? (
                    <div className="box">
                        <div className="content">
                            {quiz.questions?.map((question) => (
                                <div key={question._id} className="mb-5">
                                    <p className="subtitle">
                                        {question.question}
                                    </p>
                                    <div className="control">
                                        <div className="select is-fullwidth">
                                            <select
                                                key={question._id}
                                                onChange={(event) =>
                                                    handleOptionChange(
                                                        question._id,
                                                        event
                                                    )
                                                }
                                            >
                                                <option value={null}>
                                                    Select an option
                                                </option>
                                                {quiz.friends?.map((friend) => (
                                                    <option
                                                        key={friend._id}
                                                        value={friend._id}
                                                    >
                                                        {friend.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            className="button is-primary"
                            onClick={() => handleSubmit()}
                        >
                            Submit Your Response
                        </button>
                    </div>
                ) : (
                    <div className="notification is-danger has-text-centered">
                        Unable to fetch quiz.
                    </div>
                )}
            </div>
        </section>
    );
}
