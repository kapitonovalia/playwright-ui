import {expect, test} from "@playwright/test";
import {faker} from "@faker-js/faker/locale/en";
import {u} from "@faker-js/faker/dist/airline-BXaRegOM";
test.describe("TL form", async () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(process.env.APP_URL);
    })
    test("Negative cases for Login page", async ({ page }) => {

    //locators
   const usernameField = page.locator("#username");
   const passwordField = page.locator("#password");
   const signInButton = page.locator(`[data-name="signIn-button"]`);
   const usernameFieldError = page.locator(".form-error.form-error_active");
   const errorMessage2 = page.locator('.form-error[data-name="username-input-error"]:has-text("2")');
   const errorMessage8 = page.locator('.form-error[data-name="username-input-error"]:has-text("8")');
   const popUpClose = page.locator(`[data-name="authorizationError-popup-close-button"]`);
   //actions
        await expect(usernameField).toBeVisible();
        await expect(passwordField).toBeVisible();
        await expect(signInButton).toBeVisible();
        await expect(signInButton).toBeEnabled();
        await usernameField.fill(faker.string.alphanumeric(1));
        await page.waitForTimeout(5100);
        await expect(usernameFieldError).toBeVisible();
        await passwordField.fill(faker.string.alphanumeric(4));
        await page.waitForTimeout(5100);
        await expect(errorMessage2).toContainText('The field must contain at least of characters: 2');
        await expect(errorMessage8).toContainText('The field must contain at least of characters: 8');
        await usernameField.fill(faker.string.alphanumeric(8));
        await passwordField.fill(faker.string.alphanumeric(8));
        await signInButton.click();
        await page.waitForTimeout(5100)
        await expect(popUpClose).toBeVisible();
        await popUpClose.click();
    });
})