import React from 'react';

const player = (props) => {
    return (
        <div className="row">
            <h5 className="col s12 center-align">
                <span className="title">{props.label} Chose:</span>{" "}
                <span className="weapon">{props.weapon}</span>
            </h5>
        </div>
    );
};

export default player;