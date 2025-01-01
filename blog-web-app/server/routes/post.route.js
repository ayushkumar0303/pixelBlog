import express from "express";
import verifyToken from "../utils/verifyUser.js";
import createPost, { getPosts } from "../controllers/post.controllers.js";

const postRouter = express.Router();

postRouter.post("/create-post", verifyToken, createPost);
postRouter.get("/get-posts", getPosts);

export default postRouter;
