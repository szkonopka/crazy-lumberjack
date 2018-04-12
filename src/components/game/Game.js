import React, { Component } from 'react';
import Lumberjack from '../lumberjack/Lumberjack.js';
import './Game.css';

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
            score: 0
        };
        this.player = [];
        this.enemy = [];
        this.bullets = [];
    }

    componentDidMount()
    {
        window.addEventListener('resize', this.windowResizing);

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
        context.globalAlpha = 0.4;
        context.fillRect(0, 0, this.state.display.width, this.state.display.height);
        context.globalAlpha = 1;

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

    initLumberjack()
    {
        let lumberjack = new Lumberjack({
            position: {
                x: this.state.display.width / 2,
                y: this.state.display.height / 2
            },
            create: this.createElement.bind(this)
            
        });
        window.addEventListener('mousemove', (e) => { lumberjack.rotate(e) });
        window.addEventListener('keydown', (e) => { lumberjack.move(e) });
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
