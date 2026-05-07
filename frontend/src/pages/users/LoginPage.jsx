import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import "./../../styles/login.css";

function LoginPage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async function (e) {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        console.log(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Login</h2>

        <div>
          <input
            id="email"
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            id="password"
            type="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn login-page-btn">
          Login
        </button>

        <p className="signup">
          Don’t have an account? <NavLink to="/signup">Sign up</NavLink>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
