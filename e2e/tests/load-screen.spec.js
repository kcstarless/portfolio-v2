import { test, expect, describe } from '@playwright/test'

describe('Loading Screen Test', () => {
    test('loads all the stages one by one', async ({ page }) => {
        await page.goto('http://localhost:5173')

        const messages = {
            s1: "Waking up the server...",
            s2: "Server is ready...",
            // s2a: "Fetching local data...", // Uncomment if you use this step
            s3: "Fetching portfolio data...",
            s4: "Pre loading images from Tigris S3...",
            ready: "Portfolio ready!",
            error: "Something went wrong. Please try again.",
        };

        // For each step, wait until the corresponding text is visible
        for (const step of ['s1', 's2', 's3', 's4', 'ready']) {
            await expect(page.locator('text=' + messages[step])).toBeVisible({ timeout: 10000 });
        }
    })
})
