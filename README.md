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

### Development
- `npm start` - Runs the app in development mode at [http://localhost:3000](http://localhost:3000)
- `npm test` - Launches the test runner in interactive watch mode
- `npm run build` - Builds the app for production to the `build` folder

### Security & Quality
- `npm run audit` - Run security audit
- `npm run security:check` - Full security check (audit + outdated packages)
- `npm run predeployment:check` - Complete pre-deployment validation (tests, security, build)

See the [Deployment Guide](./docs/deployment/checklist.md) for production deployment instructions.

---

## 📚 Documentation

Comprehensive documentation is organized in the `/docs` folder:

### For Developers
- **[Getting Started](./docs/ai/CLAUDE.md)** - Development guide and architecture overview
- **[Development Guidelines](./docs/ai/AGENTS.md)** - Coding standards and best practices
- **[Model Documentation](./docs/ai/models.md)** - AI model tracking

### For Product & QA
- **[Requirements](./docs/requirements/)** - PRDs for all components and features
- **[Code Reviews](./docs/reviews/)** - Code review reports and standards

### For DevOps & Security
- **[Deployment Checklist](./docs/deployment/checklist.md)** - Complete deployment guide
- **[Security Audit](./docs/security/audit-report.md)** - Security vulnerability analysis
- **[Security Enhancements](./docs/security/enhancements.md)** - Security improvements

📖 **[Full Documentation Index](./docs/README.md)**

---

## 🔒 Security

**Status**: ✅ Production Ready
- Production runtime: 0 vulnerabilities
- OWASP Top 10: 100% compliant
- CSP headers implemented
- [Full Security Report](./docs/security/audit-report.md)

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

For detailed deployment instructions, see the [Deployment Checklist](./docs/deployment/checklist.md).

---

## 📦 Technology Stack

- **Framework**: React 19.2.3
- **Build Tool**: Create React App 5.0.1
- **Testing**: React Testing Library, Jest
- **Audio**: Web Audio API (no external dependencies)
- **Styling**: CSS3

---

## 🎨 Features

- ✅ Traditional Lotería game mechanics
- ✅ Bilingual support (Spanish/English)
- ✅ Web Audio API sound effects (Mexican mariachi-style)
- ✅ Fully accessible (ARIA, keyboard navigation)
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Cultural authenticity (traditional Spanish names and calls)
- ✅ Production-ready security (CSP, security headers)

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

Please read our [Development Guidelines](./docs/ai/AGENTS.md) before contributing.

For detailed information about our development process, see:
- [PRD Requirements](./docs/requirements/) - Feature specifications
- [Code Review Process](./docs/reviews/) - Quality standards
- [Security Guidelines](./docs/security/) - Security best practices

---

## 📞 Support

For issues or questions:
- Check the [documentation](./docs/)
- Review the [deployment guide](./docs/deployment/checklist.md)
- See [security reports](./docs/security/)

---

**Version**: 0.1.0
**Last Updated**: 2026-02-06
**Status**: ✅ Production Ready
