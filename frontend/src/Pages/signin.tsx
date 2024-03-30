import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaKey, FaUser } from 'react-icons/fa';
import Input from '../Components/Input';
import axios from 'axios';
import {
  BackgroundSection,
  FormSection,
  FormContainer,
  SignIn,
  CreateAccount,
  ButtonContainer,
  Button,
  ForgotPasswordLink,
  SignInFooter,
  RememberMeLabel,
  TermsOfServiceLink
} from '../styles';

const SignInForm: React.FC = () => {
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const [signInData, setSignInData] = useState({ email: '', password: '', rememberMe: false }); // State for form data
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [message, setMessage] = useState(''); // State for error message

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value; // Handle checkbox input
    setSignInData({ ...signInData, [name]: val });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', signInData);
      setMessage(response.data); // Assuming backend returns a message
      // Redirect to user account page or perform any other action
      window.location.href = '/Dashboard'; // Redirect to the account page
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as any; // Use any type here
        setMessage(axiosError.response?.data.message || 'An error occurred.');
      } else {
        setMessage('An error occurred.');
      }
    }
  };

  const handleCreateAccountClick = () => {
    // Implement navigation to create account page
    window.location.href = './signup';
  };

  const handleForgotPasswordClick = () => {
    // Implement navigation to forgot password page
    window.location.href = './ForgotPass';
  };

  return (
    <BackgroundSection>
      <FormSection>
        {showForm && (
          <FormContainer>
            <h1>EventMate</h1>
            <CreateAccount><span onClick={handleCreateAccountClick}>Create an account</span></CreateAccount>
            <SignIn><h4>Sign In</h4></SignIn>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
              <Input
                type="email"
                name="email"
                value={signInData.email}
                onChange={handleChange}
                placeholder="Email Address"
                icon={<FaUser />}
                required
              />
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={signInData.password}
                onChange={handleChange}
                placeholder="Password"
                icon={<FaKey />}
                required
                autoComplete="current-password"
                endIcon={showPassword ? <FaEyeSlash onClick={togglePasswordVisibility} /> : <FaEye onClick={togglePasswordVisibility} />}
              />
              <SignInFooter>
                <RememberMeLabel>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={signInData.rememberMe}
                    onChange={handleChange}
                  />
                  Remember Me
                </RememberMeLabel>
                <ForgotPasswordLink onClick={handleForgotPasswordClick}>Forgot Password?</ForgotPasswordLink>
              </SignInFooter>
              <ButtonContainer>
                <Button type="submit">Log In</Button>
              </ButtonContainer>
              <TermsOfServiceLink>Terms of Service and Privacy Policy</TermsOfServiceLink>
            </form>
          </FormContainer>
        )}
        <SignIn onClick={toggleForm}>Sign In</SignIn>
      </FormSection>
    </BackgroundSection>
  );
};

export default SignInForm;
