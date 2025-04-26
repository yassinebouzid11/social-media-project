import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { CreatePostForm } from "../components/createPostForm";

export const CreatePost=()=>{
    const [user]=useAuthState(auth);
    return(
        
        <div>
            {user ?
            <div>
                <h1>Create a new post</h1>
                <CreatePostForm />
            </div>
            :<h1>Please login first</h1>
            }
        </div>
    )
}