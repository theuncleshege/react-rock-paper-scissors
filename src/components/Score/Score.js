import React from 'react';

const score = (props) => {
    return (
        <div>
            <div className="scoreBox">
                <div className="row">
                    <div className="col s12 center-align">
                        <h5>
                            <span className="title">Score</span>
                        </h5>
                        <br />
                        <div className="row score">
                            {props.labels.player1Label}: {props.player1}
                        </div>
                        <div className="row score">
                            {props.labels.player2Label}: {props.player2}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default score;