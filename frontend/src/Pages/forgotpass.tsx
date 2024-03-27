import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 120%;
  height: 100vh;
`;

const Form = styled.form`
  width: 500px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Label = styled.label`
  margin-bottom: 8px;
`;

const Input = styled.input`
  width:96%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const SignInLink = styled.a`
  display: block;
  margin-top: 10px;
  text-align: center;
  color: blue;
  text-decoration: underline;
`;

const Message = styled.p`
  margin-top: 16px;
  color: red;
`;

const ForgottenPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('An error occurred.');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Forgotten Password</h2>
        {message && <Message>{message}</Message>}
        <Label htmlFor="email">Enter your registered email address</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={handleChange}
          required
        />
        
        <Button type="submit">Request reset link</Button>
        <SignInLink href="/">Back to Sign In</SignInLink>
      </Form>
    </Container>
  );
};

export default ForgottenPasswordPage;
