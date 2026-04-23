import { Projectile } from './Projectile.js';
import { TOWER_TYPES } from '../constants.js';

export class Tower {
    constructor(x, y, type) {
        const config = TOWER_TYPES[type];
        this.x = x;
        this.y = y;
        this.type = type;
        this.range = config.range;
        this.damage = config.damage;
        this.fireRate = config.fireRate;
        this.color = config.color;
        this.lastFired = 0;
    }

    update(deltaTime, enemies, projectiles, currentTime) {
        if (currentTime - this.lastFired >= this.fireRate) {
            const target = this.findTarget(enemies);
            if (target) {
                projectiles.push(new Projectile(this.x, this.y, target, this.damage, this.color));
                this.lastFired = currentTime;
            }
        }
    }

    findTarget(enemies) {
        return enemies.find(enemy => {
            const dx = enemy.x - this.x;
            const dy = enemy.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance <= this.range;
        });
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x - 15, this.y - 15, 30, 30);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        // Draw range circle (optional, maybe only when selected or hovering)
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.range, 0, Math.PI * 2);
        // ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        // ctx.stroke();
    }
}
