import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useAuth from "../hooks/useAuth";
// ----------------------------------------------------------------------

export default function JwtProvider({ children }) {
  const dispatch = useDispatch();
  const { initializeAuth } = useAuth();

  useEffect(() => {
    initializeAuth();
  }, []);

  return <>{children}</>;
}
