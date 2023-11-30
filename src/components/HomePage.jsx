import React from 'react';
import CatPhotoList from './CatPhotoList';
import { Button } from 'react-bootstrap';
import './css/HomePage.css';


const HomePage = ({ isLoggedIn, onLoginClick }) => {
    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to Purrlesque!</h1>
            {isLoggedIn ? (
                <CatPhotoList />
            ) : (
                <div className="home-content">
                    <p>Please log in to see cat photos.</p>
                    <Button className="login-btn" onClick={onLoginClick}>Login</Button>
                </div>
            )}
        </div>
    );
};

export default HomePage;
