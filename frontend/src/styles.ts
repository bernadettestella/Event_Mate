import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px; /* Adjust width as needed */
`;

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Spacing between buttons */
`;

export const Button = styled.button`
  padding: 10px 0; /* Adjust padding to cover input width */
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%; /* Button covers the width of the input */
`;

export const ForgotPasswordLink = styled.span`
  margin-top: 10px; /* Add space between buttons and link */
  cursor: pointer;
  color: blue;
  text-decoration: underline;
`;
