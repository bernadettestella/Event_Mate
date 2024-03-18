/* eslint-disable no-unused-vars */
import { useState } from 'react';
//import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-left: 120%;
  margin-right: auto;
  height: 100vh;
`;

const FormContainer = styled.div`
  width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

export const Button = styled.button`
  padding: 10px 0; /* Adjust padding to cover input width */
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
`;

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '', // New field
    mobile: '',
    location: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      // Implement sign-up functionality using signUpData
      setMessage('Sign up functionality will be implemented here.');
    } catch (error) {
      setMessage('An error occurred during sign-up.');
    }
  };

  return (
    <Container>
      <FormContainer>
        <h2>Sign Up</h2>
        {message && <ErrorMessage>{message}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={signUpData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="username">Username:</Label>
            <Input
              type="text"
              id="username"
              name="username"
              value={signUpData.username}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={signUpData.password}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password:</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={signUpData.confirmPassword}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="mobile">Mobile:</Label>
            <Input
              type="tel"
              id="mobile"
              name="mobile"
              value={signUpData.mobile}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="location">Location:</Label>
            <Input
              type="text"
              id="location"
              name="location"
              value={signUpData.location}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <Button type="submit">Sign Up</Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default SignUpForm;
