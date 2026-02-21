import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const raw = localStorage.getItem("userData");
  const userData = JSON.parse(raw !== null ? raw : "null");
  const token = userData?.accessToken;
  const location = useLocation();

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
};
