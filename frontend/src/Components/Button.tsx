import React from 'react';
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  /* Your button styles */
  background-color: ${props => (props.active ? 'blue' : 'gray')};
  color: white;
  padding: 10px 0;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
`;

const Button: React.FC<ButtonProps> = ({ children, active, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
