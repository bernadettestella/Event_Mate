import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom'; // Import NavLink
import Navbar from '../Components/Navbar'; // Import Navbar component
import { FaEye, FaEyeSlash, FaKey, FaUser } from 'react-icons/fa';
import Input from '../Components/Input';
import backgroundImage from '../assets/background.jpg';
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
} from '../styles'; // Assuming your styles are imported from the correct path



const SignInForm: React.FC = () => {
  const [signInData, setSignInData] = useState<SignInData>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [message, setMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setSignInData({ ...signInData, [name]: val });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', signInData);
      const token = response.data.token;
      // Redirect to the dashboard or other page upon successful login
      navigate('/dashboard'); // Update to your actual dashboard route
    } catch (error) {
      // Handle login error
      console.error('Login error:', error);
      setMessage('An error occurred.');
    }
  };

  const handleForgotPasswordClick = () => {
    // Redirect to the forgot password page
    navigate('/forgot-password');
  };

  return (
    <>
      <Navbar /> {/* Include Navbar component */}
      <BackgroundSection style={{ backgroundImage: `url(${backgroundImage})` }}>
        <FormSection>
          <FormContainer>
          <h2>EventMate</h2>
            <CreateAccount as={NavLink} to="/signup">
              Create an account
            </CreateAccount>
            <SignIn>
              <h4>Sign In</h4>
            </SignIn>
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
    </>
  );
};
export default SignInForm;
