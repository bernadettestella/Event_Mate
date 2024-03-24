import React from 'react';
import styled from 'styled-components';
import logoImage from '../assets/Eventmate-logo.png';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px; 
`;

const Logo = styled.img`
  width: 100px; // Adjust the width of the logo as needed
  height: auto;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      {/* Use the Logo component */}
      <Logo src={logoImage} alt="Logo" />
      {/* Add other header elements here */}
    </HeaderContainer>
  );
};

export default Header;