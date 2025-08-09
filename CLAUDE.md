# CLAUDE.md

## Overview
**Binoctal-Hexadecimal** is a React + Vite + Tailwind v4 (ShadCN UI) SPA game teaching bases 2, 8, 10, and 16.  
No external network calls except for assets.

**Gameplay:**
- Choose difficulty:
    - Easy: 0–25
    - Medium: 0–100
    - Hard: 0–1000
- 60s timer starts; a number appears in a random base with its base shown below-right.
- Prompt: *"What is this number in base `<newBase>`"* where `<newBase>` ≠ original base.
- User enters answer →
    - Correct: green tick fades, next question.
    - Incorrect: red border + shake.
- When time ends: "Game Over" + score + difficulty buttons ("Play again?").

## Code Guidelines
- Use **Prettier** + **ESLint** (strict, TypeScript + React rules, no Prettier conflicts).
- Tailwind v4 install process (different from v3).
- After each change:
    1. Run TypeScript compiler
    2. Run ESLint
    3. Run unit tests
    4. Run Prettier

## Version Control
- After significant changes: propose commit message → on approval, commit & push.

## Testing
- Uses **Vitest** + **React Testing Library**.
- Before major changes:
    1. Plan tests
    2. Ensure they fail
    3. Implement code until they pass