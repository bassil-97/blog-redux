import React, { useState } from "react";
import { Form } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserData } from "../utils/auth";
import { addNewBlog } from "../store/slices/blogsSlice";

import "./AddBlogForm.css";
import ImageUpload from "../components/FormElements/ImageUpload";

export default function AddBlogForm() {
  const dispatch = useDispatch();
  const userData = getUserData();
  // const { userId } = useSelector((state) => state.users);
  // const { loading } = useSelector((state) => state.blogs);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const handleAddNewBlog = (e) => {
    e.preventDefault();

    let data = new FormData(e.target);
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", userData.userId);
    formData.append("image", data.get("image"));

    dispatch(addNewBlog(formData));
    setTitle("");
    setContent("");
  };

  return (
    <div className="add-blog__form">
      <h3 className="mb-5 fw-bold">Add new blog</h3>
      <Form onSubmit={handleAddNewBlog} method="POST">
        <div className="form-group mb-4">
          <label htmlFor="blogTitle">Blog Title</label>
          <input
            type="text"
            className="form-control mt-3"
            name="blogTitle"
            id="blogTitle"
            value={title}
            onChange={onTitleChanged}
          />
        </div>
        <div className="form-group mb-4">
          <textarea
            name="userTextArea"
            id="userTextArea"
            rows="10"
            className="form-control"
            placeholder="What's in your mind?"
            value={content}
            onChange={onContentChanged}
          ></textarea>
        </div>
        <div className="add-blog_actions mb-4">
          <ImageUpload location="addBlog" id="image" name="image" noBorder />
        </div>
        <button className="btn btn-primary">Add Blog</button>
      </Form>
      {/* <div className="w-100 d-flex algin-items-center justify-content-center mt-3">
        {loading && <LoadingSpinner />}
      </div> */}
    </div>
  );
}
