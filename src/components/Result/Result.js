import React from 'react';
import './Result.css';

const result = (props) => {
    return (
        <div className="result-screen">{props.result}</div>
    );
};

export default result;