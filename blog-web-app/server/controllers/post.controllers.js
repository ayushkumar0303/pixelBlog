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

export const getPosts = async (req, res) => {
  console.log(req);
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    console.log(startIndex);
    console.log(limit);
    console.log(sortDirection);

    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();
    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: {
        $gte: oneMonthAgo,
      },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export default createPost;
