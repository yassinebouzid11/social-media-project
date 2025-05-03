import { collection, addDoc, query, where, getDocs,deleteDoc,doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const Post=(props)=>{
    const {post,user, handleComment}=props;    
    const[likes, setLikes]=useState(null);
    // const Navigate=useNavigate()

    const likesRef=collection(db,"Likes")
    const likeDoc=query(likesRef,where("postId","==",post.id))
    
    
    const addLike = async() =>{
        try{
        await addDoc(likesRef,{
            postId:post.id,
            userId:user.uid
        })
        setLikes([...likes,{userId:user.uid}]);
        }
        catch(err) {
                console.log(err);
            }
        }

    const removeLike = async() =>{
        try{
        const likeToDeleteRef=query(likesRef,where("postId","==",post.id),where("userId","==",user.uid))
        const likeToDeleteData=await getDocs(likeToDeleteRef)
        const deleteLike=doc(db,"Likes",likeToDeleteData.docs[0].id);
        console.log(deleteLike)
        await deleteDoc(deleteLike)
        setLikes(likes.filter((like)=>like.userId!==user.uid));
        }
        catch(err){
            console.log(err);
        }
    }
    const getLike=async()=>{
        const data = await getDocs(likeDoc);
        setLikes(data.docs.map((doc)=>({userId:doc.data().userId})));
    }

    const userLiked=likes?.find((like)=>like.userId===user.uid  )
    useEffect(()=>{
        getLike();
    },[])
    return(
        <div>
            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="desc">
                <p>{post.description}</p>
            </div>
            <div className="user">       
                <p>@{post.username}</p>
            </div>
            <button onClick={userLiked ? removeLike:addLike} >{userLiked ? <>&#128078;</>:<>&#128077;</>}</button>
            <button onClick={() => handleComment(post.id)} >comments</button>
            <p>Likes : {likes?.length}</p>
            <br />

        </div>
    )
}