// types.ts

import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element; // Define the icon prop
}
