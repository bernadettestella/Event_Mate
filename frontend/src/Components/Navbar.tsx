// Navbar.tsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Import NavLink and useNavigate
import styled from 'styled-components';

const Nav = styled.nav`
	display: flex;
	align-items: center;
	background-color: #007bff;
	justify-content: space-between;
	width: 100%;
	margin: 0 auto;
`;

const NavLinks = styled.div`
	display: flex;
	align-items: center;
	color: #fff;
	justify-content: space-between;
	gap: 3em;
	font-weight: 600;
	cursor: pointer;
`;

const Logo = styled.h2`
	font-size: 24px;
	color: #fff;
`;

const Navbar: React.FC = () => {
  const navigate = useNavigate(); // Use useNavigate hook to navigate between routes

  const handleHomeClick = () => {
    navigate('../Pages/home'); // Navigate to Home page
  };
  const handleAboutClick = () => {
    navigate('../Pages/about'); // Navigate to About page
  };
  const handleSignInClick = () => {
    navigate('../Pages/signin'); // Navigate to SignIn page
  };

  const handleSignUpClick = () => {
    navigate('../Pages/signup'); // Navigate to SignUp page
  };
  const handleBlogClick = () => {
    navigate('../Pages/blog'); // Navigate to blog page
  };

  return (
    <Nav>
      <Logo>EventMate</Logo>
        <NavLinks>
		<div onClick={handleHomeClick}>Home</div>
        <div onClick={handleAboutClick}>About</div>
        <div onClick={handleSignInClick}>Sign In</div>
        <div onClick={handleSignUpClick}>Sign Up</div>
		<div onClick={handleBlogClick}>Blog</div>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
