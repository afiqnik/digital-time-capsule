import { describe, it, expect, vi, afterEach } from "vitest";
import { calculateRemainingTime, formatCountdown, isValidCapsule } from "./capsule-utils.js";

describe("isValidCapsule", () => {
    it("should return true for valid capsule data", () => {
        const capsule = {
            message: "Hello, future me!",
            unlockAt: Date.now() + 86400000
        };

        expect(isValidCapsule(capsule)).toBe(true);
    });

    it("should reject an empty message", () => {
        const capsule = {
            message: "   ",
            unlockAt: Date.now() + 86400000
        };

        expect(isValidCapsule(capsule)).toBe(false);
    });

    it("should reject a missing unlock timestamp", () => {
        const capsule = {
            message: "Hello, future me!"
        };

        expect(isValidCapsule(capsule)).toBe(false);
    });

    it("should reject null data", () => {
        expect(isValidCapsule(null)).toBe(false);
    });

    it("should reject an array", () => {
        expect(isValidCapsule([])).toBe(false);
    });

    it("should reject a negative timestamp", () => {
        const capsule = {
            message: "Hello, future me!",
            unlockAt: -1000
        };

        expect(isValidCapsule(capsule)).toBe(false);
    });

    it("should reject a decimal timestamp", () => {
        const capsule = {
            message: "Hello, future me!",
            unlockAt: 12345.67
        };

        expect(isValidCapsule(capsule)).toBe(false);
    });

    it("should reject a numeric message", () => {
        const capsule = {
            message: 12345,
            unlockAt: Date.now() + 86400000
        };

        expect(isValidCapsule(capsule)).toBe(false);
    });

    it("should reject an object as capsule data", () => {
        expect(isValidCapsule({})).toBe(false);
    });
});

describe("calculateRemainingTime", () => {
    const fixedTime = new Date("2026-11-04T12:00:00").getTime();

    afterEach(() => {
        vi.useRealTimers();
    });

    it("should calculate the remaining time correctly", () => {
        vi.useFakeTimers();
        vi.setSystemTime(fixedTime);

        const unlockAt = fixedTime + (
            2 * 86400000 +
            3 * 3600000 +
            15 * 60000 +
            10000
        );

        const result = calculateRemainingTime(unlockAt);

        expect(result).toEqual({
            days: 2,
            hours: 3,
            minutes: 15,
            seconds: 10
        });
    });

    it("should return null when the capsule has expired", () => {
        vi.useFakeTimers();
        vi.setSystemTime(fixedTime);

        expect(
            calculateRemainingTime(fixedTime - 1000)
        ).toBe(null);
    });

    it("should return null when the unlock time is now", () => {
        vi.useFakeTimers();
        vi.setSystemTime(fixedTime);

        expect(
            calculateRemainingTime(fixedTime)
        ).toBe(null);
    });

    it("should calculate exactly one second remaining", () => {
        vi.useFakeTimers();
        vi.setSystemTime(fixedTime);

        const unlockAt = fixedTime + 1000;

        expect(calculateRemainingTime(unlockAt)).toEqual({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 1
        });
    });
});

describe("formatCountdown", () => {
    it("should format the countdown with two-digit values", () => {
        const time = {
            days: 2,
            hours: 5,
            minutes: 9,
            seconds: 7
        };

        const result = formatCountdown(time);

        expect(result).toBe("02d : 05h : 09m : 07s");
    });

    it("should format zero values correctly", () => {
        const time = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };

        expect(formatCountdown(time)).toBe("00d : 00h : 00m : 00s");
    });
});