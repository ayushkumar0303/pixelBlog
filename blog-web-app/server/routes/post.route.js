import express from "express";
import verifyToken from "../utils/verifyUser.js";
import createPost, {
  deletePost,
  getPosts,
} from "../controllers/post.controllers.js";

const postRouter = express.Router();

postRouter.post("/create-post", verifyToken, createPost);
postRouter.get("/get-posts", getPosts);
postRouter.get("/delete-post/:postId/:userId", verifyToken, deletePost);

export default postRouter;
