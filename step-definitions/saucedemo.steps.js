const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("playwright/test");
const { config, getStandardUser } = require("../config/environment");
const { INVALID_USER } = require("../test-data/users");
const { getProduct } = require("../test-data/products");
const { CHECKOUT_DETAILS } = require("../test-data/checkout");

Given("I am on the SauceDemo login page", async function () {
  await this.loginPage.open();
});

Given("I am logged in as the standard user", async function () {
  const user = getStandardUser();
  await this.loginPage.open();
  await this.loginPage.login(user.username, user.password);
  await expect(this.productsPage.pageTitle).toHaveText("Products");
});

When("I log in as the standard user", async function () {
  const user = getStandardUser();
  await this.loginPage.login(user.username, user.password);
});

When("I log in with invalid credentials", async function () {
  await this.loginPage.login(INVALID_USER.username, INVALID_USER.password);
});

Then("I should see the products page", async function () {
  await expect(this.productsPage.pageTitle).toHaveText("Products");
  await expect(this.productsPage.productCards).toHaveCount(6);
});

Then("I should see an authentication error", async function () {
  await expect(this.loginPage.errorMessage).toContainText(
    "Username and password do not match any user in this service",
  );
});

When("I select the {string} product", async function (productKey) {
  this.selectedProduct = getProduct(productKey);
  await this.productsPage.selectProduct(this.selectedProduct);
});

Then("I should see the selected product details", async function () {
  await expect(this.page.locator(".inventory_details_name")).toHaveText(this.selectedProduct);
  await expect(this.page.locator('[data-test="add-to-cart"]')).toBeVisible();
});

When("I add the {string} product to the cart", async function (productKey) {
  this.selectedProduct = getProduct(productKey);
  await this.productsPage.addProductToCart(this.selectedProduct);
});

Then("the cart badge should show {int} item", async function (itemCount) {
  await expect(this.productsPage.cartBadge).toHaveText(String(itemCount));
});

When("I open the cart", async function () {
  await this.productsPage.openCart();
});

Then("the cart should contain the {string} product", async function (productKey) {
  const productName = getProduct(productKey);
  await expect(this.cartPage.cartItems.filter({ hasText: productName })).toHaveCount(1);
});

Then("the cart should show {int} item", async function (itemCount) {
  await expect(this.cartPage.cartItems).toHaveCount(itemCount);
});

When("I begin checkout", async function () {
  await this.cartPage.beginCheckout();
});

When("I enter valid checkout information", async function () {
  await this.checkoutPage.enterInformation(CHECKOUT_DETAILS);
});

When("I continue to the order overview", async function () {
  await this.checkoutPage.continueToOverview();
});

Then("the order overview should contain the {string} product", async function (productKey) {
  const productName = getProduct(productKey);
  await expect(this.checkoutPage.summaryItems.filter({ hasText: productName })).toHaveCount(1);
});

When("I place an order for the {string} product", async function (productKey) {
  this.selectedProduct = getProduct(productKey);
  await this.productsPage.addProductToCart(this.selectedProduct);
  await this.productsPage.openCart();
  await this.cartPage.beginCheckout();
  await this.checkoutPage.enterInformation(CHECKOUT_DETAILS);
  await this.checkoutPage.continueToOverview();
  await expect(this.checkoutPage.summaryItems.filter({ hasText: this.selectedProduct })).toHaveCount(1);
  await this.checkoutPage.placeOrder();
});

Then("I should see the order confirmation", async function () {
  await expect(this.checkoutPage.confirmationTitle).toHaveText("Thank you for your order!");
  await expect(this.page).toHaveURL(`${config.baseUrl}/checkout-complete.html`);
});