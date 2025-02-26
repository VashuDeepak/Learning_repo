export const config = {
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    credentials: {
        admin: {
            username: 'Admin',
            password: 'admin123'
        },
        // Add more user types as needed
        employee: {
            username: 'employee1',
            password: 'employee123'
        }
    },
    timeout: {
        globalTimeout: 30000,
        elementTimeout: 10000
    },
    logLevel: 'info' // debug, info, warn, error
};
