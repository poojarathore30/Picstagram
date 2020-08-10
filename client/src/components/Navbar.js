import React, { useContext } from "react";
import { Link,useHistory } from "react-router-dom";
import { UserContext } from "../App"
const Navbar = () => {
    const { state, dispatch } = useContext(UserContext)
    const history=useHistory()
    const renderList = () => {
        if (state) {
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/createPost">New post</Link></li>,
                <li><Link to="/myfollowingpost">My Followings post</Link></li>,
                <li>
                    <button className="btn #e91e63 pink "
                        type="submit" name="action" onClick={()=>{
                            localStorage.clear()
                            dispatch({type:"CLEAR"})
                            history.push('/signin')
                        }}>
                        LogOut
                    </button>
                </li>
            ]
        }
        else {
            return [
                <li><Link to="/signin">LogIn</Link></li>,
                <li><Link to="/signup">SignUp</Link></li>]
        }
    }
    return (
        <div className="navbar-fixed">
        <nav>
            <div className="nav-wrapper white">
                <Link to={state ? "/" : "/signin"} className="brand-logo left">Instagram</Link>
                <ul id="nav-mobile" className="right" >
                    {renderList()}
                </ul>
            </div>
        </nav>
        </div>
    )
}
export default Navbar;
