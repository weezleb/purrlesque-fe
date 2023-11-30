import React from 'react';
import CatPhotoList from './CatPhotoList';
import { Button } from 'react-bootstrap';


const HomePage = ({ isLoggedIn, onLoginClick }) => {
    return (
        <div className="container mt-3">
            <h1>Welcome to Purrlesque!</h1>
            {isLoggedIn ? (
                <CatPhotoList />
            ) : (
                <div>
                    <p>Please log in to see cat photos.</p>
                    <Button onClick={onLoginClick}>Login</Button>
                </div>
            )}
        </div>
    );
};

export default HomePage;
