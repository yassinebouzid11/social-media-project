import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth"; 
import "../styles/navBar.css"

export const NavBar=()=>{
    const [user]=useAuthState(auth);

    console.log(user?.photoURL);
    return(
        <div className="flex flex-between align-center nav">
            <div>
                <Link className="margin-1" to="/">Home</Link>
                {user && <Link className="margin-1" to="/createP">Create post</Link>}
            </div>
            <div className="margin-1">  
                {!user ? 
                <Link to="/login">Login</Link>
                :<div className="flex  align-center">
                    <div className="flex flex-column flex-evenly margin-1">
                        {user?.displayName}               
                        <button onClick={()=>auth.signOut()}>logout</button>
                    </div>
                    <img className="img-profile" src={user?.photoURL} alt="NOT Found" width={"50px"} height={"50px"} />
                </div>}
            </div>
        </div>
    )
}