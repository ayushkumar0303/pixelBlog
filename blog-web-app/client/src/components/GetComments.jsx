import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";

function GetComments({ comment, handleLike }) {
  const [user, setUser] = useState("");
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
  return (
    <div className="border-b p-3 my-3 rounded-sm">
      <div className="flex gap-2">
        <img
          src={user.profilePicture}
          className="w-10 h-10 rounded-full"
          alt=""
        />
        <div className=" flex flex-col gap-1">
          <p className="text-xs font-extralight">@{user.username}</p>
          <div className="font-light">{comment.content}</div>
          <div className="flex font-extralight gap-2 mt-4 text-sm items-center">
            <p onClick={() => handleLike(comment._id)}>
              <BiSolidLike
                className={`text-2xl hover:text-blue-600 cursor-pointer ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "text-blue-600"
                }`}
              />
            </p>
            {comment.likesCount !== 0 && <p>{comment.likesCount} Likes</p>}
            {currentUser && currentUser._id === user._id && (
              <>
                <p>Edit</p>
                <p>Delete</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetComments;
