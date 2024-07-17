import { useContext, useState } from "react";
import api from "../utils/api";
import { AuthContext } from "../AuthContext";
import { Navigate } from "react-router-dom";

export default function NewQuiz() {
    const [questionCount, setQuestionCount] = useState(5);
    const [friends, setFriends] = useState([""]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [quiz, setQuiz] = useState(null);
    const [toQuiz, setToQuiz] = useState(false);

    const { user } = useContext(AuthContext);
    const handleQuestionCountChange = (event) => {
        setQuestionCount(event.target.value);
    };

    const handleFriendNameChange = (index, event) => {
        const newFriends = [...friends];
        newFriends[index] = event.target.value;
        setFriends(newFriends);
    };

    const addFriendInput = () => {
        if (!friends.some((name) => name.trim() === "")) {
            setFriends([...friends, ""]);
        }
    };

    const removeFriendInput = (index) => {
        const newFriends = friends.filter((_, i) => i !== index);
        setFriends(newFriends);
    };

    const handleQuizCreation = async () => {
        try {
            const response = await api.post("/newquiz", {
                questionCount,
                friends,
                title,
                description,
                creator: user._id,
            });
            console.log("Quiz created:", response.data);
            setQuiz(response.data.quiz._id);
            console.log(response.data.quiz._id);
            setToQuiz(true);
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    if (toQuiz === true) {
        return <Navigate to={`/quiz/${quiz}`} />;
    }

    return (
        <div
            className="container"
            style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
        >
            <h2 className="title is-2">New Quiz</h2>
            <div className="field">
                <label className="label">Title:</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Quiz Title"
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Description:</label>
                <div className="control">
                    <textarea
                        className="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Quiz Description"
                    ></textarea>
                </div>
            </div>
            <div className="field">
                <label className="label">Number of Questions:</label>
                <div className="control">
                    <div className="select">
                        <select
                            value={questionCount}
                            onChange={handleQuestionCountChange}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={30}>30</option>
                        </select>
                    </div>
                </div>
            </div>
            {friends.map((name, index) => (
                <div className="field has-addons" key={index}>
                    <div className="control is-expanded">
                        <input
                            className="input"
                            type="text"
                            value={name}
                            onChange={(event) =>
                                handleFriendNameChange(index, event)
                            }
                            placeholder="Enter friend's name"
                        />
                    </div>
                    <div className="control">
                        <button
                            className="button is-danger"
                            onClick={() => removeFriendInput(index)}
                            disabled={friends.length === 1}
                        >
                            X
                        </button>
                    </div>
                </div>
            ))}
            <div className="field">
                <div className="control">
                    <button
                        className="button is-primary is-small"
                        onClick={addFriendInput}
                    >
                        Add Another
                    </button>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button
                        className="button is-link"
                        onClick={handleQuizCreation}
                    >
                        Create Quiz
                    </button>
                </div>
            </div>
        </div>
    );
}
