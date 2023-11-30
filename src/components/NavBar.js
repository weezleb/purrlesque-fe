import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const NavBar = ({ isLoggedIn, onLogout, onLoginClick }) => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">Purrlesque</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                {!isLoggedIn && (
                <Nav.Link onClick={onLoginClick}>Login</Nav.Link>
            )}
                    <Nav.Link as={Link} to="/threads">Threads</Nav.Link>
                    {isLoggedIn ? (
                        <Nav.Link onClick={onLogout}>Logout</Nav.Link>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
