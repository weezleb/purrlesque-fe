import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './css/NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const NavBar = ({ isLoggedIn, onLogout, onLoginClick }) => {
    return (
        <Navbar className="navbar" expand="lg">
            <Navbar.Brand as={Link} to="/" className="navbar-brand">Purrlesque</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse">
                <Nav className="me-auto">
                    {!isLoggedIn && (
                        <Nav.Link onClick={onLoginClick} className="nav-link">Login</Nav.Link>
                    )}
                    <Nav.Link as={Link} to="/threads" className="nav-link">Threads</Nav.Link>
                    {isLoggedIn ? (
                        <Nav.Link onClick={onLogout} className="nav-link">Logout</Nav.Link>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register" className="nav-link">Register</Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
