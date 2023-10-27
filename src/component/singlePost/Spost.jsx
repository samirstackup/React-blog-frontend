import { useLocation } from "react-router-dom";
import "./spost.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

export default function Spost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [comments, setComments] = useState("1");

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setComments(res.data.comments);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + path, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put("/posts/" + path, {
        username: user.username,
        title,
        desc,
        comments,
      });
      // window.location.reload();  can use optionally
      setUpdateMode(false);
    } catch (err) {}
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="sPostimg" />
        )}
        {updateMode ? ( //? = if
          <input
            type="text"
            value={title}
            className="sPostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          /> //if no update mode,then h1,otherwise updatemode
        ) : (
          <h1 className="sPostTitle">
            {title}
            {post.username === user?.username && (
              <div className="sPostedit">
                <i
                  className="sPostIcon fa-solid fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="sPostIcon fa-solid fa-trash"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="sPostInfo">
          <span className="sPostAuthor">
            Author: "
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
            "
          </span>
          <span className="sPostTime">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="sPostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        ) : (
          <p className="sPostDesc">{desc}</p>
        )}
        {updateMode ? (
          <input
            className="sPostCommInput"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></input>
        ) : (
          <p className="sPostCommInput">Comments {comments}</p>
        )}
        {updateMode && (
          <button className="singlePostbtn" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
