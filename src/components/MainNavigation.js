import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { logUserOut } from "../store/slices/userSlice";

import classNamees from "./MainNavigation.module.css";

function MainNavigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogUserOut = () => {
    dispatch(logUserOut());
    navigate("/auth");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg bg-light ${classNamees.mainNavbar}`}
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          My Blogs
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className={`${classNamees.list} navbar-nav me-auto mb-2 mb-lg-0`}>
            {/* <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classNamees.active : undefined
                }
                aria-current="page"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classNamees.active : undefined
                }
                to="/blogs"
              >
                Link
              </NavLink>
            </li> */}
          </ul>
          <IconButton onClick={handleLogUserOut}>
            <LogoutIcon />
          </IconButton>
        </div>
      </div>
    </nav>
  );
}

export default MainNavigation;
