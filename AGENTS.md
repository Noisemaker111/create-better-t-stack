# Ultracite Code Standards

This project uses **Ultracite**, a zero-config preset that enforces strict code quality standards through automated formatting and linting.

## Quick Reference

- **Format code**: `bun x ultracite fix`
- **Check for issues**: `bun x ultracite check`
- **Diagnose setup**: `bun x ultracite doctor`

Biome (the underlying engine) provides robust linting and formatting. Most issues are automatically fixable.

---

## Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.

### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names

### Modern JavaScript/TypeScript

- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`

### Async & Promises

- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors

### React & JSX

- Use function components over class components
- Call hooks at the top level only, never conditionally
- Specify all dependencies in hook dependency arrays correctly
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices)
- Nest children between opening and closing tags instead of passing as props
- Don't define components inside other components
- Use semantic HTML and ARIA attributes for accessibility:
  - Provide meaningful alt text for images
  - Use proper heading hierarchy
  - Add labels for form inputs
  - Include keyboard event handlers alongside mouse events
  - Use semantic elements (`<button>`, `<nav>`, etc.) instead of divs with roles

### Error Handling & Debugging

- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Use `try-catch` blocks meaningfully - don't catch errors just to rethrow them
- Prefer early returns over nested conditionals for error cases

### Code Organization

- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternary operators
- Group related code together and separate concerns

### Security

- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input

### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Prefer specific imports over namespace imports
- Avoid barrel files (index files that re-export everything)
- Use proper image components (e.g., Next.js `<Image>`) over `<img>` tags

### Framework-Specific Guidance

**Next.js:**

- Use Next.js `<Image>` component for images
- Use `next/head` or App Router metadata API for head elements
- Use Server Components for async data fetching instead of async Client Components

**React 19+:**

- Use ref as a prop instead of `React.forwardRef`

**Solid/Svelte/Vue/Qwik:**

- Use `class` and `for` attributes (not `className` or `htmlFor`)

---

## Testing

- Write assertions inside `it()` or `test()` blocks
- Avoid done callbacks in async tests - use async/await instead
- Don't use `.only` or `.skip` in committed code
- Keep test suites reasonably flat - avoid excessive `describe` nesting

## When Biome Can't Help

Biome's linter will catch most issues automatically. Focus your attention on:

1. **Business logic correctness** - Biome can't validate your algorithms
2. **Meaningful naming** - Use descriptive names for functions, variables, and types
3. **Architecture decisions** - Component structure, data flow, and API design
4. **Edge cases** - Handle boundary conditions and error states
5. **User experience** - Accessibility, performance, and usability considerations
6. **Documentation** - Add comments for complex logic, but prefer self-documenting code

---

Most formatting and common issues are automatically fixed by Biome. Run `bun x ultracite fix` before committing to ensure compliance.

## Agent Workflow Integration

### Before Completing Any Task

Agents MUST run biome checks at task completion:

```bash
bun x ultracite check
```

If errors are found:
1. Run `bun x ultracite fix` to auto-fix formatting issues
2. Review remaining linting errors
3. Fix accessibility issues (a11y rules are strict)
4. Re-run `bun x ultracite check` until clean

### Common Error Patterns to Fix

- **useValidAnchor**: Use `<button>` for actions, `<a>` for navigation only
- **useImageSize**: Add explicit width/height to `<img>` tags
- **useButtonType**: Add `type="button"` or `type="submit"` to buttons
- **noNestedTernary**: Convert to if-else statements
- **noNoninteractiveElementInteractions**: Wrap interactive elements properly
- **useLabelWithoutControl**: Associate labels with inputs via `htmlFor`

### Build Verification

Always verify the build passes after biome checks:

```bash
bun run build
```

If the build fails, fix the errors before marking a task complete.

---

## Biome Configuration

The project uses Biome through Ultracite preset. Configuration is inherited from the preset - no local biome.jsonc required unless overriding specific rules.

---

## Development Workflow

### Running the Project

**Development (root):**
```bash
bun dev
```
This runs both Convex backend and web frontend concurrently through Turborepo. Changes to Convex functions are automatically pushed.

**Convex only:**
```bash
cd packages/backend && bunx convex dev
```

**Web only:**
```bash
bun run dev:web
```

### After Adding Convex Functions

When adding new Convex queries or mutations:

1. Functions are automatically deployed when running `bun dev` (root)
2. Or manually deploy: `cd packages/backend && bunx convex dev`
3. Regenerate types: `cd packages/backend && bunx convex codegen`
4. The frontend types are generated to `packages/backend/convex/_generated/api.d.ts`

### Deployment

**Production build:**
```bash
bun run build
```

This runs `convex codegen`, deploys to Convex, then builds the web app.
