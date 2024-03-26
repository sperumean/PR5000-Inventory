import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = (e) => {
    logout();
  };

  const handleClickAddNewElement = () => {
    navigate("/admin/addNewElement");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleClickResBtn = () => {
    navigate("/Reservations");
  };

  return (
    <header>
      <div className="container flex-container">
        <div className="logo">
          <img onClick={handleLogoClick} src="/exam_logo2.jpg" alt="Logo" />
        </div>
        <nav className="nav-main">
          {user && (
            <div>
              <span>
                Hello, <strong>{user.email}</strong>
              </span>
              <button onClick={handleClickResBtn}>Reservations</button>
              {user.role === "admin" && (
                <button onClick={handleClickAddNewElement}>Create new</button>
              )}
              <button onClick={handleClick}>Log Out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Log In</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
