module.exports = {
  default: {
    paths: ["features/**/*.feature"],
    require: ["support/**/*.js", "step-definitions/**/*.js"],
    format: [
      "progress",
      "json:reports/cucumber-report.json",
      "allure-cucumberjs/reporter",
    ],
    formatOptions: {
      resultsDir: "allure-results",
    },
    publishQuiet: true,
    parallel: 1,
  },
};