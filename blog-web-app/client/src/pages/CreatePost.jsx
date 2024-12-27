import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FileInput,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { storage } from "../appwrite";

function CreatePost() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(null);
  const handleUploadImage = async () => {
    setImageUploading(true);
    try {
      setImageUploadError(null);
      const res = await storage.createFile(
        "67617c820013b8a60ec7",
        "unique()",
        image
      );

      if (res && res.$id) {
        const getFileURL = storage.getFileView("67617c820013b8a60ec7", res.$id);
        setImageUrl(getFileURL);
      }
    } catch (error) {
      console.log(error.message);
      setImageUploadError(error.message);
    }
    setImageUploading(false);
  };

  // console.log(imageUrl);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // console.log(file);
    if (file) {
      setImage(file);
      // setImageUrl(URL.createObjectURL(file));
    }
  };
  // console.log(image);
  // console.log(imageUrl);
  return (
    <div className="p-3 min-h-screen max-w-3xl mx-auto">
      <h1 className="font-bold text-3xl text-center">Create a Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="react.js">React.js</option>
            <option value="next.js">Next.js</option>
          </Select>
        </div>
        <div className="border-teal-500 border-4 p-3 border-dotted flex gap-4 justify-between">
          <FileInput
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <Button
            type="button"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploading}
          >
            Upload image
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {imageUploading ? (
          <div className="w-full h-80 flex justify-center items-center">
            <Spinner
              aria-label="Center-aligned spinner example"
              size="xl"
              color="warning"
            />
          </div>
        ) : (
          <img
            src={
              imageUrl ||
              "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png"
            }
            alt=""
            className="h-80 object-cover"
          />
        )}

        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
        />
        <Button type="submit" color="success">
          Publish
        </Button>
      </form>
    </div>
  );
}

export default CreatePost;
