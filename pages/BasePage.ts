import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/logger';
import { config } from '../config/config';

export class BasePage {
    protected page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    protected async navigateTo(path: string) {
        const url = `${config.baseUrl}${path}`;
        Logger.info(`Navigating to: ${url}`);
        await this.page.goto(url);
    }

    protected async click(locator: Locator, logMessage?: string) {
        try {
            await locator.waitFor({ state: 'visible', timeout: config.timeout.elementTimeout });
            await locator.click();
            Logger.info(logMessage || `Clicked on element: ${locator}`);
        } catch (error) {
            Logger.error(`Failed to click element: ${error}`);
            throw error;
        }
    }

    protected async type(locator: Locator, text: string, logMessage?: string) {
        try {
            await locator.waitFor({ state: 'visible', timeout: config.timeout.elementTimeout });
            await locator.fill(text);
            Logger.info(logMessage || `Typed text into element: ${locator}`);
        } catch (error) {
            Logger.error(`Failed to type text: ${error}`);
            throw error;
        }
    }

    protected async waitForElement(locator: Locator, timeout?: number) {
        try {
            await locator.waitFor({ 
                state: 'visible', 
                timeout: timeout || config.timeout.elementTimeout 
            });
            Logger.debug(`Element found: ${locator}`);
        } catch (error) {
            Logger.error(`Element not found: ${error}`);
            throw error;
        }
    }
}
