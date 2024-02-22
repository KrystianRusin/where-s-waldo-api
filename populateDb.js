const mongoose = require("mongoose");
const Target = require("./models/target");

// Load environment variables
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the initial data
const targets = [
  {
    difficulty: "Hard",
    targetName: "Waldo",
    x: 43.03353390355874,
    y: 75.60130649142795,
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

Target.insertMany(targets)
  .then(() => {
    console.log("Successfully inserted initial data into the database");
    // Close the database connection
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(err);
    // Close the database connection
    mongoose.connection.close();
  });
