import React, { useEffect, useState } from "react";
// import { Parser } from "html-react-parser";
import { useParams } from "react-router-dom";

function PostPage() {
  const { postSlug } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(
          `http://localhost:3000/server/post/get-posts?slug=${postSlug}`
        );
        const data = await res.json();
        console.log(data.posts[0].content);
        setPost(data.posts[0]);
        if (res.ok) {
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postSlug]);

  return (
    <main>
      <div>{post && post.title}</div>
      <div>{post && post.category}</div>
      <div>
        <img src={post && post.postImage} alt="" />
      </div>
      <div dangerouslySetInnerHTML={{ __html: post && post.content }}></div>;
    </main>
  );
}
export default PostPage;
