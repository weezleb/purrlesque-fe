import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import AddCatPhotoForm from './forms/CatPhotoForm';
import CatPhoto from './CatPage';

const CatPhotoList = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            const response = await axios.get('http://localhost:8000/api/catphotos/', {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            })
            setPhotos(response.data);
        };

        fetchPhotos();
    }, []);
    const handlePhotoAdded = (newPhoto) => {
        setPhotos([...photos, newPhoto]);
    };
    const handlePhotoDeleted = (photoId) => {
        setPhotos(photos.filter(photo => photo.id !== photoId));
    };
    const handlePhotoUpdated = (updatedPhoto) => {
        setPhotos(photos.map(photo => 
            photo.id === updatedPhoto.id ? updatedPhoto : photo
        ));
    };

    return (
        <>
            <AddCatPhotoForm onPhotoAdded={handlePhotoAdded} />
            {photos.map((photo) => (
                <Card key={photo.id} style={{ width: '18rem', margin: 'auto', marginBottom: '20px' }}>
                    <CatPhoto photo={photo} onPhotoDeleted={handlePhotoDeleted} onPhotoUpdated={handlePhotoUpdated} />
                </Card>
            ))}
        </>
    );
};

export default CatPhotoList;
