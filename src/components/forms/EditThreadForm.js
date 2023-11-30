import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const EditThreadForm = ({ thread, onThreadUpdated }) => {
    const [title, setTitle] = useState(thread.title);
    const [content, setContent] = useState(thread.content);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userToken = localStorage.getItem('token');
        try {
            const response = await axios.put(`http://localhost:8000/api/threads/${thread.id}/`, {
                title,
                content
            }, {
                headers: { 'Authorization': `Token ${userToken}` }
            });
            onThreadUpdated(response.data);
        } catch (error) {
            console.error('Error updating thread', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3} 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                />
            </Form.Group>
            <Button type="submit">Update Thread</Button>
        </Form>
    );
};

export default EditThreadForm;
