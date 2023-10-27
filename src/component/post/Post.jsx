import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      {post.photo && (
        <img className="postImg" src={PF + post.photo} alt="postimage" />
      )}
      <div className="postinfo">
        <div className="postCat">
          {post.categories.map((c) => {
            <span className="postCat2">{c.name}</span>;
          })}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          {/* <span className="postTitle">Lorem ipsum dolor sit amet</span> */}
          {/* we
        use the below to append title from api to title */}
          <span className="postTitle">{post.title}</span>
        </Link>

        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
      <div className="postFooter">
        <Link to={`/post/${post._id}`} className="link">
          {/* <span className="postTitle">Lorem ipsum dolor sit amet</span> */}
          {/* we
        use the below to append title from api to title */}
          <button className="footerBtn">Read more</button>
        </Link>
        <span className="footerComm">
          Comments <span className="commNum">{post.comments}</span>
        </span>
      </div>
    </div>
  );
}
