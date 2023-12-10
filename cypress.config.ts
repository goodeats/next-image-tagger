import { defineConfig } from 'cypress';
import { seed } from './prisma/seed';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        'db:seed': async () => {
          // seed the database
          await seed();
          return null;
        },
        'db:tearDown': async () => {
          // tear down the database
          return null;
        },
      });
    },
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
