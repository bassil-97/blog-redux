import { configureStore } from "@reduxjs/toolkit";

import blogsReducer from "./slices/blogsSlice";
import usersReducer from "./slices/userSlice";

export default configureStore({
  reducer: {
    blogs: blogsReducer,
    users: usersReducer,
  },
});
