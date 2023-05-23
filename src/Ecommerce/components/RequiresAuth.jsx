import { Navigate, useLocation } from "react-router";
import { UseSignupContext } from "../contexts/Signup/Signup";
import { UseData } from "../contexts/DataContext";

export function RequiresAuth({ children }) {
  const { currUser } = UseSignupContext();
  const {firstName} = UseData();
  console.log("require auth", currUser);
  const location = useLocation();
  console.log("Location -> RequiresAuth.jsx: ", location);
  return currUser?.email ||firstName.length ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}
