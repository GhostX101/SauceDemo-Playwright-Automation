# SauceDemo Playwright Automation

Playwright end to end test suite for the Sauce Demo web app. Url https://www.saucedemo.com/

It covers login (including negative cases), the product listing page, cart UI elements, and checkout error handling. Built with the Page Object Model so the tests themselves stay short and the locators live in one place.

## Tech stack

| Technology | Purpose |
|---|---|
| Playwright | Browser automation and assertions |
| JavaScript | Test code |
| Node.js | Runtime and package management |

## How it's structured

Each page of the app has its own Page Object in `Page/`, holding the locators and the methods for interacting with that page. Test files call those methods instead of touching selectors directly, so if a locator changes, it only needs updating in one place.

`Fixtures/test.js` extends Playwright's base `test` with a `userData` fixture, so every spec file gets test data passed straight into the callback (`async ({ page, userData }) => {...}`) instead of importing it manually. The actual credentials live in `Fixtures/userData.json` (`validUser`, `invalidUser`), kept separate from the test logic.

Specs that need a logged-in session log in inside a `test.beforeEach` hook, so the login steps aren't repeated in every test.


## Project structure

```
.
├── .github/                 GitHub Actions workflow, runs the suite on push/PR
├── Fixtures/
│   ├── test.js               custom test extended with the userData fixture
│   └── userData.json         validUser / invalidUser credentials
├── Page/                     page objects (locators + methods), one per page
├── playwright-report/        generated HTML report
├── test-results/             raw run output
├── tests/
│   ├── Cart.spec.js
│   ├── checkout.spec.js
│   ├── login.spec.js
│   └── product.spec.js
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```

[TODO: list what's in Page/ if you want each page object named individually]

## Test coverage

**Authentication** (`login.spec.js`)
- App URL matches the expected pattern on load
- Login with valid credentials
- Login with invalid username and invalid password
- Login with valid username and wrong password
- Login with wrong username and valid password
- Login with empty credentials

All four negative cases check the returned error message matches what Sauce Demo actually shows.

**Product listing** (`product.spec.js`)
- Product names are correct
- Products are visible on the page
- Prices are correct
- Product descriptions are correct
- Product images are visible
- Total product count and names match what's expected

**Cart** (`Cart.spec.js`)
- Checkout button is visible
- Filter control is visible
- Hamburger menu is visible

**Checkout** (`checkout.spec.js`)
- Error handling when trying to check out without filling in the required information
- Error handling when trying to check out with an empty cart


## Example test

Login setup, shared by the product and cart specs:

```javascript
test.beforeEach('Login', async ({ page, userData }) => {
  const login = new loginPage(page);
  await page.goto('/');
  await login.setUsername(userData.validUser.username);
  await login.setPassword(userData.validUser.password);
  await login.Clicklogin();
});
```


## Assertions used

| Assertion | Where it's used |
|---|---|
| `toBeVisible()` | Checkout button, filter, hamburger menu, product images |
| `toHaveText()` | Product names, prices, "Your Cart" heading |
| `toHaveURL()` | Confirming the app URL after navigation |
| `toContainText()` | Product descriptions |
| `toHaveCount()` | Total products listed |


## Running the tests

[TODO: confirm these are the actual commands you use, these are the Playwright defaults]

Run everything:
```bash
npx playwright test
```

UI mode:
```bash
npx playwright test --ui
```

Headed:
```bash
npx playwright test --headed
```

View the last report:
```bash
npx playwright show-report
```

## Reporting

Uses Playwright's built in HTML reporter, output goes to `playwright-report/`.

[TODO: confirm nothing else is configured in playwright.config.js]

## CI/CD Workflow

A GitHub Actions workflow runs the suite on every push and pull request to `main`/`master`. It installs dependencies with `npm ci`, installs the Playwright browsers, runs `npx playwright test`, and uploads the HTML report as a build artifact (kept for 30 days) even if the run fails.

## Testing approach

The login and checkout tests cover negative cases specifically: invalid credentials, empty fields, checking out without required info, and checking out with an empty cart. Each is checked against the actual error message the app returns, not just that an error appeared. The product and cart tests are mostly UI and state validation: checking that the right text, images, and elements show up.


## Author

Solomon Ikporo, QA Automation Engineer

GitHub: [GhostX101](https://github.com/GhostX101)