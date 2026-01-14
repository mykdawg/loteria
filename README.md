# Lotería Game

A simple implementation of the traditional Mexican Lotería game using React.

## Rules of Lotería

### Objective
Lotería is a traditional Mexican game of chance, similar to bingo. The objective is to be the first player to complete a specific pattern on your game board by matching images called out by the dealer.

### Game Components
- **Deck**: 54 unique image cards
- **Boards**: Each player has a game board with a 4x4 grid of random images from the deck
- **Beans/markers**: Used to mark matched images on the boards

### Setup
1. Each player receives one game board
2. The dealer shuffles the deck of 54 cards
3. Players use beans or markers to cover images on their boards

### Gameplay
1. The dealer draws one card at a time from the deck and announces it to all players
2. Players check if the announced image appears on their board
3. If a player finds the image, they place a marker on that image
4. The dealer continues drawing cards until a player completes the winning pattern

### Winning Patterns
The most common winning patterns are:
- **Lotería**: Complete any horizontal, vertical, or diagonal line (4 images)
- **Full board**: Cover all 16 images on the board
- **Corners**: Cover all four corner images
- **Square**: Cover a 2x2 square anywhere on the board

### Winning
The first player to complete the agreed-upon pattern shouts "¡Lotería!" or "¡Buenas!" and wins the game. The dealer then verifies the winning board to ensure all called images are correctly marked.

### Traditional Calls
Each card has a traditional rhyme or phrase that the dealer calls out:
- **El Sol**: "El sol que nos da vida" (The sun that gives us life)
- **La Luna**: "La luna que alumbra de noche" (The moon that lights the night)
- **El Corazón**: "El corazón que late de amor" (The heart that beats with love)
- **La Estrella**: "La estrella que guía a los reyes" (The star that guides the kings)

### Variations
- **Multiple winners**: Continue playing until multiple players complete the pattern
- **Blackout**: Players must cover their entire board
- **Pattern games**: Create specific patterns like X, diamond, or other shapes

## How to Play This Implementation
1. Start the game by clicking "New Game"
2. The dealer will automatically draw cards
3. Click on matching images on your board
4. The first to complete a line wins!

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\nOpen [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.\nSee the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\nIt correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**
