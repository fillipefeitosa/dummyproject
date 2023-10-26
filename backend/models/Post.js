import { mongoose } from "mongoose";

const postSchema = new mongoose.Schema({
  id: Number,
  title: String,
  body: String,
  tags: [],
  userId: Number,
  reactions: Number,
});

export default mongoose.model("Post", postSchema);
