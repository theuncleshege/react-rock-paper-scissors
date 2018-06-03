import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Game, {getWinner} from './Game';
import result from "../../components/result/result";

configure({adapter: new Adapter()});

describe('<Game />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Game />);
    });

    it('should toggle mode between "vs" and "simulate"', () => {
        let instance = wrapper.instance();
        instance.toggleGameModeHandler();
        expect(wrapper.state().mode).toEqual('simulate');
        instance.toggleGameModeHandler();
        expect(wrapper.state().mode).toEqual('vs');
    });

    it('should run a new play round in vs mode', () => {
        const weapon = 'rock';
        wrapper.instance().play(weapon);
        let state = wrapper.state();
        expect(state.player1.weapon).toEqual(weapon);
        expect(state.player2.weapon).not.toBeNull();
    });


    it('should run a new play round in simulate mode', () => {
        wrapper.setState({ mode: 'simulate' });
        wrapper.instance().play();
        let state = wrapper.state();
        expect(state.player1.weapon).not.toBeNull();
        expect(state.player2.weapon).not.toBeNull();
    });

    it ('should determine winner', () => {
        let winner = getWinner('paper', 'rock');
        expect(winner).toEqual(1);
        winner = getWinner('rock', 'paper');
        expect(winner).toEqual(2);
        winner = getWinner('rock', 'scissors');
        expect(winner).toEqual(1);
        winner = getWinner('scissors', 'rock');
        expect(winner).toEqual(2);
        winner = getWinner('scissors', 'paper');
        expect(winner).toEqual(1);
        winner = getWinner('paper', 'scissors');
        expect(winner).toEqual(2);
    });

    it('should set result', () => {
        let state;
        const test = (weapon1, weapon2) => {
            wrapper.setState({
                player1: { weapon: weapon1, score: 0 },
                player2: { weapon: weapon2, score: 0 },
            });
            wrapper.instance().setResult(weapon1, weapon2);
            state = wrapper.state();
            expect(state.winner).toEqual(getWinner(weapon1, weapon2));
        };
        test('rock', 'paper');
        expect(state.player1.score !== 0 || state.player2.score !== 0).toBe(true);
        test('rock', 'rock');
        expect(state.player1.score === 0 || state.player2.score === 0).toBe(true); // Tie
    });

    it('should render result', () => {
        expect(wrapper.text()).not.toContain('result');
        wrapper.setState({ visible: true });
        expect(wrapper.text()).toContain('result');
        wrapper.setState({ visible: false });
        expect(wrapper.text()).not.toContain('result');
    });

    it('should reset weapons and winner', () => {
        wrapper.setState({
            player1: { weapon: 'rock' },
            player2: { weapon: 'paper' },
            winner: 1,
        });
        wrapper.instance().resetGame();
        const state = wrapper.state();
        expect(state.player1.weapon).toBeNull();
        expect(state.player2.weapon).toBeNull();
        expect(state.winner).toBeNull();
    });
});