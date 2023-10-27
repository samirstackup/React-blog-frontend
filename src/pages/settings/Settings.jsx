import "./setting.css";
import Sidebar from "../../component/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {
  const { user, dispatch } = useContext(Context); //to import user data
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });

    if (!password) {
      // Set the state to show the error message
      setShowPasswordError(true);
      return; // Prevent the update request from being sent
    } else {
      // If password is not empty, hide the error message
      setShowPasswordError(false);
    }
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.image = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="settings">
      <div className="setttingWrapper">
        <div className="settingTitle">
          <span className="settingUpdaateTitle">Update your account</span>
          <span className="settingDeleteTitle">Delete account</span>
        </div>
        <form className="settingForm" onSubmit={handleSubmit}>
          <label> Profile picture</label>
          <div className="settingProfilepic">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.image}
              alt=""
            />
            <label htmlFor="fileInput">
              <i class="settingPPicon fa-regular fa-user"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            value={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p id="passError" style={{ display: "none", color: "red" }}>
            Please enter your password to continue
          </p>

          <button className="settingSubmit" type="submit" disabled={!password}>
            Update
          </button>
          {success && (
            <span
              style={{
                color: "green",
                textAlign: "center",
                marginTop: "10px ",
              }}
            >
              Profile updated
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
