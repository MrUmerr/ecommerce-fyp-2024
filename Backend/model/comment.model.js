import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  comment: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
