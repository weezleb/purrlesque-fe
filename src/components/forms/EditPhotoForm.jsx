import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const EditPhotoForm = ({ photo, onPhotoUpdated }) => {
    const [caption, setCaption] = useState(photo.caption);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userToken = localStorage.getItem('token');
        try {
            const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/catphotos/${photo.id}/`, {
                caption
            }, {
                headers: { 'Authorization': `Token ${userToken}` }
            });
            onPhotoUpdated(response.data);
        } catch (error) {
            console.error('Error updating photo', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Caption</Form.Label>
                <Form.Control 
                    type="text" 
                    value={caption} 
                    onChange={(e) => setCaption(e.target.value)} 
                />
            </Form.Group>
            <Button type="submit">Update Photo</Button>
        </Form>
    );
};

export default EditPhotoForm;
