import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const SignupPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ username: '', password: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/auth/register/', userData);
      if (response.data.token) {
        const { token, userId, isAdmin } = response.data;
                onLogin(token, userId, isAdmin);
                navigate('/');
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" value={userData.username} onChange={handleChange} placeholder="Username" />
      <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" />
      <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password" />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupPage;
