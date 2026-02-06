# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build, Test, and Development Commands

### Development
```bash
npm start           # Start dev server on http://localhost:3000
npm run build       # Create production build in build/
npm test            # Run tests in watch mode
npm test -- --coverage  # Run tests with coverage report
```

### Testing Specific Files
```bash
npm test -- --testPathPattern=Card.test.js  # Run specific test file
npm test -- --testNamePattern="should render"  # Run tests matching pattern
```

### Linting
```bash
npx eslint src/           # Check code style
npx eslint src/ --fix     # Auto-fix issues
```

## Architecture Overview

### Application Type
This is a **pure client-side React application** implementing the traditional Mexican Lotería game (similar to Bingo). No backend, no authentication, no external APIs.

### Component Architecture

**Main App Container** (`src/App.js`):
- Manages all game state using React hooks (useState, useEffect)
- Handles game logic: card drawing, win detection, marking
- Orchestrates child components
- Implements Web Audio API for sound effects (card announcements, win sounds)

**Component Hierarchy**:
```
App.js (main container)
├── LanguageToggle (bilingual ES/EN switch)
├── HistorySection (game history info)
├── HowToPlay (instructions)
├── GameBoard
│   └── Card (individual card, reusable)
├── CurrentCard (shows currently drawn card)
├── GameInfo (stats display)
└── WinMessage (victory screen)
```

### State Management
- **No Redux/Context** - All state in App.js using useState
- **Key state variables**:
  - `playerBoard`: 16-card array for player's board
  - `drawnCards`: Cards drawn so far
  - `currentCard`: Most recently drawn card
  - `markedPositions`: Array of marked position indices
  - `gameWon`: Boolean win state
  - `language`: 'es' or 'en' for bilingual support

### Game Logic Flow
1. **New Game**: Shuffle deck, select random 16 cards for player board
2. **Auto-draw**: Every 3 seconds, draw a random undrawn card
3. **Mark Cards**: When drawn card matches board card, mark position
4. **Win Detection**: Check rows, columns, diagonals after each mark
5. **Sound**: Web Audio API generates programmatic Mexican-style sounds

### Critical Patterns

**Bilingual Support**:
- Every user-facing string must support both Spanish (primary) and English
- Language toggle controls all text throughout the app
- Component props include `language` prop when rendering text

**Web Audio API**:
- All sounds generated programmatically (no audio files except fallback)
- Different sounds for different card types (celestial, animals, etc.)
- Mexican mariachi-style trumpet fanfare for wins
- Handle browser compatibility gracefully with try/catch

**Accessibility**:
- All interactive elements have proper ARIA attributes
- Cards use `role="button"`, `tabIndex="0"`, `aria-label`
- Keyboard navigation supported

## Development Workflow Requirements

### MANDATORY: PRD-First Development
**Before implementing ANY new feature:**
1. Create a PRD (Product Requirements Document) in `PRD_[FeatureName].md`
2. Include all required sections (see AGENTS.md)
3. Document the AI model used in the Model Information section
4. Get PRD approved before writing code
5. Update PRD with implementation status when complete

**PRD must include**:
- Feature overview and objectives
- Technical implementation approach
- Acceptance criteria
- Testing requirements
- Model information (which AI generated it, version, date, reviewer)

### MANDATORY: Testing Requirements
- **Minimum 80% code coverage** required
- Test files in `src/__tests__/components/` or colocated
- Use React Testing Library (@testing-library/react)
- Test components, user interactions, edge cases
- Run tests before committing

### Code Review Checklist
Before any commit, verify:
- [ ] PRD exists and is updated
- [ ] Tests pass (`npm test`)
- [ ] Coverage ≥ 80%
- [ ] ESLint passes (`npx eslint src/`)
- [ ] Bilingual content verified (ES/EN)
- [ ] Accessibility attributes present
- [ ] Model documentation added (file headers, code comments)

## Important Files and Conventions

### Key Documentation Files
- `AGENTS.md`: Comprehensive development guidelines, code style, testing, PRD requirements
- `MODEL_DOCUMENTATION.md`: AI model tracking system and documentation standards
- `PRD_*.md`: Product requirement documents for each feature
- `README.md`: Game rules and basic usage

### Code Documentation Standards
Every new file must include:
```javascript
/**
 * @file [filename]
 * @model [model-name]-[version]
 * @generated [YYYY-MM-DD]
 * @modified [YYYY-MM-DD] (if modified)
 * @reviewer [initials]
 * @component [component-name]
 * @description [brief-description]
 */
```

Within code:
```javascript
// MODEL: [model-name]-[version]
// PURPOSE: [description]
// DATE: [YYYY-MM-DD]
// CONTEXT: [generation-context]
// REVIEWED: [initials] [date]
```

### Import Order Convention
1. React imports
2. Third-party libraries
3. Local utilities
4. Local components
5. CSS/styles

Example:
```javascript
import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import './App.css';
```

### Naming Conventions
- **Components**: PascalCase (e.g., `GameBoard`, `CurrentCard`)
- **Functions**: camelCase with verb prefix (e.g., `handleClick`, `drawCard`)
- **Booleans**: `is`, `has`, `can` prefix (e.g., `isMarked`, `gameWon`)
- **Constants**: UPPER_CASE (e.g., `MAX_CARDS`)

## Cultural Considerations

This game represents traditional Mexican culture:
- Use authentic Spanish card names (e.g., "El Sol", "La Luna")
- Traditional calls/rhymes are culturally significant
- Sound design inspired by Mexican mariachi music
- Maintain cultural authenticity in all enhancements

## Performance Constraints

### Performance Budget
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Bundle Size: < 500KB (gzipped)

### Optimization Patterns
- Components use React.memo where appropriate
- Avoid unnecessary re-renders (check dependency arrays)
- Keep component render functions < 20 lines when possible

## Browser Support
- Chrome, Firefox, Safari: Latest 3 versions
- Edge: Latest 2 versions
- Mobile: iOS Safari, Android Chrome
- Web Audio API support required (with fallbacks)

## Decision-Making Principles

When implementing features:
1. **PRD first** - Always create/update PRD before coding
2. **Test coverage** - Write tests alongside code, aim for >80%
3. **Bilingual** - All text must support Spanish and English
4. **Accessible** - Proper ARIA, keyboard navigation, screen reader support
5. **Documented** - Add model documentation headers and comments
6. **Simple** - Prefer simplicity over complexity
7. **Cultural authenticity** - Respect Mexican Lotería traditions

## Common Tasks

### Adding a New Component
1. Create PRD: `PRD_[ComponentName].md`
2. Create component file: `src/components/[ComponentName].js`
3. Add file header with model documentation
4. Implement component following existing patterns
5. Create test file: `src/__tests__/components/[ComponentName].test.js`
6. Ensure bilingual support if component renders text
7. Add accessibility attributes
8. Update PRD with implementation status

### Modifying Game Logic
Game logic lives in `App.js`. Key functions:
- `startNewGame()`: Initialize/reset game state
- `drawCard()`: Draw next card, update state
- `checkForWin(positions)`: Detect winning patterns
- `handleCardClick(card, position)`: Manual card marking

Win patterns are rows, columns, and diagonals (4x4 grid).

### Adding Sound Effects
Sounds are generated using Web Audio API. Pattern:
```javascript
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const oscillator = audioContext.createOscillator();
const gainNode = audioContext.createGain();
// Configure and connect nodes
oscillator.start(time);
oscillator.stop(time + duration);
```

Always wrap in try/catch and provide fallback for unsupported browsers.

## Integration Points

### No External Dependencies
- No API calls
- No database
- No authentication
- No user accounts
- Pure client-side game

### Future Considerations
If adding multiplayer or persistence:
- Create PRD first outlining architecture
- Consider Firebase or similar real-time database
- Maintain cultural authenticity
- Ensure comprehensive testing
