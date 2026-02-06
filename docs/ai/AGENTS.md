# AGENTS.md - Development Guidelines for Lotería Game

## Build, Lint, and Test Commands

### Development Server
```bash
# Start the development server
npm start

# Runs on http://localhost:3000
# Auto-reloads when files change
```

### Production Build
```bash
# Create optimized production build
npm run build

# Builds to the `build` folder
# Includes minification and optimization
```

### Testing
```bash
# Run all tests in watch mode
npm test

# Run specific test file
npm test -- --testPathPattern=filename.test.js

# Run single test
npm test -- --testNamePattern="test name"

# Run tests with coverage
npm test -- --coverage
```

### Linting
```bash
# Run ESLint to check code style
npx eslint src/

# Fix automatically fixable issues
npx eslint src/ --fix

# Check specific file
npx eslint src/App.js
```

### Code Formatting
```bash
# Format code with Prettier (if installed)
npx prettier --write src/

# Check formatting without writing
npx prettier --check src/
```

## Code Style Guidelines

### JavaScript/React Standards

#### Imports
```javascript
// ✅ Correct: Grouped and ordered imports
import React, { useState, useEffect, useRef } from 'react';
import { someUtility } from '../utils';
import Component from '../components/Component';
import './styles.css';

// ❌ Incorrect: Ungrouped, unordered imports
import './styles.css';
import { useEffect } from 'react';
import Component from '../components/Component';
import { someUtility } from '../utils';
```

**Import Order**:
1. React imports
2. Third-party library imports
3. Local utility imports
4. Local component imports
5. Style imports

#### Component Structure
```javascript
// ✅ Correct component structure
function ComponentName() {
  // State hooks
  const [state, setState] = useState(initial);
  
  // Ref hooks
  const ref = useRef(null);
  
  // Effect hooks
  useEffect(() => { }, []);
  
  // Event handlers
  const handleEvent = () => { };
  
  // Helper functions
  const helperFunction = () => { };
  
  // Render
  return (<>...</>);
}
```

#### Naming Conventions
```javascript
// ✅ Correct naming
const userName = 'John';           // camelCase for variables
const isActive = true;             // boolean prefix: is, has, can
const MAX_SIZE = 100;              // UPPER_CASE for constants
const handleClick = () => { };     // handle prefix for events
const fetchData = async () => { }; // verb prefix for functions
const UserProfile = () => { };     // PascalCase for components

// ❌ Incorrect naming
const username = 'John';           // too short/abbreviated
const active = true;               // missing boolean prefix
const maxSize = 100;               // should be UPPER_CASE
const onClick = () => { };         // reserved for props
const data = async () => { };       // missing verb prefix
const user_profile = () => { };    // should be PascalCase
```

#### TypeScript (Future Implementation)
```typescript
// ✅ Recommended TypeScript patterns
interface User {
  id: number;
  name: string;
  email: string;
  isActive?: boolean; // Optional property
}

const fetchUser = async (id: number): Promise<User> => {
  // Implementation
};

// ❌ Avoid
const fetchUser = async (id) => { // Missing types
  // Implementation
};
```

### React Best Practices

#### Hooks Usage
```javascript
// ✅ Correct hook usage
const [count, setCount] = useState(0);
const [user, setUser] = useState(null);

useEffect(() => {
  const timer = setTimeout(() => {}, 1000);
  return () => clearTimeout(timer); // Cleanup
}, [dependencies]);

// ❌ Incorrect hook usage
useEffect(() => {
  const timer = setTimeout(() => {});
  // Missing cleanup
});
```

#### Component Props
```javascript
// ✅ Correct prop handling
function UserCard({ name, email, onClick }) {
  return (
    <div onClick={onClick}>
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}

// ❌ Incorrect prop handling
function UserCard(props) {
  return (
    <div onClick={props.onClick}>
      <h3>{props.name}</h3>
      <p>{props.email}</p>
    </div>
  );
}
```

#### Conditional Rendering
```javascript
// ✅ Correct conditional rendering
{isLoading ? (
  <LoadingSpinner />
) : error ? (
  <ErrorMessage />
) : (
  <Content />
)}

// ❌ Incorrect conditional rendering
{isLoading && <LoadingSpinner />}
{!isLoading && !error && <Content />}
```

### Error Handling

#### API Error Handling
```javascript
// ✅ Correct error handling
try {
  const response = await fetchData();
  setData(response);
} catch (error) {
  console.error('Fetch failed:', error);
  setError('Failed to load data');
  // Consider user-friendly error messages
}

// ❌ Incorrect error handling
try {
  const response = await fetchData();
  setData(response);
} catch (error) {
  // Silent failure - bad practice
}
```

#### User Feedback
```javascript
// ✅ Good user feedback
if (error) {
  return (
    <div className="error-message">
      <p>Something went wrong: {error.message}</p>
      <button onClick={retry}>Try Again</button>
    </div>
  );
}

// ❌ Poor user feedback
if (error) {
  return <p>Error</p>; // Not helpful
}
```

### Code Formatting

#### Indentation
```javascript
// ✅ Correct indentation (2 spaces)
function Component() {
  const [state, setState] = useState();
  
  const handleClick = () => {
    setState(prev => !prev);
  };
  
  return (
    <div>
      <button onClick={handleClick}>
        Click me
      </button>
    </div>
  );
}

// ❌ Incorrect indentation
function Component() {
    const [state, setState] = useState(); // 4 spaces
    const handleClick = () => {
      setState(prev => !prev);
    };
    return <div><button onClick={handleClick}>Click</button></div>; // No consistent indentation
}
```

#### Line Length
```javascript
// ✅ Good line length (80-100 chars max)
const userData = await fetchUserDataFromApi(
  userId,
  { includePosts: true }
);

// ❌ Too long (hard to read)
const userData = await fetchUserDataFromApi(userId, { includePosts: true, includeComments: true, includeLikes: true, includeFollowers: true });
```

#### Brace Style
```javascript
// ✅ Correct brace style
if (condition) {
  // Do something
} else {
  // Do something else
}

// ❌ Incorrect brace styles
if (condition) {
  // Do something
}
else {
  // Do something else
}
```

### CSS/Sass Guidelines

#### Class Naming
```css
/* ✅ Good class naming */
.button-primary {}
.user-card__header {}
.game-board__cell--marked {}

/* ❌ Bad class naming */
.btn {}
.uc-hdr {}
.gb-c-m {}
```

#### Organization
```css
/* ✅ Good organization */
/* Layout */
.container {}

/* Components */
.button {}
.card {}

/* Modifiers */
.button--primary {}
.card--marked {}

/* States */
.is-active {}
.is-disabled {}

/* ❌ Bad organization */
.button {}
.container {}
.is-disabled {}
.card--marked {}
```

### Performance Guidelines

#### React Optimization
```javascript
// ✅ Optimized components
const MemoizedComponent = React.memo(Component);

useCallback(() => {
  // Expensive calculation
}, [dependencies]);

useMemo(() => {
  return expensiveCalculation();
}, [dependencies]);

// ❌ Unoptimized components
function Component() {
  const result = expensiveCalculation(); // Recalculates every render
  return <div>{result}</div>;
}
```

#### Bundle Size
```javascript
// ✅ Good import practices
import { debounce } from 'lodash/debounce';

// ❌ Bad import practices
import _ from 'lodash'; // Imports entire library
```

### Accessibility Guidelines

#### Semantic HTML
```javascript
// ✅ Good accessibility
<button onClick={handleClick}>Click me</button>

// ❌ Poor accessibility
div onClick={handleClick} role="button" tabIndex="0">Click me</div>
```

#### ARIA Attributes
```javascript
// ✅ Good ARIA usage
<div
  role="alert"
  aria-live="assertive"
  aria-atomic="true"
>
  {errorMessage}
</div>

// ❌ Bad ARIA usage
div aria-live={true}> // Invalid usage
```

### Testing Guidelines

#### Test Structure
```javascript
// ✅ Good test structure
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Test implementation
  });
  
  it('should handle click events', () => {
    // Test implementation
  });
  
  describe('when loading', () => {
    it('should show loading state', () => {
      // Test implementation
    });
  });
});
```

#### Test Coverage
```javascript
// ✅ Good test coverage
// Test happy path
// Test error cases
// Test edge cases
// Test user interactions

// ❌ Poor test coverage
// Only test happy path
// Ignore error cases
```

### Git Guidelines

#### Commit Messages
```bash
# ✅ Good commit messages
git commit -m "feat: add bilingual interface support"
git commit -m "fix: correct card marking logic"
git commit -m "docs: update README with game rules"
git commit -m "refactor: optimize win detection algorithm"

# ❌ Bad commit messages
git commit -m "fixed stuff"
git commit -m "wip"
git commit -m "changes"
```

#### Branch Naming
```bash
# ✅ Good branch names
git checkout -b feat/bilingual-interface
git checkout -b fix/card-marking-bug
git checkout -b docs/game-rules
git checkout -b refactor/win-detection

# ❌ Bad branch names
git checkout -b update
git checkout -b fix-stuff
git checkout -b temp
```

### Project Structure

```
src/
├── components/      # Reusable components
├── hooks/           # Custom hooks
├── utils/           # Utility functions
├── assets/          # Static assets
├── sounds/          # Audio files
├── styles/          # CSS/Sass files
├── App.js           # Main app component
├── App.css          # Main styles
└── index.js         # Entry point
```

### Agent-Specific Instructions

#### For Code Generation Agents
- Follow existing code patterns and conventions
- Use the same import structure and organization
- Maintain consistent naming conventions
- Add appropriate error handling
- Include necessary documentation comments

#### For Testing Agents
- Create comprehensive test cases
- Test both happy paths and edge cases
- Include accessibility tests
- Verify bilingual functionality
- Test audio features

#### For Documentation Agents
- Maintain bilingual documentation
- Update README with new features
- Document cultural considerations
- Explain technical decisions
- Keep PRDs up to date

### Unit Testing Requirements

#### Test Coverage Standards
- **Minimum Coverage**: 80% code coverage required
- **Critical Paths**: 100% coverage for core functionality
- **Edge Cases**: Test boundary conditions and error states
- **User Flows**: Test complete user interaction sequences

#### Testing Framework
```javascript
// ✅ Recommended testing approach
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  it('should render without crashing', () => {
    render(<App />);
    expect(screen.getByText(/Lotería/i)).toBeInTheDocument();
  });

  it('should start new game when button clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Nuevo Juego/i));
    expect(screen.getByText(/Tu Tablero/i)).toBeInTheDocument();
  });

  it('should handle card marking correctly', () => {
    // Test card marking logic
  });

  it('should detect win conditions properly', () => {
    // Test all winning patterns
  });
});
```

#### Test Types Required
```markdown
# Required Test Types

## Unit Tests
- Component tests (isolated)
- Function tests (pure functions)
- Hook tests (custom hooks)
- Utility tests (helper functions)

## Integration Tests
- Component interaction tests
- State management tests
- API integration tests
- Redux/context tests

## End-to-End Tests
- User journey tests
- Complete game flow tests
- Error recovery tests
- Performance tests
```

#### Test File Structure
```
src/
├── __tests__/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── integration/
├── components/
│   ├── Component.js
│   └── Component.test.js
└── utils/
    ├── utility.js
    └── utility.test.js
```

#### Test Naming Conventions
```javascript
// ✅ Good test naming
describe('ComponentName', () => {
  describe('when [condition]', () => {
    it('should [expected behavior]', () => {
      // Test implementation
    });
  });
});

// ❌ Bad test naming
describe('Test', () => {
  it('works', () => {
    // Not descriptive
  });
});
```

#### Test Data Management
```javascript
// ✅ Good test data practices
const mockUser = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com'
};

const mockResponse = {
  data: [],
  status: 200
};

// ❌ Bad test data practices
const user = { id: 1, name: 'User' }; // Too minimal
```

#### Test Maintenance
- Update tests when requirements change
- Keep tests fast and isolated
- Avoid testing implementation details
- Focus on behavior, not internal structure
- Clean up test data after each test

### Product Requirements Documentation (PRD) Rules

#### PRD Creation Requirements
- **Mandatory PRDs**: Every new feature MUST have a corresponding PRD
- **PRD First**: Create PRD before writing code
- **Comprehensive Coverage**: PRD must include:
  - Feature overview and objectives
  - Detailed requirements and specifications
  - Technical implementation approach
  - User experience considerations
  - Acceptance criteria
  - Testing requirements
  - Performance considerations
  - Accessibility guidelines

#### PRD Naming Convention
```
PRD_[FeatureName].md

# ✅ Good examples
PRD_Bilingual_Interface.md
PRD_Audio_Enhancements.md
PRD_Cultural_History.md

# ❌ Bad examples
prd.md
feature.md
new_feature.md
```

#### PRD Content Requirements
```markdown
# Required Sections in Every PRD

## Feature: [Clear Feature Name]

### Overview
- Clear description of the feature
- Business value and user impact
- Relationship to existing features

### Requirements
- Functional requirements
- Technical requirements
- User interface specifications
- Performance requirements

### Technical Implementation
- Architecture decisions
- Code structure
- Integration points
- Data flow diagrams (if complex)

### User Experience
- User flows
- Wireframes/design specifications
- Accessibility considerations
- Internationalization needs

### Acceptance Criteria
- Clear checklist of completion requirements
- Testable specifications
- Success metrics

### Testing Requirements
- Unit test specifications
- Integration test requirements
- User acceptance testing
- Performance testing

### Documentation Requirements
- User documentation needs
- Technical documentation needs
- API documentation (if applicable)

### Compliance & Standards
- Security considerations
- Privacy implications
- Legal compliance
- Industry standards

### Future Enhancements
- Roadmap for future development
- Potential extensions
- Scalability considerations

### Implementation Status
- Current status (Planned/In Progress/Complete)
- Completion percentage
- Blockers or dependencies
```

#### PRD Review Process
1. **Create PRD**: Before writing any code
2. **Peer Review**: Get feedback from team members
3. **Stakeholder Approval**: Ensure requirements are correct
4. **Update as Needed**: Keep PRD current during development
5. **Final Review**: Before marking feature as complete

#### PRD Maintenance
- Update PRDs when requirements change
- Mark PRDs with implementation status
- Archive old PRDs (don't delete)
- Reference PRDs in commit messages

#### PRD Enforcement
```bash
# Before implementing any feature:
1. Check if PRD exists
2. If not, create PRD first
3. Get PRD approval
4. Then implement feature
5. Update PRD with implementation details
6. Mark PRD as complete when done
```

### Local Code Review Process

#### Model Documentation Requirements

#### Model Usage Tracking
```markdown
# Model Documentation Standard

## For All Generated Code
- Document the AI model used
- Specify version/timestamp
- Include generation context
- Maintain consistency

## Code Comment Format
// MODEL: [model-name]-[version]
// PURPOSE: [brief-description]
// DATE: [YYYY-MM-DD]
// CONTEXT: [relevant-context]

## Example
// MODEL: opencode-v1.0
// PURPOSE: Created Card component for Lotería game
// DATE: 2026-01-14
// CONTEXT: Component decomposition phase

## PRD Documentation
Each PRD must include:
- Model used for initial generation
- Version/timestamp of generation
- Any human modifications
- Review and approval status

## File Header Format
/**
 * @file [filename]
 * @model [model-name]-[version]
 * @generated [YYYY-MM-DD]
 * @modified [YYYY-MM-DD] (if applicable)
 * @reviewer [name] (if reviewed)
 */
```

#### Model Tracking in PRDs
```markdown
# Model Information

## Generation Details
- **Model Used**: [model-name]-[version]
- **Generation Date**: [YYYY-MM-DD]
- **Prompt/Context**: [brief-description]
- **Human Review**: [yes/no] [initials]
- **Modifications**: [description-if-applicable]

## Example PRD Model Section
```
### Model Information

**Model Used**: opencode-v1.0
**Generation Date**: 2026-01-14
**Prompt/Context**: "Create Card component for Lotería game with React"
**Human Review**: Yes (MW)
**Modifications**: Added accessibility attributes, optimized performance
**Approval Status**: ✅ Approved
```

#### Model Version Tracking
```markdown
# Model Versions

## Current Models
- opencode-v1.0: Primary code generation
- opencode-v1.1: Enhanced with testing
- opencode-v1.2: Documentation focus

## Version History
- v1.0: Initial release (2026-01-01)
- v1.1: Added testing (2026-01-10)
- v1.2: Documentation (2026-01-15)

## Usage Guidelines
- Always specify model version
- Track generation dates
- Document human modifications
- Maintain review chain
```

### Code Review Checklist
```markdown
# Mandatory Code Review Checklist

## Before Submitting Code
- [ ] PRD exists and is approved
- [ ] All unit tests pass
- [ ] Test coverage ≥ 80%
- [ ] Linting passes (no ESLint errors)
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] Bilingual content verified
- [ ] Accessibility requirements met
- [ ] Performance standards maintained
- [ ] Error handling implemented

## Code Quality Checks
- [ ] No console.log statements
- [ ] No commented-out code
- [ ] No unused imports/variables
- [ ] Proper error boundaries
- [ ] Type safety (where applicable)
- [ ] Memory leak prevention
- [ ] Security considerations

## Testing Checks
- [ ] Unit tests cover all functions
- [ ] Edge cases tested
- [ ] Error conditions tested
- [ ] Integration tests pass
- [ ] Manual testing completed

## Documentation Checks
- [ ] Code comments updated
- [ ] README updated (if needed)
- [ ] PRD updated with implementation details
- [ ] API documentation (if applicable)
```

#### Automated Review Tools
```bash
# Run automated checks before code review
npm test              # Run all tests
npx eslint src/       # Check code style
npx prettier --check src/ # Check formatting
npm run build        # Test production build
```

#### Manual Review Process
```markdown
# Manual Code Review Steps

1. **Self-Review**
   - Review own code against checklist
   - Run automated tests
   - Fix any issues found

2. **Peer Review**
   - Request review from team member
   - Address all feedback
   - Document decisions

3. **Final Verification**
   - Confirm all checks pass
   - Verify test coverage
   - Ensure documentation complete
   - Mark PRD as complete
```

#### Code Review Best Practices
```markdown
# Effective Code Review Guidelines

## For Authors
- Keep changes small and focused
- Write clear commit messages
- Explain complex decisions
- Be responsive to feedback
- Test thoroughly before review

## For Reviewers
- Be constructive and specific
- Focus on quality, not style preferences
- Suggest improvements, not just problems
- Consider performance implications
- Verify test coverage
- Check edge cases

## For Both
- Keep discussions professional
- Document decisions
- Prioritize user impact
- Maintain code consistency
- Respect time constraints
```

#### Common Review Issues
```markdown
# Issues to Watch For

## Code Quality
- Overly complex logic
- Poorly named variables/functions
- Magic numbers/strings
- Deep nesting
- Long functions (>20 lines)

## Testing
- Missing edge case tests
- Slow running tests
- Tests that depend on implementation
- Missing error condition tests

## Performance
- Unnecessary re-renders
- Memory leaks
- Large bundle size increases
- Slow algorithms

## Security
- Unsanitized inputs
- Hardcoded secrets
- Insecure dependencies
- Missing validation
```

#### Review Automation
```javascript
// Example: Automated code review script
const { execSync } = require('child_process');

function runCodeReview() {
  try {
    console.log('Running tests...');
    execSync('npm test', { stdio: 'inherit' });
    
    console.log('Checking linting...');
    execSync('npx eslint src/', { stdio: 'inherit' });
    
    console.log('Checking formatting...');
    execSync('npx prettier --check src/', { stdio: 'inherit' });
    
    console.log('Building for production...');
    execSync('npm run build', { stdio: 'inherit' });
    
    console.log('✅ All checks passed!');
    return true;
  } catch (error) {
    console.error('❌ Code review failed:', error.message);
    return false;
  }
}
```

### Continuous Integration

#### Recommended CI Setup
```yaml
# Example GitHub Actions workflow
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm test
      - run: npx eslint src/
```

### Deployment Guidelines

#### Production Deployment
```bash
# Build for production
npm run build

# Deploy to hosting service
# (Specific commands depend on hosting provider)
```

#### Environment Variables
```env
# ✅ Environment variable usage
REACT_APP_API_URL=https://api.example.com
REACT_APP_DEBUG=false

# ❌ Hardcoded configuration
const apiUrl = 'https://api.example.com'; // Should be in env
```

### Monitoring and Analytics

#### Error Tracking
```javascript
// ✅ Good error tracking
try {
  // Code that might fail
} catch (error) {
  console.error('Detailed error info:', error);
  // Send to error tracking service
  trackError(error);
}
```

### Security Guidelines

#### Data Handling
```javascript
// ✅ Secure data handling
// Use HTTPS for all API calls
// Sanitize user input
// Use secure authentication methods
// Follow OWASP guidelines
```

### Performance Budget

```
# Performance targets
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Bundle Size: < 500KB (gzipped)
- Lighthouse Score: > 90
```

### Browser Support

```
# Supported browsers
- Chrome: Latest 3 versions
- Firefox: Latest 3 versions
- Safari: Latest 2 versions
- Edge: Latest 2 versions
- Mobile: iOS Safari, Android Chrome
```

### Internationalization

```javascript
// ✅ Internationalization patterns
// Use language state for bilingual content
// Support right-to-left languages if needed
// Use proper date/time formatting
// Handle currency formatting appropriately
```

### Code Review Guidelines

#### Review Checklist
```markdown
- [ ] Follows code style guidelines
- [ ] Includes appropriate tests
- [ ] Handles errors gracefully
- [ ] Maintains performance standards
- [ ] Accessible to all users
- [ ] Bilingual content updated
- [ ] Documentation complete
- [ ] No breaking changes
```

### Onboarding for New Developers

```bash
# Setup instructions for new developers
1. Clone repository
2. Run `npm install`
3. Run `npm start`
4. Read AGENTS.md for guidelines
5. Review existing PRDs
6. Check open issues
```

## Agent Operations Protocol

### For Autonomous Agents
1. **Always** read AGENTS.md first
2. Follow existing code patterns
3. **Write unit tests for all new code**
4. Maintain test coverage (>80% minimum)
5. Update documentation
6. Respect performance budgets
7. Prioritize accessibility
8. Handle errors gracefully
9. Write clear commit messages
10. **Create PRD before implementing new features**
11. **Run local code review before committing**
12. **Document model used for code generation**
13. Update PRDs when adding features
14. Maintain bilingual consistency

### Decision Making
- Prefer simplicity over complexity
- Favor readability over cleverness
- Optimize for maintainability
- Consider performance impact
- Prioritize user experience
- Maintain cultural authenticity
- **Document before implementing**
- **Test-driven development approach**
- **Code review before finalizing**
- **Record model used for generation**

### When in Doubt
- Check existing codebase patterns
- Review PRDs for requirements
- Look at similar implementations
- Consider the user impact
- Document decisions clearly
- **Create PRD if feature is unclear**
- **Document model used for generation**

## End of AGENTS.md