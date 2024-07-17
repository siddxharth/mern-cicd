const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const router = express.Router();

const questions = require("./questions");
const mongoose = require("mongoose");
const User = require("./models/User");
const Quiz = require("./models/Quiz");
const Question = require("./models/Question");
const Friend = require("./models/Friend");

const authenticateToken = require("./middleware/auth");

const insertQuestions = async () => {
    try {
        for (const questionText of questions) {
            const question = new Question({ question: questionText });
            await question.save();
        }

        console.log("All questions have been inserted into the database.");
    } catch (error) {
        console.error("Error inserting questions into the database", error);
    }
};

app.use(
    cors({
        origin: "*",
    })
);
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI);

insertQuestions();

router.post("/login", async (req, res) => {
    const body = req.body;
    if (!body.email || !body.password) {
        return res.send({ error: "Email and Password are required." });
    }
    try {
        // Check if user exists or not
        const user = await User.findOne({ email: body.email }).exec();
        if (!user) {
            return res.send({ error: "User not found." });
        }
        // Check if password is valid
        const validPassword = await bcrypt.compare(
            body.password,
            user.password
        );
        if (!validPassword) {
            return res.send({ message: "Incorrect password." });
        }
        // Generate jwt token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        return res.send({ token: token, user: user });
    } catch (error) {
        return res.send({ error: error.message });
    }
});

router.post("/register", async (req, res) => {
    const body = req.body;
    const duplicate = await User.findOne({ email: body.email }).exec();
    if (duplicate) {
        const token = jwt.sign({ _id: duplicate._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        return res.send({
            error: "User already exists.",
            user: duplicate,
            token,
        });
    } else {
        try {
            const hashedPassword = await bcrypt.hash(body.password, 10);
            const result = await User.create({
                name: body.name,
                email: body.email,
                password: hashedPassword,
            });
            const token = jwt.sign(
                { _id: result._id },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h",
                }
            );
            return res.send({
                message: "New user created.",
                token: token,
                user: result,
            });
        } catch (error) {
            return res.send({ error: error.message });
        }
    }
});

router.post("/delete", authenticateToken, async (req, res) => {
    const body = req.body;
    if (!body.email || !body.password) {
        return res.send({ error: "Email and password are required." });
    }
    const user = await User.findOne({ email: body.email }).exec();
    if (!user) res.send({ error: "User not found." });
    else {
        try {
            // check if password is correct
            const match = await bcrypt.compare(body.password, user.password);
            if (!match) {
                return res.send({ error: "Incorrect password." });
            } else {
                const result = await User.deleteOne({
                    email: body.email,
                }).exec();
                return res.send({ message: "User deleted.", result });
            }
        } catch (error) {
            return res.send({ error: error.message });
        }
    }
});

// router.post("/quiz", authenticateToken, async (req, res) => {
//     try {
//         const body = req.body;
//         if (!body.title || !body.creator || !body.questions) {
//             return res.send({
//                 error: "Title, creator, and questions are required.",
//             });
//         }
//         const duplicate = await Quiz.findOne({
//             questions: body.questions,
//             creator: body.creator,
//         }).exec();
//         if (duplicate) {
//             return res.send({
//                 error: "Similar quiz already exists with exactly same questions.",
//             });
//         }
//         try {
//             const result = await Quiz.create({
//                 title: body.title,
//                 creator: body.creator,
//                 questions: body.questions,
//             });
//             return res.send({ message: "New quiz created.", result });
//         } catch (error) {
//             return res.send({ error: error.message });
//         }
//     } catch (error) {
//         return res.send({ error: error.message });
//     }
// });

// async function getRandomQuestions(count) {
//     try {
//         // Use the aggregate method with $sample to fetch random documents
//         const randomQuestions = await Question.aggregate([
//             { $sample: { size: count } },
//         ]);
//         return randomQuestions;
//     } catch (error) {
//         console.error("Error fetching random questions:", error);
//         return [];
//     }
// }

async function getRandomQuestions(count) {
    const questions = await Question.aggregate([
        { $sample: { size: count } },
    ]).exec();
    return questions;
}

async function insertFriends(friends) {
    try {
        const friendsArray = [];
        for (const friendName of friends) {
            const friend = await Friend.create({ name: friendName });
            friendsArray.push(friend._id);
        }
        return friendsArray;
    } catch (error) {
        console.error(
            "Error occured while inserting friends into database.",
            error
        );
        return;
    }
}

router.post("/newquiz", async (req, res) => {
    const { creator, title, description, questionCount, friends } = req.body;
    const count = Number(questionCount);
    if (isNaN(count)) {
        return res
            .status(400)
            .send({ error: "questionCount must be a number" });
    }
    const randomQuestions = await getRandomQuestions(count);
    const friendsArray = await insertFriends(friends);

    try {
        const quiz = await Quiz.create({
            creator: creator,
            title: title,
            description: description,
            questions: randomQuestions,
            friends: friendsArray,
        });
        res.send({ message: "Quiz created!", quiz });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

// List all quizzes of 'creator' user
router.post("/quizzes", async (req, res) => {
    const { creator } = req.body;
    const quizzes = await Quiz.find({ creator: creator })
        .populate([
            { path: "questions", select: "question" },
            { path: "friends", select: "name" },
        ])
        .exec();
    console.log(quizzes);
    return res.send(quizzes);
});

// fetch quiz
router.get("/quiz/:id", async (req, res) => {
    try {
        const id = req.params["id"];
        const quiz = await Quiz.findOne({ _id: id }).populate([
            { path: "questions", select: "question" },
            { path: "friends", select: "name" },
        ]);
        if (quiz) {
            return res.send({ message: "Quiz found.", quiz });
        } else {
            return res.send({ message: "Quiz not found." });
        }
    } catch (error) {
        if (error.message.includes("Cast to ObjectId failed for value")) {
            return res.send({ error: "Invalid quiz id." });
        }
        return res.send({ error: error.message });
    }
});

// // make a submission of a quiz by a friend
// router.post("/submit", async (req, res) => {
//     const { quizId, friendId, answers } = req.body;
//     const

// Insert a question
router.post("/question", async (req, res) => {
    const body = req.body;
    if (!body.question) {
        return res.send({ error: "Question title is required." });
    }
    const duplicate = await Question.findOne({
        question: body.question,
    }).exec();
    if (duplicate) {
        return res.send({ error: "Question already exists." });
    }
    try {
        const result = await Question.create({
            question: body.question,
        });
        return res.send({ message: "Question created.", result });
    } catch (error) {
        return res.send({ error: error.message });
    }
});

app.use("/api/v1/", router);

app.listen(process.env.PORT, () => {
    console.log(process.env.MONGODB_URI);
    console.log(`Server running on port ${process.env.PORT}`);
});
