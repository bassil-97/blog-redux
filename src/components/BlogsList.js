import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllBlogs } from "../store/slices/blogsSlice";
import { fetchBlogs } from "../store/slices/blogsSlice";

import "./BlogsList.css";
import LoadingSpinner from "../utils/LoadingSpinner";
import Blog from "./Blog";

export default function BlogsList() {
  const dispatch = useDispatch();
  const blogs = useSelector(selectAllBlogs);
  const blogStatus = useSelector((state) => state.blogs.status);

  useEffect(() => {
    if (blogStatus === "idle") {
      dispatch(fetchBlogs());
    }
  }, [blogStatus, dispatch]);

  return (
    <div className="blogs-list__container">
      {blogStatus === "loading" && <LoadingSpinner />}
      {blogStatus === "succeeded" &&
        blogs.map((blog) => <Blog key={blog._id} blog={blog} />)}
    </div>
  );
}
