import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import backgroundImage from '../assets/background.jpg';
import Button from '../Components/Button'; 
const baseURL = 'http://localhost:5000/api';

// Styled components for styling
const BackgroundSection = styled.div`
  flex: 1;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  width: 1400px;
  height: 100vh;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const FormContainer = styled.div`
width: 35%;
  background: #fff;
  padding: 2%;
  justify-content: right;
  border: 0.5px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
@media (max-width: 768px) {
  width: 100%;
}
`;

const FormGroup = styled.div`
  margin-bottom: 0.2rem;
`;

const Label = styled.label`
  display: flex;
  margin-bottom: 0.2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 0.5rem;
`;

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  jobDescription: string;
  location: string;
  phone: string;
}

const EventPlannerForm = () => {
  const [formData, setFormData] = useState<SignUpData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    jobDescription: '',
    location: '',
    phone: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        // Make API call to register event planner
        const response = await axios.post('/register-event-planner', formData);
        setMessage(response.data);
      } catch (error) {
        setMessage('An error occurred during sign-up.');
      }
    }
  };

  const validateFormData = (data: SignUpData) => {
    const errors: { [key: string]: string } = {};
    if (!data.firstName) {
      errors.firstName = 'Please enter your first name.';
    }
    if (!data.lastName) {
      errors.lastName = 'Please enter your last name.';
    }
    if (!data.email || !data.email.includes('@')) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!data.password) {
      errors.password = 'Please enter a password.';
    }
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }
    if (!data.jobDescription) {
      errors.jobDescription = 'Please enter your job description.';
    }
    if (!data.location) {
      errors.location = 'Please enter your location.';
    }
    if (!data.phone) {
      errors.phone = 'Please enter your phone number.';
    }
    return errors;
  };

  return (
    <BackgroundSection>
      <FormContainer>
        <h2>Event Planner Sign Up</h2>
        {message && <ErrorMessage>{message}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="firstName">First Name:</Label>
            <Input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
            {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="lastName">Last Name:</Label>
            <Input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
            {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email:</Label>
            <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password:</Label>
            <Input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password:</Label>
            <Input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="jobDescription">Job Description:</Label>
            <TextArea id="jobDescription" name="jobDescription" value={formData.jobDescription} onChange={handleChange} required />
            {errors.jobDescription && <ErrorMessage>{errors.jobDescription}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="location">Location:</Label>
            <Input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
            {errors.location && <ErrorMessage>{errors.location}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="phone">Phone:</Label>
            <Input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
            {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
          </FormGroup>
          <Button type="submit">Sign Up</Button>
        </form>
      </FormContainer>
    </BackgroundSection>
  );
};

export default EventPlannerForm;
