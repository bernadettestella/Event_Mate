import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CountrySelector from '../Components/Country';
import { AsYouType } from 'libphonenumber-js';
import EventPlannerForm from './EventPlanner';
import backgroundImage from '../assets/background.jpg';
import Button from '../Components/Button';

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
padding:2%;
border: 0.5px solid #ccc;
@media (max-width: 768px) {
  width: 100%;
}
`;

const FormGroup = styled.div`
  margin-bottom: 0.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 0.5rem;
`;

const SignInLink = styled.a`
  display: block;
  margin-top: 1rem;
  text-align: center;
  color: blue;
  text-decoration: underline;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ToggleLabel = styled.label`
  margin-right: 1rem;
`;

interface Country {
  mobileCode: string;
}

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: string;
  gender: string;
  height: string;
  country: string;
  phone: string;
}

const SignUpForm = () => {
  const [isUsher, setIsUsher] = useState(true);
  const handleToggle = () => {
    setIsUsher(!isUsher);
  };

  const [signUpData, setSignUpData] = useState<SignUpData>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    height: '',
    country: '',
    phone: '',
  });

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const formattedPhoneNumber = new AsYouType().input(value);
      setSignUpData({ ...signUpData, [name]: formattedPhoneNumber });
    } else {
      setSignUpData({ ...signUpData, [name]: value });
    }
    setErrors({ ...errors, [name]: '' });
  };

  const handleCountrySelect = (selectedCountry: Country) => {
    setSignUpData({ ...signUpData, country: selectedCountry.mobileCode });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = {};
    if (!signUpData.email || !signUpData.email.includes('@')) {
      validationErrors.email = 'Please enter a valid email address.';
    }
    if (!signUpData.password) {
      validationErrors.password = 'Please enter a password.';
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match.';
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('/register', signUpData);
        console.log(response.data);
      } catch (error) {
        setMessage('An error occurred during sign-up.');
      }
    }
  };

  return (
    <BackgroundSection>
      {isUsher && (
      <FormContainer>
        <h2>Usher Sign Up</h2>
        {message && <ErrorMessage>{message}</ErrorMessage>}
        <ToggleContainer>
          <ToggleLabel>
            <input
              type="checkbox"
              checked={isUsher}
              onChange={handleToggle}
            />
            {isUsher ? 'Usher' : 'Event Planner'}
          </ToggleLabel>
        </ToggleContainer>
        {isUsher && (
          <form onSubmit={handleSubmit}>
            {/* Render Usher sign-up form */}
            {/* Input fields */}
            <FormGroup>
            <Input type="email" id="email" name="email" value={signUpData.email} onChange={handleChange}placeholder=" Email Adress" required />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Input type="text" id="firstName" name="firstName" value={signUpData.firstName} onChange={handleChange} placeholder="First Name" required />
            <Input type="text" id="lastName" name="lastName" value={signUpData.lastName} onChange={handleChange} placeholder="Last Name"required />
          </FormGroup>
          <FormGroup>
            <Input type="password" id="password" name="password" value={signUpData.password} onChange={handleChange} placeholder="Enter Password" required />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Input type="password" id="confirmPassword" name="confirmPassword" value={signUpData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required/>
            {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Input type="number" id="age" name="age" value={signUpData.age} onChange={handleChange} placeholder="Enter your Age" required />
            <Label htmlFor="gender">Gender:</Label>
            <Select id="gender" name="gender" value={signUpData.gender} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
            <Input type="text" id="height" name="height" value={signUpData.height} onChange={handleChange} placeholder="Enter your Height" required />
          </FormGroup>
          <FormGroup>
            <CountrySelector onCountrySelect={handleCountrySelect} />
          </FormGroup>
          <FormGroup>
            <Input type="text" id="phone" name="phone" value={signUpData.phone} onChange={handleChange} placeholder="Enter your phone number" required />
          </FormGroup>
          <FormGroup>
            <SignInLink href="/">Already have an account? Sign In</SignInLink>
            <Button type="submit">Sign Up</Button>
          </FormGroup>

          </form>
        )}
        {!isUsher && <EventPlannerForm />} {/* Render Event Planner form if Event Planner is selected */}
        </FormContainer>
      )}
      {!isUsher && <EventPlannerForm />}
    </BackgroundSection>
  );
};

export default SignUpForm;
