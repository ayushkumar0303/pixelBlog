import express from "express";
import addComment from "../controllers/comment.controller.js";
import verifyToken from "../utils/verifyUser.js";

const commentRouter = express.Router();

commentRouter.post("/add-comment", verifyToken, addComment);

export default commentRouter;
