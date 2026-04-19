# Playwright Automation Project

End-to-end automation project built with **Playwright** and **TypeScript** covering two web applications:

| Application | URL | Description |
|---|---|---|
| **The Internet – Herokuapp** | https://the-internet.herokuapp.com | UI examples catalog (auth, drag & drop, iframes, shadow DOM, etc.) |
| **SauceDemo** | https://www.saucedemo.com | Demo store for practicing login, storage state, and multiple roles |

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
  - [Run all tests](#run-all-tests)
  - [Run by project](#run-by-project)
  - [Run by file](#run-by-file)
  - [Run by test name](#run-by-test-name)
  - [Filter by tags](#filter-by-tags)
  - [UI / Debug mode](#ui--debug-mode)
  - [Run from VS Code](#run-from-vs-code)
- [Available Tags](#available-tags)
- [Page Object Model](#page-object-model)
- [Custom Fixtures](#custom-fixtures)
- [Storage State & Authentication](#storage-state--authentication)
- [Reports](#reports)

---

## Prerequisites

- **Node.js** >= 18
- **npm** >= 9
- Playwright browsers installed (`npx playwright install`)

---

## Installation

```bash
# Clone the repository
git clone <repo-url>
cd playwright-internet-herokuapp

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

---

## Project Structure

```
├── playwright.config.ts              # Main config (multi-project)
├── package.json
├── tsconfig.json
├── .env                              # Environment variables (BASE_URL, credentials)
├── data/
│   └── uploadfile.txt                # Test file for upload
├── fixtures/
│   ├── my-fixtures.ts                # Fixture: temporary directory (tmpDir)
│   └── sauce-demo-fixtures.ts        # Fixtures: automatic login by role
├── pages/
│   ├── BasePage.ts                   # Base class (goto, waitForPageLoad)
│   ├── internet-herokuapp/
│   │   ├── index.ts                  # Barrel export of all Page Objects
│   │   ├── HomePage.ts
│   │   ├── BasicAuthPage.ts
│   │   ├── CheckBoxesPage.ts
│   │   ├── DragAndDropPage.ts
│   │   ├── FramesPage.ts
│   │   ├── ShadowDomPage.ts
│   │   └── ... (26 Page Objects)
│   └── sauce-demo/
│       └── LoginPage.ts
├── tests/
│   ├── internet-herokuapp/
│   │   ├── internetHerokuApp.spec.ts       # Main suite (~20 tests)
│   │   ├── basichAndDigestAuth.spec.ts     # Basic & Digest Auth
│   │   ├── challenginDom.spec.ts           # Challenging DOM
│   │   └── fileDownloadUpload.spec.ts      # File download/upload
│   └── sauce-demo/
│       ├── auth.setup.ts                   # Setup: generates storage state
│       ├── sacuedemo.spec.ts               # Direct login
│       ├── sacedemo-fixture.spec.ts        # Login via fixtures
│       ├── saucedemo-storagestate.spec.ts  # Login via storage state
│       ├── saucedemo-storagestate-multiplesignedin-roles.spec.ts
│       └── sacedemo.storagestate-multimpleroles-together.spec.ts
└── playwright-report/                # Generated HTML reports
```

---

## Configuration

### Environment Variables

The `.env` file at the project root contains:

```env
BASE_URL=https://the-internet.herokuapp.com/
username=admin
password=admin
```

These variables are automatically loaded via `dotenv` in `playwright.config.ts`.

### Configured Projects

The `playwright.config.ts` file defines **3 projects**:

| Project | `testDir` | Description |
|---|---|---|
| `setup` | `./tests` | Runs `*.setup.ts` files to generate storage state |
| `chromium-herokuapp` | `./tests/internet-herokuapp` | The Internet Herokuapp tests |
| `chromium-saucedemo` | `./tests/sauce-demo` | SauceDemo tests (depends on `setup`) |

---

## Running Tests

### Run all tests

```bash
# Run ALL tests across ALL projects
npx playwright test
```

### Run by project

Use `--project` to run only the tests for a specific project:

```bash
# Herokuapp tests only
npx playwright test --project=chromium-herokuapp

# SauceDemo tests only (runs setup automatically)
npx playwright test --project=chromium-saucedemo

# Setup only (generates storage state)
npx playwright test --project=setup

# Multiple projects at once
npx playwright test --project=chromium-herokuapp --project=chromium-saucedemo
```

### Run by file

Pass the file path (relative or absolute):

```bash
# A specific file
npx playwright test tests/internet-herokuapp/internetHerokuApp.spec.ts

# Multiple files
npx playwright test tests/internet-herokuapp/basichAndDigestAuth.spec.ts tests/internet-herokuapp/fileDownloadUpload.spec.ts

# All files in a directory
npx playwright test tests/internet-herokuapp/

# By name pattern
npx playwright test --grep "Challenging DOM"
```

### Run by test name

Use `--grep` with the test name (or part of it):

```bash
# Exact test by name
npx playwright test --grep "should display the correct header"

# Multiple tests matching a pattern
npx playwright test --grep "should navigate to"

# Exclude matching tests
npx playwright test --grep-invert "Slow Resources"
```

### Filter by Tags

Tests are tagged in their titles (e.g., `@heroku-app`, `@auth-tests`, `@sauce-demo`). Use `--grep` to filter:

```bash
# Only tests tagged with @heroku-app
npx playwright test --grep "@heroku-app"

# Only authentication tests
npx playwright test --grep "@auth-tests"

# Only SauceDemo tests
npx playwright test --grep "@sauce-demo"

# Tests with custom fixtures
npx playwright test --grep "@fixtures-test"

# Exclude a tag
npx playwright test --grep-invert "@auth-tests"

# Combine tags (OR) — tests with @heroku-app OR @sauce-demo
npx playwright test --grep "@heroku-app|@sauce-demo"

# Combine tags (AND) — tests with @auth-tests AND @heroku-app
npx playwright test --grep "(?=.*@auth-tests)(?=.*@heroku-app)"

# Combine project + tag
npx playwright test --project=chromium-herokuapp --grep "@auth-tests"
```

### UI / Debug Mode

```bash
# Interactive UI mode (visually explore tests)
npx playwright test --ui

# Debug mode (opens Playwright inspector)
npx playwright test --debug

# Debug a specific test
npx playwright test --grep "should drag and drop" --debug

# Headed mode (show browser)
npx playwright test --headed

# With full trace
npx playwright test --trace on
```

### Local Execution with UI Mode

UI Mode provides a built-in interactive interface to run, watch, and debug tests visually.
It includes a time-travel debugger, watch mode, and a DOM snapshot viewer.

```bash
# Launch UI Mode (opens a local browser window with the test explorer)
npx playwright test --ui

# Launch UI Mode for a specific project
npx playwright test --ui --project=chromium-herokuapp

# Launch UI Mode filtering by tag
npx playwright test --ui --grep "@auth-tests"
```

> **Tip:** In UI Mode you can click on any test to run it, see step-by-step execution,
> inspect DOM snapshots at each action, view console logs, network requests, and
> re-run tests on file save (watch mode).

### Local Execution with Trace Viewer

Trace Viewer captures a full recording of each test (screenshots, DOM snapshots, network
requests, console logs, and action timeline). Useful for debugging failures locally.

```bash
# Run tests with trace recording enabled for every test
npx playwright test --trace on

# Record trace only on the first retry of a failed test (default config behavior)
npx playwright test --trace on-first-retry

# Record trace only for failed tests (saves disk space)
npx playwright test --trace retain-on-failure

# Combine: headed + trace for a specific file
npx playwright test tests/internet-herokuapp/internetHerokuApp.spec.ts --headed --trace on

# Combine: specific project + tag + trace
npx playwright test --project=chromium-herokuapp --grep "@heroku-app" --trace on
```

After execution, open the trace file with:

```bash
# Open the last generated trace from test-results/
npx playwright show-trace test-results/<test-folder>/trace.zip

# Or open the HTML report which includes embedded trace links
npx playwright show-report
```

> **Tip:** The HTML report (`npx playwright show-report`) embeds a link to the Trace Viewer
> for each test. Click on any test in the report and then click the **Trace** tab to explore
> the full timeline, DOM snapshots, network activity, and console output interactively.

### Run from VS Code

1. Install the **Playwright Test for VSCode** extension (`ms-playwright.playwright`).
2. Open the **Testing** view (`View > Testing` or the flask icon in the sidebar).
3. Click the ▶️ button next to any test or describe block to run it.
4. Use the 🐛 button to run in debug mode.
5. If tests don't appear, run `Cmd+Shift+P` → `Testing: Refresh Tests`.

---

## Available Tags

| Tag | Description | Filter Example |
|---|---|---|
| `@heroku-app` | The Internet Herokuapp tests | `--grep "@heroku-app"` |
| `@auth-tests` | Basic Auth and Digest Auth tests | `--grep "@auth-tests"` |
| `@sauce-demo` | SauceDemo tests | `--grep "@sauce-demo"` |
| `@fixtures-test` | Tests using custom fixtures (tmpDir) | `--grep "@fixtures-test"` |

---

## Page Object Model

The project follows the **Page Object Model (POM)** pattern:

- **`BasePage`** — Base class with common methods: `goto()`, `waitForPageLoad()`.
- **`pages/internet-herokuapp/`** — 26 Page Objects, one per Herokuapp page.
- **`pages/sauce-demo/LoginPage.ts`** — Page Object for SauceDemo login.
- **`pages/internet-herokuapp/index.ts`** — Barrel export to import all Page Objects from a single entry point:

```typescript
import { HomePage, CheckBoxesPage, DragAndDropPage } from '../../pages/internet-herokuapp';
```

---

## Custom Fixtures

### `fixtures/my-fixtures.ts` — Temporary Directory

Provides a temporary `tmpDir` for file download tests:

```typescript
import { test } from '../../fixtures/my-fixtures';

test('download test @fixtures-test', async ({ tmpDir }) => {
  // tmpDir is a unique temporary directory per test
  const filePath = await downloadFile(tmpDir + '/file.pdf');
});
```

### `fixtures/sauce-demo-fixtures.ts` — Login by Role

Provides fixtures that perform automatic login with different users:

```typescript
import { test } from '../../fixtures/sauce-demo-fixtures';

test('test with standard user', async ({ loginPageStandardUser }) => {
  // Already logged in as standard_user
});

test('test with locked out user', async ({ locked_out_user }) => {
  // Attempts login with locked_out_user
});
```

Available roles: `loginPageStandardUser`, `locked_out_user`, `problem_user`, `performance_glitch_user`.

---

## Storage State & Authentication

The project demonstrates **3 authentication strategies**:

### 1. Direct login in the test
```bash
npx playwright test tests/sauce-demo/sacuedemo.spec.ts
```

### 2. Login via fixtures (automated by role)
```bash
npx playwright test tests/sauce-demo/sacedemo-fixture.spec.ts
```

### 3. Login via Storage State (reusable session)

The `auth.setup.ts` file generates storage state files in `.auth/`:
- `.auth/auth_standard.json` — standard_user session
- `.auth/auth_visual.json` — visual_user session

Tests that depend on storage state consume them as follows:

```bash
# Simple storage state
npx playwright test tests/sauce-demo/saucedemo-storagestate.spec.ts

# Multiple roles in a single test
npx playwright test tests/sauce-demo/sacedemo.storagestate-multimpleroles-together.spec.ts

# Multiple roles in separate tests
npx playwright test tests/sauce-demo/saucedemo-storagestate-multiplesignedin-roles.spec.ts
```

---

## Reports

```bash
# Generate and open the HTML report after running tests
npx playwright test
npx playwright show-report

# Generate reports in other formats
npx playwright test --reporter=list       # Console report (list)
npx playwright test --reporter=dot        # Compact report
npx playwright test --reporter=json       # JSON report
npx playwright test --reporter=junit      # JUnit XML report
```

The HTML report is automatically generated in `playwright-report/` and can be opened with:

```bash
npx playwright show-report
```

---

## Quick Reference Commands

```bash
# List all tests without running them
npx playwright test --list

# Run with retries
npx playwright test --retries=2

# Limit workers (parallel execution)
npx playwright test --workers=1

# Use the alternative SauceDemo config
npx playwright test --config=playwright.config-saucedemo.ts

# Run a specific test in a specific project with a tag
npx playwright test --project=chromium-herokuapp --grep "@auth-tests" --headed
```
