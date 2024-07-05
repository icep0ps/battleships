# Battleship Game

A classic game of strategy and skill.

![Battleship Game](/public/screenshots/image.png)

## Table of Contents

- [Introduction](#introduction)
- [How to Play](#how-to-play)
- [Installation](#installation)
- [Testing](#testing)
- [Technologies Used](#technologies-used)

## Introduction

The Battleship Game is a turn-based strategy game where you try to sink your opponent's fleet of ships before they sink yours. This version is implemented as a web application.

## How to Play

1. Place your ships on the player board. You can place them horizontally or vertically by clicking on the ship and then on the board.
2. Once all ships are placed, click the "Start Game" button to begin.
3. Take turns with the computer to attack each other's board. Click on a cell on the computer's board to attack.
4. If you hit a ship, the cell will be marked in red. If you miss, it will be marked in blue.
5. The first player to sink all the opponent's ships wins the game!

## Installation

1. Clone the repository:

   ```bash
   git clone  https://github.com/icep0ps/battleships.git
   cd battleship
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Build the project using Webpack:
   ```bash
   npm run build
   ```

## Testing

1. Run the tests using Jest:
   ```bash
   npm test
   ```

## Technologies Used

- **TypeScript**: For type-safe JavaScript development.
- **HTML**: For the structure of the web application.
- **CSS**: For styling the game.
- **Webpack**: For bundling the assets and modules.
- **Jest**: For testing the application.

Enjoy playing the Battleship Game!
