import React from 'react';
import Keypad from '../Keypad/Keypad';
import './Display.css';

class Display extends React.Component {
    render() {
        return (
            <div className="Display">
                <h1>CALCULATOR</h1>
                <Keypad />
            </div>
        );
    }

}

export default Display;