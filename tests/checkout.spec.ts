import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/Loginpage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { users, checkout } from "../fixtures/users";

test.describe("Checkout", () => {
  test("completar una compra exitosamente", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    await inventoryPage.addProduct("Sauce Labs Backpack");
    await inventoryPage.goToCart();

    await cartPage.goToCheckout();
    await checkoutPage.fillInfo(
      checkout.firstName,
      checkout.lastName,
      checkout.postalCode,
    );
    await checkoutPage.finishOrder();

    await expect(checkoutPage.completeHeader).toHaveText("Compra terminada");
  });
});
