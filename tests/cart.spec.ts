import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/Loginpage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { users } from "../fixtures/users";

test.describe("Carrito", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test("agregar un producto al carrito", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addProduct("Sauce Labs Bolt T-Shirt");

    await expect(inventoryPage.cartBadge).toHaveText("1");
  });

  test("agregar dos productos, eliminar uno y validar el carrito", async ({
    page,
  }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addProduct("Sauce Labs Bolt T-Shirt");
    await inventoryPage.addProduct("Sauce Labs Bike Light");
    await expect(inventoryPage.cartBadge).toHaveText("2");

    await inventoryPage.goToCart();
    await cartPage.deleteitem("Sauce Labs Bike Light");

    const itemNames = await cartPage.getItem();
    expect(itemNames).toEqual(["Sauce Labs Bolt T-Shirt"]);
    expect(itemNames).not.toContain("Sauce Labs Bike Light");
  });
});
