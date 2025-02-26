import { Local } from 'browserstack-local';
import { browserStackConfig } from '../config/browserstack.config';
import { Browser, chromium } from 'playwright';

// Starts BrowserStack Local and connects to BrowserStack using Playwright
export const connectToBrowserStack = async (): Promise<Browser> => {
    const bsLocal = new Local();
    return new Promise((resolve, reject) => {
        console.log('Starting BrowserStack Local...');
        
        // Pass the port as a string
        bsLocal.start({ key: browserStackConfig.accessKey, port: '45691' }, async (error?: Error) => {
            if (error) {
                console.error('Error starting BrowserStack Local:', error);
                reject(error);
            } else {
                console.log('BrowserStack Local started successfully.');

                try {
                    console.log('Launching browser server...');
                    const browserServer = await chromium.launchServer({
                        headless: false, // Set to true for headless mode
                    });
                    console.log('Browser server launched successfully.');

                    console.log('Waiting for BrowserStack Local to establish the connection...');
                    // Wait for the Local tunnel to be ready (ensure proper connection to BrowserStack)
                    const wsEndpoint = `wss://cdp.browserstack.com/playwright?browserstack.username=${browserStackConfig.username}&browserstack.accessKey=${browserStackConfig.accessKey}`;

                    // Try connecting to BrowserStack after ensuring the tunnel is up
                    console.log('Connecting to BrowserStack...');
                    const browser = await chromium.connect({ wsEndpoint });
                    console.log('Successfully connected to BrowserStack.');

                    resolve(browser);
                } catch (connectionError) {
                    console.error('Error connecting to BrowserStack:', connectionError);
                    reject(connectionError);
                }
            }
        });
    });
};

// Stops the BrowserStack Local tunnel after tests
export const stopBrowserStackLocal = (bsLocal: Local): void => {
    console.log('Stopping BrowserStack Local...');
    bsLocal.stop((error?: Error) => {
        if (error) {
            console.error('Error stopping BrowserStack Local:', error);
        } else {
            console.log('BrowserStack Local stopped successfully.');
        }
    });
};
