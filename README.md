# SauceDemo Automation

JavaScript browser automation for [SauceDemo](https://www.saucedemo.com/) using Playwright, Cucumber/Gherkin, Page Objects, and Allure.

## Prerequisites

- Node.js 24 LTS and npm
- Java 8 or newer for Allure report generation
- Git

Install dependencies and the Chromium browser:

```powershell
npm ci
npx playwright install chromium
```

Create a local `.env` from `.env.example` and set `SAUCEDEMO_USERNAME` and `SAUCEDEMO_PASSWORD`. The environment file is ignored by Git. The test suite intentionally does not store credentials in source control.

## Test commands

| Command | Purpose |
| --- | --- |
| `npm test` | Run the complete Cucumber suite |
| `npm run test:bdd` | Run the complete BDD suite |
| `npm run test:smoke` | Run scenarios tagged `@smoke` |
| `npm run test:regression` | Run scenarios tagged `@regression` |
| `npm run test:report` | Run all tests and generate the Allure HTML report |
| `npm run allure:generate` | Generate `allure-report/` from `allure-results/` |
| `npm run allure:open` | Open the generated Allure report locally |

Cucumber also writes `reports/cucumber-report.json`. Failure screenshots are saved under `screenshots/`; Playwright traces and videos are saved under `traces/` and `videos/`.

## Project layout

- `features/`: Gherkin scenarios for login, product selection, cart, checkout, and order completion
- `step-definitions/`: Cucumber steps
- `pages/`: Login, products, cart, and checkout Page Objects
- `support/`: Per-scenario browser lifecycle, tracing, and failure screenshots
- `test-data/`: Reusable user, product, and checkout data
- `config/`: Environment configuration
- `.github/workflows/ci.yml`: GitHub Actions test and report workflow

## GitHub Actions setup

The workflow runs the regression suite on pushes, pull requests, and manual dispatches. In the repository settings, add Actions repository secrets named `SAUCEDEMO_USERNAME` and `SAUCEDEMO_PASSWORD`. The workflow uploads Cucumber, Allure, screenshot, trace, and video artifacts even when tests fail.