import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaKey, FaUser } from 'react-icons/fa';
import Input from './Components/Input';
import Navbar from './Components/Navbar'; // Import Navbar component
import SignInForm from './Pages/signin';
import SignUpForm from './Pages/signup';
import ForgotPasswordForm from './Pages/forgotpass';
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
} from './styles';
import backgroundImage from './assets/background.jpg';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
