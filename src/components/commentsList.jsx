import { useEffect, useState } from 'react';
import { db, auth } from '../config/firebase';
import { collection, query, where, onSnapshot, getDoc } from 'firebase/firestore';
import AddComment from './AddComment';
import { useAuthState } from "react-firebase-hooks/auth";
import '../styles/comments.css';

function CommentList({ idPost }) {
  const [user] = useAuthState(auth);
  const [comments, setComments] = useState([]);
  

  useEffect(() => {
    if (!idPost) {
      console.error("idPost is undefined! Avoiding invalid Firestore query.");
      return;
    }
    
    const q = query(collection(db, "comments"), where("idPost", "==", idPost));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    
    

    return () => unsubscribe();
  }, [idPost]);
  
  console.log("test 3:",idPost,"user :",user.uid)
  return (
    <div className="comments-section">
      <h3>Comments ({comments.length})</h3>
      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <div className="comment-text">{comment.text}</div>
            <div className="comment-time">
              {comment.createdAt}
            </div>
          </div>
        ))}
      </div>
      <AddComment idPost={idPost} userId={user.uid}/>
    </div>
  );
}

export default CommentList;