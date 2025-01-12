import { Button, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";

function GetComments({
  comment,
  handleLikeComment,
  handleDeleteComment,
  handleEditedComment,
}) {
  const [user, setUser] = useState("");
  const [editComment, setEditComment] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  // console.log(comment);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    try {
      const fetchUser = async () => {
        const res = await fetch(
          `http://localhost:3000/server/user/get-user/${comment.userId}`
        );
        const data = await res.json();
        // console.log(data);
        if (res.ok) {
          setUser(data);
        }
      };
      fetchUser();
    } catch (error) {
      console.log(error.message);
    }
  }, [comment]);
  const handleEditComment = () => {
    setEditComment(true);
  };
  return (
    <div className="border-b p-3 my-3 rounded-sm">
      <div className="flex gap-2">
        <img
          src={user.profilePicture}
          className="w-10 h-10 rounded-full"
          alt=""
        />
        <div className=" flex flex-col gap-1 w-full">
          <p className="text-xs font-extralight">@{user.username}</p>
          {editComment ? (
            <>
              <Textarea
                className="font-light w-full"
                placeholder="Write your comment..."
                rows="3"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <div className="flex justify-end gap-3">
                <Button
                  onClick={() => handleEditedComment(comment._id, editComment)}
                  pill
                >
                  Submit
                </Button>
                <Button outline pill onClick={() => setEditComment(false)}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="font-light">{comment.content}</div>
              <div className="flex font-extralight gap-2 mt-4 text-sm items-center">
                <button
                  type="button"
                  onClick={() => handleLikeComment(comment._id)}
                >
                  <BiSolidLike
                    className={`text-2xl cursor-pointer ${
                      currentUser &&
                      comment.likes.includes(currentUser._id) &&
                      "text-blue-600"
                    }`}
                  />
                </button>
                {comment.likesCount !== 0 && <p>{comment.likesCount} Likes</p>}
                {currentUser &&
                  (currentUser.isAdmin || currentUser._id === user._id) && (
                    <>
                      <button
                        type="button"
                        className="hover:underline hover:text-green-600"
                        onClick={handleEditComment}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteComment(comment._id)}
                        className="hover:underline hover:text-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default GetComments;
