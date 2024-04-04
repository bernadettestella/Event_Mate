import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaKey, FaUser } from 'react-icons/fa'; // Import icons for show/hide password
import Input from './Components/Input';
import SignUpForm from './Pages/SignUp';
import Navbar from './Components/Navbar'
//import Home from './Pages/home'
import EventPlannerForm from './Pages/EventPlanner';
import ForgotPasswordForm from './Pages/ForgotPass';
import UsherDashboard from './Pages/Dashboard';
import EventPlannerDashboard from './Pages/EventPlannerDashboard';
import { FormSection, FormContainer, SignIn, CreateAccount, ButtonContainer, Button, ForgotPasswordLink, SignInFooter, RememberMeLabel, TermsOfServiceLink } from './styles';

//import backgroundImage from './assets/background.jpg'; // Import your background image
//const baseURL = 'http://localhost:5000/api'; // Update with your Flask backend URL

interface SignInData {
  username: string;
  userType: string;
  password: string;
  rememberMe: boolean; // Add rememberMe property
}

interface ErrorResponse {
  message: string;
}

const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const [signInData, setSignInData] = useState<SignInData>({
    username: '',
    userType: '',
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
      const response = await axios.post('/api/login', signInData);  // Send login request to backend
      const token = response.data.token;
      // Store token in local storage or session storage for future requests
      localStorage.setItem('token', token); // Example: Storing token in local storage
      // Redirect to user account page or perform any other action
      if (signInData.userType === 'isUsher') {
        navigate('/Pages/Dashboard');
      } else {
        navigate('/Pages/EventPlannerDashboard');
      }
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
    navigate('/Pages/SignUp');
  };

  const handleForgotPasswordClick = () => {
    // Redirect to the forgot password page
    navigate('/Pages/ForgotPass');
  };

  return (
      <FormSection>
        <FormContainer>
          <h1>EventMate</h1>
          <CreateAccount><span onClick={handleCreateAccountClick} style={{ cursor: 'pointer', color: 'blue' }}>Create an account</span></CreateAccount>
          <SignIn><h4>Sign In</h4></SignIn>
          {message && <p>{message}</p>}
          <form onSubmit={handleSubmit}>
            <Input
              type="username"
              name="username"
              value={signInData.username}
              onChange={handleChange}
              placeholder="Username"
              iconLeft={<FaUser />} // Provide the email user icon as the iconLeft prop
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
            <Input
              type="userType"
              name="userType"
              value={signInData.userType}
              onChange={handleChange}
              placeholder="userType"
              required
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
  
  );
}; 

const App: React.FC = () => {
  return (
    <Router>
       <Navbar /> {/* Include the Navbar component */}
      <Routes>
        <Route path="/" element={<SignInForm />} />
        <Route path="/Pages/SignUp" element={<SignUpForm />} />
        <Route path="/Pages/EventPlanner" element={<EventPlannerForm />} />
        <Route path="/Pages/ForgotPass" element={<ForgotPasswordForm />} />
        <Route path="/Pages/Dashboard" element={<UsherDashboard />} />
        <Route path="/Pages/EventPlannerDashboard" element={<EventPlannerDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;