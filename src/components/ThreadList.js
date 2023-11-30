import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Thread from './Thread';
import AddThreadForm from './forms/AddThreadForm';

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

    return (
        <div>
            <AddThreadForm onThreadAdded={handleThreadAdded} />
            {threads.map(thread => (
                <Thread key={thread.id} thread={thread} />
            ))}
        </div>
    );
};

export default ThreadList;
