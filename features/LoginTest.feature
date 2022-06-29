
Feature: Login Test Scenario

    @Regression
    Scenario: Test 1
        Given user navigates to portal
        And user verifies username field
        And user verifies password field
        And user verifies login button
        When user provides valid credentials, and clicks on Login
        Then user navigates to portal

    @Regression
    Scenario: Test 2
        Given user navigates to portal
        And user verifies three values in the listgroup
        When user verifies second list item's value is set to "List Item 2"
        Then user verifies the second list item's badge value is "6"

    @Regression
    Scenario: Test 3
        Given user navigates to portal
        Then user verifies  "Option 1" is the default selected value
        And user selects "Option 3" from the select list

    @Regression
    Scenario: Test 4
        Given user navigates to portal
        And user verifies first button is enabled
        And user verifies the second button is disabled

    @Regression
    Scenario: Test 5
        Given user navigates to portal
        When user clicks on a button
        Then user verifies success message is displayed
        And  user verified button is now disabled

    @Regression
    Scenario: Test 6
        Given user navigates to portal
        And   verify element in row "2" column "2" is "Ventosanzap"