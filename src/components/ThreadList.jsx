import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Thread from './Thread';
import AddThreadForm from './forms/AddThreadForm';
import './css/ThreadList.css';

const ThreadList = () => {
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        const fetchThreads = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/threads/', {
                    headers: { 'Authorization': `Token ${localStorage.getItem('token')}` }
                });
                setThreads(response.data);
            } catch (error) {
                console.error('Error fetching threads', error);
            }
        };
        fetchThreads();
    }, []);

    const handleThreadAdded = (newThread) => {
        setThreads([...threads, newThread]);
    };

    const handleThreadUpdated = (updatedThread) => {
        setThreads(threads.map(thread => {
            if (thread.id === updatedThread.id) {
                return updatedThread;
            }
            return thread;
        }));
    };

    const handleThreadDeleted = (threadId) => {
        setThreads(threads.filter(thread => thread.id !== threadId));
    };

    return (
        <div className="thread-list-container">
            <AddThreadForm onThreadAdded={handleThreadAdded} />
            {threads.map(thread => (
                <div key={thread.id} className="thread-item">
                    <Thread
                        thread={thread}
                        onThreadUpdated={handleThreadUpdated}
                        onThreadDeleted={handleThreadDeleted}
                    />
                </div>
            ))}
        </div>
    );
};

export default ThreadList;
