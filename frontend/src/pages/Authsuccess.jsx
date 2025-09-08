import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Authsuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract token from query string
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // Save token
      localStorage.setItem("token", token);

      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.picture) {
        localStorage.setItem("profilePic", payload.picture);
      }



      // Redirect user to home page
      navigate("/", { replace: true });
    } else {
      // If no token, send them to login
      navigate("/login?error=missing_token", { replace: true });
    }
  }, [navigate]);

  return <p>Signing you in...</p>;
};

export default Authsuccess;
