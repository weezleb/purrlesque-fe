import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import AddCatPhotoForm from './forms/CatPhotoForm';
import CatPhoto from './CatPhoto';
import './css/CatPhotoList.css';

const CatPhotoList = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/catphotos/', {
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
        <div className="cat-photo-list-container">
            <AddCatPhotoForm onPhotoAdded={handlePhotoAdded} />
            {photos.map((photo) => (
                <Card key={photo.id} className="cat-photo-card">
                    <CatPhoto photo={photo} onPhotoDeleted={handlePhotoDeleted} onPhotoUpdated={handlePhotoUpdated} />
                </Card>
            ))}
        </div>
    );
};

export default CatPhotoList;
