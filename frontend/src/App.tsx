import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaKey, FaUser } from 'react-icons/fa'; // Import icons for show/hide password
import Input from './Components/Input';
import Navbar from './Components/Navbar'; 
import Home from './Pages/home';
import SignUpForm from './Pages/signin';
import SignUpForm from './Pages/SignUp';
import ForgotPasswordForm from './Pages/ForgotPass';
import { BackgroundSection, FormSection, FormContainer,SignIn, CreateAccount, ButtonContainer, Button, ForgotPasswordLink, SignInFooter, RememberMeLabel, TermsOfServiceLink } from './styles';

import backgroundImage from './assets/background.jpg'; // Import your background image



const App: React.FC = () => {
  return (
    <Router>
      <Navbar /> {/* Include the Navbar component */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;