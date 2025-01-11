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

export const getComments = async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId }).sort({
    createdAt: -1,
  });
  return res.status(200).json(comments);
};

export const likeComment = async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);
  const userIndex = comment.likes.indexOf(req.user.id);
  if (userIndex == -1) {
    comment.likesCount += 1;
    comment.likes.push(req.user.id);
  } else {
    comment.likesCount -= 1;
    comment.likes.splice(userIndex, 1);
  }
  await comment.save();
  return res.status(200).json(comment);
};
export default addComment;
