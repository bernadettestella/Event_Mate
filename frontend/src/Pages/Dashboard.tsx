import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 20px;
`;

const SearchBar = styled.input`
  width: 300px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const FilterJobs = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-left: 10px;
`;

const UsherCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const EventCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const JobNotificationIcon = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
`;

const ProfilePictureUpload = styled.input`
  display: none;
`;

const ProfilePictureLabel = styled.label`
  display: inline-block;
  background-color: #007bff;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const ProfileUpdateForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-bottom: 20px;
`;

const ProfileUpdateInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ProfileUpdateButton = styled.button`
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const UsherDashboard = () => {
  const [ushers, setUshers] = useState([]);
  const [filteredUshers, setFilteredUshers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch ushers data from API
    axios.get('/api/ushers')
      .then(response => {
        setUshers(response.data);
        setFilteredUshers(response.data);
      })
      .catch(error => {
        console.error('Error fetching ushers data:', error);
      });

    // Fetch events data from API
    axios.get('/api/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events data:', error);
      });
  }, []);

  useEffect(() => {
    // Apply search filter
    const filtered = ushers.filter(usher => {
      return usher.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredUshers(filtered);
  }, [searchQuery, ushers]);

  useEffect(() => {
    // Apply filter option
    if (filterOption === 'hired') {
      const hiredUshers = ushers.filter(usher => usher.status === 'hired');
      setFilteredUshers(hiredUshers);
    } else if (filterOption === 'available') {
      const availableUshers = ushers.filter(usher => usher.status === 'available');
      setFilteredUshers(availableUshers);
    } else {
      setFilteredUshers(ushers);
    }
  }, [filterOption, ushers]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    // Handle profile picture upload
    const file = e.target.files[0];
    // Send file to server and update profile picture
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Handle profile update form submission
  };

  return (
    <DashboardContainer>
      <h1>EventMate Dashboard</h1>
      <SearchBar
        type="text"
        placeholder="Search Ushers..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <FilterJobs value={filterOption} onChange={handleFilterChange}>
        <option value="">All Jobs</option>
        <option value="hired">Hired</option>
        <option value="available">Available</option>
      </FilterJobs>
      {filteredUshers.map(usher => (
        <UsherCard key={usher.id}>
          <h2>{usher.name}</h2>
          <p>Status: {usher.status}</p>
          {/* Display other usher information here */}
        </UsherCard>
      ))}
      <h2>Available Events</h2>
      {events.map(event => (
        <EventCard key={event.id}>
          <h3>{event.name}</h3>
          {/* Display other event information here */}
        </EventCard>
      ))}
      <JobNotificationIcon>
        {/* Icon component for job notifications */}
      </JobNotificationIcon>
      <ProfilePictureLabel htmlFor="profile-picture">
        Upload Profile Picture
        <ProfilePictureUpload
          type="file"
          id="profile-picture"
          onChange={handleProfilePictureChange}
        />
      </ProfilePictureLabel>
      <ProfileUpdateForm onSubmit={handleProfileUpdate}>
        <ProfileUpdateInput type="text" placeholder="First Name" />
        <ProfileUpdateInput type="text" placeholder="Last Name" />
        <ProfileUpdateInput type="email" placeholder="Email" />
        <ProfileUpdateButton type="submit">Update Profile</ProfileUpdateButton>
      </ProfileUpdateForm>
    </DashboardContainer>
  );
};

export default UsherDashboard;
