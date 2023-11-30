import React, { useState, useEffect } from 'react';
import AppRouter from './AppRouter';
import NavBar from './components/NavBar';
import LoginPage from './components/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
        setShowLogin(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    const handleShowLogin = () => {
        setShowLogin(true);
    };

    return (
        <div>
            <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} onLoginClick={handleShowLogin} />
            <AppRouter onLogin={handleLogin} isLoggedIn={isLoggedIn} onLoginClick={handleShowLogin} />
            <LoginPage show={showLogin} onHide={() => setShowLogin(false)} onLogin={handleLogin} />
        </div>
    );
}

export default App;
