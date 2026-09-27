@regression
Feature: Checkout
  Scenario: Shopper reviews checkout details
    Given I am logged in as the standard user
    When I add the "backpack" product to the cart
    And I open the cart
    And I begin checkout
    And I enter valid checkout information
    And I continue to the order overview
    Then the order overview should contain the "backpack" product