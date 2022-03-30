import React, { MouseEventHandler } from 'react';

type ButtonProps = {
  variant?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<ButtonProps> = ({
  variant,
  className,
  type = 'button',
  onClick,
  ...props
}) => (
  <button
    type={type}
    onClick={onClick}
    {...props}
    className={`button ${variant} ${className}`}
  ></button>
);

export default Button;
