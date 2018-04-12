import React, { Component } from 'react';
import './Lumberjack.css'

const KEYS = {
    W: 87,
    A: 65,
    S: 83,
    D: 68,
};

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

    move(e)
    {
        if(e.keyCode === KEYS.W) this.position.y -= this.velocity.y;
        if(e.keyCode === KEYS.A) this.position.x -= this.velocity.x;
        if(e.keyCode === KEYS.S) this.position.y += this.velocity.y;
        if(e.keyCode === KEYS.D) this.position.x += this.velocity.x;
    }

    render(state)
    {
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