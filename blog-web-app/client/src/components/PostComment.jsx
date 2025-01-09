import { Button, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function PostComment({ postId }) {
  // console.log(postId);
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const handleSubmitComment = async (e) => {
    e.preventDefault();
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
            placeholder="Write your comment..."
            rows="3"
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-between items-center w-full">
            <p>{200 - comment.length} characters remaining</p>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default PostComment;
