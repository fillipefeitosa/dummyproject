import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
// local imports
import myName from "./models/Name.js";
import { dbConfig } from "./config/database.config.js";
import UserRoutes from "./routes/UserRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/user", UserRoutes);
// serve fronted files
const __dirname = fileURLToPath(new URL(".", import.meta.url));
app.use(express.static(path.join(__dirname, "../frontend")));

// Mongoose Configuration
mongoose.Promise = global.Promise;

// Connecting to the database
async function connectToDatabase() {
  try {
    await mongoose.connect(dbConfig.url, {
      useNewUrlParser: true,
    });
    console.log("Successfully connected to the database");
  } catch (error) {
    console.log("Could not connect to the database. Exiting now...", error);
    process.exit();
  }
}

connectToDatabase();

// incoming request -> sendind response

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.get("/getmyname", (req, res) => {
  res.json(myName);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
