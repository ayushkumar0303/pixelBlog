import { Button, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import GetComments from "./GetComments";

function PostComment({ postId }) {
  // console.log(postId);
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const getComments = async () => {
        const res = await fetch(
          `http://localhost:3000/server/comment/get-comments/${postId}`
        );
        const data = await res.json();
        if (res.ok) {
          setComments(data);
        }
      };

      getComments();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);
  // console.log(comment);
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3000/server/comment/add-comment
        `,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: comment,
            userId: currentUser._id,
            postId,
          }),
        }
      );

      const data = await res.json();
      // console.log(data);
      if (res.ok) {
        setComment("");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLike = async (commentId) => {
    if (!currentUser) {
      navigate("/signin");
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:3000/server/comment/like-comment/${commentId}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      const data = await res.json();

      if (res.ok) {
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  likesCount: data.likes.length,
                }
              : comment
          )
        );
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="max-w-2xl p-3 w-full mx-auto flex flex-col gap-3">
      {currentUser ? (
        <div className="flex gap-2">
          <p>Signed in as:</p>
          <img
            src={currentUser.profilePicture}
            className="w-5 h-5 object-cover rounded-full"
            alt=""
          />
          <Link
            className="text-cyan-500 hover:underline"
            to={`/dashboard/?tab=profile`}
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div>
          <p>you must signed in to comment</p>
          <Link className="text-blue-500" to="/signin">
            Sign in
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmitComment}
          className="w-full border flex flex-col gap-3 border-teal-500 rounded-md p-3"
        >
          <Textarea
            className="font-light"
            placeholder="Write your comment..."
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-between items-center w-full">
            <p>{200 - comment.length} characters remaining</p>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      )}
      {comments.length === 0 ? (
        <h1>No comments yet!</h1>
      ) : (
        <div className="">
          <p className="pb-3 my-2 border-b">
            Comments{" "}
            <span className="border border-gray-500 py-1 px-2 rounded-md">
              {comments.length}
            </span>
          </p>
          {comments.map((comment) => (
            <GetComments
              comment={comment}
              key={comment._id}
              handleLike={handleLike}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PostComment;
