import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = {
  loading: false,
  isLoggedIn: false,
  name: "",
  userId: "",
  token: "",
  error: "",
  image: "",
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await client.get("/fakeApi/users");
  return response.data;
});

export const addNewUser = createAsyncThunk(
  "users/authenticateUser",
  async ({ authType, userData }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    let res;
    try {
      if (authType === "login") {
        res = await fetch(`http://localhost:5000/api/users/userLogin`, {
          method: "POST",
          body: userData,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
      } else {
        res = await fetch(`http://localhost:5000/api/users/userRegister`, {
          method: "POST",
          body: userData,
        });
      }
      const data = await res.json();

      if (data["message"]) return rejectWithValue(data["message"]); // if we coutered an error
      // Everything is ok
      const userToken = data.userToken;
      localStorage.setItem("userToken", userToken);
      localStorage.setItem("userData", JSON.stringify(data));
      // const expiration = new Date();
      // expiration.setHours(expiration.getHours() + 1);
      // localStorage.setItem("expiration", expiration.toDateString());
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logUserOut(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("userData");
      localStorage.removeItem("userToken");
    },
  },
  extraReducers(builder) {
    // Auth User
    builder.addCase(addNewUser.pending, (state) => {
      state.error = "";
      state.loading = true;
    });
    builder.addCase(addNewUser.fulfilled, (state, action) => {
      if (action.payload.userToken) state.isLoggedIn = true;
      state.loading = false;
      state.name = action.payload.username;
      state.userId = action.payload.userId;
      state.token = action.payload.userToken;
      state.image = action.payload.userImage;
    });
    builder.addCase(addNewUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logUserOut } = usersSlice.actions;

export default usersSlice.reducer;
