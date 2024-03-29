import React, { useEffect ,useState} from "react";
import { Link } from "react-router-dom";


const NavbarDesigned = ({ children }) => {
  const [user, setUser] = useState("");
  const [loginToken, setLoginToken] = useState(null);
  useEffect(() => {
    setUser(localStorage.getItem("type"));
    setLoginToken(localStorage.getItem("token"));
  }, [user]);
  return (
    <>
      <section id="content">
          <nav>
            <i className="bx bx-menu"></i>
            <Link to={`/`} className="nav-link">
            </Link>
            <form action="#">
              <div className="form-input">
                {/* <input type="search" placeholder="Search..." />
              <button type="submit" className="search-btn">
                <i className="bx bx-search"></i>
              </button> */}
              </div>
            </form>
            <input type="checkbox" id="switch-mode" hidden />
            <label htmlFor="switch-mode" className="switch-mode"></label>
            <Link to={`/`} className="notification">
              <i className="bx bx-user"></i>
            </Link>
            <Link to={`/`} className="profile">
              {loginToken &&(
                user.toUpperCase()
              )}
              {/* <img src="img/people.png" /> */}
            </Link>
          </nav>
        <main>{children}</main>
      </section>
    </>
  );
};

export default NavbarDesigned;
