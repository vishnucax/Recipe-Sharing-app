import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">
          Recipe Sharing
        </Link>

        <div className="d-flex gap-2">
          <Link className="btn btn-outline-light btn-sm" to="/dashboard">
            Dashboard
          </Link>

          {user ? (
            <>
              <Link className="btn btn-success btn-sm" to="/create">
                Create Recipe
              </Link>
              <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-light btn-sm" to="/login">
                Login
              </Link>
              <Link className="btn btn-primary btn-sm" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
