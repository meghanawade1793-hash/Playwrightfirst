@regression
Feature: Add a product to the cart
  Scenario: Shopper adds a product from the inventory
    Given I am logged in as the standard user
    When I add the "backpack" product to the cart
    Then the cart badge should show 1 item