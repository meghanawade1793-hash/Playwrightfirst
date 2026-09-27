class ProductsPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator(".title");
    this.productCards = page.locator(".inventory_item");
    this.cartBadge = page.locator(".shopping_cart_badge");
  }

  productCard(productName) {
    return this.productCards.filter({ hasText: productName });
  }

  async selectProduct(productName) {
    await this.page.getByText(productName, { exact: true }).click();
  }

  async addProductToCart(productName) {
    await this.productCard(productName).getByRole("button", { name: "Add to cart" }).click();
  }

  async openCart() {
    await this.page.locator(".shopping_cart_link").click();
  }
}

module.exports = { ProductsPage };