import React, { Component } from 'react';
import Scene from '../scene/Scene.js';
import Lumberjack from '../lumberjack/Lumberjack.js';
import './Game.css';

const KEYS = {
    W: 87,
    A: 65,
    S: 83,
    D: 68,
};

class Game extends Component
{
    constructor()
    {
        super();
        this.state = {
            display: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            context: null,
            score: 0,
            keyMap: {
                W: false,
                A: false,
                S: false,
                D: false
            }
        };
        this.player = [];
        this.scene = [];
        this.enemy = [];
        this.bullets = [];
    }

    componentDidMount()
    {
        window.addEventListener('resize', this.windowResizing);
        //window.addEventListener('mousemove', this.keyHandler.bind(this));
        window.addEventListener('keydown', this.keyHandler.bind(this, true));
        window.addEventListener('keyup', this.keyHandler.bind(this, false));

        const context = this.refs.canvas.getContext('2d');
        this.setState( {context: context} );

        this.initGame();
				requestAnimationFrame(() => { this.update() });
    }

    update()
    {
        const context = this.state.context;
        const player = this.player[0];
        context.save();

        context.fillStyle = '#fff';
        context.globalAlpha = 1;
        context.fillRect(0, 0, this.state.display.width, this.state.display.height);
        //context.globalAlpha = 1;

        this.player[0].render(this.state);

        this.updateElements(this.player, 'player');
        context.restore();
        requestAnimationFrame(() => { this.update() });
    }

    windowResizing()
    {
        this.setState = {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    initGame()
    {
        this.initScene();
        this.initLumberjack();
    }

    createElement(object, group)
    {
        this[group].push(object);
    }

    updateElements(elements, group)
    {
        for(let element of elements)
        {
            element.render(this.state);
        }
    }

    keyHandler(keyState, e)
    {
        let keyMap = this.state.keyMap;
        if(e.keyCode === KEYS.W) keyMap.W = keyState;
        if(e.keyCode === KEYS.A) keyMap.A = keyState;
        if(e.keyCode === KEYS.S) keyMap.S = keyState;
        if(e.keyCode === KEYS.D) keyMap.D = keyState;

        this.setState({
            keyMap: keyMap
        });
    }

    initScene() {
      let scene = new Scene();
      this.createElement(scene, 'scene');
    }

    initLumberjack()
    {
        let lumberjack = new Lumberjack({
            position: {
                x: this.state.display.width / 2,
                y: this.state.display.height / 2
            },
            create: this.createElement.bind(this),
						state: this.state

        });
        this.createElement(lumberjack, 'player');
    }

    handleMouse()
    {

    }

    handleKeys()
    {

    }

    render()
    {
        return (
            <div className="crazy-lumberjack">
                <canvas className="game-canvas"
                width={this.state.display.width}
                height={this.state.display.height}
                ref="canvas"/>
            </div>
        );
    }
};

export default Game;
