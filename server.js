const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Target = require("./models/target");
const LeaderBoard = require("./models/leaderBoard");
const dotenv = require("dotenv");

require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_CONNECT),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const targets = [
  {
    difficulty: "Hard",
    targetName: "Waldo",
    x: 43.03353390355874,
    y: 75.60130649142795,
  },
  {
    difficulty: "Hard",
    targetName: "Wizard Whitebeard",
    x: 65.74224247704578,
    y: 77.91666666666667,
  },
  {
    difficulty: "Harder",
    targetName: "Waldo",
    x: 57.02335053932669,
    y: 35.96223725212945,
  },
  {
    difficulty: "Harder",
    targetName: "Wizard Whitebeard",
    x: 84.92438151352493,
    y: 85.49050225151909,
  },
  {
    difficulty: "Hardest",
    targetName: "Waldo",
    x: 17.981867242877357,
    y: 66.13562266031902,
  },
  {
    difficulty: "Hardest",
    targetName: "Wizard Whitebeard",
    x: 95.76428692854003,
    y: 76.88471476236978,
  },
  // Add more targets as needed
];

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", async function () {
  console.log("Connected to MongoDB");

  try {
    const count = await Target.countDocuments({});
    if (count === 0) {
      // If the database is empty, insert the initial data
      try {
        await Target.insertMany(targets);
        console.log("Successfully inserted initial data into the database");
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("Database is not empty. Initial data was not inserted.");
    }
  } catch (err) {
    console.error(err);
  }
});

app.get("/targets", async (req, res) => {
  try {
    const targets = await Target.find();
    res.json(targets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/checkTarget", async (req, res) => {
  console.log("Check Target" + req.query.difficulty + req.query.targetName);
  try {
    const target = await Target.findOne({
      difficulty: req.query.difficulty,
      targetName: req.query.targetName,
    });
    if (target) {
      res.json({ x: target.x, y: target.y });
    } else {
      res.status(404).json({ message: "Target not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/leaderboard", async (req, res) => {
  try {
    const difficulty = req.query.difficulty;
    let leaderBoard;
    if (difficulty) {
      leaderBoard = await LeaderBoard.find({ difficulty }).sort({ time: 1 });
    } else {
      leaderBoard = await LeaderBoard.find().sort({ time: 1 });
    }
    res.json(leaderBoard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/leaderboard", async (req, res) => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const leaderBoard = new LeaderBoard({
    name: req.body.name,
    time: req.body.time,
    difficulty: req.body.difficulty,
    date: formattedDate,
  });
  console.log(leaderBoard);
  try {
    const newLeaderBoard = await leaderBoard.save();
    res.status(201).json(newLeaderBoard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(port, "0.0.0.0", () =>
  console.log(`Server started at port ${port}`)
);
