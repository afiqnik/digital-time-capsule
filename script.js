// 1. SELECT HTML ELEMENTS

const messageForm = document.querySelector("#message-form");
const messageInput = document.querySelector("#message-input");
const timestampInput = document.querySelector("#message-timestamp");

const formSection = document.querySelector("#form-section");
const lockedSection = document.querySelector("#locked-capsule-section");
const unlockedSection = document.querySelector("#unlocked-capsule-section");

const countdownTimer = document.querySelector("#countdown-timer");
const unlockedMessage = document.querySelector("#unlocked-message");
const newCapsuleButton = document.querySelector("#new-capsule-button");

// 2. APPLICATION STATE

let currentCapsule = null;
let countdownInterval = null;

// 3. CHECK JAVASCRIPT CONNECTION

console.log("Digital Time Capsule is ready!");
console.log("Message form:", messageForm);
console.log("Current capsule:", currentCapsule);

// 4. HANDLE FORM SUBMISSION

messageForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const message = messageInput.value.trim();
    const unlockAt = timestampInput.value;

    console.log("Message:", message);
    console.log("Unlock date:", unlockAt);

    // Validate message
    if (!message) {
        alert("Please enter a message before sealing your capsule.");
        return;
    }

    // Validate unlock date
    if (!unlockAt) {
        alert("Please select an unlock date and time.");
        return;
    }

    // Validate that unlock date is in the future
    const unlockDate = new Date(unlockAt);

    if (Number.isNaN(unlockDate.getTime())) {
        alert("Please enter a valid unlock date and time.");
        return;
    }

    if (unlockDate.getTime() <= Date.now()) {
        alert("Your capsule must unlock at a future date and time.");
        return;
    }

    // Create capsule data
    currentCapsule = {
        message: message,
        unlockAt: unlockDate.getTime()
    };

    const saved = saveCapsule();

    if (!saved) {
        currentCapsule = null;
        return;
    }

    // Display the locked capsule screen
    showScreen("locked");
    startCountdown();
});

// 5. SWITCH APPLICATION SCREENS

function showScreen(screen) {
    // Hide all screens first
    formSection.hidden = true;
    lockedSection.hidden = true;
    unlockedSection.hidden = true;

    // Show the requested screen
    if (screen === "form") {
        formSection.hidden = false;
    } else if (screen === "locked") {
        lockedSection.hidden = false;
    } else if (screen === "unlocked") {
        unlockedSection.hidden = false;
    }
}

// 6. INITIALISE APPLICATION

initialiseApp();

// 7. CALCULATE REMAINING TIME

function calculateRemainingTime(unlockAt) {
    const now = Date.now();
    const remainingTime = unlockAt - now;

    // Capsule has reached its unlock time
    if (remainingTime <= 0) {
        return null;
    }

    const totalSeconds = Math.floor(remainingTime / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
        days,
        hours,
        minutes,
        seconds
    };
}

// 8. FORMAT COUNTDOWN DISPLAY

function formatCountdown(time) {
    const days = String(time.days).padStart(2, "0");
    const hours = String(time.hours).padStart(2, "0");
    const minutes = String(time.minutes).padStart(2, "0");
    const seconds = String(time.seconds).padStart(2, "0");

    return `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
}

// 9. UNLOCK CAPSULE

function unlockCapsule() {
    // Stop the countdown
    clearInterval(countdownInterval);
    countdownInterval = null;

    // Display the saved message safely as text
    unlockedMessage.textContent = currentCapsule.message;

    // Show the unlocked screen
    showScreen("unlocked");
}

// 10. UPDATE COUNTDOWN

function updateCountdown() {
    // Make sure a capsule exists
    if (!currentCapsule) {
        clearInterval(countdownInterval);
        countdownInterval = null;
        return;
    }

    const remainingTime = calculateRemainingTime(
        currentCapsule.unlockAt
    );

    // Unlock when the countdown reaches zero
    if (remainingTime === null) {
        unlockCapsule();
        return;
    }

    countdownTimer.textContent = formatCountdown(remainingTime);
}

// 11. START COUNTDOWN

function startCountdown() {
    // Stop any previous countdown
    clearInterval(countdownInterval);

    // Update immediately instead of waiting one second
    updateCountdown();

    // Update every second
    if (currentCapsule && Date.now() < currentCapsule.unlockAt) {
        countdownInterval = setInterval(updateCountdown, 1000);
    }
}

// 12. RESET CAPSULE

function resetCapsule() {
    // Stop the countdown if it is running
    clearInterval(countdownInterval);
    countdownInterval = null;

    // Clear application state
    currentCapsule = null;
    localStorage.removeItem("digitalTimeCapsule");

    // Reset form inputs
    messageForm.reset();

    // Clear previous displayed message and countdown
    unlockedMessage.textContent = "";
    countdownTimer.textContent = "Calculating...";

    // Return to creation screen
    showScreen("form");
}

// 13. CREATE ANOTHER CAPSULE

newCapsuleButton.addEventListener("click", resetCapsule);

// 14. SAVE CAPSULE TO LOCAL STORAGE

function saveCapsule() {
    try {
        localStorage.setItem(
            "digitalTimeCapsule",
            JSON.stringify(currentCapsule)
        );

        return true;

    } catch (error) {
        console.error("Unable to save capsule:", error);

        alert(
            "Your capsule could not be saved. Please check your browser storage settings."
        );

        return false;
    }
}

// 15. LOAD CAPSULE FROM LOCAL STORAGE

function loadCapsule() {
    try {
        const savedData = localStorage.getItem("digitalTimeCapsule");

        if (!savedData) {
            return null;
        }

        const capsule = JSON.parse(savedData);

        if (!isValidCapsule(capsule)) {
            console.error("Invalid capsule data found.");

            localStorage.removeItem("digitalTimeCapsule");

            return null;
        }

        return capsule;

    } catch (error) {
        console.error("Unable to load capsule:", error);

        try {
            localStorage.removeItem("digitalTimeCapsule");
        } catch (storageError) {
            console.error("Unable to clear invalid capsule:", storageError);
        }

        return null;
    }
}

// 16. INITIALISE APPLICATION

function initialiseApp() {
    // Retrieve previously saved capsule
    currentCapsule = loadCapsule();

    // No saved capsule exists
    if (!currentCapsule) {
        showScreen("form");
        return;
    }

    // Check whether the capsule should be unlocked
    if (Date.now() >= currentCapsule.unlockAt) {
        unlockCapsule();
        return;
    }

    // Capsule is still locked
    showScreen("locked");
    startCountdown();
}

// START APPLICATION
initialiseApp();

// 17. VALIDATE CAPSULE DATA

function isValidCapsule(capsule) {
    return (
        capsule !== null &&
        typeof capsule === "object" &&
        !Array.isArray(capsule) &&
        typeof capsule.message === "string" &&
        capsule.message.trim().length > 0 &&
        Number.isSafeInteger(capsule.unlockAt) &&
        capsule.unlockAt > 0
    );
}