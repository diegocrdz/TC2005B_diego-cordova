/*
 * Implementation of the game Breakout
 *
 * Diego Córdova Rodríguez
 * 2025-03-12
 */

"use strict";

// Canvas variables
const canvasWidth = 800;
const canvasHeight = 600;

// Time variables
let oldTime;
const paddleVelocity = 0.5;
const speedIncrease = 1.05;
const initalSpeed = 0.3;

// Game variables
let lives = 3;
let score = 0;
let gameOver = false;
let waitingForContinue = true;
let powerUps = []; // Array to store the powerups
let powerUpTypes = ["paddle", "ball", "life"];

// Context of the Canvas
let ctx;

// Classes for the game

// Class that represents a ball in the game
class Ball extends GameObject {

    constructor(position, width, height, color, velocity) { // constructor of the class
        super(position, width, height, color, "ball"); // super calls the constructor of the parent class
        this.width = width;
        this.height = height;
        this.inPlay = false; // Boolean to determine if the ball is in play
        this.velocity = new Vec(0.0, 0.0); // Initialize the velocity of the ball
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime)); // d = v * t
    }

    // Initialize the angle and velocity of the ball
    initVelocity() {
        this.inPlay = true;
        // Random angle between 135 and 45 degrees
        let angle = Math.random() * Math.PI / 2 + Math.PI / 4;
        this.velocity = new Vec(Math.cos(angle), Math.sin(angle)).times(initalSpeed);
    }

    // Reset the ball to the center of the canvas
    reset() {
        this.inPlay = false;
        this.position = new Vec(canvasWidth / 2, canvasHeight / 2);
        this.velocity = new Vec(0, 0);
        this.width = 15;
        this.height = 15;
    }
}

class Paddle extends GameObject {

    constructor(position, width, height, color, velocity) { // Constructor of the class
        super(position, width, height, color, "paddle"); // Super calls the constructor of the parent class
        this.velocity = new Vec(0.0, 0.0);
    }

    // Reset the width of the paddle
    resetWidth() {
        this.width = 80;
    }

    update(deltaTime) {
        // Update the position of the paddle
        this.position = this.position.plus(this.velocity.times(deltaTime)); // d = v * t

        // Collision detection between the paddles and the canvas
        if (this.position.y < canvasHeight / 2) { // Limit the paddle to the bottom half of the canvas
            this.position.y = canvasHeight / 2;
        }
        else if (this.position.y > canvasHeight - bottomBar.height - this.height) { // Bottom bar
            this.position.y = canvasHeight - 20 - this.height;
        }
        else if (this.position.x < leftBar.width) { // Left bar
            this.position.x = 20;
        }
        else if (this.position.x > canvasWidth - rightBar.width - this.width) { // Right bar
            this.position.x = canvasWidth - 20 - this.width;
        }
    }
}

// Class for creating each block in the game
class Block extends GameObject {

    constructor(position, width, height, color) { // Constructor of the class
        super(position, width, height, color, "block"); // Super calls the constructor of the parent class
    }
}

// Class for creating the blocks
class BlockGenerator {

    constructor() {
        this.blocks = []; // Array to store the blocks generated
    }

    // Function to generate the blocks in the game
    generateBlocks(rows, columns) {

        let colors = ["red", "green", "blue", "yellow", "purple"]; // Array with the colors of the blocks

        const blockSpacing = 5; // Space between blocks
        const blockWidth = (canvasWidth - leftBar.width - rightBar.width + blockSpacing) / columns; // Calculate block width
        const blockHeight = (canvasHeight / 4) / rows; // Calculate block height
        
        for (let i = 0; i < rows; i++) { // For each row

            // Select a random color for each row
            let random = Math.floor(Math.random() * colors.length); // Random color from the array
            let color = colors[random]; // Assign the random color to the row of blocks
            colors.splice(random, 1); // Remove the color from the array so that it doesnt repeat

            for (let j = 0; j < columns; j++) { // For each column

                let block = new Block(new Vec(leftBar.width + j * blockWidth, topBar.height + i * blockHeight), blockWidth - blockSpacing, blockHeight - blockSpacing, color, "block");
                // To determine the position of each block:
                // 1. The initial position is 20, 20 because of the top and left bar
                // 2. We multiply the block width by the column number to get the x coordinate
                // 3. We multiply the block height by the row number to get the y coordinate
                // Example:
                // 1st block, i = 0, j = 0, so the position is (20, 20)
                // 2nd block, i = 0, j = 1, so the position is (20 + blockWidth, 20 + blockHeight)

                this.blocks.push(block);
            }
        }
    }

    // Function to clear the blocks
    clearBlocks() {
        this.blocks = [];
    }
}

class PowerUp extends GameObject {

    constructor(position, width, height, color, type) { // constructor of the class
        super(position, width, height, "yellow", "powerup"); // super calls the constructor of the parent class
        this.velocity = new Vec(0.0, 0.1); // The powerup falls down
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime)); // d = v * t
    }
}

// Objects of the game

// Ball
const box = new Ball(new Vec(canvasWidth / 2, canvasHeight / 2), 15, 15, "white");
// Paddles
const paddle = new Paddle(new Vec(canvasWidth / 2 - 40, 5 * (canvasHeight / 6)), 80, 15, "white");
// Bars
const topBar = new GameObject(new Vec(0, 0), canvasWidth, 20, "gray", "obstacle");
const bottomBar = new GameObject(new Vec(0, canvasHeight - 20), canvasWidth, 20, "gray", "obstacle");
const leftBar = new GameObject(new Vec(0, 0), 20, canvasHeight, "gray", "obstacle");
const rightBar = new GameObject(new Vec(canvasWidth - 20, 0), 20, canvasHeight, "gray", "obstacle");
// Labels
const livesLabel = new TextLabel(canvasWidth - 100, 18, "20px Ubuntu Mono", "black");
const scoreLabel = new TextLabel(20, 18, "20px Ubuntu Mono", "black");
const continueLabel = new TextLabel(canvasWidth / 2 - 100, 2 * canvasHeight / 3, "30px Ubuntu Mono", "white");
const gameOverLabel = new TextLabel(canvasWidth / 2 - 60, 2 * canvasHeight / 3 - 40, "30px Ubuntu Mono", "white");
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

    // Get the button to start the game in the page
    document.getElementById('startGame').addEventListener('click', () => {
        // Restart the game
        restartGame();
    });

    // Create the event listeners for detecting the key presses
    createEventListeners();

    // Draw the scene
    drawScene(0);
}

// Create the event listeners for detecting the key presses
function createEventListeners() {

    // When a key is pressed, the event is triggered
    window.addEventListener('keydown', (event) => {

        // Move the paddle
        if (event.key == 'a') { // Left
            paddle.velocity.x = -paddleVelocity;
        }
        if (event.key == 'd') { // Right
            paddle.velocity.x = paddleVelocity;
        }
        if (event.key == 'w') { // Up
            paddle.velocity.y = -paddleVelocity;
        }
        if (event.key == 's') { // Down
            paddle.velocity.y = paddleVelocity;
        } 

        // Start the game
        else if (event.key == ' ' && !box.inPlay) {
            box.initVelocity();
            waitingForContinue = false;
            gameOver = false;
        }

        // Restart the game
        else if (event.key == 'r') {
            restartGame();
        }
        else if (event.key == ' ') {
            restartGame();
            box.initVelocity();
        }
    });

    // When a key is released, the event is triggered
    window.addEventListener('keyup', (event) => {

        // Stop the paddle
        if (event.key == 'a' || event.key == 'd') {
            paddle.velocity.x = 0;
        }
        if (event.key == 'w' || event.key == 's') {
            paddle.velocity.y = 0;
        }
    });
}

function restartGame() {
    // Get the number of rows and columns from the input fields
    let rows = parseInt(document.getElementById('rows').value);
    let cols = parseInt(document.getElementById('cols').value);

    // Reset the game variables
    gameOver = false;
    waitingForContinue = true;

    // Reset the game elements
    score = 0;
    lives = 3;
    box.reset();
    blockGenerator.clearBlocks();
    blockGenerator.generateBlocks(rows, cols);
    powerUps = [];
    paddle.resetWidth();
}

function drawScene(newTime) {

    if (oldTime == undefined) {
        oldTime = newTime;
    }
    let deltaTime = newTime - oldTime;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw blocks
    for (let block of blockGenerator.blocks) {
        block.draw(ctx);
    }

    // Draw elements
    box.draw(ctx);
    paddle.draw(ctx);

    leftBar.draw(ctx);
    rightBar.draw(ctx);
    topBar.draw(ctx);
    bottomBar.draw(ctx);

    // Draw scorebaord
    livesLabel.draw(ctx, "Lives: " + lives);
    scoreLabel.draw(ctx, "Score: " + score);

    // Draw game over label
    if (gameOver) {
        gameOverLabel.draw(ctx, "Game Over");
        continueLabel.draw(ctx, "Press 'space' to start");
    }
    // Draw continue label
    else if (waitingForContinue) {
        continueLabel.draw(ctx, "Press 'space' to start");
    }

    // Show last powerup in the page
    if (powerUps.length > 0) {
        document.getElementById('last-powerup').innerHTML = "Power-Up: " + powerUps[powerUps.length - 1].type;
    }
    else {
        document.getElementById('last-powerup').innerHTML = "Power-Up: None";
    }
    // Show the paddle width in the page
    document.getElementById('paddle-size').innerHTML = "Paddle Size: " + paddle.width;
    // Show the ball speed in the page
    document.getElementById('ball-speed').innerHTML = "Ball Speed: " + Math.sqrt(box.velocity.x * box.velocity.x + box.velocity.y * box.velocity.y).toFixed(2);

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
    if (boxOverlap(box, bottomBar) && lives > 0) {
        lives--;
        box.reset();
        waitingForContinue = true;
        paddle.resetWidth(); // Reset the width of the paddle
        powerUps = []; // Remove all powerups
    }

    // If the player has no more lives, the game resets
    if (lives == 0) {
        restartGame();
        gameOver = true;
    }

    // If the ball hits a block, the block is removed and the score increases

    let hitBlock = false; // Boolean to determine if the ball hits a block

    blockGenerator.blocks = blockGenerator.blocks.filter(block => {
        if (boxOverlap(box, block)) {
            hitBlock = true;
            score++;
    
            // Store the block's position before removing it
            let blockPosition = new Vec(block.position.x, block.position.y);
    
            // Chance to spawn a Power-Up
            if (Math.random() < 0.4) {
                let powerUp = new PowerUp(blockPosition, 20, 20);
                powerUp.type = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)]; // Random powerup
                powerUps.push(powerUp);
            }
    
            return false; // Remove the block
        }
        return true; // Keep the block if not hit
    });

    // Draw and update powerups
    for (let powerUp of powerUps) {
        powerUp.draw(ctx);
        powerUp.update(deltaTime);
    }

    // If the powerup hits the paddle, the powerup is removed

    powerUps = powerUps.filter(powerUp => {
        if (boxOverlap(powerUp, paddle)) {
            switch (powerUp.type) {
                case "paddle":
                    paddle.width += 20;
                    break;
                case "ball":
                    box.width += 10;
                    box.height += 10;
                    break;
                case "life":
                    lives++;
                    break;
            }
            return false; // Remove the powerup
        }
        return true; // Keep the powerup if not hit
    });

    // Only change the direction of the ball if it hits a block
    if (hitBlock) {
        box.velocity.y *= -1;
    }

    // If there are no more blocks, the game is won
    if (blockGenerator.blocks.length == 0) {
        restartGame();
    }

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}