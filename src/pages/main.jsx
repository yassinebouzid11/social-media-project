import { db, auth } from "../config/firebase";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { Post } from "../components/post";
import { useAuthState } from "react-firebase-hooks/auth";
import { PostSearch } from "../components/postSearch";
import { RightSidebar } from "../components/rightSidbar";
import '../styles/main.css'
import CommentList from "../components/commentsList";

export const Main = () => {
    const [user] = useAuthState(auth);
    const [postsList, setPostsList] = useState([]);
    const [searchInput, setSearchInput] = useState(""); 
    const [commentPostId, setCommentPostId] = useState(""); 
    const [showComments, setShowComments] = useState(false)


    const postsRef = collection(db, "posts");

    const getPosts = async () => {
        try {
        const data = await getDocs(postsRef);
        setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (err) {
        console.log("the error :" + err);
        }
    };

    const handleComment=(postId)=>{
        setShowComments(!showComments)
        setCommentPostId(postId)
    }
    useEffect(() => {
        getPosts();
    }, []);

    
    const filteredPosts = postsList.filter((post) =>
        post.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    console.log("test 2 :",commentPostId)
    return (
        <div className="container">
            {showComments && user && (
                <div className="comment-layout">
                            <div className="comment-section">
                                <CommentList idPost={commentPostId} />
                            </div>
                </div>
            )}
            <div className="main-content">
                {user ? (
                <>
                    <PostSearch searchInput={searchInput} setSearchInput={setSearchInput} />
                    {filteredPosts.map((post) => (
                    <Post key={post.id} post={post} user={user} handleComment={handleComment} />
                    ))}
                </>
                ) : (
                <h3>Please login first</h3>
                )}
            </div>
            {user && (
                <div className="right-sidebar">
                    <RightSidebar />
                </div>
            )}
        </div>
    );
};
