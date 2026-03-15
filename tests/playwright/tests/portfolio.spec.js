/**
 * Playwright E2E tests for Nithin Rontala's Portfolio
 *
 * Setup:
 *   npm install
 *   npx playwright install
 *
 * Run (all 3 browsers):
 *   npm test
 *
 * Override base URL for a local server:
 *   set BASE_URL=http://localhost:3000
 *   npm test
 */

// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");

// ---------------------------------------------------------------------------
// URL helpers
// ---------------------------------------------------------------------------

const portfolioDir = path.resolve(__dirname, "../../..");
const defaultBase = `file:///${portfolioDir.replace(/\\/g, "/")}`;
const BASE = (process.env.BASE_URL || defaultBase).replace(/\/$/, "");

const INDEX_URL = `${BASE}/index.html`;
const PROJECT_URL = `${BASE}/project.html`;
const INDEX_PATH_RE = /\/(index\.html)?\/?$/;
const PROJECT_PATH_RE = /\/project(\.html)?\/?$/;

// ---------------------------------------------------------------------------
// GROUP 1: Index page — Meta & Title
// ---------------------------------------------------------------------------

test.describe("Index Page — Meta & Title", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX_URL);
  });

  test("page title includes Portfolio", async ({ page }) => {
    await expect(page).toHaveTitle(/Portfolio/i);
  });

  test("viewport meta tag is present", async ({ page }) => {
    const meta = page.locator('meta[name="viewport"]');
    await expect(meta).toHaveCount(1);
  });
});

// ---------------------------------------------------------------------------
// GROUP 2: Index page — Navbar
// ---------------------------------------------------------------------------

test.describe("Index Page — Navbar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX_URL);
  });

  test("logo shows NITHIN RONTALA", async ({ page }) => {
    await expect(page.locator(".nav-logo")).toContainText("NITHIN RONTALA");
  });

  test("navbar has 7 links", async ({ page }) => {
    await expect(page.locator(".nav-links a")).toHaveCount(7);
  });

  for (const [text, href] of [
    ["About", "#about"],
    ["Education", "#education"],
    ["Projects", "#projects"],
    ["Publications", "#publications"],
    ["Patents", "#patents"],
    ["Achievements", "#achievements"],
    ["Contact", "#contact"],
  ]) {
    test(`nav link "${text}" is present`, async ({ page }) => {
      const link = page.locator(`.nav-links a[href="${href}"]`);
      await expect(link).toContainText(text);
    });
  }

  test("hamburger toggle checkbox is present", async ({ page }) => {
    await expect(page.locator("#menu-toggle")).toHaveCount(1);
  });

  test("clicking About updates URL hash", async ({ page }) => {
    await page.locator('.nav-links a[href="#about"]').click();
    await expect(page).toHaveURL(/#about/);
  });

  test("clicking Projects updates URL hash", async ({ page }) => {
    await page.locator('.nav-links a[href="#projects"]').click();
    await expect(page).toHaveURL(/#projects/);
  });
});

// ---------------------------------------------------------------------------
// GROUP 3: Index page — Hero Section
// ---------------------------------------------------------------------------

test.describe("Index Page — Hero Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX_URL);
  });

  test("displays correct hero heading", async ({ page }) => {
    await expect(page.locator(".hero-content h1")).toHaveText(
      "Welcome to My Portfolio"
    );
  });

  test("subtitle is visible and not empty", async ({ page }) => {
    const subtitle = page.locator(".hero-content p");
    await expect(subtitle).toBeVisible();
    const text = await subtitle.textContent();
    expect((text ?? "").trim().length).toBeGreaterThan(0);
  });

  test("CTA button says Explore Projects", async ({ page }) => {
    const btn = page.locator(".hero-content .cta-button");
    await expect(btn).toContainText("Explore Projects");
    await expect(btn).toHaveAttribute("href", "#projects");
  });

  test("CTA button click updates URL to #projects", async ({ page }) => {
    await page.locator(".hero-content .cta-button").click();
    await expect(page).toHaveURL(/#projects/);
  });

  test("overlay element is present", async ({ page }) => {
    await expect(page.locator(".hero .overlay")).toHaveCount(1);
  });
});

// ---------------------------------------------------------------------------
// GROUP 4: Index page — About Section
// ---------------------------------------------------------------------------

test.describe("Index Page — About Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX_URL);
  });

  test("has About Me heading", async ({ page }) => {
    await expect(page.locator("#about h2")).toContainText("About Me");
  });

  test("profile image has correct alt text", async ({ page }) => {
    await expect(page.locator("#about .profile-image")).toHaveAttribute(
      "alt",
      "NITHIN RONTALA"
    );
  });

  test("description paragraph is at least 50 characters", async ({ page }) => {
    const text = await page.locator("#about p").first().textContent();
    expect((text ?? "").length).toBeGreaterThan(50);
  });

  test("description mentions machine learning", async ({ page }) => {
    const text = (await page.locator("#about p").textContent()) ?? "";
    expect(text.toLowerCase()).toContain("machine learning");
  });
});

// ---------------------------------------------------------------------------
// GROUP 5: Index page — Education Section
// ---------------------------------------------------------------------------

test.describe("Index Page — Education Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX_URL);
  });

  test("has Education heading", async ({ page }) => {
    await expect(page.locator("#education .section-title")).toContainText(
      "Education"
    );
  });

  test("has exactly 4 education cards", async ({ page }) => {
    await expect(page.locator("#education .card")).toHaveCount(4);
  });

  for (const institution of [
    "IIIT HYDERABAD",
    "HYDERABAD INSTITUTE OF TECHNOLOGY AND MANAGEMENT",
    "BHASHYAM JUNIOR COLLEGE",
    "BHASHYAM HIGH SCHOOL",
  ]) {
    test(`shows institution: ${institution}`, async ({ page }) => {
      await expect(page.locator("#education")).toContainText(institution);
    });
  }

  test("shows Master of Science in Data Science", async ({ page }) => {
    await expect(page.locator("#education")).toContainText(
      "Master of Science in Data Science"
    );
  });

  test("shows Bachelor of Science in Computer Science", async ({ page }) => {
    await expect(page.locator("#education")).toContainText(
      "Bachelor of Science in Computer Science"
    );
  });

  test("shows high school CGPA 9.8", async ({ page }) => {
    await expect(page.locator("#education")).toContainText("9.8");
  });
});

// ---------------------------------------------------------------------------
// GROUP 6: Index page — Projects Section
// ---------------------------------------------------------------------------

test.describe("Index Page — Projects Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX_URL);
  });

  test("has My Projects heading", async ({ page }) => {
    await expect(page.locator("#projects h2")).toContainText("My Projects");
  });

  test("has at least 4 project cards", async ({ page }) => {
    const cards = page.locator("#projects .project-card");
    expect(await cards.count()).toBeGreaterThanOrEqual(4);
  });

  for (const project of [
    "Video Analytics",
    "Violence Detection",
    "Hand Gesture Recognition",
    "Twitter URL-Based Classification",
  ]) {
    test(`shows ${project} card`, async ({ page }) => {
      await expect(page.locator("#projects")).toContainText(project);
    });
  }

  test("View Projects button links to project.html", async ({ page }) => {
    const btn = page.locator("a.cta-button[href='project.html']");
    await expect(btn).toContainText("View Projects");
  });

  test("View Projects button navigates to project page", async ({ page }) => {
    await page.locator("a.cta-button[href='project.html']").first().click({ force: true });
    await expect(page).toHaveURL(PROJECT_PATH_RE);
    await expect(page).toHaveTitle(/Projects/i);
  });
});

// ---------------------------------------------------------------------------
// GROUP 7: Index page — Publications Section
// ---------------------------------------------------------------------------

test.describe("Index Page — Publications Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX_URL);
  });

  test("has Publications heading", async ({ page }) => {
    await expect(
      page.locator("#publications .section-title")
    ).toContainText("Publications");
  });

  test("has exactly 2 publication cards", async ({ page }) => {
    await expect(page.locator("#publications .card")).toHaveCount(2);
  });

  test("shows Twitter bot detection paper", async ({ page }) => {
    await expect(page.locator("#publications")).toContainText(
      "Automated Bot Detection on Twitter"
    );
  });

  test("shows Speaking Hands gesture paper", async ({ page }) => {
    await expect(page.locator("#publications")).toContainText("Speaking Hands");
  });

  test("shows DOI reference", async ({ page }) => {
    await expect(page.locator("#publications")).toContainText("DOI");
  });

  test("shows author Nithin Rontala", async ({ page }) => {
    await expect(page.locator("#publications")).toContainText("Nithin Rontala");
  });

  test("View Publication buttons open in new tab", async ({ page }) => {
    const links = page.locator(
      "#publications a.cta-button:has-text('View Publication')"
    );
    const count = await links.count();
    expect(count).toBe(2);
    for (let i = 0; i < count; i++) {
      await expect(links.nth(i)).toHaveAttribute("target", "_blank");
    }
  });
});

// ---------------------------------------------------------------------------
// GROUP 8: Index page — Patents Section
// ---------------------------------------------------------------------------

test.describe("Index Page — Patents Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX_URL);
  });

  test("has Patent heading", async ({ page }) => {
    await expect(page.locator("#patents h2")).toContainText("Patent");
  });

  test("shows patent number 202341029626", async ({ page }) => {
    await expect(page.locator("#patents")).toContainText("202341029626");
  });

  test("mentions violence detection in patent title", async ({ page }) => {
    await expect(page.locator("#patents")).toContainText("Violence Detection");
  });

  test("mentions CCTV monitoring", async ({ page }) => {
    await expect(page.locator("#patents")).toContainText("CCTV");
  });
});

// ---------------------------------------------------------------------------
// GROUP 9: Index page — Achievements Section
// ---------------------------------------------------------------------------

test.describe("Index Page — Achievements Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX_URL);
  });

  test("has Achievements heading", async ({ page }) => {
    await expect(page.locator("#achievements h2")).toContainText("Achievements");
  });

  test("shows GCSP Graduate achievement", async ({ page }) => {
    await expect(page.locator("#achievements")).toContainText("GCSP Graduate");
  });

  test("mentions National Academy of Engineering", async ({ page }) => {
    await expect(page.locator("#achievements")).toContainText(
      "National Academy of Engineering"
    );
  });
});

// ---------------------------------------------------------------------------
// GROUP 10: Index page — Footer / Contact
// ---------------------------------------------------------------------------

test.describe("Index Page — Footer & Contact", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX_URL);
  });

  test("footer contact heading is visible", async ({ page }) => {
    await expect(page.locator("#contact p")).toContainText("Contact");
  });

  test("LinkedIn link is visible", async ({ page }) => {
    await expect(page.locator('a[href*="linkedin.com"]')).toBeVisible();
  });

  test("LinkedIn href includes nithinrontala", async ({ page }) => {
    const href =
      (await page
        .locator('a[href*="linkedin.com"]')
        .getAttribute("href")) ?? "";
    expect(href).toContain("nithinrontala");
  });

  test("LinkedIn opens in new tab", async ({ page }) => {
    await expect(
      page.locator('a[href*="linkedin.com"]')
    ).toHaveAttribute("target", "_blank");
  });

  test("email link is present", async ({ page }) => {
    await expect(page.locator('a[href*="mailto"]')).toBeVisible();
  });

  test("email href includes nithinrontala", async ({ page }) => {
    const href =
      (await page.locator('a[href*="mailto"]').getAttribute("href")) ?? "";
    expect(href.toLowerCase()).toContain("nithinrontala");
  });

  test("GitHub link is visible", async ({ page }) => {
    await expect(page.locator('a[href*="github.com"]')).toBeVisible();
  });

  test("GitHub href includes nithinrontala", async ({ page }) => {
    const href =
      (await page
        .locator('a[href*="github.com"]')
        .getAttribute("href")) ?? "";
    expect(href).toContain("nithinrontala");
  });

  test("GitHub opens in new tab", async ({ page }) => {
    await expect(
      page.locator('a[href*="github.com"]')
    ).toHaveAttribute("target", "_blank");
  });
});

// ===========================================================================
// PROJECT PAGE
// ===========================================================================

test.describe("Project Page — Meta & Layout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PROJECT_URL);
  });

  test("page title includes Projects", async ({ page }) => {
    await expect(page).toHaveTitle(/Projects/i);
  });

  test("navbar shows NITHIN RONTALA", async ({ page }) => {
    await expect(page.locator(".nav-logo")).toContainText("NITHIN RONTALA");
  });

  test("logo links back to index.html", async ({ page }) => {
    const href = (await page.locator(".nav-logo").getAttribute("href")) ?? "";
    expect(href).toContain("index.html");
  });

  test("has My Projects heading", async ({ page }) => {
    await expect(page.locator("#projects h2")).toContainText("My Projects");
  });
});

// ---------------------------------------------------------------------------

test.describe("Project Page — Project Cards", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PROJECT_URL);
  });

  test("has exactly 4 project cards", async ({ page }) => {
    await expect(page.locator(".project-card")).toHaveCount(4);
  });

  test("has 4 project-details sections", async ({ page }) => {
    await expect(page.locator(".project-details")).toHaveCount(4);
  });

  for (const project of [
    "Video Analytics",
    "Violence Detection",
    "Hand Gesture Recognition",
    "Twitter URL-Based Classification",
  ]) {
    test(`shows ${project}`, async ({ page }) => {
      await expect(page.locator("#projects")).toContainText(project);
    });
  }

  for (const section of ["Role", "Problem", "Approach", "Technologies Used", "Results"]) {
    test(`every card contains "${section}" section`, async ({ page }) => {
      const cards = page.locator(".project-details");
      const count = await cards.count();
      for (let i = 0; i < count; i++) {
        await expect(cards.nth(i)).toContainText(section);
      }
    });
  }

  test("Video Analytics mentions OpenCV", async ({ page }) => {
    await expect(page.locator("#projects")).toContainText("OpenCV");
  });

  test("Video Analytics mentions Whisper", async ({ page }) => {
    await expect(page.locator("#projects")).toContainText("Whisper");
  });

  test("Violence Detection shows 92% accuracy", async ({ page }) => {
    await expect(page.locator("#projects")).toContainText("92%");
  });

  test("Hand Gesture Recognition shows 95% accuracy", async ({ page }) => {
    await expect(page.locator("#projects")).toContainText("95%");
  });

  test("Twitter Classification shows 88% accuracy", async ({ page }) => {
    await expect(page.locator("#projects")).toContainText("88%");
  });

  test("I3D Algorithm is mentioned", async ({ page }) => {
    await expect(page.locator("#projects")).toContainText("I3D");
  });

  test("CNNs are mentioned", async ({ page }) => {
    await expect(page.locator("#projects")).toContainText("CNN");
  });

  test("all project-details mention Python", async ({ page }) => {
    const cards = page.locator(".project-details");
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i)).toContainText("Python");
    }
  });

  test("project images have alt attributes", async ({ page }) => {
    const images = page.locator(".project-card img");
    const count = await images.count();
    expect(count).toBeGreaterThanOrEqual(4);
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute("alt");
      expect((alt ?? "").trim().length).toBeGreaterThan(0);
    }
  });
});

// ---------------------------------------------------------------------------

test.describe("Project Page — External Links", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PROJECT_URL);
  });

  test("has at least 2 project link icons", async ({ page }) => {
    const icons = page.locator(".project-link-icon");
    expect(await icons.count()).toBeGreaterThanOrEqual(2);
  });

  test("Drive links open in new tab", async ({ page }) => {
    const links = page.locator('a[href*="drive.google.com"]');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(2);
    for (let i = 0; i < count; i++) {
      await expect(links.nth(i)).toHaveAttribute("target", "_blank");
    }
  });

  test("Drive links are valid Google Drive URLs", async ({ page }) => {
    const links = page.locator('a[href*="drive.google.com"]');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const href = (await links.nth(i).getAttribute("href")) ?? "";
      expect(href).toContain("drive.google.com");
    }
  });

  test("project link icon images have non-empty alt text", async ({ page }) => {
    const icons = page.locator(".project-link-icon");
    const count = await icons.count();
    for (let i = 0; i < count; i++) {
      const alt = await icons.nth(i).getAttribute("alt");
      expect((alt ?? "").trim().length).toBeGreaterThan(0);
    }
  });
});

// ---------------------------------------------------------------------------

test.describe("Project Page — Navigation", () => {
  test("Home button is visible with correct text", async ({ page }) => {
    await page.goto(PROJECT_URL);
    const btn = page.locator("a.home-button");
    await expect(btn).toBeVisible();
    await expect(btn).toContainText("Home");
  });

  test("Home button href points to index.html", async ({ page }) => {
    await page.goto(PROJECT_URL);
    const href = (await page.locator("a.home-button").getAttribute("href")) ?? "";
    expect(href).toContain("index.html");
  });

  test("clicking Home button navigates to index page", async ({ page }) => {
    await page.goto(PROJECT_URL);
    await page.locator("a.home-button").click();
    await expect(page).toHaveURL(INDEX_PATH_RE);
    await expect(page).toHaveTitle(/Portfolio/i);
  });

  test("clicking nav logo navigates to index page", async ({ page }) => {
    await page.goto(PROJECT_URL);
    await page.locator(".nav-logo").click();
    await expect(page).toHaveURL(INDEX_PATH_RE);
  });

  test("View Projects on index navigates to project page", async ({ page }) => {
    await page.goto(INDEX_URL);
    await page.locator("a.cta-button[href='project.html']").first().click({ force: true });
    await expect(page).toHaveURL(PROJECT_PATH_RE);
  });
});

// ---------------------------------------------------------------------------

test.describe("Project Page — Footer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PROJECT_URL);
  });

  test("footer contains Nithin Rontala", async ({ page }) => {
    await expect(page.locator(".footer-section")).toContainText("Nithin Rontala");
  });

  test("footer contains year 2024", async ({ page }) => {
    await expect(page.locator(".footer-section")).toContainText("2024");
  });
});
