import React from 'react';
import './Button.css';

const Button = (props) => (
    <button className="Button" onClick={props.clicked}>{props.name} </button>
);

export default Button;