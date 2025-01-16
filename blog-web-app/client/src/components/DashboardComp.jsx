import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [oneMonthAgoUsers, setOneMonthAgoUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [oneMonthAgoPosts, setOneMonthAgoPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const [oneMonthAgoComments, setOneMonthAgoComments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const res = await fetch(`http://localhost:3000/server/post/get-posts`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setOneMonthAgoPosts(data.oneMonthAgoPosts);
        }
      };
      const fetchUsers = async () => {
        const res = await fetch(`http://localhost:3000/server/user/get-users`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setOneMonthAgoUsers(data.oneMonthAgoUsers);
        }
      };
      const fetchComments = async () => {
        const res = await fetch(
          `http://localhost:3000/server/comment/get-all-comments`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setOneMonthAgoComments(data.oneMonthAgoComments);
        }
      };

      fetchComments();
      fetchPosts();
      fetchUsers();
    } catch (error) {
      console.log(error.message);
    }
  }, [currentUser]);
  return (
    <div>
      <div>
        <div>
          <h5>{users.length}</h5>
        </div>
      </div>
    </div>
  );
}

export default DashboardComp;
