import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const CommentsSection = ({ type, typeId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
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
        };

        fetchComments();
    }, [type, typeId]);

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

    return (
        <div>
            {comments.map(comment => (
                <p key={comment.id}>{comment.content}</p>
            ))}
            <textarea value={newComment} onChange={e => setNewComment(e.target.value)} />
            <Button onClick={handleAddComment}>Add Comment</Button>
        </div>
    );
};

export default CommentsSection;
