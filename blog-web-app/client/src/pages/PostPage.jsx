import { Badge } from "flowbite-react";
import React, { useEffect, useState } from "react";
// import { Parser } from "html-react-parser";
import { useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostComment from "../components/PostComment";

function PostPage() {
  const { postSlug } = useParams();
  const [post, setPost] = useState(null);

  // console.log(post);
  useEffect(() => {
    const makeAbsoluteUrl = (content) => {
      const baseUrl = "https://";
      return content.replace(/<a\s+href="(?!https?)([^"]+)"/g, (match, url) => {
        return `<a href="${baseUrl}${url}"`;
      });
    };
    try {
      const fetchPost = async () => {
        const res = await fetch(
          `http://localhost:3000/server/post/get-posts?slug=${postSlug}`
        );
        const data = await res.json();
        // console.log(data.posts[0].content);

        if (res.ok) {
          const updatedContent = makeAbsoluteUrl(data.posts[0].content);
          setPost({ ...data.posts[0], content: updatedContent });
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postSlug]);

  return (
    <main className="flex flex-col items-center my-4 gap-5 w-full">
      <div className="font-serif text-center text-2xl lg:text-4xl ">
        {post && post.title.charAt(0).toUpperCase() + post.title.slice(1)}
      </div>
      <Badge color="gray" className="">
        {post && post.category}
      </Badge>
      <div className="border-b-2 border-slate-300 w-2/3 flex flex-col">
        <img
          src={post && post.postImage}
          alt=""
          className="w-5/6 min-w-96 h-[450px] object-cover self-center "
        />
        <div className="flex justify-between my-2 text-xs">
          <span>{new Date(post && post.updatedAt).toLocaleDateString()}</span>
          <span className="italic">{`${
            post && parseInt(post.content.length / 1000)
          } mins read `}</span>
        </div>
      </div>
      <div
        className="content_class p-3 mx-auto max-w-2xl"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>

      <PostComment postId={post && post._id} />
    </main>
  );
}
export default PostPage;
