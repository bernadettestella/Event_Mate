import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-left: 100%;
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
  padding: 10px 0; 
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 105%; 
`;

export const ForgotPasswordLink = styled.span`
  margin-top: 10px; /* Add space between buttons and link */
  cursor: pointer;
  color: blue;
  text-decoration: underline;
`;
