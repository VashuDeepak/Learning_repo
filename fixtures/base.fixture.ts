import { test as base, Browser, Page } from '@playwright/test'; // Import test as base
import { Local } from 'browserstack-local';
import { connectToBrowserStack, stopBrowserStackLocal } from '../utils/browserstackHelper'; // Import the function
import { LoginPage } from '../pages/LoginPage';
import { config } from '../config/config';
import { Logger } from '../utils/logger';

type Fixtures = {
    browser: Browser;
    authenticatedPage: Page;
};

let bsLocal: Local; // Declare bsLocal as Local type
let browser: Browser; // Declare browser as Browser type

export const test = base.extend<Fixtures>({
    // Override the default browser fixture to connect to BrowserStack
    browser: async ({}, use) => {
        bsLocal = new Local(); // Initialize bsLocal
        browser = await connectToBrowserStack(); // Connect to BrowserStack
        await use(browser);  // Use the browser in the test

        // Ensure the browser is closed only after all tests are completed
        Logger.info('Tests completed. Closing BrowserStack browser...');
        await browser.close();  // Close the browser after tests
    },
});

// Ensure BrowserStack Local stops after all tests are completed
test.afterAll(async () => {
    if (bsLocal) {
        stopBrowserStackLocal(bsLocal); // Stop the BrowserStack Local instance
    }
});

export const expect = base.expect;