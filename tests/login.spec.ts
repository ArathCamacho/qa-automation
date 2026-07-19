import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/Loginpage";
import { users } from "../fixtures/users";

test.describe("Login", () => {
  test("login exitoso con credenciales válidas", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(/inventory.html/);
  });

  test("login fallido con credenciales incorrectas", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.invalid.username, users.invalid.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      "Usuario y contraseña incorrecta",
    );
  });
});
