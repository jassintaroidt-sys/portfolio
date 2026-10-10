import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './qa',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run preview -- --port 5173',
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: '360x640', use: { viewport: { width: 360, height: 640 } } },
    { name: '390x844', use: { viewport: { width: 390, height: 844 } } },
    { name: '430x932', use: { viewport: { width: 430, height: 932 } } },
    { name: '844x390', use: { viewport: { width: 844, height: 390 } } },
    { name: '768x1024', use: { viewport: { width: 768, height: 1024 } } },
    { name: '1024x768', use: { viewport: { width: 1024, height: 768 } } },
    { name: '1280x720', use: { viewport: { width: 1280, height: 720 } } },
    { name: '1366x768', use: { viewport: { width: 1366, height: 768 } } },
    { name: '1440x900', use: { viewport: { width: 1440, height: 900 } } },
    { name: '1920x1080', use: { viewport: { width: 1920, height: 1080 } } },
    { name: '2560x1440', use: { viewport: { width: 2560, height: 1440 } } },
  ],
});
