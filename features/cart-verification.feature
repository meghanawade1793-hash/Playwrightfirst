@regression
Feature: Cart verification
  Scenario: Shopper verifies a cart item
    Given I am logged in as the standard user
    When I add the "backpack" product to the cart
    And I open the cart
    Then the cart should contain the "backpack" product
    And the cart should show 1 item