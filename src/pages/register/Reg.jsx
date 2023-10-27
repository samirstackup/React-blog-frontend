import { useState } from "react";
import "./reg.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Reg() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
 
  const handleSubmit = async (e) => {
    try{
       e.preventDefault(); //Using this so the form doesnt refresh on submitting
       setError(false)

    const res = await axios.post("/auth/register", {
      username,
      email,
      password,
    });
    res.data && window.location.replace("/login")
    } catch(err){
          // console.log(err); 
          setError(true)

    }
   
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerform" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your Username..."
          onChange={e => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={e => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your Password"
          onChange={e => setPassword(e.target.value)}
        />
        <button className="registerBtn" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginBtn">
        <Link className="link " to="/login">
          LOGIN
        </Link>
      </button>
      {error && <span style={{color:"red",marginTop:"10px",fontWeight:"Bold"}}>Something went wrong</span>}
    </div>
  );
}
