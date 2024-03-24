import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons';

// Styled components for the navigation bar
const Navbar = styled.nav`
  background-color: #333;
  overflow: hidden;
`;

const NavLink = styled.a`
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 20px;
  text-decoration: none;
  font-size: 17px;

  &:hover {
    background-color: #ddd;
    color: black;
  }
`;

const IconContainer = styled.div`
  float: right;
`;

const SearchIcon = styled.div`
  float: right;
  margin-top: 13px;
  margin-right: 20px;
`;

interface DashboardProps {
  userName: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userName }) => {
  return (
    <div>
      <Navbar>
        <NavLink href="#">Home</NavLink>
        <NavLink href="#">About Us</NavLink>
        <NavLink href="#">Our Services</NavLink>
        <NavLink href="#">Contact Us</NavLink>
        <NavLink href="#">Apply</NavLink>
        <IconContainer>
          <NavLink href="#"><FontAwesomeIcon icon={faUser} /></NavLink>
        </IconContainer>
        <SearchIcon>
          <FontAwesomeIcon icon={faSearch} />
        </SearchIcon>
      </Navbar>

      {/* Welcome message */}
      <div>
        <h1>Welcome, {userName} to EventMate</h1>
        {/* Add more content as needed */}
      </div>
    </div>
  );
};

export default Dashboard;
