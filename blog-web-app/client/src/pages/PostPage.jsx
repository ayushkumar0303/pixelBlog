import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function PostPage() {
  const { postSlug } = useParams();
  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(
          `http://localhost:3000/server/post/get-posts?slug=${postSlug}`
        );
        const data = await res.json();
        // console.log(data);
        if (res.ok) {
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postSlug]);

  return <div>PostPage</div>;
}

export default PostPage;
