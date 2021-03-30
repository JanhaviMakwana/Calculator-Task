import React from 'react';
import './History.css';

const history = (props) => {

    const history = props.history.slice().reverse();
    console.log(history);
    const moves = history.map((move, i) => {
        return <li key={i} className="history-list">{move}</li>
    });

    return (
        <div className="history">
            <ul>
                {moves}
            </ul>
        </div>
    )
};

export default history;