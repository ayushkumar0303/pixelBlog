import { current } from "@reduxjs/toolkit";
import { Button, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);

  console.log(posts);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/server/post/get-posts?userId=${currentUser._id}`
        );
        // console.log(res);
        const data = await res.json();
        // console.log(data.posts[0]);
        if (res.ok) {
          setPosts(data.posts);
          // console.log(data.posts.length);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      getPosts();
    }
  }, [currentUser._id]);

  // console.log(posts);

  const handleShowMore = async () => {
    const startIndex = posts.length;
    try {
      const res = await fetch(
        `http://localhost:3000/server/post/get-posts?userId=${currentUser._id}&startIndex=${startIndex}`
      );

      const data = await res.json();

      if (res.ok) {
        setPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="mx-auto py-5">
      {currentUser.isAdmin && posts.length > 0 ? (
        <>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {posts.map((post) => (
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.postImage}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>{post.slug}</Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span className="text-red-500">Delete</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/update-post/${post._id}`}>
                      <span className="text-teal-500">Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-cyan-400 w-full self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <h1>There is no posts</h1>
      )}
    </div>
  );
}

export default DashPosts;
