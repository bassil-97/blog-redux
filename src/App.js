import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { checkAuthLoader, getAuthToken } from "./utils/auth";
import "./App.css";

import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import AuthenticationPage from "./pages/Authentication";
import SingleBlog from "./pages/SingleBlog";
import EditBlog from "./pages/EditBlog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: getAuthToken,
    children: [
      { index: true, element: <HomePage />, loader: checkAuthLoader },
      { path: "auth", element: <AuthenticationPage /> },
      {
        path: "blogs/:blogId",
        id: "blog-details",
        loader: checkAuthLoader,
        children: [
          {
            index: true,
            element: <SingleBlog />,
          },
          {
            path: "edit",
            element: <EditBlog />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
