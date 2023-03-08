import * as React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { deleteBlog } from "../store/slices/blogsSlice";
import "./Blog.css";

export default function MediaCard({ blog }) {
  const imagePath = "http://localhost:5000/" + blog.blogImage;
  const dispatch = useDispatch();

  const handleDeleteBlog = (blogId) => {
    dispatch(deleteBlog(blogId));
  };

  return (
    <Card sx={{ width: 250, height: 400 }} className="blog__container">
      {/* <CardMedia sx={{ height: 140 }} image={imagePath} title={blog.title} /> */}
      <img src={imagePath} className="card-img-top" alt={blog.title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {blog.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="blog-card__content"
        >
          {blog.content}
        </Typography>
      </CardContent>
      <CardActions className="card-actions">
        <Button variant="contained" size="small">
          <Link to={`/blogs/${blog._id}`}>VIEW BLOG</Link>
        </Button>
        <div>
          <IconButton>
            <EditIcon sx={{ color: "#5499C7" }} />
          </IconButton>
          <IconButton onClick={() => handleDeleteBlog(blog._id)}>
            <DeleteOutlineIcon sx={{ color: "#E74C3C" }} />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
}
