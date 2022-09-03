import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function Navbar() {
    return(
        <div className="nav shadow-sm">
            <Link to="/"><li><h1 className="nav-title">유투브 추천</h1></li></Link>
            <ul className="nav-links">
                <Link to = "/signin"><li>signin</li></Link>
                <Link to = "/login"><li>login</li></Link>
                {/* <Link to = "/myPage"><li>myPage</li></Link> */}
            </ul>
        </div>
    )
}
export default Navbar;

