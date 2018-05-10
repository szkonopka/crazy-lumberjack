// import React, { Component } from 'react';
import './Lumberjack.css'
import Sprite from '../sprite/Sprite.js'

const DIRECTIONS = {

}

class Lumberjack
{
    constructor(args)
    {
        this.position = args.position;
        this.velocity = {
            x: 10,
            y: 10
        }
        this.rotation = 0;
        this.rotationSpeed = 5;
        this.speed = 4;
        this.maxHP = 100;
        this.currentHP = 100;
        this.create = args.create;
				this.sprite = new Sprite(1, 7, 125, 160, "https://i.imgur.com/BSwKP7G.png", 60);
        this.currentDirection = '';
    }

    rotate(e)
    {
        let mouseX = e.clientX, mouseY = e.clientY;
        let differenceX = mouseX - this.position.x;
        let differenceY = mouseY - this.position.y;
        this.rotation = Math.atan2(differenceY, differenceX) * 360 / (Math.PI * 2);
    }

		run()
		{

		}

    move(keyMap, state)
    {
        this.currentDirection = 'stay';

				this.run();
        if(keyMap.W) {
          this.position.y -= this.speed;
					this.currentDirection = 'up';
        }

        if(keyMap.A) {

					this.position.x -= this.speed;
					this.currentDirection = 'left';
				}

        if(keyMap.S) {
					this.position.y += this.speed;
					this.currentDirection = 'down';
				}


        if(keyMap.D) {
          this.position.x += this.speed;
          this.currentDirection = 'right';
        }

        if(this.position.x -25 > state.display.width)
            this.position.x = 0;
        if(this.position.x < 0)
            this.position.x = state.display.width - 25;

        if(this.position.y - 25 > state.display.height)
            this.position.y = 0;
        if(this.position.y < 0)
            this.position.y = state.display.height;
    }

    render(state)
    {
				const context = state.context;
				context.save();

				const keyMap = state.keyMap;
        this.move(keyMap, state);

				this.sprite.drawSprite(context, this.position.x, this.position.y, this.rotation, this.currentDirection);
				context.restore();
    }
};

export default Lumberjack;
