import { Navigate, useLocation } from "react-router";
import { UseSignupContext } from "../contexts/Signup/Signup";

export function RequiresAuth({ children }) {
  const { currUser } = UseSignupContext();
  console.log("require auth", currUser);
  const location = useLocation();
  console.log("Location -> RequiresAuth.jsx: ", location);
  return currUser?.email ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}
