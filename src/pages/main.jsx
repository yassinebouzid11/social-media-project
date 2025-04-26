import { db,auth } from "../config/firebase";
import { useState,useEffect } from "react";
import { getDocs,collection } from "firebase/firestore";
import { Post } from "../components/post";
import { useAuthState } from "react-firebase-hooks/auth";

export const Main=()=>{
    const [user]=useAuthState(auth);
    const [postsList,setPostsList]=useState(null);
    const postsRef=collection(db,"posts");

    const getPosts=async ()=>{
        try{
            const data=await getDocs(postsRef);
            setPostsList(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
        }catch(err){
            console.log("the error :"+err);
        }
    };
    useEffect(()=>{
        getPosts();
    }, []);
    
    return(
        <div>
            {user ?
                postsList?.map((post)=>{
                    return <Post post={post} user={user}/>
                })
                :<h3>Please login first</h3>
            }
        </div>
    )
}