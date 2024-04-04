import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaKey, FaUser } from 'react-icons/fa';
import Input from '../Components/Input';
import { BackgroundSection, FormSection, FormContainer, SignIn, CreateAccount, ButtonContainer, Button, ForgotPasswordLink, SignInFooter, RememberMeLabel, TermsOfServiceLink } from './styles';

const baseURL = 'http://localhost:5000/api';

const SignInForm = () => {
  const navigate = useNavigate();
  const [signInData, setSignInData] = useState({
    username: '',
    password: '',
    userType: 'usher' // Default userType
  });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInData({ ...signInData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/login`, signInData);
      if (response.status === 200) {
        navigate('/dashboard'); // Redirect to dashboard upon successful login
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error);
      } else {
        setMessage('An error occurred.');
      }
    }
  };

  const handleCreateAccountClick = () => {
    navigate('/signup');
  };

  const handleForgotPasswordClick = () => {
    navigate('/forgot-password');
  };

  return (
    <BackgroundSection>
      <FormSection>
        <FormContainer>
          <h1>EventMate</h1>
          <CreateAccount>
            <span onClick={handleCreateAccountClick} style={{ cursor: 'pointer', color: 'blue' }}>Create an account</span>
          </CreateAccount>
          <SignIn><h4>Sign In</h4></SignIn>
          {message && <p>{message}</p>}
          <form onSubmit={handleSubmit}>
            <Input
              type="username"
              name="username"
              value={signInData.username}
              onChange={handleChange}
              placeholder="Username"
              iconLeft={<FaUser />}
              required
            />
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={signInData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              iconLeft={<FaKey />}
              iconRight={showPassword ? <FaEyeSlash onClick={togglePasswordVisibility} /> : <FaEye onClick={togglePasswordVisibility} />}
            />
            <ButtonContainer>
              <Button type="submit">Log In</Button>
            </ButtonContainer>
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
          </form>
        </FormContainer>
      </FormSection>
    </BackgroundSection>
  );
};

export default SignInForm;
