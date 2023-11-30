import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import RegisterPage from './components/SignupPage';
import ThreadList from './components/ThreadList';

const AppRouter = ({ onLogin, isLoggedIn, onLoginClick }) => (
    <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} onLoginClick={onLoginClick} />} />
        <Route path="/register" element={<RegisterPage onLogin={onLogin} />} />
        <Route path="/threads" element={<ThreadList />} />
    </Routes>
);

export default AppRouter;
