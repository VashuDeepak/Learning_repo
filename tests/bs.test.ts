import { Browser, chromium, devices, Page } from 'playwright';
import * as browserstack from 'browserstack-local';

const username = 'vashutomer_3MiubB';  // Replace with your BrowserStack username
const accessKey = 'SzZfuHzxiqyGzY9Mxnpb';  // Replace with your BrowserStack access key

// Desired capabilities for BrowserStack
const capabilities = {
  'browser': 'chrome',
  'browser_version': 'latest',
  'os': 'Windows',
  'os_version': '10',
  'name': 'Playwright BrowserStack Integration Test',
  'build': 'playwright-build',
  'project': 'Playwright Test',
  'browserstack.user': username,
  'browserstack.key': accessKey,
};

const local = new browserstack.Local();

async function run() {
  // Start the BrowserStack Local tunnel
  local.start({ key: accessKey }, async (error: any) => {
    if (error) {
      console.log('Error starting BrowserStack Local tunnel:', error);
      return;
    }

    try {
      // Launch Playwright browser
      const browser: Browser = await chromium.launch({
        headless: true,
        args: [
          `--no-sandbox`,
          `--disable-setuid-sandbox`,
        ],
      });

      const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      });

      const page: Page = await context.newPage();

      // Navigate to a website on BrowserStack (to simulate the test case)
      await page.goto('https://www.browserstack.com/');
      console.log("Test running on BrowserStack!");

      // Implement your test logic here

      // Close the browser
      await browser.close();
    } catch (error) {
      console.error('Error running Playwright test:', error);
    } finally {
      // Stop the BrowserStack Local tunnel
      local.stop(() => {
        console.log('BrowserStack Local tunnel stopped');
      });
    }
  });
}

// Run the function
run();
