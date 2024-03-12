import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import {
  FormContainer,
  Input,
  Button,
} from './styles';

interface SignInData {
  username: string;
  password: string;
}

interface ErrorResponse {
  message: string;
}

const SignInForm: React.FC = () => {
  const [signInData, setSignInData] = useState<SignInData>({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', signInData);
      // Assuming the backend returns a token upon successful login
      const token = response.data.token;
      // Redirect to user account page or perform any other action
      window.location.href = '/account'; // Redirect to the account page
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        setMessage(axiosError.response?.data.message || 'An error occurred.');
      } else {
        setMessage('An error occurred.');
      }
    }
  };

  const handleSignUpClick = () => {
    // Redirect to the signup page
    window.location.href = '/signup';
  };

  return (
    <FormContainer>
      <h2>Sign In</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={signInData.username}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={signInData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit">Sign In</Button>
        <Button type="button" onClick={handleSignUpClick}>Sign Up</Button>
      </form>
    </FormContainer>
  );
};

export default SignInForm;
