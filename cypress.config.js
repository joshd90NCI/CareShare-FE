import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
  },
  env: {
    username: process.env.CY_EMAIL,
    password: process.env.CY_PASSWORD,
    basicUsername: process.env.CY_BASIC_EMAIL,
  },
});
