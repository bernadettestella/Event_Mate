import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaKey, FaUser } from 'react-icons/fa';
import Input from '../Components/Input';
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

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <BackgroundSection style={{ backgroundImage: `url(${backgroundImage})` }}>
      <FormSection>
        <FormContainer className={showForm ? 'show' : ''}>
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
        <SignIn onClick={toggleForm}>Sign In</SignIn>
      </FormSection>
    </BackgroundSection>
  );
}; 

export default SignInForm;
