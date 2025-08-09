# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Binoctal-Hexadecimal is a webapp game designed to teach students about bases 2, 8, 10, and 16.
The game uses React with Vite and Tailwind using ShadCN UI, and is a SPA with no network calls outside of necessary assets.

When the user loads the game, they are given a list of three difficulties to choose from; Easy, Medium, and Hard.
These difficulties affect the range of numbers that can be generated.

Easy: 0-25
Medium: 0-100
Hard: 0-1000

When a difficulty is selected, a timer appears at the top (60 seconds), with a number appearing underneath in a randomly chosen base.
The base is shown to the bottom right of this generated number.
Underneath the number, a question is shown: 'What is this number in base <newBase>', where <newBase> is a randomly selected base that is different from the original base.
Underneath this question is an input field, allowing the user to enter a number in the new base.
When the user enters a number and hits enter or clicks the submit button, if the number is correct, a green tick appears on top of the input field, slowly fading to reveal the next question.
If the user is incorrect, the input field gets a red border and shakes a little.

Once the timer runs out, the user is shown a message saying 'Game Over', with their total score shown.
They are presented with the difficulty buttons underneath, with the message 'Play again?'

## Code Requirements

Ensure that Prettier and ESLint are installed.
ESLint should be configured to use fairly strict rules, including TypeScript and React specific lints.
This project uses the latest version of Tailwind, v4, which has a different install process than Tailwind v3.
