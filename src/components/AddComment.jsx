// AddComment.js
import { useState } from 'react';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function AddComment({ idPost, userId }) {
  const [commentText, setCommentText] = useState('');
  console.log("test 4:",idPost)
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'comments'), {
      idPost,
      text: commentText,
      userId: userId,
      createdAt: new Date().toLocaleDateString()
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