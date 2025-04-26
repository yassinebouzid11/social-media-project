import { db, auth } from "../config/firebase";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { Post } from "../components/post";
import { useAuthState } from "react-firebase-hooks/auth";
import { PostSearch } from "../components/postSearch";
import { RightSidebar } from "../components/rightSidbar";
import '../styles/main.css'

export const Main = () => {
    const [user] = useAuthState(auth);
    const [postsList, setPostsList] = useState([]);
    const [searchInput, setSearchInput] = useState(""); 

    const postsRef = collection(db, "posts");

    const getPosts = async () => {
        try {
        const data = await getDocs(postsRef);
        setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (err) {
        console.log("the error :" + err);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    
    const filteredPosts = postsList.filter((post) =>
        post.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <div className="container">
        <div className="main-content">
            {user ? (
            <>
                <PostSearch searchInput={searchInput} setSearchInput={setSearchInput} />
                {filteredPosts.map((post) => (
                <Post key={post.id} post={post} user={user} />
                ))}
            </>
            ) : (
            <h3>Please login first</h3>
            )}
        </div>
    
        <div className="right-sidebar">
            <RightSidebar />
        </div>
        </div>
    );
};
