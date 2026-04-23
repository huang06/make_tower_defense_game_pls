export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;
export const GRID_SIZE = 40;

export const TOWER_TYPES = {
    basic: {
        cost: 50,
        range: 120,
        damage: 10,
        fireRate: 1000, // ms
        color: '#4CAF50'
    },
    sniper: {
        cost: 150,
        range: 250,
        damage: 50,
        fireRate: 3000, // ms
        color: '#2196F3'
    }
};

export const ENEMY_TYPES = {
    basic: {
        health: 50,
        speed: 100,
        reward: 10,
        color: '#f44336'
    },
    fast: {
        health: 30,
        speed: 250,
        reward: 15,
        color: '#FFEB3B'
    }
};

// Path is a sequence of (x, y) coordinates representing the center of the path segments
export const PATH = [
    { x: 0, y: 300 },
    { x: 200, y: 300 },
    { x: 200, y: 100 },
    { x: 500, y: 100 },
    { x: 500, y: 500 },
    { x: 800, y: 500 }
];
