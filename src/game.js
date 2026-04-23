import { CANVAS_WIDTH, CANVAS_HEIGHT, PATH, TOWER_TYPES, ENEMY_TYPES } from './constants.js';
import { Enemy } from './entities/Enemy.js';
import { Tower } from './entities/Tower.js';

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;

        this.money = 200;
        this.lives = 10;
        this.wave = 0;

        this.enemies = [];
        this.towers = [];
        this.projectiles = [];

        this.selectedTowerType = 'basic';
        this.lastTime = 0;
        this.spawnTimer = 0;
        this.enemiesToSpawn = 0;
        this.enemiesSpawnedInWave = 0;

        this.init();
    }

    init() {
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        
        // Shop buttons
        const shopButtons = document.querySelectorAll('.shop-item');
        shopButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const type = button.dataset.type;
                this.selectedTowerType = type;
                
                shopButtons.forEach(b => b.classList.remove('selected'));
                button.classList.add('selected');
            });
        });

        // Set initial selection
        const initialButton = document.querySelector('.shop-item[data-type="basic"]');
        if (initialButton) initialButton.classList.add('selected');

        requestAnimationFrame((time) => this.loop(time));
    }

    handleClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const towerConfig = TOWER_TYPES[this.selectedTowerType];
        if (!towerConfig) {
            console.error("Invalid tower type:", this.selectedTowerType);
            return;
        }

        if (this.money >= towerConfig.cost) {
            this.towers.push(new Tower(x, y, this.selectedTowerType));
            this.money -= towerConfig.cost;
            this.updateUI();
        }
    }

    updateUI() {
        document.getElementById('money').textContent = this.money;
        document.getElementById('lives').textContent = this.lives;
        document.getElementById('wave').textContent = this.wave;
    }

    spawnWave() {
        this.wave++;
        this.enemiesToSpawn = 5 + this.wave * 2;
        this.enemiesSpawnedInWave = 0;
        this.updateUI();
    }

    update(deltaTime) {
        if (this.lives <= 0) return;

        // Spawning logic
        if (this.enemiesToSpawn > 0) {
            this.spawnTimer += deltaTime;
            if (this.spawnTimer > 1000) { // spawn every 1 second
                const type = Math.random() > 0.8 ? 'fast' : 'basic';
                this.enemies.push(new Enemy(type, PATH));
                this.enemiesToSpawn--;
                this.enemiesSpawnedInWave++;
                this.spawnTimer = 0;
            }
        } else if (this.enemies.length === 0) {
            // All enemies in wave spawned and none left on screen
            this.spawnWave();
        }

        // Update enemies
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            enemy.update(deltaTime);

            if (enemy.finished) {
                this.lives--;
                this.enemies.splice(i, 1);
                this.updateUI();
            } else if (enemy.dead) {
                this.money += enemy.reward;
                this.updateUI();
                this.enemies.splice(i, 1);
            }
        }

        // Update towers
        for (const tower of this.towers) {
            tower.update(deltaTime, this.enemies, this.projectiles, performance.now());
        }

        // Update projectiles
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];
            projectile.update(deltaTime);
            if (projectile.dead) {
                this.projectiles.splice(i, 1);
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Draw Path
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#444';
        this.ctx.lineWidth = 40;
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.moveTo(PATH[0].x, PATH[0].y);
        for (let i = 1; i < PATH.length; i++) {
            this.ctx.lineTo(PATH[i].x, PATH[i].y);
        }
        this.ctx.stroke();

        // Draw Towers
        for (const tower of this.towers) {
            tower.draw(this.ctx);
        }

        // Draw Enemies
        for (const enemy of this.enemies) {
            enemy.draw(this.ctx);
        }

        // Draw Projectiles
        for (const projectile of this.projectiles) {
            projectile.draw(this.ctx);
        }

        if (this.lives <= 0) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            this.ctx.fillStyle = 'white';
            this.ctx.font = '48px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        }
    }

    loop(timestamp) {
        let deltaTime = timestamp - this.lastTime;
        if (deltaTime > 100) deltaTime = 100; // Cap deltaTime to avoid huge jumps
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.draw();

        requestAnimationFrame((time) => this.loop(time));
    }
}

new Game();
