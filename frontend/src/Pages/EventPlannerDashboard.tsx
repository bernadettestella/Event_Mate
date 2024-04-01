import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const DashboardContainer = styled.div`
  padding: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const UsherCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const ProfileName = styled.h3`
  margin: 10px 0;
`;

const ProfileEmail = styled.p`
  margin: 5px 0;
`;

const ProfileActions = styled.div`
  margin-left: 20px;
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
  margin-bottom: 10px;
`;

const ProfileUpdateForm = styled.form`
  display: flex;
  flex-direction: column;
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

const EventPlannerDashboard = () => {
  const history = useHistory();

  // State variables...

  useEffect(() => {
    // Fetch ushers data from API
    axios.get('/api/ushers')
      .then(response => {
        setUshers(response.data);
      })
      .catch(error => {
        console.error('Error fetching ushers data:', error);
      });
  }, []);

  const handlePostJob = () => {
    history.push('/post-job'); // Route to post job form
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    // Send file to server and update profile picture
    const formData = new FormData();
    formData.append('profilePicture', file);
    axios.post('/api/upload-profile-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      // Handle success
      console.log(response.data);
    })
    .catch(error => {
      // Handle error
      console.error('Error uploading profile picture:', error);
    });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const updatedProfileData = {
      firstName: // get first name value from form,
      lastName: // get last name value from form,
      email: // get email value from form,
      // Add other fields as needed
    };
    axios.post('/api/update-profile', updatedProfileData)
      .then(response => {
        // Handle success
        console.log(response.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error updating profile:', error);
      });
  };

  return (
    <DashboardContainer>
      <h1>Event Planner Dashboard</h1>
      {/* Display ushers details and status */}
      {ushers.map(usher => (
        <UsherCard key={usher.id}>
          <h2>{usher.name}</h2>
          <p>Status: {usher.status}</p>
          {/* Display other usher information */}
        </UsherCard>
      ))}
      {/* Post Job button */}
      <Button onClick={handlePostJob}>Post Job</Button>
      {/* User profile display and update */}
      <ProfileContainer>
        <ProfileInfo>
          <ProfilePicture src={profilePictureUrl} alt="Profile" />
          <ProfileName>{user.firstName} {user.lastName}</ProfileName>
          <ProfileEmail>{user.email}</ProfileEmail>
        </ProfileInfo>
        <ProfileActions>
          <ProfilePictureLabel htmlFor="profile-picture">
            Change Profile Picture
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
        </ProfileActions>
      </ProfileContainer>
    </DashboardContainer>
  );
};

export default EventPlannerDashboard;
