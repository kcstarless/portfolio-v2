/** /tests/load-screen.spec.js */
import { test, expect, describe } from '@playwright/test'

// describe('Loading Screen Test', () => {
//     test('loads all the stages one by one and then show portfolio', async ({ page }) => {
//         await page.goto('http://localhost:5173')

//         const messages = {
//             s1: "Waking up the server...",
//             s2: "Server is ready...",
//             // s2a: "Fetching local data...", // Uncomment if you use this step
//             s3: "Fetching portfolio data...",
//             s4: "Pre loading images from Tigris S3...",
//             ready: "Portfolio ready!",
//             error: "Something went wrong. Please try again.",
//         };

//         // For each step, wait until the corresponding text is visible
//         for (const step of ['s1', 's2', 's3', 's4', 'ready']) {
//             await expect(page.locator('text=' + messages[step])).toBeVisible({ timeout: 10000 })
//         }
        
//         // Wait a bit more to see if projects load after "Portfolio ready!"
//         const loadingBox = page.getByTestId('loading-box')
//         const projectsBox = page.getByTestId('project-box')
        
//         // Debug: Check counts again after waiting
//         console.log('Before 2s wait - Loading box count:', await loadingBox.count());
//         console.log('Before 2s wait - Project box count:', await projectsBox.count());
        
//         // This GUARANTEED failure to test if test runner is working
//         // await expect(page.getByTestId('non-existent-element')).toHaveCount(999)
//         await page.waitForTimeout(2000)

//         console.log('After 2s wait - Loading box count:', await loadingBox.count());
//         console.log('After 2s wait - Project box count:', await projectsBox.count());

//         await expect(loadingBox).toHaveCount(0)

//         await expect(projectsBox).toHaveCount(1)

//         console.log('Final loading box count:', await loadingBox.count());
//     })
// })

describe('Log in as demo user', () => {
    test('Click expand login form to show form', async ({ page }) => {
        await page.goto('http://localhost:5173')

        await page.waitForTimeout(12000)

        const loginButtonToggle = page.getByTestId('login-toggle-button')
        await loginButtonToggle.waitFor({ state: 'visible' })
        await expect(loginButtonToggle).toHaveCount(1)
        await loginButtonToggle.click()
    })
})
