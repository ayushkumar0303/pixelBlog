import express from "express";
import verifyToken from "../utils/verifyUser.js";
import createPost from "../controllers/post.controllers.js";

const postRouter = express.Router();

postRouter.post("/create-post", verifyToken, createPost);

export default postRouter;
