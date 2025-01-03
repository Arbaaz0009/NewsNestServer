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
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
} );