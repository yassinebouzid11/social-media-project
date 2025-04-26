import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import '../styles/components/comments.css';

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'comments'), where('postId', '==', postId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [postId]);

  return (
    <div className="comments-section">
      <h3>Comments ({comments.length})</h3>
      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <div className="comment-author">{comment.userId}</div>
            <div className="comment-text">{comment.text}</div>
            <div className="comment-time">
              {new Date(comment.createdAt?.toDate()).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentList;