import { test, expect } from '@playwright/test';
import { connectToBrowserStack } from '../utils/browserstackHelper';

test.beforeAll(async () => {
    await connectToBrowserStack();  // Correct function call
});

test('example test', async ({ page }) => {
    await page.goto('https://www.google.com');
    expect(await page.title()).toBe('Google');
});

// test.afterAll(async () => {
//     await stopBrowserStackLocal();  // If you need to stop BrowserStack local, implement the function in browserstackHelper
// });
