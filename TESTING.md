# Digital Time Capsule — Testing Plan

## 1. Testing Overview

**Application:** Digital Time Capsule  
**Testing Type:** Manual Functional Testing, UI Testing, Validation Testing and Responsive Testing  
**Environment:** Google Chrome (Desktop and Mobile Viewport)

## 2. Functional Test Cases

| ID    | Test Scenario                      | Expected Result                       | Status |
| ----- | ---------------------------------- | ------------------------------------- | ------ |
| TC-01 | Open website without saved capsule | Creation form appears                 | Passed |
| TC-02 | Submit an empty message            | Validation error appears              | Passed |
| TC-03 | Submit a spaces-only message       | Validation error appears              | Passed |
| TC-04 | Submit without an unlock date      | Validation error appears              | Passed |
| TC-05 | Select a past unlock date          | Submission is rejected                | Passed |
| TC-06 | Create a valid capsule             | Locked screen appears                 | Passed |
| TC-07 | Observe countdown                  | Countdown updates every second        | Passed |
| TC-08 | Refresh while capsule is locked    | Capsule is restored                   | Passed |
| TC-09 | Reach unlock time                  | Message is revealed automatically     | Passed |
| TC-10 | Refresh after unlocking            | Unlocked message remains visible      | Passed |
| TC-11 | Create another capsule             | Previous capsule is removed           | Passed |
| TC-12 | Store invalid JSON manually        | Application recovers without crashing | Passed |
| TC-13 | Store invalid capsule structure    | Invalid data is rejected              | Passed |

## 3. UI and Responsive Testing

| ID    | Test Scenario           | Expected Result                               | Status |
| ----- | ----------------------- | --------------------------------------------- | ------ |
| UI-01 | View on desktop         | Content is centred and readable               | Passed |
| UI-02 | View at 375px width     | No horizontal overflow                        | Passed |
| UI-03 | Resize browser window   | Layout adjusts appropriately                  | Passed |
| UI-04 | Navigate using keyboard | Interactive elements are accessible           | Passed |
| UI-05 | Focus on form controls  | Visible focus indicators appear               | Passed |
| UI-06 | View locked screen      | Countdown is clearly visible                  | Passed |
| UI-07 | View unlocked screen    | Message is readable and preserves line breaks | Passed |

## 4. Error Handling

- Invalid JSON must not crash the application.
- Invalid saved capsule data must be rejected.
- Failed storage writes must not display a false success state.
- Missing or unexpected data must be handled gracefully.

## 5. Testing Summary

Total test cases: 20

Passed: 20

Failed: 0

Not Tested: 0
