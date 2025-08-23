# 🏀 Baller Net

Baller Net is a basketball social network designed to connect fans, foster engagement, and celebrate the love of basketball. Built with a modern, modular architecture and a focus on accessibility, maintainability, and scalability.

## 📚 Table of Contents

- [🏀 Baller Net](#-baller-net)
  - [📚 Table of Contents](#-table-of-contents)
  - [🎯 Project Vision](#-project-vision)
  - [🏗️ Architecture](#️-architecture)
  - [🗂️ Directory Structure](#️-directory-structure)
  - [🛠️ Tech Stack](#️-tech-stack)
  - [🚀 Development](#-development)
    - [📦 Install dependencies](#-install-dependencies)
    - [▶️ Run the app](#️-run-the-app)
    - [🧹 Lint \& format](#-lint--format)
    - [📜 Project scripts](#-project-scripts)
  - [🌐 Internationalization (i18n)](#-internationalization-i18n)
  - [🧪 Testing](#-testing)
  - [🤝 Contributing](#-contributing)
  - [🪪 License](#-license)

## 🎯 Project Vision

Baller Net aims to provide a platform where basketball fans can connect, share, and engage with their favorite sport. The UI is crafted with Gluestack UI for a beautiful, consistent, and accessible experience. All features are tailored to enhance user engagement and interaction.

## 🏗️ Architecture

The project follows **Domain-Driven Design (DDD)** and a **modular, layered architecture**:

- **🧠 domain**: Core business logic, domain models, value objects, and errors. No infrastructure or UI logic.
- **⚙️ application**: Application-specific use cases and orchestration. No UI or infrastructure logic.
- **🔌 infrastructure**: Adapters for external systems (APIs, storage, etc). No business logic.
- **🎨 presentation**: UI components, assets, and user interaction logic. No business logic.
- **📱 app**: Application entry point and routing (Expo Router).

## 🗂️ Directory Structure

```
app/
  _layout.tsx
  index.tsx
  tabs/
    (tabs)/
      tab1.tsx
      tab2.tsx
src/
  domain/
    <entity>/
      model.ts
      repository.ts
      value-objects.ts
      errors.ts
  application/
    usecases/
      <use-case>.ts
  infrastructure/
    repositories/
      <entity>-repository.ts
  presentation/
    components/
      <Component>.tsx
    assets/
      fonts/
      icons/
      images/
    lib/
      locales/
        en.json
        es.json
      stores/
```

## 🛠️ Tech Stack

- **🟦 TypeScript** (strict mode)
- **📱 Expo** (React Native)
- **🧩 Gluestack UI** (UI components)
- **🐻 Zustand** (state management)
- **🌐 i18n-js** (internationalization)
- **🧹 ESLint** & **🎨 Prettier** (linting & formatting)
- **🧪 Jest** (testing)

## 🚀 Development

### 📦 Install dependencies

```bash
npm install
```

### ▶️ Run the app

```bash
npm run dev
```

### 🧹 Lint & format

```bash
npm run lint
npm run format
```

### 📜 Project scripts

- `dev`: 🚀 Start the development server
- `lint`: 🧹 Run ESLint
- `format`: 🎨 Run Prettier

## 🌐 Internationalization (i18n)

- All user-facing messages use i18n keys defined in `src/presentation/lib/locales/en.json` and `es.json`.
- Use `i18n-js` for translations and message formatting.
- Never use hardcoded human-readable strings in UI or logic.

## 🧪 Testing

- All business logic must have unit tests.
- Use Jest for running tests.
- Test files mirror the business structure.
- Use code-style identifiers for error assertions (not human-readable messages).

## 🤝 Contributing

1. Follow the architecture and naming conventions described above.
2. All code, comments, and documentation must be in English.
3. Write or update tests for all new features and bug fixes.
4. Use i18n keys for all user-facing text.
5. Run lint and format before submitting a PR.

## 🪪 License

[MIT](LICENSE)
