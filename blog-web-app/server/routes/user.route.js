import express from "express";
import userTest, {
  deleteUser,
  updateUser,
  userSignOut,
} from "../controllers/user.controller.js";
import verifyToken from "../utils/verifyUser.js";

const userRouter = express.Router();

userRouter.get("/test", userTest);
userRouter.put("/update/:userId", verifyToken, updateUser);
userRouter.delete("/delete/:userId", verifyToken, deleteUser);
userRouter.post("/sign-out", userSignOut);

export default userRouter;
