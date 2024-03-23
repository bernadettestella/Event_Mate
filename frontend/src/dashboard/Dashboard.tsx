// Dashboard.tsx

import React from 'react';

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
  );
}

export default Dashboard;
