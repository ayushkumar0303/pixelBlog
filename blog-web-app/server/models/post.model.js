import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    postImage: {
      type: String,
      default:
        "https://th.bing.com/th/id/R.4760074a2b0d3f86433bf8df7114501a?rik=NsTrWai8rG8h%2bg&riu=http%3a%2f%2fimages.huffingtonpost.com%2f2016-06-28-1467153097-7249060-Blogpost.jpg&ehk=tCzpaH2JjooCVbx8ck7WEuId1orNNifd0hVjicKHd7c%3d&risl=&pid=ImgRaw&r=0",
    },
    slug: {
      type: String,
      unique: true,
    },
    category: {
      type: String,
      default: "uncategorized",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
