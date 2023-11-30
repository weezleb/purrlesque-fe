import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import EditCommentForm from './forms/EditCommentForm';
import './css/CommentsSection.css';

const CommentsSection = ({ type, typeId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const currentUserID = localStorage.getItem('currentUserID');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const [visibleEditHistoryId, setVisibleEditHistoryId] = useState(null);

    const fetchComments = useCallback(async () => {
        const userToken = localStorage.getItem('token');
        let url = `http://localhost:8000/api/comments/`;

        if (type === 'cat_photo') {
            url += `?cat_photo=${typeId}`;
        } else if (type === 'thread') {
            url += `?thread=${typeId}`;
        }

        try {
            const response = await axios.get(url, { headers: { 'Authorization': `Token ${userToken}` } });
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments', error);
        }
    }, [type, typeId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const handleAddComment = async () => {
        const userToken = localStorage.getItem('token');
        let data = { content: newComment };

        if (type === 'cat_photo') {
            data.cat_photo = typeId;
        } else if (type === 'thread') {
            data.thread = typeId;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/comments/', data, { headers: { 'Authorization': `Token ${userToken}` } });
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment', error);
        }
    };

    const handleEdit = (commentId) => {
        setEditingCommentId(commentId);
    };

    const handleCommentUpdated = async (updatedComment) => {
        console.log(updatedComment);
        setComments(comments.map(comment => comment.id === updatedComment.id ? updatedComment : comment));
        setEditingCommentId(null);
        await fetchComments();
    };

    const handleDelete = async (commentId) => {
        const userToken = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8000/api/comments/${commentId}/`, {
                headers: { 'Authorization': `Token ${userToken}` }
            });
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error('Error deleting comment', error);
        }
    };

    const toggleEditHistory = (commentId) => {
        setVisibleEditHistoryId(visibleEditHistoryId === commentId ? null : commentId);
    };

    return (
        <div className="comments-section-container">
            {comments.map(comment => (
                <div key={comment.id} className="comment-item">
                    {editingCommentId === comment.id ? (
                        <EditCommentForm
                            comment={comment}
                            onCommentUpdated={handleCommentUpdated}
                        />
                    ) : (
                        <>
                            <p className="comment-content">{comment.content}</p>
                            {comment.edited_history && comment.edited_history.length > 0 && (
                                <span onClick={() => toggleEditHistory(comment.id)}>Edited</span>
                            )}
                            {visibleEditHistoryId === comment.id && (
                                <div className="edit-history">
                                    <strong>Edit History:</strong>
                                    <ul>
                                        {comment.edited_history.map((edit, index) => (
                                            <li key={index}>{`Content: ${edit.content}, Edited At: ${edit.edited_at}`}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {(parseInt(currentUserID) === comment.user || isAdmin) && (
                                <div className="comment-actions">
                                    <Button onClick={() => handleEdit(comment.id)}>Edit</Button>
                                    <Button variant="danger" onClick={() => handleDelete(comment.id)}>Delete</Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            ))}
            <textarea value={newComment} onChange={e => setNewComment(e.target.value)} />
            <Button onClick={handleAddComment}>Add Comment</Button>
        </div>
    );
};

export default CommentsSection;
