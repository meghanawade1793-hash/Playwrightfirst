const PRODUCTS = {
  backpack: "Sauce Labs Backpack",
  bikeLight: "Sauce Labs Bike Light",
};

function getProduct(productKey) {
  const product = PRODUCTS[productKey];

  if (!product) {
    throw new Error(`Unknown product key: ${productKey}`);
  }

  return product;
}

module.exports = { PRODUCTS, getProduct };