import React from 'react';

const result = (props) => {
    return (
        <div>
            <div className="row">
                <h5 className="col s12 center-align">
                    <span className="title">Result:</span> {props.label}
                </h5>
            </div>
        </div>
    );
};

export default result;