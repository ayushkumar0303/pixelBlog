import express from "express";
import addComment, {
  getComments,
  likeComment,
} from "../controllers/comment.controller.js";
import verifyToken from "../utils/verifyUser.js";

const commentRouter = express.Router();

commentRouter.post("/add-comment", verifyToken, addComment);
commentRouter.get("/get-comments/:postId", getComments);
commentRouter.put("/like-comment/:commentId", verifyToken, likeComment);

export default commentRouter;
