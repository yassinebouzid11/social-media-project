// AddComment.js
import { useState } from 'react';
import { db, Timestamp } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function AddComment({ postId, currentUserId }) {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'comments'), {
      postId,
      text: commentText,
      userId: currentUserId,
      createdAt: Timestamp.now(),
    });
    setCommentText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={commentText} 
        onChange={(e) => setCommentText(e.target.value)} 
        placeholder="Add a comment..." 
      />
      <button type="submit">Post</button>
    </form>
  );
}