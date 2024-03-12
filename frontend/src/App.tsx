import React, { useState } from 'react';
import axios from 'axios';
import { PageContainer, FormContainer, Input, ButtonContainer, Button } from './styles';

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
        const axiosError = error as any; // Use any type here
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
    <PageContainer>
      <FormContainer>
        <h2>Get Started</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            value={signInData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <Input
            type="password"
            name="password"
            value={signInData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <ButtonContainer>
            <Button type="submit">Sign In</Button>
            <Button type="button" onClick={handleSignUpClick}>Sign Up</Button>
          </ButtonContainer>
        </form>
      </FormContainer>
    </PageContainer>
  );
};


const App: React.FC = () => {
  return (
    <div>
      <SignInForm />
    </div>
  );
};

export default App;
