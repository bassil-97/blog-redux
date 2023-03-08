import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthToken } from "../../utils/auth";

const initialState = {
  blogs: [],
  loading: false,
  status: "idle",
  error: null,
};

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  try {
    let res = await fetch(`http://localhost:5000/api/blogs/get-all-blogs`);

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const addNewBlog = createAsyncThunk(
  "blogs/addNewBlog",
  async (initialBlog, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const userToken = getAuthToken();
    try {
      let res = await fetch(`http://localhost:5000/api/blogs/add-new-blog`, {
        method: "POST",
        body: initialBlog,
        headers: {
          Authorization: "bearer " + userToken,
        },
      });

      const data = await res.json();
      if (data["message"]) return rejectWithValue(data["message"]);
      return data["newBlog"];
    } catch (error) {
      return rejectWithValue(error.message);
    }
    // const response = await client.post("/fakeApi/posts", initialBlog);
    // return response.data;
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteExistingBlog",
  async (blogId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const userToken = getAuthToken();

    try {
      let res = await fetch(
        `http://localhost:5000/api/blogs/delete-blog/${blogId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "bearer " + userToken,
          },
        }
      );
      const data = await res.json();
      return data["blogId"];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { blogId, reaction } = action.payload;
      const existingPost = state.posts.find((blog) => blog.id === blogId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },

    // postUpdated(state, action) {
    //   const { id, title, content } = action.payload;
    //   const existingPost = state.posts.find((post) => post.id === id);
    //   if (existingPost) {
    //     existingPost.title = title;
    //     existingPost.content = content;
    //   }
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBlogs.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })
      // Add New Blog
      .addCase(addNewBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.push(action.payload);
      })
      .addCase(addNewBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Blog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        let blogIndex = state.blogs.find((el) => el.id === action.payload);
        state.blogs = state.blogs.filter((blog) => blog.id !== blogIndex);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { postAdded, reactionAdded } = blogsSlice.actions;

export default blogsSlice.reducer;

export const selectAllBlogs = (state) => state.blogs.blogs;

export const selectBlogById = (state, blogId) =>
  state.blogs.blogs.find((blog) => blog._id === blogId);
