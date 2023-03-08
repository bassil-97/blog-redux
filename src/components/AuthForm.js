import { Form, Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewUser } from "../store/slices/userSlice";
import classes from "./AuthForm.module.css";

import Alert from "../utils/Alert";
import LoadingSpinner from "../utils/LoadingSpinner";
import ImageUpload from "./FormElements/ImageUpload";

function AuthForm({ error }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.users);

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  const handleAuthUser = async (e) => {
    e.preventDefault();

    let data = new FormData(e.target);
    let authData = new FormData();
    if (isLogin) {
      data = JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      });

      dispatch(addNewUser({ authType: "login", userData: data }));
    } else {
      authData.append("username", data.get("username"));
      authData.append("email", data.get("email"));
      authData.append("password", data.get("password"));
      authData.append("image", data.get("image"));

      dispatch(addNewUser({ authType: "signup", userData: authData }));
    }
  };

  return (
    <div className={classes.authFormContainer}>
      <div className="row w-100" style={{ minHeight: "100vh" }}>
        <div className="col-lg-6 d-flex align-items-center justify-content-center flex-column">
          <Form
            method="post"
            className={classes.form}
            onSubmit={handleAuthUser}
          >
            <h1 className="mb-3">{isLogin ? "Log in" : "Create a new user"}</h1>
            {isLogin && (
              <p className="text-muted">
                Welcome back! Please enter your details.
              </p>
            )}
            <div className="form-group mt-4 mb-4">
              {!isLogin && (
                <>
                  <div className="mb-4">
                    <label htmlFor="username">Username</label>
                    <input
                      className="form-control"
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Enter your Username"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <ImageUpload
                      location="authForm"
                      name="image"
                      id="image"
                      center
                    />
                  </div>
                </>
              )}
              <div className="mb-4">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  className="form-control"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            <div className={classes.actions}>
              <button className="btn btn-primary">
                {isLogin && !loading
                  ? "Sign in"
                  : !isLogin && !loading
                  ? "Sign up"
                  : ""}
                {loading && <LoadingSpinner />}
              </button>
              <div>
                <span className="me-2 text-muted">
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account"}
                </span>
                <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
                  {isLogin ? "Sign up" : "Sign in"}
                </Link>
              </div>
            </div>
          </Form>
          {error && <Alert>{error}</Alert>}
        </div>
        <div
          className="col-lg-6 d-flex align-items-center justify-content-center"
          style={{ background: "#353cc0" }}
        >
          <lottie-player
            src="https://assets6.lottiefiles.com/private_files/lf30_5u6A5U.json"
            background="transparent"
            speed="1"
            style={{ width: "500px", height: "500px" }}
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
