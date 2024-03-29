/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CountrySelector from '../Components/Country';

import backgroundImage from '../assets/background.jpg';

// Styled components for styling
const BackgroundSection = styled.div`
  flex: 1;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  width: 1400px;
  height: 100vh;
  margin: 0;
  padding: 0;
`;

const Container = styled.div`
  display: flex;
  justify-content: right;
`;

const FormContainer = styled.div`
  width: 35%;
  background: #fff;
  padding:2%;
  border: 0.5px solid #ccc;
`;

const FormGroup = styled.div`
  margin-top: 0;
`;

const Label = styled.label`
  display: flex;
  width: 30%;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 105%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

// Styled button component
const Button = styled.button`
  padding: 10px 0;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
`;

// Link component for redirecting to sign-in page
const SignInLink = styled.a`
  display: block;
  margin-top: 10px;
  text-align: center;
  color: blue;
  text-decoration: underline;
`;

const SignUpForm = () => {
  // State for form data and error message
  const [signUpData, setSignUpData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    age: '',
    gender: '',
    height: '',
    country: '',
    phone: '',
  });
  const [message, setMessage] = useState('');

  // Function to handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  // State for phone number and selected country mobile code
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountryMobileCode, setSelectedCountryMobileCode] = useState<string>('+44');

  // Callback function for handling country selection
  const handleCountrySelect = (selectedCountry: any) => {
    setSelectedCountryMobileCode(selectedCountry.mobileCode);
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register', signUpData);
      // Handle successful registration
      console.log(response.data);
    } catch (error) {
      // Handle registration error
      console.error(error);
    }
  };

  // Form component with input fields and submit button
  return (
    <BackgroundSection>
      <Container>
        <FormContainer>
          <h2>Sign Up</h2>
          {message && <ErrorMessage>{message}</ErrorMessage>}
          <form onSubmit={handleSubmit}>
            {/* Input fields */}
            <FormGroup>
              <Label htmlFor="email">Email Address:</Label>
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
              <Label htmlFor="firstName">First Name:</Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={signUpData.firstName}
                onChange={handleChange}
                required
              />
              <Label htmlFor="lastName">Last Name:</Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={signUpData.lastName}
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
              <Label htmlFor="age">Age:</Label>
              <Input
                type="number"
                id="age"
                name="age"
                value={signUpData.age}
                onChange={handleChange}
                required
              />
              <Label htmlFor="gender">Gender:</Label>
              <Select
                id="gender"
                name="gender"
                value={signUpData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
              <Input
                type="text"
                id="height"
                name="height"
                value={signUpData.height}
                onChange={handleChange}
                placeholder={`Enter your Height`}
                required
              />
            </FormGroup>
            <FormGroup>
            <CountrySelector onCountrySelect={handleCountrySelect} />
            </FormGroup>
            <FormGroup>

              <Input
                type="text"
                id="phone"
                name="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder={`Enter your phone number ${selectedCountryMobileCode}`}
                required
              />
            </FormGroup>
            <FormGroup>
              {/* Sign In link */}
              <SignInLink href="/">Already have an account? Sign In</SignInLink>
              {/* Submit button */}
              <Button type="submit">Sign Up</Button>
            </FormGroup>
          </form>
        </FormContainer>
      </Container>
    </BackgroundSection>
  );
};

export default SignUpForm;

