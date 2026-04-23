import { ENEMY_TYPES } from '../constants.js';

export class Enemy {
    constructor(type, path) {
        const config = ENEMY_TYPES[type];
        this.type = type;
        this.health = config.health;
        this.maxHealth = config.health;
        this.speed = config.speed;
        this.reward = config.reward;
        this.color = config.color;
        this.path = path;
        this.pathIndex = 0;
        this.x = path[0].x;
        this.y = path[0].y;
        this.radius = 15;
        this.finished = false;
        this.dead = false;
    }

    update(deltaTime) {
        if (this.dead || this.finished) return;

        const target = this.path[this.pathIndex + 1];
        if (!target) {
            this.finished = true;
            return;
        }

        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const distanceToMove = (this.speed * deltaTime) / 1000;

        if (distance < distanceToMove) {
            this.x = target.x;
            this.y = target.y;
            this.pathIndex++;
        } else {
            this.x += (dx / distance) * distanceToMove;
            this.y += (dy / distance) * distanceToMove;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        // Health bar
        const healthBarWidth = 30;
        const healthBarHeight = 5;
        const healthBarX = this.x - healthBarWidth / 2;
        const healthBarY = this.y - this.radius - 10;

        ctx.fillStyle = 'red';
        ctx.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);
        ctx.fillStyle = 'green';
        ctx.fillRect(healthBarX, healthBarY, (this.health / this.maxHealth) * healthBarWidth, healthBarHeight);
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.dead = true;
        }
    }
}
