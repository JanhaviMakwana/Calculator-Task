import React from 'react';
import './Screen.css';

const screen = (props) => {
    return (
        <div className="screen">
            <input readOnly value={props.expr} />
        </div>
    );
}

export default screen;