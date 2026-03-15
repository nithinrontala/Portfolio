"""
Selenium automated tests for Nithin Rontala's Portfolio.

Run:
    pip install -r requirements.txt
    pytest test_portfolio.py -v

Against a local server (recommended):
    set BASE_URL=http://localhost:3000
    pytest test_portfolio.py -v
"""

import os
import pathlib
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

_PORTFOLIO_DIR = pathlib.Path(__file__).parent.parent.parent.resolve()
_DEFAULT_BASE_URL = _PORTFOLIO_DIR.as_uri()  # file:///C:/Users/…/Portfolio

BASE_URL = os.environ.get("BASE_URL", _DEFAULT_BASE_URL).rstrip("/")

INDEX_URL = f"{BASE_URL}/index.html"
PROJECT_URL = f"{BASE_URL}/project.html"

# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------

@pytest.fixture(scope="session")
def driver():
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1280,900")
    service = Service(ChromeDriverManager().install())
    d = webdriver.Chrome(service=service, options=options)
    d.implicitly_wait(5)
    yield d
    d.quit()


@pytest.fixture(scope="class")
def index_page(driver):
    driver.get(INDEX_URL)
    return driver


@pytest.fixture(scope="class")
def project_page(driver):
    driver.get(PROJECT_URL)
    return driver


# ---------------------------------------------------------------------------
# Helper
# ---------------------------------------------------------------------------

def wait_visible(driver, css, timeout=5):
    return WebDriverWait(driver, timeout).until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, css))
    )


# ===========================================================================
# INDEX PAGE TESTS
# ===========================================================================

class TestIndexPageMeta:
    """Page-level meta checks."""

    def test_page_title(self, index_page):
        assert "Portfolio" in index_page.title

    def test_charset_viewport_present(self, index_page):
        meta_viewport = index_page.find_element(
            By.CSS_SELECTOR, 'meta[name="viewport"]'
        )
        assert meta_viewport is not None


class TestNavbar:
    """Navigation bar checks."""

    NAV_LINKS = ["About", "Education", "Projects",
                 "Publications", "Patents", "Achievements", "Contact"]

    def test_navbar_logo_text(self, index_page):
        logo = index_page.find_element(By.CSS_SELECTOR, ".nav-logo")
        assert "NITHIN RONTALA" in logo.text

    def test_navbar_logo_href(self, index_page):
        logo = index_page.find_element(By.CSS_SELECTOR, ".nav-logo")
        assert logo.get_attribute("href") is not None

    def test_navbar_links_count(self, index_page):
        links = index_page.find_elements(By.CSS_SELECTOR, ".nav-links a")
        assert len(links) == 7

    @pytest.mark.parametrize("link_text", NAV_LINKS)
    def test_navbar_link_present(self, index_page, link_text):
        links = index_page.find_elements(By.CSS_SELECTOR, ".nav-links a")
        texts = [lnk.text for lnk in links]
        assert link_text in texts, f"Nav link '{link_text}' not found in {texts}"

    def test_menu_toggle_checkbox_exists(self, index_page):
        toggle = index_page.find_element(By.ID, "menu-toggle")
        assert toggle is not None


class TestHeroSection:
    """Hero / landing section checks."""

    def test_hero_heading_text(self, index_page):
        h1 = index_page.find_element(By.CSS_SELECTOR, ".hero-content h1")
        assert h1.text == "Welcome to My Portfolio"

    def test_hero_subtitle_visible(self, index_page):
        subtitle = index_page.find_element(By.CSS_SELECTOR, ".hero-content p")
        assert subtitle.is_displayed()
        assert len(subtitle.text) > 0

    def test_hero_cta_button_text(self, index_page):
        btn = index_page.find_element(By.CSS_SELECTOR, ".hero-content .cta-button")
        assert "Explore Projects" in btn.text

    def test_hero_cta_button_href(self, index_page):
        btn = index_page.find_element(By.CSS_SELECTOR, ".hero-content .cta-button")
        assert btn.get_attribute("href", ).endswith("#projects")

    def test_hero_overlay_present(self, index_page):
        overlay = index_page.find_element(By.CSS_SELECTOR, ".hero .overlay")
        assert overlay is not None


class TestAboutSection:
    """About Me section checks."""

    def test_about_heading(self, index_page):
        h2 = index_page.find_element(By.CSS_SELECTOR, "#about h2")
        assert "About Me".lower() in h2.text.lower()

    def test_about_profile_image_alt(self, index_page):
        img = index_page.find_element(By.CSS_SELECTOR, "#about .profile-image")
        assert img.get_attribute("alt") == "NITHIN RONTALA"

    def test_about_description_not_empty(self, index_page):
        p = index_page.find_element(By.CSS_SELECTOR, "#about p")
        assert len(p.text) > 50

    def test_about_mentions_machine_learning(self, index_page):
        p = index_page.find_element(By.CSS_SELECTOR, "#about p")
        assert "machine learning" in p.text.lower()


class TestEducationSection:
    """Education section with 4 cards."""

    def test_education_heading(self, index_page):
        h2 = index_page.find_element(By.CSS_SELECTOR, "#education .section-title")
        assert "Education" in h2.text

    def test_education_four_cards(self, index_page):
        cards = index_page.find_elements(By.CSS_SELECTOR, "#education .card")
        assert len(cards) == 4

    def test_education_iiit_hyderabad(self, index_page):
        body_text = index_page.find_element(By.CSS_SELECTOR, "#education").text
        assert "IIIT HYDERABAD" in body_text

    def test_education_hitam(self, index_page):
        body_text = index_page.find_element(By.CSS_SELECTOR, "#education").text
        assert "HYDERABAD INSTITUTE OF TECHNOLOGY AND MANAGEMENT" in body_text

    def test_education_bhashyam_college(self, index_page):
        body_text = index_page.find_element(By.CSS_SELECTOR, "#education").text
        assert "BHASHYAM JUNIOR COLLEGE" in body_text

    def test_education_bhashyam_school(self, index_page):
        body_text = index_page.find_element(By.CSS_SELECTOR, "#education").text
        assert "BHASHYAM HIGH SCHOOL" in body_text

    def test_education_ms_title(self, index_page):
        body_text = index_page.find_element(By.CSS_SELECTOR, "#education").text
        assert "Master of Science in Data Science" in body_text

    def test_education_bs_title(self, index_page):
        body_text = index_page.find_element(By.CSS_SELECTOR, "#education").text
        assert "Bachelor of Science in Computer Science" in body_text

    def test_education_high_school_cgpa(self, index_page):
        body_text = index_page.find_element(By.CSS_SELECTOR, "#education").text
        assert "9.8" in body_text


class TestProjectsSection:
    """Projects preview section on index page."""

    def test_projects_heading(self, index_page):
        h2 = index_page.find_element(By.CSS_SELECTOR, "#projects h2")
        assert "My Projects" in h2.text

    def test_at_least_four_project_cards(self, index_page):
        cards = index_page.find_elements(By.CSS_SELECTOR, "#projects .project-card")
        assert len(cards) >= 4

    def test_video_analytics_card_present(self, index_page):
        assert "Video Analytics" in index_page.find_element(
            By.CSS_SELECTOR, "#projects"
        ).text

    def test_violence_detection_card_present(self, index_page):
        assert "Violence Detection" in index_page.find_element(
            By.CSS_SELECTOR, "#projects"
        ).text

    def test_hand_gesture_card_present(self, index_page):
        assert "Hand Gesture Recognition" in index_page.find_element(
            By.CSS_SELECTOR, "#projects"
        ).text

    def test_twitter_card_present(self, index_page):
        assert "Twitter" in index_page.find_element(
            By.CSS_SELECTOR, "#projects"
        ).text

    def test_view_projects_button_text(self, index_page):
        btn = index_page.find_element(
            By.XPATH,
            "//a[contains(@class,'cta-button') and contains(@href,'project.html')]"
        )
        assert "View Projects" in btn.text

    def test_view_projects_button_href(self, index_page):
        btn = index_page.find_element(
            By.XPATH,
            "//a[contains(@class,'cta-button') and contains(@href,'project.html')]"
        )
        assert "project.html" in btn.get_attribute("href")


class TestPublicationsSection:
    """Publications section checks."""

    def test_publications_heading(self, index_page):
        h2 = index_page.find_element(By.CSS_SELECTOR, "#publications .section-title")
        assert "Publications" in h2.text

    def test_two_publication_cards(self, index_page):
        cards = index_page.find_elements(By.CSS_SELECTOR, "#publications .card")
        assert len(cards) == 2

    def test_twitter_bot_paper_title(self, index_page):
        assert "Automated Bot Detection" in index_page.find_element(
            By.CSS_SELECTOR, "#publications"
        ).text

    def test_gesture_recognition_paper_title(self, index_page):
        assert "Speaking Hands" in index_page.find_element(
            By.CSS_SELECTOR, "#publications"
        ).text

    def test_view_publication_links_present(self, index_page):
        links = index_page.find_elements(
            By.XPATH,
            "//section[@id='publications']//a[contains(text(),'View Publication')]"
        )
        assert len(links) == 2

    def test_doi_reference_present(self, index_page):
        assert "DOI" in index_page.find_element(
            By.CSS_SELECTOR, "#publications"
        ).text

    def test_author_name_in_publications(self, index_page):
        assert "Nithin Rontala" in index_page.find_element(
            By.CSS_SELECTOR, "#publications"
        ).text


class TestPatentsSection:
    """Patents section checks."""

    def test_patents_heading(self, index_page):
        h2 = index_page.find_element(By.CSS_SELECTOR, "#patents h2")
        assert "Patent" in h2.text

    def test_patent_number(self, index_page):
        assert "202341029626" in index_page.find_element(
            By.CSS_SELECTOR, "#patents"
        ).text

    def test_violence_detection_patent_title(self, index_page):
        assert "Violence Detection" in index_page.find_element(
            By.CSS_SELECTOR, "#patents"
        ).text


class TestAchievementsSection:
    """Achievements section checks."""

    def test_achievements_heading(self, index_page):
        h2 = index_page.find_element(By.CSS_SELECTOR, "#achievements h2")
        assert "Achievements".lower() in h2.text.lower()

    def test_gcsp_achievement_present(self, index_page):
        assert "GCSP" in index_page.find_element(
            By.CSS_SELECTOR, "#achievements"
        ).text

    def test_national_academy_mentioned(self, index_page):
        assert "National Academy of Engineering" in index_page.find_element(
            By.CSS_SELECTOR, "#achievements"
        ).text


class TestFooterSection:
    """Footer / Contact section checks."""

    def test_contact_heading(self, index_page):
        contact = index_page.find_element(By.CSS_SELECTOR, "#contact p")
        assert "Contact" in contact.text

    def test_linkedin_link_present(self, index_page):
        link = index_page.find_element(
            By.CSS_SELECTOR, "a[href*='linkedin.com']"
        )
        assert link.is_displayed()

    def test_linkedin_href(self, index_page):
        link = index_page.find_element(
            By.CSS_SELECTOR, "a[href*='linkedin.com']"
        )
        assert "nithinrontala" in link.get_attribute("href")

    def test_email_link_present(self, index_page):
        link = index_page.find_element(By.CSS_SELECTOR, "a[href*='mailto']")
        assert link.is_displayed()

    def test_email_address(self, index_page):
        link = index_page.find_element(By.CSS_SELECTOR, "a[href*='mailto']")
        assert "nithinrontala" in link.get_attribute("href")

    def test_github_link_present(self, index_page):
        link = index_page.find_element(
            By.CSS_SELECTOR, "a[href*='github.com']"
        )
        assert link.is_displayed()

    def test_github_href(self, index_page):
        link = index_page.find_element(
            By.CSS_SELECTOR, "a[href*='github.com']"
        )
        assert "nithinrontala" in link.get_attribute("href")

    def test_social_links_open_new_tab(self, index_page):
        social_links = index_page.find_elements(
            By.CSS_SELECTOR,
            "a[href*='linkedin.com'], a[href*='github.com']"
        )
        for link in social_links:
            assert link.get_attribute("target") == "_blank", (
                f"Link {link.get_attribute('href')} should open in new tab"
            )


class TestNavbarNavigation:
    """Verify navbar links scroll to correct sections."""

    @pytest.mark.parametrize("href,section_id", [
        ("#about", "about"),
        ("#education", "education"),
        ("#projects", "projects"),
        ("#publications", "publications"),
        ("#patents", "patents"),
        ("#achievements", "achievements"),
    ])
    def test_nav_link_targets_section(self, driver, href, section_id):
        driver.get(INDEX_URL)
        link = driver.find_element(
            By.CSS_SELECTOR, f".nav-links a[href='{href}']"
        )
        assert link.get_attribute("href").endswith(href)
        section = driver.find_element(By.ID, section_id)
        assert section is not None


# ===========================================================================
# PROJECT PAGE TESTS
# ===========================================================================

class TestProjectPageMeta:
    """project.html meta checks."""

    def test_project_page_title(self, project_page):
        assert "Projects" in project_page.title

    def test_navbar_logo_present(self, project_page):
        logo = project_page.find_element(By.CSS_SELECTOR, ".nav-logo")
        assert "NITHIN RONTALA" in logo.text

    def test_navbar_logo_links_to_index(self, project_page):
        logo = project_page.find_element(By.CSS_SELECTOR, ".nav-logo")
        href = logo.get_attribute("href")
        assert "index.html" in href

    def test_projects_heading(self, project_page):
        h2 = project_page.find_element(By.CSS_SELECTOR, "#projects h2")
        assert "My Projects" in h2.text


class TestProjectCards:
    """Detailed project card checks on project.html."""

    EXPECTED_PROJECTS = [
        "Video Analytics",
        "Violence Detection",
        "Hand Gesture Recognition",
        "Twitter URL-Based Classification",
    ]

    def test_four_project_cards_present(self, project_page):
        cards = project_page.find_elements(By.CSS_SELECTOR, ".project-card")
        assert len(cards) == 4

    @pytest.mark.parametrize("project_name", EXPECTED_PROJECTS)
    def test_project_heading_present(self, project_page, project_name):
        page_text = project_page.find_element(By.CSS_SELECTOR, "#projects").text
        assert project_name in page_text, (
            f"Project '{project_name}' not found on project page"
        )

    def test_each_card_has_project_details(self, project_page):
        details = project_page.find_elements(By.CSS_SELECTOR, ".project-details")
        assert len(details) == 4

    def test_each_card_has_role_section(self, project_page):
        page_text = project_page.find_element(By.CSS_SELECTOR, "#projects").text
        assert page_text.count("Role") >= 4

    def test_each_card_has_problem_section(self, project_page):
        page_text = project_page.find_element(By.CSS_SELECTOR, "#projects").text
        assert page_text.count("Problem") >= 4

    def test_each_card_has_approach_section(self, project_page):
        page_text = project_page.find_element(By.CSS_SELECTOR, "#projects").text
        assert page_text.count("Approach") >= 4

    def test_each_card_has_technologies_section(self, project_page):
        page_text = project_page.find_element(By.CSS_SELECTOR, "#projects").text
        assert page_text.count("Technologies Used") >= 4

    def test_each_card_has_results_section(self, project_page):
        page_text = project_page.find_element(By.CSS_SELECTOR, "#projects").text
        assert page_text.count("Results") >= 4

    def test_video_analytics_technologies(self, project_page):
        page_text = project_page.find_element(By.CSS_SELECTOR, "#projects").text
        assert "OpenCV" in page_text
        assert "Whisper" in page_text

    def test_violence_detection_accuracy(self, project_page):
        page_text = project_page.find_element(By.CSS_SELECTOR, "#projects").text
        assert "92%" in page_text

    def test_hand_gesture_accuracy(self, project_page):
        page_text = project_page.find_element(By.CSS_SELECTOR, "#projects").text
        assert "95%" in page_text

    def test_twitter_accuracy(self, project_page):
        page_text = project_page.find_element(By.CSS_SELECTOR, "#projects").text
        assert "88%" in page_text

    def test_i3d_algorithm_mentioned(self, project_page):
        page_text = project_page.find_element(By.CSS_SELECTOR, "#projects").text
        assert "I3D" in page_text

    def test_project_images_present(self, project_page):
        images = project_page.find_elements(By.CSS_SELECTOR, ".project-card img")
        assert len(images) >= 4


class TestProjectExternalLinks:
    """External Drive links on project cards."""

    def test_drive_link_icons_present(self, project_page):
        icons = project_page.find_elements(By.CSS_SELECTOR, ".project-link-icon")
        assert len(icons) >= 2

    def test_drive_links_open_new_tab(self, project_page):
        links = project_page.find_elements(
            By.CSS_SELECTOR,
            "a[href*='drive.google.com']"
        )
        assert len(links) >= 2
        for link in links:
            assert link.get_attribute("target") == "_blank"

    def test_drive_links_point_to_google_drive(self, project_page):
        links = project_page.find_elements(
            By.CSS_SELECTOR,
            "a[href*='drive.google.com']"
        )
        for link in links:
            assert "drive.google.com" in link.get_attribute("href")


class TestProjectPageNavigation:
    """Navigation between project.html and index.html."""

    def test_home_button_present(self, project_page):
        btn = project_page.find_element(By.CSS_SELECTOR, "a.home-button")
        assert btn.is_displayed()

    def test_home_button_text(self, project_page):
        btn = project_page.find_element(By.CSS_SELECTOR, "a.home-button")
        assert "Home" in btn.text

    def test_home_button_href(self, project_page):
        btn = project_page.find_element(By.CSS_SELECTOR, "a.home-button")
        assert "index.html" in btn.get_attribute("href")

    def test_home_button_navigates_to_index(self, driver):
        driver.get(PROJECT_URL)
        btn = driver.find_element(By.CSS_SELECTOR, "a.home-button")
        btn.click()
        WebDriverWait(driver, 5).until(EC.title_contains("Portfolio"))
        assert "Portfolio" in driver.title

    def test_view_projects_then_back(self, driver):
        driver.get(INDEX_URL)
        btn = driver.find_element(
            By.XPATH,
            "//a[contains(@class,'cta-button') and contains(@href,'project.html')]"
        )
        btn.click()
        WebDriverWait(driver, 5).until(EC.title_contains("Projects"))
        assert "Projects" in driver.title


class TestProjectPageFooter:
    """Footer on project.html."""

    def test_footer_copyright_text(self, project_page):
        footer = project_page.find_element(By.CSS_SELECTOR, ".footer-section")
        assert "Nithin Rontala" in footer.text

    def test_footer_year(self, project_page):
        footer = project_page.find_element(By.CSS_SELECTOR, ".footer-section")
        assert "2024" in footer.text
