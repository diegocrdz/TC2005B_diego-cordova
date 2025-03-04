/*
 * Implementation of the game
 *
 * Diego Córdova Rodríguez
 * 2025-02-25
 */

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

let oldTime;
const paddleVelocity = 0.5;
const speedIncrease = 1.05;
const initalSpeed = 0.5;

let life = 3;
let score = 0;

// Context of the Canvas
let ctx;

// Classes fot the Pong game
class Ball extends GameObject {

    constructor(position, width, height, color, velocity) { // constructor of the class
        super(position, width, height, color, "ball"); // super calls the constructor of the parent class
        this.initVelocity();
        this.inPlay = false;
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime)); // d = v * t
    }

    initVelocity() {
        this.inPlay = true;
        // Random angle between 135 and 45 degrees
        let angle = Math.random() * Math.PI / 2 + Math.PI / 4;
        this.velocity = new Vec(Math.cos(angle), Math.sin(angle)).times(initalSpeed);
    }

    reset () {
        this.inPlay = false;
        this.position = new Vec(canvasWidth / 2, canvasHeight / 2);
        this.velocity = new Vec(0, 0);
    }
}

class Paddle extends GameObject {

    constructor(position, width, height, color, velocity) { // constructor of the class
        super(position, width, height, color, "paddle"); // super calls the constructor of the parent class
        this.velocity = new Vec(0.0, 0.0);
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime)); // d = v * t

        // Collision detection between the paddles and the canvas
        if (this.position.y < 20) {
            this.position.y = 20;
        }
        else if (this.position.y > canvasHeight - 20 - this.height) {
            this.position.y = canvasHeight - 20 - this.height;
        }
        else if (this.position.x < 20) {
            this.position.x = 20;
        }
        else if (this.position.x > canvasWidth - 20 - this.width) {
            this.position.x = canvasWidth - 20 - this.width;
        }
    }
}

// Class for creating each block
class Block extends GameObject {

    constructor(position, width, height, color) { // constructor of the class
        super(position, width, height, color, "block"); // super calls the constructor of the parent class
    }
}

// Class for creating the blocks
class BlockGenerator {

    constructor() {
        this.blocks = []; // Array to store the blocks
    }

    // Function to generate the blocks
    generateBlocks(rows, columns) {

        const blockSpacing = 10; // Space between blocks
        const totalSpacing = blockSpacing * (columns - 1); // Total space between blocks
        const blockWidth = (canvasWidth - 40) / columns; // Calculate block width
        const blockHeight = 20; // Fixed block height
        
        for (let i = 0; i < rows; i++) {

            for (let j = 0; j < columns; j++) {

                let block = new Block(new Vec(20 + j * blockWidth, 20 + i * blockHeight), blockWidth, blockHeight, "white", "block");
                // To determine the position of each block:
                // 1. The initial position is 20, 20, that's why we add 20 to the x and y coordinates
                // 2. We multiply the block width by the column number to get the x coordinate
                // 3. We multiply the block height by the row number to get the y coordinate
                // Example:
                // 1st block, i = 0, j = 0, so the position is (20, 20)
                // 2nd block, i = 0, j = 1, so the position is (20 + blockWidth, 20 + blockHeight)

                this.blocks.push(block);
            }
        }
    }
}

/*
class Game {
    constructor(state) {
        this.state = state;

        this.initObjects();

        this.addEventListeners();

        this.scoreLabelLeft = new TextLabel(canvasWidth * 3 / 10, canvasHeight * 2 / 10, "40px Ubuntu Mono", "black");
        this.scoreLabelRight = new TextLabel(canvasWidth * 7 / 10, canvasHeight * 2 / 10, "40px Ubuntu Mono", "black");
    }

    update(deltaTime) {
        for (let actor of this.actors) {
            actor.update(deltaTime);
        }
    }
}
*/

// Objects to represent elements of the game

// Box
const box = new Ball(new Vec(canvasWidth / 2, canvasHeight / 2), 20, 20, "white");
// Paddles
const paddle = new Paddle(new Vec(canvasWidth / 2 - 75, canvasHeight), 150, 20, "white");
// Bars
const topBar = new GameObject(new Vec(0, 0), canvasWidth, 20, "gray", "obstacle");
const bottomBar = new GameObject(new Vec(0, canvasHeight - 20), canvasWidth, 20, "gray", "obstacle");
const leftBar = new GameObject(new Vec(0, 0), 20, canvasHeight, "gray", "obstacle");
const rightBar = new GameObject(new Vec(canvasWidth - 20, 0), 20, canvasHeight, "gray", "obstacle");
// Lifes label
const lifesLabel = new TextLabel(canvasWidth - 100, 20, "20px Ubuntu Mono", "black");
const scoreLabel = new TextLabel(20, 20, "20px Ubuntu Mono", "black");
// Blocks
const blockGenerator = new BlockGenerator();
blockGenerator.generateBlocks(5, 10);

// Main function of the game

function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    createEventListeners();

    drawScene(0);
}

function createEventListeners() {

    // When a key is pressed, the event is triggered
    window.addEventListener('keydown', (event) => {

        if (event.key == 'a') { // Left
            paddle.velocity = new Vec(- paddleVelocity, 0);
        }
        else if (event.key == 'd') { // Right
            paddle.velocity = new Vec(paddleVelocity, 0);
        }

        if (event.key == 'w') { // Up
            paddle.velocity = new Vec(0, - paddleVelocity);
        }
        else if (event.key == 's') { // Down
            paddle.velocity = new Vec(0, paddleVelocity);
        } 

        if (event.key == ' ' && !box.inPlay) {
            box.initVelocity();
        }
    });

    // When a key is released, the event is triggered
    window.addEventListener('keyup', (event) => {

        if (event.key == 'a' || event.key == 'd' || event.key == 'w' || event.key == 's') {
            paddle.velocity = new Vec(0, 0);
        }
    });
}

function drawScene(newTime) {

    if (oldTime == undefined) {
        oldTime = newTime;
    }
    let deltaTime = newTime - oldTime;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw elements
    box.draw(ctx);
    paddle.draw(ctx);

    leftBar.draw(ctx);
    rightBar.draw(ctx);
    topBar.draw(ctx);
    bottomBar.draw(ctx);

    // Draw scorebaord
    lifesLabel.draw(ctx, "Lifes: " + life);
    scoreLabel.draw(ctx, "Score: " + score);

    // Draw blocks
    for (let block of blockGenerator.blocks) {
        block.draw(ctx);
    }

    // Update the properties of the objects
    box.update(deltaTime);
    paddle.update(deltaTime);

    // If the ball hits the paddle, the speed increases and the ball changes direction
    if (boxOverlap(box, paddle)) {
        box.velocity.y *= -1;
        box.velocity = box.velocity.times(speedIncrease);
    }

    // If the ball hits a bar, the ball changes direction
    if (boxOverlap(box, rightBar) || boxOverlap(box, leftBar)) {
        box.velocity.x *= -1;
    }
    if (boxOverlap(box, topBar) || boxOverlap(box, bottomBar)) {
        box.velocity.y *= -1;
    }

    // If the ball hits the bottom bar, the player loses a life
    if (boxOverlap(box, bottomBar) && life > 0) {
        life--;
    }
    // If the player has no more lifes, the game resets
    if (life == 0) {
        box.reset();
        life = 3;
    }

    // If the ball hits a block, the block is removed and the score increases

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}