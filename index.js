import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT;
// (async () => {
//   try {
//     const connection = await mongoose.connect(`${process.env.MONGODB_URI}`);
//     console.log("Connected to database with :", connection.connection.host);

//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.log("Failed to connect to database", error);
//     process.exit(1);
//   }
// })();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  state: {
    type: [{
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      logo: {
        type: String,
      },
      url: {
        type: String,
      },
      id: {
        type: String,
      },
    }],
    default: [],
  },
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({ message: "Login successful", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});



const User = mongoose.model("User", userSchema);

app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User({ name, email, password });

    const saveduser = await user.save();

    res.json({ message: "User created successfully", data: saveduser });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
