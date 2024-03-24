import React from 'react';
import styled from 'styled-components';
import { InputProps as BaseInputProps } from './types';

const InputContainer = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const EndIconContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`;

const StartIconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
`;

interface InputProps extends BaseInputProps {
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ endIcon, startIcon, ...props }) => {
  return (
    <InputContainer>
      {startIcon && <StartIconContainer>{startIcon}</StartIconContainer>}
      <StyledInput {...props} />
      {endIcon && <EndIconContainer>{endIcon}</EndIconContainer>}
    </InputContainer>
  );
};

export default Input;
