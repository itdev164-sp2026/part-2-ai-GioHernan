import { expect, test, type Page } from "@playwright/test";

const testUserEmail = process.env.TEST_USER_EMAIL;
const testUserPassword = process.env.TEST_USER_PASSWORD;
const hasTestCredentials = Boolean(testUserEmail && testUserPassword);
const credentialSkipMessage =
  "Set TEST_USER_EMAIL and TEST_USER_PASSWORD to run the authenticated Playwright tests.";

function getLoginSubmitButton(page: Page) {
  return page.getByRole("button", { name: "Sign In" }).last();
}

async function signIn(page: Page) {
  await page.goto("/login");
  await expect(page).toHaveURL(/\/login\/?$/);

  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
  await expect(getLoginSubmitButton(page)).toBeVisible();

  await page.getByLabel("Email").fill(testUserEmail!);
  await page.getByLabel("Password").fill(testUserPassword!);

  await Promise.all([
    page.waitForURL(/\/projects\/?$/),
    getLoginSubmitButton(page).click(),
  ]);
}

test("LOGIN PAGE VISIBLE: the login page shows the email field, password field, and submit button", async ({
  page,
}) => {
  await page.goto("/login");

  await expect(page).toHaveURL(/\/login\/?$/);
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
  await expect(getLoginSubmitButton(page)).toBeVisible();
});

test.describe("Authenticated app flows", () => {
  test.beforeAll(() => {
    test.skip(!hasTestCredentials, credentialSkipMessage);
  });

  test("REDIRECT AFTER LOGIN: signing in with valid credentials lands on the dashboard or projects page", async ({
    page,
  }) => {
    await signIn(page);

    const pathname = new URL(page.url()).pathname;
    expect(pathname).toBe("/projects");
  });

  test("SIDEBAR NAVIGATION: the authenticated sidebar exposes Overview, Projects, and Settings links", async ({
    page,
  }) => {
    await signIn(page);
    await expect(page).toHaveURL(/\/projects\/?$/);

    await expect(page.getByRole("link", { name: "Overview" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Projects" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Settings" })).toBeVisible();
  });
});