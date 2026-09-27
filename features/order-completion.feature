@regression
Feature: Order completion
  @smoke
  Scenario: Shopper completes an order
    Given I am logged in as the standard user
    When I place an order for the "backpack" product
    Then I should see the order confirmation