// 7. CALCULATE REMAINING TIME

export function calculateRemainingTime(unlockAt) {
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

    return { days, hours, minutes, seconds };
}

// 8. FORMAT COUNTDOWN DISPLAY

export function formatCountdown(time) {
    const days = String(time.days).padStart(2, "0");
    const hours = String(time.hours).padStart(2, "0");
    const minutes = String(time.minutes).padStart(2, "0");
    const seconds = String(time.seconds).padStart(2, "0");

    return `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
}

// 17. VALIDATE CAPSULE DATA

export function isValidCapsule(capsule) {
    return (
        capsule !== null &&
        typeof capsule === "object" &&
        !Array.isArray(capsule) &&
        typeof capsule.message === "string" &&
        capsule.message.trim().length > 0 &&
        Number.isSafeInteger(capsule.unlockAt) &&
        capsule.unlockAt > 0 &&
        Number.isFinite(new Date(capsule.unlockAt).getTime())
    );
}