/*
 * Collection of classes that will be used in the breakout game
 *
 * Diego Córdova Rodríguez
 * 2025-03-12
 */

class Vec {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    plus(other) {
        return new Vec(this.x + other.x, this.y + other.y);
    }

    minus(other) {
        return new Vec(this.x - other.x, this.y - other.y);
    }

    times(scalar) {
        return new Vec(this.x * scalar, this.y * scalar);
    }

    magnitude() {
        return Math.sqrt(this.x**2 + this.y**2);
    }
}

// Class for creating a game object
class GameObject {
    constructor(position, width, height, color, type) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = type;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y,
                     this.width, this.height);
    }

    // Empty template for all GameObjects to be able to update
    update() {
    }
}

// Class for creating text labels
class TextLabel {
    constructor(x, y, font, color) {
        this.x = x;
        this.y = y;
        this.font = font;
        this.color = color;
    }

    draw(ctx, text) {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(text, this.x, this.y);
    }
}

// Detect a collision 
function boxOverlap(obj1, obj2) {
    return obj1.position.x + obj1.width > obj2.position.x &&  // If the right side of obj1 is bigger than the left side of obj2
           obj1.position.x < obj2.position.x + obj2.width && // If the left side of obj1 is smaller than the right side of obj2
           obj1.position.y + obj1.height > obj2.position.y && // If the bottom side of obj1 is bigger than the top side of obj2
           obj1.position.y < obj2.position.y + obj2.height;   // If the top side of obj1 is smaller than the bottom side of obj2
}