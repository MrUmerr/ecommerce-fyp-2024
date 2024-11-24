import express from "express";
import Comment from "../model/comment.model.js";

const router = express.Router();

// Get all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
});

// Post a new comment
router.post("/", async (req, res) => {
  const { userName, comment } = req.body;
  try {
    const newComment = new Comment({ userName, comment });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Error saving comment", error });
  }
});

// Delete a comment by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully", id });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
});

export default router;
