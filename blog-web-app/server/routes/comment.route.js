import express from "express";
import addComment, {
  deleteComment,
  editComment,
  getComments,
  likeComment,
} from "../controllers/comment.controller.js";
import verifyToken from "../utils/verifyUser.js";

const commentRouter = express.Router();

commentRouter.post("/add-comment", verifyToken, addComment);
commentRouter.get("/get-comments/:postId", getComments);
commentRouter.put("/like-comment/:commentId", verifyToken, likeComment);
commentRouter.delete("/delete-comment/:commentId", verifyToken, deleteComment);
commentRouter.put("/edit-comment/:commentId", verifyToken, editComment);

export default commentRouter;
