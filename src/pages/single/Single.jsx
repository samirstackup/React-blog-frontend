import "./single.css";
import Sidebar from "../../component/sidebar/Sidebar";
import Spost from "../../component/singlePost/Spost";
export default function Single() {
  return (
    <div className="single">
      <Spost />
      <Sidebar />
    </div>
  )
}
