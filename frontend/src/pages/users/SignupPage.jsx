import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = async function (e) {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
      passwordConfirm,
    };

    try {
      const res = await fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (res.ok) {
        navigate("/login");
      } else {
        console.log("Register failed!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="signup-title">Sign up</h2>
        <div>
          <input
            id="name"
            type="text"
            placeholder="Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div>
          <input
            id="passwordConfirm"
            type="password"
            placeholder="Confirm password..."
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <button type="submit" className="btn signup-page-btn">
          Sign up
        </button>
        <p className="signup">
          Have an account? <NavLink to="/login">Log in</NavLink>
        </p>
      </form>
    </div>
  );
}

export default SignupPage;
