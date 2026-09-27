class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.summaryItems = page.locator(".cart_item");
    this.confirmationTitle = page.locator(".complete-header");
  }

  async enterInformation(details) {
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.postalCodeInput.fill(details.postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

  async placeOrder() {
    await this.finishButton.click();
  }
}

module.exports = { CheckoutPage };