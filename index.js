const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const User = require("./User.model.js");
const cors = require("cors");

dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

(async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("Connected to database with :", connection.connection.host);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Failed to connect to database", error);
    process.exit(1);
  }
})();

app.get("/", (req, res) => {
  res.send("Welcome to the Bookmark API");
})
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json({ user, message: "User logged in successfully" });
    } else {
      res
        .status(404)
        .json({ error: "User not found", message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/bookmark", async (req, res) => {
  try {
    const { email, bookmark } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      if (
        !bookmark.title ||
        !bookmark.url ||
        !bookmark.discription ||
        !bookmark.id ||
        !bookmark.logo
      ) {
        return res.status(400).json({ error: "Bookmark model is invalid" });
      }
      const existingBookmark = user.bookmarks.find((b) => b.id === bookmark.id);
      if (existingBookmark) {
        Object.assign(existingBookmark, bookmark);
      } else {
        user.bookmarks.push(bookmark);
      }
      await user.save();
      res.status(201).json({ user });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/bookmarks", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json({ bookmarks: user.bookmarks });
    } else {
      res.status(404).json({ error: "User not found" });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

