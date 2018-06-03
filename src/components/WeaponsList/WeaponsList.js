import React from 'react';
import {weapons} from '../../containers/Game/Game';


const weaponsList = (props) => {
    let classes;
    classes = props.gameMode !== "vs" ? 'row disabled' : 'row';

    const weaponList = Object.keys(weapons)
        .map((weapon, index) => {
            const addClass = index === 0 ? " offset-s3" : null;
            return <div
                key={weapon}
                title={weapons[weapon].title}
                className={"col s2 center-align" + addClass}
                onClick={() => props.weapon(weapon)}
            >
                <button className="btn btn-floating btn-large pulse valign-wrapper hoverable">
                    {weapons[weapon].icon}
                </button>
            </div>
        });

    return (
        <div className={classes}>
            {weaponList}
        </div>
    );
};

export default weaponsList;