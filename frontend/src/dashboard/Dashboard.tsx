
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface DashboardProps {
  userName: string;
  userType: 'usher' | 'eventPlanner';
  phoneNumber: string;
  emailAddress: string;
  availableEvents: string[];
  // Add more props as needed
}

const Dashboard: React.FC<DashboardProps> = ({ userName, userType, phoneNumber, emailAddress, availableEvents }) => {
  return (
    <div>
      <Navbar /> {/* Include the navbar component */}
      <div className="container">
        <Sidebar userType={userType} /> {/* Pass userType as prop to the sidebar component */}
        <div className="main-content">
          <h2>Welcome to the Dashboard, {userName}!</h2>
          <p>Phone Number: {phoneNumber}</p>
          <p>Email Address: {emailAddress}</p>
          {userType === 'usher' && <p>You are logged in as an usher.</p>}
          {userType === 'eventPlanner' && <p>You are logged in as an event planner.</p>}
          <h3>Available Events:</h3>
          <ul>
            {availableEvents.map(event => (
              <li key={event}>{event}</li>
            ))}
          </ul>
          {/* Add more dashboard content here */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
