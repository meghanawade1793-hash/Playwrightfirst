@regression
Feature: SauceDemo login
  As a shopper
  I want to authenticate
  So I can browse products

  @smoke
  Scenario: Standard user logs in successfully
    Given I am on the SauceDemo login page
    When I log in as the standard user
    Then I should see the products page

  Scenario: Invalid credentials are rejected
    Given I am on the SauceDemo login page
    When I log in with invalid credentials
    Then I should see an authentication error