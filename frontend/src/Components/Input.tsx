import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const Icon = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.position === 'left' ? 'left: 10px;' : 'right: 10px;')} /* Adjust icon position */
  color: #aaa;
  cursor: pointer; /* Add cursor pointer */
`;

const StyledInput = styled.input<{ hasIcon: boolean }>`
  width: calc(100% - ${(props) => (props.hasIcon ? '40px' : '24px')}); /* Adjust width based on the presence of icons */
  padding: 12px;
  padding-left: ${(props) => (props.hasIcon ? '40px' : '12px')}; /* Adjust padding left */
  padding-right: 12px; /* Fixed padding right */
  border: 1px solid #ccc;
  border-radius: 4px;
`;

interface InputProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  iconLeft?: React.ReactNode; // Add iconLeft prop
  iconRight?: React.ReactNode; // Add iconRight prop
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  iconLeft,
  iconRight,
}) => {
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <InputContainer>
      {iconLeft && <Icon position="left">{iconLeft}</Icon>}
      <StyledInput
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        hasIcon={!!iconLeft || !!iconRight} // Check if any icon is present
      />
      {iconRight && (
        <Icon position="right" onClick={togglePasswordVisibility}>
          {iconRight}
        </Icon>
      )}
    </InputContainer>
  );
};

export default Input;
