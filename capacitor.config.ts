import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mylife.app',
  appName: 'my-life',
  webDir: 'dist/my-life/browser',
  server: {
    url: 'https://my-life-78999.web.app',
  },
};

export default config;
