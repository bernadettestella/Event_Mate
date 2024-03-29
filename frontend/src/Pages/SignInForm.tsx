import React, { useState } from 'react';
import axios from 'axios';

interface SignInData {
  username: string;
  password: string;
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
      const response = await axios.post('/login', signInData);
      setMessage(response.data); // Assuming backend returns a message
    } catch (error) {
      setMessage('An error occurred during sign-in.');
    }
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
          value={signInData.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={signInData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInForm;
