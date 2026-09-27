@regression
Feature: Product selection
  Scenario: Shopper opens a product
    Given I am logged in as the standard user
    When I select the "backpack" product
    Then I should see the selected product details