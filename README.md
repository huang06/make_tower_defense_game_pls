# Tower Defense Game

A lightweight, browser-based Tower Defense game built with vanilla JavaScript and HTML5 Canvas.

## 🚀 Features

- **Dynamic Wave System**: Enemies spawn in increasing waves with varying difficulty.
- **Tower Customization**: Multiple tower types (Basic and Sniper) with distinct stats.
- **Real-time Combat**: Projectile-based combat system with target acquisition.
- **Resource Management**: Earn gold by defeating enemies and spend it to upgrade your defenses.
- **Responsive UI**: Real-time tracking of money, lives, and current wave.

## 🛠️ Technologies Used

- **HTML5 Canvas**: For high-performance 2D rendering.
- **Vanilla JavaScript (ES6+)**: Using modules for clean, maintainable code.
- **CSS3**: For game UI and layout.

## 📦 Installation & Setup

1. Clone this repository or download the source files.
2. Navigate to the project directory in your terminal.

## 🎮 How to Run

**Important:** Due to browser security policies regarding JavaScript Modules (CORS), you cannot simply double-click `index.html` to play. You **must** use a local web server.

### Option 1: Using Python (Easiest)
If you have Python installed, run this in your terminal:
```bash
python3 -m http.server 8000
```
Then, open your browser and go to: `http://localhost:8000`

### Option 2: Using Node.js (`npx`)
If you have Node.js installed, run:
```bash
npx serve .
```
Then, open the URL provided in the terminal (usually `http://localhost:3000`).

### Option 3: VS Code Live Server
If you use Visual Studio Code:
1. Install the **Live Server** extension.
2. Right-click `index.html` and select **"Open with Live Server"**.

## 🕹️ How to Play

1. **Select a Tower**: Click on one of the buttons in the shop at the bottom of the screen.
2. **Place a Tower**: Click anywhere on the game canvas to place the selected tower.
3. **Defend**: Prevent the red (Basic) and yellow (Fast) enemies from reaching the end of the path.
4. **Earn Gold**: Destroying enemies grants you money to buy more towers.
5. **Don't Lose All Lives**: If enemies reach the end, you lose a life. The game ends when lives hit zero.

## 📂 Project Structure

- `index.html`: The game container and UI layout.
- `style.css`: Styling for the canvas and UI elements.
- `src/`:
  - `game.js`: The main game engine and loop.
  - `constants.js`: Configuration for all game entities and the path.
  - `entities/`:
    - `Enemy.js`: Logic for enemy movement and health.
    - `Tower.js`: Logic for tower targeting and firing.
    - `Projectile.js`: Logic for projectile physics and impact.
