import React from 'react';

const Button = ({variant, ...props }) => <button type='button' {...props} className={`button ${variant} ${props.className}`} ></button>

export default Button;