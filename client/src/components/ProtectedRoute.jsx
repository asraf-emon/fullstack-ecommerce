import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { toggleAuthPopup } from "../store/slices/popupSlice";

const ProtectedRoute = ({ children }) => {
  const { authUser, isCheckingAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isCheckingAuth && !authUser) {
      toast.error("Please login to access this page!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });

      dispatch(toggleAuthPopup());
    }
  }, [authUser, isCheckingAuth, dispatch]);

  if (isCheckingAuth) return null;

  if (!authUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
