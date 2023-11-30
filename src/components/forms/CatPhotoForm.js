import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const AddCatPhotoForm = ({ onPhotoAdded }) => {
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('caption', caption);

        const userToken = localStorage.getItem('token');

        try {
            const response = await axios.post('http://localhost:8000/api/catphotos/', formData, {
                headers: {
                    'Authorization': `Token ${userToken}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            onPhotoAdded(response.data);
            setFile(null);
            setCaption("");
        } catch (error) {
            console.error('Error uploading cat photo', error);
        }
    };



    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Cat Photo</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Caption</Form.Label>
                <Form.Control type="text" placeholder="Enter caption" value={caption} onChange={handleCaptionChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Add Photo
            </Button>
        </Form>
    );
};

export default AddCatPhotoForm;
