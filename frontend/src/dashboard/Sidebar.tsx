

import React from 'react';

interface SidebarProps {
  userType: 'usher' | 'eventPlanner';
}

const Sidebar: React.FC<SidebarProps> = ({ userType }) => {
  return (
    <div className="sidebar">
      {/* Sidebar content */}
      <h2>Sidebar</h2>
      <p>User Type: {userType}</p>
    </div>
  );
}

export default Sidebar;
