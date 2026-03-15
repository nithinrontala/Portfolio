/**
 * Cypress E2E tests for Nithin Rontala's Portfolio
 *
 * Requires a local HTTP server running on http://localhost:3000
 *   npx serve "c:\Users\ronta\Documents\Portfolio" -l 3000
 *
 * Run:  npm test          (headless)
 *       npm run test:open (interactive UI)
 */

// ---------------------------------------------------------------------------
// INDEX PAGE
// ---------------------------------------------------------------------------

describe("Index Page — Meta & Title", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });

  it("has correct page title", () => {
    cy.title().should("include", "Portfolio");
  });

  it("has viewport meta tag", () => {
    cy.get('meta[name="viewport"]').should("exist");
  });
});

// ---------------------------------------------------------------------------

describe("Index Page — Navbar", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });

  it("shows logo with correct name", () => {
    cy.get(".nav-logo").should("contain.text", "NITHIN RONTALA");
  });

  it("has exactly 7 navigation links", () => {
    cy.get(".nav-links a").should("have.length", 7);
  });

  it("contains About nav link", () => {
    cy.get('.nav-links a[href="#about"]').should("contain.text", "About");
  });

  it("contains Education nav link", () => {
    cy.get('.nav-links a[href="#education"]').should("contain.text", "Education");
  });

  it("contains Projects nav link", () => {
    cy.get('.nav-links a[href="#projects"]').should("contain.text", "Projects");
  });

  it("contains Publications nav link", () => {
    cy.get('.nav-links a[href="#publications"]').should("contain.text", "Publications");
  });

  it("contains Patents nav link", () => {
    cy.get('.nav-links a[href="#patents"]').should("contain.text", "Patents");
  });

  it("contains Achievements nav link", () => {
    cy.get('.nav-links a[href="#achievements"]').should("contain.text", "Achievements");
  });

  it("contains Contact nav link", () => {
    cy.get('.nav-links a[href="#contact"]').should("contain.text", "Contact");
  });

  it("has hamburger menu toggle checkbox", () => {
    cy.get("#menu-toggle").should("exist");
  });

  it("has hamburger menu label icon", () => {
    cy.get('label[for="menu-toggle"]').should("exist");
  });

  it("clicking About link updates URL hash", () => {
    cy.get('.nav-links a[href="#about"]').click();
    cy.url().should("include", "#about");
  });

  it("clicking Projects link updates URL hash", () => {
    cy.get('.nav-links a[href="#projects"]').click();
    cy.url().should("include", "#projects");
  });

  it("clicking Education link updates URL hash", () => {
    cy.get('.nav-links a[href="#education"]').click();
    cy.url().should("include", "#education");
  });
});

// ---------------------------------------------------------------------------

describe("Index Page — Hero Section", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });

  it("displays hero heading", () => {
    cy.get(".hero-content h1").should("have.text", "Welcome to My Portfolio");
  });

  it("displays hero subtitle", () => {
    cy.get(".hero-content p")
      .should("be.visible")
      .and("not.be.empty");
  });

  it("has Explore Projects CTA button", () => {
    cy.get(".hero-content .cta-button")
      .should("contain.text", "Explore Projects")
      .and("have.attr", "href", "#projects");
  });

  it("CTA button scrolls to projects section", () => {
    cy.get(".hero-content .cta-button").click();
    cy.url().should("include", "#projects");
  });

  it("has overlay element for background styling", () => {
    cy.get(".hero .overlay").should("exist");
  });
});

// ---------------------------------------------------------------------------

describe("Index Page — About Section", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });

  it("has About Me heading", () => {
    cy.get("#about h2").should("contain.text", "About Me");
  });

  it("has profile image with correct alt text", () => {
    cy.get("#about .profile-image")
      .should("be.visible")
      .and("have.attr", "alt", "NITHIN RONTALA");
  });

  it("has non-empty description paragraph", () => {
    cy.get("#about p")
      .invoke("text")
      .should("have.length.greaterThan", 50);
  });

  it("description mentions machine learning", () => {
    cy.get("#about p")
      .invoke("text")
      .invoke("toLowerCase")
      .should("include", "machine learning");
  });

  it("description mentions computer vision", () => {
    cy.get("#about p")
      .invoke("text")
      .invoke("toLowerCase")
      .should("include", "computer vision");
  });
});

// ---------------------------------------------------------------------------

describe("Index Page — Education Section", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });

  it("has Education heading", () => {
    cy.get("#education .section-title").should("contain.text", "Education");
  });

  it("has exactly 4 education cards", () => {
    cy.get("#education .card").should("have.length", 4);
  });

  it("contains IIIT HYDERABAD", () => {
    cy.get("#education").should("contain.text", "IIIT HYDERABAD");
  });

  it("contains HYDERABAD INSTITUTE OF TECHNOLOGY AND MANAGEMENT", () => {
    cy.get("#education").should(
      "contain.text",
      "HYDERABAD INSTITUTE OF TECHNOLOGY AND MANAGEMENT"
    );
  });

  it("contains BHASHYAM JUNIOR COLLEGE", () => {
    cy.get("#education").should("contain.text", "BHASHYAM JUNIOR COLLEGE");
  });

  it("contains BHASHYAM HIGH SCHOOL", () => {
    cy.get("#education").should("contain.text", "BHASHYAM HIGH SCHOOL");
  });

  it("contains Master of Science in Data Science", () => {
    cy.get("#education").should("contain.text", "Master of Science in Data Science");
  });

  it("contains Bachelor of Science in Computer Science", () => {
    cy.get("#education").should(
      "contain.text",
      "Bachelor of Science in Computer Science"
    );
  });

  it("mentions Artificial Intelligence specialization", () => {
    cy.get("#education").should("contain.text", "Artificial Intelligence");
  });

  it("shows CGPA of 9.8 for high school", () => {
    cy.get("#education").should("contain.text", "9.8");
  });
});

// ---------------------------------------------------------------------------

describe("Index Page — Projects Section", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });

  it("has My Projects heading", () => {
    cy.get("#projects h2").should("contain.text", "My Projects");
  });

  it("has at least 4 project preview cards", () => {
    cy.get("#projects .project-card").should("have.length.at.least", 4);
  });

  it("shows Video Analytics project", () => {
    cy.get("#projects").should("contain.text", "Video Analytics");
  });

  it("shows Violence Detection project", () => {
    cy.get("#projects").should("contain.text", "Violence Detection");
  });

  it("shows Hand Gesture Recognition project", () => {
    cy.get("#projects").should("contain.text", "Hand Gesture Recognition");
  });

  it("shows Twitter URL-Based Classification project", () => {
    cy.get("#projects").should("contain.text", "Twitter URL-Based Classification");
  });

  it("shows Age And Gender Prediction project", () => {
    cy.get("#projects").should("contain.text", "Age And Gender");
  });

  it("View Projects button links to project.html", () => {
    cy.get("a.cta-button[href='project.html']")
      .should("contain.text", "View Projects");
  });

  it("View Projects button navigates to project page", () => {
    cy.get("a.cta-button[href='project.html']").click();
    cy.location("pathname").should("match", /\/project(\.html)?$/);
    cy.title().should("include", "Projects");
  });
});

// ---------------------------------------------------------------------------

describe("Index Page — Publications Section", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });

  it("has Publications heading", () => {
    cy.get("#publications .section-title").should("contain.text", "Publications");
  });

  it("has exactly 2 publication cards", () => {
    cy.get("#publications .card").should("have.length", 2);
  });

  it("contains the Twitter bot detection paper", () => {
    cy.get("#publications").should("contain.text", "Automated Bot Detection on Twitter");
  });

  it("contains the gesture recognition paper", () => {
    cy.get("#publications").should("contain.text", "Speaking Hands");
  });

  it("shows DOI reference", () => {
    cy.get("#publications").should("contain.text", "DOI");
  });

  it("shows author name Nithin Rontala", () => {
    cy.get("#publications").should("contain.text", "Nithin Rontala");
  });

  it("first publication View Publication link is visible", () => {
    cy.get("#publications .card")
      .first()
      .find("a.cta-button")
      .should("contain.text", "View Publication")
      .and("have.attr", "target", "_blank");
  });

  it("second publication View Publication link is visible", () => {
    cy.get("#publications .card")
      .last()
      .find("a.cta-button")
      .should("contain.text", "View Publication");
  });
});

// ---------------------------------------------------------------------------

describe("Index Page — Patents Section", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });

  it("has Patent heading", () => {
    cy.get("#patents h2").should("contain.text", "Patent");
  });

  it("shows patent number 202341029626", () => {
    cy.get("#patents").should("contain.text", "202341029626");
  });

  it("mentions AI/ML algorithm for Violence Detection", () => {
    cy.get("#patents").should("contain.text", "Violence Detection");
  });

  it("mentions CCTV monitoring in patent description", () => {
    cy.get("#patents").should("contain.text", "CCTV");
  });
});

// ---------------------------------------------------------------------------

describe("Index Page — Achievements Section", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });

  it("has Achievements heading", () => {
    cy.get("#achievements h2").should("contain.text", "Achievements");
  });

  it("lists GCSP Graduate achievement", () => {
    cy.get("#achievements").should("contain.text", "GCSP Graduate");
  });

  it("mentions National Academy of Engineering", () => {
    cy.get("#achievements").should("contain.text", "National Academy of Engineering");
  });
});

// ---------------------------------------------------------------------------

describe("Index Page — Footer / Contact", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });

  it("has Contact heading in footer", () => {
    cy.get("#contact p").should("contain.text", "Contact");
  });

  it("LinkedIn link is present and visible", () => {
    cy.get('a[href*="linkedin.com"]').should("be.visible");
  });

  it("LinkedIn link points to nithinrontala profile", () => {
    cy.get('a[href*="linkedin.com"]')
      .should("have.attr", "href")
      .and("include", "nithinrontala");
  });

  it("LinkedIn link opens in new tab", () => {
    cy.get('a[href*="linkedin.com"]').should("have.attr", "target", "_blank");
  });

  it("email link is present and visible", () => {
    cy.get('a[href*="mailto"]').should("be.visible");
  });

  it("email link points to nithinrontala email", () => {
    cy.get('a[href*="mailto"]')
      .should("have.attr", "href")
      .and("include", "nithinrontala");
  });

  it("GitHub link is present and visible", () => {
    cy.get('a[href*="github.com"]').should("be.visible");
  });

  it("GitHub link points to nithinrontala profile", () => {
    cy.get('a[href*="github.com"]')
      .should("have.attr", "href")
      .and("include", "nithinrontala");
  });

  it("GitHub link opens in new tab", () => {
    cy.get('a[href*="github.com"]').should("have.attr", "target", "_blank");
  });
});

// ===========================================================================
// PROJECT PAGE
// ===========================================================================

describe("Project Page — Meta & Layout", () => {
  beforeEach(() => {
    cy.visit("/project.html");
  });

  it("has correct page title", () => {
    cy.title().should("include", "Projects");
  });

  it("shows navbar with NITHIN RONTALA logo", () => {
    cy.get(".nav-logo").should("contain.text", "NITHIN RONTALA");
  });

  it("logo links back to index.html", () => {
    cy.get(".nav-logo")
      .should("have.attr", "href")
      .and("include", "index.html");
  });

  it("has My Projects heading", () => {
    cy.get("#projects h2").should("contain.text", "My Projects");
  });
});

// ---------------------------------------------------------------------------

describe("Project Page — Project Cards", () => {
  beforeEach(() => {
    cy.visit("/project.html");
  });

  it("has exactly 4 project cards", () => {
    cy.get(".project-card").should("have.length", 4);
  });

  it("has 4 project-details sections", () => {
    cy.get(".project-details").should("have.length", 4);
  });

  it("shows Video Analytics project", () => {
    cy.get("#projects").should("contain.text", "Video Analytics");
  });

  it("shows Violence Detection project", () => {
    cy.get("#projects").should("contain.text", "Violence Detection");
  });

  it("shows Hand Gesture Recognition project", () => {
    cy.get("#projects").should("contain.text", "Hand Gesture Recognition");
  });

  it("shows Twitter URL-Based Classification project", () => {
    cy.get("#projects").should("contain.text", "Twitter URL-Based Classification");
  });

  it("every card has a Role section", () => {
    cy.get(".project-details").each(($card) => {
      cy.wrap($card).should("contain.text", "Role");
    });
  });

  it("every card has a Problem section", () => {
    cy.get(".project-details").each(($card) => {
      cy.wrap($card).should("contain.text", "Problem");
    });
  });

  it("every card has an Approach section", () => {
    cy.get(".project-details").each(($card) => {
      cy.wrap($card).should("contain.text", "Approach");
    });
  });

  it("every card has a Technologies Used section", () => {
    cy.get(".project-details").each(($card) => {
      cy.wrap($card).should("contain.text", "Technologies Used");
    });
  });

  it("every card has a Results section", () => {
    cy.get(".project-details").each(($card) => {
      cy.wrap($card).should("contain.text", "Results");
    });
  });

  it("Video Analytics mentions OpenCV and Whisper", () => {
    cy.get("#projects").should("contain.text", "OpenCV").and("contain.text", "Whisper");
  });

  it("Violence Detection shows 92% accuracy", () => {
    cy.get("#projects").should("contain.text", "92%");
  });

  it("Hand Gesture Recognition shows 95% accuracy", () => {
    cy.get("#projects").should("contain.text", "95%");
  });

  it("Twitter Classification shows 88% accuracy", () => {
    cy.get("#projects").should("contain.text", "88%");
  });

  it("mentions I3D Algorithm for Violence Detection", () => {
    cy.get("#projects").should("contain.text", "I3D");
  });

  it("mentions CNNs for Hand Gesture Recognition", () => {
    cy.get("#projects").should("contain.text", "CNN");
  });

  it("mentions Python in all project stacks", () => {
    cy.get(".project-details").each(($card) => {
      cy.wrap($card).should("contain.text", "Python");
    });
  });
});

// ---------------------------------------------------------------------------

describe("Project Page — External Links", () => {
  beforeEach(() => {
    cy.visit("/project.html");
  });

  it("shows at least 2 project link icons", () => {
    cy.get(".project-link-icon").should("have.length.at.least", 2);
  });

  it("Drive links open in new tab", () => {
    cy.get('a[href*="drive.google.com"]').each(($link) => {
      cy.wrap($link).should("have.attr", "target", "_blank");
    });
  });

  it("Drive links are valid Google Drive URLs", () => {
    cy.get('a[href*="drive.google.com"]').each(($link) => {
      cy.wrap($link)
        .should("have.attr", "href")
        .and("include", "drive.google.com");
    });
  });

  it("project link icons have alt text", () => {
    cy.get(".project-link-icon").each(($img) => {
      cy.wrap($img).should("have.attr", "alt").and("not.be.empty");
    });
  });
});

// ---------------------------------------------------------------------------

describe("Project Page — Navigation", () => {
  it("Home button is visible", () => {
    cy.visit("/project.html");
    cy.get("a.home-button").should("be.visible").and("contain.text", "Home");
  });

  it("Home button href points to index.html", () => {
    cy.visit("/project.html");
    cy.get("a.home-button")
      .should("have.attr", "href")
      .and("include", "index.html");
  });

  it("clicking Home button navigates to index page", () => {
    cy.visit("/project.html");
    cy.get("a.home-button").click();
    cy.location("pathname").should("match", /\/(index\.html)?$/);
    cy.title().should("include", "Portfolio");
  });

  it("clicking logo navigates to index page", () => {
    cy.visit("/project.html");
    cy.get(".nav-logo").click();
    cy.location("pathname").should("match", /\/(index\.html)?$/);
  });
});

// ---------------------------------------------------------------------------

describe("Project Page — Footer", () => {
  beforeEach(() => {
    cy.visit("/project.html");
  });

  it("footer shows copyright with Nithin Rontala", () => {
    cy.get(".footer-section").should("contain.text", "Nithin Rontala");
  });

  it("footer shows year 2024", () => {
    cy.get(".footer-section").should("contain.text", "2024");
  });
});
