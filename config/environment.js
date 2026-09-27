const dotenv = require("dotenv");

dotenv.config();

const config = {
  baseUrl: process.env.SAUCEDEMO_BASE_URL || "https://www.saucedemo.com",
  headless: process.env.HEADLESS !== "false",
  timeout: Number(process.env.PLAYWRIGHT_TIMEOUT || 15000),
};

function getStandardUser() {
  const { SAUCEDEMO_USERNAME: username, SAUCEDEMO_PASSWORD: password } = process.env;

  if (!username || !password) {
    throw new Error("Set SAUCEDEMO_USERNAME and SAUCEDEMO_PASSWORD in .env or the environment.");
  }

  return { username, password };
}

module.exports = { config, getStandardUser };