import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserData } from "../utils/auth";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.users);
  const userData = getUserData();

  useEffect(() => {
    if (userData?.userToken) navigate("/");
  }, [userData?.userToken, navigate]);
  return <AuthForm error={error} />;
}

export default AuthenticationPage;

// export async function action({ request }) {
//   const searchParams = new URL(request.url).searchParams;
//   const mode = searchParams.get("mode") || "login";

//   const data = await request.formData();
//   const authData = {
//     email: data.get("email"),
//     password: data.get("password"),
//   };
// }
