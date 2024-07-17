const quizzes = [
    {
        id: 1,
        title: "The Wonders of Space",
        description: "This is quiz one.",
        createdAt: "2023-04-01 10:00",
    },
    {
        id: 2,
        title: "The Depths of the Ocean",
        description: "Dive deep into the heart of the ocean.",
        createdAt: "2023-04-02 11:00",
    },
    {
        id: 3,
        title: "The Peaks of Everest",
        description:
            "Climb the highest peaks and conquer Mount Everest through this interactive quiz. Learn about the challenges climbers face and the triumph of reaching the summit.",
        createdAt: "2023-04-03 12:00",
    },
    {
        id: 4,
        title: "Mysteries of Ancient Egypt",
        description:
            "Unravel the secrets of the pyramids and the Sphinx in this intriguing quiz about ancient Egypt.",
        createdAt: "2023-03-25 14:30",
    },
    {
        id: 5,
        title: "The Art of Renaissance",
        description:
            "Explore the masterpieces and the artists who shaped the Renaissance era.",
        createdAt: "2023-02-17 09:45",
    },
    {
        id: 6,
        title: "Discovering Dinosaurs",
        description:
            "Step back in time to when dinosaurs roamed the Earth. Learn about their lives, habitats, and the theories behind their extinction.",
        createdAt: "2023-01-05 16:20",
    },
    {
        id: 7,
        title: "The Human Brain",
        description:
            "Dive into the complexities of the human brain, its functions, and its incredible capabilities.",
        createdAt: "2023-03-12 10:15",
    },
    {
        id: 8,
        title: "Exploring the Amazon Rainforest",
        description:
            "Embark on a virtual journey through the lush landscapes and diverse wildlife of the Amazon Rainforest.",
        createdAt: "2023-04-10 13:00",
    },
    {
        id: 9,
        title: "The Science of Happiness",
        description:
            "Discover what makes us happy and how science plays a role in understanding happiness.",
        createdAt: "2023-02-28 17:30",
    },
    {
        id: 10,
        title: "The World of Quantum Physics",
        description:
            "Enter the fascinating world of quantum physics and uncover the principles that govern the universe at the smallest scales.",
        createdAt: "2023-03-22 08:50",
    },
    {
        id: 11,
        title: "Ancient Civilizations",
        description:
            "Learn about the rise and fall of ancient civilizations and their contributions to modern society.",
        createdAt: "2023-01-18 12:00",
    },
    {
        id: 12,
        title: "The Marvels of Modern Architecture",
        description:
            "Explore the innovative designs and architectural wonders of the modern world.",
        createdAt: "2023-04-05 15:40",
    },
    {
        id: 13,
        title: "Understanding the Stock Market",
        description:
            "Demystify the complexities of the stock market and learn how it impacts the global economy.",
        createdAt: "2023-03-30 11:25",
    },
    {
        id: 14,
        title: "The Evolution of Video Games",
        description:
            "Trace the history of video games from their inception to the present day and their impact on culture and society.",
        createdAt: "2023-02-12 18:05",
    },
    {
        id: 15,
        title: "The Mysteries of the Deep Sea",
        description:
            "Plunge into the depths of the ocean to discover the mysterious creatures and ecosystems that lie beneath the surface.",
        createdAt: "2023-01-29 19:15",
    },
    {
        id: 16,
        title: "The Science of Cooking",
        description:
            "Explore the chemistry and physics behind cooking techniques and how they transform ingredients into delicious dishes.",
        createdAt: "2023-03-05 20:00",
    },
    {
        id: 17,
        title: "The History of the Internet",
        description:
            "Discover how the internet was created, its evolution over the years, and its role in connecting the world.",
        createdAt: "2023-04-02 07:30",
    },
    {
        id: 18,
        title: "The Fundamentals of Music Theory",
        description:
            "Learn the basics of music theory, from reading sheet music to understanding harmony and rhythm.",
        createdAt: "2023-02-20 16:45",
    },
    {
        id: 19,
        title: "The Wonders of the Solar System",
        description:
            "Journey through our solar system and learn about the planets, moons, and other celestial bodies that orbit our sun.",
        createdAt: "2023-03-15 12:10",
    },
    {
        id: 20,
        title: "The Basics of Photography",
        description:
            "Capture the world through the lens by learning the fundamentals of photography, including composition and lighting.",
        createdAt: "2023-01-10 14:55",
    },
    {
        id: 21,
        title: "The Impact of Climate Change",
        description:
            "Understand the causes of climate change, its impact on our planet, and what we can do to mitigate its effects.",
        createdAt: "2023-04-08 09:20",
    },
    {
        id: 22,
        title: "The Art of Filmmaking",
        description:
            "Dive into the process of filmmaking, from scriptwriting and directing to cinematography and editing.",
        createdAt: "2023-03-28 18:30",
    },
    {
        id: 23,
        title: "The Exploration of Mars",
        description:
            "Discover the missions that have explored Mars, the findings they have uncovered, and the plans for future colonization.",
        createdAt: "2023-02-05 13:45",
    },
    {
        id: 24,
        title: "The Secrets of Sleep",
        description:
            "Explore the science of sleep, why it's essential for our health, and the mysteries that still surround it.",
        createdAt: "2023-03-18 21:00",
    },
    {
        id: 25,
        title: "The Challenge of Mountaineering",
        description:
            "Experience the thrill and challenges of mountaineering, from famous peaks to the gear and preparation needed.",
        createdAt: "2023-04-11 08:15",
    },
];

import { useState } from "react";

const Dashboard = () => {
    const [expandedQuizzes, setExpandedQuizzes] = useState([]);

    const toggleExpand = (id) => {
        setExpandedQuizzes((prev) =>
            prev.includes(id)
                ? prev.filter((quizId) => quizId !== id)
                : [...prev, id]
        );
    };

    const isExpanded = (id) => expandedQuizzes.includes(id);

    return (
        <div className="container custom-container">
            <h1 className="title">Quiz Dashboard</h1>
            <div className="columns is-multiline">
                {quizzes.map((quiz) => (
                    <div key={quiz.id} className="column is-one-quarter">
                        <div
                            className="card"
                            style={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
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
                                    <div
                                        style={{
                                            fontSize: "0.75rem",
                                            color: "grey",
                                        }}
                                    >
                                        {quiz.createdAt}
                                    </div>
                                </div>
                            </header>
                            <div
                                className="card-content"
                                style={{ flexGrow: 1 }}
                            >
                                <div className="content">
                                    {quiz.description.length > 100 ? (
                                        isExpanded(quiz.id) ? (
                                            <span>
                                                {quiz.description}{" "}
                                                <b
                                                    style={{
                                                        cursor: "pointer",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                    onClick={() =>
                                                        toggleExpand(quiz.id)
                                                    }
                                                >
                                                    {" "}
                                                    less{" "}
                                                </b>
                                            </span>
                                        ) : (
                                            <span>
                                                {`${quiz.description.substring(
                                                    0,
                                                    100
                                                )}...`}{" "}
                                                <b
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                        toggleExpand(quiz.id)
                                                    }
                                                >
                                                    {" "}
                                                    more{" "}
                                                </b>
                                            </span>
                                        )
                                    ) : (
                                        <span>{quiz.description}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
