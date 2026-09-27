class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator(".cart_item");
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async containsProduct(productName) {
    return this.cartItems.filter({ hasText: productName }).count();
  }

  async beginCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };