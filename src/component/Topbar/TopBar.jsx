import "./topbar.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { useContext } from "react";

export default function TopBar() {
  // const user = false;
  const { user, dispatch } = useContext(Context); //using in app.js also
  const PF = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="nav">
      <div className="topleft">
        <i className=" mediaIcons fa-brands fa-facebook"></i>
        <i className=" mediaIcons fa-brands fa-twitter"></i>
        <i className=" mediaIcons fa-brands fa-instagram"></i>
      </div>

      <div className="topcenter">
        <ul className="topList">
          <li className="lItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="lItem">
            <Link className="link" to="/">
              ABOUT
            </Link>
          </li>
          <li className="lItem">
            <Link className="link" to="/">
              CONTACT
            </Link>
          </li>
          <li className="lItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="lItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>

      <div className="topright">
        {user ? (
          <Link to="/settings">
            <img
              className="profilePic"
              src={PF + user.image} //can check from user model
              alt="profilePic"
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="lItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="lItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}

        <i className=" searchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}
