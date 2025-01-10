import Comment from "../models/comment.model.js";

const addComment = async (req, res) => {
  const { content, userId, postId } = req.body;

  if (userId !== req.user.id) {
    return res.status(400).json("You are not allowed to add this comment");
  }
  const newComment = new Comment({
    content,
    userId,
    postId,
  });

  await newComment.save();
  return res.status(200).json(newComment);
};

export default addComment;
