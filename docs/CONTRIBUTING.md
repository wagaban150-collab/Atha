# Contributing Guidelines

## Code Style

### TypeScript
- Use strict mode
- Type all function parameters and returns
- Use interfaces for object shapes
- Avoid `any` type

### Naming Conventions
- camelCase for variables and functions
- PascalCase for classes and interfaces
- UPPER_SNAKE_CASE for constants
- Descriptive names over short abbreviations

## Git Workflow

1. Create feature branch from `main`
   ```bash
   git checkout -b feature/descriptive-name
   ```

2. Make atomic commits
   ```bash
   git commit -m "Type: Brief description"
   ```
   Types: feat, fix, docs, style, refactor, test, chore

3. Keep commits clean and descriptive

4. Push to remote
   ```bash
   git push origin feature/descriptive-name
   ```

5. Create Pull Request

## Pull Request Requirements

- [ ] Code follows style guide
- [ ] Tests pass locally
- [ ] No console errors or warnings
- [ ] Descriptive PR title and description
- [ ] Related issues linked
- [ ] Changes documented

## Testing

### Backend
- Unit tests for utilities and helpers
- Integration tests for API endpoints
- Use Jest framework

### Frontend
- Component tests with React Testing Library
- Integration tests for key flows
- Minimum 70% code coverage

## Documentation

- Update README.md if adding features
- Add JSDoc comments to functions
- Document complex logic
- Keep API documentation updated

## Performance

- Minimize bundle size
- Use code splitting
- Optimize database queries
- Implement caching where appropriate
- Monitor performance metrics

## Accessibility

- Use semantic HTML
- Add ARIA labels
- Test with keyboard navigation
- Test with screen readers
- Maintain color contrast

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Questions or Need Help?

Open an issue or reach out to the development team.
