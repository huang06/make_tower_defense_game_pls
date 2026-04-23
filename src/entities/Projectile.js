export class Projectile {
    constructor(x, y, target, damage, color) {
        this.x = x;
        this.y = y;
        this.target = target;
        this.damage = damage;
        this.color = color;
        this.speed = 400; // pixels per second
        this.radius = 4;
        this.dead = false;
    }

    update(deltaTime) {
        if (this.target.dead || this.target.finished) {
            this.dead = true;
            return;
        }

        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const distanceToMove = (this.speed * deltaTime) / 1000;

        if (distance < distanceToMove) {
            this.target.takeDamage(this.damage);
            this.dead = true;
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
    }
}
