import { Navigate, useLocation } from "react-router";
import { UseSignupContext } from "../contexts/Signup/Signup";
import { UseData } from "../contexts/DataContext";

export function RequiresAuth({ children }) {
  const { currUser } = UseSignupContext();
  const {firstName} = UseData();
  const location = useLocation();
  return currUser?.email ||firstName.length ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}
