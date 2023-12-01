import React, { useState } from 'react';
import axios from 'axios';
import CommentsSection from './CommentsSection';
import { Button } from 'react-bootstrap';
import EditThreadForm from './forms/EditThreadForm';
import './css/Thread.css';

const Thread = ({ thread, onThreadUpdated, onThreadDeleted }) => {
    const [isEditing, setIsEditing] = useState(false);
    const currentUserID = localStorage.getItem('currentUserID');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    console.log("Current user ID:", currentUserID);
    console.log("Is Admin:", isAdmin);
    console.log("Thread user ID:", thread.user);
    const handleVote = async (voteType) => {
        try {
            await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/vote/',
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
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/threads/${thread.id}/`, {
                headers: {
                    'Authorization': `Token ${userToken}`,
                },
            });

            onThreadDeleted(thread.id);
        } catch (error) {
            console.error('Error deleting thread', error);
        }
    };

    const handleThreadUpdated = (updatedThread) => {
        onThreadUpdated(updatedThread);
        setIsEditing(false);
    };

    return (
        <div className="thread-container">
            {isEditing ? (
                <EditThreadForm thread={thread} onThreadUpdated={handleThreadUpdated} />
            ) : (
                <>
                    <h3 className="thread-title">{thread.title}</h3>
                    <p className="thread-content">{thread.content}</p>
                    <div className="thread-buttons">
                        <Button variant="outline-primary" onClick={() => handleVote('up')}>Upvote</Button>
                        <Button variant="outline-secondary" onClick={() => handleVote('down')}>Downvote</Button>
                        {(currentUserID.toString() === thread.user.toString() || isAdmin) && (
                            <>
                                <Button onClick={() => setIsEditing(true)}>Edit</Button>
                                <Button variant="danger" onClick={handleDelete}>Delete</Button>
                            </>
                        )}
                    </div>
                    <CommentsSection type="thread" typeId={thread.id} />
                </>
            )}
        </div>
    );
};

export default Thread;