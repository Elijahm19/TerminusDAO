# Contributing to Terminus DAO Website

Thank you for your interest in contributing to Terminus DAO! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Pull Requests](#pull-requests)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs

Before creating a bug report, please check existing issues to avoid duplicates. When creating a bug report, include as many details as possible using our [bug report template](.github/ISSUE_TEMPLATE/bug_report.md).

**Great bug reports include:**
- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Screenshots if applicable
- Browser and device information

### Suggesting Features

Feature suggestions are welcome! Please use our [feature request template](.github/ISSUE_TEMPLATE/feature_request.md) and include:

- A clear description of the feature
- The problem it solves
- Any alternative solutions you've considered

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Follow the style guidelines** outlined below
3. **Test your changes** locally before submitting
4. **Write clear commit messages** following our conventions
5. **Submit your pull request** using our PR template

## Style Guidelines

### HTML

- Use semantic HTML5 elements
- Include proper accessibility attributes (alt text, aria labels)
- Indent with 2 spaces
- Use lowercase for element names and attributes

### CSS

- Follow the existing variable naming convention (`--kebab-case`)
- Group related properties together
- Use CSS custom properties for colors and common values
- Mobile-first approach with media queries for larger screens

### JavaScript

- Use `const` and `let` (never `var`)
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### File Naming

- Use lowercase with hyphens for multi-word files: `feature-name.js`
- Keep names descriptive but concise

## Branch Naming

Use descriptive branch names following this pattern:

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation changes
- `refactor/description` - Code refactoring

**Examples:**
- `feature/dark-mode-toggle`
- `fix/mobile-navigation`
- `docs/update-readme`

## Commit Messages

Write clear, concise commit messages:

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Keep the first line under 72 characters
- Reference issues when relevant

**Format:**
```
<type>: <short summary>

<optional detailed description>

<optional footer with issue references>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code restructuring without behavior change
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat: Add newsletter signup form

fix: Correct mobile menu z-index issue

docs: Update event configuration instructions
```

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/terminus_dao.git
   cd terminus_dao
   ```

2. Open `index.html` in your browser to view the site locally

3. Make your changes and test across different browsers and screen sizes

## Questions?

Feel free to open an issue if you have questions about contributing. We appreciate your interest in making Terminus DAO better!
