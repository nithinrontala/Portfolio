# Portfolio Automated Tests

End-to-end automation test suites for the Nithin Rontala portfolio website using **Selenium**, **Cypress**, and **Playwright**.

---

## Prerequisites — Start a Local Server

Cypress (and optionally Playwright/Selenium) requires an HTTP server. Start one before running tests:

```bash
# Option 1 – Node.js serve (recommended)
npx serve "c:\Users\ronta\Documents\Portfolio" -l 3000

# Option 2 – Python
cd "c:\Users\ronta\Documents\Portfolio"
python -m http.server 3000

# Option 3 – VS Code Live Server (port 5500)
# Just click "Go Live" in VS Code, then set BASE_URL=http://127.0.0.1:5500 in env
```

> **Selenium & Playwright** default to `file://` paths so they work without a server.  
> **Cypress** requires the server. Set `PORTFOLIO_BASE_URL` env var to override the default.

---

## 1. Selenium (Python)

### Setup

```bash
cd tests/selenium
pip install -r requirements.txt
```

### Run

```bash
# Headless (default)
pytest test_portfolio.py -v

# Against a running server
set BASE_URL=http://localhost:3000
pytest test_portfolio.py -v

# With HTML report
pytest test_portfolio.py -v --html=report.html
```

### Coverage
- Page titles & meta
- Navbar logo and all 7 navigation links
- Hero section heading, subtitle, CTA button
- About section text and profile image
- Education section — 4 cards (MS, BS, Intermediate, Schooling)
- Projects section — 5 cards + "View Projects" button
- Publications section — 2 cards + external links
- Patents section — patent number verification
- Achievements section
- Footer social links (LinkedIn, Email, GitHub)
- Navigation between index.html ↔ project.html
- project.html — 4 detailed project cards with Role/Problem/Approach/Tech/Results
- Home button navigation

---

## 2. Cypress (JavaScript)

### Setup

```bash
cd tests/cypress
npm install
```

### Run

```bash
# Requires server running on http://localhost:3000
npm test              # headless
npm run test:open     # interactive Cypress UI
```

### Set a different base URL

```bash
set CYPRESS_BASE_URL=http://127.0.0.1:5500
npm test
```

### Coverage
- All index.html sections verified
- Navigation link clicks and section visibility
- project.html page content and project detail sections
- External project links (Drive links)
- Footer links and contact section
- Responsive menu toggle checkbox

---

## 3. Playwright (JavaScript)

### Setup

```bash
cd tests/playwright
npm install
npx playwright install
```

### Run

```bash
# All browsers (Chromium, Firefox, WebKit)  — uses file:// by default
npm test

# Against a running server
set BASE_URL=http://localhost:3000
npm test

# Headed mode
npm run test:headed

# View HTML report
npm run test:report

# Specific browser only
npx playwright test --project=chromium
```

### Coverage
- All Selenium tests replicated in Playwright API
- Multi-browser testing (Chromium, Firefox, WebKit)
- Screenshots on failure
- Accessibility checks (aria labels on images)
- External link `target="_blank"` and `href` verification
- Footer copyright text

---

## Test Coverage Summary

| Section                  | Selenium | Cypress | Playwright |
|--------------------------|:--------:|:-------:|:----------:|
| Page title               | ✅       | ✅      | ✅         |
| Navbar logo & links      | ✅       | ✅      | ✅         |
| Hero section             | ✅       | ✅      | ✅         |
| About section            | ✅       | ✅      | ✅         |
| Education cards (4)      | ✅       | ✅      | ✅         |
| Projects section (5)     | ✅       | ✅      | ✅         |
| View Projects button     | ✅       | ✅      | ✅         |
| Publications (2)         | ✅       | ✅      | ✅         |
| Patents                  | ✅       | ✅      | ✅         |
| Achievements             | ✅       | ✅      | ✅         |
| Footer social links      | ✅       | ✅      | ✅         |
| project.html — 4 cards   | ✅       | ✅      | ✅         |
| Project external links   | ✅       | ✅      | ✅         |
| Home button navigation   | ✅       | ✅      | ✅         |
| Multi-browser            | ❌       | ✅*     | ✅         |

*Cypress runs on Chrome/Edge/Firefox via config.
