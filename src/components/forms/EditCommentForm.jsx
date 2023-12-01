import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const EditCommentForm = ({ comment, onCommentUpdated }) => {
    const [content, setContent] = useState(comment.content);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userToken = localStorage.getItem('token');
        try {
            const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/comments/${comment.id}/`, {
                content
            }, {
                headers: { 'Authorization': `Token ${userToken}` }
            });
            onCommentUpdated(response.data);
        } catch (error) {
            console.error('Error updating comment', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </Form.Group>
            <Button type="submit">Update Comment</Button>
        </Form>
    );
};

export default EditCommentForm;
