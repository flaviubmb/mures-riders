import { NavLink, useNavigate } from "react-router-dom";
import "./../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav>
      <div className="logo">
        <p>Mures Riders</p>
      </div>
      <div className="links">
        <ul>
          <li>
            <NavLink to="/">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/bikes">Bikes</NavLink>
          </li>
          <li>
            <NavLink to="/rides">Rides</NavLink>
          </li>
          <li>
            <NavLink to="/services">Services</NavLink>
          </li>
          <li>
            <NavLink to="/components">Components</NavLink>
          </li>
        </ul>
      </div>
      <div className="login">
        {token ? (
          <>
            <li>
              <button
                className="profile-btn"
                onClick={() => navigate("/profile")}
              >
                Profile
              </button>
            </li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button className="login-btn" onClick={() => navigate("/login")}>
                Login
              </button>
            </li>
            <li>
              <button
                className="signup-btn"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
            </li>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
