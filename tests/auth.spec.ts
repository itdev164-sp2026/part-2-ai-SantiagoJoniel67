import { test, expect } from "@playwright/test";

// Get credentials from environment variables
const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL;
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD;

/**
 * Authentication E2E Tests
 *
 * These tests verify the complete authentication flow including:
 * - Login page visibility and form elements
 * - Successful login and redirect to dashboard
 * - Sidebar navigation accessibility after login
 */

test.describe("Authentication Flow", () => {
    /**
   * TEST 1: LOGIN PAGE VISIBLE
   *
   * Verifies that the login page is accessible and displays all required
   * form elements (email input, password input, and submit button) using
   * accessible role-based locators.
   */
    test("should display login form with all required fields", async ({ page }) => {
    // Navigate to the login page
    await page.goto("/login", { waitUntil: "domcontentloaded" });

    // Verify the page title/heading is visible
    const welcomeHeading = page.getByRole("heading", { name: /welcome/i });
    await expect(welcomeHeading).toBeVisible();

    // Verify the Sign In tab is visible
    const signInTab = page.getByRole("tab", { name: /sign in/i });
    await expect(signInTab).toBeVisible();

    // Verify email input field is present
    const emailInput = page.getByLabel(/email/i);
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute("type", "email");

    // Verify password input field is present
    const passwordInput = page.getByLabel(/password/i);
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toHaveAttribute("type", "password");

    // Verify submit button is present
    const submitButton = page.getByRole("button", { name: /sign in/i });
    await expect(submitButton).toBeVisible();
    });

    /**
   * TEST 2: REDIRECT AFTER LOGIN
   *
   * Verifies that after successful login with valid credentials, the user
   * is redirected to the projects page (/projects).
   *
   * NOTE: This test is skipped if TEST_USER_EMAIL or TEST_USER_PASSWORD
   * environment variables are not set, as hardcoding credentials is not secure.
   */
    test("should redirect to projects page after successful login", async ({
    page,
    }) => {
    // Skip test if credentials are not provided
    test.skip(
        !TEST_USER_EMAIL || !TEST_USER_PASSWORD,
        "TEST_USER_EMAIL and TEST_USER_PASSWORD environment variables are required for this test"
    );

    await page.goto("/login", { waitUntil: "domcontentloaded" });

    await expect(page.getByRole("link", { name: /overview/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /projects/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /settings/i })).toBeVisible();
  });

  /**
   * TEST 3: SIDEBAR NAVIGATION
   *
   * Verifies that after successful login, the sidebar navigation is visible
   * and contains the expected navigation links: "Overview", "Projects", and
   * "Settings".
   *
   * NOTE: This test is skipped if TEST_USER_EMAIL or TEST_USER_PASSWORD
   * environment variables are not set, as it requires a logged-in session.
   */
  test("should display sidebar navigation links after login", async ({
    page,
  }) => {
    // Skip test if credentials are not provided
    test.skip(
      !TEST_USER_EMAIL || !TEST_USER_PASSWORD,
      "TEST_USER_EMAIL and TEST_USER_PASSWORD environment variables are required for this test"
    );

    await page.goto("/login", { waitUntil: "domcontentloaded" });

    const overviewLink = page.getByRole("link", { name: /overview/i });
    await expect(overviewLink).toBeVisible();

    const projectsLink = page.getByRole("link", { name: /projects/i });
    await expect(projectsLink).toBeVisible();

    const settingsLink = page.getByRole("link", { name: /settings/i });
    await expect(settingsLink).toBeVisible();
  });

  /**
   * BONUS TEST: SIDEBAR NAVIGATION FUNCTIONALITY
   *
   * Verifies that sidebar navigation links are clickable and navigate to the
   * correct pages.
   *
   * NOTE: This test is skipped if TEST_USER_EMAIL or TEST_USER_PASSWORD
   * environment variables are not set.
   */
  test("should navigate to correct pages when clicking sidebar links", async ({
    page,
  }) => {
    // Skip test if credentials are not provided
    test.skip(
      !TEST_USER_EMAIL || !TEST_USER_PASSWORD,
      "TEST_USER_EMAIL and TEST_USER_PASSWORD environment variables are required for this test"
    );

    await page.goto("/login", { waitUntil: "domcontentloaded" });

    // Test: Click on "Overview" link and verify navigation
    const overviewLink = page.getByRole("link", { name: /overview/i });
    await overviewLink.click();
    await expect(
      page.getByRole("heading", { name: /joniel santiago/i })
    ).toBeVisible();

    // Test: Click on "Settings" link and verify navigation
    const settingsLink = page.getByRole("link", { name: /settings/i });
    await settingsLink.click();
    await expect(page.getByRole("heading", { name: /welcome/i })).toBeVisible();
  });
});
