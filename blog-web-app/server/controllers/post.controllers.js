import Post from "../models/post.model.js";

const createPost = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json("You are not allowed to create a post");
  }
  if (!req.body.title || !req.body.content) {
    return res.status(400).json("All fields are required");
  }
  let slug = req.body.title
    .split(" ")
    .join(" ")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, " ")
    .replace(/\s+/g, "-");

  // console.log(slug);
  if (slug.endsWith("-")) {
    slug = slug.slice(0, -1);
  }
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export default createPost;
