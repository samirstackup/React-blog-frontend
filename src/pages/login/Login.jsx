import { useContext, useRef } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context); //can add user in const and clg down to check

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" }); //taking state from action.js
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data }); //takign payload from action.js
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  // console.log(user);
  // console.log(isFetching, "fetching");  //to test if we're getting user

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginform" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your Password"
          ref={passwordRef}
        />
        <button className="loginBtn" type="submit" disabled={isFetching}>
          {/*  //disabling when fetching */}
          Login
        </button>
      </form>
      <button className="loginRegBtn">
        <Link className="link " to="/register">
          REGISTER
        </Link>
      </button>
    </div>
  );
}
