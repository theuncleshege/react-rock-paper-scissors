import React, { Component } from 'react';
import WeaponsList from "../../components/WeaponsList/WeaponsList";
import Player from "../../components/Player/Player";
import Result from "../../components/Result/Result";
import Score from "../../components/Score/Score";

import './Game.css';

export const weapons = {
    rock: {
        title: "Rock",
        wins: ['scissors'],
        icon: <span className="symbol valign center-block" role="img" aria-label="rock">👊</span>
    },
    paper: {
        title: "Paper",
        wins: ['rock'],
        icon: <span className="symbol valign center-block" role="img" aria-label="paper">✋</span>
    },
    scissors: {
        title: "Scissors",
        wins: ['paper'],
        icon: <span className="symbol valign center-block" role="img" aria-label="scissors">✌️</span>
    },
};

const modes = {
    vs: {
        label: 'Player VS Computer',
        player1Label: 'Player',
        player2Label: 'Computer',
    },
    simulate: {
        label: 'Computer VS Computer',
        player1Label: 'Computer 1',
        player2Label: 'Computer 2',
    }
};

const modeKeys = Object.keys(modes);
const weaponKeys = Object.keys(weapons);

export const getRandomWeapon = () => {
    return weaponKeys[ weaponKeys.length * Math.random() << 0];
};

export const getWinner = (weapon1, weapon2) => {
    if (weapon1 === weapon2) return 0;
    return weapons[weapon1].wins.some(wins => wins === weapon2) ? 1 : 2;
};

const initialState = {
    mode: modeKeys[0],
    player1: {
        weapon: null,
        score: 0,
    },
    player2: {
        weapon: null,
        score: 0,
    },
    winner: null,
    visible: false
};

class Game extends Component {
    state = initialState;

    componentDidMount () {
        let currentState;
        if (localStorage.getItem('currentState')) {
            currentState = JSON.parse(localStorage.getItem('currentState'));
            this.setState({...currentState});
        }
    }

    componentWillUpdate (nextProps, nextState) {
        const newState = {...nextState};
        localStorage.setItem('currentState', JSON.stringify(newState));
    }


    /**
     * Update game mode
     */
    updateStateGameMode = (gameMode) => {
        localStorage.clear();
        this.setState({
            ...initialState,
            mode: gameMode
        });
    };


    /**
     * Toggle mode between player vs computer & computer vs computer
     */
    toggleGameModeHandler = () => {
        const newGameMode = this.state.mode === "vs" ? "simulate" : "vs";
        this.updateStateGameMode(newGameMode);
    };


    /**
     * Reset/Restart/End Game
     */
    resetGame = () => {
        const gameMode = this.state.mode;
        this.updateStateGameMode(gameMode);
    };


    /**
     * Play a round
     * @param weapon When passed, will be used as Player 1 weapon. Otherwise, will generate a random weapon
     */
    play = (weapon) => {
        const weapon1 = weapon || getRandomWeapon();
        const weapon2 = getRandomWeapon();
        this.setResult(weapon1, weapon2);
    };


    /**
     * Determine the winner and update player scores and winner in the state
     * @param weapon1  will be used as Player 1 weapon
     * @param weapon2  will be used as Player 2 weapon
     */
    setResult = (weapon1, weapon2) => {
        const winner = getWinner(weapon1, weapon2);
        this.setState({
            ...this.state,
            player1: {
                ...this.state.player1,
                weapon: weapon1,
                ...((winner === 1) ? { score: this.state.player1.score + 1 } : {})
            },
            player2: {
                ...this.state.player2,
                weapon: weapon2,
                ...((winner === 2) ? { score: this.state.player2.score + 1 } : {})
            },
            winner,
            visible: true
        });
    };

    render () {
        let showPlayers, showResults;

        const gameMode = this.state.mode;

        const playButton =
            gameMode !== "vs" ?
                <div>
                    <button className="play" onClick={() => this.play()}>Play
            </button>
                </div> : null;

        if (this.state.visible) {
            showPlayers = (
                <div>
                    <Player weapon={this.state.player1.weapon} label={modes[this.state.mode].player1Label} />
                    <Player weapon={this.state.player2.weapon} label={modes[this.state.mode].player2Label} />
                </div>
            );

            showResults = (
                <Result label={this.state.winner === 0 ? "Tie" : (this.state.winner === 1 ? modes[this.state.mode].player1Label : modes[this.state.mode].player2Label)+ " Wins"} />
            );
        }
        else {
            showPlayers = showResults = null;
        }

        return (
            <div className="container">
                <div className="wrapper valign-wrapper">
                    <div className="valign center">
                        <WeaponsList weapon={this.play} gameMode={gameMode} />
                        <button className="toggle" onClick={this.toggleGameModeHandler}>Change Game Mode
                        </button>
                        <div className="gameModeLabels">
                            {modes[this.state.mode].label}
                            {playButton}
                        </div>
                        <br/>
                        {showPlayers}
                        {showResults}
                        <Score player1={this.state.player1.score} player2={this.state.player2.score} labels={modes[this.state.mode]} />
                        <button className="resetgame" onClick={this.resetGame}>Restart/End Game
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;