const fs = require("node:fs");
const path = require("node:path");
const { After, Before, Status, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const { config } = require("../config/environment");
const { LoginPage } = require("../pages/LoginPage");
const { ProductsPage } = require("../pages/ProductsPage");
const { CartPage } = require("../pages/CartPage");
const { CheckoutPage } = require("../pages/CheckoutPage");

setDefaultTimeout(config.timeout);

Before(async function ({ pickle }) {
  this.browser = await chromium.launch({ headless: config.headless });
  this.context = await this.browser.newContext({ recordVideo: { dir: "videos" } });
  await this.context.tracing.start({ screenshots: true, snapshots: true, sources: true });
  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(config.timeout);
  this.loginPage = new LoginPage(this.page, config.baseUrl);
  this.productsPage = new ProductsPage(this.page);
  this.cartPage = new CartPage(this.page);
  this.checkoutPage = new CheckoutPage(this.page);
  this.scenarioId = pickle.id;
});

After({ timeout: config.timeout * 3 }, async function ({ pickle, result }) {
  if (!this.context) {
    return;
  }

  const scenarioName = pickle.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  const artifactId = `${scenarioName}-${this.scenarioId}`;

  try {
    if (result?.status === Status.FAILED && this.page) {
      fs.mkdirSync("screenshots", { recursive: true });
      const screenshot = await this.page.screenshot({
        path: path.join("screenshots", `${artifactId}.png`),
        fullPage: true,
      });
      await this.attach(screenshot, "image/png");
    }

    fs.mkdirSync("traces", { recursive: true });
    await this.context.tracing.stop({ path: path.join("traces", `${artifactId}.zip`) });
  } finally {
    await this.context.close();
    await this.browser.close();
  }
});