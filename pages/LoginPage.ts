import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/logger';

export class LoginPage extends BasePage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('[name="username"]');
        this.passwordInput = page.locator('[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');
    }

    async navigateToLoginPage() {
        await this.navigateTo('/web/index.php/auth/login');
        Logger.info('Navigated to login page');
    }

    async login(username: string, password: string) {
        Logger.info(`Attempting to login with username: ${username}`);
        await this.type(this.usernameInput, username, 'Entered username');
        await this.type(this.passwordInput, password, 'Entered password');
        await this.click(this.loginButton, 'Clicked login button');
    }

    async verifyLoginPage() {
        Logger.info('Verifying login page elements');
        await this.waitForElement(this.usernameInput);
        await this.waitForElement(this.passwordInput);
        await this.waitForElement(this.loginButton);
        Logger.info('Login page verified successfully');
    }
}
