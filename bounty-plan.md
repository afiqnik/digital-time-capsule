# Digital Time Capsule — Bounty Engineering Plan

**Developer:** Nik Afiq  
**Attribution:** Powered by Codyza  
**Project Type:** Frontend web application  
**Tech Stack:** HTML, CSS, Vanilla JavaScript

## 1. Objective

Build a personal Digital Time Capsule that allows users to write a message, choose a future unlock date and time, and reveal the message only when that time arrives.

The application should feel like a private, meaningful experience rather than a basic form with a countdown.

## 2. Scope

### In Scope — MVP

- Write and validate a personal message.
- Select a future unlock date and time.
- Seal the message in a visually locked capsule.
- Display a live countdown until the unlock time.
- Reveal the message when the unlock time arrives.
- Persist the capsule using browser localStorage.
- Restore the capsule after a page refresh.
- Provide a way to create another capsule after opening the current one.
- Responsive layout for desktop and mobile.

### Out of Scope

- User registration and login.
- Backend or database.
- Sharing capsules between users or devices.
- Email or push notifications.
- Strong security against browser inspection or clock manipulation.

## 3. User Flow

1. User opens the application.
2. User writes a message and selects a future unlock date and time.
3. User validates and seals the capsule.
4. Application displays the locked capsule and countdown.
5. User returns later or refreshes the page.
6. Application checks the unlock time and displays the appropriate state.
7. Once unlocked, the message is revealed.

## 4. Functional Requirements

- **FR-01:** Reject empty or whitespace-only messages.
- **FR-02:** Require a valid future unlock date and time.
- **FR-03:** Save the message and unlock timestamp locally.
- **FR-04:** Display the locked state before the unlock timestamp.
- **FR-05:** Update the countdown without requiring a page refresh.
- **FR-06:** Reveal the message when the unlock timestamp is reached.
- **FR-07:** Restore the correct state after a refresh or browser revisit.
- **FR-08:** Handle missing or invalid stored data gracefully.
- **FR-09:** Allow the user to start a new capsule after the current one is opened.

## 5. Technical Constraints

- Use semantic HTML, CSS, and vanilla JavaScript.
- No frontend framework or backend.
- Use localStorage for persistence.
- Store dates as timestamps or ISO-formatted dates consistently.
- Treat the browser's current clock as the time reference.
- Render user messages safely as text, not executable HTML.
- Clearly communicate that capsules are stored only in the current browser.

## 6. Acceptance Criteria

- A user can create a capsule with a valid message and future unlock time.
- Invalid input is rejected with a helpful explanation.
- The capsule remains locked before its unlock time.
- The countdown displays a meaningful remaining duration.
- The message unlocks at the correct time while the page is open.
- Refreshing or reopening the page restores the correct state.
- An already-expired capsule unlocks immediately on revisit.
- Invalid or missing saved data does not crash the application.
- The interface works on mobile and desktop.
- The application is deployed and accessible through a public URL.

## 7. Definition of Done

- All MVP acceptance criteria pass.
- No critical console errors.
- Core interactions work using mouse and keyboard.
- Layout is usable at mobile and desktop widths.
- README documents setup, usage, limitations, and deployment.
- GitHub repository includes the implementation and test notes.
- Footer includes “Built by Nik Afiq” and “Powered by Codyza”.

## 8. Development Approach

1. Define the UI states and user flow.
2. Create the HTML structure.
3. Build the responsive visual design.
4. Implement form validation and date handling.
5. Implement capsule state and localStorage persistence.
6. Add the countdown and unlock behavior.
7. Test edge cases and accessibility.
8. Deploy and document the project.

**Working principle:** Implement incrementally. Test each behavior before adding the next. Prefer simple, understandable code over unnecessary complexity.
