import React, { useState } from 'react';
import axios from 'axios';
import CommentsSection from './CommentsSection';
import { Button } from 'react-bootstrap';
import EditThreadForm from './forms/EditThreadForm';

const Thread = ({ thread, onThreadUpdated, onThreadDeleted }) => {
    const [isEditing, setIsEditing] = useState(false);
    const currentUserID = localStorage.getItem('currentUserID');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    const handleVote = async (voteType) => {
        try {
            await axios.post('http://localhost:8000/api/vote/',
                { thread: thread.id, vote_type: voteType },
                { headers: { 'Authorization': `Token ${localStorage.getItem('token')}` } }
            );
        } catch (error) {
            console.error('Error submitting vote', error);
        }
    };

    const handleDelete = async () => {
        const userToken = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8000/api/threads/${thread.id}/`, {
                headers: {
                    'Authorization': `Token ${userToken}`,
                },
            });
    
            onThreadDeleted(thread.id);
        } catch (error) {
            console.error('Error deleting thread', error);
        }
    };
    

    return (
        <div>
            {isEditing ? (
                <EditThreadForm 
                    thread={thread} 
                    onThreadUpdated={(updatedThread) => {
                        setIsEditing(false);
                        onThreadUpdated(updatedThread);
                    }} 
                />
            ) : (
                <>
                    <h3>{thread.title}</h3>
                    <p>{thread.content}</p>
                    <Button variant="outline-primary" onClick={() => handleVote('up')}>Upvote</Button>
                    <Button variant="outline-secondary" onClick={() => handleVote('down')}>Downvote</Button>
                    <CommentsSection type="thread" typeId={thread.id} />

                    {(currentUserID === thread.user || isAdmin) && (
                        <>
                            <Button onClick={() => setIsEditing(true)}>Edit</Button>
                            <Button variant="danger" onClick={handleDelete}>Delete</Button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Thread;
