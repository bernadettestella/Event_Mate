import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
  font-weight: 500;
  cursor: pointer;
`;

const Logo = styled.h2`
  font-size: 24px;
  color: #fff;
`;

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/'); // Navigate to Home page
  };

  const handleAboutClick = () => {
    navigate('/about'); // Navigate to About page
  };

  const handleSignInClick = () => {
    navigate('/signin'); // Navigate to SignIn page
  };

  const handleCreateAccountClick = () => {
    navigate('/Pages/SignUp');
  };


  const handleContactUsClick = () => {
    navigate('/contact'); // Navigate to Contact page
  };

  return (
    <Nav>
      <Logo>EventMate</Logo>
      <NavLinks>
        <div onClick={handleHomeClick}>Home</div>
        <div onClick={handleAboutClick}>About</div>
        <div onClick={handleSignInClick}>Sign In</div>
        <div onClick={handleCreateAccountClick}>Sign Up</div>
        <div onClick={handleContactUsClick}>Contact Us</div>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
