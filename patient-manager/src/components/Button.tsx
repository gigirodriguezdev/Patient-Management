import React from 'react';
import { ButtonProps } from '../interfaces/interfaces';

export const Button = ({ onClick, buttonText }: ButtonProps) => {
  return (
    <button
      className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105"
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};
