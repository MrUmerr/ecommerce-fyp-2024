import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai"; // Import delete icon from react-icons

const CommentSection = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    const usersData = localStorage.getItem("Users");
    if (usersData) {
      try {
        const parsedData = JSON.parse(usersData);
        if (parsedData.fullname) {
          setUserName(parsedData.fullname);
        }
      } catch (error) {
        console.error("Error parsing localStorage Users data:", error);
      }
    }

    // Fetch comments from the backend
    axios
      .get("http://localhost:4001/api/comments")
      .then((response) => setComments(response.data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = { userName, comment };

      // Save comment to backend
      axios
        .post("http://localhost:4001/api/comments", newComment)
        .then((response) => {
          setComments([...comments, response.data]);
          setComment("");
        })
        .catch((error) => console.error("Error saving comment:", error));
    }
  };

  const handleDeleteComment = (id) => {
    // Delete comment from backend
    axios
      .delete(`http://localhost:4001/api/comments/${id}`)
      .then(() => {
        setComments(comments.filter((comment) => comment._id !== id));
      })
      .catch((error) => console.error("Error deleting comment:", error));
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-16 px-2 dark:bg-slate-900 dark:text-white">
      <h2 className="text-xl font-semibold mb-4 mt-8 md:ml-72">Leave a Comment</h2>
      <form className="space-y-4" onSubmit={handlePostComment}>
        <div className="flex justify-center">
          <textarea
            id="comment"
            placeholder="Write your comment here..."
            rows="4"
            value={comment}
            onChange={handleCommentChange}
            className="w-full max-w-md px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-950"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full max-w-md bg-pink-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-pink-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            Post Comment
          </button>
        </div>
      </form>

      <div className="mt-8 space-y-4">
        {comments.map((commentItem) => (
          <div key={commentItem._id} className="p-4 bg-gray-100 rounded-lg dark:bg-slate-700 flex justify-between items-center">
            <div>
              <p className="font-semibold text-sm text-gray-800 dark:text-white">
                {commentItem.userName}
              </p>
              <p className="text-sm text-gray-800 dark:text-white">{commentItem.comment}</p>
            </div>
            <button
              onClick={() => handleDeleteComment(commentItem._id)}
              className="text-red-500 hover:text-red-700"
            >
              <AiOutlineDelete size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
