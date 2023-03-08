import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectBlogById } from "../store/slices/blogsSlice";
import Chip from "@mui/material/Chip";

import { deleteBlog } from "../store/slices/blogsSlice";
import OptionsMenu from "../components/OptionsMenu";
import "./SingleBlog.css";

export default function SingleBlog() {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blog = useSelector((state) => selectBlogById(state, blogId));

  const handleDeleteBlog = () => {
    dispatch(deleteBlog(blogId));
    setTimeout(() => {
      navigate("/");
    }, 400);
  };

  if (!blog) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <div className="sing-blog__container">
      <div className="single-blog__header">
        <div className="options-menu">
          <OptionsMenu handleDeleteBlog={handleDeleteBlog} />
        </div>
        <img src={`http://localhost:5000/${blog.blogImage}`} alt={blog.title} />
        <h1 className="text-capitalize mb-3">{blog.title}</h1>
        <div className="single-blog__details">
          <Chip label={`Created At ${blog.createdAt}`} color="primary" />
          <Chip label={`Created by ${blog.createdBy}`} color="primary" />
        </div>
      </div>
      <div className="single-blog__content">
        <div className="container">
          <h1>Blog Content</h1>
          <hr className="mb-4" />
          <p>{blog.content}</p>
        </div>
      </div>
    </div>
  );
}
