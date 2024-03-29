import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaKey, FaUser } from 'react-icons/fa'; // Import icons for show/hide password
import Input from './Components/Input';
import SignUpForm from './Pages/SignUp';
import ForgotPasswordForm from './Pages/ForgotPass';
import { BackgroundSection, FormSection, FormContainer,SignIn, CreateAccount, ButtonContainer, Button, ForgotPasswordLink, SignInFooter, RememberMeLabel, TermsOfServiceLink } from './styles';

import backgroundImage from './assets/background.jpg'; // Import your background image

interface SignInData {
  email: string;
  password: string;
  rememberMe: boolean; // Add rememberMe property
}

interface ErrorResponse {
  message: string;
}

const SignInForm: React.FC = () => {
  const [signInData, setSignInData] = useState<SignInData>({
    email: '',
    password: '',
    rememberMe: false, // Initialize rememberMe state
  });
  const [message, setMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false); // State to toggle password visibility

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value; // Handle checkbox input
    setSignInData({ ...signInData, [name]: val });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', signInData);
      // Assuming the backend returns a token upon successful login
      const token = response.data.token;
      // Redirect to user account page or perform any other action
      window.location.href = '/Pages/Dashboard'; // Redirect to the account page
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
    window.location.href = './Pages/SignUp';
  };

  const handleForgotPasswordClick = () => {
    // Redirect to the forgot password page
    window.location.href = './Pages/ForgotPass';
  };

  return (
    <BackgroundSection style={{ backgroundImage: `url(${backgroundImage})` }}>
      <FormSection>
        <FormContainer>
          <h1>EventMate</h1>
          <CreateAccount><span onClick={handleCreateAccountClick} style={{ cursor: 'pointer', color: 'blue' }}>Create an account</span></CreateAccount>
          <SignIn><h4>Sign In</h4></SignIn>
          {message && <p>{message}</p>}
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              name="Email"
              value={signInData.email}
              onChange={handleChange}
              placeholder="Email Address"
              icon={<FaUser />} // User icon
              required
            />
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={signInData.password}
              onChange={handleChange}
              placeholder="Password"
              icon={<FaKey />} // Key icon
              required
              autoComplete="current-password"
              endIcon={showPassword ? <FaEyeSlash onClick={togglePasswordVisibility} /> : <FaEye onClick={togglePasswordVisibility} />} // Eye icon to toggle password visibility
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
      </FormSection>
    </BackgroundSection>
  );
}; 

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInForm />} />
        <Route path="/Pages/SignUp" element={<SignUpForm />} />
        <Route path="/Pages/ForgotPass" element={<ForgotPasswordForm />} />
      </Routes>
    </Router>
  );
};
export default App;
