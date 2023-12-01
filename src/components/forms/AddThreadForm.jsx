import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const AddThreadForm = ({ onThreadAdded }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userToken = localStorage.getItem('token');
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/threads/', {
                title,
                content
            }, {
                headers: { 'Authorization': `Token ${userToken}` }
            });
            onThreadAdded(response.data);
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Error adding thread', error);
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
                    placeholder="Enter thread title" 
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3} 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    placeholder="Enter thread content" 
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Add Thread
            </Button>
        </Form>
    );
};

export default AddThreadForm;
