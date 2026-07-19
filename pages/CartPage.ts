import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator(".cart_item");
    this.checkoutButton = page.locator("#checkout");
  }

  async deleteitem(productName: string) {
    const item = this.page.locator(".cart_item", { hasText: productName });
    await item.getByRole("button", { name: "Remove" }).click();
  }

  async getItem(): Promise<string[]> {
    return this.cartItems.locator(".inventory_item_name").allTextContents();
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }
}
