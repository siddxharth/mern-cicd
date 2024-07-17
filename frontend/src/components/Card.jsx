import React from "react";

const Card = ({ quiz, isExpanded, toggleExpand }) => {

    return (
        <div
            className="card"
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
            <header className="card-header">
                <div
                    className="card-header-title"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                    }}
                >
                    {quiz.title}
                    <div style={{ fontSize: "0.75rem", color: "grey" }}>
                        {quiz.createdAt}
                    </div>
                </div>
            </header>
            <div className="card-content" style={{ flexGrow: 1 }}>
                <div className="content">
                    {quiz.description.length > 100 ? (
                        checkIsExpanded(quiz.id) ? (
                            <span>
                                {quiz.description}{" "}
                                <b
                                    style={{
                                        cursor: "pointer",
                                        whiteSpace: "nowrap",
                                    }}
                                    onClick={() => toggleExpand(quiz.id)}
                                >
                                    less
                                </b>
                            </span>
                        ) : (
                            <span>
                                {`${quiz.description.substring(0, 100)}...`}{" "}
                            </span>
                        )
                    ) : (
                        quiz.description
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;