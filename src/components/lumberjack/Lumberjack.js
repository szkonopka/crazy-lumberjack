import React, { Component } from 'react';
import './Lumberjack.css'

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
    }

    rotate(e)
    {
        let mouseX = e.clientX, mouseY = e.clientY;
        let differenceX = mouseX - this.position.x;
        let differenceY = mouseY - this.position.y;
        this.rotation = Math.atan2(differenceY, differenceX) * 360 / (Math.PI * 2);
    }

    move(keyMap, state)
    {
        if(keyMap.W)
            this.position.y -= this.speed;

        if(keyMap.A)
            this.position.x -= this.speed;

        if(keyMap.S)
            this.position.y += this.speed;

        if(keyMap.D)
            this.position.x += this.speed;

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
        const keyMap = state.keyMap;
        this.move(keyMap, state);

        const context = state.context;
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.rotation * 180 / Math.PI);
        context.fillStyle = "#000000";
        context.fillRect(-25, -25, 50, 50);
        context.restore();
    }
};

export default Lumberjack;