# Digital Time Capsule

A simple, browser-based application that lets you write a personal message, seal it, and unlock it at a future date and time.

Digital Time Capsule provides a quiet space to preserve thoughts, memories, and messages for your future self.

## Features

- Create a personal time capsule with a custom message.
- Choose a future date and time for unlocking.
- View a live countdown while the capsule is locked.
- Automatically reveal the message when the unlock time arrives.
- Save capsule data using browser local storage.
- Restore your capsule after refreshing or revisiting the page.
- Responsive interface for desktop and mobile devices.

## Tech Stack

- **HTML5** — Application structure and semantic elements.
- **CSS3** — Responsive layout and visual styling.
- **JavaScript (Vanilla JS)** — Application logic and countdown functionality.
- **Local Storage API** — Persistent browser-side capsule storage.
- **Vitest** — Automated unit testing.
- **Git & GitHub** — Version control and source code hosting.

## Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (for running automated tests)
- npm (included with Node.js)
- A modern web browser

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/afiqnik/digital-time-capsule.git
   ```

2. Navigate to the project directory:

   ```bash
   cd digital-time-capsule
   ```

3. Install development dependencies:

   ```bash
   npm install
   ```

4. Open `index.html` in your browser, or use the VS Code Live Server extension to run the application locally.

### Running Tests

Run the automated unit tests:

```bash
npm test
```

Generate a test coverage report:

```bash
npm run test:coverage
```

## How to Use

1. Open Digital Time Capsule.
2. Write a message for your future self.
3. Select the date and time when you want the message to unlock.
4. Click **Seal My Capsule**.
5. Watch the countdown while your capsule remains locked.
6. Return after the countdown ends to reveal your message.
7. Click **Create Another Capsule** to start again.

## Data Storage

Capsule data is stored locally in your browser using `localStorage`.

This means:

- Your capsule remains available after refreshing the page in the same browser.
- Your capsule is not synchronised across devices.
- Clearing browser storage may permanently remove your capsule.

## Known Limitations

- Only one capsule can be stored at a time per browser.
- Capsule data is stored locally and is not synchronised across devices.
- Deleting browser storage removes the saved capsule.
- Unlocking depends on the device's system clock.
- The application does not provide encryption or server-side security.

## Future Improvements

- Support multiple time capsules.
- Add capsule history.
- Explore optional cloud-based storage.

## Author

**[@afiqnik](https://github.com/afiqnik)**
