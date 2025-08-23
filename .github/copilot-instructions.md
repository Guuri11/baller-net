## Project Vision

Baller Net is a basketball social network. The goal is to create a platform where fans can connect, share, and engage with their favorite sport in a meaningful way.

- The UI will be crafted with Gluestack UI for a beautiful, consistent, and accessible experience.
- All features are tailored to enhance user engagement and interaction.
- Baller Net will make it easy for fans to connect and share their passion for basketball.

# Copilot Instructions for Baller Net

## Language and Style

- **All code, comments, and documentation must be written in English**, regardless of the language used in the prompt or communication.

## Architecture Principles

- The project follows **Domain-Driven Design (DDD)** and a **modular, layered architecture**.
- The main layers are:
  - `domain`: Core business logic, domain models, value objects, and errors. No infrastructure or UI logic here.
  - `application`: Application-specific use cases and orchestration. No UI or infrastructure logic.
  - `infrastructure`: Adapters for external systems (local storage, APIs, etc). No business logic here.
  - `presentation`: UI components, assets, and user interaction logic. No business logic here.
  - `app`: Application entry point and routing.

## Directory Structure

- `src/domain/`: Domain models, value objects, errors, use cases interfaces, and repository interfaces for each entity.
- `src/application/`: Use cases and application services implementations.
- `src/infrastructure/`: Adapters for persistence, API integrations, and other external services.
- `src/presentation/`: UI components, assets, and utilities.
- `app/`: Application entry point and routing.

## Best Practices

- **Separation of concerns**: Keep domain, application, infrastructure, and presentation logic separated.
- **No business logic in infrastructure or presentation**.
- **No direct backend or storage access in domain or presentation**; always use repositories/adapters.
- **Validation**: Validate all external input in the presentation or application layer before passing to domain logic.
- **Error handling**: Use domain-specific errors in business, and map them to appropriate UI messages or codes.
- **Testing**: Write unit tests for business logic and integration tests for adapters and UI.
- **TypeScript only**: Use modern TypeScript features and strict typing.
- **Formatting and linting**: Use ESLint and Prettier as configured in the project.
- **Environment variables**: Use `.env` files for configuration, never hardcode secrets.

## Naming and Structure

- Use **camelCase** for variables and functions, **PascalCase** for classes and types.
- File and folder names in **kebab-case** or **lowercase**.
- Place each entity in its own folder under `domain`.
- Use `model.ts`, `repository.ts`, `value-objects.ts`, `errors.ts` for each domain entity.
- Use `usecases/` folder for use case files.

## Communication

- Even if the user communicates in Spanish, always generate code, comments, and documentation in English.
- If unsure about a requirement, prefer to ask for clarification before making assumptions.

## Example Structure

```
src/
  app/
    tabs/
      index.tsx
      tab1.tsx
      tab2.tsx
    _layout.tsx
    index.tsx
    +not-found.tsx
  domain/
    user/
      model.ts
      repository.ts
      value-objects.ts
      errors.ts
  application/
    usecases/
      get-user.ts
      save-user.ts
  infrastructure/
    repositories/
      user-repository.ts
  presentation/
    components/
      UserForm.tsx
    routes/
      user.tsx
    assets/
      ...
    lib/
      ...
  ...
```

## Tooling

- Use the scripts in `package.json` for build, dev, lint, and format.
- Use the configured ESLint and Prettier rules for code quality.
- Use the provided VSCode settings for consistent development experience.
- Use shadcn/ui components for UI consistency and accessibility.
- Use Expo Router for routing and navigation (`app/`).

## Additional Guidelines

### Documentation

- All new features, modules, or significant changes must be documented in the code and, if needed, in the project’s main README or relevant sub-README.
- Public APIs and use cases and business logic should be documented.

### Error Logging

- Use the configured logger or error boundary for all error and info logging.

### Testing

- All business logic must have unit tests.
- New code should not decrease overall test coverage.

### Internationalization (i18n)

- All user-facing messages (errors, UI texts) must use i18n keys defined in `src/presentation/lib/locales/`.
- Use `i18n-js` for all translations and message formatting.
- Never use hardcoded human-readable strings in the UI or logic. Always use i18n keys and translation functions.
- Add new keys to both `en.json` and `es.json` and ensure all flows are covered in both languages.

### UI Library

- Use gluestack-ui components for all new UI, following the patterns in `src/presentation/components/`.
- Compose and extend UI using gluestack guidelines.
- Ensure accessibility and consistent styling by leveraging gluestack's variant and slot patterns.

### State Management

- Use Zustand for global and feature state, with stores in `src/presentation/lib/stores/`.

### Error Handling in Tests

- Always test for domain errors using code-style identifiers (e.g., `user.validation_error.license_plate_empty`).
- Avoid relying on human-readable error messages in assertions; use code-style identifiers for consistency and i18n.
- Ensure all domain errors are tested in unit tests, and UI components handle them correctly.
- Every error must be present in the locales files (`en.json`, `es.json`) with a corresponding i18n key.

### Contract-Driven Development

- All new features must start with the contract or type definition.
- Update types and interfaces before implementation or test changes.
- UI and logic must strictly follow the contract and generated types.

---

# How to Work with User Stories in Baller Net

Whenever you receive a user story, follow this step-by-step process to ensure quality, traceability, and alignment with project standards:

1. **Read and Analyze the User Story**

   - Carefully review the user story and its acceptance criteria.
   - Identify all required fields, behaviors, and edge/corner cases.

2. **Locate Relevant Information**

   - Domain models: `src/domain/<entity>`
   - Use cases: `src/application/usecases/`
   - Domain errors: `src/domain/exceptions/`
   - Repositories: `src/domain/repositories/` and `src/infrastructure/repositories/`
   - UI components: `src/presentation/components/`
   - Routes: `app/`
   - Assets: `src/presentation/assets/`
   - Tests: `./tests`

3. **Contract First**

   - Update or confirm the contract (API types, etc.) before implementing new features.
   - Never implement or change a feature that depends on backend without confirming the contract.

4. **Domain & Application Layer**

   - Update or create domain models, value objects, and errors as needed.
   - Define or update use case files and implementations.
   - Ensure all business logic is in the domain or application layer, not in infrastructure or presentation.

5. **Infrastructure Layer**

   - Update or create repository adapters to support new or changed needs.
   - Ensure no business logic leaks into infrastructure.

6. **Presentation Layer**

   - Implement or update UI components and routes to match the contract and use cases.
   - Validate all input in the presentation or application layer before passing to domain logic.
   - Map domain errors to appropriate UI messages using code-style identifiers.

7. **Testing**

   - Write or update tests, mirroring the business structure.
   - Ensure all use cases, acceptance criteria, and corner cases are covered.
   - Use the AAA (Arrange, Act, Assert) pattern in all tests.
   - Run all tests to verify correctness and coverage.

8. **Manual Test Scenarios**

   - For each user story, create or update manual test scenarios in the UI to facilitate manual testing.
   - Ensure the new or updated flows accurately represent the new business scenarios or edge cases introduced by the user story.

9. **Documentation & Logging**

   - Document new features or changes in code and, if needed, in the README.
   - Use the configured logger or error boundary for all error/info logging.

10. **Internationalization**

- Use code-style identifiers for all user-facing messages, errors, and logs.

---

**Always follow these steps for every user story to ensure consistency, quality, and maintainability in the Baller Net project.**

---
