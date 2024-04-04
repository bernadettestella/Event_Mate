import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
`;

const Home = () => {
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    usertype: '', // Add a field for user type (usher/planner)
  });

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    usertype: '', // Add a field for user type (usher/planner)
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', registerData);
      console.log(response.data);
      // Handle successful registration
    } catch (error) {
      console.error('Error registering user:', error.response.data);
      // Handle registration error
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', loginData);
      console.log(response.data);
      // Handle successful login
    } catch (error) {
      console.error('Error logging in:', error.response.data);
      // Handle login error
    }
  };

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <FormContainer>
      <h2>Register</h2>
      <Form onSubmit={handleRegister}>
        <Input type="text" name="username" placeholder="Username" value={registerData.username} onChange={handleRegisterInputChange} required />
        <Input type="email" name="email" placeholder="Email" value={registerData.email} onChange={handleRegisterInputChange} required />
        <Input type="password" name="password" placeholder="Password" value={registerData.password} onChange={handleRegisterInputChange} required />
        <select name="usertype" value={registerData.usertype} onChange={handleRegisterInputChange} required>
          <option value="">Select User Type</option>
          <option value="usher">Usher</option>
          <option value="planner">Planner</option>
        </select>
        <Button type="submit">Register</Button>
      </Form>

      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Input type="text" name="username" placeholder="Username" value={loginData.username} onChange={handleLoginInputChange} required />
        <Input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginInputChange} required />
        <select name="usertype" value={loginData.usertype} onChange={handleLoginInputChange} required>
          <option value="">Select User Type</option>
          <option value="usher">Usher</option>
          <option value="planner">Planner</option>
        </select>
        <Button type="submit">Login</Button>
      </Form>
    </FormContainer>
  );
};

export default Home;
