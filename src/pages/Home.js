import PageContent from "../components/PageContent";
import { useSelector } from "react-redux";
import { getUserData } from "../utils/auth";
import "./Home.css";

import MainNavigation from "../components/MainNavigation";
import AddBlogForm from "../components/AddBlogForm";
import BlogsList from "../components/BlogsList";
import UserAvatar from "../components/Avatar";

function HomePage() {
  const { blogs } = useSelector((state) => state.blogs);
  let userData = getUserData();

  return (
    <PageContent>
      <MainNavigation />
      <div className="home-page__sections container">
        <div className="home-page__container container">
          <AddBlogForm />
        </div>
        <div className="home-page__userMenu">
          <div className="header">
            <UserAvatar />
            <small className="mt-3">Welcome, {userData?.username}!</small>
          </div>
          <hr className="w-100" />
          <div className="text-center mb-2 py-1">
            <h6>Your Blogs</h6>
            <h4>
              {blogs?.filter((blog) => blog.author === userData?.userId).length}
            </h4>
          </div>
        </div>
      </div>
      <div className="container mt-5 p-0">
        <BlogsList />
      </div>
    </PageContent>
  );
}

export default HomePage;
