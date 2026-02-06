# Component Requirements

Product Requirements Documents for individual UI components.

## Components

All component PRDs are ✅ **Complete** and implemented.

### [card.md](./card.md)
Individual Lotería card component with marking functionality.

**Features**:
- Displays card emoji and name
- Shows marked/unmarked state
- Click handling for marking
- Accessibility attributes (ARIA, keyboard navigation)

---

### [game-board.md](./game-board.md)
4x4 grid displaying the player's board.

**Features**:
- Renders 16 cards in a grid layout
- Manages marked positions
- Handles card click events
- Bilingual board title

---

### [current-card.md](./current-card.md)
Displays the currently drawn card with traditional call.

**Features**:
- Shows current card emoji and name
- Displays traditional Spanish call/rhyme
- Bilingual support
- Visual emphasis for current card

---

### [language-toggle.md](./language-toggle.md)
Language switcher between Spanish and English.

**Features**:
- Toggle between ES/EN
- Persistent language state
- Accessible button controls
- Clear visual indication of current language

---

### [game-info.md](./game-info.md)
Displays game statistics and progress.

**Features**:
- Cards drawn counter
- Cards marked counter
- Bilingual labels
- Real-time updates

---

### [how-to-play.md](./how-to-play.md)
Game instructions and rules panel.

**Features**:
- Lotería rules explanation
- How to play instructions
- Bilingual content
- Cultural context

---

### [win-message.md](./win-message.md)
Victory celebration screen.

**Features**:
- "¡Lotería!" victory message
- Bilingual congratulations
- Play again button
- Celebration animations/sounds

---

## Component Architecture

All components follow consistent patterns:
- Functional components with React hooks
- Props destructuring for clarity
- Accessibility-first design
- Bilingual support where applicable
- Clear, descriptive naming

## Related Documentation

- [Feature PRDs](../features/) - Feature-level requirements
- [AI Development Guide](../../ai/CLAUDE.md) - Component patterns
- [Code Reviews](../../reviews/) - Component review standards

**Last Updated**: 2026-02-06
