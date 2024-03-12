import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface FormData {
  username: string;
  password: string;
}

interface ErrorResponse {
  message: string;
}

const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users', formData);
      setMessage(response.data.message);
      setFormData({ username: '', password: '' });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        setMessage(axiosError.response?.data.message || 'An error occurred.');
      } else {
        setMessage('An error occurred.');
      }
    }
  };

  const handleSignInClick = () => {
    // Implement sign-in functionality here
  };

  return (
    <div>
      <h2>Get Started</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
        <button type="button" onClick={handleSignInClick}>Sign In</button>
      </form>
    </div>
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
