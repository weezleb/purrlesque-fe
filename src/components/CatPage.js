import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import CommentsSection from './CommentsSection';
import EditPhotoForm from './forms/EditPhotoForm';
import 'bootstrap/dist/css/bootstrap.min.css';


const CatPhoto = ({ photo, onPhotoDeleted, onPhotoUpdated }) => {
    const userToken = localStorage.getItem('token');
    const currentUserID = localStorage.getItem('currentUserID');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    console.log("Current user ID:", currentUserID);
    console.log("Is Admin:", isAdmin);
    console.log("Photo user ID:", photo.userId);
    
    const handleVote = async (voteType) => {
        try {
            await axios.post('http://localhost:8000/api/vote/',
                { cat_photo: photo.id, vote_type: voteType },
                {
                    headers: {
                        'Authorization': `Token ${userToken}`,
                    },
                }
            );
        } catch (error) {
            console.error('Error submitting vote', error);
        }
    };

    const handleDelete = async (photoId) => {
        try {
            await axios.delete(`http://localhost:8000/api/catphotos/${photoId}/`, {
                headers: {
                    'Authorization': `Token ${userToken}`,
                },
            });

            onPhotoDeleted(photoId);
        } catch (error) {
            console.error('Error deleting cat photo', error);
        }
    };

    const [isEditing, setIsEditing] = useState(false);

    const handlePhotoUpdated = (updatedPhoto) => {
        onPhotoUpdated(updatedPhoto);
        onPhotoDeleted(updatedPhoto.id); 
        onPhotoDeleted(updatedPhoto); 
        setIsEditing(false);
    };

    return (
        <div>
            {isEditing ? (
                
                <EditPhotoForm photo={photo} onPhotoUpdated={handlePhotoUpdated} />
            ) : (
                
                <>
                    <img src={photo.image_url} alt={photo.caption} style={{ width: '100%' }} />
                    <p>{photo.caption}</p>
                    <Button variant="outline-primary" onClick={() => handleVote('up')}>Upvote</Button>
                    <Button variant="outline-secondary" onClick={() => handleVote('down')}>Downvote</Button>
                    <p>Upvotes: {photo.upvotes}</p>
                    <p>Downvotes: {photo.downvotes}</p>
                    <CommentsSection type="cat_photo" typeId={photo.id} />
                    {(parseInt(currentUserID) === photo.user_id || isAdmin) && (
                        <>
                            <Button onClick={() => setIsEditing(true)}>Edit</Button>
                            <Button variant="danger" onClick={() => handleDelete(photo.id)}>Delete</Button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default CatPhoto;
