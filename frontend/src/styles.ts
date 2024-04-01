import styled from 'styled-components';
import backgroundImage from './assets/background.jpg';

export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export const BackgroundSection = styled.div`
  flex: 1;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  width: 1400px;
  height: 100vh;
  margin: 0;
  padding: 0;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FormSection = styled.div`
 flex: 1;
  display: flex;
  align: right;
  justify-content: right;

`;

export const FormContainer = styled.span`
  width: 30%;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 5%;
  height: 78.2vh;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SignIn = styled.div`
  margin-top: 5%;
  text-align: left;
  text-decoration: bold;
 
`;

export const CreateAccount = styled.div`
  margin-top: 5%;
  text-decoration: underline;
  text-align: right;
 
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  spacing: 4px;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px;
`;

export const Button = styled.button`
  padding: 10px 0; 
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 105%; 
  margin-bottom: 10%;
`;

export const ForgotPasswordLink = styled.span`
  margin-top: 10px;
  cursor: pointer;
  color: blue;
  text-decoration: underline;
`;

export const SignInFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const RememberMeLabel = styled.label`
  margin-top: 10px;
  color: #333;
`;

export const TermsOfServiceLink = styled.span`
  color: blue;
  text-decoration: underline;
  justify-content: center;

`;
