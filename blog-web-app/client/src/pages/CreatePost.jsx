import React from "react";
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreatePost() {
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
          <FileInput type="file" accept="image/*" />
          <Button type="button" size="sm" outline>
            Upload image
          </Button>
        </div>
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
