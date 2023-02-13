import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { toast } from 'react-toastify';
import SearchBar from "./SearchBar";

export default function Navbar() {
    const auth = useAuth();
  
    const logoutUser = async () => {
        auth.logout();
        toast.success("Successfully logged out")
    }
    return (
        <div className="navbar-parent">
            <Link to='/' className="left-div-navbar">
                &lt; Codeial /&gt;

            </Link>

            <div className="search">
                  <SearchBar/>

            </div>
            <div className="right-div-navbar">
            {
                auth.user && 
                    <Link className="user-info" to='/setting'>
                        <div>
                            <i className="fa-sharp fa-solid fa-user-tie"></i>

                        </div>
                        <div>
                            <span>{auth.user.name}</span>

                        </div>

                    </Link>
            }
               
                <div className="auth-parent">
                    {
                        !auth.user && <Link to='/login'>Log In</Link>
                    }

                    {
                        auth.user && <a onClick={logoutUser} >Log Out</a>
                    }

                    {
                        !auth.user && <Link to='/register'>Register</Link>
                    }



                </div>

            </div>

        </div>
    )
}