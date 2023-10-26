import express from "express";
import myName from "./models/Name.js";

const app = express();
const port = 3000;

// incoming request -> sendind response
app.get("/", (req, res) => {
  console.log(req);
  res.send("Hello World!");
});

app.get("/getmyname", (req, res) => {
  res.json(myName);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
