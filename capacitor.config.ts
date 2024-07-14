import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mylife.app',
  appName: 'my-life',
  webDir: 'dist/my-life/browser',
  server: {
    url: 'http://192.168.8.16:4200',
    cleartext: true,
  },
};

export default config;
